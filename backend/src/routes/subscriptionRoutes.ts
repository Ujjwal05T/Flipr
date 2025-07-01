import express from 'express';
import {
  getAllSubscriptions,
  getSubscriptionById,
  createSubscription,
  unsubscribeEmail,
  getSubscriptionStats,
  deleteSubscription
} from '../controllers/subscriptionController';

const router = express.Router();

// GET /api/subscriptions - Get all active subscriptions (with pagination)
router.get('/', getAllSubscriptions);

// GET /api/subscriptions/stats - Get subscription statistics
router.get('/stats', getSubscriptionStats);

// GET /api/subscriptions/:id - Get single subscription
router.get('/:id', getSubscriptionById);

// POST /api/subscriptions - Create new subscription
router.post('/', createSubscription);

// POST /api/subscriptions/unsubscribe - Unsubscribe email
router.post('/unsubscribe', unsubscribeEmail);

// DELETE /api/subscriptions/:id - Delete subscription
router.delete('/:id', deleteSubscription);

export default router;
