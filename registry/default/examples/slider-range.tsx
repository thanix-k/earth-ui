import { Slider } from "@/registry/default/ui/slider";

export default function SliderRange() {
  return (
    <Slider
      defaultValue={[25, 75]}
      max={150}
      step={5}
      className="max-w-xs"
      aria-label="Price range"
    />
  );
}
