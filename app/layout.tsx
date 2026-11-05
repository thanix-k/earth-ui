import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { Toaster } from "@/registry/default/ui/sonner";
import { Toaster as BaseToaster } from "@/registry/default/ui/toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: { default: site.name, template: `%s – ${site.name}` },
  description: site.description,
  metadataBase: new URL(site.url),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="flex min-h-svh flex-col antialiased">
        <RootProvider>
          {children}
          {/* shadcn's toast examples call toast() and expect these, as on shadcn's site. */}
          <Toaster position="top-center" />
          <BaseToaster />
        </RootProvider>
      </body>
    </html>
  );
}
