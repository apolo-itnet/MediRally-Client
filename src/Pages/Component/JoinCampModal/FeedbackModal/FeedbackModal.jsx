import { useState } from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import SecondaryBtn from "../../../../Shared/Button/SecondaryBtn";
import RatingStar from "../../../../Shared/RatingStar";
import { toastError, toastSuccess } from "../../../../Utility/toastmsg";

const FeedbackModal = ({
  selectedCamp,
  user,
  onClose,
  onSuccess,
  handleClose,
}) => {
  const axiosSecure = useAxiosSecure();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!selectedCamp) return null;

  useEffect(() => {
  if (isOpen) {
    setFeedbackText("");
    setRating(0);         
  }
}, [isOpen]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const feedbackPayload = {
      name: user?.displayName,
      email: user?.email,
      photo: user?.photoURL,
      campName: selectedCamp.campName,
      rating,
      feedback: feedbackText,
      campId: selectedCamp._id,
    };

    try {
      const res = await axiosSecure.post("/feedback", feedbackPayload);

      if (res.data.success) {
        toastSuccess("Successfully submitted feedback");
        onSuccess(selectedCamp._id);
        handleClose();
      } else {
        toastError("Feedback already exists");
      }
    } catch (err) {
      console.error(err);
      toastError("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <input type="checkbox" id="feedback_modal" className="modal-toggle" />
      <div className="modal lexend">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-2">
            Feedback for {selectedCamp.campName}
          </h3>
          <form onSubmit={handleSubmit} method="dialog">
            {/* Rating */}
            <div className="flex flex-col gap-2 mb-3">
              <p>Please rate our service:</p>
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
              className="textarea textarea-bordered w-full mb-4"
              placeholder="Your feedback here..."
              required
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
            <div className="modal-action">
              <button type="button" className="btn" onClick={onClose}>
                Cancel
              </button>
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
