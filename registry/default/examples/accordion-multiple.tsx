import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/default/ui/accordion";

export default function AccordionMultiple() {
  return (
    <Accordion multiple defaultValue={["hours", "breaks"]} className="max-w-md">
      <AccordionItem value="hours">
        <AccordionTrigger>Working hours</AccordionTrigger>
        <AccordionContent>Monday to Friday, 9:00 am – 6:00 pm.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="breaks">
        <AccordionTrigger>Breaks</AccordionTrigger>
        <AccordionContent>Lunch, 1:00 pm – 1:45 pm.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="time-off">
        <AccordionTrigger>Time off</AccordionTrigger>
        <AccordionContent>No time off scheduled.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
