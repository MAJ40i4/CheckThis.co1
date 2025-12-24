
/**
 * Resizes and compresses an image base64 string to prevent memory overflow in AI models.
 * Target size: max 1024px width/height, JPEG quality 0.7
 */
export const optimizeImage = (base64Str: string, maxWidth = 1024, quality = 0.7): Promise<{ data: string; mimeType: string }> => {
  return new Promise((resolve, reject) => {
    // Basic validation to detect if it's already a clean base64 or includes data URI
    const cleanBase64 = base64Str.includes(',') ? base64Str.split(',')[1] : base64Str;
    const mimeType = base64Str.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)?.[1] || 'image/jpeg';

    const img = new Image();
    img.src = `data:${mimeType};base64,${cleanBase64}`;
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Calculate new dimensions
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxWidth) {
          width = Math.round((width * maxWidth) / height);
          height = maxWidth;
        }
      }

      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error("Canvas context unavailable"));
        return;
      }

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      
      // Export as JPEG with reduced quality
      const optimizedDataUrl = canvas.toDataURL('image/jpeg', quality);
      resolve({
        data: optimizedDataUrl.split(',')[1],
        mimeType: 'image/jpeg'
      });
    };

    img.onerror = (err) => reject(err);
  });
};
