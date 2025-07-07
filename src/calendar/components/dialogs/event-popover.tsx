"use client";

import { useState } from "react";
import { format, parseISO, isSameDay } from "date-fns";
import { 
  Calendar, 
  Clock, 
  Text, 
  User, 
  Edit, 
  Palette,
  ExternalLink,
  Github,
  Zap
} from "lucide-react";
import { Icon } from "@iconify/react";
import { cva } from "class-variance-authority";

import { useCalendar } from "@/calendar/contexts/calendar-context";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";

import { EditEventDialog } from "@/calendar/components/dialogs/edit-event-dialog";

import { cn } from "@/lib/utils";

import type { IEvent } from "@/calendar/interfaces";
import type { VariantProps } from "class-variance-authority";

const colorBadgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-1 text-xs font-medium",
  {
    variants: {
      color: {
        // Colored and mixed variants
        blue: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300",
        green: "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
        red: "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300",
        yellow: "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
        purple: "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300",
        orange: "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300",
        gray: "border-neutral-200 bg-neutral-50 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300",

        // Dot variants
        "blue-dot": "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300",
        "green-dot": "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
        "red-dot": "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300",
        "yellow-dot": "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
        "purple-dot": "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300",
        "orange-dot": "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300",
        "gray-dot": "border-neutral-200 bg-neutral-50 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300",
      },
    },
    defaultVariants: {
      color: "blue",
    },
  }
);

interface IProps {
  event: IEvent;
  children: React.ReactNode;
}

const colorMap = {
  blue: "bg-blue-500",
  green: "bg-green-500", 
  red: "bg-red-500",
  yellow: "bg-yellow-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
  gray: "bg-gray-500",
};

export function EventPopover({ event, children }: IProps) {
  const [open, setOpen] = useState(false);
  const { badgeVariant } = useCalendar();
  
  const startDate = parseISO(event.startDate);
  const endDate = parseISO(event.endDate);
  const isMultiDay = !isSameDay(startDate, endDate);

  const formatDate = (date: Date) => format(date, "MMM d, yyyy");
  const formatTime = (date: Date) => format(date, "h:mm a");
  const formatDateTime = (date: Date) => format(date, "MMM d, yyyy 'at' h:mm a");

  // Use the same logic as the calendar components to determine badge color
  const badgeColor = (badgeVariant === "dot" ? `${event.color}-dot` : event.color) as VariantProps<typeof colorBadgeVariants>["color"];

  const getIntegrationIcon = (iconName: string) => {
    // Direct icon mapping to ensure icons work
    const iconMap: Record<string, string> = {
      "simple-icons:linear": "simple-icons:linear",
      "simple-icons:github": "simple-icons:github", 
      "simple-icons:clickup": "simple-icons:clickup",
      "simple-icons:notion": "simple-icons:notion",
      "simple-icons:slack": "simple-icons:slack",
      "simple-icons:microsoftoutlook": "simple-icons:microsoftoutlook",
      "logos:google-calendar": "logos:google-calendar",
      "lucide:calendar": "lucide:calendar"
    };
    
    console.log('Event integration icon:', iconName);
    const mappedIcon = iconMap[iconName];
    if (!mappedIcon) {
      console.warn('Icon not found, using fallback:', iconName);
      return "lucide:calendar";
    }
    return mappedIcon;
  };

  const renderIntegrationIcon = (iconName: string, integrationName: string) => {
    // Try iconify first, with lucide fallbacks
    const lucideFallbacks: Record<string, React.ReactNode> = {
      "GitHub": <Github className="w-3 h-3" />,
      "Linear": <Zap className="w-3 h-3" />,
      "Google Calendar": <Calendar className="w-3 h-3" />,
      "Manual Events": <Calendar className="w-3 h-3" />
    };

    console.log('Rendering icon for:', integrationName, iconName);
    
    return (
      <>
        <Icon 
          icon={getIntegrationIcon(iconName)}
          className="w-3 h-3" 
          onLoad={() => console.log('Icon loaded successfully:', iconName)}
          onError={() => {
            console.error('Icon failed to load:', iconName);
            // Show lucide fallback if iconify fails
            return lucideFallbacks[integrationName] || <Calendar className="w-3 h-3" />;
          }}
        />
        {/* Lucide fallback if iconify completely fails to render */}
        <noscript>
          {lucideFallbacks[integrationName] || <Calendar className="w-3 h-3" />}
        </noscript>
      </>
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0 shadow-lg" 
        align="start"
        side="right"
        sideOffset={8}
      >
        <div className="p-4">
          {/* Header */}
          <div className="flex items-start gap-3 mb-4">
            <div className={cn("w-3 h-3 rounded-full flex-shrink-0 mt-1", colorMap[event.color])} />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base leading-tight mb-1 break-words">
                {event.title}
              </h3>
              <div className="flex items-center gap-2">
                <Avatar className="w-5 h-5">
                  <AvatarImage src={event.user.picturePath ?? undefined} alt={event.user.name} />
                  <AvatarFallback className="text-xs">{event.user.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">{event.user.name}</span>
              </div>
            </div>
          </div>

          <Separator className="mb-4" />

          {/* Event Details */}
          <div className="space-y-3">
            {/* Date & Time */}
            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                {isMultiDay ? (
                  <div className="space-y-1">
                    <div>
                      <span className="font-medium">Starts:</span>{" "}
                      <span className="text-muted-foreground">{formatDateTime(startDate)}</span>
                    </div>
                    <div>
                      <span className="font-medium">Ends:</span>{" "}
                      <span className="text-muted-foreground">{formatDateTime(endDate)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div>
                      <span className="font-medium">Date:</span>{" "}
                      <span className="text-muted-foreground">{formatDate(startDate)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {formatTime(startDate)} - {formatTime(endDate)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {event.description && (
              <div className="flex items-start gap-2">
                <Text className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <span className="font-medium">Description</span>
                  <p className="text-muted-foreground mt-1 break-words leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            )}

            {/* Color Badge */}
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-muted-foreground" />
              <div className={cn(colorBadgeVariants({ color: badgeColor }), "capitalize")}>
                {event.color}
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Integration Source & Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Source</span>
              <Badge 
                variant="secondary" 
                className="gap-1.5 px-2.5 py-1 h-6 font-medium"
              >
                {renderIntegrationIcon(event.integration.icon, event.integration.name)}
                {event.integration.name}
                {event.integration.externalId && (
                  <ExternalLink className="w-3 h-3 opacity-60" />
                )}
              </Badge>
            </div>
            
            <EditEventDialog event={event}>
              <Button variant="outline" size="sm" className="gap-2 h-8">
                <Edit className="w-3 h-3" />
                Edit
              </Button>
            </EditEventDialog>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
