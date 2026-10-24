import { MailIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/registry/default/ui/input-group";

export default function InputGroupDisabled() {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupAddon>
        <MailIcon />
      </InputGroupAddon>
      <InputGroupInput disabled placeholder="Email" aria-label="Email" />
    </InputGroup>
  );
}
