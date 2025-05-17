import { create } from 'zustand';

export interface GuidelineCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export interface Guideline {
  id: string;
  categoryId: string;
  title: string;
  steps: string[];
  additionalInfo?: string;
}

interface GuidelinesState {
  categories: GuidelineCategory[];
  guidelines: Guideline[];
  isLoading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  fetchGuidelines: (categoryId?: string) => Promise<void>;
}

const MOCK_CATEGORIES: GuidelineCategory[] = [
  {
    id: 'flood',
    title: 'Flood Safety',
    icon: 'droplet',
    description: 'Guidelines for flooding during rainy season',
  },
  {
    id: 'security',
    title: 'Security Emergency',
    icon: 'shield',
    description: 'Safety guidelines for security incidents',
  },
  {
    id: 'medical',
    title: 'Medical Emergency',
    icon: 'stethoscope',
    description: 'First aid and medical emergency procedures',
  },
  {
    id: 'fire',
    title: 'Fire Safety',
    icon: 'flame',
    description: 'Fire prevention and emergency response',
  },
  {
    id: 'weather',
    title: 'Weather Alerts',
    icon: 'cloud-lightning',
    description: 'Guidelines for severe weather conditions',
  },
  {
    id: 'evacuation',
    title: 'Evacuation Routes',
    icon: 'log-out',
    description: 'Safe evacuation procedures by region',
  },
];

const MOCK_GUIDELINES: Guideline[] = [
  {
    id: '1',
    categoryId: 'flood',
    title: 'Rainy Season Preparedness',
    steps: [
      'Monitor NIMET weather forecasts regularly',
      'Clear drainage systems around your property',
      'Store important documents in waterproof containers',
      'Prepare an emergency kit with essential items',
      'Know your area\'s flood risk and evacuation routes',
    ],
    additionalInfo: 'Contact your local NEMA office for area-specific guidance',
  },
  {
    id: '2',
    categoryId: 'security',
    title: 'Personal Safety Guidelines',
    steps: [
      'Keep emergency numbers saved on your phone',
      'Stay aware of your surroundings at all times',
      'Avoid traveling alone at night',
      'Keep family and friends informed of your movements',
      'Have a plan for emergency situations',
    ],
  },
  {
    id: '3',
    categoryId: 'medical',
    title: 'Medical Emergency Response',
    steps: [
      'Call 112 for immediate medical assistance',
      'Know the location of nearest hospitals',
      'Keep a first aid kit readily available',
      'Learn basic first aid procedures',
      'Keep important medical information accessible',
    ],
    additionalInfo: 'Download the NCDC app for health emergency updates',
  },
];

const mockDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const useGuidelinesStore = create<GuidelinesState>((set) => ({
  categories: [],
  guidelines: [],
  isLoading: false,
  error: null,
  
  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    
    try {
      await mockDelay(600);
      set({ categories: MOCK_CATEGORIES, isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'An error occurred' 
      });
    }
  },
  
  fetchGuidelines: async (categoryId) => {
    set({ isLoading: true, error: null });
    
    try {
      await mockDelay(800);
      
      let filteredGuidelines = MOCK_GUIDELINES;
      if (categoryId) {
        filteredGuidelines = MOCK_GUIDELINES.filter(g => g.categoryId === categoryId);
      }
      
      set({ guidelines: filteredGuidelines, isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'An error occurred' 
      });
    }
  },
}));