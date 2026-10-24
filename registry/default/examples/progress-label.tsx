import { Progress, ProgressLabel, ProgressValue } from "@/registry/default/ui/progress";

export default function ProgressLabelExample() {
  return (
    <Progress value={75} className="w-full max-w-sm">
      <ProgressLabel>Importing customers</ProgressLabel>
      <ProgressValue />
    </Progress>
  );
}
