import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),

  title: {
    default: "Özsüt Akhisar | Lezzetin Yeni Buluşma Noktası",
    template: "%s | Özsüt Akhisar",
  },

  description:
    "Özsüt Akhisar; pasta, tatlı, kahve, kahvaltı ve sıcak yemek seçenekleriyle çok yakında Akhisar'da.",

  applicationName: "Özsüt Akhisar",

  keywords: [
    "Özsüt Akhisar",
    "Akhisar Özsüt",
    "Özsüt Manisa",
    "Akhisar cafe",
    "Akhisar restoran",
    "Akhisar pasta",
    "Akhisar kahvaltı",
    "Akhisar kahve",
    "Akhisar sıcak yemek",
  ],

  authors: [
    {
      name: "Özsüt Akhisar",
    },
  ],

  creator: "Özsüt Akhisar",
  publisher: "Özsüt Akhisar",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/",
    siteName: "Özsüt Akhisar",

    title: "Özsüt Akhisar | Lezzetin Yeni Buluşma Noktası",

    description:
      "Özsüt'ün köklü lezzet mirası Akhisar'da yeni bir hikâyeyle buluşuyor.",

    images: [
      {
        url: "/images/og-ozsut-akhisar.jpg",
        width: 1200,
        height: 630,
        alt: "Özsüt Akhisar",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Özsüt Akhisar | Lezzetin Yeni Buluşma Noktası",

    description:
      "Özsüt'ün köklü lezzet mirası Akhisar'da yeni bir hikâyeyle buluşuyor.",

    images: ["/images/og-ozsut-akhisar.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
      </body>
    </html>
  );
}