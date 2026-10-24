import { PlusIcon } from "lucide-react";
import { Fragment } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/default/ui/avatar";
import { Button } from "@/registry/default/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/registry/default/ui/item";

const staff = [
  {
    name: "Maya Patel",
    role: "Senior stylist",
    initials: "MP",
    image: "https://github.com/shadcn.png",
  },
  { name: "James Lee", role: "Barber", initials: "JL" },
  { name: "Aisha Rahman", role: "Nail technician", initials: "AR" },
];

export default function ItemAvatar() {
  return (
    <ItemGroup className="max-w-md gap-0">
      {staff.map((person, index) => (
        <Fragment key={person.name}>
          {index > 0 && <ItemSeparator />}
          <Item>
            <ItemMedia>
              <Avatar>
                {person.image && <AvatarImage src={person.image} alt={person.name} />}
                <AvatarFallback>{person.initials}</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{person.name}</ItemTitle>
              <ItemDescription>{person.role}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="outline" size="icon-sm" aria-label={`Assign ${person.name}`}>
                <PlusIcon />
              </Button>
            </ItemActions>
          </Item>
        </Fragment>
      ))}
    </ItemGroup>
  );
}
