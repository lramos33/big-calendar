"use client";

import { useState, useEffect } from "react";
import { Zap, Search } from "lucide-react";
import { Icon } from "@iconify/react";

import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import { INTEGRATION_CONFIGS } from "@/calendar/integrations/config";
import { IntegrationDetailsDialog } from "@/calendar/components/dialogs/integration-details-dialog";
import { IntegrationSetupDialog } from "@/calendar/components/dialogs/integration-setup-dialog";
import { cn } from "@/lib/utils";
import type { TIntegrationType, IIntegration } from "@/calendar/integrations/types";

interface IntegrationsDialogProps {
  children?: React.ReactNode;
  integrations?: IIntegration[];
  onConnect?: (integrationType: TIntegrationType) => void;
  onDisconnect?: (integrationId: string) => void;
}

const INTEGRATION_CATEGORIES = {
  "productivity": {
    title: "Productivity & Project Management",
    description: "Enhancing task management and project tracking capabilities",
    integrations: ["manual", "linear", "clickup", "notion", "github"] satisfies TIntegrationType[]
  },
  "communication": {
    title: "Communication & Collaboration", 
    description: "Enhancing team interactions and communication workflows",
    integrations: ["google-calendar", "slack", "outlook"] satisfies TIntegrationType[]
  }
};

export function IntegrationsDialog({ 
  children, 
  integrations = [],
  onConnect,
  onDisconnect 
}: IntegrationsDialogProps) {
  const [open, setOpen] = useState(false);
  const [setupDialogOpen, setSetupDialogOpen] = useState(false);
  const [selectedIntegrationType, setSelectedIntegrationType] = useState<TIntegrationType | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "connected" | "disconnected" | "productivity" | "communication">("all");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [open]);

  const connectedIntegrations = integrations.filter(int => int.isConnected);
  const disconnectedIntegrations = Object.values(INTEGRATION_CONFIGS).filter(
    config => !integrations.some(int => int.type === config.type && int.isConnected)
  );

  const handleToggle = (type: TIntegrationType, isConnected: boolean) => {
    if (isConnected) {
      const integration = integrations.find(int => int.type === type);
      if (integration) {
        onDisconnect?.(integration.id);
      }
    } else {
      setSelectedIntegrationType(type);
      setOpen(false);
      setSetupDialogOpen(true);
    }
  };

  const handleSetupConnect = (integrationType: TIntegrationType) => {
    onConnect?.(integrationType);
    setSetupDialogOpen(false);
    setOpen(true);
  };

  const handleSetupCancel = () => {
    setSetupDialogOpen(false);
    setOpen(true);
  };

  const isIntegrationConnected = (type: TIntegrationType) => {
    return integrations.some(int => int.type === type && int.isConnected);
  };

  const connectedCount = Object.values(INTEGRATION_CONFIGS).filter(config => 
    isIntegrationConnected(config.type)
  ).length;
  
  const disconnectedCount = Object.values(INTEGRATION_CONFIGS).filter(config => 
    !isIntegrationConnected(config.type)
  ).length;

  const renderIntegrationIcon = (iconName: string) => {
    return <Icon icon={iconName} className="h-8 w-8 flex-shrink-0 flex-grow-0 object-contain" />;
  };

  const renderSkeletonCard = (index: number) => {
    return (
      <Card key={`skeleton-${index}`} className="flex min-h-[170px] flex-col rounded-xl border bg-background p-6 shadow-sm">
        <CardContent className="p-0 flex flex-col h-full">
          <div className="flex items-center gap-4 flex-grow">
            <Skeleton className="h-12 w-12 rounded-md" />
            <div className="flex-1">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-6 w-11 rounded-full" />
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderIntegrationCard = (config: typeof INTEGRATION_CONFIGS[TIntegrationType]) => {
    const isConnected = isIntegrationConnected(config.type);
    const currentIntegration = integrations.find(int => int.type === config.type);
    
    return (
      <Card key={config.type} className="flex min-h-[170px] flex-col rounded-xl border bg-background p-6 shadow-sm transition hover:shadow-md">
        <CardContent className="p-0 flex flex-col h-full">
          <div className="flex items-center gap-4 flex-grow">
            <div className="flex h-12 w-12 flex-shrink-0 flex-grow-0 items-center justify-center rounded-md bg-muted p-2">
              {renderIntegrationIcon(config.icon)}
            </div>
            <div>
              <div className="text-base leading-tight font-medium">{config.name}</div>
              <div className="text-xs leading-snug text-muted-foreground">{config.description}</div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2">
            <div className="flex gap-2">
              <IntegrationDetailsDialog
                integrationType={config.type}
                integration={currentIntegration}
                isConnected={isConnected}
              >
                <Button variant="outline" size="sm" className="h-8 px-3">
                  Details
                </Button>
              </IntegrationDetailsDialog>
            </div>
            <Switch 
              checked={isConnected}
              onCheckedChange={() => handleToggle(config.type, isConnected)}
            />
          </div>
        </CardContent>
      </Card>
    );
  };

  const getFilteredIntegrations = () => {
    const allConfigs = Object.values(INTEGRATION_CONFIGS);
    
    let filtered = allConfigs;

    // Filter by connection status
    if (filterType === "connected") {
      filtered = allConfigs.filter(config => isIntegrationConnected(config.type));
    } else if (filterType === "disconnected") {
      filtered = allConfigs.filter(config => !isIntegrationConnected(config.type));
    } else if (filterType === "productivity") {
      filtered = INTEGRATION_CATEGORIES.productivity.integrations.map(type => INTEGRATION_CONFIGS[type]);
    } else if (filterType === "communication") {
      filtered = INTEGRATION_CATEGORIES.communication.integrations.map(type => INTEGRATION_CONFIGS[type]);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(config =>
        config.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        config.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" className="gap-2">
            <Zap className="w-4 h-4" />
            Integrations
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0">
        <div className="p-6 pb-0">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Integrations</DialogTitle>
          </DialogHeader>
        </div>

        <ScrollArea className="max-h-[calc(90vh-120px)] px-6">
          <div className="pb-6">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search integrations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
                    disabled={isLoading}
                  />
                </div>
                <div className="w-full sm:w-48">
                  <Select value={filterType} onValueChange={(value) => setFilterType(value as typeof filterType)} disabled={isLoading}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All integrations</SelectItem>
                      <SelectItem value="connected">Connected ({connectedCount})</SelectItem>
                      <SelectItem value="disconnected">Available ({disconnectedCount})</SelectItem>
                      <SelectItem value="productivity">Productivity</SelectItem>
                      <SelectItem value="communication">Communication</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {isLoading ? (
                  // Show skeleton cards while loading
                  Array.from({ length: 8 }).map((_, index) => renderSkeletonCard(index))
                ) : getFilteredIntegrations().length === 0 ? (
                  <div className="col-span-full text-center text-muted-foreground py-8">
                    No integrations found
                  </div>
                ) : (
                  getFilteredIntegrations().map(renderIntegrationCard)
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
      
      {selectedIntegrationType && (
        <IntegrationSetupDialog
          integrationType={selectedIntegrationType}
          isOpen={setupDialogOpen}
          onOpenChange={setSetupDialogOpen}
          onConnect={handleSetupConnect}
          onCancel={handleSetupCancel}
        />
      )}
    </Dialog>
  );
}
