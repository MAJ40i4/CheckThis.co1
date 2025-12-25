
import { extractBarcodeValue } from './geminiService';

export interface BarcodeResult {
  found: boolean;
  ean?: string;
  productName?: string;
  brand?: string;
  imageUrl?: string;
  message?: string;
}

const OFF_API_BASE = 'https://world.openfoodfacts.org/api/v0/product';

export const barcodeService = {
  /**
   * Orchestrates the barcode lookup flow:
   * 1. Extract EAN from Image (via lightweight Gemini Flash)
   * 2. Query OpenFoodFacts
   */
  identifyProductFromImage: async (imageData: { data: string; mimeType: string }): Promise<BarcodeResult> => {
    try {
      // Step 1: Extract EAN
      const ean = await extractBarcodeValue(imageData);
      
      if (!ean) {
        return { found: false, message: "Could not detect a valid barcode in the image." };
      }

      // Step 2: Query Database
      const result = await fetch(`${OFF_API_BASE}/${ean}.json`);
      if (!result.ok) {
         return { found: false, ean, message: "Database error" };
      }
      
      const data = await result.json();

      if (data.status === 1) {
         return {
            found: true,
            ean,
            productName: data.product.product_name || data.product.product_name_pl || "Unknown Product",
            brand: data.product.brands,
            imageUrl: data.product.image_url
         };
      } else {
         return { found: false, ean, message: "Product not found in global database." };
      }

    } catch (error) {
      console.error("Barcode service error", error);
      return { found: false, message: "Service unavailable" };
    }
  }
};
