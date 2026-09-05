"use client";

import { ShellProvider } from "@/components/v2/shell-context";
import { RailV2 } from "@/components/v2/RailV2";
import { HeroV2 } from "@/components/v2/HeroV2";
import { SystemsV2 } from "@/components/v2/SystemsV2";
import { ResearchV2 } from "@/components/v2/ResearchV2";
import { ApproachV2 } from "@/components/v2/ApproachV2";
import { AssistantSectionV2, AssistantDrawerV2 } from "@/components/v2/AssistantV2";
import { ContactV2 } from "@/components/v2/ContactV2";
import { FooterV2 } from "@/components/v2/FooterV2";
import { CommandPaletteV2 } from "@/components/v2/CommandPaletteV2";
import { PdfReaderV2 } from "@/components/v2/PdfReaderV2";

export function PortfolioV2() {
  return (
    <ShellProvider>
      <div className="blueprint min-h-screen relative text-paper">
        <RailV2 />
        <main className="relative z-[2] lg:pl-[232px]">
          <HeroV2 />
          <SystemsV2 />
          <ResearchV2 />
          <ApproachV2 />
          <AssistantSectionV2 />
          <ContactV2 />
          <FooterV2 />
        </main>
        <CommandPaletteV2 />
        <AssistantDrawerV2 />
        <PdfReaderV2 />
      </div>
    </ShellProvider>
  );
}
