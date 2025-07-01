import React, { useState } from 'react';
import { subscriptionApi } from '../services/apiService';
import { Mail, Check } from 'lucide-react';

const SubscriptionComponent: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await subscriptionApi.subscribe({ email: email.trim() });
      if (response.success) {
        setSubmitStatus('success');
        setStatusMessage('Successfully subscribed! Thank you for joining our newsletter.');
        setEmail('');
      }
    } catch (error: any) {
      setSubmitStatus('error');
      setStatusMessage(error.message || 'Subscription failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-blue-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <Mail className="h-12 w-12 text-white mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with Our Latest Projects
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Subscribe to our newsletter and get exclusive updates about new projects, 
            real estate insights, and special offers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 border border-transparent rounded-md focus:ring-2 focus:ring-white focus:border-white text-gray-900 placeholder-gray-500"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center justify-center whitespace-nowrap"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Subscribing...
                </>
              ) : (
                <>
                  <Check className="h-5 w-5 mr-2" />
                  Subscribe
                </>
              )}
            </button>
          </div>

          {/* Status Message */}
          {submitStatus !== 'idle' && (
            <div className={`mt-4 p-4 rounded-md ${
              submitStatus === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {statusMessage}
            </div>
          )}
        </form>

        <p className="text-blue-200 text-sm mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default SubscriptionComponent;
