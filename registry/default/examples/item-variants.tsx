import { Item, ItemContent, ItemDescription, ItemTitle } from "@/registry/default/ui/item";

export default function ItemVariants() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Item>
        <ItemContent>
          <ItemTitle>Default</ItemTitle>
          <ItemDescription>No border or fill.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Outline</ItemTitle>
          <ItemDescription>A subtle border.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>Muted</ItemTitle>
          <ItemDescription>A secondary canvas fill.</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  );
}
