import { motion } from "framer-motion";
import { fadeUp, slideDown } from "../Utility/animation";

const AboutUs = () => {
  return (
    <div className="relative h-[calc(100vh-80px)] bg-base-100 px-4 py-16 flex flex-col items-center justify-start lexend ">
      <motion.h1
        {...slideDown(0)}
        className="text-4xl md:text-5xl font-bold text-center text-rose-500 mb-10"
      >
        About Medi Rally
      </motion.h1>

      <div className="max-w-3xl space-y-6 text-center text-base-content font-light">
        <motion.p {...fadeUp(0.1)}>
          Medi Rally is a revolutionary platform that brings together medical professionals, students, and volunteers for organized health campaigns. It aims to streamline collaboration and maximize impact in community healthcare services.
        </motion.p>

        <motion.p {...fadeUp(0.2)}>
          Our mission is to bridge the gap between healthcare awareness and real-world action by facilitating medical rallies and free health camps across various regions. We believe in accessible care for all.
        </motion.p>

        <motion.p {...fadeUp(0.3)}>
          With an intuitive platform, users can join events as organizers or participants, manage schedules, and contribute to a healthier tomorrow. Medi Rally empowers teams with tools for seamless execution.
        </motion.p>

        <motion.p {...fadeUp(0.4)}>
          As we grow, our focus remains on creating impact through innovation and collaboration. Join Medi Rally to be a part of a vibrant community shaping the future of healthcare outreach.
        </motion.p>
      </div>
    </div>
  );
};

export default AboutUs;
