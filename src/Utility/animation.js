import { easeOut } from "framer-motion";

export const slideUp = (delay) => {
  return {
    initial: {
      y: 50,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1.25,
        ease: easeOut,
        delay: delay,
      },
    },
  };
}

export const slideDown = (delay) => {
  return {
    initial: {
      y: -100,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.25,
        ease: easeOut,
        delay: delay,
      },
    },
  };
}