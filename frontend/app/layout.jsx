import { Outfit } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const outfit = Outfit({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Friemann LOKONON - Développeur Web Fullstack Next.js & Django",
    template: "%s | Friemann LOKONON - Développeur Web Fullstack Freelance",
  },
  description:
    "Développeur Web Fullstack spécialisé en Next.js, React, Django et PostgreSQL. Je conçois des sites web, applications métier et solutions sur mesure performantes, modernes et évolutives.",
  keywords: [
    "Friemann Lokonon",
    "Développeur Web Fullstack",
    "Next.js",
    "Développeur Web Fullstack Bénin",
    "Django",
    "PostgreSQL",
    "Développeur Web",
    "Freelance",
    "Portfolio",
  ],
  authors: [{ name: "Friemann LOKONON", url: siteUrl }],
  creator: "Friemann LOKONON",
  publisher: "Friemann LOKONON",

  openGraph: {
    title: "Friemann LOKONON | Développeur Web Fullstack",
    description: "Création d'applications web modernes et évolutives avec Next.js et Django.",
    url: siteUrl,
    siteName: "Friemann LOKONON — Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Friemann LOKONON — Développeur Web Fullstack",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Friemann LOKONON | Développeur Web Fullstack",
    description: "Création d'applications web modernes et évolutives avec Next.js et Django.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" className={`${outfit.className} h-full scroll-smooth`} suppressHydrationWarning>
      <body className="min-h-screen bg-[#08080A] text-white antialiased">
        <PageTransition>
          {children}
        </PageTransition>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}