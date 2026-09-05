"use client";

import { profile } from "@/lib/dataV2";
import { useShell } from "@/components/v2/shell-context";

export function FooterV2() {
  const { setPaletteOpen, goTo } = useShell();
  return (
    <footer className="border-t border-line px-5 py-10 sm:px-8 lg:px-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mono text-[10px] tracking-[0.3em] text-mute">END OF TRANSMISSION</div>
          <div className="mt-2 text-[15px] font-medium text-paper">{profile.name}</div>
          <div className="text-[13px] text-paper-2">
            {profile.role} · {profile.location}
          </div>
        </div>
        <div className="mono flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-mute">
          <button onClick={() => goTo("top")} className="hover:text-paper">
            ↑ top
          </button>
          <button onClick={() => setPaletteOpen(true)} className="hover:text-paper">
            <span className="kbd">⌘K</span> palette
          </button>
          <a href={profile.cv} target="_blank" rel="noreferrer" className="hover:text-paper">
            cv.pdf
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-paper">
            github
          </a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
