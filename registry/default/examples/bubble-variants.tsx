import { Bubble, BubbleContent, BubbleGroup } from "@/registry/default/ui/bubble";

const variants = [
  "default",
  "secondary",
  "muted",
  "tinted",
  "outline",
  "ghost",
  "destructive",
] as const;

export default function BubbleVariants() {
  return (
    <BubbleGroup className="w-full max-w-md">
      {variants.map((variant) => (
        <Bubble key={variant} variant={variant}>
          <BubbleContent>{variant}</BubbleContent>
        </Bubble>
      ))}
    </BubbleGroup>
  );
}
