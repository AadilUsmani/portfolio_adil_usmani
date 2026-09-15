"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.22, ease: "easeOut" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
