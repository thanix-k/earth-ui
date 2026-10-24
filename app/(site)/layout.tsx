import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <div className="flex min-h-svh flex-col bg-eds-canvas-secondary">
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
      </div>
    </ThemeProvider>
  );
}
