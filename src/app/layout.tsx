import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import Header from "../components/header";
import Footer from "../components/footer";
import AuthProvider from "../components/auth-provider"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Habla Panamá - Plataforma de Participación Ciudadana",
  description: "Plataforma ciudadana para la participación informada en las problemáticas nacionales de Panamá",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider> {/* <-- ENVUELVE TU APP CON ESTO */}
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </AuthProvider> {/* <-- CIERRE DEL PROVIDER */}
        </ThemeProvider>
      </body>
    </html>
  );
}