import type React from "react"
import type { Metadata, Viewport } from "next"
import { Figtree } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Instrument_Serif } from "next/font/google"
import "./globals.css"
import BackgroundWrapper from "@/components/background-wrapper"

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://ouadielaachkar.com"),
  title: "Ouadie | Full-stack Developer",
  description:
    "16-year-old full-stack developer from Amsterdam building production web apps, developer tools, infrastructure, and products with real users.",
  generator: "Next.js",
  applicationName: "Ouadie Portfolio",
  authors: [{ name: "Ouadie Laachkar" }],
  creator: "Ouadie Laachkar",
  publisher: "Ouadie Laachkar",
  keywords: [
    "full-stack developer",
    "portfolio",
    "Verba",
    "Amsterdam",
    "software engineer",
    "Node.js",
    "Next.js",
    "infrastructure",
  ],
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ouadielaachkar.com",
    siteName: "Ouadie | Portfolio",
    title: "Ouadie | Full-stack Developer",
    description:
      "16-year-old full-stack developer from Amsterdam building production web apps, infrastructure, automation, and products with real users.",
    images: [
      {
        url: "/favicon.svg",
        width: 400,
        height: 400,
    alt: "Ouadie - Full-stack Developer Portfolio",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Ouadie | Full-stack Developer",
    description:
      "16-year-old full-stack developer from Amsterdam building web apps, infrastructure, automation, and products with real users.",
    images: ["/favicon.svg"],
    creator: "@ouadielaachkar",
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
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#8b5cf6",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${figtree.style.fontFamily};
  --font-sans: ${figtree.variable};
  --font-mono: ${GeistMono.variable};
  --font-instrument-serif: ${instrumentSerif.variable};
}
        `}</style>
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="msapplication-TileColor" content="#8b5cf6" />
      </head>
      <body className={`${figtree.variable} ${instrumentSerif.variable}`}>
        <BackgroundWrapper>{children}</BackgroundWrapper>
      </body>
    </html>
  )
}
