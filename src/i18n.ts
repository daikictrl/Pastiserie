import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  fr: {
    translation: {
      // Navigation
      "Home": "Accueil",
      "Menu": "Nos Créations",
      "Cakes": "Gâteaux",
      "Pastries": "Pâtisseries",
      "Savory": "Salés & Traiteur",
      "CustomOrders": "Sur-Mesure",
      "About": "L'Atelier",
      "Contact": "Contact",
      "Say Hello": "Nous Écrire",
      "Order on WhatsApp": "Commander sur WhatsApp",
      "Delivery Available": "Livraison à Domicile & Retrait",
      "Delicious Cakes": "Pâtisserie Fine &",
      "Made With Love": "Gâteaux d'Émotion",
      "Hero Description": "Des gâteaux de fête sur-mesure aux amuse-bouches traiteur raffinés. Découvrez nos collections classées par budget et commandez directement en un clic sur WhatsApp.",
      "Order Now on WhatsApp": "Commander sur WhatsApp",
      "Explore Menu": "Découvrir le Catalogue",
      "Rated": "Excellence",
      "by Customers": "par nos clients",

      // Value Props
      "Freshly Baked": "100% Artisanal & Frais",
      "Freshly Baked Desc": "Chaque gâteau et chaque bouchée sont préparés à la commande avec des ingrédients de premier choix.",
      "Customizable": "Personnalisation Totale",
      "Customizable Desc": "Thème, couleurs, parfums, format : nous donnons vie à vos idées les plus créatives.",
      "Budget Friendly": "Prix Clairs par Gamme",
      "Budget Friendly Desc": "Des créations élégantes adaptées à tous les budgets : 10 000, 12 000, 15 000, 20 000 et 25 000 FCFA+.",

      // Section Titles
      "Cakes Section Tag": "Collections Gourmandes",
      "Cakes Section Title": "Nos Gâteaux Classés par Budget",
      "Cakes Section Desc": "Trouvez le gâteau parfait selon votre budget. Cliquez sur une catégorie pour voir nos créations et commander le modèle exact sur WhatsApp.",
      
      // Tier Titles & Descriptions
      "allBudgets": "Tous les Budgets",
      "tier10kTitle": "Gamme Festivité (10 000 FCFA)",
      "tier10kDesc": "Gâteaux d'anniversaire gourmands et soignés, idéals pour les fêtes en famille et petits comités.",
      "tier12kTitle": "Gamme Émotion (12 000 FCFA)",
      "tier12kDesc": "Finitions raffinées, glaçages travaillés et créations personnalisées au goût du jour.",
      "tier15kTitle": "Gamme Signature & Drip Cakes (15 000 FCFA)",
      "tier15kDesc": "Décorations artistiques élaborées, décors chocolatés, drip cakes gourmands et finitions élégantes.",
      "tier20kTitle": "Gamme Élite & Événement (20 000 FCFA)",
      "tier20kDesc": "Créations luxueuses aux détails personnalisés complexes pour marquer les grands moments.",
      "tier25kTitle": "Gamme Prestige & Célébration (25 000 FCFA+)",
      "tier25kDesc": "Pièces maîtresses généreuses, formats à étages et designs somptueux pour mariages et grands anniversaires.",

      // Gallery Modal & UI
      "featuredModels": "Modèles phares",
      "viewAllInTier": "Voir toute la galerie ({{count}} modèles)",
      "browseCollection": "Explorer la collection",
      "orderThisModel": "Commander ce modèle",
      "orderThisModelWhatsapp": "Commander ce modèle sur WhatsApp",
      "modelRef": "Modèle #{{id}}",
      "close": "Fermer",
      "modalGalleryTitle": "Galerie Complète — {{tier}}",
      "modalGallerySubtitle": "{{count}} créations artisanales disponibles dans cette gamme",
      "showingFeatured": "Affichage de {{current}} modèles phares sur {{total}}",
      "detailsTitle": "Caractéristiques & Confection",
      "suggestedPortions": "Portions estimées",
      "leadTime": "Délai de commande",
      "leadTimeValue": "24h à 48h à l'avance",
      "flavorsAvailable": "Saveurs au choix",
      "flavorsList": "Chocolat belge, Vanille Bourbon, Red Velvet, Fraise...",
      "customizationIncluded": "Personnalisation",
      "customizationValue": "Thème, prénom, âge, toppers & couleurs modifiables",
      "deliveryInfo": "Livraison & Retrait",
      "deliveryValue": "Livraison à domicile (Douala / Yaoundé) ou atelier",
      "whatsappFastResponse": "Confirmation immédiate sur WhatsApp",
      "portion10k": "~6 à 8 parts",
      "portion12k": "~8 à 10 parts",
      "portion15k": "~10 à 14 parts",
      "portion20k": "~14 à 18 parts",
      "portion25k": "~18 à 25+ parts (ou à étages)",

      // Sweet Pastries Section
      "sweetSectionTag": "Douceurs & Desserts",
      "sweetSectionTitle": "Pâtisseries & Mignardises",
      "sweetSectionDesc": "Des gourmandises individuelles et plateaux sucrés confectionnés pour régaler vos convives.",
      "pasterieCupcakesBouquet": "Bouquet Floral de Cupcakes",
      "pasterieCupcakesBouquetDesc": "Véritable œuvre d'art : cupcakes moelleux ornés de roses délicatement pochées en crème onctueuse.",
      "pasterieBucheNoel": "Bûche Pâtissière Festive",
      "pasterieBucheNoelDesc": "Création de fête roulée et garnie d'une crème aérienne au chocolat ou fruits fins.",
      "pasterieMignardises": "Plateau de Mignardises Fines",
      "pasterieMignardisesDesc": "Bouchées sucrées assorties pour tables de buffet, réceptions, pauses café et cocktails.",
      "pasterieBeignets": "Beignets Sucrés Moelleux",
      "pasterieBeignetsDesc": "La douceur traditionnelle africaine dorée et moelleuse, parfumée à point.",

      // Savory Cocktail Section
      "savorySectionTag": "Traiteur Salé & Événements",
      "savorySectionTitle": "Amuse-Bouches & Cocktail Salé",
      "savorySectionDesc": "Sublimez vos apéritifs, réunions et réceptions avec notre sélection traiteur salée faite maison.",
      "savoryCocktailMix": "Plateau Cocktail Assorti",
      "savoryCocktailMixDesc": "Assortiment généreux : mini burgers savoureux, sandwiches club, batbouts garnis et mini quiches dorées.",
      "savoryBrochettesPlantain": "Brochettes Boulettes & Plantain",
      "savoryBrochettesPlantainDesc": "L'incontournable fête : boulettes de viande parfumées aux épices du terroir et rondelles de plantain doré.",
      "savoryNems": "Nems Croustillants Maison",
      "savoryNemsDesc": "Croustillants à l'extérieur, farce généreuse et assaisonnée à la perfection avec leur sauce.",
      "savorySamousa": "Samoussas Dorés aux Épices",
      "savorySamousaDesc": "Triangles feuilletés dorés, croustillants et garnis d'une farce parfumée.",
      "savoryViennoiseriesSales": "Roulés, Croissants & Mini Tacos",
      "savoryViennoiseriesSalesDesc": "Viennoiseries salées feuilletées, roulés saucisse, croissants jambon fromage et bouchées tacos.",
      "savoryPouletPane": "Bouchées de Poulet Pané & Frit",
      "savoryPouletPaneDesc": "Aiguillettes et morceaux de poulet marinés, panés croustillants et dorés.",
      "savoryPizza": "Mini Pizzas Apéritives",
      "savoryPizzaDesc": "Bouchées gourmandes façon pizza avec fromage fondant et garniture parfumée.",

      // Badges
      "badgePopular": "Très Demandé",
      "badgeSeasonal": "Événementiel",
      "badgeEvent": "Buffet & Cocktail",
      "badgeTradition": "Tradition",
      "badgeBestseller": "Best-Seller Traiteur",
      "badgeSignature": "Incontournable",
      "badgeCrispy": "Croustillant",

      // Custom Order Section
      "Create Your Dream": "Votre Projet sur Mesure",
      "Custom Cake Orders": "Commande Spéciale & Devis Personnalisé",
      "Custom Cake Desc": "Vous avez une photo de référence, un thème précis ou un événement exceptionnel (mariage, dot, grand anniversaire) ? Parlez-nous en !",
      "Your Name": "Votre Nom complet",
      "Occasion (e.g., Wedding)": "Type d'événement (ex: Anniversaire, Mariage, Cocktail d'entreprise)",
      "Event Date": "Date de l'événement",
      "Guest Count": "Nombre de parts / invités estimés",
      "Budget Estimate": "Budget estimé (FCFA)",
      "Flavor / Theme": "Parfum souhaité ou thème (Vanille, Chocolat, Fruits...)",
      "Get a Quote": "Envoyer ma demande sur WhatsApp",

      // Story & Reviews
      "Our Story": "Notre Savoir-Faire",
      "Baking Memories Since 2020": "L'Art de Célébrer Chaque Moment",
      "Story Desc 1": "Sweetmeats est né d'une passion inconditionnelle pour l'art de la pâtisserie et du goût. Chaque création raconte une histoire et sublime vos moments précieux avec élégance.",
      "Story Desc 2": "De nos gâteaux à prix doux jusqu'à nos pièces maîtresses grandioses et nos plateaux traiteur salés, chaque commande est préparée avec minutie, rigueur et amour.",
      "Sweet Words from You": "Témoignages Clients",
      "Review 1 Text": "\"Le gâteau d'anniversaire commandé pour ma fille était magnifique et tellement moelleux ! Tout le monde a demandé le contact. Bravo Sweetmeats !\"",
      "Birthday Order": "Gâteau d'Anniversaire",
      "Review 2 Text": "\"Le plateau cocktail salé avec les mini burgers et brochettes de plantain a fait un carton lors de notre soirée. Produits très frais et bien assaisonnés.\"",
      "Custom Order": "Plateau Traiteur Événement",
      "Review 3 Text": "\"Commande ultra simple sur WhatsApp, respect scrupuleux du modèle choisi et livraison ponctuelle. Vous avez gagné un client fidèle !\"",
      "Regular Customer": "Cliente Régulière",

      // Footer
      "Footer Description": "Pâtisserie créative, gâteaux personnalisés et service traiteur salé. Confection artisanale à base de saveurs authentiques.",
      "Contact via WhatsApp": "Contact Direct WhatsApp",
      "Quick Links": "Accès Rapide",
      "Contact Info": "Informations & Commandes",
      "Mon - Sun": "Lundi - Dimanche : 8h00 - 20h30",
      "Location": "Douala / Yaoundé, Cameroun",
      "All rights reserved": "© 2026 Sweetmeats. Tous droits réservés.",
      "Language": "English"
    }
  },
  en: {
    translation: {
      // Navigation
      "Home": "Home",
      "Menu": "Our Creations",
      "Cakes": "Cakes",
      "Pastries": "Pastries",
      "Savory": "Savory & Catering",
      "CustomOrders": "Custom Cakes",
      "About": "Our Atelier",
      "Contact": "Contact",
      "Say Hello": "Message Us",
      "Order on WhatsApp": "Order on WhatsApp",
      "Delivery Available": "Home Delivery & Pick-up Available",
      "Delicious Cakes": "Fine Patisserie &",
      "Made With Love": "Memorable Cakes",
      "Hero Description": "From custom celebration cakes structured by budget to artisanal savory cocktail bites. Browse our organized collections and order in one click via WhatsApp.",
      "Order Now on WhatsApp": "Order on WhatsApp",
      "Explore Menu": "Browse Collections",
      "Rated": "Excellence",
      "by Customers": "rated by happy clients",

      // Value Props
      "Freshly Baked": "100% Artisanal & Fresh",
      "Freshly Baked Desc": "Every cake and savory bite is made to order with the freshest premium ingredients.",
      "Customizable": "Fully Tailored",
      "Customizable Desc": "Theme, colors, flavors and sizes: we bring your sweet dreams to life.",
      "Budget Friendly": "Clear Pricing Tiers",
      "Budget Friendly Desc": "Stunning cakes suited for every budget: 10 000, 12 000, 15 000, 20 000 and 25 000 FCFA+.",

      // Section Titles
      "Cakes Section Tag": "Sweet Collections",
      "Cakes Section Title": "Cakes Structured by Budget",
      "Cakes Section Desc": "Find the perfect cake matching your celebration budget. Click any tier to view designs and order the exact model on WhatsApp.",
      
      // Tier Titles & Descriptions
      "allBudgets": "All Budgets",
      "tier10kTitle": "Celebration Tier (10 000 FCFA)",
      "tier10kDesc": "Delicious, vibrant festive birthday cakes tailored for cozy parties and family celebrations.",
      "tier12kTitle": "Emotion Tier (12 000 FCFA)",
      "tier12kDesc": "Refined piping, creative color palettes, and charming designs for memorable events.",
      "tier15kTitle": "Signature & Drip Cakes (15 000 FCFA)",
      "tier15kDesc": "Sophisticated drip styling, chocolate garnishes, and creative artistic celebration centerpieces.",
      "tier20kTitle": "Elite Tier (20 000 FCFA)",
      "tier20kDesc": "Luxurious multi-tier or detailed custom thematic cakes designed to impress your guests.",
      "tier25kTitle": "Prestige & Grand Events (25 000 FCFA+)",
      "tier25kDesc": "Grand showstopper cakes, tiered wedding designs, and majestic cakes for high-profile celebrations.",

      // Gallery Modal & UI
      "featuredModels": "Featured Designs",
      "viewAllInTier": "View full gallery ({{count}} designs)",
      "browseCollection": "Explore collection",
      "orderThisModel": "Order this design",
      "orderThisModelWhatsapp": "Order this cake on WhatsApp",
      "modelRef": "Design #{{id}}",
      "close": "Close",
      "modalGalleryTitle": "Complete Gallery — {{tier}}",
      "modalGallerySubtitle": "{{count}} handcrafted designs available in this tier",
      "showingFeatured": "Displaying {{current}} featured designs of {{total}}",
      "detailsTitle": "Specifications & Craftsmanship",
      "suggestedPortions": "Suggested Servings",
      "leadTime": "Lead Time",
      "leadTimeValue": "24h to 48h in advance",
      "flavorsAvailable": "Available Flavors",
      "flavorsList": "Belgian Chocolate, Bourbon Vanilla, Red Velvet, Berry...",
      "customizationIncluded": "Customization",
      "customizationValue": "Theme, name, age, toppers & colors customizable",
      "deliveryInfo": "Delivery & Pickup",
      "deliveryValue": "Home delivery (Douala / Yaounde) or studio pickup",
      "whatsappFastResponse": "Fast confirmation via WhatsApp",
      "portion10k": "~6 to 8 servings",
      "portion12k": "~8 to 10 servings",
      "portion15k": "~10 to 14 servings",
      "portion20k": "~14 to 18 servings",
      "portion25k": "~18 to 25+ servings (or tiered)",

      // Sweet Pastries Section
      "sweetSectionTag": "Sweet Delicacies",
      "sweetSectionTitle": "Pastries & Mignardises",
      "sweetSectionDesc": "Delicate individual treats and party platters prepared with passionate patisserie craft.",
      "pasterieCupcakesBouquet": "Floral Cupcake Bouquet",
      "pasterieCupcakesBouquetDesc": "A stunning visual centerpiece: moist gourmet cupcakes frosted with delicate buttercream floral rosettes.",
      "pasterieBucheNoel": "Holiday Yule Log",
      "pasterieBucheNoelDesc": "Festive rolled sponge cake filled with luscious silky ganache or fruity cream.",
      "pasterieMignardises": "Assorted Mignardises Platter",
      "pasterieMignardisesDesc": "Bite-sized sweet French pastries curated for tea times, buffet dessert tables, and receptions.",
      "pasterieBeignets": "Golden Sweet Beignets",
      "pasterieBeignetsDesc": "Traditional fluffy golden African beignets with just the right touch of fragrant sweetness.",

      // Savory Cocktail Section
      "savorySectionTag": "Catering & Finger Food",
      "savorySectionTitle": "Savory Bites & Cocktail Catering",
      "savorySectionDesc": "Elevate your cocktails, corporate parties, and events with our homemade savory finger food platters.",
      "savoryCocktailMix": "Assorted Cocktail Platter",
      "savoryCocktailMixDesc": "Generous catering platter featuring gourmet mini burgers, finger sandwiches, soft filled batbouts, and golden quiches.",
      "savoryBrochettesPlantain": "Plantain & Meatball Skewers",
      "savoryBrochettesPlantainDesc": "An authentic crowd favorite: savory spiced meatball skewers paired with sweet golden fried plantains.",
      "savoryNems": "Crispy Homemade Spring Rolls (Nems)",
      "savoryNemsDesc": "Golden crunchy wrappers loaded with savory seasoned filling and house dipping sauce.",
      "savorySamousa": "Golden Spiced Samosas",
      "savorySamousaDesc": "Delicate crisp triangular pastries filled with aromatic savory minced filling.",
      "savoryViennoiseriesSales": "Sausage Rolls, Croissants & Mini Tacos",
      "savoryViennoiseriesSalesDesc": "Flaky puff pastry bites, savory sausage rolls, ham & cheese mini croissants, and party tacos.",
      "savoryPouletPane": "Crispy Fried Chicken Bites",
      "savoryPouletPaneDesc": "Tender marinated chicken tenders fried to golden, crunchy perfection.",
      "savoryPizza": "Mini Party Pizzas",
      "savoryPizzaDesc": "Bite-sized cocktail pizzas topped with savory tomato sauce and melted cheese.",

      // Badges
      "badgePopular": "Most Loved",
      "badgeSeasonal": "Seasonal",
      "badgeEvent": "Buffet Favorite",
      "badgeTradition": "Traditional",
      "badgeBestseller": "Catering Best-Seller",
      "badgeSignature": "Signature Skewer",
      "badgeCrispy": "Extra Crispy",

      // Custom Order Section
      "Create Your Dream": "Your Bespoke Vision",
      "Custom Cake Orders": "Custom Cake Inquiry & Quote",
      "Custom Cake Desc": "Have an inspiration photo, a special theme, or a major milestone (wedding, dowry, jubilee)? Let us bake your dream into reality!",
      "Your Name": "Full Name",
      "Occasion (e.g., Wedding)": "Occasion (e.g., Birthday, Wedding, Corporate Cocktail)",
      "Event Date": "Event Date",
      "Guest Count": "Guest Count / Portions",
      "Budget Estimate": "Estimated Budget (FCFA)",
      "Flavor / Theme": "Desired Flavor or Theme (Vanilla, Chocolate, Fruit...)",
      "Get a Quote": "Send Request on WhatsApp",

      // Story & Reviews
      "Our Story": "Our Craftsmanship",
      "Baking Memories Since 2020": "Baking Memories for Every Celebration",
      "Story Desc 1": "Sweetmeats was born out of a genuine passion for the artistry of baking and heartfelt celebrations. Every cake tells a unique story.",
      "Story Desc 2": "From budget-conscious festive birthday cakes to majestic tiered centerpieces and savory cocktail catering, each order is crafted with uncompromising care.",
      "Sweet Words from You": "Customer Words",
      "Review 1 Text": "\"The birthday cake we ordered for my daughter was stunning and so moist! All our guests kept asking for the contact. Kudos Sweetmeats!\"",
      "Birthday Order": "Birthday Cake Order",
      "Review 2 Text": "\"The savory cocktail platter with mini burgers and plantain skewers was the highlight of our gathering. So fresh and tasty!\"",
      "Custom Order": "Catering Cocktail Platter",
      "Review 3 Text": "\"Super smooth WhatsApp ordering, delivered exactly on time looking just like the photo. You've earned a lifelong customer!\"",
      "Regular Customer": "Loyal Customer",

      // Footer
      "Footer Description": "Artisanal cake boutique & savory event catering. Handcrafted pastries made with authentic passion and care.",
      "Contact via WhatsApp": "Direct WhatsApp Line",
      "Quick Links": "Quick Links",
      "Contact Info": "Contact & Orders",
      "Mon - Sun": "Mon - Sun: 8:00 AM - 8:30 PM",
      "Location": "Douala / Yaounde, Cameroon",
      "All rights reserved": "© 2026 Sweetmeats. All rights reserved.",
      "Language": "Français"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // French default as requested for Cameroon
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
