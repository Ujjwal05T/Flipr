import { Request, Response } from 'express';
import Contact from '../models/Contact';

// Get all contact form submissions
export const getAllContacts = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Contact.countDocuments();

    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      message: 'Contact forms retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving contact forms',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get single contact form
export const getContactById = async (req: Request, res: Response): Promise<void> => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      res.status(404).json({
        success: false,
        message: 'Contact form not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: contact,
      message: 'Contact form retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving contact form',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Create new contact form submission
export const createContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, mobileNumber, city, message } = req.body;

    const contact = new Contact({
      fullName,
      email,
      mobileNumber,
      city,
      message
    });

    const savedContact = await contact.save();

    res.status(201).json({
      success: true,
      data: savedContact,
      message: 'Contact form submitted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting contact form',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Mark contact as read
export const markContactAsRead = async (req: Request, res: Response): Promise<void> => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!contact) {
      res.status(404).json({
        success: false,
        message: 'Contact form not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: contact,
      message: 'Contact marked as read'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error marking contact as read',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get unread contact count
export const getUnreadContactCount = async (req: Request, res: Response): Promise<void> => {
  try {
    const unreadCount = await Contact.countDocuments({ isRead: false });

    res.status(200).json({
      success: true,
      data: { unreadCount },
      message: 'Unread contact count retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving unread contact count',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Delete contact
export const deleteContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      res.status(404).json({
        success: false,
        message: 'Contact form not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Contact form deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting contact form',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
