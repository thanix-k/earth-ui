import { CalendarDaysIcon, ListIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/registry/default/ui/tabs";

export default function TabsWithIcon() {
  return (
    <Tabs defaultValue="calendar">
      <TabsList>
        <TabsTrigger value="calendar">
          <CalendarDaysIcon data-icon="inline-start" />
          Calendar
        </TabsTrigger>
        <TabsTrigger value="list">
          <ListIcon data-icon="inline-start" />
          List
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
