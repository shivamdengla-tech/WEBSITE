/**
 * Teardown library data.
 * All theses, stats, beats and takeaways are taken from the decks
 * themselves (text extracted from the PDFs in public/decks/) — nothing
 * here is invented. The library is an ongoing practice; never present
 * it as a fixed count.
 */

export type DeckCategory =
  | "Brand & market teardown"
  | "Product investigation"
  | "Industry deep dive";

export interface DeckBeat {
  heading: string;
  body: string;
}

export interface Deck {
  slug: string;
  num: string;
  title: string;
  /** The deck's own cover subtitle. */
  subtitle: string;
  category: DeckCategory;
  /** Extra cover label, e.g. "Casebook № 01 · Consumer brands, India". */
  edition?: string;
  year?: string;
  pages: number;
  /** Rounded PDF size, for honest download labelling. */
  sizeLabel: string;
  /** CSS accent token (design-system/tokens.css). */
  accent: string;
  stat: { value: string; caption: string };
  thesis: string;
  beats: DeckBeat[];
  takeaway?: string;
  file: string;
  cover: string;
  coverAlt: string;
  featured?: boolean;
}

export const decks: Deck[] = [
  {
    slug: "mokobara",
    num: "01",
    title: "Mokobara",
    subtitle:
      "How a ₹700 crore brand was built on the luggage nobody wanted to carry.",
    category: "Brand & market teardown",
    edition: "Casebook № 01 · Consumer brands, India",
    year: "2026",
    pages: 17,
    sizeLabel: "PDF · 19 MB",
    accent: "var(--color-deck-mokobara)",
    stat: {
      value: "₹12 Cr → ₹230 Cr",
      caption:
        "Revenue, FY22 to FY25 — the four-year climb behind a ₹700 crore valuation.",
    },
    thesis:
      "In 2018 the Indian luggage market was ₹20,000 crore, three brands and zero personality: cheap bags that break in a year, or luxury bags that cost more than the flight. The ₹8–12K tier was empty until Mokobara filled it — for the buyer who wears Onitsuka Tiger and refuses to be seen with a mall trolley.",
    beats: [
      {
        heading: "No MVP — only the product they'd buy themselves",
        body: "German Makrolon shell reinforced from the inside, silent Hinomoto wheels chosen after visiting 25 factories in China, YKK zippers — and the signature yellow lining every early user said would get dirty. They ignored the feedback. It became the icon.",
      },
      {
        heading: "Same story, same bag, again and again",
        body: "No A/B testing. One bag per campaign, one colour, repeated until you see it in real life and think “I know that bag.” Half of all commissioned influencer content never goes live — wrong vibe, killed. A fashion brand's discipline applied to luggage.",
      },
      {
        heading: "Three collabs that each changed the category",
        body: "IndiGo: buy the bag, get 2 kg of extra baggage allowance on every flight — India's largest airline solving the №1 traveller pain point. Blinkit: only backpacks, never luggage, as top-of-funnel for the ₹10K suitcase later. Diljit: the bags went on world tour.",
      },
      {
        heading: "Inside a ₹9,000 sale",
        body: "Manufacturing ₹3,000, duties and logistics ₹1,350, a 52 % gross margin — then ₹1,800 of blended marketing per order. At 20 % of revenue on ads they're spending like a brand in land-grab mode; mature brands run 8–12 %. The gap is the investment.",
      },
    ],
    takeaway:
      "“If you're wearing Onitsuka Tiger, you cannot be seen traveling with a Safari luggage.” The founding instinct, in one sentence.",
    file: "/decks/MOKOBARA%20CASE%20STUDY.pdf",
    cover: "/decks/covers/mokobara-case-study.png",
    coverAlt:
      "Mokobara casebook cover: yellow and olive suitcases on an amber background",
    featured: true,
  },
  {
    slug: "birkenstock",
    num: "02",
    title: "Birkenstock",
    subtitle:
      "How an orthopedic sandal from 1774 became the status symbol India never knew it was waiting for.",
    category: "Brand & market teardown",
    edition: "Brand teardown · India",
    pages: 20,
    sizeLabel: "PDF · 19 MB",
    accent: "var(--color-deck-birkenstock)",
    stat: {
      value: "59.3%",
      caption:
        "Gross margin — no markdowns, no promotions, no exceptions. Hermès economics on a sandal.",
    },
    thesis:
      "A German sandal sells for ₹8,490 in a country that mostly buys footwear under ₹1,000 — no launch blitz, no Bollywood face, no festival markdown — and it is working: ₹227 crore of India revenue in FY25 with 28 employees. This is not a sandal company. It is a footbed company.",
    beats: [
      {
        heading: "The footbed is the patent",
        body: "Suede, jute, then the heart: cork and latex that molds to your arch with body heat. It is the one thing no collaborator — not even Dior — is allowed to change. The shoe builds around the foot; everything else is secondary.",
      },
      {
        heading: "Five price tiers, five buyers",
        body: "₹4,990 EVA for the student and the monsoon, ₹8,490 Birko-Flor as the volume hero, ₹12,990 nubuck for the researcher, ₹14,490 suede as the fashion object, ₹19,992 for the 1774 halo few will buy — but everyone below is recruited by it.",
      },
      {
        heading: "Worn into relevance, never marketed",
        body: "American hippies adopted it in the 1960s, Kate Moss wore them in 1993, the Barbie movie caused a Gen Z demand spike in 2023. By late 2025 more than half of sales came from Gen Z and Millennials, who read the refusal of disposable fashion as a value.",
      },
      {
        heading: "The India entry: control before scale",
        body: "No franchise, no distributor. Website first in 2019, first store at IGI Airport, a Linking Road flagship by 2024, 50+ stores by 2025 — a wholly-owned subsidiary running ₹8 crore of revenue per employee.",
      },
    ],
    takeaway: "The anti-disposable position is not marketing. It is engineering.",
    file: "/decks/Birkenstock%20Teardown.pdf",
    cover: "/decks/covers/birkenstock-teardown.png",
    coverAlt: "Birkenstock teardown cover",
    featured: true,
  },
  {
    slug: "the-new-scoop",
    num: "03",
    title: "The New Scoop",
    subtitle:
      "How a generation of founders rebuilt Indian ice cream from the inside out, by taking the guilt out of it.",
    category: "Brand & market teardown",
    edition: "Casebook № 02 · Consumer brands, India",
    year: "2026",
    pages: 18,
    sizeLabel: "PDF · 17 MB",
    accent: "var(--color-deck-scoop)",
    stat: {
      value: "400 → 1,600 ml",
      caption:
        "India's per-capita ice cream consumption, 2011 to 2023. The United States eats 22,000 ml.",
    },
    thesis:
      "The world's largest milk producer, with the longest hottest summers on earth and a 5,000-year dairy culture, ate less ice cream per person than almost anywhere. It was never about taste — it was about electricity. Solve the cold chain, and a 1.4-billion-person dessert market unlocks.",
    beats: [
      {
        heading: "What changed: three shifts at once",
        body: "Power surplus by 2022 meant tier-2 kiranas could keep freezers on overnight for the first time. Quick commerce removed the home-freezer problem — ice cream became a 10-minute impulse. And 540 heatwave days in 2024 extended the season itself.",
      },
      {
        heading: "Every new brand is solving the same three seconds",
        body: "You finish an ice cream and the guilt arrives with the pleasure. The new wave isn't built on “make ice cream better” but on “make ice cream not feel bad.” The brands that win don't sell less sugar — they sell permission.",
      },
      {
        heading: "Every price point is a different business",
        body: "₹5–40 is a distribution war (Amul, Kwality Walls). ₹40–100 is brand and storytelling (Hocco, NIC). ₹100–150 is the guilt solve on quick commerce (Go Zero, NOTO). A ₹10 bar and a ₹300 gelato are different businesses, not one product at different prices.",
      },
      {
        heading: "The quick-commerce playbook, proven",
        body: "Go Zero: don't build a plant, list on Blinkit before anyone else, wait three years for distribution before going on Shark Tank, and put 70–80 % of budget on search. ₹100 crore ARR with 70–80 % of it from quick commerce.",
      },
    ],
    takeaway:
      "The cold chain was the entire bottleneck. Everything after it is brand.",
    file: "/decks/ICECREAM%201.pdf",
    cover: "/decks/covers/icecream.png",
    coverAlt: "The New Scoop casebook cover on Indian ice cream",
    featured: true,
  },
  {
    slug: "maka-di",
    num: "04",
    title: "Maka Di",
    subtitle:
      "How a Goan craft brewery built a beer company in the one market the government runs.",
    category: "Brand & market teardown",
    edition: "Consumer brand casebook · Goa, est. 2017",
    year: "2026",
    pages: 18,
    sizeLabel: "PDF · 13 MB",
    accent: "var(--color-deck-makadi)",
    stat: {
      value: "3 L vs 70 L",
      caption:
        "Beer per person per year, India vs the Czech Republic. The lowest consumption on earth is not a ceiling — it is the runway.",
    },
    thesis:
      "India barely drinks beer, taxes it harder than spirits, and lets state governments run the market — and that is exactly the opportunity. Latambarcem spent three years building the plant and the R&D before a single bottle sold in 2020. The moat was poured in concrete before it was poured in glass.",
    beats: [
      {
        heading: "Beer is four ingredients and one fragile step",
        body: "Malt, hops, yeast, water — and a packaging problem, because beer is exquisitely sensitive to oxygen: under 30 parts per billion in the bottle. Easy to make, brutally hard to keep.",
      },
      {
        heading: "Eight beers map one ladder",
        body: "A ₹79 Goan rice lager drives volume, a ₹99 shandy is the gateway, the ₹110 Belgian Blanche is the best-seller, and a ₹160 Belgian Tripel carries the medals. Every SKU buys credibility for the next one up.",
      },
      {
        heading: "Super Maka: the 15 % loophole",
        body: "Indian law caps beer at 8 % ABV — go above and you're legally wine, taxed on a friendlier ladder (₹40/L vs ₹60/L in Goa). One bottle delivers what four mass lagers do, at roughly 30 % EBITDA while mass lager sells at a loss.",
      },
      {
        heading: "Goa is a manufacturing advantage, not a vibe",
        body: "The cheapest brewing license in India (~₹25 lakh vs ₹17 lakh per label economics elsewhere), low-TDS groundwater for a product that is 90 % water, 12 hours to Bombay port, one plant equidistant from Bangalore, Bombay and Hyderabad.",
      },
    ],
    takeaway: "The moat was poured in concrete before it was poured in glass.",
    file: "/decks/Maka%20Di%20Case%20Study.pdf",
    cover: "/decks/covers/maka-di-case-study.png",
    coverAlt: "Maka Di consumer brand casebook cover",
  },
  {
    slug: "the-bottle-is-the-product",
    num: "05",
    title: "The Bottle Is the Product",
    subtitle:
      "What you are actually paying for when you buy perfume in India — from the molecule to the marketing to the ₹200 attar that outlasts the ₹20,000 bottle it inspired.",
    category: "Industry deep dive",
    edition: "An investigation",
    pages: 18,
    sizeLabel: "PDF · 7 MB",
    accent: "var(--color-deck-bottle-product)",
    stat: {
      value: "4.7%",
      caption:
        "Of a ₹15,000 designer bottle is the fragrance liquid itself — about ₹700. Marketing costs five times more.",
    },
    thesis:
      "You sprayed ₹15,000 of Sauvage at 9am and couldn't smell it by 1pm — and blamed yourself. You shouldn't: the perfume was designed for Paris at 22°C, not Mumbai at 40°C and 85 % humidity. Follow the money and the molecules, and luxury perfume stops being mysterious.",
    beats: [
      {
        heading: "Four companies make the molecules. None of them are Dior.",
        body: "Givaudan, IFF, Symrise and DSM-Firmenich supply 55 %+ of all fragrance raw material on earth. They sell to Dior, to Bella Vita, and to the man filling bottles in Kannauj. The same supply chain, three very different price tags.",
      },
      {
        heading: "Where ₹15,000 actually goes",
        body: "Liquid ₹700. Bottle ₹1,400. Import duty ₹3,500. Marketing and celebrity ₹3,500. Retailer margin ₹3,600. The thing you smell is under five percent of the thing you paid.",
      },
      {
        heading: "Same bottle, two climates, two perfumes",
        body: "In Paris the base note lasts eight hours; in a Mumbai summer alcohol evaporates 30 % faster and the base is gone by lunch. Heat, humidity, sweat pH and pollution compound — the format itself is climate-mismatched.",
      },
      {
        heading: "The city that was forgotten",
        body: "Kannauj documented attar production in the 9th century; Grasse emerged 300 years later. Today European houses buy Kannauj rose absolute as raw material — India exports the ingredient, France builds the story, and the ingredient comes home in a ₹20,000 bottle.",
      },
    ],
    takeaway:
      "India exports the ingredient. France builds the story. The ingredient comes home in a ₹20,000 bottle.",
    file: "/decks/The%20Bottle%20Is%20the%20Product.pdf",
    cover: "/decks/covers/the-bottle-is-the-product.png",
    coverAlt: "The Bottle Is the Product cover, pink perfume investigation",
  },
  {
    slug: "beyond-the-sachet",
    num: "06",
    title: "Beyond the Sachet",
    subtitle: "Rethinking how flavor reaches instant noodles.",
    category: "Product investigation",
    edition: "Product innovation case study",
    pages: 11,
    sizeLabel: "PDF · 0.2 MB",
    accent: "var(--color-deck-sachet)",
    stat: {
      value: "123B",
      caption:
        "Servings of instant noodles a year, each shipping 2–3 plastic sachets used for three seconds.",
    },
    thesis:
      "The seasoning sachet exists for the manufacturer, not the consumer: it isolates seasoning from moisture and enables flavor SKUs on one line, while handing the eater spills, waste and plastic guilt. So — does it have to exist at all?",
    beats: [
      {
        heading: "Six ways to kill the sachet",
        body: "A compressed tablet, a seasoning ring around the noodle cake, an edible film that becomes part of the soup, spray-coating the block itself, microencapsulated flavor beads, and seasoning baked into the dough. Scored on taste, cost, scale, sustainability and adoption.",
      },
      {
        heading: "Research changed the priors",
        body: "Tablets collide with Unilever's bouillon IP and can't hold the oil sachet. Edible films use more energy than powder fill — sustainability isn't automatic. And the real moat is manufacturing inertia: sachet lines run at 300–600 kg/hr, and any new format must match that.",
      },
      {
        heading: "Start with the coating",
        body: "Drum-coating already runs in snack manufacturing worldwide: $150–400K capex versus $500K–3M for the alternatives, zero behavior change for the consumer, no patent conflict. Best first mover: ITC Yippee — single masala sachet, sustainability mandate.",
      },
      {
        heading: "A three-phase pilot to de-risk fast",
        body: "Blind taste parity against the sachet baseline, then accelerated shelf-life at 40°C and 90 % humidity with FSSAI pre-engagement, then a two-city 'zero sachet' launch judged on NPS and a 70 % repurchase bar.",
      },
    ],
    takeaway: "The sachet was never a product feature. It was a workaround.",
    file: "/decks/Beyond_The_Sachet.pdf",
    cover: "/decks/covers/beyond-the-sachet.png",
    coverAlt: "Beyond the Sachet cover: instant noodle flavor innovation study",
  },
  {
    slug: "reimagining-the-potato-chip",
    num: "07",
    title: "Reimagining the Potato Chip",
    subtitle:
      "If Lay's was invented in 2026, with no legacy factory and no legacy assumptions, would we still package it this way?",
    category: "Product investigation",
    edition: "Product innovation case study",
    pages: 10,
    sizeLabel: "PDF · 0.2 MB",
    accent: "var(--color-deck-chip)",
    stat: {
      value: "~60% air",
      caption:
        "Of every chip bag ships and stores nitrogen, not chips — a brilliant 1965 answer nobody has re-asked since.",
    },
    thesis:
      "An egg — the most fragile food we ship — travels with zero protective gas. A potato chip still needs a balloon. The bag isn't badly designed; it has just never been redesigned, because the chip industry only ever benchmarks chips.",
    beats: [
      {
        heading: "Five ideas borrowed from other aisles",
        body: "The egg-carton principle (structure, not gas), the steak aisle's vacuum-skin second skin, oxygen-scavenging chemistry from coffee and pharma, a refillable home vessel, and an edible inner layer from seaweed film and onigiri.",
      },
      {
        heading: "What the research overturned",
        body: "Vacuum-skin doubles shelf life versus gas-flush and cuts freight ~12 %. And SunChips already shipped a perfect compostable bag — then killed it because the crinkle hit 95 dB. The real blocker is sensory and social, not technical.",
      },
      {
        heading: "Start with the egg carton",
        body: "A uniform, real-tasting chip nested in a recyclable molded-fibre cradle, with an oxygen-scavenging film behind it. Near cost-parity with foam, no new consumer habit, and a story — “the egg carton for chips” — that is ownable. First mover: a premium DTC challenger, because the big bag is exactly what a market leader can't abandon.",
      },
    ],
    takeaway: "The bag was never the best answer. It was just the oldest one.",
    file: "/decks/Reimagining_The_Potato_Chip_PM_Handbook.pdf",
    cover: "/decks/covers/reimagining-the-potato-chip.png",
    coverAlt: "Reimagining the Potato Chip cover",
  },
  {
    slug: "the-plastic-wait",
    num: "08",
    title: "The Plastic Wait",
    subtitle: "Sustainable packaging is technically solved. Nobody moves first.",
    category: "Product investigation",
    edition: "Sustainable packaging · PM investigation",
    pages: 13,
    sizeLabel: "PDF · 0.2 MB",
    accent: "var(--color-deck-plastic)",
    stat: {
      value: "22,000 t",
      caption:
        "Of plastic waste per month from food delivery alone, in India — while the compostable alternative already exists.",
    },
    thesis:
      "Plastic stays because it solves real problems: unmatched barrier performance, 20–50 % cheaper than any certified alternative, sunk machinery, and a ₹85,000 crore sachet economy. The question isn't whether alternatives exist. It's what would force the first mover to move.",
    beats: [
      {
        heading: "The problems it creates are worse",
        body: "57 % of sachets are multilayer laminate — unrecyclable by any process on earth. India recycles just 8 % of its plastic. The 2022 ban produced 85 % fewer complaints, not less pollution.",
      },
      {
        heading: "Six ways to break the coordination lock",
        body: "Drop-in bagasse, mono-material films, a platform mandate, EPR with teeth, refill and reuse, compostable films — scored on impact, cost, scale and adoption. Two clear winners.",
      },
      {
        heading: "The recommendation: platform mandate + EPR with teeth",
        body: "Zomato or Swiggy mandate eco-packaging as a listing requirement: ₹3–7 per order, zero consumer behavior change, enforceable through algorithmic listing control, and possible in six months with no new technology. The platforms control discovery — that is the market power the transition is waiting for.",
      },
    ],
    takeaway:
      "The technology exists. The missing ingredient is a player with the market power to make the switch non-optional.",
    file: "/decks/The%20Plastic%20Wait%20-%20Shivam%20Dengla.pdf",
    cover: "/decks/covers/the-plastic-wait.png",
    coverAlt: "The Plastic Wait cover: sustainable packaging investigation",
  },
  {
    slug: "the-bottle-that-sells-the-scent",
    num: "09",
    title: "The Bottle That Sells the Scent",
    subtitle:
      "A deep dive into the global perfume bottling industry, where the container rivals the contents.",
    category: "Industry deep dive",
    edition: "Perfume industry · Deep dive",
    pages: 17,
    sizeLabel: "PDF · 13 MB",
    accent: "var(--color-deck-bottle-scent)",
    stat: {
      value: "$6.5B",
      caption:
        "The bottle segment alone, inside a $21.8B global B2B fragrance market. The container rivals the contents.",
    },
    thesis:
      "Glass wins on chemistry (inert), psychology (weight equals perceived luxury) and economics (infinitely recyclable) — which is why 99 % of premium fragrances still choose it even as brands cut glass weight 22 % for emissions. The bottle is a product with its own industry, and its own reasons to never change.",
    beats: [
      {
        heading: "The mold trap",
        body: "A custom mold costs $2K–50K and locks in a 20,000-unit minimum order the moment it's cut. A stock bottle runs $0.50–2.50; a luxury custom bottle $15–50 with closures and box, retailing at 3–7× total manufacturing cost. The mold is the biggest capital decision a fragrance brand makes.",
      },
      {
        heading: "When the bottle is the brand",
        body: "Paco Rabanne's 1 Million gold bar, Viktor & Rolf's Spicebomb grenade, Gaultier's torso in a tin can, the Invictus trophy — bottles that carry the entire brand argument before a single spray.",
      },
      {
        heading: "Why no innovation",
        body: "Iconic silhouettes are brand equity; mold economics punish risk; the 1887 atomiser and FEA/SNI neck standards constrain every design; supply chains are locked to Pochet, Verescence and Bormioli for decades. The conservatism is rational.",
      },
    ],
    takeaway:
      "The atomiser was invented in 1887. It is still the same. That fact explains most of this industry.",
    file: "/decks/The%20Bottle%20That%20Sells%20the%20Scent.pdf",
    cover: "/decks/covers/the-bottle-that-sells-the-scent.png",
    coverAlt: "The Bottle That Sells the Scent cover",
  },
  {
    slug: "vapes",
    num: "10",
    title: "Vapes: a beginner's complete reference",
    subtitle:
      "From Hon Lik's 2003 invention to a $33 billion industry that ninety percent of the world builds in one Chinese city.",
    category: "Industry deep dive",
    edition: "Vapes decoded · June 2026",
    year: "2026",
    pages: 17,
    sizeLabel: "PDF · 12 MB",
    accent: "var(--color-deck-vapes)",
    stat: {
      value: "$33B",
      caption:
        "The industry that ninety percent of the world builds in one Chinese city.",
    },
    thesis:
      "A complete beginner's reference to how the vape industry actually works — from its 2003 invention to the manufacturing city the entire world depends on.",
    beats: [],
    file: "/decks/BEGINNERS%20DECK%20TO%20VAPE.pdf",
    cover: "/decks/covers/beginners-deck-to-vape.png",
    coverAlt: "Vapes: a beginner's complete reference — deck cover",
  },
];

export const categories: DeckCategory[] = [
  "Brand & market teardown",
  "Product investigation",
  "Industry deep dive",
];

export const featuredDecks = decks.filter((d) => d.featured);

export function deckBySlug(slug: string): Deck | undefined {
  return decks.find((d) => d.slug === slug);
}

/** Optimized cover derivatives (scripts/optimize-covers.mjs). */
export function coverSrc(deck: Deck, width: 640 | 1280): string {
  const base = deck.cover.replace("/covers/", "/covers/opt/").replace(/\.png$/, "");
  return `${base}-${width}.webp`;
}
