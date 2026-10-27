import { AspectRatio } from "@/registry/default/ui/aspect-ratio";

export default function AspectRatioDemo() {
  return (
    <div className="w-full max-w-sm">
      <AspectRatio ratio={16 / 9} className="rounded-lg bg-eds-neutral-disabled">
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80"
          alt="Salon interior with styling chairs"
          className="size-full rounded-lg object-cover"
        />
      </AspectRatio>
    </div>
  );
}
