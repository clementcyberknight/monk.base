import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const actay = localFont({
  src: [
    {
      path: "./fonts/Actay-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Actay-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/ActayWide-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/ActayWide-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
});

const APP_NAME = "Monk";
const APP_DEFAULT_TITLE = "Monk";
const APP_TITLE_TEMPLATE = "%s - Monk App";
const APP_DESCRIPTION = "Spend Crypto like fiat seamlessly with Monk.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "theme-color": "#000000",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${actay.className} bg-black`}>{children}</body>
    </html>
  );
}
