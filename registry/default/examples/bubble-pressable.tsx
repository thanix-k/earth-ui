import { Bubble, BubbleContent } from "@/registry/default/ui/bubble";

export default function BubblePressable() {
  return (
    <Bubble variant="tinted">
      <BubbleContent render={<button type="button" />}>Join the video call</BubbleContent>
    </Bubble>
  );
}
