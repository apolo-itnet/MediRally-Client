import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

const Payment = ({ price }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  // 1. useEffect diye backend theke clientSecret anar logic
  useEffect(() => {
    if (price > 0) {
      axios
        .post("http://localhost:5000/api/payments/create-payment-intent", { price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [price]);

  // 2. Payment submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: paymentMethod.id,
      }
    );

    if (confirmError) {
      console.log("confirm error", confirmError);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      console.log("Payment successful, Transaction ID:", paymentIntent.id);

      // Optional: Save to MongoDB or show success UI
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md p-4 space-y-4 border rounded-lg">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {processing ? "Processing..." : "Pay"}
      </button>

      {transactionId && (
        <p className="text-green-600">Transaction complete! ID: {transactionId}</p>
      )}
    </form>
  );
};

export default Payment;
