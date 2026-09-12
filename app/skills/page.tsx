import { SkillsDetailView } from "@/components/skills-detail/SkillsDetailView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technical Skills & Engineering Mastery · Muhammad Adil Usmani",
  description:
    "Comprehensive skills matrix covering AI Agent Frameworks, Distributed Systems, and Computational Neuroscience with verified production proofs.",
};

export default function SkillsPage() {
  return <SkillsDetailView />;
}
