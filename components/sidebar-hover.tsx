"use client";

import { useEffect } from "react";

// fumadocs.dev-style hover: one pill glides between sidebar items instead of
// each item flashing its own background. Per-item hover bg is removed in globals.css.
export function SidebarHover() {
  useEffect(() => {
    const list = document.querySelector<HTMLElement>(
      "#nd-sidebar [data-radix-scroll-area-viewport] > div",
    );
    if (!list) return;
    const pill = document.createElement("div");
    pill.className =
      "pointer-events-none absolute top-0 left-0 -z-1 rounded-lg bg-fd-accent/60 opacity-0 transition-opacity duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] data-visible:opacity-100 motion-safe:data-visible:transition-[translate,width,height,opacity]";
    list.style.position = "relative";
    list.style.isolation = "isolate";
    list.prepend(pill);

    const onOver = (e: PointerEvent) => {
      if (!(e.target instanceof Element)) return;
      const item = e.target.closest("a, button");
      if (!item) return;
      const r = item.getBoundingClientRect();
      const l = list.getBoundingClientRect();
      pill.style.translate = `${r.left - l.left}px ${r.top - l.top}px`;
      pill.style.width = `${r.width}px`;
      pill.style.height = `${r.height}px`;
      // Appear in place; only glide once already visible.
      if (!pill.dataset.visible) {
        pill.getBoundingClientRect();
        pill.dataset.visible = "";
      }
    };
    const onLeave = () => delete pill.dataset.visible;
    list.addEventListener("pointerover", onOver);
    list.addEventListener("pointerleave", onLeave);
    return () => {
      list.removeEventListener("pointerover", onOver);
      list.removeEventListener("pointerleave", onLeave);
      pill.remove();
    };
  }, []);
  return null;
}
