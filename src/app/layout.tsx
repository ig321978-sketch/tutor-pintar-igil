import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Naskh_Arabic } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoNaskh = Noto_Naskh_Arabic({
  variable: "--font-arab-naskh",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://igil.id"),
  title: "$IGIL · Tutor AI Kurikulum Merdeka",
  description:
    "Ruang belajar, tutor AI, rapor, dan ranking nasional untuk siswa Kurikulum Merdeka.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${notoNaskh.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
