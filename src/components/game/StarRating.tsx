"use client";

import { motion } from "framer-motion";

export interface StarRatingProps {
  stars: 1 | 2 | 3;
  animate: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({ stars, animate }) => {
  return (
    <div className="flex gap-6 justify-center"
    >
      {[1, 2, 3].map((n) => (
        <motion.div
          key={n}
          initial={animate ? { scale: 0, rotate: -30 } : { scale: 1 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3 + n * 0.25, type: "spring", stiffness: 300, damping: 15 }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill={n <= stars ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={
              n <= stars
                ? "text-light-gold"
                : "text-white/15"
            }
            style={
              n <= stars
                ? {
                    filter: "drop-shadow(0 0 10px rgba(255,217,122,0.5))",
                  }
                : {}
            }
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};
