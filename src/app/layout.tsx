import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], weight: ["300", "400", "600", "700"] });

export const metadata: Metadata = {
  title: "Sumanth Srinivas — React Native Engineer",
  description:
    "React Native engineer shipping bare-workflow iOS and Android apps end to end: features, payments, analytics, CI/CD and store releases.",
  openGraph: {
    title: "Sumanth Srinivas — React Native Engineer",
    description: "Mobile platform & release engineering: React Native, GitHub Actions + Fastlane, analytics and payments.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} dark antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
