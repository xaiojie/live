
export interface EmergencyContact {
  name: string;
  phone: string;
  email: string;
}

export enum CheckInFrequency {
  DAILY = '1',
  TWO_DAYS = '2'
}

export interface LogEntry {
  timestamp: number;
  tags: string[];
  note: string;
  happiness?: number; // 1-5 scale
}

export interface AppState {
  isFirstTime: boolean;
  nickname: string;
  realName: string;
  emergencyContacts: EmergencyContact[];
  frequency: CheckInFrequency;
  lastCheckIn: number | null;
  checkInStreak: number;
  logs: LogEntry[];
  pausedUntil: number | null; // Timestamp
  isNotificationsEnabled: boolean;
}
