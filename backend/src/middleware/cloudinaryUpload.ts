import multer from 'multer';
import cloudinary from '../config/cloudinary';
import { Request, Response, NextFunction } from 'express';

// Configure multer for memory storage (for Vercel compatibility)
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check if file is an image
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  },
});

// Cloudinary upload middleware
export const uploadToCloudinary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return next();
    }

    // Convert buffer to base64
    const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    
    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: 'flipr-real-estate', // Organize uploads in a folder
      transformation: [
        { width: 450, height: 350, crop: 'fill' }, // Maintain the 450x350 crop
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ]
    });

    // Add the Cloudinary URL to the request object
    req.file.path = uploadResponse.secure_url;
    req.file.filename = uploadResponse.public_id;

    next();
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading image to cloud storage',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export default upload;
