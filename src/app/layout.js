"use client";

import { ThemeProvider, createTheme } from "@mui/material";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  palette: {
    primary: {
      main: "#299D91",
    },
    background: {
      default: "#f4f5f7",
    },
  },
  typography: {
    h1: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: "40px",
      fontWeight: "500",
      lineHeight: "32px",
      letterSpacing: "0.08em",
    },
    h2: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: "24px",
      fontWeight: "700",
      lineHeight: "28px",
      letterSpacing: "0em",
    },
  },
});
export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ThemeProvider>
  );
}
