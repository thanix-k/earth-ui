import { Slider } from "@/registry/default/ui/slider";

export default function SliderDemo() {
  return (
    <Slider defaultValue={[30]} max={60} step={5} className="max-w-xs" aria-label="Buffer time" />
  );
}
