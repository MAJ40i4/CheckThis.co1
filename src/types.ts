
export enum UserPersona {
  GENERAL = 'General Health',
  ATHLETE = 'Keto Athlete',
  PARENT = 'Concerned Parent',
  ALLERGIC = 'High Sensitivity/Allergy',
  HEART = 'Heart Health / Hypertension'
}

export type ConfidenceLevel = 'High' | 'Medium' | 'Low';

export type Currency = 'PLN' | 'EUR' | 'USD';

export type PlanTier = 'FREE' | 'PERSONAL' | 'FAMILY' | 'PRO';

export type UserRole = 'user' | 'admin';

export type StoreCapability = 'full_cart_support' | 'partial_cart_support' | 'no_cart_support';

export interface UserState {
  isLoggedIn: boolean;
  plan: PlanTier;
  email?: string;
  name?: string;
  role: UserRole;
  authProvider?: 'email' | 'google' | 'apple';
  
  // Session Persistence
  sessionExpiry: number; // Timestamp when session expires

  // Reward & Trust Fields
  trustScore: number; // 0.0 - 1.0
  free_receipt_scans: number; // Defaults to 3
  scanCredits: number;
  pricePoints: number;
  accountAgeDays: number;
  scanHistory: {
    total: number;
    accepted: number;
    rejected: number;
    fraud: number;
  };
}

export interface ScoreFactor {
  name: string;
  impact: number; // 0-100 relative weight
  status: 'positive' | 'neutral' | 'negative';
  description: string;
}

export interface StoreOffer {
  storeName: string;
  price: string; // Display price or range string
  priceMin?: number;
  priceMax?: number;
  priceConfidence?: ConfidenceLevel;
  currency: string;
  url: string;
  deliveryInfo: string;
  deliveryCost?: string; // "0" or actual amount
  isOfficial: boolean;
  isAvailable: boolean; // New: Stock status
  productImage?: string;
  lastUpdated?: string;
}

export interface SearchMatch {
  id: string;
  brand: string;
  name: string;
  category: string;
  imageUrl?: string;
}

export interface AlternativeProduct {
  name: string;
  reason: string;
  priceEstimation: string;
  score: number;
  nutriScore: 'A' | 'B' | 'C' | 'D' | 'E';
  comparison: {
    diff: string; // e.g., "-30% Sugar"
    type: 'better' | 'worse' | 'neutral';
  }[];
}

export interface ProductAnalysis {
  productName: string;
  category: string;
  verdict: string;
  score: number;
  scoreConfidence: ConfidenceLevel;
  scoreBreakdown: ScoreFactor[];
  productImage?: string;
  
  nutriScore: 'A' | 'B' | 'C' | 'D' | 'E';
  novaScore: 1 | 2 | 3 | 4;
  ecoScore?: 'A' | 'B' | 'C' | 'D' | 'E';

  pros: string[];
  cons: string[];
  
  ingredients: {
    name: string;
    impact: 'positive' | 'neutral' | 'negative';
    details: string;
    relevantFor: string[];
    source?: string;
  }[];
  
  alternatives: AlternativeProduct[];
  offers: StoreOffer[];
  searchMatches?: SearchMatch[];
}

export interface BasketItem {
  id: string;
  productName: string;
  offer: StoreOffer;
  timestamp: number;
}

// --- RECEIPT OCR TYPES (UPDATED PER MASTER PROMPT) ---

export interface ReceiptItem {
  raw_name: string;
  normalized_name: string;  
  brand: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  category: 'food' | 'cosmetics' | 'household' | 'other';
  confidence: 'high' | 'medium' | 'low';
}

export interface ReceiptMeta {
  store_name: string;
  store_address: string;
  purchase_date: string;
  currency: string;
  receipt_total: number;
  
  // Extended fields for frontend/service compatibility
  shop_name: string;
  shop_confidence: number;
  country: string;
  purchase_time: string;
  receipt_number: string;
  total_amount: number;
  tax_amount: number;
  payment_method: string;
  ocr_quality: 'high' | 'medium' | 'low';
}

export interface ReceiptAnalysis {
  receipt_meta: ReceiptMeta; // Mapped from root response
  items: ReceiptItem[];
  warnings?: string[];
}

// --- REWARD & ANTI-FRAUD TYPES ---

export interface RewardAnalysis {
  receipt_status: 'accepted' | 'partially_accepted' | 'rejected' | 'flagged';
  reward: {
    scan_credits_awarded: number;
    price_points_awarded: number;
    reason: string;
  };
  trust_score_update: {
    previous_score: number;
    new_score: number;
  };
  fraud_analysis: {
    duplicate_detected: boolean;
    suspicious_patterns: string[];
    risk_level: 'low' | 'medium' | 'high';
  };
  next_user_limits: {
    max_daily_scans: number;
    receipt_uploads_allowed: boolean;
  };
  notes: string;
}

// --- PRICE HISTORY TYPES ---

export interface PriceRecord {
  id: string;
  productName: string; // Normalized Name
  brand: string;
  category: string;
  storeName: string;
  date: string;
  price: number;
  currency: string;
  source: 'receipt_ocr' | 'user_input';
  createdAt: string;
}
