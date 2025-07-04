import express from 'express';
import upload, { uploadToCloudinary } from '../middleware/cloudinaryUpload';
import {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
} from '../controllers/clientController';

const router = express.Router();

// GET /api/clients - Get all clients
router.get('/', getAllClients);

// GET /api/clients/:id - Get single client
router.get('/:id', getClientById);

// POST /api/clients - Create new client (with image upload)
router.post('/', upload.single('clientImage'), uploadToCloudinary, createClient);

// PUT /api/clients/:id - Update client (with optional image upload)
router.put('/:id', upload.single('clientImage'), uploadToCloudinary, updateClient);

// DELETE /api/clients/:id - Delete client
router.delete('/:id', deleteClient);

export default router;
