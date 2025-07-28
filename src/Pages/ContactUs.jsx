// ContactUs.jsx
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, User, MessageSquare, Send } from "lucide-react";
import { fadeUp, slideDown } from "../Utility/animation";
import SecondaryBtn from "../Shared/Button/SecondaryBtn";

const ContactUs = () => {
  return (
    <div className="relative h-[calc(100vh-80px)] bg-base-100 px-4 py-16 lexend">
      <motion.h1
        {...slideDown(0)}
        className="text-4xl md:text-5xl font-bold text-center text-rose-500 mb-4"
      >
        Contact Us
      </motion.h1>
      <motion.p
        {...fadeUp(0.1)}
        className="text-center text-zinc-600 mb-12"
      >
        We'd love to hear from you! Reach out to us anytime for questions, feedback, or support.
      </motion.p>

      <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-6">
        {/* Left Contact Info */}
        <motion.div {...fadeUp(0.2)} className="space-y-6 font-light">
          <div className="flex items-center gap-4">
            <Mail size={20} className="text-rose-500 " />
            <div>
              <p className="font-semibold ">Email</p>
              <p>support@medirally.org</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Phone size={20} className="text-rose-500 " />
            <div>
              <p className="font-semibold ">Phone</p>
              <p>+880 1234 567 890</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <MapPin size={20} className="text-rose-500 " />
            <div>
              <p className="font-semibold ">Location</p>
              <p>Chattogram, Bangladesh</p>
            </div>
          </div>
        </motion.div>

        {/* Right Contact Form */}
        <motion.form {...fadeUp(0.3)} className="space-y-4 col-span-2">
          <div className="flex items-center px-3 py-2">
            <User size={20} className="text-rose-500 mr-3" />
            <input
              type="text"
              placeholder="Your Name"
              className="w-full text-gray-700 input focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300  rounded-full"
            />
          </div>

          <div className="flex items-center px-3 py-2">
            <Mail size={20} className="text-rose-500 mr-3" />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full text-gray-700 input focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300  rounded-full"
            />
          </div>

          <div className="flex items-center px-3 py-2 ">
            <MessageSquare size={20} className="text-rose-500 mr-3 mt-1" />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full h-full text-gray-700 input focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300  rounded-xl resize-none flex items-center justify-center"
            ></textarea>
          </div>

          <SecondaryBtn
            label="Send Message"
            type="submit"
          />
        </motion.form>
      </div>
    </div>
  );
};

export default ContactUs;
