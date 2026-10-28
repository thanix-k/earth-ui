import { FileTextIcon } from "lucide-react";
import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/registry/default/ui/attachment";

const states = [
  ["idle", "Drop to upload"],
  ["uploading", "Uploading"],
  ["processing", "Processing"],
  ["error", "Upload failed"],
  ["done", "240 KB"],
] as const;

export default function AttachmentStates() {
  return (
    <div className="flex flex-col gap-3">
      {states.map(([state, caption]) => (
        <Attachment key={state} state={state}>
          <AttachmentMedia>
            <FileTextIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>price-list.pdf</AttachmentTitle>
            <AttachmentDescription>{caption}</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
      ))}
    </div>
  );
}
