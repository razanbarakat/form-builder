"use client";

import dynamic from "next/dynamic";

export const DynamicThemeProvider = dynamic(
  () =>
    import("@/components/providers/ThemeProvider").then(
      (mod) => mod.ThemeProvider
    ),
  { ssr: false }
);
