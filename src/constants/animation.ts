export const springGentle = { type: "spring" as const, stiffness: 200, damping: 20 };
export const springBouncy = { type: "spring" as const, stiffness: 400, damping: 10 };
export const springStiff = { type: "spring" as const, stiffness: 500, damping: 25 };
export const tweenFast = { duration: 0.2, ease: "easeOut" as const };
export const tweenMedium = { duration: 0.5, ease: "easeInOut" as const };
export const tweenSlow = { duration: 0.8, ease: "easeInOut" as const };

export const orbEnter = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: springGentle,
};

export const orbFloat = {
  animate: { y: [0, -8, 0] },
  transition: { duration: 3, ease: "easeInOut", repeat: Infinity },
};

export const orbSelected = {
  animate: { scale: 1.15 },
  transition: springStiff,
};

export const orbWrong = {
  animate: { x: [0, -6, 6, -3, 3, 0] },
  transition: { duration: 0.4 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: tweenFast,
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: springGentle,
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: springGentle,
};

export const popIn = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: springBouncy,
};

export const popOut = {
  exit: { scale: 0, opacity: 0 },
  transition: tweenFast,
};
