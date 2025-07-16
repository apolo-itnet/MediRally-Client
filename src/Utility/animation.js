import { easeOut } from "motion";

export const slideUp = (delay = 0) => ({
  initial: { y: 100, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", duration: 0.8, delay, ease: easeOut },
  },
  exit: { y: 100, opacity: 0, transition: { duration: 0.5 } },
});

export const slideDown = (delay = 0) => ({
  initial: { y: -100, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, delay, ease: easeOut },
  },
  exit: { y: -100, opacity: 0, transition: { duration: 0.5 } },
});

export const slideLeft = (delay = 0) => ({
  initial: { x: 100, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, delay, ease: easeOut },
  },
  exit: { x: 100, opacity: 0, transition: { duration: 0.5 } },
});

export const slideRight = (delay = 0) => ({
  initial: { x: -200, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, delay, ease: easeOut },
  },
  exit: { x: -200, opacity: 0, transition: { duration: 0.5 } },
});


export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.8, delay, ease: easeOut },
  },
  exit: { opacity: 0, transition: { duration: 0.5 } },
});

export const fadeUp = (delay = 0) => ({
  initial: { y: 40, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, delay, ease: easeOut },
  },
  exit: { y: 40, opacity: 0, transition: { duration: 0.5 } },
});

export const fadeDown = (delay = 0) => ({
  initial: { y: -40, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, delay, ease: easeOut },
  },
  exit: { y: -40, opacity: 0, transition: { duration: 0.5 } },
});

export const fadeLeft = (delay = 0) => ({
  initial: { x: 40, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, delay, ease: easeOut },
  },
  exit: { x: 40, opacity: 0, transition: { duration: 0.5 } },
});

export const fadeRight = (delay = 0) => ({
  initial: { x: -40, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, delay, ease: easeOut },
  },
  exit: { x: -40, opacity: 0, transition: { duration: 0.5 } },
});

export const zoomIn = (delay = 0) => ({
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.8, delay, ease: easeOut },
  },
  exit: { scale: 0, opacity: 0, transition: { duration: 0.5 } },
});

export const zoomOut = (delay = 0) => ({
  initial: { scale: 1, opacity: 1 },
  animate: {
    scale: 0,
    opacity: 0,
    transition: { duration: 0.8, delay, ease: easeOut },
  },
  exit: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
});

export const rotateIn = (delay = 0) => ({
  initial: { rotate: -45, opacity: 0 },
  animate: {
    rotate: 0,
    opacity: 1,
    transition: { duration: 0.7, delay, ease: easeOut },
  },
  exit: { rotate: -45, opacity: 0, transition: { duration: 0.4 } },
});

export const rotateOut = (delay = 0) => ({
  initial: { rotate: 0, opacity: 1 },
  animate: {
    rotate: -45,
    opacity: 0,
    transition: { duration: 0.7, delay, ease: easeOut },
  },
  exit: { rotate: 0, opacity: 1, transition: { duration: 0.4 } },
});