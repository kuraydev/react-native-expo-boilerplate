export type { User, UserState, AppState } from "../services/zustand/types";

export interface IFeatureCard {
  icon: string;
  title: string;
  description: string;
}

export interface IStackItem {
  name: string;
  version: string;
  icon: string;
}

export interface IUtilityItem {
  icon: string;
  title: string;
  tag: string;
  description: string;
}

export interface ISettingsItem {
  label: string;
  icon: string;
  iconColor: string;
  value?: string;
  valueType?: "text" | "badge" | "none";
}

export interface INotification {
  id: string;
  icon: string;
  iconColor: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
}
