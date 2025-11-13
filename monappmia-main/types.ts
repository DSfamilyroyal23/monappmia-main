export type UserRole = 'company' | 'worker';

// FIX: Added 'security' and 'help' to the Page type to allow them as keys in page configs.
export type Page = 
  'dashboard' | 'workers' | 'missions' | 'performance' | 
  'evaluations' | 'reports' | 'settings' | 'my-profile' | 'search-missions' | 
  'search-companies' | 'security' | 'help' | 'messages' | 'mobile-app' | 'worker-profile' | 'given-evaluations';

export interface User {
  id: number;
  name: string;
  role: UserRole;
  avatarInitials: string;
  companyName?: string;
  avatarUrl?: string;
}

export interface Worker {
  id: number;
  name: string;
  role: string;
  missions: number;
  rating: number;
  lastMissionDate: string;
  status: 'Active' | 'Inactive';
  avatarInitials: string;
  avatarBg: 'primary' | 'accent' | 'secondary';
  avatarUrl?: string;
}

export interface Company {
  id: number;
  name: string;
  sector: string;
  rating: number;
  missionsPosted: number;
  location: string;
}

export interface Mission {
  id: string;
  name: string;
  companyName: string;
  rating: number;
}

export interface Notification {
  id: number;
  type: 'evaluation' | 'message' | 'mission';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface PerformanceData {
  name: string;
  'Note moyenne': number;
}

export interface Message {
    id: string;
    text: string;
    timestamp: string;
    senderId: number;
}

export interface ConversationParticipant {
    id: number;
    name: string;
    avatarInitials: string;
}

export interface Conversation {
    id: string;
    participants: [ConversationParticipant, ConversationParticipant];
    messages: Message[];
}