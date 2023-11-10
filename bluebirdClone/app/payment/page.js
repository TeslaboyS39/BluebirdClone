"use client";
import CheckoutForm from "./../../components/Home/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import React from "react";

function Payment() {
  const searchParam = useSearchParams();
  const amount = parseFloat(searchParam.get("amount"));

  console.log(amount, "<<<<< ini amount");

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY
  );
  const options = {
    mode: "payment",
    payment_method_types: ["card", "cashapp", "link"],
    amount: Math.round(amount) * 100,
    currency: "usd",
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
}

export default Payment;
