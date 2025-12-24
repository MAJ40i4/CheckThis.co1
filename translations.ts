
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
          worse: "Chipsy ziemniaczane",
          reason: "Popcorn to pełne ziarno i błonnik. Chipsy to smażona skrobia i akrylamid (potencjalnie rakotwórczy)."
        },
        {
          category: "Pieczywo",
          better: "Chleb żytni na zakwasie",
          worse: "Bułka pszenna",
          reason: "Zakwas obniża indeks glikemiczny i ułatwia trawienie glutenu. Biała bułka to 'puste kalorie'."
        },
         {
          category: "Słodycze",
          better: "Gorzka Czekolada 85%",
          worse: "Biała Czekolada",
          reason: "Gorzka czekolada to źródło magnezu i antyoksydantów. Biała to tylko tłuszcz kakaowy i cukier."
        }
      ]
    },
    personas: {
      title: "Analizuj jako:",
      general: "Ogólne zdrowie",
      athlete: "Sportowiec Keto",
      parent: "Zaniepokojony rodzic",
      allergic: "Alergik / Nadwrażliwość"
    },
    results: {
      healthOverview: "Przegląd Zdrowotny",
      goodPoints: "Mocne strony",
      concerns: "Kwestie do rozważenia",
      unlockTitle: "Odblokuj pełną analizę",
      unlockDesc: "Zobacz dlaczego produkt otrzymał taką ocenę i znajdź zdrowsze alternatywy.",
      unlockButton: "Odblokuj pełny dostęp",
      cancelAnytime: "Anuluj w dowolnym momencie.",
      ingredientBreakdown: "Analiza Składników",
      priceComparison: "Porównanie Cen",
      analyzedFor: "Analiza dla kontekstu:",
      personalScore: "Twój wynik",
      aiVerdict: "Podsumowanie", 
      insights: "Kluczowe spostrzeżenia",
      transparency: "Przejrzystość składu",
      alternatives: "Zdrowsze alternatywy",
      seeWhereToBuy: "Zobacz gdzie kupić",
      viewBetter: "Zobacz lepszą opcję",
      priceIntel: "Inteligentne Porównanie Cen",
      bestOffers: "Przeszukujemy oferty w wielu sklepach dostępnych online.",
      cheapest: "Najniższa cena",
      fastest: "Najszybsza dostawa",
      addBasket: "Dodaj",
      added: "Dodano!",
      viewDetails: "Zobacz",
      offerDetails: "Szczegóły oferty",
      newAnalysis: "Rozpocznij nową analizę",
      goToStore: "Idź do sklepu",
      savings: "Możesz zaoszczędzić do",
      selectSpecific: "Znaleźliśmy kilka wariantów. Wybierz konkretny produkt do pełnej analizy:",
      matchesTitle: "Pasujące produkty",
      methodology: {
        title: "Metodologia Oceny CheckThis™",
        how: "Jak obliczamy Twój wynik?",
        factors: [
          { name: "Jakość Składników (40%)", desc: "Analiza pochodzenia, naturalności i stopnia przetworzenia." },
          { name: "Wartości Odżywcze (30%)", desc: "Bilans makroskładników dopasowany do Twojego profilu (np. cukier, białko)." },
          { name: "Wpływ Dodatków (20%)", desc: "Ocena ryzyka konserwantów, barwników i wzmacniaczy smaku." },
          { name: "Kontekst Profilu (10%)", desc: "Indywidualne dopasowanie (np. Keto, Alergie) wpływające na końcową ocenę." }
        ],
        infoTooltip: "Kliknij, aby zobaczyć jak obliczamy wynik."
      }
    },
    basket: {
      title: "Twój Smart Koszyk",
      empty: "Koszyk jest pusty. Dodaj produkty z analizy, aby stworzyć listę zakupów.",
      summary: "Podsumowanie listy",
      totalAt: "Razem w sklepie",
      checkout: "Link do produktu",
      savingsDesc: "Twoja lista jest posegregowana sklepami dla maksymalnej wygody.",
      items: "poz.",
      clear: "Wyczyść wszystko"
    },
    checkout: {
      title: "Ulepsz do Planu",
      step1: "Konto",
      step2: "Płatność",
      step3: "Gotowe",
      emailLabel: "Adres Email",
      passLabel: "Hasło",
      createAccount: "Utwórz konto",
      login: "Mam już konto",
      or: "lub",
      paymentHeader: "Metoda Płatności",
      secure: "Bezpieczna transakcja SSL",
      card: "Karta Płatnicza",
      blik: "BLIK",
      pay: "Zapłać",
      cancelAnytime: "Anuluj w dowolnym momencie",
      vatInvoice: "Chcę fakturę VAT",
      terms: "Akceptuję Regulamin i wyrażam zgodę na natychmiastowe rozpoczęcie świadczenia usługi.",
      successTitle: "Witamy w CheckThis Pro!",
      successDesc: "Twoje konto zostało aktywowane. Możesz teraz korzystać z nielimitowanych analiz.",
      backToApp: "Wróć do aplikacji",
      totalDue: "Do zapłaty dzisiaj"
    },
    pricing: {
      title: "Przejrzysty Cennik",
      subtitle: "Niezależne oceny. Brak ukrytych kosztów. Anuluj kiedy chcesz.",
      vatInfo: "Ceny zawierają podatek VAT.",
      tiers: {
        free: {
          name: "Free",
          desc: "Do okazyjnych sprawdzeń",
          features: ["3 Skanowania Dziennie", "Podstawowy Wynik Zdrowotny", "Brak historii wyszukiwania", "Reklamy (Oznaczone)"]
        },
        personal: {
          name: "Personal",
          desc: "Dla dbających o zdrowie",
          features: ["Nielimitowane Skanowania", "Pełna Analiza Składników", "Śledzenie Cen", "Brak Reklam", "Historia i Ulubione"]
        },
        family: {
          name: "Family",
          desc: "Ochrona dla całego domu",
          features: ["5 Profili Użytkowników", "Alerty Alergiczne dla Dzieci", "Wspólne Listy Zakupów", "Eksport PDF"]
        },
        pro: {
          name: "Pro API",
          desc: "Dla firm i deweloperów",
          features: ["Dostęp do API", "Licencja Komercyjna", "Analiza Masowa", "Panel Deweloperski"]
        }
      },
      cta: {
        free: "Aktualny Plan",
        buy: "Wybierz Plan",
        contact: "Kontakt"
      }
    },
    loading: {
      title: "CheckThis AI analizuje...",
      didYouKnow: "Czy wiesz, że?",
      share: "Udostępnij Ciekawostkę",
      shareCopy: "Czekam na analizę produktu w CheckThis i dowiedziałem się tego! 🥑",
      statuses: [
        "Rozpoznaję produkt i składniki (OCR)...",
        "Analizuję normy WHO i bazy naukowe...",
        "Szukam cen w sklepach online...",
        "Porównuję alternatywy i finalizuję wynik..."
      ],
      tips: [
        {
          title: "Awokado a Serce",
          desc: "Awokado zawiera więcej potasu niż banany, co pomaga regulować ciśnienie krwi i wspiera pracę serca.",
          category: "food"
        },
        {
          title: "Moc Ciemnej Czekolady",
          desc: "Ciemna czekolada (70%+) jest potężnym źródłem antyoksydantów, które walczą ze stresem oksydacyjnym.",
          category: "food"
        },
        {
          title: "Mrożone vs Świeże",
          desc: "Mrożone warzywa często zachowują więcej witamin niż 'świeże', które spędziły dni w transporcie.",
          category: "science"
        },
        {
          title: "Pułapka 'Light'",
          desc: "Produkty oznaczone jako 'Light' często mają dodany cukier lub słodziki, aby zrekompensować brak tłuszczu.",
          category: "warning"
        },
        {
          title: "Białko o Poranku",
          desc: "Zjedzenie 30g białka na śniadanie pomaga utrzymać stabilny poziom cukru i zmniejsza apetyt wieczorem.",
          category: "habit"
        },
        {
          title: "Witamina C w Papryce",
          desc: "Czerwona papryka ma niemal 3 razy więcej witaminy C niż pomarańcze. Idealna na odporność.",
          category: "food"
        },
        {
          title: "Psychologia Cen",
          desc: "Najdroższe produkty w marketach są zazwyczaj umieszczane na wysokości wzroku klienta.",
          category: "shopping"
        },
        {
          title: "Oliwa i Światło",
          desc: "Oliwa z oliwek traci swoje cenne właściwości pod wpływem światła. Zawsze wybieraj ciemne butelki.",
          category: "science"
        }
      ]
    },
    howItWorks: {
      steps: [
        {
          title: "Wgraj lub Wpisz",
          desc: "Zrób zdjęcie etykiety, wklej link do produktu lub po prostu wpisz jego nazwę."
        },
        {
          title: "Analiza AI",
          desc: "Nasz silnik AI przetwarza składniki, wartości odżywcze i opinie, szukając ukrytych ryzyk i korzyści."
        },
        {
          title: "Mądra Decyzja",
          desc: "Otrzymaj jasny wynik, zdrowsze alternatywy i porównanie cen w najlepszych sklepach."
        }
      ]
    },
    features: {
      badge: "Dlaczego My?",
      title: "Technologia, która dba o Twoje zdrowie i portfel",
      items: [
        { title: "Analiza Składu", desc: "Natychmiastowe wyjaśnienie skomplikowanych etykiet i E-dodatków." },
        { title: "Globalna Baza", desc: "Miliony produktów z całego świata w zasięgu ręki." },
        { title: "Kontekst Zdrowotny", desc: "Wyniki dopasowane do Twojej diety, alergii i celów sportowych." },
        { title: "Szybkość", desc: "Analiza w czasie rzeczywistym dzięki najnowszym modelom AI." },
        { title: "Oszczędność", desc: "Automatyczne wyszukiwanie najniższych cen w zaufanych sklepach." },
        { title: "Bezpieczeństwo", desc: "Dane oparte na badaniach naukowych, nie na marketingu." }
      ]
    },
    business: {
      badge: "Dla Biznesu",
      title: "API CheckThis dla Twojej Aplikacji",
      desc: "Zintegruj potężny silnik analizy produktów bezpośrednio w swoim e-commerce, aplikacji dietetycznej lub systemie zdrowotnym.",
      items: [
        { title: "Łatwa Integracja", desc: "Dokumentacja REST API i gotowe biblioteki." },
        { title: "Skalowalność", desc: "Obsługa milionów zapytań dziennie." },
        { title: "Dane Strukturalne", desc: "Czysty format JSON dla każdego produktu." },
        { title: "Analityka", desc: "Wgląd w trendy zakupowe i preferencje użytkowników." }
      ],
      cta: "Uzyskaj Klucz API"
    },
    footer: {
      desc: "Twój osobisty asystent zakupowy AI. Pomagamy podejmować lepsze decyzje zdrowotne i finansowe każdego dnia.",
      product: "Produkt",
      company: "Firma",
      copyright: "© 2024 CheckThis.co. Wszelkie prawa zastrzeżone.",
      links: {
        search: "Inteligentne Wyszukiwanie",
        extension: "Wtyczka do Przeglądarki",
        app: "Aplikacja Mobilna",
        api: "API dla Biznesu",
        ethics: "Etyka i Przejrzystość",
        sources: "Źródła Naukowe",
        privacy: "Polityka Prywatności",
        terms: "Regulamin"
      }
    }
  },
  en: {
    nav: {
      features: "Features",
      howItWorks: "How it works",
      blog: "CheckIn Blog",
      business: "Business / API",
      pricing: "Pricing",
      signIn: "Sign in",
      tryFree: "Try Free",
      basket: "Smart Basket",
      account: "Account"
    },
    stickyNav: {
      paste: "Paste Link",
      scan: "Scan / Photo"
    },
    hero: {
      title1: "Understand. Compare.",
      title2: "Decide Better.",
      subtitle: "The global AI engine for healthier and smarter purchases. Analyze any product by link, ingredients, or photo.",
      placeholder: "Paste Amazon link, ingredients, or product name...",
      analyze: "Analyze",
      analyzing: "Optimizing data...",
      upload: "Upload Image",
      imageLoaded: "Image Loaded",
      removeImage: "Remove image",
      extracting: "Identifying...",
      listening: "Listening...",
      micError: "Mic Error",
      dailyTip: "💡 CheckIn Tip: ",
      readMore: "Read more",
      barcode: {
        scan: "Scan Barcode",
        identifying: "Identifying product...",
        lookingUp: "Looking up database...",
        found: "Product Found",
        notFound: "Switching to AI visual analysis...",
        analyzeCta: "Analyze this product",
        manualCta: "Use Full AI Analysis (OCR)",
        hints: "Take a photo of barcode or packaging"
      },
      tags: {
        global: "Global Search",
        scores: "Personalized Scores",
        prices: "Price Comparison",
        independent: "Independent Data"
      },
      visuals: {
        scoreTitle: "Health Score",
        scoreValue: "85/100",
        scoreDesc: "Excellent Choice",
        priceTitle: "Savings Found",
        priceValue: "-$3.50",
        priceDesc: "Cheaper at competitor",
        ingTitle: "Ingredient Analysis",
        ingValue: "No Palm Oil",
        ingDesc: "Heart Safe"
      }
    },
    receiptFlow: {
      steps: {
        ocr: "Step 1/4: Processing Image",
        analysis: "Step 2/4: Data Normalization",
        preview: "Step 3/4: Summary (Preview)",
        account: "Step 4/4: Save Result"
      },
      loading: {
        ocr: [
          "Optimizing image quality...",
          "Identifying store and items...",
          "Verifying dates and prices..."
        ],
        analysis: [
          "Normalizing product names...",
          "Linking products to global database...",
          "Checking WHO standards and scientific data..."
        ]
      },
      preview: {
        title: "Receipt Processed",
        success: "Success",
        total: "Total Amount",
        date: "Purchase Date",
        itemsCount: "Items Count",
        globalDbBadge: "Added to Global Price DB",
        globalDbDesc: "Your data helps others find better prices. Anonymized.",
        ctaTitle: "Claim 3 Free Scans",
        ctaDesc: "Create an account to see full analysis and save your receipt.",
        unlockButton: "Create Account & View Result",
        loginLink: "Already have an account? Login"
      },
      result: {
        title: "Full Receipt Analysis",
        saved: "Saved to History",
        normalization: "Product Normalization",
        scanNext: "Scan Next Receipt"
      }
    },
    blog: {
      title: "CheckIn: Knowledge & Rankings",
      subtitle: "Nutrition science bites and ready-made product comparisons.",
      source: "Source",
      tabs: {
        science: "Science & Habits",
        rankings: "Product Rankings"
      },
      rankings: {
        dairy: "Dairy Products",
        snacks: "Healthy Snacks",
        betterChoice: "Better Choice",
        avoid: "Watch Out",
        why: "Why?"
      },
      facts: [
        { title: "Food Order", desc: "Eating protein and veggies before carbs reduces glucose spike by 30-40%.", source: "Weill Cornell Medicine Study" },
        { title: "Sleep & Hunger", desc: "Just one sleepless night increases ghrelin (hunger hormone) causing you to eat 385 more calories.", source: "European Journal of Clinical Nutrition" },
        { title: "Juice Myth", desc: "A glass of orange juice has as much sugar as soda. Always choose whole fruit with fiber.", source: "Harvard T.H. Chan School of Public Health" },
        { title: "Breakfast Protein", desc: "Eating 30g of protein in the morning stabilizes appetite for the rest of the day.", source: "PubMed / NIH Research" },
        { title: "Cold Potatoes", desc: "Cooked and cooled potatoes develop resistant starch, which acts as a prebiotic.", source: "National Institutes of Health (NIH)" },
        { title: "30 Plants", desc: "American Gut Project shows eating 30 different plants a week drastically improves microbiome.", source: "American Gut Project" },
        { title: "Vinegar Hack", desc: "A tablespoon of apple cider vinegar in water before a meal improves insulin sensitivity.", source: "Diabetes Care Journal" },
        { title: "Water Metabolism", desc: "Drinking 500ml of water boosts metabolic rate by 30% for the next 30-40 minutes.", source: "The Journal of Clinical Endocrinology & Metabolism" },
        { title: "Intermittent Fasting", desc: "A 16:8 eating window promotes autophagy – the cell cleaning process.", source: "The New England Journal of Medicine" },
        { title: "Cinnamon", desc: "Half a teaspoon of cinnamon daily can lower blood sugar levels.", source: "American Diabetes Association" },
        { title: "Eggs & Cholesterol", desc: "For 70% of people, eggs don't raise 'bad' LDL cholesterol, but raise 'good' HDL.", source: "Healthline / PubMed" },
        { title: "Olive Oil", desc: "Contains oleocanthal which acts as a natural anti-inflammatory similar to ibuprofen.", source: "Nature Journal" },
        { title: "Magnesium Loop", desc: "Stress depletes magnesium, and low magnesium increases stress reaction. A vicious cycle.", source: "NIH / PubMed" },
        { title: "Walking After Meals", desc: "Just a 10-minute walk after eating significantly lowers blood sugar levels.", source: "Sports Medicine Journal" },
        { title: "Sweeteners", desc: "Erythritol and Stevia are safe, natural alternatives that don't spike insulin.", source: "EFSA (European Food Safety Authority)" }
      ],
      comparisons: [
        {
          category: "Yogurts",
          better: "Plain Greek Yogurt",
          worse: "0% Fruit Yogurt",
          reason: "Fruit yogurt is often 'dessert' with 3 tsp of sugar. Greek has 2x protein and healthy fats."
        },
        {
          category: "Snacks",
          better: "Homemade Popcorn",
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
      createAccount: "Utwórz konto",
      login: "Mam już konto",
      or: "lub",
      paymentHeader: "Metoda Płatności",
      secure: "Bezpieczna transakcja SSL",
      card: "Karta Płatnicza",
      blik: "BLIK",
      pay: "Zapłać",
      cancelAnytime: "Anuluj w dowolnym momencie",
      vatInvoice: "Chcę fakturę VAT",
      terms: "Akceptuję Regulamin i wyrażam zgodę na natychmiastowe rozpoczęcie świadczenia usługi.",
      successTitle: "Witamy w CheckThis Pro!",
      successDesc: "Twoje konto zostało aktywowane. Możesz teraz korzystać z nielimitowanych analiz.",
      backToApp: "Wróć do aplikacji",
      totalDue: "Do zapłaty dzisiaj"
    },
    pricing: {
      title: "Przejrzysty Cennik",
      subtitle: "Niezależne oceny. Brak ukrytych kosztów. Anuluj kiedy chcesz.",
      vatInfo: "Ceny zawierają podatek VAT.",
      tiers: {
        free: {
          name: "Free",
          desc: "Do okazyjnych sprawdzeń",
          features: ["3 Skanowania Dziennie", "Podstawowy Wynik Zdrowotny", "Brak historii wyszukiwania", "Reklamy (Oznaczone)"]
        },
        personal: {
          name: "Personal",
          desc: "Dla dbających o zdrowie",
          features: ["Nielimitowane Skanowania", "Pełna Analiza Składników", "Śledzenie Cen", "Brak Reklam", "Historia i Ulubione"]
        },
        family: {
          name: "Family",
          desc: "Ochrona dla całego domu",
          features: ["5 Profili Użytkowników", "Alerty Alergiczne dla Dzieci", "Wspólne Listy Zakupów", "Eksport PDF"]
        },
        pro: {
          name: "Pro API",
          desc: "Dla firm i deweloperów",
          features: ["Dostęp do API", "Licencja Komercyjna", "Analiza Masowa", "Panel Deweloperski"]
        }
      },
      cta: {
        free: "Aktualny Plan",
        buy: "Wybierz Plan",
        contact: "Kontakt"
      }
    },
    loading: {
      title: "CheckThis AI analizuje...",
      didYouKnow: "Czy wiesz, że?",
      share: "Udostępnij Ciekawostkę",
      shareCopy: "Czekam na analizę produktu w CheckThis i dowiedziałem się tego! 🥑",
      statuses: [
        "Rozpoznaję produkt i składniki (OCR)...",
        "Analizuję normy WHO i bazy naukowe...",
        "Szukam cen w sklepach online...",
        "Porównuję alternatywy i finalizuję wynik..."
      ],
      tips: [
        {
          title: "Awokado a Serce",
          desc: "Awokado zawiera więcej potasu niż banany, co pomaga regulować ciśnienie krwi i wspiera pracę serca.",
          category: "food"
        },
        {
          title: "Moc Ciemnej Czekolady",
          desc: "Ciemna czekolada (70%+) jest potężnym źródłem antyoksydantów, które walczą ze stresem oksydacyjnym.",
          category: "food"
        },
        {
          title: "Mrożone vs Świeże",
          desc: "Mrożone warzywa często zachowują więcej witamin niż 'świeże', które spędziły dni w transporcie.",
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
      badge: "Dlaczego My?",
      title: "Technologia, która dba o Twoje zdrowie i portfel",
      items: [
        { title: "Analiza Składu", desc: "Natychmiastowe wyjaśnienie skomplikowanych etykiet i E-dodatków." },
        { title: "Globalna Baza", desc: "Miliony produktów z całego świata w zasięgu ręki." },
        { title: "Kontekst Zdrowotny", desc: "Wyniki dopasowane do Twojej diety, alergii i celów sportowych." },
        { title: "Szybkość", desc: "Analiza w czasie rzeczywistym dzięki najnowszym modelom AI." },
        { title: "Oszczędność", desc: "Automatyczne wyszukiwanie najniższych cen w zaufanych sklepach." },
        { title: "Bezpieczeństwo", desc: "Dane oparte na badaniach naukowych, nie na marketingu." }
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
      copyright: "© 2024 CheckThis.co. Wszelkie prawa zastrzeżone.",
      links: {
        search: "Inteligentne Wyszukiwanie",
        extension: "Wtyczka do Przeglądarki",
        app: "Aplikacja Mobilna",
        api: "Business API",
        ethics: "Etyka i Przejrzystość",
        sources: "Scientific Sources",
        privacy: "Privacy Policy",
        terms: "Terms of Service"
      }
    }
  }
};
