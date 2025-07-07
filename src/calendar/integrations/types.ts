export type TIntegrationType = 
  | "manual" 
  | "google-calendar" 
  | "linear" 
  | "clickup" 
  | "notion" 
  | "github" 
  | "slack" 
  | "outlook";

export interface IIntegration {
  id: string;
  type: TIntegrationType;
  name: string;
  description: string;
  icon: string;
  isConnected: boolean;
  color: string;
  baseUrl?: string;
  apiKey?: string;
  refreshToken?: string;
  lastSync?: string;
}

export interface IIntegrationEvent {
  id: string;
  integrationId: string;
  externalId: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  color: string;
  url?: string;
  labels?: string[];
  priority?: "low" | "medium" | "high" | "urgent";
  status?: string;
}
