import { FileTextIcon } from "lucide-react";
import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/registry/default/ui/attachment";

const files = ["price-list.pdf", "intake-form.pdf", "before-photos.zip", "invoice-1042.pdf"];

export default function AttachmentGroupExample() {
  return (
    <AttachmentGroup className="w-full max-w-sm">
      {files.map((name) => (
        <Attachment key={name} orientation="vertical">
          <AttachmentMedia>
            <FileTextIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{name}</AttachmentTitle>
            <AttachmentDescription>Tap to open</AttachmentDescription>
          </AttachmentContent>
          <AttachmentTrigger aria-label={`Open ${name}`} />
        </Attachment>
      ))}
    </AttachmentGroup>
  );
}
