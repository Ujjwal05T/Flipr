import { Request, Response } from 'express';
import Project from '../models/Project';

// Get all projects
export const getAllProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: projects,
      message: 'Projects retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving projects',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get single project
export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: project,
      message: 'Project retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving project',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Create new project
export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description } = req.body;
    const image = req.file ? req.file.path : '';

    if (!image) {
      res.status(400).json({
        success: false,
        message: 'Project image is required'
      });
      return;
    }

    const project = new Project({
      name,
      description,
      image
    });

    const savedProject = await project.save();

    res.status(201).json({
      success: true,
      data: savedProject,
      message: 'Project created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating project',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Update project
export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description } = req.body;
    const updateData: any = { name, description };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: project,
      message: 'Project updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating project',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Delete project
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting project',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
