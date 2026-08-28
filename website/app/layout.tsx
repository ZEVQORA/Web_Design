import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { site } from "@/config/site";
import "@/styles/globals.css";

/**
 * Technical mono, reserved for run IDs, hashes, model names, evidence IDs
 * and credit balances. Never decorative.
 */
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "ZEVQORA - Cut AI COGS without cutting product quality",
    template: "%s - ZEVQORA",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "ZEVQORA - Cut AI COGS without cutting product quality",
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "ZEVQORA - Cut AI COGS without cutting product quality",
    description: site.description,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={mono.variable}>
      <head>
        {/*
          Satoshi carries the headline, so it is preloaded rather than
          discovered. One variable file covers weights 300-900.
        */}
        <link
          rel="preload"
          href="/fonts/Satoshi-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-canvas text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-button focus:shadow-lift"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
