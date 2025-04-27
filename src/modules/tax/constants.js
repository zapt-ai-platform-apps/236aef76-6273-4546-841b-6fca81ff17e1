// PPh Final constants
export const PPH_FINAL_RATE = 0.003; // 0.3%
export const PPH_FINAL_MAX_YEARS = 4; // 4 years maximum
export const PPH_FINAL_MAX_INCOME = 4800000000; // Rp 4.8 billion

// PPh 21 constants
export const PPH_21_RATES = [
  { threshold: 60000000, rate: 0.05 }, // 5% for first 60 million
  { threshold: 190000000, rate: 0.15 }, // 15% for 60-250 million
  { threshold: 250000000, rate: 0.25 }, // 25% for 250-500 million
  { threshold: 500000000, rate: 0.30 }, // 30% for 500 million - 5 billion
  { threshold: Infinity, rate: 0.35 } // 35% for above 5 billion
];

// PPh 23 rates for different services
export const PPH_23_RATES = {
  rental: 0.02, // 2% for rental of assets except land and buildings
  technical: 0.02, // 2% for technical services
  management: 0.02, // 2% for management services
  consulting: 0.02, // 2% for consulting services
  other: 0.02 // 2% for other services
};

// PPh 4(2) rates for different types of final income
export const PPH_4_AYAT_2_RATES = {
  landBuildingSale: 0.025, // 2.5% for land/building sales
  landBuildingRental: 0.10, // 10% for land/building rental
  construction: {
    planning: 0.04, // 4% for construction planning
    implementation: {
      small: 0.02, // 2% for small scale implementation
      medium: 0.03, // 3% for medium scale implementation
      large: 0.04 // 4% for large scale implementation
    },
    supervision: 0.04 // 4% for construction supervision
  },
  bondInterest: 0.15, // 15% for bond interest
  lottery: 0.25 // 25% for lottery prizes
};

// PPN (VAT) rate
export const PPN_RATE = 0.11; // 11%
export const PPN_THRESHOLD = 4800000000; // Rp 4.8 billion

// Tax treaty rates for various countries (simplified example)
export const TAX_TREATY_RATES = {
  'SG': 0.10, // Singapore
  'MY': 0.10, // Malaysia
  'JP': 0.10, // Japan
  'KR': 0.10, // South Korea
  'CN': 0.10, // China
  'US': 0.10, // United States
  'AU': 0.15, // Australia
  'UK': 0.10, // United Kingdom
  'NL': 0.10, // Netherlands
  'DE': 0.10, // Germany
  // Add more countries as needed
  'default': 0.20 // Default rate if no treaty
};

// List of countries with tax treaties with Indonesia
export const COUNTRIES_WITH_TAX_TREATIES = [
  { code: 'SG', name: 'Singapura' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'JP', name: 'Jepang' },
  { code: 'KR', name: 'Korea Selatan' },
  { code: 'CN', name: 'China' },
  { code: 'US', name: 'Amerika Serikat' },
  { code: 'AU', name: 'Australia' },
  { code: 'UK', name: 'Inggris' },
  { code: 'NL', name: 'Belanda' },
  { code: 'DE', name: 'Jerman' },
  { code: 'FR', name: 'Perancis' },
  { code: 'CA', name: 'Kanada' },
  { code: 'IT', name: 'Italia' },
  { code: 'CH', name: 'Swiss' },
  { code: 'SE', name: 'Swedia' },
  { code: 'NO', name: 'Norwegia' },
  { code: 'BE', name: 'Belgia' },
  { code: 'DK', name: 'Denmark' },
  { code: 'AT', name: 'Austria' },
  { code: 'PH', name: 'Filipina' },
  { code: 'TH', name: 'Thailand' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'IN', name: 'India' }
];