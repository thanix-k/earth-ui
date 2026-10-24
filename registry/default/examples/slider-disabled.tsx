import { Slider } from "@/registry/default/ui/slider";

export default function SliderDisabled() {
  return <Slider defaultValue={[40]} disabled className="max-w-xs" aria-label="Capacity" />;
}
