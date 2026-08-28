"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/constants";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV_LINKS = [
  { href: "#home", label: "home" },
  { href: "#projects", label: "projects" },
  { href: "#work", label: "work" },
  { href: "#personal", label: "personal" },
];

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-muted bg-background/70 backdrop-blur-lg">
      <div className="relative mx-auto flex max-w-5xl items-center justify-end px-6 py-4">
        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 md:absolute md:left-1/2 md:flex md:-translate-x-1/2"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="rounded-full bg-primary px-4 py-2 text-sm text-white transition-colors hover:bg-primary/90 dark:text-background"
          >
            contact
          </a>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center md:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
              className="text-foreground"
            >
              {isOpen ? (
                <path d="M4 4l12 12M16 4L4 16" />
              ) : (
                <path d="M3 5h14M3 10h14M3 15h14" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="flex flex-col gap-1 px-6 pb-4 md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-2 rounded-full bg-primary px-4 py-2 text-center text-sm text-white transition-colors hover:bg-primary/90 dark:text-background"
            onClick={() => setIsOpen(false)}
          >
            contact
          </a>
        </nav>
      )}
    </header>
  );
}
