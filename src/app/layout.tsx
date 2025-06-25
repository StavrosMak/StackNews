"use client";
 import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import { FavoritesProvider } from "../context/FavoritesContext";
import { useTheme } from "../context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

function LayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = useTheme();

  return (
    <html lang="en" className={theme}>
      <body className={`${inter.className} ${theme === 'dark' ? 'bg-black text-white' : 'bg-[#e7f3f6] text-gray-900'} min-h-screen`}>
        <FavoritesProvider>
          {children}
        </FavoritesProvider>
      </body>
    </html>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <LayoutContent>
        {children}
      </LayoutContent>
    </ThemeProvider>
  );
}
