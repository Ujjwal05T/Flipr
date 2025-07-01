import express from 'express';
import {
  getAllContacts,
  getContactById,
  createContact,
  markContactAsRead,
  getUnreadContactCount,
  deleteContact
} from '../controllers/contactController';

const router = express.Router();

// GET /api/contacts - Get all contact form submissions (with pagination)
router.get('/', getAllContacts);

// GET /api/contacts/unread-count - Get count of unread contact forms
router.get('/unread-count', getUnreadContactCount);

// GET /api/contacts/:id - Get single contact form
router.get('/:id', getContactById);

// POST /api/contacts - Create new contact form submission
router.post('/', createContact);

// PATCH /api/contacts/:id/read - Mark contact as read
router.patch('/:id/read', markContactAsRead);

// DELETE /api/contacts/:id - Delete contact form
router.delete('/:id', deleteContact);

export default router;
