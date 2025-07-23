import { useState } from "react";
import { toast } from "react-hot-toast";
import SecondaryBtn from "../../../Shared/Button/SecondaryBtn";
import RatingStar from "../../../Shared/RatingStar";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toastError, toastSuccess } from "../../../Utility/toastmsg";

const FeedbackModal = ({ selectedCamp, user, onClose, onSuccess }) => {
  const axiosSecure = useAxiosSecure();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!selectedCamp) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const feedbackPayload = {
      userName: user?.displayName,
      userEmail: user?.email,
      userPhoto: user?.photoURL,
      campId: selectedCamp._id,
      campName: selectedCamp.campName,
      rating,
      feedbackText, // already comes from state
      createAt: new Date().toISOString(),
    };

    console.log("Feedback Payload:", feedbackPayload);

    try {
      const res = await axiosSecure.post("/feedback", feedbackPayload);

      if (res.data?.insertedId || res.data?.success) {
        toastSuccess("Successfully submitted feedback");
        onSuccess(selectedCamp._id);
        onClose();
      } else {
        toastError("Feedback already exists");
      }
    } catch (err) {
      toastError("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <input type="checkbox" id="feedback_modal" className="modal-toggle" />
      <div className="modal lexend">
        <div className="modal-box max-w-4xl">
          <h3 className="font-bold text-lg mb-2">
            Feedback for {selectedCamp.campName}
          </h3>
          <form onSubmit={handleSubmit} method="dialog">
            {/* Rating */}
            <div className="flex flex-col gap-2 my-10">
              <p className="text-sm">Please rate your camp experience</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <RatingStar
                    key={star}
                    filled={star <= (hovered || rating)}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                  />
                ))}
              </div>
            </div>

            {/* Feedback Input */}
            <textarea
              className="textarea textarea-bordered w-full h-30 mb-4 focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300  rounded-lg"
              placeholder="Your feedback here..."
              required
              name="feedback"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />

            {/* Hidden Inputs */}
            <input
              type="hidden"
              name="name"
              value={user?.displayName}
              readOnly
            />
            <input type="hidden" name="email" value={user?.email} readOnly />
            <input type="hidden" name="photo" value={user?.photoURL} readOnly />

            {/* Modal Actions */}
            <div className="modal-action flex justify-between items-center">
              <SecondaryBtn
                label="Cancel"
                showIcon={false}
                className="px-8 py-3"
                type="button"
                onClick={onClose}
              >
                Cancel
              </SecondaryBtn>
              <SecondaryBtn
                type="submit"
                label={isSubmitting ? "Submitting..." : "Submit Feedback"}
                disabled={isSubmitting}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FeedbackModal;
