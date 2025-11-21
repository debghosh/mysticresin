import React from 'react';
import { useStore } from '../context/StoreContext';
import { Beaker, Palette, Package, Sun } from 'lucide-react';

const About = () => {
  const { config } = useStore();

  return (
    <div className="bg-white animate-fade-in">
      {/* Intro Hero */}
      <div className="bg-[color:var(--color-accent)] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4">About Shelly's Creations</h1>
          <p className="text-lg text-slate-600">Where fluid art meets functional design.</p>
        </div>
      </div>

      {/* Bio Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-[color:var(--color-secondary)]/20 rounded-lg transform -rotate-3"></div>
            <img 
              src="https://picsum.photos/seed/shelly/800/1000" 
              alt="Shelly Artist Portrait" 
              className="relative rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </div>
          <div>
            <h2 className="font-serif text-3xl font-bold text-slate-900 mb-6">Meet the Artist</h2>
            <div className="prose prose-slate text-slate-600">
               <p className="mb-4 leading-relaxed text-lg">
                 {config.aboutText}
               </p>
               <p className="mb-4 leading-relaxed">
                 My journey began in 2018 when I stumbled upon a fluid art video. I was instantly mesmerized by how colors danced and merged. What started as a hobby in my garage quickly transformed into a full-time passion.
               </p>
               <p className="leading-relaxed">
                 I draw my inspiration primarily from nature—the crashing waves of the Pacific, the intricate layers of geodes, and the soft hues of sunset clouds. My goal is to capture a frozen moment of that beauty for you to keep in your home.
               </p>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-center text-slate-900 mb-16">The Creative Process</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
             {/* Step 1 */}
             <div className="text-center relative">
               <div className="w-16 h-16 mx-auto bg-white rounded-full shadow-md flex items-center justify-center text-[color:var(--color-primary)] mb-4">
                 <Palette size={32} />
               </div>
               <h3 className="font-bold text-lg mb-2">1. Concept</h3>
               <p className="text-sm text-slate-500">Selecting pigments, micas, and planning the flow of the piece.</p>
             </div>
             {/* Step 2 */}
             <div className="text-center relative">
               <div className="w-16 h-16 mx-auto bg-white rounded-full shadow-md flex items-center justify-center text-[color:var(--color-primary)] mb-4">
                 <Beaker size={32} />
               </div>
               <h3 className="font-bold text-lg mb-2">2. Pouring</h3>
               <p className="text-sm text-slate-500">Mixing resin and hardener, pouring layers, and removing bubbles.</p>
             </div>
             {/* Step 3 */}
             <div className="text-center relative">
               <div className="w-16 h-16 mx-auto bg-white rounded-full shadow-md flex items-center justify-center text-[color:var(--color-primary)] mb-4">
                 <Sun size={32} />
               </div>
               <h3 className="font-bold text-lg mb-2">3. Curing</h3>
               <p className="text-sm text-slate-500">Allowing 24-72 hours for the resin to harden in a dust-free environment.</p>
             </div>
             {/* Step 4 */}
             <div className="text-center relative">
               <div className="w-16 h-16 mx-auto bg-white rounded-full shadow-md flex items-center justify-center text-[color:var(--color-primary)] mb-4">
                 <Package size={32} />
               </div>
               <h3 className="font-bold text-lg mb-2">4. Finishing</h3>
               <p className="text-sm text-slate-500">Sanding edges, painting details (gold/silver), and eco-friendly packaging.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;