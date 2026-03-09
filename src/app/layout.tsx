import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Puneeth Raj | AI Engineer & ML Developer",
  description:
    "Puneeth Raj — AI & Machine Learning Engineer, Future Startup Founder. Building intelligent systems that learn, adapt, and transform how humans interact with technology.",
  keywords: [
    "Puneeth Raj",
    "AI Engineer",
    "Machine Learning",
    "Deep Learning",
    "NLP",
    "Python",
    "TensorFlow",
    "React",
    "Web Developer",
    "Hyderabad",
    "India",
  ],
  authors: [{ name: "Puneeth Raj" }],
  creator: "Puneeth Raj",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://puneethraj.dev",
    title: "Puneeth Raj | AI Engineer & ML Developer",
    description:
      "Building intelligent systems that learn, adapt, and transform how humans interact with technology.",
    siteName: "Puneeth Raj Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Puneeth Raj | AI Engineer & ML Developer",
    description: "Building intelligent systems at the frontier of AI and web.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
