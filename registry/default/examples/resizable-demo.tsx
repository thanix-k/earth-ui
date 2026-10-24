import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/default/ui/resizable";

export default function ResizableDemo() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="max-w-lg rounded-lg border border-eds-secondary"
    >
      <ResizablePanel defaultSize="40%">
        <div className="flex h-56 flex-col gap-1 p-4">
          <span className="text-heading-14 text-eds-primary">Staff</span>
          <span className="text-body-12 text-eds-secondary">Maya, Jordan, Priya</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="60%">
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize="50%">
            <div className="flex h-full items-center justify-center p-4 text-body-12 text-eds-secondary">
              Today’s appointments
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize="50%">
            <div className="flex h-full items-center justify-center p-4 text-body-12 text-eds-secondary">
              Customer notes
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
