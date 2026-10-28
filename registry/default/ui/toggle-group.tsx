"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/registry/default/lib/utils";
import { toggleVariants } from "@/registry/default/ui/toggle";

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number;
    orientation?: "horizontal" | "vertical";
  }
>({
  size: "default",
  variant: "default",
  spacing: 2,
  orientation: "horizontal",
});

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 2,
  orientation = "horizontal",
  children,
  ...props
}: ToggleGroupPrimitive.Props &
  VariantProps<typeof toggleVariants> & {
    spacing?: number;
    orientation?: "horizontal" | "vertical";
  }) {
  const gapStyle: React.CSSProperties & Record<`--${string}`, string> = {
    "--gap": String(spacing),
  };
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      data-orientation={orientation}
      orientation={orientation}
      style={gapStyle}
      className={cn(
        "group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-full data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch data-[orientation=vertical]:data-[spacing=0]:rounded-lg",
        className,
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, spacing, orientation }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  );
}

// With `spacing={0}` the items join into one segmented pill: only the outer
// ends are rounded and outline items share borders.
function ToggleGroupItem({
  className,
  children,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext);

  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        "shrink-0 focus:z-10 focus-visible:z-10",
        "group-data-[spacing=0]/toggle-group:rounded-none",
        "group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:first:rounded-l-full group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:last:rounded-r-full group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:first:rounded-t-lg group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:last:rounded-b-lg",
        "group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        className,
      )}
      {...props}
    >
      {children}
    </TogglePrimitive>
  );
}

export { ToggleGroup, ToggleGroupItem };
