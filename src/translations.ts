
export const translations = {
  pl: {
    nav: {
      features: "Funkcje",
      howItWorks: "Jak to działa",
      blog: "Blog CheckIn",
      business: "Biznes / API",
      pricing: "Cennik",
      signIn: "Zaloguj się",
      tryFree: "Wypróbuj za darmo",
      basket: "Smart Koszyk",
      account: "Konto"
    },
    stickyNav: {
      paste: "Wklej Link",
      scan: "Skanuj / Zdjęcie"
    },
    hero: {
      title1: "Zrozum. Porównaj.",
      title2: "Decyduj lepiej.",
      subtitle: "Globalny silnik AI dla zdrowszych i mądrzejszych zakupów. Analizuj produkty za pomocą linków, składników lub zdjęć.",
      placeholder: "Wklej link, skład lub nazwę produktu...",
      analyze: "Analizuj",
      analyzing: "Analizuję...",
      upload: "Wgraj zdjęcie",
      imageLoaded: "Obraz gotowy",
      removeImage: "Usuń obraz",
      extracting: "Rozpoznawanie produktu...",
      listening: "Słucham...",
      micError: "Brak dostępu",
      dailyTip: "💡 CheckIn Tip: ",
      readMore: "Czytaj więcej",
      barcode: {
        scan: "Skanuj Kod Kreskowy",
        identifying: "Identyfikacja produktu...",
        lookingUp: "Szukam w bazie...",
        found: "Produkt Znaleziony",
        notFound: "Przełączam na analizę wizualną AI...",
        analyzeCta: "Analizuj ten produkt",
        manualCta: "Analizuj zdjęcie (OCR)",
        hints: "Zrób zdjęcie kodu lub przodu opakowania"
      },
      tags: {
        global: "Globalne wyszukiwanie",
        scores: "Personalizowane wyniki",
        prices: "Porównanie cen",
        independent: "Niezależne dane"
      },
      visuals: {
        scoreTitle: "Wynik Zdrowotny",
        scoreValue: "85/100",
        scoreDesc: "Doskonały Wybór",
        priceTitle: "Znaleziono Oszczędność",
        priceValue: "-12,50 zł",
        priceDesc: "Taniej w innym sklepie",
        ingTitle: "Analiza Składu",
        ingValue: "Brak Oleju Palmowego",
        ingDesc: "Bezpieczny dla serca"
      }
    },
    receiptFlow: {
      steps: {
        ocr: "Krok 1/4: Przetwarzamy obraz",
        analysis: "Krok 2/4: Normalizacja danych",
        preview: "Krok 3/4: Podsumowanie (Podgląd)",
        account: "Krok 4/4: Zapisz wynik"
      },
      loading: {
        ocr: [
          "Optymalizuję jakość zdjęcia...",
          "Rozpoznaję sklep i produkty...",
          "Weryfikuję daty i ceny..."
        ],
        analysis: [
          "Normalizuję nazwy produktów...",
          "Łączę produkty z bazą globalną...",
          "Sprawdzam normy WHO i dane naukowe..."
        ]
      },
      preview: {
        title: "Paragon przetworzony",
        success: "Sukces",
        total: "Łączna kwota",
        date: "Data zakupu",
        itemsCount: "Liczba pozycji",
        globalDbBadge: "Dodano do Globalnej Bazy Cen",
        globalDbDesc: "Twoje dane pomagają innym znaleźć lepsze ceny. Dane są anonimowe.",
        ctaTitle: "Odbierz 3 darmowe skany",
        ctaDesc: "Utwórz konto, aby zobaczyć pełną analizę i zapisać paragon.",
        unlockButton: "Utwórz konto i zobacz wynik",
        loginLink: "Masz już konto? Zaloguj się"
      },
      result: {
        title: "Pełna Analiza Paragonu",
        saved: "Zapisano w historii",
        normalization: "Normalizacja Produktów",
        scanNext: "Skanuj kolejny paragon"
      }
    },
    blog: {
      title: "CheckIn: Wiedza i Rankingi",
      subtitle: "Nauka o żywieniu w pigułce i gotowe porównania produktów.",
      source: "Źródło",
      tabs: {
        science: "Nauka i Nawyki",
        rankings: "Rankingi Produktów"
      },
      rankings: {
        dairy: "Produkty Mleczne",
        snacks: "Zdrowe Przekąski",
        betterChoice: "Lepszy Wybór",
        avoid: "Uważaj na to",
        why: "Dlaczego?"
      },
      facts: [
        { title: "Kolejność jedzenia", desc: "Jedzenie białka i warzyw przed węglowodanami zmniejsza wyrzut glukozy o 30-40%.", source: "Weill Cornell Medicine Study" },
        { title: "Sen a głód", desc: "Już jedna nieprzespana noc zwiększa poziom greliny (hormonu głodu) i sprawia, że jesz średnio 385 kcal więcej.", source: "European Journal of Clinical Nutrition" },
        { title: "Mit soku", desc: "Szklanka soku pomarańczowego ma tyle samo cukru co napój gazowany. Zawsze wybieraj cały owoc z błonnikiem.", source: "Harvard T.H. Chan School of Public Health" },
        { title: "Białko na śniadanie", desc: "Spożycie 30g białka rano stabilizuje apetyt na resztę dnia i ogranicza podjadanie wieczorem.", source: "PubMed / NIH Research" },
        { title: "Zimne ziemniaki", desc: "Ugotowane i wystudzone ziemniaki wytwarzają skrobię oporną, która działa jak prebiotyk dla jelit.", source: "PZH - Narodowy Instytut Zdrowia Publicznego" },
        { title: "30 roślin tygodniowo", desc: "Badania American Gut Project pokazują, że jedzenie 30 różnych roślin tygodniowo drastycznie poprawia mikrobiom.", source: "American Gut Project" },
        { title: "Ocet przed posiłkiem", desc: "Łyżka octu jabłkowego rozpuszczona w wodzie przed posiłkiem poprawia wrażliwość insulinową.", source: "Diabetes Care Journal" },
        { title: "Woda a metabolizm", desc: "Wypicie 500ml wody zwiększa tempo metabolizmu o 30% na kolejne 30-40 minut.", source: "The Journal of Clinical Endocrinology & Metabolism" },
        { title: "Post przerywany", desc: "Okno żywieniowe 16:8 wspomaga autofagię – proces oczyszczania komórek z toksyn.", source: "The New England Journal of Medicine" },
        { title: "Cynamon", desc: "Pół łyżeczki cynamonu dziennie może obniżyć poziom cukru we krwi u osób z insulinoopornością.", source: "Polskie Towarzystwo Diabetologiczne" },
        { title: "Jajka i cholesterol", desc: "Dla 70% ludzi jedzenie jajek nie podnosi poziomu 'złego' cholesterolu LDL, a podnosi 'dobry' HDL.", source: "Healthline / PubMed" },
        { title: "Oliwa z oliwek", desc: "Zawiera oleocanthal, który działa przeciwzapalnie podobnie do ibuprofenu.", source: "Nature Journal" },
        { title: "Magnez i stres", desc: "Stres wypłukuje magnez, a brak magnezu zwiększa reakcję na stres. Błędne koło.", source: "Narodowe Centrum Edukacji Żywieniowej" },
        { title: "Chodzenie po jedzeniu", desc: "Zaledwie 10 minut spaceru po posiłku znacząco obniża poziom cukru we krwi.", source: "Sports Medicine Journal" },
        { title: "Słodziki", desc: "Erytrytol i Stewia to bezpieczne, naturalne alternatywy, które nie podnoszą poziomu insuliny.", source: "EFSA (Europejski Urząd ds. Bezpieczeństwa Żywności)" }
      ],
      comparisons: [
        {
          category: "Jogurty",
          better: "Jogurt Grecki Naturalny",
          worse: "Jogurt Owocowy 0%",
          reason: "Jogurt owocowy to często 'deser' z 3 łyżeczkami cukru. Grecki ma 2x więcej białka i zdrowe tłuszcze."
        },
        {
          category: "Przekąski",
          better: "Popcorn domowy",
          worse: "Potato Chips",
          reason: "Popcorn is whole grain and fiber. Chips are fried starch and acrylamide."
        },
        {
          category: "Bread",
          better: "Sourdough Rye",
          worse: "White Wheat Bun",
          reason: "Sourdough lowers glycemic index and aids gluten digestion. White buns are 'empty calories'."
        },
         {
          category: "Sweets",
          better: "Dark Chocolate 85%",
          worse: "White Chocolate",
          reason: "Dark chocolate is a source of magnesium. White is just cocoa fat and sugar."
        }
      ]
    },
    personas: {
      title: "Analyze as:",
      general: "General Health",
      athlete: "Keto Athlete",
      parent: "Concerned Parent",
      allergic: "High Sensitivity/Allergy"
    },
    results: {
      healthOverview: "Health Overview",
      goodPoints: "Good points",
      concerns: "Things to consider",
      unlockTitle: "Unlock full analysis",
      unlockDesc: "See why this product scored this way and find healthier alternatives.",
      unlockButton: "Unlock full access",
      cancelAnytime: "Cancel anytime.",
      ingredientBreakdown: "Ingredient Breakdown",
      priceComparison: "Price Comparison",
      analyzedFor: "Analyzed for context:",
      personalScore: "Personal Score",
      aiVerdict: "Summary", 
      insights: "Key Insights",
      transparency: "Ingredient Transparency",
      alternatives: "Healthier Alternatives",
      seeWhereToBuy: "See where to buy",
      viewBetter: "View Better Option",
      priceIntel: "Smart Price Comparison",
      bestOffers: "Searching multiple online stores available in your region.",
      cheapest: "Lowest Price",
      fastest: "Fastest Delivery",
      addBasket: "Add",
      added: "Added!",
      viewDetails: "View",
      offerDetails: "Offer Details",
      newAnalysis: "Start new analysis",
      goToStore: "Go to Store",
      savings: "You can save up to",
      selectSpecific: "We found several variants. Select a specific product for full analysis:",
      matchesTitle: "Matching Products",
      methodology: {
        title: "CheckThis™ Assessment Methodology",
        how: "How do we calculate your score?",
        factors: [
          { name: "Ingredient Quality (40%)", desc: "Analysis of origin, naturalness and processing level." },
          { name: "Nutritional Value (30%)", desc: "Macro-nutrient balance tailored to your profile (e.g. sugar, protein)." },
          { name: "Additives Impact (20%)", desc: "Risk assessment of preservatives, colorants and flavor enhancers." },
          { name: "Profile Context (10%)", desc: "Individual adjustments (e.g. Keto, Allergies) affecting the final score." }
        ],
        infoTooltip: "Click to see how we calculate the score."
      }
    },
    basket: {
      title: "Your Smart Basket",
      empty: "Basket is empty. Add products from analysis to create your shopping list.",
      summary: "List Summary",
      totalAt: "Total at",
      checkout: "Product Link",
      savingsDesc: "Your list is organized by store for maximum convenience.",
      items: "items",
      clear: "Clear All"
    },
    checkout: {
      title: "Ulepsz do Planu",
      step1: "Konto",
      step2: "Płatność",
      step3: "Gotowe",
      emailLabel: "Adres Email",
      passLabel: "Hasło",
      createAccount: "Create account",
      login: "I have an account",
      or: "or",
      paymentHeader: "Payment Method",
      secure: "Secure SSL Transaction",
      card: "Credit / Debit Card",
      blik: "BLIK",
      pay: "Pay",
      cancelAnytime: "Cancel anytime",
      vatInvoice: "I need a VAT invoice",
      terms: "I accept Terms of Service and agree to immediate service access.",
      successTitle: "Welcome to CheckThis Pro!",
      successDesc: "Your account is active. You can now use unlimited analysis.",
      backToApp: "Back to App",
      totalDue: "Total due today"
    },
    pricing: {
      title: "Transparent Pricing",
      subtitle: "Independent scores. No hidden fees. Cancel anytime.",
      vatInfo: "Prices include VAT.",
      tiers: {
        free: {
          name: "Free",
          desc: "For occasional checks",
          features: ["3 Daily Scans", "Basic Health Score", "Ad-supported (Labeled)", "No History"]
        },
        personal: {
          name: "Personal",
          desc: "For health-conscious",
          features: ["Unlimited Scans", "Deep Ingredient Analysis", "No Ads", "Price Tracking", "History & Favorites"]
        },
        family: {
          name: "Family",
          desc: "Household protection",
          features: ["5 User Profiles", "Allergy Alerts for Kids", "Shared Shopping Lists", "PDF Export"]
        },
        pro: {
          name: "Pro API",
          desc: "For developers",
          features: ["API Access", "Commercial License", "Bulk Analysis", "Dev Dashboard"]
        }
      },
      cta: {
        free: "Current Plan",
        buy: "Select Plan",
        contact: "Contact Sales"
      }
    },
    loading: {
      title: "CheckThis AI is Thinking",
      didYouKnow: "Did you know?",
      share: "Share this Tip",
      shareCopy: "Checking my product on CheckThis and I just learned this! 🥑",
      statuses: [
        "Scanning ingredient list and nutritional values...",
        "Cross-referencing scientific databases and WHO standards...",
        "Detecting hidden sugars and preservatives...",
        "Comparing prices across online retailers...",
        "Selecting healthier alternatives for you..."
      ],
      tips: [
        {
          title: "Avocado & Heart",
          desc: "Avocados contain more potassium than bananas, supporting blood pressure regulation and heart health.",
          category: "food"
        },
        {
          title: "Dark Chocolate Power",
          desc: "Dark chocolate (70%+) is a potent source of antioxidants that fight oxidative stress.",
          category: "food"
        },
        {
          title: "Frozen vs Fresh",
          desc: "Frozen vegetables often retain more vitamins than 'fresh' ones that have spent days in transit.",
          category: "science"
        },
        {
          title: "The 'Light' Trap",
          desc: "Products labeled 'Light' often have added sugar or sweeteners to compensate for reduced fat.",
          category: "warning"
        },
        {
          title: "Morning Protein",
          desc: "Eating 30g of protein at breakfast helps maintain stable blood sugar and reduces evening cravings.",
          category: "habit"
        },
        {
          title: "Vitamin C in Peppers",
          desc: "Red bell peppers contain almost 3 times more Vitamin C than oranges. Perfect for immunity.",
          category: "food"
        },
        {
          title: "Price Psychology",
          desc: "The most expensive products in supermarkets are usually placed at eye level.",
          category: "shopping"
        },
        {
          title: "Olive Oil & Light",
          desc: "Olive oil loses its properties when exposed to light. Always choose dark bottles.",
          category: "science"
        }
      ]
    },
    howItWorks: {
      steps: [
        {
          title: "Upload or Type",
          desc: "Take a photo of the label, paste a product link, or simply type the product name."
        },
        {
          title: "AI Analysis",
          desc: "Our AI engine parses ingredients, nutritional values, and reviews, looking for hidden risks and benefits."
        },
        {
          title: "Smart Decision",
          desc: "Get a clear score, healthier alternatives, and price comparisons from top retailers."
        }
      ]
    },
    features: {
      badge: "Why Us?",
      title: "Technology that cares for your health and wallet",
      items: [
        { title: "Ingredient Analysis", desc: "Instant explanation of complex labels and E-additives." },
        { title: "Global Database", desc: "Millions of products from around the world at your fingertips." },
        { title: "Health Context", desc: "Results tailored to your diet, allergies, and fitness goals." },
        { title: "Speed", desc: "Real-time analysis powered by the latest AI models." },
        { title: "Savings", desc: "Automatic search for the lowest prices in trusted stores." },
        { title: "Safety", desc: "Data based on scientific research, not marketing claims." }
      ]
    },
    business: {
      badge: "For Business",
      title: "CheckThis API for Your App",
      desc: "Integrate a powerful product analysis engine directly into your e-commerce, diet app, or health system.",
      items: [
        { title: "Easy Integration", desc: "REST API documentation and ready-made libraries." },
        { title: "Scalability", desc: "Handling millions of requests per day." },
        { title: "Structured Data", desc: "Clean JSON format for every product." },
        { title: "Analytics", desc: "Insights into shopping trends and user preferences." }
      ],
      cta: "Get API Key"
    },
    footer: {
      desc: "Your personal AI shopping assistant. Helping you make better health and financial decisions every day.",
      product: "Produkt",
      company: "Firma",
      copyright: "© 2024 CheckThis.co. All rights reserved.",
      links: {
        search: "Smart Search",
        extension: "Browser Extension",
        app: "Mobile App (Beta)",
        api: "Business API",
        ethics: "Ethics & Transparency",
        sources: "Scientific Sources",
        privacy: "Privacy Policy",
        terms: "Terms of Service"
      }
    }
  }
};
