"use client";

import { PhoneIncomingIcon, PhoneMissedIcon, SearchIcon, VoicemailIcon } from "lucide-react";
import * as React from "react";
import { Badge } from "@/registry/default/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/registry/default/ui/input-group";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/default/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/default/ui/tooltip";

const calls = [
  { caller: "Harbor Dental", kind: "answered", outcome: "Message taken", time: "2m ago" },
  { caller: "+1 503 555 0142", kind: "missed", outcome: "Spam", time: "18m ago" },
  { caller: "Rosa Jimenez", kind: "voicemail", outcome: "Callback", time: "41m ago" },
  { caller: "Northside Realty", kind: "answered", outcome: "Appointment", time: "1h ago" },
  { caller: "Kenji Mori", kind: "answered", outcome: "Transferred", time: "2h ago" },
] as const;

const kinds = {
  answered: { icon: PhoneIncomingIcon, label: "Answered by receptionist" },
  missed: { icon: PhoneMissedIcon, label: "Missed, caller hung up" },
  voicemail: { icon: VoicemailIcon, label: "Left a voicemail" },
};

const outcomeVariant = {
  "Message taken": "secondary",
  Spam: "destructive",
  Callback: "caution",
  Appointment: "positive",
  Transferred: "outline",
} as const;

export function CallLogCard() {
  const [q, setQ] = React.useState("");
  const rows = calls.filter((c) => c.caller.toLowerCase().includes(q.toLowerCase()));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent calls</CardTitle>
        <CardDescription>AnswerConnect</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <InputGroup>
          <InputGroupInput
            placeholder="Search callers"
            aria-label="Search callers"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8" />
              <TableHead>Caller</TableHead>
              <TableHead className="text-right">Outcome</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((c) => {
              const { icon: Icon, label } = kinds[c.kind];
              return (
                <TableRow key={c.caller}>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <span role="img" aria-label={label} className="flex text-eds-secondary" />
                        }
                      >
                        <Icon className="size-4" />
                      </TooltipTrigger>
                      <TooltipContent>{label}</TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{c.caller}</div>
                    <div className="text-eds-secondary">{c.time}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={outcomeVariant[c.outcome]}>{c.outcome}</Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#calls" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#calls" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#calls">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#calls" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  );
}
