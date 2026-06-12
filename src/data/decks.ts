export type DeckCategory = "vape" | "fragrance" | "fmcg" | "other";

export interface Deck {
  num: string;
  title: string;
  file: string;
  cover: string;
  category: DeckCategory;
  /** Higher = more recently added. New decks should get the next number up. */
  addedAt: number;
}

// Raw catalog. To add a deck, append it here with the next `addedAt` value
// (one higher than the current max) and its category — the sort below handles
// placement automatically. `num` is assigned by display position, so leave it off.
type DeckSource = Omit<Deck, "num">;

const catalog: DeckSource[] = [
  {
    title: "Beginners Deck to Vape",
    file: "/decks/BEGINNERS%20DECK%20TO%20VAPE.pdf",
    cover: "/decks/covers/beginners-deck-to-vape.png",
    category: "vape",
    addedAt: 1,
  },
  {
    title: "Beyond the Sachet",
    file: "/decks/Beyond_The_Sachet.pdf",
    cover: "/decks/covers/beyond-the-sachet.png",
    category: "fmcg",
    addedAt: 2,
  },
  {
    title: "Reimagining the Potato Chip",
    file: "/decks/Reimagining_The_Potato_Chip_PM_Handbook.pdf",
    cover: "/decks/covers/reimagining-the-potato-chip.png",
    category: "fmcg",
    addedAt: 3,
  },
  {
    title: "The Bottle Is the Product",
    file: "/decks/The%20Bottle%20Is%20the%20Product.pdf",
    cover: "/decks/covers/the-bottle-is-the-product.png",
    category: "fragrance",
    addedAt: 4,
  },
  {
    title: "The Bottle That Sells the Scent",
    file: "/decks/The%20Bottle%20That%20Sells%20the%20Scent.pdf",
    cover: "/decks/covers/the-bottle-that-sells-the-scent.png",
    category: "fragrance",
    addedAt: 5,
  },
  {
    title: "The Plastic Wait",
    file: "/decks/The%20Plastic%20Wait%20-%20Shivam%20Dengla.pdf",
    cover: "/decks/covers/the-plastic-wait.png",
    category: "other",
    addedAt: 6,
  },
  {
    title: "Mokobara Case Study",
    file: "/decks/MOKOBARA%20CASE%20STUDY.pdf",
    cover: "/decks/covers/mokobara-case-study.png",
    category: "other",
    addedAt: 7,
  },
];

// Lower index = shown higher on the page.
const CATEGORY_ORDER: DeckCategory[] = ["vape", "fragrance", "fmcg", "other"];

/**
 * Ordering rules:
 *   1. The most recently added deck is pinned to the very top, so every new
 *      upload lands above everything else.
 *   2. The rest are grouped by category — vapes, then fragrances, then FMCG,
 *      then anything else. Within a group the newer deck wins.
 */
export function sortDecks(list: DeckSource[]): DeckSource[] {
  if (list.length === 0) return [];
  const byRecency = [...list].sort((a, b) => b.addedAt - a.addedAt);
  const [newest, ...rest] = byRecency;
  rest.sort((a, b) => {
    const byCategory =
      CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category);
    return byCategory !== 0 ? byCategory : b.addedAt - a.addedAt;
  });
  return [newest, ...rest];
}

export const decks: Deck[] = sortDecks(catalog).map((deck, i) => ({
  ...deck,
  num: String(i + 1).padStart(2, "0"),
}));
