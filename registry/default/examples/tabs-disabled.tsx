import { Tabs, TabsList, TabsTrigger } from "@/registry/default/ui/tabs";

export default function TabsDisabled() {
  return (
    <div className="flex flex-col gap-4">
      <Tabs defaultValue="day">
        <TabsList>
          <TabsTrigger value="day">Day</TabsTrigger>
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month" disabled>
            Month
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Tabs defaultValue="day">
        <TabsList variant="line">
          <TabsTrigger value="day">Day</TabsTrigger>
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month" disabled>
            Month
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
