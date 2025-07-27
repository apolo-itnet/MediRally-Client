import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { useLocation } from "react-router";
import { TbCoinTaka } from "react-icons/tb";
import { slideUp } from "../../../Utility/animation";
import { motion } from "framer-motion";

export const stripePromise = loadStripe(import.meta.env.VITE_payment_Key);

const Payment = () => {
  const location = useLocation();
  const camp = location.state?.camp;

  if (!camp) {
    return (
      <div>
        <h1 className="text-center lexend font-bold">
          No camp selected for payment
        </h1>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <motion.div
        {...slideUp(0.5)}
        className="max-w-lg mx-auto bg-white rounded-lg shadow p-4 my-4 lexend"
      >
        <h2 className="text-xl font-bold mb-4">Pay for: {camp.campName}</h2>
        <p className="flex items-center gap-2">
          Fees:{" "}
          <span className="font-semibold text-2xl text-rose-500">
            <TbCoinTaka />
          </span>{" "}
          {camp.campFees}
        </p>
      </motion.div>
      <PaymentForm
        camp={camp._id}
        campId={camp.campId}
        campName={camp.campName}
        price={camp.campFees}
        paymentStatus={camp.paymentStatus}
        confirmationStatus={camp.confirmationStatus}
        participantEmail={camp.participant.email}
      />
    </Elements>
  );
};

export default Payment;
