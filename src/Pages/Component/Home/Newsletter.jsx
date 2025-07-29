import { MailCheck } from "lucide-react";
import { motion } from "framer-motion";
import { slideUp } from "../../../Utility/animation";
import SecondaryBtn from "../../../Shared/Button/SecondaryBtn";

const Newsletter = () => {
  return (
    <section className=" py-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Image */}
        <motion.div
          {...slideUp(0.1)}
          className="overflow-hidden rounded-2xl shadow-lg bg-rose-50/50"
        >
          <img
            src="https://i.ibb.co/tTqzLMB8/Doctor-Male-1.webp"
            alt="Newsletter"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </motion.div>

        {/* Right Content */}
        <motion.div {...slideUp(0.1)} className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Stay Updated with Our Health Camps
          </h2>
          <p className="text-gray-600 text-base">
            Subscribe to our newsletter to receive updates about our upcoming
            medical camps, specialist doctors, and more directly in your inbox.
          </p>

          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-zinc-300 rounded-full w-full focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300 ease-in-out text-sm"
              required
            />
            <SecondaryBtn label="Subscribe" icon={MailCheck} type="submit" />
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
