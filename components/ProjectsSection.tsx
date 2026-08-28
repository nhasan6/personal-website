import { LuArrowUpRight } from "react-icons/lu";

import { Section } from "@/components/Section";

type ProjectEntry = {
  emoji: string;
  title: string;
  description: string;
  tags: string;
  href: string;
};

const PROJECTS: ProjectEntry[] = [
  {
    emoji: "🔗",
    title: "Connections",
    description:
      "An interactive vocabulary graph that visualizes connections between words based on semantic similarity and shared origin context.",
    tags: "Fast API · Hugging Face Transformers",
    href: "https://github.com/nhasan6/words",
  },
  {
    emoji: "📖",
    title: "Book Bytes",
    description:
      "A CLI tool that turns your Goodreads reading history into polished, shareable charts that showcase your reading habits and trends.",
    tags: "pandas · Matplotlib · Selenium · bs4",
    href: "https://github.com/nhasan6/book-bytes",
  }
];

export function ProjectsSection() {
  return (
    <Section id="projects" title="Projects">
      <ul className="mt-10 flex w-full max-w-[640px] flex-col divide-y divide-muted">
        {PROJECTS.map((entry) => {
          const isExternal = entry.href.startsWith("http");
          return (
            <li
              key={entry.title}
              className="flex gap-4 rounded-2xl px-3 py-6 transition-colors hover:bg-primary/5 sm:px-4"
            >
              <span aria-hidden="true" className="text-2xl leading-none">
                {entry.emoji}
              </span>
              <div className="flex flex-1 flex-col gap-1.5">
                <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-4 sm:gap-y-1">
                  <h3 className="font-semibold text-foreground">
                    {entry.title}
                  </h3>
                  <a
                    href={entry.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    aria-label={`View ${entry.title}`}
                    className="-my-1 flex h-8 w-8 items-center justify-center self-start rounded-full text-primary transition-colors hover:bg-primary/10 sm:shrink-0"
                  >
                    <LuArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </div>
                <p className="text-sm leading-relaxed text-foreground/90 sm:text-base">
                  {entry.description}
                </p>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  {entry.tags}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
