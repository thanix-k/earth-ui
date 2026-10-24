import {
  CalendarCheckIcon,
  ContactIcon,
  CreditCardIcon,
  GlobeIcon,
  MessageSquareIcon,
  UsersIcon,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/registry/default/ui/navigation-menu";

const features = [
  {
    title: "Booking page",
    description: "A page customers use to book you 24/7.",
    icon: GlobeIcon,
  },
  {
    title: "Appointments",
    description: "Every booking across your team in one calendar.",
    icon: CalendarCheckIcon,
  },
  {
    title: "Payments",
    description: "Take deposits and full payments at booking.",
    icon: CreditCardIcon,
  },
];

const teams = [
  { title: "Staff", icon: UsersIcon },
  { title: "Customers", icon: ContactIcon },
  { title: "Messages", icon: MessageSquareIcon },
];

export default function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-80 gap-0.5">
              {features.map((item) => (
                <li key={item.title}>
                  <NavigationMenuLink href="#" className="items-start">
                    <item.icon className="mt-0.5" />
                    <div className="flex flex-col">
                      <span className="font-medium">{item.title}</span>
                      <span className="text-eds-secondary">{item.description}</span>
                    </div>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Teams</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-48 gap-0.5">
              {teams.map((item) => (
                <li key={item.title}>
                  <NavigationMenuLink href="#">
                    <item.icon />
                    {item.title}
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
