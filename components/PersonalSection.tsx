"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import { Section } from "@/components/Section";

type PhotoSlide = {
  emoji: string;
  alt: string;
  caption: string;
  bg: string;
  width: string;
};

const PHOTOS: PhotoSlide[] = [
  {
    emoji: "🧵",
    alt: "Photo placeholder showing a spool of thread and needle on a soft plum background, representing sewing.",
    caption: "The best honey ever! Sourced from building a handmade wardrobe, one late-night sewing project at a time.",
    bg: "#d8c9e8",
    width: "w-[230px]",
  },
  {
    emoji: "🏁",
    alt: "Photo placeholder showing a checkered racing flag on a deep blue background, representing motorsport.",
    caption: "Watching F1 qualifying live at 3am, no matter the time zone.",
    bg: "#93a4d6",
    width: "w-[320px]",
  },
  {
    emoji: "🫐",
    alt: "Photo placeholder showing a cluster of blueberries on a pale blue background, representing baking with blueberries.",
    caption: "Turning fresh blueberries into questionable but well-intentioned baked goods.",
    bg: "#c3d3f2",
    width: "w-[260px]",
  },
  {
    emoji: "🏔️",
    alt: "Photo placeholder showing a mountain on a sage green background, representing hiking.",
    caption: "Chasing trailheads and lookout points on weekends away from the screen.",
    bg: "#b7cdb0",
    width: "w-[300px]",
  },
  {
    emoji: "📷",
    alt: "Photo placeholder showing a camera on a muted olive-green background, representing travel photography.",
    caption: "Collecting way too many photos from wherever the next trip lands.",
    bg: "#96ab7c",
    width: "w-[210px]",
  },
  {
    emoji: "🎧",
    alt: "Photo placeholder showing headphones on a periwinkle background, representing music.",
    caption: "Building playlists for every mood that somehow all end up the same genre.",
    bg: "#a9b6e0",
    width: "w-[280px]",
  },
];

export function PersonalSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", skipSnaps: true, dragFree: false },
    [WheelGesturesPlugin()],
  );
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // Embla's recommended React setup: sync button state once on mount, then
    // keep it in sync via the emitted events below.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      emblaApi?.scrollNext();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      emblaApi?.scrollPrev();
    }
  };

  return (
    <Section id="personal" title="A Peek Into My Life">
      <div className="mt-10 w-full max-w-5xl">
        <div
          ref={emblaRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Personal photos"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="select-none overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        >
          <div className="flex gap-4 px-1 py-1 sm:gap-5">
            {PHOTOS.map((photo, index) => (
              <figure
                key={photo.alt}
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${PHOTOS.length}`}
                className={`flex shrink-0 flex-col gap-2 ${photo.width}`}
              >
                <div
                  role="img"
                  aria-label={photo.alt}
                  className="flex h-56 items-center justify-center rounded-2xl text-6xl shadow-sm sm:h-64"
                  style={{ backgroundColor: photo.bg }}
                >
                  <span aria-hidden="true">{photo.emoji}</span>
                </div>
                <figcaption className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            aria-label="Previous photo"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-muted/80 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <LuChevronLeft size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            aria-label="Next photo"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-muted/80 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <LuChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </Section>
  );
}
