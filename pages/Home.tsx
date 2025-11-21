import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Award, Heart, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Home = () => {
  const { config, products } = useStore();
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Abstract Background simulating Resin */}
        <div className="absolute inset-0 z-0">
            <img 
                src="https://picsum.photos/seed/resin_hero/1920/1080" 
                alt="Resin Art Background" 
                className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 to-transparent" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg leading-tight">
            {config.heroTitle}
          </h1>
          <p className="text-lg md:text-2xl mb-8 font-light text-slate-100 drop-shadow-md">
            {config.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/destinations" className="bg-[color:var(--color-primary)] hover:bg-opacity-90 text-white px-8 py-3 rounded-full text-lg font-medium transition-all transform hover:scale-105 shadow-lg">
              Shop Resin Artwork
            </Link>
            <Link to="/contact" className="bg-white/10 backdrop-blur-md border border-white/40 hover:bg-white/20 text-white px-8 py-3 rounded-full text-lg font-medium transition-all">
              Request Custom Piece
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collections Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-slate-900">Featured Collections</h2>
            <p className="mt-4 text-slate-600">Explore our most popular handcrafted series</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
                <img src={product.mainImage || product.images?.[0] || product.image} alt={product.title} className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-white">{product.title}</h3>
                  <p className="text-slate-300 text-sm mt-1 line-clamp-1">{product.description}</p>
                  <Link to="/destinations" className="inline-flex items-center mt-3 text-[color:var(--color-secondary)] font-semibold hover:text-white transition-colors">
                    View Collection <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Shelly */}
      <section className="py-16 bg-[color:var(--color-accent)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-white/50 p-8 rounded-xl shadow-sm border border-white/60">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[color:var(--color-primary)] text-white mb-4">
                  <Award size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">Handmade Quality</h3>
                <p className="text-slate-600">Each piece is poured, cured, and finished by hand with meticulous attention to detail.</p>
              </div>
              <div className="bg-white/50 p-8 rounded-xl shadow-sm border border-white/60">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[color:var(--color-primary)] text-white mb-4">
                  <Heart size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">Unique Designs</h3>
                <p className="text-slate-600">No two pours are identical. Own a truly one-of-a-kind piece of functional art.</p>
              </div>
              <div className="bg-white/50 p-8 rounded-xl shadow-sm border border-white/60">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[color:var(--color-primary)] text-white mb-4">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">Eco-Conscious</h3>
                <p className="text-slate-600">Using non-toxic, food-safe resin and sustainable packaging materials.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-center text-slate-900 mb-12">Client Love</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-lg relative">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, idx) => <Star key={idx} size={16} fill="currentColor" />)}
                </div>
                <p className="text-slate-600 italic mb-4">"Absolutely stunning! The depth of the colors in the coaster set I bought is incredible. It looks like a piece of the ocean on my table."</p>
                <div className="flex items-center">
                   <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden mr-3">
                      <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" />
                   </div>
                   <div>
                     <p className="font-bold text-sm text-slate-900">Sarah Jenkins</p>
                     <p className="text-xs text-slate-500">Verified Buyer</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;