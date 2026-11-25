const fs = require('fs');
const path = require('path');

const tiers = [
  { id: '10k', price: 10000, priceFormatted: '10 000 FCFA', titleKey: 'tier10kTitle', descKey: 'tier10kDesc' },
  { id: '12k', price: 12000, priceFormatted: '12 000 FCFA', titleKey: 'tier12kTitle', descKey: 'tier12kDesc' },
  { id: '15k', price: 15000, priceFormatted: '15 000 FCFA', titleKey: 'tier15kTitle', descKey: 'tier15kDesc' },
  { id: '20k', price: 20000, priceFormatted: '20 000 FCFA', titleKey: 'tier20kTitle', descKey: 'tier20kDesc' },
  { id: '25k', price: 25000, priceFormatted: '25 000 FCFA+', titleKey: 'tier25kTitle', descKey: 'tier25kDesc' }
];

const cakeTiers = tiers.map(tier => {
  const dir = path.join('public', 'cakes', tier.id);
  const files = fs.readdirSync(dir)
    .filter(f => /\.(jpe?g|png|webp)$/i.test(f))
    .map(f => `/cakes/${tier.id}/${encodeURIComponent(f)}`);
  return {
    ...tier,
    totalImages: files.length,
    images: files
  };
});

if (!fs.existsSync('src/data')) {
  fs.mkdirSync('src/data', { recursive: true });
}

const content = `export interface CakeTier {
  id: string;
  price: number;
  priceFormatted: string;
  titleKey: string;
  descKey: string;
  totalImages: number;
  images: string[];
}

export interface ProductItem {
  id: string;
  titleKey: string;
  descKey: string;
  categoryKey: string;
  image: string;
  priceFormatted?: string;
  badgeKey?: string;
}

export const CAKE_TIERS: CakeTier[] = ${JSON.stringify(cakeTiers, null, 2)};

export const SWEET_PASTRIES: ProductItem[] = [
  {
    id: 'cupcakes-bouquet',
    titleKey: 'pasterieCupcakesBouquet',
    descKey: 'pasterieCupcakesBouquetDesc',
    categoryKey: 'catSweetPastry',
    image: '/Bouquet de cupcake.jpeg',
    badgeKey: 'badgePopular',
    priceFormatted: 'Sur devis / Pack'
  },
  {
    id: 'buche-noel',
    titleKey: 'pasterieBucheNoel',
    descKey: 'pasterieBucheNoelDesc',
    categoryKey: 'catSweetPastry',
    image: '/bûche de Noël.jpeg',
    badgeKey: 'badgeSeasonal',
    priceFormatted: 'Sur commande'
  },
  {
    id: 'mignardises',
    titleKey: 'pasterieMignardises',
    descKey: 'pasterieMignardisesDesc',
    categoryKey: 'catSweetPastry',
    image: '/Mignardises.jpeg',
    badgeKey: 'badgeEvent',
    priceFormatted: 'Plateaux assortis'
  },
  {
    id: 'beignets-sucres',
    titleKey: 'pasterieBeignets',
    descKey: 'pasterieBeignetsDesc',
    categoryKey: 'catSweetPastry',
    image: '/Beignets sucre.jpeg',
    badgeKey: 'badgeTradition',
    priceFormatted: 'Au panier / pack'
  }
];

export const SAVORY_CATERING: ProductItem[] = [
  {
    id: 'plateau-cocktail-mix',
    titleKey: 'savoryCocktailMix',
    descKey: 'savoryCocktailMixDesc',
    categoryKey: 'catSavoryCocktail',
    image: '/Mini Burger, Sandwich, Babouts, quiche.jpeg',
    badgeKey: 'badgeBestseller',
    priceFormatted: 'Plateau apéro traiteur'
  },
  {
    id: 'brochettes-plantain',
    titleKey: 'savoryBrochettesPlantain',
    descKey: 'savoryBrochettesPlantainDesc',
    categoryKey: 'catSavoryCocktail',
    image: '/Brochettes de boulettes de viande-Plantain.jpeg',
    badgeKey: 'badgeSignature',
    priceFormatted: 'Par lot / cocktail'
  },
  {
    id: 'nems-maison',
    titleKey: 'savoryNems',
    descKey: 'savoryNemsDesc',
    categoryKey: 'catSavoryCocktail',
    image: '/Nems.jpeg',
    badgeKey: 'badgeCrispy',
    priceFormatted: 'Croustillants & dorés'
  },
  {
    id: 'samousas-dorés',
    titleKey: 'savorySamousa',
    descKey: 'savorySamousaDesc',
    categoryKey: 'catSavoryCocktail',
    image: '/Samousa.jpeg',
    priceFormatted: 'À la pièce ou plateau'
  },
  {
    id: 'roules-croissants-tacos',
    titleKey: 'savoryViennoiseriesSales',
    descKey: 'savoryViennoiseriesSalesDesc',
    categoryKey: 'catSavoryCocktail',
    image: '/Roule viande, Croissant jambon, Mini tacos.jpeg',
    priceFormatted: 'Plateau cocktail varié'
  },
  {
    id: 'poulet-pane-frit',
    titleKey: 'savoryPouletPane',
    descKey: 'savoryPouletPaneDesc',
    categoryKey: 'catSavoryCocktail',
    image: '/Poulet panes et frits.jpeg',
    priceFormatted: 'Portions apéritives'
  },
  {
    id: 'mini-pizzas',
    titleKey: 'savoryPizza',
    descKey: 'savoryPizzaDesc',
    categoryKey: 'catSavoryCocktail',
    image: '/Pizza.jpeg',
    priceFormatted: 'Format bouchées festives'
  }
];
`;

fs.writeFileSync('src/data/products.ts', content, 'utf8');
console.log('src/data/products.ts created successfully!');
