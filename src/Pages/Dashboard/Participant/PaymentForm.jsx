import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../../../Utility/toastmsg";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { slideUp } from "../../../Utility/animation";
import { motion } from "framer-motion";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router";

const PaymentForm = ({ price, campId, campName, paymentStatus, confirmationStatus, camp, participantEmail }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");


  // STEP 1: Get clientSecret from server
  useEffect(() => {
    if (price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch(() => toastError("Failed to initialize payment."));
    }
  }, [price, axiosSecure]);

  // STEP 2: Handle Payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toastError(error.message);
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      toastError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const transactionId = paymentIntent.id;
      setTransactionId(transactionId);
      toastSuccess("💳 Payment successful!");

      const paymentData = {
        camp,
        campId,
        campName,
        price,
        transactionId,
        paymentStatus,
        confirmationStatus,
        participantEmail,
        date: new Date(),
      };

      console.log(paymentData);
      

      try {
        await axiosSecure.post("/save", paymentData);
        navigate("/dashboard/participant/payment-history");
      } catch (err) {
        console.log(err);
        
      }
    }

    setProcessing(false);
  };

  return (
    <motion.div {...slideUp(0.5)}>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-6 py-12 space-y-4 bg-white rounded-lg shadow mx-auto"
      >
        <CardElement
          options={{
            style: {
              base: {
                color: "#000",
                fontSize: "16px",
                fontWeight: 500,
                "::placeholder": { color: "#aab7c4" },
              },
              invalid: { color: "#e5424d" },
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-10"
        >
          {processing ? "Processing..." : "Pay"}
        </button>

        {transactionId && (
          <p className="text-green-600 font-medium">
            ✅ Payment successful! Transaction ID: <br />
            <span className="text-sm break-all">{transactionId}</span>
          </p>
        )}
      </form>
    </motion.div>
  );
};

export default PaymentForm;
