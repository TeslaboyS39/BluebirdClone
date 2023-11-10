import React from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  MarkerF,
  OverlayView,
  OverlayViewF,
} from "@react-google-maps/api";

import { useContext, useState } from "react";
import { SourceContext } from "../../context/SourceContext";
import { DestinationContext } from "../../context/DestinationContext";
import { useEffect } from "react";

function GoogleMapSection() {
  const containerStyle = {
    width: "100%",
    height: window.innerWidth * 0.35,
  };

  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });

  const [map, setMap] = React.useState(null);
  const [directionRoutePoints, setDirectionRoutePoints] = useState([]);

  useEffect(() => {
    if (source?.length != [] && map) {
      map.panTo({
        lat: source.lat,
        lng: source.lng,
      });
      setCenter({
        lat: source.lat,
        lng: source.lng,
      });
    }
    if (source.length != [] && destination.length != []) {
      directionRoute();
    }
  }, [source]);

  useEffect(() => {
    if (destination?.length != [] && map) {
      setCenter({
        lat: destination.lat,
        lng: destination.lng,
      });
    }
    if (source.length != [] && destination.length != []) {
      directionRoute();
    }
  }, [destination]);

  const directionRoute = () => {
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: { lat: source.lat, lng: source.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log("Route result:", result);
          setDirectionRoutePoints(result);
        } else {
          console.error("Error:", status);
        }
      }
    );
  };

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={11}
      onLoad={(map) => setMap(map)}
      options={{ mapId: "baa8f6797eaf5cbc" }}
    >
      {source ? (
        <MarkerF
          position={{ lat: source.lat, lng: source.lng }}
          icon={{
            url: "/source.png",
            scaledSize: {
              width: 50,
              height: 50,
            },
          }}
        >
          <OverlayViewF
            position={{ lat: source.lat, lng: source.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2">
              <p className="text-black text-[18px]">{source.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      ) : null}
      {destination ? (
        <MarkerF
          position={{ lat: destination.lat, lng: destination.lng }}
          icon={{
            url: "/dest.png",
            scaledSize: {
              width: 50,
              height: 50,
            },
          }}
        >
          <OverlayViewF
            position={{ lat: destination.lat, lng: destination.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2">
              <p className="text-black text-[18px]">{destination.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      ) : null}

      <DirectionsRenderer
        directions={directionRoutePoints}
        options={{
          polylineOptions: {
            strokeColor: "#FF0000",
            strokeWeight: 5,
          },
          suppressMarkers: true,
        }}
      />
    </GoogleMap>
  );
}

export default GoogleMapSection;
