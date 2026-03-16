import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.02ship.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "02Ship — Learn to Build & Ship with AI (Zero Coding Required)",
    template: "%s | 02Ship",
  },
  description:
    "Learn to build and ship your ideas using Claude Code and AI coding tools — no programming experience needed. Step-by-step courses for non-programmers with zero coding experience.",
  keywords: [
    "AI coding",
    "Claude Code",
    "learn to code with AI",
    "no-code",
    "non-programmers",
    "zero coding experience",
    "build with AI",
    "ship with AI",
    "AI tools for beginners",
    "02Ship",
  ],
  authors: [{ name: "Bob Jiang" }],
  creator: "Bob Jiang",
  publisher: "02Ship",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "02Ship",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@02ship",
    site: "@02ship",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "02Ship",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  sameAs: [
    "https://twitter.com/02ship",
    "https://github.com/bobjiang/zero-to-ship",
    "https://discord.gg/btqaA3hzKp",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "02Ship",
  url: siteUrl,
  description:
    "Learn to build and ship your ideas using Claude Code and AI coding tools — no programming experience needed.",
  publisher: {
    "@type": "Organization",
    name: "02Ship",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6QP9SY7CFK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6QP9SY7CFK');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
