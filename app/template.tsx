"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -3, scale: 0.988, filter: "blur(3px)" }}
      animate={{ opacity: 1, rotateY: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, rotateY: 3, scale: 0.99, filter: "blur(2px)" }}
      transition={{
        duration: 0.32,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        transformOrigin: "left center",
        perspective: 1200,
        willChange: "transform, opacity, filter",
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
