import { CalendarIcon } from "lucide-react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/registry/default/ui/item";

export default function ItemSize() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      {(["default", "sm", "xs"] as const).map((size) => (
        <Item key={size} variant="outline" size={size}>
          <ItemMedia variant="icon">
            <CalendarIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Haircut with Maya</ItemTitle>
            <ItemDescription>Thu 24 Oct, 2:30 – 3:15 pm</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  );
}
