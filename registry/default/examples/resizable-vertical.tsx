import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/default/ui/resizable";

export default function ResizableVertical() {
  return (
    <ResizablePanelGroup
      orientation="vertical"
      className="min-h-64 max-w-md rounded-lg border border-eds-secondary"
    >
      <ResizablePanel defaultSize="30%">
        <div className="flex h-full items-center justify-center p-4 text-body-12 text-eds-secondary">
          Appointment details
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="70%">
        <div className="flex h-full items-center justify-center p-4 text-body-12 text-eds-secondary">
          Booking history
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
