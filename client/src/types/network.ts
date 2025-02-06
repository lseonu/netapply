export interface Connection {
  id: string;
  name: string;
  position: string;
  company: string;
  mutualConnections?: number;
  similarity?: number;
  linkedInUrl?: string;
  email?: string;
  status: 'pending' | 'connected' | 'message_sent' | 'coffee_chat_scheduled';
  notes?: string;
  lastInteraction?: Date;
  nextFollowUp?: Date;
}

export interface NetworkSearchParams {
  company: string;
  role?: string;
  location?: string;
  keywords?: string[];
} 