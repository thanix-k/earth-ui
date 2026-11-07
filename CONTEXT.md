# Earth UI

Earth UI is AnywhereWorks' design system: shadcn/ui components shaped only by a Preset, shipped two ways (npm package and shadcn registry) from one source.

## Language

### The design system

**Preset**:
The shadcn preset code (`bIkeymG`) plus init flags that decide the look of every Component. The only place the design system is customised.
_Avoid_: theme config, customisation, overrides

**Theme**:
The tokens (colours, radius, font) produced by the Preset, shipped as a stylesheet and as a registry item.
_Avoid_: tokens file, skin

**Component**:
A UI building block exactly as shadcn generates it under the Preset. Never edited by hand.
_Avoid_: primitive, widget, fork

**Example**:
A small usage demo of a Component, taken from shadcn's registry, shown in the docs.
_Avoid_: demo, story, snippet

**Registry item**:
One installable unit in the Earth UI shadcn registry (a Component, the Theme, a hook, a lib file, or an Example).
_Avoid_: block, package

### Distribution

**Install mode**:
How a Consumer gets Components: **npm mode** (depend on the published package) or **registry mode** (copy source into their project with the shadcn CLI).
_Avoid_: channel, flavour

**Consumer**:
A team or app that uses Earth UI in either Install mode.
_Avoid_: user, client

### Maintenance

**Upstream sync**:
Regenerating every Component and Example from the latest shadcn under the Preset, reviewed as one change.
_Avoid_: update, upgrade, rebase

**DS team**:
The people who own the Preset, the Theme and Upstream syncs. Nobody else changes them.
_Avoid_: maintainers, core team

**Prototyper**:
A future tool for agentic prototyping on top of Earth UI. Deliberately undefined for now.
