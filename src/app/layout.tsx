import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Ciana App",
    template: "%s | Ciana",
  },
  description: "Ciana app",
  icons: {
    icon: '/logo.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen justify-between w-full">
          <div className="space">
            <NavBar />
          </div>
          <div className="space body">
            {children}
          </div>
          <div className="w-full bg-red-200">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
