import { Slider } from "@/registry/default/ui/slider";

export default function SliderVertical() {
  return (
    <div className="flex h-40 items-center gap-8">
      <Slider defaultValue={[60]} orientation="vertical" aria-label="Volume" />
      <Slider defaultValue={[20, 80]} orientation="vertical" aria-label="Range" />
    </div>
  );
}
