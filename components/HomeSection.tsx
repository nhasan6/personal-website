import { LuArrowUpRight, LuGithub, LuLinkedin, LuMail } from "react-icons/lu";

import { BerryBush } from "@/components/BerryBush";
import { TypingText } from "@/components/TypingText";
import { YogurtGalleryModal } from "@/components/YogurtGalleryModal";
import { CONTACT_EMAIL, LINKEDIN_URL, GITHUB_URL } from "@/lib/constants";

const SOCIAL_LINKS = [
  { label: "linkedin", href: `${LINKEDIN_URL}`, Icon: LuLinkedin, variant: "primary" as const },
  { label: "github", href: `${GITHUB_URL}`, Icon: LuGithub, variant: "primary" as const },
  {
    label: "email",
    href: `mailto:${CONTACT_EMAIL}`,
    Icon: LuMail,
    variant: "primary" as const,
  },
  { label: "resume", href: "#", Icon: LuArrowUpRight, variant: "secondary" as const },
];

const PILL_STYLES = {
  primary: "text-primary bg-primary/10 hover:bg-primary/15",
  secondary: "text-muted-foreground bg-muted hover:bg-muted/80",
};

export function HomeSection() {
  return (
    <section
      id="home"
      aria-label="Home"
      className="relative isolate flex min-h-[90vh] flex-col justify-center overflow-hidden px-6 pt-4 pb-0"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-[640px] flex-col gap-8">
        <h1 className="font-heading text-5xl font-bold text-primary sm:text-6xl md:text-7xl">
          <TypingText text="Hi, I'm Neeya" />
        </h1>

        <div className="flex flex-col gap-4 text-sm leading-relaxed text-foreground/90 sm:text-base">
          <p>
            I'm a 2A{" "}
            <span className="font-semibold text-primary">
            Software Engineering
            </span>{" "}
            student at{" "}
            <span className="font-semibold text-primary">
              The University of Waterloo.
            </span>{" "}
            I like using technology to capture those random ideas that pop into your brain before they become forgotten. 
          </p>
          {/* <p>
            more words if necessary
          </p> */}
          <p>
            Outside of tech, you can catch me preparing Pinterest-perfect{" "}
            <YogurtGalleryModal />
            , tangled up in (or untangling) a sewing project, reading a book,
            or planning my retirement on a blueberry farm.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2.5 pb-2 sm:pb-3">
          {SOCIAL_LINKS.map(({ label, href, Icon, variant }) => {
            const isExternal = href.startsWith("http");
            return (
              <a
                key={label}
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm transition-colors ${PILL_STYLES[variant]}`}
              >
                <Icon size={14} aria-hidden="true" />
                {label}
              </a>
            );
          })}
        </div>

        <BerryBush className="pointer-events-none absolute bottom-11 left-1/2 -z-10 aspect-[1335/189] w-full max-w-[780px] -translate-x-1/2 sm:bottom-8 sm:w-[112%] sm:max-w-[875px]" />
      </div>
    </section>
  );
}