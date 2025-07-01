import express from 'express';
import upload, { uploadToCloudinary } from '../middleware/cloudinaryUpload';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController';

const router = express.Router();

// GET /api/projects - Get all projects
router.get('/', getAllProjects);

// GET /api/projects/:id - Get single project
router.get('/:id', getProjectById);

// POST /api/projects - Create new project (with image upload)
router.post('/', upload.single('projectImage'), uploadToCloudinary, createProject);

// PUT /api/projects/:id - Update project (with optional image upload)
router.put('/:id', upload.single('projectImage'), uploadToCloudinary, updateProject);

// DELETE /api/projects/:id - Delete project
router.delete('/:id', deleteProject);

export default router;
