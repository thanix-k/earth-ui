import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/default/ui/tabs";

export default function TabsDemo() {
  return (
    <Tabs defaultValue="upcoming" className="w-full max-w-sm">
      <TabsList>
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="past">Past</TabsTrigger>
        <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
      </TabsList>
      <TabsContent value="upcoming" className="text-eds-secondary">
        You have 4 appointments this week.
      </TabsContent>
      <TabsContent value="past" className="text-eds-secondary">
        128 appointments completed in the last 30 days.
      </TabsContent>
      <TabsContent value="cancelled" className="text-eds-secondary">
        2 appointments were cancelled this month.
      </TabsContent>
    </Tabs>
  );
}
