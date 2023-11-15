//every API already created will call it here
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React from "react";
import Swal from "sweetalert2";

function CheckoutForm({ amount }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.error(submitError);
      return;
    }

    const res = await fetch("/api/create-intent", {
      method: "POST",
      body: JSON.stringify({
        amount: amount,
      }),
    });

    if (!res.ok) {
      console.error("Failed to create payment intent:", res.statusText);
      Swal.fire({
        title: "Transaction Failed",
        text: "Payment submission error. Please try again.",
        icon: "error",
      });
      return;
    }

    const secretKey = await res.json();
    console.log("Secret Key:", secretKey);

    // Tampilkan SweetAlert sebelum konfirmasi pembayaran
    Swal.fire({
      title: "Transaction Successful!",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    }).then(() => {
      // Setelah SweetAlert ditutup, lakukan konfirmasi pembayaran Stripe
      stripe.confirmPayment({
        clientSecret: secretKey,
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/",
        },
      });
    });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full mt-6">
      <h2 className="text-black m-4 font-bold">
        Amount to Pay: $ {amount.toFixed(2)},-
      </h2>
      <form onSubmit={handleSubmit} className="max-w-md">
        <PaymentElement />
        <button className="w-full bg-black text-white p-2 rounded-lg mt-2">
          Pay
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;
