"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/registry/default/ui/toggle-group";

type Vars = Record<string, string>;
export type DemoTheme = { name: string; title: string; cssVars: { light?: Vars; dark?: Vars } };

// Previews the registry:theme items. Sets their vars on <html> (so portalled
// popovers and toasts get them too) and removes them when you leave the page.
export function ThemeSwitcher({ themes }: { themes: DemoTheme[] }) {
  const [name, setName] = useState(themes[0].name);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const { light = {}, dark = {} } = themes.find((t) => t.name === name)?.cssVars ?? {};
    // Light values apply in both modes unless dark overrides them, as in globals.css.
    const vars = { ...light, ...(resolvedTheme === "dark" ? dark : {}) };
    const style = document.documentElement.style;
    for (const [k, v] of Object.entries(vars)) style.setProperty(`--${k}`, v);
    return () => {
      for (const k of Object.keys(vars)) style.removeProperty(`--${k}`);
    };
  }, [name, resolvedTheme, themes]);

  return (
    <ToggleGroup
      variant="outline"
      value={[name]}
      onValueChange={(value) => value[0] && setName(value[0])}
      aria-label="Theme"
    >
      {themes.map((t) => (
        <ToggleGroupItem key={t.name} value={t.name}>
          {t.title}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
