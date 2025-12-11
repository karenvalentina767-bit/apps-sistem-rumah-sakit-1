export enum Role {
  USER = 'user',
  MODEL = 'model'
}

export interface Message {
  id: string;
  role: Role;
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export interface SystemStatus {
  registrationAgent: 'idle' | 'active' | 'completed';
  infoAgent: 'idle' | 'active';
  securityProtocol: 'secure' | 'alert';
}

export interface RegistrationDraft {
  name: string;
  dob: string;
  contact: string;
}