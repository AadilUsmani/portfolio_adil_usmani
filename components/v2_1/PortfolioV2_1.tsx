"use client";

import { ShellProvider } from "@/components/v2/shell-context";
import { RailV2 } from "@/components/v2/RailV2";
import { HeroV2_1 } from "@/components/v2_1/HeroV2_1";
import { SystemsV2_1 } from "@/components/v2_1/SystemsV2_1";
import { SkillsV2_1 } from "@/components/v2_1/SkillsV2_1";
import { AssistantSectionV2, AssistantDrawerV2 } from "@/components/v2/AssistantV2";
import { ContactV2 } from "@/components/v2/ContactV2";
import { FooterV2 } from "@/components/v2/FooterV2";
import { CommandPaletteV2 } from "@/components/v2/CommandPaletteV2";
import { PdfReaderV2 } from "@/components/v2/PdfReaderV2";

export function PortfolioV2_1() {
  return (
    <ShellProvider sections={["top", "systems", "skills", "assistant", "contact"]}>
      <div className="blueprint min-h-screen relative text-paper">
        <RailV2 />
        <main id="main-content" className="relative z-[2] lg:pl-[var(--rail-w)]">
          <HeroV2_1 />
          <SystemsV2_1 />
          <SkillsV2_1 />
          <AssistantSectionV2 index="03" />
          <ContactV2 index="04" />
          <FooterV2 />
        </main>
        <CommandPaletteV2 />
        <AssistantDrawerV2 />
        <PdfReaderV2 />
      </div>
    </ShellProvider>
  );
}
