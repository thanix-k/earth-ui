// Guards the tailwind-merge config generated into registry/default/lib/utils.ts.
import assert from "node:assert/strict";
import { cn } from "../registry/default/lib/utils.ts";

assert.equal(cn("text-body-14 text-eds-secondary"), "text-body-14 text-eds-secondary");
assert.equal(cn("text-body-14 text-heading-24"), "text-heading-24");
assert.equal(cn("text-eds-primary text-muted-foreground"), "text-muted-foreground");
assert.equal(cn("shadow-eds-10 shadow-eds-30"), "shadow-eds-30");
assert.equal(cn("shadow-eds-10 shadow-black/10"), "shadow-eds-10 shadow-black/10");
assert.equal(cn("bg-eds-neutral bg-eds-neutral-hover"), "bg-eds-neutral-hover");
assert.equal(cn("font-eds-strong font-semibold"), "font-semibold");
console.log("✓ cn merges Earth classes correctly");
