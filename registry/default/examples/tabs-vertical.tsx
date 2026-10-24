import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/default/ui/tabs";

export default function TabsVertical() {
  return (
    <Tabs defaultValue="general" orientation="vertical" className="w-full max-w-md gap-6">
      <TabsList variant="line">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="booking-page">Booking page</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="general" className="text-eds-secondary">
        Business name, time zone and working hours.
      </TabsContent>
      <TabsContent value="booking-page" className="text-eds-secondary">
        Your public booking page and its link.
      </TabsContent>
      <TabsContent value="notifications" className="text-eds-secondary">
        Confirmation and reminder emails.
      </TabsContent>
    </Tabs>
  );
}
