import { MailIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/registry/default/ui/input-group";

export default function InputGroupInvalid() {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupAddon>
        <MailIcon />
      </InputGroupAddon>
      <InputGroupInput defaultValue="jamie@" aria-label="Email" aria-invalid />
    </InputGroup>
  );
}
