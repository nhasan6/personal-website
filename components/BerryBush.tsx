import Image from "next/image";

// The decorative bush row at the bottom of the hero.
//
// Artwork lives in `public/bushes/` as transparent PNGs — `BlueberryBush1-3`
// (with berries) and `NeutralBush1-3` (plain). Those are trimmed, web-sized
// exports of the originals in `art/bushes/`; regenerate them with
// `node scripts/prepare-bushes.mjs`.
//
// The row reproduces `references/FinalBushComposition.png`. Rather than
// layering the drawings by eye, each one was located inside that image by
// matching its top edge against the finished row, so the numbers below are
// measured. They are percentages of the composition box (1335x189), which is
// why the band is given that same aspect ratio at the call site — it makes the
// percentages map one to one.
//
// Entries are painted in order, so later entries sit in front of earlier ones.

// Size of each file as exported, used to reserve space while the images load.
// `scripts/prepare-bushes.mjs` prints these when it runs.
const ART = {
  BlueberryBush1: { width: 900, height: 531 },
  BlueberryBush2: { width: 900, height: 385 },
  BlueberryBush3: { width: 900, height: 386 },
  NeutralBush1: { width: 900, height: 534 },
  NeutralBush2: { width: 900, height: 413 },
  NeutralBush3: { width: 900, height: 393 },
} as const;

type Bush = {
  art: keyof typeof ART;
  left: string; // distance from the band's left edge
  width: string; // share of the band's width — also sets the height, via the
  // drawing's own proportions
  bottom?: string; // lift off the baseline; negative dips below it
  flip?: boolean; // mirror horizontally
};

const BUSHES: Bush[] = [
  // Back — the two neutral bushes, tucked into the gaps. They read as further
  // away because the blueberry bushes overlap them on both sides.
  { art: "NeutralBush1", left: "18.8%", width: "22.9%", bottom: "1.1%" },
  { art: "NeutralBush3", left: "55.4%", width: "26.2%", bottom: "2.1%" },

  // Front — the three blueberry bushes.
  { art: "BlueberryBush3", left: "0.1%", width: "26.2%", bottom: "2.1%" },
  { art: "BlueberryBush1", left: "38.1%", width: "24.1%", bottom: "-1.1%" },
  { art: "BlueberryBush2", left: "74%", width: "25.9%", bottom: "1.1%" },
];

// NeutralBush2 is not part of the composition — it stays in ART, ready to use.

export function BerryBush({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative dark:brightness-[0.72] dark:saturate-[0.85] ${className ?? ""}`}
    >
      {BUSHES.map((bush, index) => (
        <div
          key={index}
          className="absolute"
          style={{ left: bush.left, width: bush.width, bottom: bush.bottom ?? "0%" }}
        >
          <Image
            src={`/bushes/${bush.art}.png`}
            width={ART[bush.art].width}
            height={ART[bush.art].height}
            alt=""
            sizes="(max-width: 640px) 30vw, 210px"
            className={`h-auto w-full ${bush.flip ? "-scale-x-100" : ""}`}
          />
        </div>
      ))}
    </div>
  );
}
