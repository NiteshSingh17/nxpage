import Image from "next/image";
import { Heading } from "./_components/heading";
import { Text } from "./_components/text";
import { PrimaryButton, SecondaryButton } from "./_components/button";
import Link from "next/link";
import { ThemeToggle } from "./_components/theme-toggle";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center font-sans bg-background relative overflow-hidden">

      {/* Global Theme Toggle (Top Right) */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Subtle Background Glow for modern effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-zinc-200/50 dark:bg-zinc-800/20 blur-[120px] rounded-full pointer-events-none" />

      <main className="relative z-10 w-full max-w-4xl px-6 py-24 text-center">
        {/* Logo Section */}
        <div className="mb-12 flex justify-center animate-fade-in delay-100 opacity-0">
          <Image
            className="dark:invert drop-shadow-sm transition-transform duration-500 hover:scale-105"
            src="/logo.png"
            alt="NxPage logo"
            width={160}
            height={80}
            priority
          />
        </div>

        {/* Badge Area */}
        <div className="mb-8 flex justify-center animate-fade-in delay-200 opacity-0">
          <span className="inline-flex items-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 px-4 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            NxPage
          </span>
        </div>

        {/* Heading */}
        <div className="mx-auto max-w-3xl animate-slide-up delay-300 opacity-0">
          <Heading>
            Serve Smart: JSON for AI. <br className="hidden sm:block" /> Full App for Humans.
          </Heading>
        </div>

        {/* Subtext */}
        <div className="mx-auto mt-8 max-w-2xl animate-fade-in delay-[400ms] opacity-0">
          <Text>
            Deliver exactly what each visitor needs. With nxpage, AI agents and crawlers receive a lightweight, structured JSON response while real users continue to enjoy your full Next.js experience with complete HTML, JS bundles, and hydration.
          </Text>
        </div>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up delay-[500ms] opacity-0">
          <Link href='/docs/overview'>
            <SecondaryButton>Read the Docs</SecondaryButton>
          </Link>
          <Link href='/demo'>
            <PrimaryButton>View Demo</PrimaryButton>
          </Link>
        </div>
      </main>
    </div>
  );
}

