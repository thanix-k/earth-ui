import { ArrowUpIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/registry/default/ui/input-group";

export default function InputGroupTextareaExample() {
  return (
    <InputGroup className="max-w-sm">
      <InputGroupTextarea placeholder="Reply to Jamie Rivera" aria-label="Message" />
      <InputGroupAddon align="block-end">
        <InputGroupText>Sent as SMS</InputGroupText>
        <InputGroupButton size="icon-xs" variant="default" className="ml-auto" aria-label="Send">
          <ArrowUpIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
