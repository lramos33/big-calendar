"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { ExternalLink, Zap, Shield, Clock, Database } from "lucide-react";

import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { INTEGRATION_CONFIGS } from "@/calendar/integrations/config";
import type { TIntegrationType, IIntegration } from "@/calendar/integrations/types";

interface IntegrationDetailsDialogProps {
  integrationType: TIntegrationType;
  integration?: IIntegration;
  isConnected: boolean;
  children?: React.ReactNode;
}

export function IntegrationDetailsDialog({ 
  integrationType,
  integration,
  isConnected,
  children 
}: IntegrationDetailsDialogProps) {
  const [open, setOpen] = useState(false);
  
  const config = INTEGRATION_CONFIGS[integrationType];

  const features = {
    "manual": [
      "Create custom events directly in calendar",
      "Full control over event details and timing",
      "No external dependencies or API limits",
      "Instant event creation and updates"
    ],
    "google-calendar": [
      "Two-way sync with Google Calendar",
      "Import existing events and meetings",
      "Real-time updates and notifications",
      "Support for recurring events"
    ],
    "linear": [
      "Import issues as calendar events",
      "Track project deadlines and milestones",
      "Sync with sprint planning cycles",
      "Automatic status updates"
    ],
    "clickup": [
      "Sync tasks with due dates",
      "Project milestone tracking",
      "Time tracking integration",
      "Custom field mapping"
    ],
    "notion": [
      "Database item synchronization",
      "Content schedule management",
      "Property-based event creation",
      "Rich content integration"
    ],
    "github": [
      "Repository milestone tracking",
      "Release schedule management",
      "Issue deadline monitoring",
      "Project board integration"
    ],
    "slack": [
      "Scheduled message reminders",
      "Meeting link integration",
      "Channel event notifications",
      "Workflow automation"
    ],
    "outlook": [
      "Microsoft 365 calendar sync",
      "Exchange server compatibility",
      "Meeting invitation handling",
      "Contact integration"
    ]
  };

  const permissions = {
    "manual": ["Create and edit calendar events"],
    "google-calendar": ["Read calendar events", "Create calendar events", "Modify existing events"],
    "linear": ["Read issues and projects", "Access team information"],
    "clickup": ["Read tasks and projects", "Access workspace data"],
    "notion": ["Read database content", "Access page properties"],
    "github": ["Read repository information", "Access issues and milestones"],
    "slack": ["Read workspace information", "Access channel messages"],
    "outlook": ["Read calendar events", "Create calendar events", "Access contact information"]
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm">
            Details
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-muted p-3">
              <Icon 
                icon={config.icon} 
                className="h-10 w-10"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <DialogTitle className="text-2xl font-bold">{config.name}</DialogTitle>
                <Badge 
                  variant={isConnected ? "default" : "secondary"}
                  className="text-xs font-medium"
                >
                  {isConnected ? "Connected" : "Not Connected"}
                </Badge>
              </div>
              <DialogDescription className="text-base mt-1">
                {config.description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <Separator />
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold">Features</h3>
            </div>
            <div className="grid gap-2">
              {features[integrationType]?.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold">Required Permissions</h3>
            </div>
            <div className="grid gap-2">
              {permissions[integrationType]?.map((permission, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{permission}</span>
                </div>
              ))}
            </div>
          </div>

          {isConnected && integration && (
            <>
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">Connection Details</h3>
                </div>
                <div className="grid gap-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Status</span>
                    <Badge variant="default" className="text-xs">Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Connected Since</span>
                    <span className="text-sm text-muted-foreground">
                      {integration.lastSync ? new Date(integration.lastSync).toLocaleDateString() : 'Recently'}
                    </span>
                  </div>
                  {integration.lastSync && (
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Last Sync</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {new Date(integration.lastSync).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          <Separator />

          <div className="flex items-center justify-between pt-2">
            {config.baseUrl && (
              <Button variant="outline" size="sm" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Learn More
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
