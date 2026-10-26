"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import { Label } from "@/registry/default/ui/label";
import { RadioGroup, RadioGroupItem } from "@/registry/default/ui/radio-group";
import { Separator } from "@/registry/default/ui/separator";
import { Slider } from "@/registry/default/ui/slider";
import { Switch } from "@/registry/default/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/default/ui/tabs";

export function RoutingRulesCard() {
  const [rings, setRings] = React.useState(4);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Call routing</CardTitle>
        <CardDescription>AnswerForce</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="hours">
          <TabsList className="w-full">
            <TabsTrigger value="hours">Business hours</TabsTrigger>
            <TabsTrigger value="after">After hours</TabsTrigger>
          </TabsList>
          <TabsContent value="hours" className="flex flex-col gap-4 pt-3">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <Label>Ring my phone first</Label>
                <span className="tabular-nums text-eds-secondary">{rings} rings</span>
              </div>
              <Slider
                value={[rings]}
                onValueChange={(v) => setRings(Array.isArray(v) ? v[0] : v)}
                min={1}
                max={8}
                aria-label="Rings before forwarding"
              />
            </div>
            <Separator />
            <RadioGroup defaultValue="dispatch" aria-label="Then">
              <span className="text-heading-14 lg:text-heading-12">If I don't pick up</span>
              <Label>
                <RadioGroupItem value="dispatch" />
                Receptionist books a technician
              </Label>
              <Label>
                <RadioGroupItem value="message" />
                Receptionist takes a message
              </Label>
              <Label>
                <RadioGroupItem value="voicemail" />
                Send to voicemail
              </Label>
            </RadioGroup>
          </TabsContent>
          <TabsContent value="after" className="flex flex-col gap-3 pt-3">
            <Label>
              <Switch defaultChecked />
              Emergency HVAC calls page on-call tech
            </Label>
            <Label>
              <Switch defaultChecked />
              Text me a summary of every call
            </Label>
            <Label>
              <Switch />
              Accept new-customer quotes overnight
            </Label>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
