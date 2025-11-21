import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, BlogPost, SiteConfig, AdminState } from '../types';
import { 
  INITIAL_CONFIG, 
  INITIAL_PRODUCTS, 
  INITIAL_BLOG_POSTS, 
  THEMES,
  ADMIN_CONFIG,
  validateAdminAccess,
  isAdminSessionValid,
  generateProductId,
  generateBlogId
} from '../data';

interface StoreContextType {
  // Configuration
  config: SiteConfig;
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
  
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  
  // Blog Posts
  blogPosts: BlogPost[];
  addBlogPost: (post: Omit<BlogPost, 'id'>) => void;
  updateBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  
  // Admin Authentication
  adminState: AdminState;
  loginAdmin: (accessCode: string) => boolean;
  logoutAdmin: () => void;
  isAdminAuthenticated: () => boolean;
  
  // Data Management
  exportData: () => string;
  importData: (jsonData: string) => boolean;
  resetToDefaults: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// LocalStorage keys
const STORAGE_KEYS = {
  config: 'shellysResin_config',
  products: 'shellysResin_products',
  blogPosts: 'shellysResin_blogPosts',
  adminState: 'shellysResin_adminState',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ===========================================================================
  // STATE INITIALIZATION WITH LOCALSTORAGE
  // ===========================================================================
  
  const [config, setConfig] = useState<SiteConfig>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.config);
    return stored ? JSON.parse(stored) : INITIAL_CONFIG;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.products);
    return stored ? JSON.parse(stored) : INITIAL_PRODUCTS;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.blogPosts);
    return stored ? JSON.parse(stored) : INITIAL_BLOG_POSTS;
  });

  const [adminState, setAdminState] = useState<AdminState>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.adminState);
    if (stored) {
      const state = JSON.parse(stored);
      // Check if session is still valid
      if (isAdminSessionValid(state.sessionExpiry)) {
        return state;
      }
    }
    return { isAuthenticated: false, sessionExpiry: 0 };
  });

  // ===========================================================================
  // PERSIST TO LOCALSTORAGE ON CHANGES
  // ===========================================================================
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.config, JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.blogPosts, JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.adminState, JSON.stringify(adminState));
  }, [adminState]);

  // ===========================================================================
  // UPDATE CSS VARIABLES WHEN THEME CHANGES
  // ===========================================================================
  
  useEffect(() => {
    const themeColors = THEMES[config.theme];
    const root = document.documentElement;
    root.style.setProperty('--color-primary', themeColors.primary);
    root.style.setProperty('--color-secondary', themeColors.secondary);
    root.style.setProperty('--color-accent', themeColors.accent);
  }, [config.theme]);

  // ===========================================================================
  // CONFIGURATION MANAGEMENT
  // ===========================================================================
  
  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  // ===========================================================================
  // PRODUCT MANAGEMENT
  // ===========================================================================
  
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: generateProductId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => 
      prev.map(p => 
        p.id === updatedProduct.id 
          ? { ...updatedProduct, updatedAt: new Date().toISOString() }
          : p
      )
    );
  };

  const deleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const getProductById = (id: string): Product | undefined => {
    return products.find(p => p.id === id);
  };

  // ===========================================================================
  // BLOG POST MANAGEMENT
  // ===========================================================================
  
  const addBlogPost = (postData: Omit<BlogPost, 'id'>) => {
    const newPost: BlogPost = {
      ...postData,
      id: generateBlogId(),
    };
    setBlogPosts(prev => [newPost, ...prev]);
  };

  const updateBlogPost = (updatedPost: BlogPost) => {
    setBlogPosts(prev =>
      prev.map(p => (p.id === updatedPost.id ? updatedPost : p))
    );
  };

  const deleteBlogPost = (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setBlogPosts(prev => prev.filter(p => p.id !== id));
    }
  };

  // ===========================================================================
  // ADMIN AUTHENTICATION
  // ===========================================================================
  
  const loginAdmin = (accessCode: string): boolean => {
    if (validateAdminAccess(accessCode)) {
      const expiryTime = Date.now() + ADMIN_CONFIG.sessionDuration;
      setAdminState({
        isAuthenticated: true,
        sessionExpiry: expiryTime,
      });
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setAdminState({
      isAuthenticated: false,
      sessionExpiry: 0,
    });
  };

  const isAdminAuthenticated = (): boolean => {
    if (!adminState.isAuthenticated) return false;
    if (!isAdminSessionValid(adminState.sessionExpiry)) {
      logoutAdmin();
      return false;
    }
    return true;
  };

  // ===========================================================================
  // DATA IMPORT/EXPORT
  // ===========================================================================
  
  const exportData = (): string => {
    const exportObj = {
      config,
      products,
      blogPosts,
      exportDate: new Date().toISOString(),
      version: '1.0',
    };
    return JSON.stringify(exportObj, null, 2);
  };

  const importData = (jsonData: string): boolean => {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.config) setConfig(data.config);
      if (data.products) setProducts(data.products);
      if (data.blogPosts) setBlogPosts(data.blogPosts);
      
      alert('Data imported successfully!');
      return true;
    } catch (error) {
      alert('Error importing data. Please check the file format.');
      return false;
    }
  };

  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all data to defaults? This will delete all your products and blog posts.')) {
      setConfig(INITIAL_CONFIG);
      setProducts(INITIAL_PRODUCTS);
      setBlogPosts(INITIAL_BLOG_POSTS);
      alert('Data reset to defaults.');
    }
  };

  // ===========================================================================
  // CONTEXT PROVIDER
  // ===========================================================================
  
  return (
    <StoreContext.Provider value={{
      config,
      updateConfig,
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById,
      blogPosts,
      addBlogPost,
      updateBlogPost,
      deleteBlogPost,
      adminState,
      loginAdmin,
      logoutAdmin,
      isAdminAuthenticated,
      exportData,
      importData,
      resetToDefaults,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
