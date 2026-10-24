import { ChevronRightIcon, ScissorsIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/registry/default/ui/item";

export default function ItemDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Online booking</ItemTitle>
          <ItemDescription>
            Customers can book any open slot from your booking page.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Settings
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline" size="sm" render={<a href="#services" />}>
        <ItemMedia variant="icon">
          <ScissorsIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Manage services</ItemTitle>
        </ItemContent>
        <ItemActions>
          <ChevronRightIcon className="size-4 text-eds-icon-secondary" />
        </ItemActions>
      </Item>
    </div>
  );
}
