
import { ReceiptAnalysis, PriceRecord } from '../types';

export const priceService = {
  /**
   * Extracts prices from a receipt analysis and saves them to persistent storage.
   * Returns the number of records saved.
   */
  savePrices: (analysis: ReceiptAnalysis): number => {
    const records: PriceRecord[] = [];
    const meta = analysis.receipt_meta;
    const timestamp = new Date().toISOString();
    
    // Safety check for critical meta
    if (!meta.shop_name) {
        console.warn("Skipping price save due to missing shop name");
        return 0;
    }

    analysis.items.forEach(item => {
      // Logic to determine unit price
      // We prioritize unit_price from the strict OCR response
      const validPrice = item.unit_price || (item.quantity === 1 ? item.total_price : null);
      
      // Strict filter: only save items with medium/high confidence
      if (validPrice && item.normalized_name && (item.confidence === 'high' || item.confidence === 'medium')) {
        records.push({
          id: `${meta.shop_name}-${item.normalized_name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          productName: item.normalized_name, // Use normalized name for Global DB
          brand: item.brand || 'Unknown',
          category: item.category || 'other',
          storeName: meta.shop_name,
          date: meta.purchase_date || timestamp.split('T')[0],
          price: validPrice,
          currency: meta.currency || 'PLN',
          source: 'receipt_ocr',
          createdAt: timestamp
        });
      }
    });

    if (records.length > 0) {
        try {
            // In a real app, this would be an API call to a DB.
            // For now, we simulate a Global DB using LocalStorage.
            const existingData = localStorage.getItem('checkthis_global_price_db');
            const priceHistory: PriceRecord[] = existingData ? JSON.parse(existingData) : [];
            
            // Append new records
            const updatedHistory = [...priceHistory, ...records];
            
            // Limit local storage size (keep last 2000 prices for global simulation)
            if (updatedHistory.length > 2000) {
                updatedHistory.splice(0, updatedHistory.length - 2000);
            }

            localStorage.setItem('checkthis_global_price_db', JSON.stringify(updatedHistory));
            console.log(`[GlobalPriceDB] Successfully indexed ${records.length} items from ${meta.shop_name}`);
        } catch (e) {
            console.error("Failed to save to global price DB", e);
        }
    }

    return records.length;
  },

  /**
   * Retrieves price history for a specific product (mock search)
   */
  getProductHistory: (productName: string): PriceRecord[] => {
    try {
        const existingData = localStorage.getItem('checkthis_global_price_db');
        const priceHistory: PriceRecord[] = existingData ? JSON.parse(existingData) : [];
        return priceHistory.filter(r => r.productName.toLowerCase().includes(productName.toLowerCase()));
    } catch (e) {
        return [];
    }
  }
};
