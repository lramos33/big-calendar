import type { TIntegrationType, IIntegration } from "./types";

export const INTEGRATION_CONFIGS: Record<TIntegrationType, Omit<IIntegration, 'id' | 'isConnected' | 'apiKey' | 'refreshToken' | 'lastSync'>> = {
  "manual": {
    type: "manual",
    name: "Manual Events",
    description: "Create and manage events manually in the calendar",
    icon: "lucide:calendar",
    color: "#6366f1",
  },
  "google-calendar": {
    type: "google-calendar", 
    name: "Google Calendar",
    description: "Sync events and meetings from your Google Calendar",
    icon: "logos:google-calendar",
    color: "#4285f4",
    baseUrl: "https://www.googleapis.com/calendar/v3",
  },
  "linear": {
    type: "linear",
    name: "Linear",
    description: "Import issues, project deadlines, and sprint planning",
    icon: "simple-icons:linear",
    color: "#5e6ad2",
    baseUrl: "https://api.linear.app/graphql",
  },
  "clickup": {
    type: "clickup",
    name: "ClickUp", 
    description: "Sync tasks, due dates, and project milestones",
    icon: "simple-icons:clickup",
    color: "#7b68ee",
    baseUrl: "https://api.clickup.com/api/v2",
  },
  "notion": {
    type: "notion",
    name: "Notion",
    description: "Import database items, deadlines, and content schedules",
    icon: "simple-icons:notion",
    color: "#000000",
    baseUrl: "https://api.notion.com/v1",
  },
  "github": {
    type: "github",
    name: "GitHub",
    description: "Track milestones, releases, and project deadlines",
    icon: "simple-icons:github",
    color: "#24292e",
    baseUrl: "https://api.github.com",
  },
  "slack": {
    type: "slack",
    name: "Slack",
    description: "Import scheduled messages, reminders, and meeting links",
    icon: "simple-icons:slack",
    color: "#4a154b",
    baseUrl: "https://slack.com/api",
  },
  "outlook": {
    type: "outlook",
    name: "Outlook Calendar",
    description: "Sync events and meetings from Microsoft Outlook", 
    icon: "simple-icons:microsoftoutlook",
    color: "#0078d4",
    baseUrl: "https://graph.microsoft.com/v1.0",
  },
};

export const DEFAULT_INTEGRATIONS: IIntegration[] = [
  {
    id: "manual-default",
    ...INTEGRATION_CONFIGS.manual,
    isConnected: true,
  },
];
