"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { TIntegrationType, IIntegration } from "@/calendar/integrations/types";
import { DEFAULT_INTEGRATIONS } from "@/calendar/integrations/config";

interface IntegrationsContextType {
  integrations: IIntegration[];
  connectIntegration: (type: TIntegrationType) => void;
  disconnectIntegration: (id: string) => void;
  getIntegrationByType: (type: TIntegrationType) => IIntegration | undefined;
  isConnected: (type: TIntegrationType) => boolean;
}

const IntegrationsContext = createContext<IntegrationsContextType | undefined>(undefined);

export function IntegrationsProvider({ children }: { children: ReactNode }) {
  const [integrations, setIntegrations] = useState<IIntegration[]>(DEFAULT_INTEGRATIONS);

  useEffect(() => {
    const saved = localStorage.getItem("calendar-integrations");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setIntegrations(parsed);
      } catch (error) {
        console.error("Failed to load integrations:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("calendar-integrations", JSON.stringify(integrations));
  }, [integrations]);

  const connectIntegration = (type: TIntegrationType) => {
    const existingIndex = integrations.findIndex(int => int.type === type);
    
    if (existingIndex >= 0) {
      setIntegrations(prev => 
        prev.map((int, index) => 
          index === existingIndex 
            ? { ...int, isConnected: true, lastSync: new Date().toISOString() }
            : int
        )
      );
    } else {
      const { INTEGRATION_CONFIGS } = require("@/calendar/integrations/config");
      const config = INTEGRATION_CONFIGS[type];
      
      if (config) {
        const newIntegration: IIntegration = {
          id: `${type}-${Date.now()}`,
          ...config,
          isConnected: true,
          lastSync: new Date().toISOString(),
        };
        
        setIntegrations(prev => [...prev, newIntegration]);
      }
    }
  };

  const disconnectIntegration = (id: string) => {
    setIntegrations(prev => 
      prev.map(int => 
        int.id === id 
          ? { ...int, isConnected: false }
          : int
      )
    );
  };

  const getIntegrationByType = (type: TIntegrationType) => {
    return integrations.find(int => int.type === type && int.isConnected);
  };

  const isConnected = (type: TIntegrationType) => {
    return integrations.some(int => int.type === type && int.isConnected);
  };

  return (
    <IntegrationsContext.Provider value={{
      integrations,
      connectIntegration,
      disconnectIntegration,
      getIntegrationByType,
      isConnected,
    }}>
      {children}
    </IntegrationsContext.Provider>
  );
}

export function useIntegrations() {
  const context = useContext(IntegrationsContext);
  if (context === undefined) {
    throw new Error("useIntegrations must be used within an IntegrationsProvider");
  }
  return context;
}
