import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono, Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import "./globals.css";
import "./lightfall.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nirbhay Singh — AI Engineer & Software Engineer",
  description:
    "Portfolio of Nirbhay Singh — AI Engineer and Software Engineer building RAG pipelines, LLM systems, and production-grade full-stack applications.",
  authors: [{ name: "Nirbhay Singh" }],
  openGraph: {
    title: "Nirbhay Singh — AI Engineer & Software Engineer",
    description:
      "Building scalable AI-powered applications, RAG pipelines, LLM systems, and modern web experiences.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(spaceGrotesk.variable, jetbrainsMono.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
            {children}
          </SmoothScroll>
          <Toaster richColors theme="dark" position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
