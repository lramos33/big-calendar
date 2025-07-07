import "@/styles/globals.css";

import { Analytics } from "@vercel/analytics/react";

import { inter } from "@/styles/fonts";

import { cn } from "@/lib/utils";

import { Header } from "@/components/layout/header";
import { AuthProvider } from "@/contexts/auth-context";

import { getTheme } from "@/cookies/get";

import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Big Calendar by lramos33",
  description:
    "A feature-rich calendar application built with Next.js, TypeScript, and Tailwind CSS. This project provides a modern, responsive interface for managing events and schedules with multiple viewing options.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const theme = getTheme();

  return (
    <html lang="en-US" className={cn(inter.variable, theme)}>
      <body>
        <AuthProvider>
          <Header />
          <Analytics />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
