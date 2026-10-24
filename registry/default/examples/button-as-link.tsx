import { Button } from "@/registry/default/ui/button";

export default function ButtonAsLink() {
  return (
    <Button nativeButton={false} render={<a href="#link" />}>
      Book now
    </Button>
  );
}
