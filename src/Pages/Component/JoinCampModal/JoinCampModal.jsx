import { useForm } from "react-hook-form";
import Input from "../Shared/Input";
import Select from "../Shared/Select";
import SecondaryBtn from "../../../Shared/Button/SecondaryBtn";
import { toastError, toastSuccess } from "../../../Utility/toastmsg";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
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
      participant: {
        name: user.displayName,
        email: user.email,
        age: data.age,
        phone: data.phone,
        gender: data.gender,
        emergencyContact: data.emergency,
      },
      joinedAt: new Date().toISOString(),
    };

    try {
      console.log(" Registration Data:", registrationData);

      const res = await axiosSecure.post("/register-camp", registrationData);
      if (res.data.insertedId) {
        toastSuccess("Successfully joined the camp");
        reset();
        setAlreadyJoined(true);
        onSuccess();
        queryClient.invalidateQueries(["camp-registrations"]);
        document.getElementById("join-modal").checked = false; 
      }
    } catch (err) {
      toastError("Failed to join the camp");
    }
  };

  return (
    <>
      <input type="checkbox" id="join-modal" className="modal-toggle" />
      <div className="modal lexend">
        <div className="modal-box max-w-4xl bg-zinc-50">
          <h3 className="font-bold text-2xl mb-4">Join Camp</h3>

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
            />
            <Input
              label="Phone Number"
              name="phone"
              register={register}
              errors={errors}
              validation={{ required: "Phone is required" }}
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
            />

            <div className="modal-action col-span-2 justify-between items-center">
              <label htmlFor="join-modal" className="btn">
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
