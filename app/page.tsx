"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const PortfolioV2_1 = dynamic(
  () => import("@/components/v2_1/PortfolioV2_1").then((m) => m.PortfolioV2_1),
  { ssr: false }
);

const PortfolioV2 = dynamic(
  () => import("@/components/v2/PortfolioV2").then((m) => m.PortfolioV2),
  { ssr: false }
);

const PortfolioV1 = dynamic(
  () => import("@/components/v1/PortfolioV1").then((m) => m.PortfolioV1),
  { ssr: false }
);

export default function Portfolio() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [uiVariant, setUiVariant] = useState<"v1" | "v2" | "v2.1">("v2.1");

  // Sync UI variant preference
  useEffect(() => {
    try {
      const savedUi = localStorage.getItem("adil-ui-variant");
      if (savedUi === "v2.1" || savedUi === "v2" || savedUi === "v1") {
        setUiVariant(savedUi as "v1" | "v2" | "v2.1");
      }
      const savedTheme = localStorage.getItem("adil-theme");
      if (savedTheme === "dark") {
        setIsDarkMode(true);
      }
    } catch {}
  }, []);

  const handleSelectVariant = (v: "v1" | "v2" | "v2.1") => {
    setUiVariant(v);
    try {
      localStorage.setItem("adil-ui-variant", v);
    } catch {}
  };

  // Listen for global UI variant switch events from Rail or header triggers
  useEffect(() => {
    const handleSwitchEvent = (e: any) => {
      if (
        e?.detail?.variant === "v1" ||
        e?.detail?.variant === "v2" ||
        e?.detail?.variant === "v2.1"
      ) {
        handleSelectVariant(e.detail.variant);
      }
    };
    window.addEventListener("switch-ui-variant", handleSwitchEvent);
    return () => window.removeEventListener("switch-ui-variant", handleSwitchEvent);
  }, []);

  // Cross-tab theme sync
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "adil-theme") {
        setIsDarkMode(e.newValue === "dark");
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Manage html class for theme
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
      try {
        localStorage.setItem("adil-theme", "dark");
      } catch {}
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      try {
        localStorage.setItem("adil-theme", "light");
      } catch {}
    }
  }, [isDarkMode]);

  return (
    <div className={isDarkMode ? "dark" : "light"}>
      {uiVariant === "v2.1" ? (
        <PortfolioV2_1 />
      ) : uiVariant === "v2" ? (
        <PortfolioV2 />
      ) : (
        <PortfolioV1
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onSelectVariant={handleSelectVariant}
        />
      )}
    </div>
  );
}
