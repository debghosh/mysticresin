import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';

const Contact = () => {
  const { config } = useStore();
  const [formData, setFormData] = useState({ name: '', email: '', type: 'Custom Commission', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
    }, 500);
  };

  return (
    <div className="bg-white animate-fade-in min-h-screen">
       {/* Header */}
       <div className="bg-[color:var(--color-accent)] py-16">
         <div className="max-w-4xl mx-auto px-4 text-center">
           <h1 className="font-serif text-4xl font-bold text-slate-900">Get in Touch</h1>
           <p className="text-slate-600 mt-2">Have a vision for a custom piece? Let's make it a reality.</p>
         </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Info Side */}
            <div>
               <h2 className="font-serif text-2xl font-bold mb-6">Contact Information</h2>
               <div className="space-y-6">
                  <div className="flex items-start">
                     <div className="bg-[color:var(--color-accent)] p-3 rounded-full text-[color:var(--color-primary)] mr-4">
                        <Mail size={24} />
                     </div>
                     <div>
                        <p className="font-bold text-slate-900">Email</p>
                        <p className="text-slate-600">{config.contactEmail}</p>
                     </div>
                  </div>
                  <div className="flex items-start">
                     <div className="bg-[color:var(--color-accent)] p-3 rounded-full text-[color:var(--color-primary)] mr-4">
                        <Phone size={24} />
                     </div>
                     <div>
                        <p className="font-bold text-slate-900">Phone</p>
                        <p className="text-slate-600">+1 (555) 123-4567</p>
                     </div>
                  </div>
                  <div className="flex items-start">
                     <div className="bg-[color:var(--color-accent)] p-3 rounded-full text-[color:var(--color-primary)] mr-4">
                        <MapPin size={24} />
                     </div>
                     <div>
                        <p className="font-bold text-slate-900">Studio Location</p>
                        <p className="text-slate-600">San Diego, California</p>
                        <p className="text-xs text-slate-400">(Visits by appointment only)</p>
                     </div>
                  </div>
                  <div className="flex items-start">
                     <div className="bg-[color:var(--color-accent)] p-3 rounded-full text-[color:var(--color-primary)] mr-4">
                        <Clock size={24} />
                     </div>
                     <div>
                        <p className="font-bold text-slate-900">Response Time</p>
                        <p className="text-slate-600">Typically replies within 24-48 hours.</p>
                     </div>
                  </div>
               </div>
               
               {/* Map Placeholder */}
               <div className="mt-12 bg-gray-100 h-64 rounded-xl w-full flex items-center justify-center text-slate-400 font-medium border border-gray-200">
                  Map Widget Placeholder
               </div>
            </div>

            {/* Form Side */}
            <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
               {submitted ? (
                 <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <CheckCircle size={64} className="text-green-500 mb-4" />
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                    <p className="text-slate-600">Thanks for reaching out, {formData.name}. I'll be in touch shortly.</p>
                    <button onClick={() => setSubmitted(false)} className="mt-8 text-[color:var(--color-primary)] font-bold hover:underline">Send another message</button>
                 </div>
               ) : (
                 <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
                       <input 
                         type="text" 
                         required
                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[color:var(--color-primary)] focus:border-transparent outline-none transition-shadow"
                         placeholder="Shelly Smith"
                         value={formData.name}
                         onChange={e => setFormData({...formData, name: e.target.value})}
                       />
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                       <input 
                         type="email" 
                         required
                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[color:var(--color-primary)] focus:border-transparent outline-none transition-shadow"
                         placeholder="shelly@example.com"
                         value={formData.email}
                         onChange={e => setFormData({...formData, email: e.target.value})}
                       />
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">Type of Inquiry</label>
                       <select 
                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[color:var(--color-primary)] focus:border-transparent outline-none transition-shadow"
                         value={formData.type}
                         onChange={e => setFormData({...formData, type: e.target.value})}
                       >
                          <option>Custom Commission</option>
                          <option>Existing Artwork Question</option>
                          <option>Workshop Inquiry</option>
                          <option>Wholesale / Business</option>
                          <option>Other</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                       <textarea 
                         required
                         rows={4}
                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[color:var(--color-primary)] focus:border-transparent outline-none transition-shadow"
                         placeholder="Tell me about your project idea..."
                         value={formData.message}
                         onChange={e => setFormData({...formData, message: e.target.value})}
                       ></textarea>
                    </div>
                    <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-transform active:scale-95">
                       Send Message
                    </button>
                 </form>
               )}
            </div>
         </div>
       </div>
    </div>
  );
};

export default Contact;