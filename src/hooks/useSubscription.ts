import { useState } from 'react';

export const useSubscription = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };

  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  const handleSelectPlan = async (planId: string) => {
    console.log('Selected plan:', planId);
    
    try {
      // TODO: Integrate with Stripe Checkout
      // This will redirect to Stripe's hosted checkout page
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId,
          // Add wallet address if available for user identification
        }),
      });

      const { url } = await response.json();
      
      if (url) {
        // Redirect to Stripe Checkout
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      // Handle error - show toast or error message
    }
  };

  return {
    isSignUpModalOpen,
    openSignUpModal,
    closeSignUpModal,
    handleSelectPlan
  };
};