import { Request, Response } from 'express';
import Client from '../models/Client';

// Get all clients
export const getAllClients = async (req: Request, res: Response): Promise<void> => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: clients,
      message: 'Clients retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving clients',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get single client
export const getClientById = async (req: Request, res: Response): Promise<void> => {
  try {
    const client = await Client.findById(req.params.id);
    
    if (!client) {
      res.status(404).json({
        success: false,
        message: 'Client not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: client,
      message: 'Client retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving client',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Create new client
export const createClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, designation } = req.body;
    const image = req.file ? req.file.path : '';

    if (!image) {
      res.status(400).json({
        success: false,
        message: 'Client image is required'
      });
      return;
    }

    const client = new Client({
      name,
      description,
      designation,
      image
    });

    const savedClient = await client.save();

    res.status(201).json({
      success: true,
      data: savedClient,
      message: 'Client created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating client',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Update client
export const updateClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, designation } = req.body;
    const updateData: any = { name, description, designation };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const client = await Client.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!client) {
      res.status(404).json({
        success: false,
        message: 'Client not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: client,
      message: 'Client updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating client',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Delete client
export const deleteClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);

    if (!client) {
      res.status(404).json({
        success: false,
        message: 'Client not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Client deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting client',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
