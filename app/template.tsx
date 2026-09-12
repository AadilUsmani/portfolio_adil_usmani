"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.22,
        ease: "easeOut",
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
