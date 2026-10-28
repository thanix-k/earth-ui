import { Bubble, BubbleContent, BubbleReactions } from "@/registry/default/ui/bubble";

export default function BubbleReactionsExample() {
  return (
    <Bubble variant="secondary" className="mb-4">
      <BubbleContent>See you Friday.</BubbleContent>
      <BubbleReactions>
        <span>👍</span>
        <span>2</span>
      </BubbleReactions>
    </Bubble>
  );
}
