"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { LuChevronLeft, LuChevronRight, LuX } from "react-icons/lu";

type PhotoSlide = {
  src: string;
  alt: string;
  caption: string;
  width: string;
  /** CSS object-position for the cropped image, e.g. "center", "50% 30%", "top". */
  position?: string;
  /** Extra zoom on top of the cover crop, centered. 1 = none, 1.15 = 15% closer. */
  scale?: number;
};

const YOGURT_PHOTOS: PhotoSlide[] = [
  {
    src: "/yogurt_bowls/IMG_5624.jpg",
    alt: "A yogurt bowl topped with fresh fruit, granola, and almond butter drizzle.",
    caption: "Picasso, if his canvas were a plate.",
    width: "w-[270px]",
    position: "center",
  },
    {
    src: "/yogurt_bowls/IMG_9003.jpg",
    alt: "Overnight oats with almond butter drizzle and a wooden spoon.",
    caption: "Technically overnight oats, but no one is keeping track.",
    width: "w-[200px]",
    position: "center",
  },
  {
    src: "/yogurt_bowls/IMG_2B91EF1D0C51-1.jpeg",
    alt: "A yogurt bowl with granola, berries, and honey.",
    caption: "With a thick layer of Ontario farm honey",
    width: "w-[250px]",
    position: "center",
  },
  {
    src: "/yogurt_bowls/IMG_5358.jpg",
    alt: "A finished smoothie bowl with bananas granola.",
    caption: "The patience required to make and photograph this one in the morning is award worthy!",
    width: "w-[200px]",
    position: "center 62%",
  },
  {
    src: "/yogurt_bowls/IMG_6820.jpg",
    alt: "A yogurt bowl with bananas, blueberries, strawberries, and granola on a white background.",
    caption: "Ft: dried strawberry granola!",
    width: "w-[250px]",
    position: "center 42%",
  },
  {
    src: "/yogurt_bowls/IMG_0925AF801DB7-1.jpeg",
    alt: "A yogurt bowl with bananas, strawberries, blueberries, and potentially too much hemp hearts.",
    caption: "A chaotic amount of hemp hearts.",
    width: "w-[200px]",
    position: "center",
  }
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
            Some of My Yogurt Bowls
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
                    key={photo.src}
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${YOGURT_PHOTOS.length}`}
                    className={`flex shrink-0 flex-col gap-2 ${photo.width}`}
                  >
                    <div className="relative h-56 overflow-hidden rounded-2xl shadow-sm sm:h-64">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 640px) 80vw, 320px"
                        className="object-cover"
                        style={{
                          objectPosition: photo.position ?? "center",
                          transform: photo.scale ? `scale(${photo.scale})` : undefined,
                        }}
                      />
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
