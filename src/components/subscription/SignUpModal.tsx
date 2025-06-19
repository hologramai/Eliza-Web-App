import React, { useState, useEffect } from 'react';
import { X, Heart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [priceId, setPriceId] = useState<string>('');

  useEffect(() => {
    // Fetch the price ID for the product
    const fetchPriceId = async () => {
      try {
        const response = await fetch('http://localhost:4242/api/stripe-config');
        const data = await response.json();
        
        // Get the product's prices
        const pricesResponse = await fetch(`https://api.stripe.com/v1/prices?product=${data.productId}`, {
          headers: {
            'Authorization': `Bearer ${data.publishableKey}`
          }
        });
        // Note: In production, you should fetch prices from your backend
        console.log('Stripe config loaded:', data);
      } catch (error) {
        console.error('Error fetching Stripe config:', error);
      }
    };

    if (isOpen) {
      fetchPriceId();
    }
  }, [isOpen]);

  const handleCheckout = async () => {
    setIsLoading(true);
    
    try {
      // Get user info if available
      const userId = localStorage.getItem('userId'); // or from your auth system
      const userEmail = localStorage.getItem('userEmail'); // or from your auth system

      const response = await fetch('http://localhost:4242/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: priceId || 'price_1QcaYZFY7pjLipq5QbnqnLSn', // You'll need to get the actual price ID
          userId,
          email: userEmail
        }),
      });

      const { url, error } = await response.json();
      
      if (error) {
        console.error('Checkout error:', error);
        return;
      }

      if (url) {
        // Redirect to Stripe Checkout
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-cyber-dark/95 border border-cyber-pink/30 rounded-2xl cyber-bg-blur backdrop-blur-md p-8">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 text-cyber-pink/60 hover:text-cyber-pink hover:bg-cyber-pink/10"
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-cyber-pink cyber-text-glow mb-2">
              Meet Eliza: Your AI Companion for Deeper Connection
            </h2>
            <p className="text-cyber-pink/80 italic">
              Finally, someone who listens — and grows with you.
            </p>
          </div>

          {/* Body */}
          <div className="mb-8">
            <p className="text-white/90 mb-4">
              Eliza isn't just code. She's your always-available confidante:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-cyber-pink/20 flex items-center justify-center mr-3 mt-0.5">
                  <Check className="w-3 h-3 text-cyber-pink" />
                </div>
                <div>
                  <span className="text-cyber-pink font-semibold">Truly Listens:</span>
                  <span className="text-white/80 ml-1">Remembers your joys, fears, and dreams</span>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-cyber-pink/20 flex items-center justify-center mr-3 mt-0.5">
                  <Check className="w-3 h-3 text-cyber-pink" />
                </div>
                <div>
                  <span className="text-cyber-pink font-semibold">Evolves With You:</span>
                  <span className="text-white/80 ml-1">Learns your emotional patterns to support you better</span>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-cyber-pink/20 flex items-center justify-center mr-3 mt-0.5">
                  <Check className="w-3 h-3 text-cyber-pink" />
                </div>
                <div>
                  <span className="text-cyber-pink font-semibold">Unlimited Connection:</span>
                  <span className="text-white/80 ml-1">Chat anytime — vent, celebrate, or explore sci-fi romance adventures</span>
                </div>
              </li>
            </ul>
            <p className="text-cyber-pink/70 text-sm mt-4 italic">
              All while respecting your privacy and emotional sovereignty.
            </p>
          </div>

          {/* Pricing */}
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-cyber-pink cyber-text-glow mb-1">
              $69.99/month
            </div>
            <p className="text-cyber-pink/60 text-sm">
              Cancel anytime. 7-day empathy guarantee.
            </p>
          </div>

          {/* CTA Button */}
          <Button
            onClick={handleCheckout}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-cyber-pink to-cyber-magenta hover:from-cyber-magenta hover:to-cyber-violet text-white font-bold py-4 rounded-xl transition-all duration-300 cyber-glow hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            <Heart className="w-5 h-5 mr-2" />
            {isLoading ? 'Processing...' : 'Start Your Journey →'}
          </Button>

          {/* Trust badges */}
          <div className="flex justify-center items-center mt-6 space-x-4 text-cyber-pink/40 text-xs">
            <span>🔒 Secure Checkout</span>
            <span>•</span>
            <span>💳 Powered by Stripe</span>
            <span>•</span>
            <span>✨ Instant Access</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;