
import { BasketItem, StoreCapability, StoreOffer } from '../types';

interface StoreProfile {
  name: string;
  capability: StoreCapability;
  baseUrl: string;
  searchTemplate?: string; // URL with {q} placeholder
  generateCartUrl?: (items: BasketItem[]) => string;
}

const STORE_REGISTRY: StoreProfile[] = [
  {
    name: 'Frisco',
    capability: 'full_cart_support',
    baseUrl: 'https://www.frisco.pl',
    searchTemplate: 'https://www.frisco.pl/search?q={q}',
    generateCartUrl: (items) => `https://www.frisco.pl/search?q=${encodeURIComponent(items.map(i => i.productName).join(' '))}`
  },
  {
    name: 'Auchan',
    capability: 'full_cart_support',
    baseUrl: 'https://zakupy.auchan.pl',
    searchTemplate: 'https://zakupy.auchan.pl/shop/search?s={q}',
    generateCartUrl: (items) => `https://zakupy.auchan.pl/shop/search?s=${encodeURIComponent(items.map(i => i.productName).join(' '))}`
  },
  {
    name: 'Carrefour',
    capability: 'full_cart_support',
    baseUrl: 'https://www.carrefour.pl',
    searchTemplate: 'https://www.carrefour.pl/szukaj?q={q}',
    generateCartUrl: (items) => `https://www.carrefour.pl/szukaj?q=${encodeURIComponent(items.map(i => i.productName).join(' '))}`
  },
  {
    name: 'Allegro',
    capability: 'partial_cart_support',
    baseUrl: 'https://allegro.pl',
    searchTemplate: 'https://allegro.pl/listing?string={q}',
  },
  {
    name: 'Amazon',
    capability: 'partial_cart_support',
    baseUrl: 'https://www.amazon.pl',
    searchTemplate: 'https://www.amazon.pl/s?k={q}',
  },
  {
    name: 'Rossmann',
    capability: 'no_cart_support',
    baseUrl: 'https://www.rossmann.pl',
    searchTemplate: 'https://www.rossmann.pl/szukaj?Search={q}',
  },
  {
    name: 'Hebe',
    capability: 'no_cart_support',
    baseUrl: 'https://www.hebe.pl',
    searchTemplate: 'https://www.hebe.pl/szukaj?q={q}',
  },
  {
    name: 'Kaufland',
    capability: 'no_cart_support',
    baseUrl: 'https://www.kaufland.pl',
    searchTemplate: 'https://www.kaufland.pl/wyszukiwarka.html?q={q}' 
  },
  {
    name: 'Empik',
    capability: 'no_cart_support',
    baseUrl: 'https://www.empik.com',
    searchTemplate: 'https://www.empik.com/szukaj/produkt?q={q}'
  }
];

export const getStoreProfile = (storeName: string): StoreProfile => {
  const normalized = storeName.toLowerCase();
  // Simple fuzzy match
  const profile = STORE_REGISTRY.find(s => normalized.includes(s.name.toLowerCase()));
  
  return profile || {
    name: storeName,
    capability: 'no_cart_support',
    baseUrl: `https://www.google.com/search?q=${encodeURIComponent(storeName)}`
  };
};

export const getStoreActionLabel = (capability: StoreCapability, lang: 'pl' | 'en'): string => {
  const labels = {
    pl: {
      full_cart_support: "Otwórz w Sklepie",
      partial_cart_support: "Idź do Sklepu",
      no_cart_support: "Szukaj w Sklepie"
    },
    en: {
      full_cart_support: "Open in Store",
      partial_cart_support: "Go to Store",
      no_cart_support: "Search Store"
    }
  };
  return labels[lang][capability];
};

/**
 * Generates a URL for a single product using the "CheckThis Product Linking Engine" logic.
 * Logic: Direct URL (if valid) -> Shop Search (Template) -> Google Site Search (Fallback)
 */
export const getProductUrl = (offer: StoreOffer, productName: string): string => {
    // STEP 1: DIRECT URL
    // If Gemini provided a valid deep link (must look like a real product page, not a search result)
    if (offer.url && 
        offer.url.startsWith('http') && 
        offer.url.length > 25 && 
        !offer.url.includes('google.com/search') &&
        !offer.url.includes('search?q=')) {
        return offer.url;
    }

    const profile = getStoreProfile(offer.storeName);
    
    // Normalization: Remove special chars, extra spaces, keep key identifiers
    // This matches the "normalized_product_name" concept
    const normalizedName = productName
        .replace(/[^\w\sąćęłńóśźżĄĆĘŁŃÓŚŹŻ\-]/g, '') // Keep Polish chars and hyphens
        .replace(/\s+/g, ' ')
        .trim();

    // STEP 2: SHOP SEARCH URL (Preferred)
    if (profile.searchTemplate) {
        return profile.searchTemplate.replace('{q}', encodeURIComponent(normalizedName));
    }

    // STEP 3: GOOGLE SITE SEARCH (Last Resort)
    // Format: site:{shop_domain} "{normalized_product_name}"
    let domain = '';
    try {
        // Extract domain from baseUrl (e.g. https://www.frisco.pl -> frisco.pl)
        if (profile.baseUrl.startsWith('http')) {
            const urlObj = new URL(profile.baseUrl);
            domain = urlObj.hostname.replace(/^www\./, '');
        }
    } catch (e) {
        // Fallback if URL parsing fails
        domain = offer.storeName.toLowerCase().replace(/\s/g, '') + '.pl';
    }

    if (domain && !domain.includes('google')) {
        const query = `site:${domain} "${normalizedName}"`;
        return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }

    // Absolute fallback
    return `https://www.google.com/search?q=${encodeURIComponent(`${offer.storeName} ${normalizedName}`)}`;
};

/**
 * Generates a URL for a basket (multiple items).
 */
export const getBasketUrl = (storeName: string, items: BasketItem[]): string => {
   const profile = getStoreProfile(storeName);
   
   if (profile.capability === 'full_cart_support' && profile.generateCartUrl && items.length > 0) {
     return profile.generateCartUrl(items);
   }

   if (items.length === 1 && profile.searchTemplate) {
       return profile.searchTemplate.replace('{q}', encodeURIComponent(items[0].productName));
   }
   
   return profile.baseUrl;
};
