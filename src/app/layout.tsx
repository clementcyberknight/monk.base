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
    statusBarStyle: "default",
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
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={actay.className}>{children}</body>
    </html>
  );
}
