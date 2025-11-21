// data.ts - Configuration and initial data
// ⚠️ IMPORTANT: Change the adminAccessCode before going live!

import { Product, Category, BlogPost, SiteConfig, ServiceItem } from './types';

// ==============================================================================
// ADMIN CONFIGURATION
// ==============================================================================
// 🔐 CHANGE THIS ACCESS CODE before deploying to production
export const ADMIN_CONFIG = {
  accessCode: "RUBYSAK15!", // ⚠️ CHANGE THIS!
  sessionDuration: 3600000, // 1 hour in milliseconds
};

// ==============================================================================
// SITE CONFIGURATION
// ==============================================================================
export const INITIAL_CONFIG: SiteConfig = {
  name: "Shelly's Resin Creations",
  theme: 'ocean',
  heroTitle: "Handcrafted Resin Art by Shelly",
  heroSubtitle: "Capturing the beauty of the ocean and earth in functional art.",
  aboutText: "I'm Shelly, an artist obsessed with the fluid nature of resin. Every piece is unique, handcrafted with eco-conscious materials, and designed to bring a touch of modern elegance to your home.",
  contactEmail: "hello@shellysresin.com",
  primaryColor: "#0ea5e9", // Sky 500
  secondaryColor: "#14b8a6", // Teal 500
  adminAccessCode: ADMIN_CONFIG.accessCode,
};

// ==============================================================================
// THEME PRESETS
// ==============================================================================
export const THEMES = {
  ocean: { primary: "#0284c7", secondary: "#2dd4bf", accent: "#e0f2fe" }, // Sky/Teal
  marble: { primary: "#475569", secondary: "#94a3b8", accent: "#f8fafc" }, // Slate
  sunset: { primary: "#e11d48", secondary: "#f59e0b", accent: "#fff1f2" }, // Rose/Amber
};

// ==============================================================================
// INITIAL PRODUCTS (Sample Data)
// ==============================================================================
// Note: In production, real images should be stored in public/assets/artwork/products/
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    title: "Deep Blue Ocean Geode Coaster Set",
    shortDescription: "A set of 4 agate-inspired resin coasters with metallic gold edges.",
    description: "A set of 4 agate-inspired resin coasters with gold edges.", // Old field for compatibility
    longDescription: `Bring the beauty of the ocean to your coffee table with this stunning set of 4 handcrafted resin coasters. Each coaster features layers of deep blues, teals, and whites that mimic natural agate formations, finished with elegant gold foil edges.

    Perfect for protecting your furniture while adding a touch of coastal elegance to any room. Each piece in the set has unique patterns - no two are exactly alike!
    
    These coasters make wonderful gifts for housewarmings, weddings, or anyone who appreciates functional art.`,
    price: 45,
    category: Category.Coasters,
    images: [
      "https://picsum.photos/seed/resin1/600/600",
      "https://picsum.photos/seed/resin1b/600/600",
      "https://picsum.photos/seed/resin1c/600/600",
    ],
    mainImage: "https://picsum.photos/seed/resin1/600/600",
    image: "https://picsum.photos/seed/resin1/600/600", // Old field for compatibility
    isFeatured: true,
    isBestSeller: true,
    dimensions: "4 x 4 inches, 0.25 inch thick",
    materials: "Epoxy resin, mica powder, gold foil, cork backing",
    careInstructions: "Wipe clean with a soft, damp cloth. Avoid harsh chemicals and abrasive cleaners. Do not place in dishwasher or expose to extreme heat.",
    weight: "1.2 lbs (set of 4)",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: "Ethereal White & Gold Jewelry Tray",
    shortDescription: "Elegant serving tray with real dried flowers and gold accents.",
    longDescription: `Store your precious jewelry and accessories in style with this ethereal white and gold resin tray. Each tray features real dried flowers suspended in crystal-clear resin, creating a dreamy, romantic aesthetic.

    The combination of soft whites, champagne tones, and metallic gold creates a luxurious look that complements any vanity or dresser. The smooth resin surface is easy to clean and protects your jewelry from scratches.
    
    This piece doubles as a catch-all tray for keys, watches, and other small items. It's both functional and a beautiful decorative accent.`,
    price: 65,
    category: Category.Trays,
    images: [
      "https://picsum.photos/seed/resin2/600/600",
      "https://picsum.photos/seed/resin2/600/600",
    ],
    mainImage: "https://picsum.photos/seed/resin2/600/600",
    image: "https://picsum.photos/seed/resin2/600/600",
    description: "Elegant serving tray with real dried flowers and gold accents.",
    isFeatured: true,
    isNew: true,
    dimensions: "8 x 12 inches, 0.5 inch deep",
    materials: "Epoxy resin, dried flowers, gold leaf, felt backing",
    careInstructions: "Dust with a dry microfiber cloth. For deeper cleaning, use mild soap and water. Pat dry immediately. Avoid direct sunlight to prevent yellowing.",
    weight: "1.8 lbs",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: "Midnight Seascape Wall Art",
    shortDescription: "Large format multi-layered ocean wave resin art on wood canvas.",
    longDescription: `Transform any space with this dramatic midnight seascape wall art. This large-format piece features multiple layers of resin poured over a wood canvas, creating incredible depth and movement that mimics real ocean waves.

    The rich navy blues transition into lighter teals and whites with touches of silver and pearl, creating a mesmerizing effect that changes with the light throughout the day. The waves appear almost three-dimensional, with natural cells and lacing that occurred during the curing process.
    
    This statement piece is perfect for living rooms, bedrooms, or office spaces. It comes ready to hang with a wire backing and arrives carefully packaged to ensure safe delivery.
    
    Due to the handmade nature and size of this piece, please allow 3-4 weeks for creation and curing.`,
    price: 350,
    category: Category.WallArt,
    images: [
      "https://picsum.photos/seed/resin3/800/600",
      "https://picsum.photos/seed/resin3/800/600",
      "https://picsum.photos/seed/resin3/800/600",
    ],
    mainImage: "https://picsum.photos/seed/resin3/800/600",
    image: "https://picsum.photos/seed/resin3/800/600",
    description: "Large format multi-layered ocean wave resin art on wood canvas.",
    isFeatured: false,
    dimensions: "24 x 36 inches, 1.5 inch depth",
    materials: "Epoxy resin, acrylic paint, mica powder, wood panel",
    careInstructions: "Dust gently with a soft, dry cloth. Avoid hanging in direct sunlight or areas with high humidity. Do not use water or cleaning solutions on the resin surface.",
    weight: "8.5 lbs",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: "Emerald Green Resin Clock",
    shortDescription: "Functional art piece with silent quartz movement and emerald swirls.",
    longDescription: `Keep time in style with this stunning emerald green resin clock. The rich, jewel-toned green resin features natural swirls and gold accents that catch the light beautifully throughout the day.

    Features a silent quartz movement - no ticking sounds! The clock face includes minimalist gold hour markers and sleek black hands for easy reading. The circular resin design creates an organic, modern look that works with both contemporary and traditional decor.
    
    Each clock is completely unique due to the nature of resin art. The swirls and patterns form naturally as the resin cures, making your piece truly one-of-a-kind.
    
    Requires 1 AA battery (not included). Includes mounting hardware for easy installation.`,
    price: 120,
    category: Category.Clocks,
    images: [
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600",
    ],
    mainImage: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600",
    isFeatured: false,
    dimensions: "12 inch diameter, 0.75 inch thick",
    materials: "Epoxy resin, metallic pigments, silent quartz movement, gold leaf",
    careInstructions: "Dust with a soft, dry cloth. Keep away from moisture. Replace battery as needed with standard AA battery.",
    weight: "2.3 lbs",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: "Amethyst Geode Wall Hanging",
    shortDescription: "Real amethyst crystal clusters embedded in purple resin art.",
    longDescription: `Bring the mystical beauty of natural crystals into your home with this amethyst geode wall hanging. This piece features genuine amethyst crystal clusters embedded in layers of purple, lavender, and white resin, creating a stunning geode effect.

    The combination of real crystals and resin creates amazing depth and sparkle. The amethyst crystals catch and reflect light, adding an extra dimension of beauty to the piece. Gold metallic details frame the crystals, mimicking the look of natural geode formations.
    
    Perfect for meditation spaces, bedrooms, or anywhere you want to add a touch of natural beauty and positive energy. Many believe amethyst promotes calmness and clarity.
    
    This is a substantial piece that makes a bold statement. Comes with a sturdy hanging system on the back.`,
    price: 200,
    category: Category.WallArt,
   // Find this section for product id: '5'
    images: [
      "https://picsum.photos/seed/resin5/600/600",
      "https://picsum.photos/seed/resin5b/600/600",
    ],
    mainImage: "https://picsum.photos/seed/resin5/600/600",
    image: "https://picsum.photos/seed/resin5/600/600",
    isFeatured: true,
    dimensions: "18 x 24 inches, 1 inch depth",
    materials: "Epoxy resin, genuine amethyst crystals, metallic pigments, wood backing",
    careInstructions: "Dust gently with a soft brush or cloth. Do not use water or cleaners on the crystal areas. Avoid direct sunlight to prevent fading.",
    weight: "6.2 lbs",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: "Custom Bridal Bouquet Preservation Block",
    shortDescription: "Preserve your wedding flowers forever in crystal-clear resin.",
    longDescription: `Your wedding day is one of the most special days of your life - why not preserve your bridal bouquet forever? I work with you to create a beautiful keepsake that encapsulates your flowers in crystal-clear resin.

    The process is simple: after your wedding, ship me your bouquet (I provide detailed instructions). I carefully arrange and preserve the flowers, then embed them in multiple layers of premium resin to create a stunning display piece.
    
    Each preservation block is completely custom - we'll discuss size, shape (rectangular, circular, hexagonal), and any special touches you'd like to add (like your wedding date, initials, or metallic accents).
    
    This is more than a preserved flower arrangement - it's a functional piece of art you can display on a shelf, mantel, or use as a paperweight. The flowers maintain their color and are protected for years to come.
    
    **How it works:**
    1. Contact me before your wedding to reserve a spot
    2. Ship your bouquet to me within 2-3 days of your wedding
    3. We consult on design preferences
    4. I create your custom piece (2-3 weeks)
    5. Your preserved bouquet is shipped back to you
    
    Pricing varies based on bouquet size and desired dimensions. Contact me for a personalized quote.`,
    price: 250,
    category: Category.Custom,
    images: [
      "https://picsum.photos/seed/resin6/600/600",
      "https://picsum.photos/seed/resin6b/600/600",
    ],
    mainImage: "https://picsum.photos/seed/resin6/600/600",
    image: "https://picsum.photos/seed/resin6/600/600",
    isFeatured: false,
    dimensions: "6 x 6 x 2 inches (standard), custom sizes available",
    materials: "Epoxy resin, preserved flowers, optional metallic accents",
    careInstructions: "Display away from direct sunlight to prevent color fading. Clean with a soft, dry cloth only. Handle with care as dried flowers can be delicate.",
    weight: "2-4 lbs depending on size",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// ==============================================================================
// BLOG POSTS
// ==============================================================================
export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: "The Magic of Layering Resin",
    date: "2024-10-15",
    excerpt: "Learn how I create depth in my ocean pieces using multiple layers of resin over several days.",
    content: `Creating realistic ocean waves isn't a one-step process. It requires patience, precision, and multiple pours over several days...
    
    The key to achieving that incredible depth you see in my ocean pieces is all about layering. Each layer needs to cure partially before the next one is added, creating true three-dimensional depth.
    
    Here's my typical process:
    1. Base layer with the darkest blues
    2. Wait 4-6 hours for partial cure
    3. Add mid-tone blues and teals
    4. Wait another 4-6 hours
    5. Add white "wave" layer with cells
    6. Final clear coat after 24 hours
    
    The magic happens in the waiting. Patience is truly the secret ingredient in resin art!`,
    image: "https://picsum.photos/seed/resin3/800/600",
    author: "Shelly",
    tags: ["Tutorial", "Ocean Art", "Technique"],
    published: true,
  },
  {
    id: '2',
    title: "Caring for Your Resin Art",
    date: "2024-11-02",
    excerpt: "Simple tips to keep your resin coasters and trays looking shiny and new for years to come.",
    content: `Resin is incredibly durable, but like any handmade item, it benefits from proper care. Here are my top tips for maintaining your resin pieces:
    
    **Daily Care:**
    - Dust with a soft, dry microfiber cloth
    - Avoid placing extremely hot items directly on resin surfaces
    - Use coasters under cold drinks to prevent water rings
    
    **Deep Cleaning:**
    - For sticky residue, use mild dish soap and warm water
    - Dry immediately with a soft cloth
    - Never use abrasive cleaners or scrubbers
    
    **Long-term Protection:**
    - Keep away from direct sunlight to prevent yellowing
    - Avoid harsh chemicals and cleaners
    - Store in a cool, dry place if not displaying
    
    With proper care, your resin pieces will look beautiful for decades!`,
    image: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=800",
    author: "Shelly",
    tags: ["Care Tips", "Maintenance"],
    published: true,
  },
  {
    id: '3',
    title: "Behind the Scenes: Holiday Collection 2024",
    date: "2024-12-01",
    excerpt: "A sneak peek into the snowy, glittery designs coming soon this holiday season.",
    content: `I'm so excited to share what I've been working on for the upcoming holiday season! This year's collection is all about winter magic.
    
    I'm experimenting with:
    - Iridescent whites and icy blues
    - Silver and pearl metallic accents
    - Glitter (yes, glitter!) suspended in layers
    - Snowflake-inspired patterns
    
    The pieces will include:
    ❄️ Limited edition winter coaster sets
    ❄️ Frosted white jewelry trays
    ❄️ "Northern Lights" wall art
    ❄️ Silver & blue ornament sets
    
    Pre-orders will open on December 10th! Mark your calendars - these pieces make perfect gifts and tend to sell out quickly.
    
    Follow me on Instagram (@shellysresin) for daily updates and first looks!`,
    image: "https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?w=800",
    author: "Shelly",
    tags: ["New Release", "Holiday", "Sneak Peek"],
    published: true,
  }
];

// ==============================================================================
// SERVICES
// ==============================================================================
export const SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: "Custom Commissions",
    description: "Have a specific color palette or design in mind? I work with you to create a piece that perfectly matches your vision and interior design.",
    icon: "palette"
  },
  {
    id: '2',
    title: "Workshops & Classes",
    description: "Join me for a 3-hour hands-on workshop where you'll learn safety, mixing, and pouring techniques to create your own resin coasters to take home.",
    icon: "users"
  },
  {
    id: '3',
    title: "Flower Preservation",
    description: "Send me your special occasion flowers (weddings, graduations, memorials), and I will encapsulate them in high-quality resin for a timeless keepsake.",
    icon: "flower"
  }
];

// ==============================================================================
// HELPER FUNCTIONS
// ==============================================================================

/**
 * Generates a unique ID for new products
 */
export const generateProductId = (): string => {
  return `prod-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Generates a unique ID for blog posts
 */
export const generateBlogId = (): string => {
  return `blog-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Validates admin access code
 */
export const validateAdminAccess = (inputCode: string): boolean => {
  return inputCode === ADMIN_CONFIG.accessCode;
};

/**
 * Checks if admin session is still valid
 */
export const isAdminSessionValid = (expiryTime: number): boolean => {
  return Date.now() < expiryTime;
};
