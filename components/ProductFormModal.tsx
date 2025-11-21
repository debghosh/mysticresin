import React, { useState, useEffect } from 'react';
import { X, Upload, Trash2, Image as ImageIcon, AlertCircle, Check } from 'lucide-react';
import { Product, Category } from '../types';
import { processImageFiles, revokeImagePreviews, formatFileSize } from '../utils/imageUtils';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  editProduct?: Product | null;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editProduct
}) => {
  const [formData, setFormData] = useState<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>({
    title: '',
    shortDescription: '',
    longDescription: '',
    price: 0,
    category: Category.Coasters,
    images: [],
    mainImage: '',
    isFeatured: false,
    isNew: false,
    isBestSeller: false,
    dimensions: '',
    materials: '',
    careInstructions: '',
    weight: '',
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load edit product data
  useEffect(() => {
    if (editProduct) {
      setFormData({
        title: editProduct.title,
        shortDescription: editProduct.shortDescription,
        longDescription: editProduct.longDescription,
        price: editProduct.price,
        category: editProduct.category,
        images: editProduct.images,
        mainImage: editProduct.mainImage,
        isFeatured: editProduct.isFeatured,
        isNew: editProduct.isNew || false,
        isBestSeller: editProduct.isBestSeller || false,
        dimensions: editProduct.dimensions || '',
        materials: editProduct.materials || '',
        careInstructions: editProduct.careInstructions || '',
        weight: editProduct.weight || '',
      });
      setImagePreviews(editProduct.images);
    }
  }, [editProduct]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      revokeImagePreviews(imagePreviews);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const currentImageCount = formData.images.length;
    const remainingSlots = 5 - currentImageCount;

    if (remainingSlots <= 0) {
      setErrors(['Maximum 5 images allowed per product']);
      return;
    }

    setErrors([]);
    
    const { images, errors: uploadErrors } = await processImageFiles(
      e.target.files,
      remainingSlots
    );

    if (uploadErrors.length > 0) {
      setErrors(uploadErrors);
    }

    if (images.length > 0) {
      const newImages = images.map(img => img.base64);
      const updatedImages = [...formData.images, ...newImages];
      
      setFormData(prev => ({
        ...prev,
        images: updatedImages,
        mainImage: prev.mainImage || updatedImages[0],
      }));
      
      setImagePreviews(updatedImages);
    }

    // Reset input
    e.target.value = '';
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      images: updatedImages,
      mainImage: prev.mainImage === prev.images[index] 
        ? updatedImages[0] || ''
        : prev.mainImage,
    }));
    setImagePreviews(updatedImages);
  };

  const handleSetMainImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      mainImage: prev.images[index],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const validationErrors: string[] = [];
    if (!formData.title.trim()) validationErrors.push('Title is required');
    if (!formData.shortDescription.trim()) validationErrors.push('Short description is required');
    if (formData.price <= 0) validationErrors.push('Price must be greater than 0');
    if (formData.images.length === 0) validationErrors.push('At least one image is required');

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors([]);

    // Submit form
    setTimeout(() => {
      onSubmit(formData);
      handleClose();
      setIsSubmitting(false);
    }, 500);
  };

  const handleClose = () => {
    setFormData({
      title: '',
      shortDescription: '',
      longDescription: '',
      price: 0,
      category: Category.Coasters,
      images: [],
      mainImage: '',
      isFeatured: false,
      isNew: false,
      isBestSeller: false,
      dimensions: '',
      materials: '',
      careInstructions: '',
      weight: '',
    });
    setImagePreviews([]);
    setErrors([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-500 to-teal-500 p-6 text-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {editProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button
              onClick={handleClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Error Messages */}
            {errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-800 mb-2">Please fix the following errors:</p>
                    <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
                      {errors.map((error, i) => (
                        <li key={i}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Product Images (Max 5) *
              </label>
              
              {/* Image Grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Product ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border-2 border-gray-300"
                    />
                    {formData.mainImage === formData.images[index] && (
                      <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                        <Check size={12} />
                        <span>Main</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all rounded-lg flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100">
                      {formData.mainImage !== formData.images[index] && (
                        <button
                          type="button"
                          onClick={() => handleSetMainImage(index)}
                          className="bg-white text-gray-700 px-3 py-1 rounded text-xs font-medium hover:bg-gray-100"
                        >
                          Set Main
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Upload Button */}
                {formData.images.length < 5 && (
                  <label className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-sky-500 hover:bg-sky-50 transition-colors">
                    <Upload size={24} className="text-gray-400 mb-2" />
                    <span className="text-xs text-gray-500">Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              
              <p className="text-xs text-gray-500">
                {formData.images.length}/5 images uploaded. Click "Set Main" to choose the primary product image.
              </p>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-sky-500 focus:outline-none"
                  placeholder="e.g., Ocean Wave Coaster Set"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-sky-500 focus:outline-none"
                  required
                >
                  {Object.values(Category).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-sky-500 focus:outline-none"
                  placeholder="45.00"
                  required
                />
              </div>
            </div>

            {/* Descriptions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description * (For product cards and listings)
              </label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-sky-500 focus:outline-none"
                placeholder="Brief description (1-2 sentences)"
                required
              />
              <p className="text-xs text-gray-500 mt-1">{formData.shortDescription.length}/150 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Long Description (Detailed product information)
              </label>
              <textarea
                name="longDescription"
                value={formData.longDescription}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-sky-500 focus:outline-none"
                placeholder="Detailed description with multiple paragraphs, features, benefits, etc."
              />
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dimensions
                </label>
                <input
                  type="text"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-sky-500 focus:outline-none"
                  placeholder="e.g., 4 x 4 inches"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight
                </label>
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-sky-500 focus:outline-none"
                  placeholder="e.g., 1.2 lbs"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Materials Used
                </label>
                <input
                  type="text"
                  name="materials"
                  value={formData.materials}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-sky-500 focus:outline-none"
                  placeholder="e.g., Epoxy resin, mica powder, gold leaf"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Care Instructions
                </label>
                <textarea
                  name="careInstructions"
                  value={formData.careInstructions}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-sky-500 focus:outline-none"
                  placeholder="How to clean and maintain this product"
                />
              </div>
            </div>

            {/* Badges & Status */}
            <div className="border-t border-gray-200 pt-6">
              <p className="text-sm font-medium text-gray-700 mb-3">Product Status & Badges</p>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-sky-500 border-gray-300 rounded focus:ring-sky-500"
                  />
                  <span className="text-sm text-gray-700">Featured on Homepage</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isNew"
                    checked={formData.isNew}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-sky-500 border-gray-300 rounded focus:ring-sky-500"
                  />
                  <span className="text-sm text-gray-700">Mark as "New"</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isBestSeller"
                    checked={formData.isBestSeller}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-sky-500 border-gray-300 rounded focus:ring-sky-500"
                  />
                  <span className="text-sm text-gray-700">Mark as "Best Seller"</span>
                </label>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50 flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-gradient-to-r from-sky-500 to-teal-500 text-white font-medium rounded-lg hover:from-sky-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? 'Saving...' : editProduct ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
