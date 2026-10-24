import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/default/ui/accordion";

const faqs = [
  {
    value: "reschedule",
    question: "Can customers reschedule a booking?",
    answer:
      "Yes. Each confirmation email has a link to pick a new time, up to 24 hours before the booking.",
  },
  {
    value: "deposits",
    question: "Can I take a deposit?",
    answer: "Connect a payment provider, then set a deposit amount on any service.",
  },
  {
    value: "staff",
    question: "How many staff can I add?",
    answer: "As many as your plan allows. Each one gets their own calendar.",
  },
];

export default function AccordionDemo() {
  return (
    <Accordion defaultValue={["reschedule"]} className="max-w-md">
      {faqs.map((faq) => (
        <AccordionItem key={faq.value} value={faq.value}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
