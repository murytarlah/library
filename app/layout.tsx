import type { Metadata } from "next";
import Link from "next/link";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Library Manager",
  description: "Books, members and loans for the church lending library",
};

function OpenBookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-7 w-7 shrink-0"
    >
      <path d="M12 6.5C10.2 5 7.6 4.5 4 4.5v13c3.6 0 6.2.5 8 2 1.8-1.5 4.4-2 8-2v-13c-3.6 0-6.2.5-8 2Z" />
      <path d="M12 6.5v13" />
    </svg>
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        <header className="border-b-4 border-brass bg-shelf text-on-shelf">
          <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-4">
            <Link href="/" className="flex items-center gap-3">
              <OpenBookIcon />
              <span className="font-serif text-xl font-semibold tracking-tight">
                Church Lending Library
              </span>
            </Link>
            <nav className="flex gap-5 text-sm uppercase tracking-[0.15em]">
              <Link href="/" className="underline-offset-4 hover:underline">
                Books
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
