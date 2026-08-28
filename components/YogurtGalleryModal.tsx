"use client";

import { useCallback, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { LuChevronLeft, LuChevronRight, LuX } from "react-icons/lu";

type PhotoSlide = {
  emoji: string;
  alt: string;
  caption: string;
  bg: string;
  width: string;
};

const YOGURT_PHOTOS: PhotoSlide[] = [
  {
    emoji: "🍯",
    alt: "Photo placeholder showing a honey drizzle on a warm cream background, representing a honey-topped yogurt bowl.",
    caption: "Golden honey drizzle, because a yogurt bowl isn't done without it.",
    bg: "#f0e2c4",
    width: "w-[260px]",
  },
  {
    emoji: "🍓",
    alt: "Photo placeholder showing strawberries on a soft pink background, representing a strawberry yogurt bowl.",
    caption: "Strawberries stacked just right for the photo, eaten immediately after.",
    bg: "#f2c9cf",
    width: "w-[300px]",
  },
  {
    emoji: "🥣",
    alt: "Photo placeholder showing a bowl on a cream background, representing the base yogurt bowl.",
    caption: "The blank canvas: plain yogurt, ready for toppings.",
    bg: "#ede6d8",
    width: "w-[220px]",
  },
  {
    emoji: "🫐",
    alt: "Photo placeholder showing blueberries on a pale blue background, representing a blueberry yogurt bowl.",
    caption: "Blueberries make an appearance here too, obviously.",
    bg: "#c3d3f2",
    width: "w-[260px]",
  },
  {
    emoji: "🥜",
    alt: "Photo placeholder showing granola and nuts on a tan background, representing granola toppings.",
    caption: "Extra granola for crunch, no exceptions.",
    bg: "#d9c7a8",
    width: "w-[280px]",
  },
  {
    emoji: "🍌",
    alt: "Photo placeholder showing banana slices on a pale yellow background, representing banana toppings.",
    caption: "Banana slices arranged with far too much care.",
    bg: "#f2e6b8",
    width: "w-[240px]",
  },
];

export function YogurtGalleryModal() {
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
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="cursor-pointer font-semibold text-primary underline decoration-primary/40 decoration-2 underline-offset-2 transition-colors hover:decoration-primary/70"
        >
          yoghurt bowls
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-background/70 backdrop-blur-lg" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-[60] max-h-[85vh] w-[calc(100%-3rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-background p-6 shadow-lg focus:outline-none sm:p-8">
          <Dialog.Title className="text-sm tracking-widest text-muted-foreground uppercase">
            Yogurt Bowls
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            A gallery of yogurt bowl photos, swipeable or navigable with arrow keys.
          </Dialog.Description>

          <Dialog.Close asChild>
            <button
              type="button"
              aria-label="Close gallery"
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-muted/80"
            >
              <LuX size={16} aria-hidden="true" />
            </button>
          </Dialog.Close>

          <div className="mt-6">
            <div
              ref={emblaRef}
              role="region"
              aria-roledescription="carousel"
              aria-label="Yogurt bowl photos"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              className="select-none overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              <div className="flex gap-4 px-1 py-1 sm:gap-5">
                {YOGURT_PHOTOS.map((photo, index) => (
                  <figure
                    key={photo.alt}
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${YOGURT_PHOTOS.length}`}
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
