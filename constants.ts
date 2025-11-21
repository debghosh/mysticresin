
import { Product, Category, BlogPost, SiteConfig, ServiceItem } from './types';

export const INITIAL_CONFIG: SiteConfig = {
  name: "Shelly’s Resin Creations",
  theme: 'ocean',
  heroTitle: "Handcrafted Resin Art by Shelly",
  heroSubtitle: "Capturing the beauty of the ocean and earth in functional art.",
  aboutText: "I'm Shelly, an artist obsessed with the fluid nature of resin. Every piece is unique, handcrafted with eco-conscious materials, and designed to bring a touch of modern elegance to your home.",
  contactEmail: "hello@shellyresin.com",
  primaryColor: "#0ea5e9", // Sky 500
  secondaryColor: "#14b8a6", // Teal 500
};

export const THEMES = {
  ocean: { primary: "#0284c7", secondary: "#2dd4bf", accent: "#e0f2fe" }, // Sky/Teal
  marble: { primary: "#475569", secondary: "#94a3b8", accent: "#f8fafc" }, // Slate
  sunset: { primary: "#e11d48", secondary: "#f59e0b", accent: "#fff1f2" }, // Rose/Amber
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    title: "Deep Blue Ocean Geode Coaster",
    description: "A set of 4 agate-inspired resin coasters with gold edges.",
    price: 45,
    category: Category.Coasters,
    image: "https://picsum.photos/seed/resin1/600/600",
    isFeatured: true,
    isBestSeller: true,
    dimensions: "4x4 inches"
  },
  {
    id: '2',
    title: "Ethereal White & Gold Tray",
    description: "Perfect for jewelry or perfumes, featuring real dried flowers.",
    price: 65,
    category: Category.Trays,
    image: "https://picsum.photos/seed/resin2/600/600",
    isFeatured: true,
    isNew: true,
    dimensions: "8x12 inches"
  },
  {
    id: '3',
    title: "Midnight Seascape Wall Art",
    description: "Large format multi-layered resin pour on wood canvas.",
    price: 350,
    category: Category.WallArt,
    image: "https://picsum.photos/seed/resin3/800/600",
    isFeatured: false,
    dimensions: "24x36 inches"
  },
  {
    id: '4',
    title: "Emerald Green Clock",
    description: "Functional art piece with silent quartz movement.",
    price: 120,
    category: Category.Clocks,
    image: "https://picsum.photos/seed/resin4/600/600",
    isFeatured: false,
    dimensions: "12 inch diameter"
  },
  {
    id: '5',
    title: "Amethyst Geode Wall Hanging",
    description: "Features real amethyst clusters embedded in purple resin.",
    price: 200,
    category: Category.WallArt,
    image: "https://picsum.photos/seed/resin5/600/600",
    isFeatured: true,
    dimensions: "18x24 inches"
  },
  {
    id: '6',
    title: "Custom Bridal Bouquet Block",
    description: "Preserve your wedding flowers forever in crystal clear resin.",
    price: 250,
    category: Category.Custom,
    image: "https://picsum.photos/seed/resin6/600/600",
    isFeatured: false,
    dimensions: "6x6x2 inches"
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: "The Magic of Layering Resin",
    date: "2023-10-15",
    excerpt: "Learn how I create depth in my ocean pieces using multiple layers.",
    content: "Creating realistic ocean waves isn't a one-step process. It requires patience, precision, and multiple pours over several days...",
    image: "https://picsum.photos/seed/blog1/800/400",
    author: "Shelly"
  },
  {
    id: '2',
    title: "Caring for Your Resin Art",
    date: "2023-11-02",
    excerpt: "Simple tips to keep your coasters and trays looking shiny and new.",
    content: "Resin is durable, but it loves care. Avoid direct sunlight for prolonged periods and clean with a soft microfiber cloth...",
    image: "https://picsum.photos/seed/blog2/800/400",
    author: "Shelly"
  },
  {
    id: '3',
    title: "Behind the Scenes: Holiday Collection",
    date: "2023-12-01",
    excerpt: "A sneak peek into the snowy, glittery designs coming soon.",
    content: "This year I'm experimenting with iridescent whites and icy blues to capture the feeling of winter frost...",
    image: "https://picsum.photos/seed/blog3/800/400",
    author: "Shelly"
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: "Custom Commissions",
    description: "Have a specific color palette in mind? I work with you to create a piece that perfectly matches your interior design.",
    icon: "palette"
  },
  {
    id: '2',
    title: "Workshops",
    description: "Join me for a 3-hour intensive workshop where you'll learn safety, mixing, and pouring techniques to make your own coasters.",
    icon: "users"
  },
  {
    id: '3',
    title: "Flower Preservation",
    description: "Send me your special occasion flowers, and I will encapsulate them in high-quality resin for a timeless keepsake.",
    icon: "flower"
  }
];
