import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import { defaultMetadata } from "@/config/metadata";
import Footer from "@/components/layout/footer/sitefooter";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const calendas = localFont({
  src: "./fonts/calendas.woff",
  variable: "--font-calendas-local",
  display: "swap",
});

const azeretMono = localFont({
  src: "./fonts/azeret-mono.woff2",
  variable: "--font-azeret-mono-local",
  display: "swap",
});

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${calendas.variable} ${azeretMono.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <div className="relative">
          <Footer />
        </div>
      </body>
    </html>
  );
}
