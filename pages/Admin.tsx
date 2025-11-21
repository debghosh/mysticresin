import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Settings, FileText, Image, Lock, BarChart3, Upload, Download, Trash2, Plus } from 'lucide-react';
import { Product, BlogPost } from '../types';
import { THEMES } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AdminAccessModal from '../components/AdminAccessModal';
import ProductFormModal from '../components/ProductFormModal';

const Admin = () => {
  const { 
    config, 
    updateConfig, 
    products, 
    addProduct,
    updateProduct, 
    deleteProduct, 
    blogPosts, 
    deleteBlogPost,
    isAdminAuthenticated,
    exportData,
    importData,
    loginAdmin,
    resetToDefaults
  } = useStore();
  
  const [activeTab, setActiveTab] = useState<'general' | 'products' | 'blog'>('general');
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Mock Chart Data
  const chartData = [
    { name: 'Mon', visits: 400 },
    { name: 'Tue', visits: 300 },
    { name: 'Wed', visits: 550 },
    { name: 'Thu', visits: 450 },
    { name: 'Fri', visits: 600 },
    { name: 'Sat', visits: 800 },
    { name: 'Sun', visits: 700 },
  ];

  const TabButton = ({ id, icon: Icon, label }: { id: any, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center w-full px-4 py-3 text-left mb-1 rounded-lg transition-colors ${
        activeTab === id 
          ? 'bg-[color:var(--color-primary)] text-white' 
          : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      <Icon size={18} className="mr-3" />
      <span className="font-medium">{label}</span>
    </button>
  );

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };

  const handleSaveProduct = (productData: Partial<Product>) => {
    if (editingProduct) {
      updateProduct({ ...editingProduct, ...productData });
    } else {
      addProduct(productData as Omit<Product, 'id'>);
    }
    setShowProductModal(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product? This cannot be undone.')) {
      deleteProduct(id);
    }
  };

  const handleExportData = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shellys-resin-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          try {
            importData(e.target.result);
            alert('Data imported successfully!');
          } catch (error) {
            alert('Error importing data. Please check the file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all data to defaults? This cannot be undone.\n\nMake sure to export your current data first!')) {
      if (confirm('This is your FINAL warning. All products, blog posts, and settings will be deleted. Continue?')) {
        resetToDefaults();
        alert('Data has been reset to defaults.');
      }
    }
  };


const [showModal, setShowModal] = useState(!isAdminAuthenticated());

if (!isAdminAuthenticated() && showModal) {
  return (
    <AdminAccessModal
      isOpen={true}
      onClose={() => window.history.back()}
      onSubmit={(code) => {
        const success = loginAdmin(code);
        if (success) {
          setShowModal(false);  // Hide modal on success
        }
        return success;
      }}
    />
  );
}

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0 hidden md:block">
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-serif text-xl font-bold text-slate-800">Dashboard</h2>
          <p className="text-xs text-slate-400 mt-1">Shelly's Resin Shop</p>
        </div>
        <nav className="p-4">
          <TabButton id="general" icon={Settings} label="General & Theme" />
          <TabButton id="products" icon={Image} label="Products" />
          <TabButton id="blog" icon={FileText} label="Blog Posts" />
          <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center text-green-800 text-sm font-bold mb-2">
              <Lock size={16} className="mr-2" /> Admin Session
            </div>
            <p className="text-xs text-green-600">You are authenticated</p>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* Analytics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-slate-500 text-sm font-medium">Total Products</h3>
            <p className="text-3xl font-bold text-slate-900 mt-2">{products.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-slate-500 text-sm font-medium">Blog Posts</h3>
            <p className="text-3xl font-bold text-slate-900 mt-2">{blogPosts.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-slate-500 text-sm font-medium">Featured Products</h3>
            <p className="text-3xl font-bold text-slate-900 mt-2">
              {products.filter(p => p.isFeatured).length}
            </p>
          </div>
        </div>

        {/* Tabs Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="p-8 animate-fade-in">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <Settings className="mr-2" /> Site Configuration
              </h2>
              
              <div className="space-y-6 max-w-2xl">
                {/* Theme Selector */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Color Theme</label>
                  <div className="flex space-x-4">
                    {Object.keys(THEMES).map((themeKey) => (
                      <button 
                        key={themeKey}
                        onClick={() => updateConfig({ theme: themeKey as any })}
                        className={`px-4 py-2 rounded border capitalize transition-all ${
                          config.theme === themeKey 
                            ? 'border-[color:var(--color-primary)] bg-[color:var(--color-accent)] text-[color:var(--color-primary)] font-bold scale-105' 
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {themeKey}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Changes primary and secondary colors globally.</p>
                </div>

                {/* Text Edits */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Hero Title</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[color:var(--color-primary)] focus:border-transparent"
                    value={config.heroTitle} 
                    onChange={(e) => updateConfig({ heroTitle: e.target.value })} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Hero Subtitle</label>
                  <textarea 
                    className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[color:var(--color-primary)] focus:border-transparent"
                    rows={2}
                    value={config.heroSubtitle} 
                    onChange={(e) => updateConfig({ heroSubtitle: e.target.value })} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">About Page Text</label>
                  <textarea 
                    className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[color:var(--color-primary)] focus:border-transparent"
                    rows={4}
                    value={config.aboutText} 
                    onChange={(e) => updateConfig({ aboutText: e.target.value })} 
                  />
                </div>
              </div>

              {/* Data Management */}
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-lg font-bold mb-4">Data Management</h3>
                <div className="flex gap-4">
                  <button
                    onClick={handleExportData}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    <Download size={18} className="mr-2" />
                    Export Data
                  </button>
                  <button
                    onClick={handleImportData}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    <Upload size={18} className="mr-2" />
                    Import Data
                  </button>
                  <button
                    onClick={handleResetData}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    <Trash2 size={18} className="mr-2" />
                    Reset to Defaults
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  Export your data regularly as a backup. Import allows you to restore from a backup file.
                </p>
              </div>

              {/* Analytics */}
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <BarChart3 className="mr-2"/> Site Traffic (Demo Data)
                </h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="visits" fill="var(--color-primary)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Product Management */}
          {activeTab === 'products' && (
            <div className="p-8 animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <Image className="mr-2" /> Manage Products
                </h2>
                <button 
                  onClick={handleAddProduct}
                  className="flex items-center bg-[color:var(--color-primary)] text-white px-4 py-2 rounded text-sm font-bold hover:opacity-90 transition-opacity"
                >
                  <Plus size={18} className="mr-2" />
                  Add New Product
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="p-4 font-medium text-slate-500">Image</th>
                      <th className="p-4 font-medium text-slate-500">Title</th>
                      <th className="p-4 font-medium text-slate-500">Category</th>
                      <th className="p-4 font-medium text-slate-500">Price</th>
                      <th className="p-4 font-medium text-slate-500">Featured</th>
                      <th className="p-4 font-medium text-slate-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <img 
                            src={product.images?.[0] || product.image} 
                            className="w-12 h-12 rounded object-cover" 
                            alt={product.title}
                          />
                        </td>
                        <td className="p-4 font-medium text-slate-900">{product.title}</td>
                        <td className="p-4 text-slate-500">{product.category}</td>
                        <td className="p-4 text-slate-900 font-semibold">${product.price}</td>
                        <td className="p-4">
                          <input 
                            type="checkbox" 
                            checked={product.isFeatured} 
                            onChange={() => updateProduct({...product, isFeatured: !product.isFeatured})}
                            className="w-4 h-4 text-[color:var(--color-primary)] rounded"
                          />
                        </td>
                        <td className="p-4">
                          <button 
                            onClick={() => handleEditProduct(product)}
                            className="text-blue-600 hover:text-blue-800 mr-3 font-medium transition-colors"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(product.id)} 
                            className="text-red-500 hover:text-red-700 font-medium transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Blog Management */}
          {activeTab === 'blog' && (
            <div className="p-8 animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <FileText className="mr-2" /> Manage Blog Posts
                </h2>
                <button className="flex items-center bg-[color:var(--color-primary)] text-white px-4 py-2 rounded text-sm font-bold hover:opacity-90 transition-opacity">
                  <Plus size={18} className="mr-2" />
                  Write New Post
                </button>
              </div>
              <div className="space-y-4">
                {blogPosts.map(post => (
                  <div key={post.id} className="flex items-start p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <img src={post.image} className="w-24 h-24 rounded object-cover mr-6" alt={post.title} />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-slate-900">{post.title}</h3>
                      <p className="text-xs text-slate-400 mb-2">{post.date} by {post.author}</p>
                      <p className="text-sm text-slate-600 line-clamp-2">{post.excerpt}</p>
                    </div>
                    <div className="flex flex-col space-y-2 ml-4">
                      <button className="text-sm border border-gray-300 px-3 py-1 rounded hover:bg-gray-50 transition-colors">
                        Edit
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm('Delete this blog post?')) deleteBlogPost(post.id);
                        }}
                        className="text-sm bg-red-50 text-red-600 px-3 py-1 rounded hover:bg-red-100 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Product Form Modal */}
      {showProductModal && (
        <ProductFormModal
          isOpen={showProductModal}
          editProduct={editingProduct}
          onSubmit={handleSaveProduct}
          onClose={() => {
            setShowProductModal(false);
            setEditingProduct(null);
          }}
      />
      )}
    </div>
  );
};

export default Admin;
