import { create } from 'zustand';

export interface EmergencyAlert {
  id: string;
  type: 'warning' | 'danger' | 'info' | 'success';
  title: string;
  message: string;
  location?: string;
  timestamp: string;
  isActive: boolean;
}

export interface EmergencyReport {
  id: string;
  userId: string;
  type: string;
  description: string;
  location: string;
  status: 'pending' | 'inProgress' | 'resolved';
  timestamp: string;
  contact: string;
}

interface EmergencyState {
  alerts: EmergencyAlert[];
  userReports: EmergencyReport[];
  isLoading: boolean;
  error: string | null;
  fetchAlerts: () => Promise<void>;
  fetchUserReports: (userId: string) => Promise<void>;
  submitReport: (report: Omit<EmergencyReport, 'id' | 'timestamp' | 'status'>) => Promise<void>;
}

// Mock data
const MOCK_ALERTS: EmergencyAlert[] = [
  {
    id: '1',
    type: 'danger',
    title: 'Flash Flood Warning',
    message: 'Flash flood warning issued for downtown area. Avoid low-lying areas and stay indoors.',
    location: 'Downtown',
    timestamp: new Date().toISOString(),
    isActive: true,
  },
  {
    id: '2',
    type: 'warning',
    title: 'High Wind Advisory',
    message: 'Strong winds expected this afternoon. Secure outdoor items and use caution when driving.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    isActive: true,
  },
  {
    id: '3',
    type: 'info',
    title: 'Power Outage Update',
    message: 'Crews working to restore power in the northern district. Estimated resolution by 8 PM.',
    location: 'Northern District',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    isActive: true,
  },
  {
    id: '4',
    type: 'success',
    title: 'Road Cleared',
    message: 'Main Street is now open after earlier accident. Traffic flowing normally.',
    location: 'Main Street',
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    isActive: false,
  },
];

const MOCK_REPORTS: EmergencyReport[] = [
  {
    id: '1',
    userId: '1',
    type: 'Flooding',
    description: 'Water rising rapidly in basement level of apartment building',
    location: '123 Main St, Apt B',
    status: 'inProgress',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    contact: '0803 123 4567',
  },
  {
    id: '2',
    userId: '1',
    type: 'Downed Power Line',
    description: 'Power line down across the road after storm',
    location: 'Corner of Oak and Pine',
    status: 'resolved',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    contact: '0703 123 4567',
  },
];

// Mock API response delay
const mockDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const useEmergencyStore = create<EmergencyState>((set) => ({
  alerts: [],
  userReports: [],
  isLoading: false,
  error: null,
  
  fetchAlerts: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await mockDelay(800);
      set({ alerts: MOCK_ALERTS, isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'An error occurred' 
      });
    }
  },
  
  fetchUserReports: async (userId: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await mockDelay(800);
      const reports = MOCK_REPORTS.filter(report => report.userId === userId);
      set({ userReports: reports, isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'An error occurred' 
      });
    }
  },
  
  submitReport: async (report) => {
    set({ isLoading: true, error: null });
    
    try {
      // Send report to edge function
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-report`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ report }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit report');
      }

      // Create new report for local state
      const newReport: EmergencyReport = {
        ...report,
        id: String(Math.floor(Math.random() * 1000)),
        timestamp: new Date().toISOString(),
        status: 'pending',
      };
      
      set(state => ({ 
        userReports: [...state.userReports, newReport], 
        isLoading: false 
      }));
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'An error occurred' 
      });
    }
  },
}));