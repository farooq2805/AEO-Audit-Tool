
export interface ProviderMetrics {
  overallScore: number;
  statusText: string;
  brandRecognition: number; // /20
  marketScore: number;      // /10
  presenceQuality: number;  // /20
  brandSentiment: number;   // /40
  shareOfVoice: number;     // /10
  topQueries: string[];     // List of queries where the brand ranks
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface AuditResult {
  brand: string;
  url: string;
  date: string;
  summary: string;
  overallScore: number;
  insights: string[];
  groundingSources: GroundingSource[];
  providers: {
    openai: ProviderMetrics;
    perplexity: ProviderMetrics;
    gemini: ProviderMetrics;
  };
  recommendations: string[];
}

export enum NavigationPaths {
  HOME = '/',
  PRODUCT = '/product',
  AEO_CHECKER = '/aeo-checker',
  HOW_IT_WORKS = '/how-it-works',
  PRICING = '/pricing',
  USE_CASES = '/use-cases',
  EDUCATION = '/education',
  ABOUT = '/about',
  CONTACT = '/contact'
}
