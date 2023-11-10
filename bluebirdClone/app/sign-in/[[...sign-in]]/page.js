import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <Image src="/bluebirdbanner.jpg" layout="fill" objectFit="cover" />
        </div>
        <div className="absolute top-10 right-0">
          <SignIn />
        </div>
      </div>
    </>
  );
}
