export interface Deck {
  num: string;
  title: string;
  file: string;
  cover: string;
}

// Ordered newest first: the latest deck (Mokobara) leads, then the fragrance
// teardowns, then the rest.
export const decks: Deck[] = [
  {
    num: "01",
    title: "Mokobara Case Study",
    file: "/decks/MOKOBARA%20CASE%20STUDY.pdf",
    cover: "/decks/covers/mokobara-case-study.png",
  },
  {
    num: "02",
    title: "The Bottle That Sells the Scent",
    file: "/decks/The%20Bottle%20That%20Sells%20the%20Scent.pdf",
    cover: "/decks/covers/the-bottle-that-sells-the-scent.png",
  },
  {
    num: "03",
    title: "The Bottle Is the Product",
    file: "/decks/The%20Bottle%20Is%20the%20Product.pdf",
    cover: "/decks/covers/the-bottle-is-the-product.png",
  },
  {
    num: "04",
    title: "The Plastic Wait",
    file: "/decks/The%20Plastic%20Wait%20-%20Shivam%20Dengla.pdf",
    cover: "/decks/covers/the-plastic-wait.png",
  },
  {
    num: "05",
    title: "Reimagining the Potato Chip",
    file: "/decks/Reimagining_The_Potato_Chip_PM_Handbook.pdf",
    cover: "/decks/covers/reimagining-the-potato-chip.png",
  },
  {
    num: "06",
    title: "Beyond the Sachet",
    file: "/decks/Beyond_The_Sachet.pdf",
    cover: "/decks/covers/beyond-the-sachet.png",
  },
  {
    num: "07",
    title: "Beginners Deck to Vape",
    file: "/decks/BEGINNERS%20DECK%20TO%20VAPE.pdf",
    cover: "/decks/covers/beginners-deck-to-vape.png",
  },
];
