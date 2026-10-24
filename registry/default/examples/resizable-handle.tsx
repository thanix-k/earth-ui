import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/default/ui/resizable";

export default function ResizableWithHandle() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-h-48 max-w-md rounded-lg border border-eds-secondary"
    >
      <ResizablePanel defaultSize="30%" minSize="20%">
        <div className="flex h-full items-center justify-center p-4 text-body-12 text-eds-secondary">
          Services
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="70%">
        <div className="flex h-full items-center justify-center p-4 text-body-12 text-eds-secondary">
          Service details
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
