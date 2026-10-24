import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/registry/default/ui/input-group";

export default function InputGroupTextExample() {
  return (
    <div className="grid w-full max-w-xs gap-4">
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>$</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="45.00" aria-label="Service price" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>USD</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>setmore.com/</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="glow-salon" aria-label="Booking page URL" />
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="30" aria-label="Buffer time" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>minutes</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
