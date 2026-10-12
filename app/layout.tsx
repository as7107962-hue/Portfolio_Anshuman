import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Anshuman | AI Systems Engineer",
    template: "%s | Anshuman",
  },
  description: site.description,
  applicationName: "Anshuman Portfolio",
  keywords: [
    "AI systems engineer",
    "multi-agent systems",
    "AI automations",
    "workflow systems",
    "lead generation systems",
  ],
  openGraph: {
    title: "Anshuman | AI Systems Engineer",
    description: site.description,
    url: site.url,
    siteName: "Anshuman",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anshuman | AI Systems Engineer",
    description: site.description,
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
