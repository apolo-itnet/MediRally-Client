import { useForm } from "react-hook-form";
import Input from "../Shared/Input";
import Select from "../Shared/Select";
import SecondaryBtn from "../../../Shared/Button/SecondaryBtn";
import { toastError, toastSuccess } from "../../../Utility/toastmsg";
import { useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const JoinCampModal = ({
  camp,
  user,
  onSuccess,
  alreadyJoined,
  setAlreadyJoined,
}) => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const registrationData = {
      campId: camp._id,
      campName: camp.campName,
      campFees: camp.fees,
      location: camp.venue,
      doctorName: camp.doctorName,
      organizerEmail: camp.organizerEmail,
      participant: {
        name: user.displayName,
        email: user.email,
        age: data.age,
        phone: data.phone,
        gender: data.gender,
        emergencyContact: data.emergency,
      },
      paymentStatus: "Pay",
      confirmationStatus: "Pending",
      joinedAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/register-camp", registrationData);

      const insertedId = res?.data?.insertedId;

      if (insertedId) {
        toastSuccess("Successfully joined the camp");

        // Close modal
        document.getElementById("join-modal").checked = false;

        // Reset form
        reset();
        setAlreadyJoined(true);

        // Invalidate cache
        queryClient.invalidateQueries(["camp-registrations"]);

        // Safely call onSuccess if defined
        if (typeof onSuccess === "function") {
          onSuccess();
        }
      } else {
        throw new Error("No insertedId returned");
      }
    } catch (err) {
      console.error("❌ Registration error:", err);
      toastError("Failed to join the camp");
    }
  };

  return (
    <>
      <input type="checkbox" id="join-modal" className="modal-toggle" />
      <div className="modal lexend">
        <div className="modal-box max-w-4xl bg-zinc-50">
          <h3 className="font-bold text-2xl mb-4">Register Camp</h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-1 grid grid-cols-1 md:grid-cols-2 space-x-6 gap-2"
          >
            <Input value={camp.campName} readOnly label="Camp Name" />
            <Input value={camp.fees} readOnly label="Camp Fees" />
            <Input value={camp.venue} readOnly label="Location" />
            <Input value={camp.doctorName} readOnly label="Doctor Name" />
            <Input value={user?.displayName} readOnly label="Name" />
            <Input value={user?.email} readOnly label="Email" />

            <Input
              label="Age"
              name="age"
              register={register}
              errors={errors}
              validation={{ required: "Age is required" }}
              type="number"
              min="1"
              max="100"
              placeholder="Enter your age"
            />
            <Input
              label="Phone Number"
              name="phone"
              register={register}
              errors={errors}
              validation={{ required: "Phone is required" }}
              placeholder="Your Phone Number"
              type="tel"
            />
            <Select
              label="Gender"
              name="gender"
              register={register}
              errors={errors}
              options={["Male", "Female", "Other"]}
              validation={{ required: "Gender is required" }}
            />
            <Input
              label="Emergency Contact (optional)"
              name="emergency"
              register={register}
              errors={errors}
              placeholder="Emergency Contact Number"
              type="tel"
            />

            <div className="modal-action col-span-2 justify-between items-center">
              <label
                htmlFor="join-modal"
                className="cursor-pointer group relative bg-pink-700 hover:bg-pink-800 text-white text-sm font-semibold px-6 py-3 rounded-full transition-all duration-200 ease-in-out shadow hover:shadow-sm"
              >
                Close
              </label>
              <div className="flex flex-col items-end">
                <SecondaryBtn
                  label={
                    alreadyJoined
                      ? "Already Joined"
                      : isSubmitting
                      ? "Joining..."
                      : "Submit"
                  }
                  type="submit"
                  disabled={alreadyJoined || isSubmitting}
                />
                {alreadyJoined && (
                  <span className="text-green-600 text-sm mt-2">
                    You’ve already joined this camp.
                  </span>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default JoinCampModal;
