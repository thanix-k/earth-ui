import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Earth's theme keys, so cn() keeps `text-body-14` next to `text-eds-secondary`
// instead of reading both as text colours.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "body-8",
        "body-10",
        "body-12",
        "body-14",
        "body-16",
        "body-20",
        "heading-12",
        "heading-14",
        "heading-16",
        "heading-18",
        "heading-20",
        "heading-24",
        "heading-28",
        "heading-32",
      ],
      shadow: ["eds-10", "eds-20", "eds-30", "eds-40", "eds-50"],
      "font-weight": ["eds-regular", "eds-strong", "eds-stronger"],
      ease: ["eds-regular", "eds-entrance"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
