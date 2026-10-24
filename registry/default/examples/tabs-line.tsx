import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/default/ui/tabs";

export default function TabsLine() {
  return (
    <Tabs defaultValue="services" className="w-full max-w-sm">
      <TabsList variant="line">
        <TabsTrigger value="services">Services</TabsTrigger>
        <TabsTrigger value="staff">Staff</TabsTrigger>
        <TabsTrigger value="classes">Classes</TabsTrigger>
      </TabsList>
      <TabsContent value="services" className="text-eds-secondary">
        12 services are bookable online.
      </TabsContent>
      <TabsContent value="staff" className="text-eds-secondary">
        5 staff members take bookings.
      </TabsContent>
      <TabsContent value="classes" className="text-eds-secondary">
        3 group classes run every week.
      </TabsContent>
    </Tabs>
  );
}
