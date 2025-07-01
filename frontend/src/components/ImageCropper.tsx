import React, { useState, useRef, useCallback } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import type { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { CheckCircle, XCircle, Upload } from 'lucide-react';

interface ImageCropperProps {
  onCropComplete: (croppedImageFile: File) => void;
  onCancel: () => void;
  aspectRatio?: number; // width/height ratio (e.g., 450/350 = 1.286)
  cropWidth?: number;
  cropHeight?: number;
  maxFileSize?: number; // in MB
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  onCropComplete,
  onCancel,
  aspectRatio = 450 / 350, // Default ratio 450x350
  cropWidth = 450,
  cropHeight = 350,
  maxFileSize = 5
}) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  
  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const onSelectFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Check file size
      if (file.size > maxFileSize * 1024 * 1024) {
        setError(`File size should be less than ${maxFileSize}MB`);
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }

      setError('');
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageSrc(reader.result?.toString() || '');
      });
      reader.readAsDataURL(file);
    }
  }, [maxFileSize]);


  // Initialize crop when image loads
  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 80,
        },
        aspectRatio,
        width,
        height,
      ),
      width,
      height,
    );
    setCrop(crop);
  }, [aspectRatio]);

  // Convert canvas to blob and create file
  const getCroppedImg = useCallback(
    (image: HTMLImageElement, crop: PixelCrop): Promise<File> => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('No 2d context');
      }

      // Set canvas size to desired crop dimensions
      canvas.width = cropWidth;
      canvas.height = cropHeight;

      // Calculate scale factors
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      // Draw the cropped image
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        cropWidth,
        cropHeight
      );

      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          if (!blob) {
            throw new Error('Canvas is empty');
          }
          const file = new File([blob], 'cropped-image.jpg', {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });
          resolve(file);
        }, 'image/jpeg', 0.9);
      });
    },
    [cropWidth, cropHeight]
  );

  // Handle crop completion
  const handleCropComplete = useCallback(async () => {
    if (!completedCrop || !imgRef.current) {
      setError('Please select and crop an area');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const croppedImageFile = await getCroppedImg(imgRef.current, completedCrop);
      onCropComplete(croppedImageFile);
    } catch (err) {
      console.error('Error cropping image:', err);
      setError('Failed to crop image. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [completedCrop, getCroppedImg, onCropComplete]);

  const handleCancel = () => {
    setImageSrc('');
    setCrop(undefined);
    setCompletedCrop(undefined);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onCancel();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full my-8 max-h-screen overflow-y-auto">
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Crop Image</h3>
          <p className="text-gray-600">
            Select and crop your image to {cropWidth}x{cropHeight} pixels
          </p>
        </div>

        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {!imageSrc ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Select an image to crop</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onSelectFile}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Choose Image
              </button>
              <p className="text-sm text-gray-500 mt-2">
                Max size: {maxFileSize}MB • Supported: JPG, PNG, GIF
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center overflow-auto">
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={aspectRatio}
                  minWidth={100}
                  minHeight={100}
                >
                  <img
                    ref={imgRef}
                    alt="Crop preview"
                    src={imageSrc}
                    onLoad={onImageLoad}
                    className="max-h-[60vh] max-w-full object-contain"
                  />
                </ReactCrop>
              </div>

              {error && (
                <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Fixed footer with buttons */}
        {imageSrc && (
          <div className="p-6 border-t border-gray-200 bg-white sticky bottom-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-sm text-gray-600">
                <p>Crop area will be resized to: <span className="font-semibold">{cropWidth}x{cropHeight}px</span></p>
                <p>Aspect ratio: <span className="font-semibold">{aspectRatio.toFixed(3)}</span></p>
              </div>
              
              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={handleCancel}
                  className="flex-1 sm:flex-none bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancel
                </button>
                <button
                  onClick={handleCropComplete}
                  disabled={loading || !completedCrop}
                  className="flex-1 sm:flex-none bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Apply Crop
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCropper;
