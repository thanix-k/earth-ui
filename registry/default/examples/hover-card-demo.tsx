import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/registry/default/ui/hover-card";

export default function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger
        href="#staff"
        className="text-body-14 text-eds-link underline-offset-4 hover:text-eds-link-hover hover:underline lg:text-body-12"
      >
        Jordan Lee
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-col gap-1">
          <p className="text-heading-14 lg:text-heading-12">Jordan Lee</p>
          <p>Senior stylist. Cuts, colour and bridal styling.</p>
          <p className="text-eds-secondary">Works Tue–Sat, 9:00 am – 6:00 pm</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
