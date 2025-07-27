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
  {
    id: '4',
    categoryId: 'fire',
    title: 'Fire Emergency Response',
    steps: [
    'Call 112 or your local fire service immediately when a fire is detected',
    'Know the location of the nearest fire exits and extinguishers',
    'Keep a fire extinguisher and smoke alarms in working condition',
    'Learn how to use a fire extinguisher and follow evacuation protocols',
    'Keep emergency contacts and evacuation plans easily accessible',
    ],
    additionalInfo: 'Download the FFS app for fire emergency updates',
  },
  {
    id: '5',
    categoryId: 'weather',
    title: 'Weather Emergency Response',
    steps: [      'Stay informed through official weather alerts and emergency apps',
    'Know safe shelter locations for storms, floods, or extreme weather',
    'Keep an emergency kit with essentials like water, flashlight, and batteries',
    'Follow evacuation orders or shelter-in-place instructions promptly',
    'Keep important documents and emergency contacts in a waterproof folder'
    ],
    additionalInfo: 'Download the NWS app for weather emergency updates',
  },
  {
    id: '6',
    categoryId: 'evacuation',
    title: 'Safe Evacuation Procedures',
    steps: [
    'Follow official evacuation orders without delay',
    'Know your primary and alternative evacuation routes',
    'Keep a go-bag ready with essentials like ID, medication, and water',
    'Secure your home if time allows—turn off gas, water, and electricity',
    'Stay informed through local news and emergency services during evacuation',
    ],
    additionalInfo: 'Download the SEMA app for evacution area-specific guidance',
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
