"use client";

import { MapPin } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { FormField, FormLabel, FormItem, FormControl, FormMessage } from "@/components/ui/form";

import type { TEventFormData } from "@/calendar/schemas";

interface IProps {
  form: UseFormReturn<TEventFormData>;
  defaultExpanded?: boolean;
}

export function LocationFields({ form, defaultExpanded }: IProps) {
  return (
    <Accordion type="single" collapsible defaultValue={defaultExpanded ? "location" : undefined}>
      <AccordionItem value="location" className="border-none">
        <AccordionTrigger className="py-2">
          <span className="flex items-center gap-2">
            <MapPin className="size-4" />
            Location (optional)
          </span>
        </AccordionTrigger>

        <AccordionContent className="space-y-4">
          <FormField
            control={form.control}
            name="location.street"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main Street" data-invalid={fieldState.invalid} {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-start gap-2">
            <FormField
              control={form.control}
              name="location.city"
              render={({ field, fieldState }) => (
                <FormItem className="flex-1">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" data-invalid={fieldState.invalid} {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location.state"
              render={({ field, fieldState }) => (
                <FormItem className="w-24">
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="CA" maxLength={2} data-invalid={fieldState.invalid} {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location.zip"
            render={({ field, fieldState }) => (
              <FormItem className="w-32">
                <FormLabel>ZIP Code</FormLabel>
                <FormControl>
                  <Input placeholder="12345" maxLength={10} data-invalid={fieldState.invalid} {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
