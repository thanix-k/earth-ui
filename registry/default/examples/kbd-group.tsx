import { Kbd, KbdGroup } from "@/registry/default/ui/kbd";

export default function KbdGroupExample() {
  return (
    <p className="text-body-14 text-eds-secondary lg:text-body-12">
      Press{" "}
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>{" "}
      to search customers.
    </p>
  );
}
