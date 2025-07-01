import { Request, Response } from 'express';
import Subscription from '../models/Subscription';

// Get all subscriptions
export const getAllSubscriptions = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const subscriptions = await Subscription.find({ isActive: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Subscription.countDocuments({ isActive: true });

    res.status(200).json({
      success: true,
      data: subscriptions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      message: 'Subscriptions retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving subscriptions',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get single subscription
export const getSubscriptionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    
    if (!subscription) {
      res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: subscription,
      message: 'Subscription retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving subscription',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Create new subscription
export const createSubscription = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    // Check if email already exists
    const existingSubscription = await Subscription.findOne({ email });
    
    if (existingSubscription) {
      if (existingSubscription.isActive) {
        res.status(400).json({
          success: false,
          message: 'Email is already subscribed'
        });
        return;
      } else {
        // Reactivate subscription
        existingSubscription.isActive = true;
        existingSubscription.subscribedAt = new Date();
        existingSubscription.unsubscribedAt = undefined;
        
        const updatedSubscription = await existingSubscription.save();
        
        res.status(200).json({
          success: true,
          data: updatedSubscription,
          message: 'Subscription reactivated successfully'
        });
        return;
      }
    }

    const subscription = new Subscription({ email });
    const savedSubscription = await subscription.save();

    res.status(201).json({
      success: true,
      data: savedSubscription,
      message: 'Subscription created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating subscription',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Unsubscribe
export const unsubscribeEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    const subscription = await Subscription.findOneAndUpdate(
      { email, isActive: true },
      { 
        isActive: false,
        unsubscribedAt: new Date()
      },
      { new: true }
    );

    if (!subscription) {
      res.status(404).json({
        success: false,
        message: 'Active subscription not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: subscription,
      message: 'Unsubscribed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error unsubscribing',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get subscription statistics
export const getSubscriptionStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalSubscriptions = await Subscription.countDocuments({ isActive: true });
    const totalUnsubscribed = await Subscription.countDocuments({ isActive: false });
    const recentSubscriptions = await Subscription.countDocuments({
      isActive: true,
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } // Last 30 days
    });

    res.status(200).json({
      success: true,
      data: {
        totalSubscriptions,
        totalUnsubscribed,
        recentSubscriptions
      },
      message: 'Subscription statistics retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving subscription statistics',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Delete subscription
export const deleteSubscription = async (req: Request, res: Response): Promise<void> => {
  try {
    const subscription = await Subscription.findByIdAndDelete(req.params.id);

    if (!subscription) {
      res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Subscription deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting subscription',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
