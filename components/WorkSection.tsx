import Image from "next/image";
import { Section } from "@/components/Section";

type WorkEntry = {
  logo: { src: string; width: number; height: number; framed?: boolean };
  role: string;
  company: string;
  term: string;
  description: string;
  tags: string;
};

const WORK_EXPERIENCE: WorkEntry[] = [
  {
    // framed: SVG has transparent background + near-black linework, needs a light backdrop to stay legible in dark mode
    logo: { src: "/work/IFC.svg", width: 1552, height: 669, framed: true },
    role: "Software Developer Intern",
    company: "Intact Financial",
    term: "summer 2026",
    description:
      "Built internal tools and backend services to improve developer workflows and engineering operations.",
    tags: "backend-developer · co-op",
  },
  {
    logo: { src: "/work/PCC.jpg", width: 447, height: 447 },
    role: "Software Engineering Intern",
    company: "PointClickCare",
    term: "summer 2025",
    description:
      "Built a full-stack blogging platform with user authentication, role-based access, and blog/comment functionality.",
    tags: "full-stack · high school internship",
  },
];

export function WorkSection() {
  return (
    <Section id="work" title="Work">
      <ul className="mt-10 flex w-full max-w-[640px] flex-col divide-y divide-muted">
        {WORK_EXPERIENCE.map((entry) => (
          <li
            key={entry.company}
            className="flex gap-4 rounded-2xl px-3 py-6 transition-colors hover:bg-primary/5 sm:px-4"
          >
            <span
              aria-hidden="true"
              className={`flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg ${
                entry.logo.framed
                  ? "border border-black/5 bg-[#f5f6fb] p-1.5"
                  : ""
              }`}
            >
              <Image
                src={entry.logo.src}
                width={entry.logo.width}
                height={entry.logo.height}
                alt=""
                className="h-full w-full object-contain"
              />
            </span>
            <div className="flex flex-1 flex-col gap-1.5">
              <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4 sm:gap-y-1">
                <h3 className="font-semibold text-foreground">
                  {entry.role}{" "}
                  <span className="font-normal text-muted-foreground">
                    — {entry.company}
                  </span>
                </h3>
                <span className="text-sm text-muted-foreground sm:shrink-0">
                  {entry.term}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-foreground/90 sm:text-base">
                {entry.description}
              </p>
              <p className="text-xs text-muted-foreground sm:text-sm">
                {entry.tags}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
