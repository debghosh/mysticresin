import React from 'react';
import { SERVICES } from '../constants';
import { Palette, Users, Flower, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMap: Record<string, React.ReactNode> = {
  'palette': <Palette size={40} />,
  'users': <Users size={40} />,
  'flower': <Flower size={40} />,
};

const Services = () => {
  return (
    <div className="animate-fade-in bg-slate-50 min-h-screen">
      <div className="bg-slate-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">Services & Workshops</h1>
          <p className="text-lg text-slate-300">Beyond just buying art—create it, customize it, or commission it.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center border-t-4 border-[color:var(--color-primary)]">
               <div className="text-[color:var(--color-primary)] mb-6 bg-[color:var(--color-accent)] p-4 rounded-full">
                 {iconMap[service.icon]}
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
               <p className="text-slate-600 mb-6 flex-grow">{service.description}</p>
               <Link to="/contact" className="text-[color:var(--color-secondary)] font-bold hover:underline inline-flex items-center">
                 Get Started <ArrowRight size={16} className="ml-1"/>
               </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Workshop Highlight */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2">
             <img src="https://picsum.photos/seed/workshop/800/600" alt="Resin Workshop" className="w-full h-full object-cover" />
          </div>
          <div className="md:w-1/2 p-10 flex flex-col justify-center">
             <span className="text-[color:var(--color-primary)] font-bold tracking-wider uppercase text-sm mb-2">Upcoming Event</span>
             <h2 className="font-serif text-3xl font-bold text-slate-900 mb-4">Ocean Resin Pouring Class</h2>
             <p className="text-slate-600 mb-6">
               Join us on the first Saturday of next month for a beginner-friendly session. 
               You'll learn how to mix resin, apply pigments, and create the perfect lacing effect for ocean waves.
               All materials provided.
             </p>
             <div className="flex space-x-4">
               <div className="bg-slate-100 px-4 py-2 rounded text-center">
                 <span className="block font-bold text-slate-900">Nov 04</span>
                 <span className="text-xs text-slate-500">10:00 AM</span>
               </div>
               <div className="bg-slate-100 px-4 py-2 rounded text-center">
                 <span className="block font-bold text-slate-900">$85</span>
                 <span className="text-xs text-slate-500">Per Person</span>
               </div>
             </div>
             <button className="mt-8 bg-slate-900 text-white py-3 px-6 rounded-lg w-fit hover:bg-slate-800 transition-colors">
               Reserve Your Spot
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;