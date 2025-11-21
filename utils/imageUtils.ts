// Image Upload Utilities
// Handles image uploads, compression, and base64 conversion

export interface ImageFile {
  file: File;
  preview: string;
  base64: string;
  name: string;
  size: number;
}

/**
 * Convert image file to base64 string
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

/**
 * Compress and resize image
 * @param file - Image file to compress
 * @param maxWidth - Maximum width in pixels
 * @param maxHeight - Maximum height in pixels
 * @param quality - JPEG quality (0-1)
 */
export const compressImage = (
  file: File,
  maxWidth: number = 1200,
  maxHeight: number = 1200,
  quality: number = 0.8
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Convert to base64
        const base64 = canvas.toDataURL('image/jpeg', quality);
        resolve(base64);
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

/**
 * Validate image file
 * @param file - File to validate
 * @param maxSizeMB - Maximum file size in megabytes
 */
export const validateImageFile = (file: File, maxSizeMB: number = 5): { valid: boolean; error?: string } => {
  // Check if file is an image
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'File must be an image' };
  }

  // Check file size
  const fileSizeMB = file.size / (1024 * 1024);
  if (fileSizeMB > maxSizeMB) {
    return { valid: false, error: `File size must be less than ${maxSizeMB}MB` };
  }

  // Check file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Only JPEG, PNG, and WebP images are allowed' };
  }

  return { valid: true };
};

/**
 * Process multiple image files for upload
 * @param files - Array of files to process
 * @param maxFiles - Maximum number of files allowed
 */
export const processImageFiles = async (
  files: FileList | File[],
  maxFiles: number = 5
): Promise<{ images: ImageFile[]; errors: string[] }> => {
  const fileArray = Array.from(files);
  const images: ImageFile[] = [];
  const errors: string[] = [];

  // Check max files limit
  if (fileArray.length > maxFiles) {
    errors.push(`Maximum ${maxFiles} images allowed`);
    return { images, errors };
  }

  for (const file of fileArray) {
    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      errors.push(`${file.name}: ${validation.error}`);
      continue;
    }

    try {
      // Compress and convert to base64
      const base64 = await compressImage(file);
      const preview = URL.createObjectURL(file);

      images.push({
        file,
        preview,
        base64,
        name: file.name,
        size: file.size,
      });
    } catch (error) {
      errors.push(`${file.name}: Failed to process image`);
    }
  }

  return { images, errors };
};

/**
 * Create preview URL from base64
 */
export const getImagePreview = (base64OrUrl: string): string => {
  return base64OrUrl;
};

/**
 * Clean up object URLs to prevent memory leaks
 */
export const revokeImagePreviews = (previews: string[]) => {
  previews.forEach(preview => {
    if (preview.startsWith('blob:')) {
      URL.revokeObjectURL(preview);
    }
  });
};

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Estimate localStorage space used by images
 */
export const estimateStorageSize = (images: string[]): string => {
  const totalBytes = images.reduce((sum, img) => sum + img.length, 0);
  return formatFileSize(totalBytes);
};

/**
 * Check if localStorage has enough space
 */
export const checkStorageSpace = (): { available: boolean; used: number; limit: number } => {
  try {
    // Estimate localStorage limit (usually 5-10MB)
    const limit = 5 * 1024 * 1024; // 5MB
    
    // Calculate current usage
    let used = 0;
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        used += localStorage[key].length + key.length;
      }
    }

    return {
      available: used < limit * 0.9, // Leave 10% buffer
      used,
      limit,
    };
  } catch (error) {
    return {
      available: false,
      used: 0,
      limit: 0,
    };
  }
};
