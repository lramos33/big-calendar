"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Check, ArrowLeftRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
} from "@/components/ui/dialog";

import { INTEGRATION_CONFIGS } from "@/calendar/integrations/config";
import type { TIntegrationType, IIntegration } from "@/calendar/integrations/types";

interface IntegrationSetupDialogProps {
  integrationType: TIntegrationType;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect?: (integrationType: TIntegrationType) => void;
  onCancel?: () => void;
}

export function IntegrationSetupDialog({ 
  integrationType,
  isOpen,
  onOpenChange,
  onConnect,
  onCancel
}: IntegrationSetupDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const config = INTEGRATION_CONFIGS[integrationType];

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      // Demo: Show loading state for 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));
      await onConnect?.(integrationType);
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  const features = {
    "manual": [
      "Create and manage events manually in the calendar",
      "Full control over event details and timing",
      "No external dependencies or API limits",
      "Instant event creation and updates",
      "Custom event categories and colors"
    ],
    "google-calendar": [
      "Two-way sync with Google Calendar",
      "Import existing events and meetings",
      "Real-time updates and notifications",
      "Support for recurring events",
      "Automatic timezone handling"
    ],
    "linear": [
      "Import issues as calendar events",
      "Track project deadlines and milestones",
      "Sync with sprint planning cycles",
      "Automatic status updates",
      "Team collaboration insights"
    ],
    "clickup": [
      "Sync tasks with due dates to calendar",
      "Project milestone tracking",
      "Time tracking integration",
      "Custom field mapping",
      "Workflow automation triggers"
    ],
    "notion": [
      "Database item synchronization",
      "Content schedule management",
      "Property-based event creation",
      "Rich content integration",
      "Template-driven event creation"
    ],
    "github": [
      "Repository milestone tracking",
      "Release schedule management",
      "Issue deadline monitoring",
      "Project board integration",
      "Commit activity insights"
    ],
    "slack": [
      "Scheduled message reminders",
      "Meeting link integration",
      "Channel event notifications",
      "Workflow automation",
      "Team availability tracking"
    ],
    "outlook": [
      "Microsoft 365 calendar sync",
      "Exchange server compatibility",
      "Meeting invitation handling",
      "Contact integration",
      "Enterprise security compliance"
    ]
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6">
        <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6">
          <div className="flex w-full flex-col items-center gap-2 border-b pb-4">
            <div className="mb-2 mt-2 flex items-center justify-center gap-4">
              <div className="bg-background flex h-12 w-12 items-center justify-center rounded-lg border p-3 shadow">
                <Icon 
                  icon={config.icon} 
                  className="h-6 w-6"
                />
              </div>
              <ArrowLeftRight className="size-4" />
              <div className="bg-background flex h-12 w-12 items-center justify-center rounded-lg border p-3 shadow">
                <Icon 
                  icon="lucide:calendar" 
                  className="h-6 w-6"
                />
              </div>
            </div>
            <h1 className="text-center text-2xl font-semibold">
              Link {config.name} to Calendar
            </h1>
            <p className="text-muted-foreground mt-1 text-center text-base">
              {config.description}
            </p>
          </div>

          <div className="w-full py-6">
            <ul className="space-y-3">
              {features[integrationType]?.map((feature, index) => (
                <li key={index} className="text-foreground flex items-center gap-3 text-sm">
                  <Check className="text-primary size-4" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex w-full items-center justify-end gap-2 pb-2">
            <Button 
              variant="outline" 
              onClick={handleCancel}
              className="h-9 px-4 py-2"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConnect}
              className="h-9 px-4 py-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Connect now"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
