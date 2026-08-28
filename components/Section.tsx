import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  children?: ReactNode;
};

export function Section({ id, title, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-20 flex flex-col items-center px-6 pt-16 pb-16"
    >
      <h2
        id={`${id}-heading`}
        className="text-sm tracking-widest text-muted-foreground uppercase"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
