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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nirbhaysingh.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nirbhay Singh | AI Engineer & Software Engineer",
    template: "%s | Nirbhay Singh",
  },
  description:
    "Portfolio of Nirbhay Singh — AI & Software Engineer building production-grade Generative AI systems, RAG pipelines, custom LLMs, and real-time NLP agents.",
  keywords: [
    "Nirbhay Singh",
    "Nirbhay Singh AI Engineer",
    "Nirbhay Singh Software Engineer",
    "Nirbhay Singh Portfolio",
    "Nirbhay Singh Jamshedpur",
    "Nirbhay Singh Jharkhand",
    "AI Engineer Jamshedpur",
    "Generative AI Developer",
    "RAG pipelines",
    "custom LLMs",
    "Nirbhay Singh developer",
    "nirbhayksingh012"
  ],
  authors: [{ name: "Nirbhay Singh", url: "https://github.com/nirbhayksingh012" }],
  creator: "Nirbhay Singh",
  publisher: "Nirbhay Singh",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Nirbhay Singh | AI Engineer & Software Engineer",
    description:
      "AI & Software Engineer building production-grade GenAI systems — custom LLMs, RAG pipelines, and real-time NLP agents.",
    url: "./",
    siteName: "Nirbhay Singh Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Nirbhay Singh - AI Engineer & Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nirbhay Singh | AI Engineer & Software Engineer",
    description:
      "AI & Software Engineer building production-grade GenAI systems — custom LLMs, RAG pipelines, and real-time NLP agents.",
    creator: "@nirbhayksingh012",
    images: ["/images/profile.jpg"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Nirbhay Singh",
              "url": siteUrl,
              "image": `${siteUrl}/images/profile.jpg`,
              "jobTitle": "AI Engineer & Software Engineer",
              "worksFor": {
                "@type": "Organization",
                "name": "Anantron International Pvt Ltd"
              },
              "knowsAbout": [
                "Artificial Intelligence",
                "Generative AI",
                "Large Language Models",
                "RAG (Retrieval-Augmented Generation)",
                "Natural Language Processing",
                "Machine Learning",
                "Software Engineering",
                "Next.js",
                "FastAPI",
                "Python",
                "PyTorch"
              ],
              "sameAs": [
                "https://github.com/nirbhayksingh012",
                "https://www.linkedin.com/in/nirbhay-singh-5229542b2",
                "mailto:nirbhayksingh14@gmail.com"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Jamshedpur",
                "addressRegion": "Jharkhand",
                "addressCountry": "India"
              }
            })
          }}
        />
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
