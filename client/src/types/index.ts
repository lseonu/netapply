export type ApplicationStatus = 'applied' | 'interviewing' | 'accepted' | 'rejected';

export interface JobApplication {
  id: string;
  companyName: string;
  position: string;
  status: ApplicationStatus;
  appliedDate: Date;
  lastUpdated: Date;
  platform?: string;
  loginInfo?: {
    platform: string;
    username: string;
    password: string;
  };
  interviews?: {
    date: Date;
    type: string;
    link?: string;
    notes?: string;
  }[];
  emailThreads?: {
    subject: string;
    lastMessageDate: Date;
    status: string;
  }[];
} 