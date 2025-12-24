
import { GoogleGenAI, Type } from "@google/genai";
import { ProductAnalysis, ReceiptAnalysis, UserPersona, RewardAnalysis, UserState } from "../types";
import { optimizeImage } from "../utils/imageOptimizer";

// Lazy initialization to prevent top-level crashes if process.env is missing
const getAi = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const extractTextFromImage = async (
  imageData: { data: string; mimeType: string },
  language: 'pl' | 'en'
): Promise<string> => {
  const langText = language === 'pl' 
    ? "Zidentyfikuj i wyodrębnij cały tekst ze zdjęcia etykiety produktu. Zwróć surowy tekst." 
    : "Identify and extract all text from the product label image. Return raw text.";
  
  const ai = getAi();
  const optimized = await optimizeImage(imageData.data);
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        { inlineData: { data: optimized.data, mimeType: optimized.mimeType } },
        { text: langText }
      ]
    }
  });

  return response.text || "";
};

export const extractBarcodeValue = async (
  imageData: { data: string; mimeType: string }
): Promise<string | null> => {
    const ai = getAi();
    try {
        const optimized = await optimizeImage(imageData.data, 800, 0.6);

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: {
                parts: [
                    { inlineData: { data: optimized.data, mimeType: optimized.mimeType } },
                    { text: "Return ONLY the EAN-13 digits. If none, return 'null'." }
                ]
            }
        });
        const text = response.text?.trim() || "null";
        const match = text.match(/\d+/);
        return match ? match[0] : null;
    } catch (e) {
        console.error("Barcode extraction failed", e);
        return null;
    }
};

export const analyzeReceipt = async (
  fileData: { data: string; mimeType: string },
  countryContext: string = 'PL'
): Promise<ReceiptAnalysis> => {
    // ... (Receipt logic remains the same as previous step, kept for brevity)
    // Reuse existing implementation or the one previously provided
    const promptText = `
    ROLA SYSTEMU
    Jesteś backendowym silnikiem AI aplikacji CheckThis.
    Obsługa OCR paragonów (zdjęcie / PDF), ekstrakcja pozycji, normalizacja.
    
    INPUT:
    - zdjęcie paragonu
    - kontekst kraju: ${countryContext}

    ZASADY:
    - Mapuj "brudne" nazwy z paragonu na "czyste" nazwy produktów.
    - Zwracaj JSON.
  `;

  const ai = getAi();
  
  try {
    let finalImage = fileData;
    if (fileData.mimeType.startsWith('image/')) {
       finalImage = await optimizeImage(fileData.data, 1200, 0.7);
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: {
        parts: [
          { inlineData: { data: finalImage.data, mimeType: finalImage.mimeType } },
          { text: promptText }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            store_name: { type: Type.STRING },
            store_address: { type: Type.STRING },
            purchase_date: { type: Type.STRING },
            currency: { type: Type.STRING },
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  raw_name: { type: Type.STRING },
                  normalized_name: { type: Type.STRING },
                  brand: { type: Type.STRING },
                  quantity: { type: Type.NUMBER },
                  unit_price: { type: Type.NUMBER },
                  total_price: { type: Type.NUMBER },
                  category: { type: Type.STRING, enum: ['food', 'cosmetics', 'household', 'other'] },
                  confidence: { type: Type.STRING, enum: ['high', 'medium', 'low'] }
                },
                required: ['raw_name', 'normalized_name', 'quantity', 'unit_price', 'total_price', 'confidence']
              }
            },
            receipt_total: { type: Type.NUMBER }
          },
          required: ['store_name', 'purchase_date', 'currency', 'items', 'receipt_total']
        }
      }
    });
    
    const raw = JSON.parse(response.text);

    return {
        receipt_meta: {
            shop_name: raw.store_name,
            shop_confidence: 1.0,
            country: countryContext,
            currency: raw.currency,
            purchase_date: raw.purchase_date,
            purchase_time: "",
            receipt_number: "",
            total_amount: raw.receipt_total,
            store_name: raw.store_name,
            store_address: raw.store_address,
            receipt_total: raw.receipt_total,
            tax_amount: 0,
            payment_method: "unknown",
            ocr_quality: 'high'
        },
        items: raw.items
    };
  } catch (error) {
    console.error("OCR Error:", error);
    throw new Error("OCR Failed.");
  }
};

export const evaluateReceiptRewards = async (
  receiptData: ReceiptAnalysis,
  user: UserState,
  fingerprint: string
): Promise<RewardAnalysis> => {
    return {
      receipt_status: 'accepted',
      reward: { scan_credits_awarded: 1, price_points_awarded: 50, reason: "Valid receipt processed." },
      trust_score_update: { previous_score: user.trustScore, new_score: Math.min(user.trustScore + 0.02, 1.0) },
      fraud_analysis: { duplicate_detected: false, suspicious_patterns: [], risk_level: 'low' },
      next_user_limits: { max_daily_scans: 10, receipt_uploads_allowed: true },
      notes: "Auto-approved"
    };
};

export const analyzeProduct = async (
  input: string,
  persona: UserPersona,
  language: 'pl' | 'en',
  imagePart?: { inlineData: { data: string; mimeType: string } }
): Promise<ProductAnalysis> => {
  
  // --- MASTER PROMPT LOGIC ---
  const masterPrompt = `
    ROLE:
    You are CheckThis AI — a production-grade assistant for smart shopping analysis.
    EXECUTE deterministic logic. Do not explain.

    LANGUAGE RULE:
    - Output Language: ${language === 'pl' ? 'POLISH (PL)' : 'ENGLISH (EN)'}
    - If input is foreign, translate results to ${language === 'pl' ? 'PL' : 'EN'}.

    INPUT CONTEXT:
    - User Persona: "${persona}"
    - Search Query/Context: "${input}"

    ========================
    PRODUCT IDENTIFICATION LOGIC
    ========================
    1. OCR/TEXT ANALYSIS: Extract brand, product name, size.
    2. NORMALIZATION: Map "KRAKUS OGÓRKI" -> "Krakus Ogórki Kiszone 860g".
    3. SEARCH FALLBACK (MANDATORY):
       If specific product not clear, generate BEST MATCH from web knowledge.
       Do not fail. Provide a relevant result.

    ========================
    ANALYSIS PIPELINE
    ========================
    MODULE 1: HEALTH (Scientific)
    - Ingredient quality check.
    - Additives risk assessment.
    - Nutrition score (A-E).

    MODULE 2: COMMERCIAL (Price & Availability)
    - Identify 3-5 distinct stores relevant to ${language === 'pl' ? 'Poland (Allegro, Auchan, Carrefour, Rossmann)' : 'Global/US (Amazon, Walmart, Target)'}.
    - ESTIMATE prices if exact real-time data missing (mark confidence).
    - GENERATE SEARCH LINKS: Use direct store search templates (e.g., "https://allegro.pl/listing?string={name}").

    MODULE 3: ALTERNATIVES
    - Suggest 2-3 healthier or cheaper alternatives.

    OUTPUT:
    Return strictly structured JSON.
  `;
  
  // --- IMAGE OPTIMIZATION ---
  let optimizedImagePart = undefined;
  if (imagePart) {
      const optimized = await optimizeImage(imagePart.inlineData.data);
      optimizedImagePart = { inlineData: { data: optimized.data, mimeType: optimized.mimeType } };
  }

  const parts: any[] = [{ text: masterPrompt }];
  if (optimizedImagePart) parts.push(optimizedImagePart);

  const ai = getAi();
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            productName: { type: Type.STRING },
            category: { type: Type.STRING },
            verdict: { type: Type.STRING },
            score: { type: Type.NUMBER },
            scoreConfidence: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] },
            scoreBreakdown: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  impact: { type: Type.NUMBER },
                  status: { type: Type.STRING, enum: ['positive', 'neutral', 'negative'] },
                  description: { type: Type.STRING }
                },
                required: ['name', 'impact', 'status', 'description']
              }
            },
            nutriScore: { type: Type.STRING, enum: ['A', 'B', 'C', 'D', 'E'] },
            novaScore: { type: Type.NUMBER },
            ecoScore: { type: Type.STRING, enum: ['A', 'B', 'C', 'D', 'E'], nullable: true },
            productImage: { type: Type.STRING },
            pros: { type: Type.ARRAY, items: { type: Type.STRING } },
            cons: { type: Type.ARRAY, items: { type: Type.STRING } },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  impact: { type: Type.STRING, enum: ['positive', 'neutral', 'negative'] },
                  details: { type: Type.STRING },
                  relevantFor: { type: Type.ARRAY, items: { type: Type.STRING } },
                  source: { type: Type.STRING }
                },
                required: ['name', 'impact', 'details', 'relevantFor']
              }
            },
            alternatives: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  reason: { type: Type.STRING },
                  priceEstimation: { type: Type.STRING },
                  score: { type: Type.NUMBER },
                  nutriScore: { type: Type.STRING, enum: ['A', 'B', 'C', 'D', 'E'] },
                  comparison: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        diff: { type: Type.STRING },
                        type: { type: Type.STRING, enum: ['better', 'worse', 'neutral'] }
                      },
                      required: ['diff', 'type']
                    }
                  }
                },
                required: ['name', 'reason', 'priceEstimation', 'score', 'nutriScore', 'comparison']
              }
            },
            offers: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  storeName: { type: Type.STRING },
                  price: { type: Type.STRING },
                  priceMin: { type: Type.NUMBER },
                  priceMax: { type: Type.NUMBER },
                  priceConfidence: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] },
                  currency: { type: Type.STRING },
                  url: { type: Type.STRING },
                  deliveryInfo: { type: Type.STRING },
                  deliveryCost: { type: Type.STRING },
                  isOfficial: { type: Type.BOOLEAN },
                  isAvailable: { type: Type.BOOLEAN },
                  productImage: { type: Type.STRING },
                  lastUpdated: { type: Type.STRING }
                },
                required: ['storeName', 'price', 'currency', 'url', 'deliveryInfo', 'deliveryCost', 'isAvailable']
              }
            },
            searchMatches: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  brand: { type: Type.STRING },
                  name: { type: Type.STRING },
                  category: { type: Type.STRING },
                  imageUrl: { type: Type.STRING }
                },
                required: ['id', 'brand', 'name', 'category']
              }
            }
          },
          required: ['productName', 'category', 'verdict', 'score', 'scoreConfidence', 'scoreBreakdown', 'nutriScore', 'novaScore', 'pros', 'cons', 'ingredients', 'alternatives', 'offers']
        },
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Analysis failed. Please try again.");
  }
};
