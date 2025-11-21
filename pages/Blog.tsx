import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Calendar, User, Share2, ArrowLeft, ArrowRight } from 'lucide-react';

const Blog = () => {
  const { blogPosts } = useStore();
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const selectedPost = blogPosts.find(p => p.id === selectedPostId);

  if (selectedPost) {
    return (
      <div className="animate-fade-in bg-white min-h-screen py-12">
         <div className="max-w-3xl mx-auto px-4">
            <button onClick={() => setSelectedPostId(null)} className="flex items-center text-slate-500 hover:text-[color:var(--color-primary)] mb-8 transition-colors">
              <ArrowLeft size={20} className="mr-2" /> Back to Blog
            </button>
            <span className="text-[color:var(--color-secondary)] font-bold tracking-wider uppercase text-xs">{selectedPost.date}</span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-6">{selectedPost.title}</h1>
            <div className="flex items-center text-slate-500 text-sm mb-8">
              <User size={16} className="mr-2" /> {selectedPost.author}
            </div>
            
            <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-96 object-cover rounded-xl shadow-lg mb-10" />
            
            <div className="prose prose-lg prose-slate text-slate-600">
              {selectedPost.content}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
              <span className="font-serif font-bold text-slate-900">Share this article</span>
              <div className="flex space-x-4">
                <button className="p-2 rounded-full bg-gray-100 hover:bg-[color:var(--color-accent)] text-slate-600"><Share2 size={18} /></button>
              </div>
            </div>
         </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen animate-fade-in">
      <div className="bg-white border-b border-gray-100 py-16">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl font-bold text-slate-900">Resin Diaries</h1>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">Tips, tutorials, and behind-the-scenes stories from the studio.</p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
           {blogPosts.map((post) => (
             <div key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer group" onClick={() => setSelectedPostId(post.id)}>
               <div className="h-48 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               </div>
               <div className="p-6">
                 <div className="flex items-center text-xs text-slate-400 mb-3">
                    <Calendar size={14} className="mr-1" /> {post.date}
                 </div>
                 <h2 className="font-serif text-xl font-bold text-slate-900 mb-3 group-hover:text-[color:var(--color-primary)] transition-colors">{post.title}</h2>
                 <p className="text-slate-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                 <span className="text-[color:var(--color-primary)] font-medium text-sm inline-flex items-center">
                   Read Article <ArrowRight size={14} className="ml-1" />
                 </span>
               </div>
             </div>
           ))}
         </div>
      </div>
    </div>
  );
};

export default Blog;