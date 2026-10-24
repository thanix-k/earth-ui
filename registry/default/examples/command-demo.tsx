import {
  CalendarPlusIcon,
  ClockIcon,
  ScissorsIcon,
  SettingsIcon,
  UserRoundIcon,
  UsersIcon,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/registry/default/ui/command";

export default function CommandDemo() {
  return (
    <Command className="max-w-sm border border-eds-secondary shadow-eds-20">
      <CommandInput placeholder="Search bookings, staff, services…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <CalendarPlusIcon />
            New appointment
          </CommandItem>
          <CommandItem>
            <ClockIcon />
            Working hours
          </CommandItem>
          <CommandItem disabled>
            <ScissorsIcon />
            Services
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <UserRoundIcon />
            Profile
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <UsersIcon />
            Staff
            <CommandShortcut>⌘T</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <SettingsIcon />
            Booking page
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
