// ContactUs.jsx
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, User, MessageSquare, Send } from "lucide-react";
import { fadeUp, slideDown } from "../Utility/animation";
import SecondaryBtn from "../Shared/Button/SecondaryBtn";

const ContactUs = () => {
  return (
    <div className="bg-base-100 px-4 py-16">
      <motion.h1
        {...slideDown(0)}
        className="text-4xl md:text-5xl font-bold text-center text-sky-700 mb-4"
      >
        Contact Us
      </motion.h1>
      <motion.p
        {...fadeUp(0.1)}
        className="text-lg text-center text-sky-600 mb-12"
      >
        We'd love to hear from you! Reach out to us anytime for questions, feedback, or support.
      </motion.p>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Left Contact Info */}
        <motion.div {...fadeUp(0.2)} className="space-y-6">
          <div className="flex items-start gap-4">
            <Mail className="text-pink-700" />
            <div>
              <p className="font-semibold text-sky-600">Email</p>
              <p>support@medirally.org</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="text-pink-700" />
            <div>
              <p className="font-semibold text-sky-600">Phone</p>
              <p>+880 1234 567 890</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MapPin className="text-pink-700" />
            <div>
              <p className="font-semibold text-sky-600">Location</p>
              <p>Dhaka, Bangladesh</p>
            </div>
          </div>
        </motion.div>

        {/* Right Contact Form */}
        <motion.form {...fadeUp(0.3)} className="space-y-4">
          <div className="flex items-center border border-sky-600 rounded-md px-3 py-2">
            <User className="text-pink-700 mr-3" />
            <input
              type="text"
              placeholder="Your Name"
              className="bg-transparent outline-none w-full text-gray-700"
            />
          </div>

          <div className="flex items-center border border-sky-600 rounded-md px-3 py-2">
            <Mail className="text-pink-700 mr-3" />
            <input
              type="email"
              placeholder="Your Email"
              className="bg-transparent outline-none w-full text-gray-700"
            />
          </div>

          <div className="flex items-start border border-sky-600 rounded-md px-3 py-2">
            <MessageSquare className="text-pink-700 mr-3 mt-1" />
            <textarea
              rows="4"
              placeholder="Your Message"
              className="bg-transparent outline-none w-full text-gray-700 resize-none"
            ></textarea>
          </div>

          <SecondaryBtn
            label="Send Message"
            type="submit"
            className="px-6 py-4"
          >
            <Send size={18} /> Send Message
          </SecondaryBtn>
        </motion.form>
      </div>
    </div>
  );
};

export default ContactUs;
