import { Progress } from "@/registry/default/ui/progress";

export default function ProgressDemo() {
  return <Progress value={60} aria-label="Profile setup" className="w-full max-w-sm" />;
}
