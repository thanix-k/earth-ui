import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

export default function CardImage() {
  return (
    <Card className="w-full max-w-sm">
      {/* biome-ignore lint/performance/noImgElement: registry examples stay framework-agnostic. */}
      <img
        src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80"
        alt="Salon interior with styling chairs"
        className="aspect-video w-full object-cover"
      />
      <CardHeader>
        <CardTitle>Deep tissue massage</CardTitle>
        <CardDescription>60 min · $85 · with Maya Patel</CardDescription>
        <CardAction>
          <Badge variant="positive">Popular</Badge>
        </CardAction>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">Book now</Button>
      </CardFooter>
    </Card>
  );
}
