import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
import { SiteLoader } from "@/components/site-loader";
import { WhatsAppButton } from "@/components/whatsapp-button";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://canaan.church"),
  title: {
    default: "Canaan | Église Locale",
    template: "%s | Canaan",
  },
  description:
    "Bienvenue à Canaan. Connectez-vous à votre destinée et vivez une foi authentique en communauté.",
  keywords: ["église", "culte", "communauté chrétienne", "canaan", "adoration"],
  openGraph: {
    title: "Canaan | Église Locale",
    description: "Une communauté vibrante pour expérimenter la présence de Dieu.",
    url: "https://canaan.church",
    siteName: "Canaan",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://canaan.church/api/og",
        width: 1200,
        height: 630,
        alt: "Église Canaan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Canaan | Église Locale",
    description: "Une communauté vibrante pour expérimenter la présence de Dieu.",
    images: ["https://canaan.church/api/og"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    languages: {
      fr: "/fr",
      en: "/en",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Church",
    name: "Canaan",
    description: "Une communauté vibrante pour expérimenter la présence de Dieu.",
    url: "https://canaan.church",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Avenue de la Grâce",
      addressLocality: "Cotonou",
      postalCode: "0000",
      addressCountry: "BJ",
    },
  };

  return (
    <html lang="fr" className={`${inter.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-[var(--font-body)] antialiased">
        <SiteLoader />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
        <WhatsAppButton />
      </body>
    </html>
  );
}
