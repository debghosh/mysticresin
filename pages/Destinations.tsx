import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { Category, Product } from '../types';
import { Filter, X } from 'lucide-react';
import { Dialog } from '@headlessui/react';

const Destinations = () => {
  const { products } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high'>('newest');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    let result = products;
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    return result.sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        // Mocking "newest" logic by simple ID reverse or featured check
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    });
  }, [products, selectedCategory, sortBy]);

  return (
    <div className="bg-white min-h-screen animate-fade-in">
      {/* Header */}
      <div className="bg-[color:var(--color-accent)] py-12">
         <div className="max-w-7xl mx-auto px-4 text-center">
           <h1 className="font-serif text-4xl font-bold text-slate-900">Destinations</h1>
           <p className="text-slate-600 mt-2">Discover unique resin art pieces for your home.</p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2">
             <button 
               onClick={() => setSelectedCategory('All')}
               className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === 'All' ? 'bg-[color:var(--color-primary)] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
             >
               All
             </button>
             {Object.values(Category).map(cat => (
               <button 
                 key={cat}
                 onClick={() => setSelectedCategory(cat)}
                 className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat ? 'bg-[color:var(--color-primary)] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
               >
                 {cat}
               </button>
             ))}
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-2">
             <Filter size={18} className="text-slate-500" />
             <select 
               value={sortBy} 
               onChange={(e) => setSortBy(e.target.value as any)}
               className="border-none bg-transparent font-medium text-slate-700 focus:ring-0 cursor-pointer"
             >
               <option value="newest">Newest</option>
               <option value="price-low">Price: Low to High</option>
               <option value="price-high">Price: High to Low</option>
             </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {filteredProducts.map(product => (
             <div key={product.id} className="group">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-200 mb-4 cursor-pointer" onClick={() => setSelectedProduct(product)}>
                   <img src={product.mainImage || product.images?.[0] || product.image} alt={product.title} className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                   {product.isNew && <span className="absolute top-2 left-2 bg-[color:var(--color-secondary)] text-white text-xs font-bold px-2 py-1 rounded">NEW</span>}
                   {product.isBestSeller && <span className="absolute top-2 right-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded">BEST SELLER</span>}
                   
                   {/* Quick Add overlay */}
                   <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                      <span className="text-white font-medium text-sm">View Details</span>
                   </div>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{product.title}</h3>
                <p className="text-sm text-slate-500">{product.category}</p>
                <p className="text-sm font-medium text-[color:var(--color-primary)] mt-1">${product.price}</p>
             </div>
           ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500">No products found in this category.</p>
          </div>
        )}
      </div>

      {/* Product Details Modal (Simple custom implementation without heavy library) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
           <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
              <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-100 relative">
                <img src={selectedProduct.image} alt={selectedProduct.title} className="w-full h-full object-cover" />
              </div>
              <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
                <div className="flex justify-between items-start mb-4">
                   <h2 className="text-2xl font-serif font-bold text-slate-900">{selectedProduct.title}</h2>
                   <button onClick={() => setSelectedProduct(null)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
                </div>
                <p className="text-2xl text-[color:var(--color-primary)] font-medium mb-6">${selectedProduct.price}</p>
                
                <div className="space-y-4 text-slate-600 mb-8">
                   <p>{selectedProduct.description}</p>
                   <p><strong>Dimensions:</strong> {selectedProduct.dimensions || 'Standard Size'}</p>
                   <p><strong>Category:</strong> {selectedProduct.category}</p>
                   <p className="text-xs bg-yellow-50 border border-yellow-100 p-2 rounded">
                     Each piece is unique. Slight variations in pattern may occur due to the fluid nature of resin.
                   </p>
                </div>

                <div className="mt-auto">
                   <button onClick={() => window.location.href='#/contact'} className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors mb-3">
                     Inquire to Purchase
                   </button>
                   <p className="text-center text-xs text-slate-400">Free shipping on orders over $100</p>
                </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Destinations;