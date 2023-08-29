"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import StyledComponentsRegistry from "./lib/registry";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ShoppingCartProvider from "./contexts/ShoppingCart";

const montserrat = Montserrat({ subsets: ["latin"] });

const theme = {
  colors: {
    primary: "#f73f01",
    secondary: "#777",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <ThemeProvider theme={theme}>
        <body className={montserrat.className}>
          <StyledComponentsRegistry>
            <Header />
            <ShoppingCartProvider>
              {children}
              <Footer />
              <ToastContainer />
            </ShoppingCartProvider>
          </StyledComponentsRegistry>
        </body>
      </ThemeProvider>
    </html>
  );
}
