// Enhanced type definitions for production

export enum Category {
  Coasters = "Coasters",
  WallArt = "Wall Art",
  Trays = "Jewelry Trays",
  Clocks = "Resin Clocks",
  Custom = "Custom Commissions"
}

export interface Product {
  id: string;
  title: string;
  shortDescription: string; // For cards/listings
  longDescription: string; // Detailed info on product page
  price: number;
  category: Category;
  images: string[]; // Array of up to 5 images
  mainImage: string; // Primary image (images[0])
  image?: string; // Backward compatibility - old single image field
  description?: string; // Backward compatibility - old description field
  isFeatured: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  dimensions?: string;
  materials?: string; // e.g., "Epoxy resin, mica powder, gold leaf"
  careInstructions?: string; // How to clean and maintain
  weight?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  tags?: string[];
  published: boolean;
}

export interface SiteConfig {
  name: string;
  theme: 'ocean' | 'marble' | 'sunset';
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  contactEmail: string;
  primaryColor: string;
  secondaryColor: string;
  adminAccessCode: string; // Secure admin access
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// Admin state types
export interface AdminState {
  isAuthenticated: boolean;
  sessionExpiry: number;
}

// Image upload types
export interface ImageUpload {
  file: File;
  preview: string;
  base64?: string;
}
