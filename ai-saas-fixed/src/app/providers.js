"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

export function Providers({ children }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Default theme is slate-indigo; standalone exports override this via standaloneConfig
      const existingTheme = document.documentElement.getAttribute("data-theme");
      if (!existingTheme) {
        document.documentElement.setAttribute("data-theme", "slate-indigo");
      }
    }
  }, []);

  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
