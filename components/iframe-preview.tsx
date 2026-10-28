"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

// Full-page examples (e.g. sidebar) render in an iframe so fixed layout stays
// contained. The iframe is laid out at a desktop width and scaled to fit, so
// the example shows its desktop layout rather than its mobile one.
const WIDTH = 1280;
const HEIGHT = 800;

export function IframePreview({ name }: { name: string }) {
  const { resolvedTheme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setScale(entry.contentRect.width / WIDTH);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-xl border border-eds-tertiary bg-eds-canvas"
      style={{ height: HEIGHT * scale }}
    >
      <iframe
        title={`${name} preview`}
        src={`/preview/${name}?bleed=1&theme=${resolvedTheme === "dark" ? "dark" : "light"}`}
        className="origin-top-left"
        style={{ width: WIDTH, height: HEIGHT, transform: `scale(${scale})` }}
      />
    </div>
  );
}
