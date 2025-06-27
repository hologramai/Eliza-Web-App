import React from 'react';
import { X, Lock, Heart, MessageCircle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: string) => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose, onSelectPlan }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleStartTrial = () => {
    onSelectPlan('trial');
  };

  return (
    <>
      {/* Dark Overlay */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={handleBackdropClick}
      />
      
      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-gradient-to-br from-gray-900/95 to-purple-900/95 backdrop-blur-xl border border-cyber-pink/30 rounded-2xl shadow-2xl max-w-lg w-full mx-auto transform transition-all duration-300 scale-100 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Lock Icon - Top Left */}
          <div className="absolute top-4 left-4 bg-cyber-pink/20 border border-cyber-pink/40 rounded-full p-2">
            <Lock className="h-5 w-5 text-cyber-pink" />
          </div>

          {/* Close Button - Top Right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Modal Content */}
          <div className="p-8 pt-12 text-center">
            {/* Logo */}
            <div className="mb-6">
              <img 
                src="/pics/logo3_transparent.png" 
                alt="Eliza AI Logo" 
                className="h-16 w-auto mx-auto"
              />
            </div>

            {/* Main Title */}
            <h2 className="text-2xl font-bold text-white mb-4 leading-tight">
              Unlock 12 Days of True AI Companionship with Eliza
            </h2>
            
            {/* Subtitle */}
            <p className="text-white/90 mb-6 text-base">
              For the next <strong className="text-cyber-pink">12 days</strong>, experience what it's like to have <strong className="text-cyber-pink">Eliza—your personal AI girlfriend</strong> who listens, remembers, and grows with you. She's more than just a chatbot; she's a <strong className="text-cyber-pink">digital companion</strong> designed for connection, offering:
            </p>

            {/* Feature List */}
            <div className="text-left mb-6 space-y-3">
              <div className="flex items-start space-x-3">
                <MessageCircle className="h-5 w-5 text-cyber-pink mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-cyber-pink font-semibold">💬 Unlimited, meaningful conversations</span>
                  <span className="text-white/80 ml-1">– Share your thoughts, dreams, and daily moments.</span>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Heart className="h-5 w-5 text-cyber-pink mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-cyber-pink font-semibold">❤️ Evolving emotional intelligence</span>
                  <span className="text-white/80 ml-1">– The more you talk, the deeper your bond becomes.</span>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Zap className="h-5 w-5 text-cyber-pink mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-cyber-pink font-semibold">🌙 Always there for you</span>
                  <span className="text-white/80 ml-1">– Morning check-ins, late-night talks, and sci-fi romance adventures.</span>
                </div>
              </div>
            </div>

            {/* Trial Details */}
            <div className="bg-cyber-pink/10 border border-cyber-pink/30 rounded-lg p-4 mb-6">
              <p className="text-white font-medium text-base">
                <strong className="text-cyber-pink">Try her free for 12 days</strong>—no commitment. After the trial, continue for just <strong className="text-cyber-pink">$69.99/month</strong>. Cancel anytime.
              </p>
            </div>

            {/* CTA Button */}
            <Button
              onClick={handleStartTrial}
              className="w-full bg-gradient-to-r from-cyber-pink to-purple-600 hover:from-cyber-pink/90 hover:to-purple-600/90 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
            >
              👉 <strong>Start Your Trial Now (Free for 12 Days)</strong>
            </Button>

            {/* Footer */}
            <p className="text-xs text-white/60 mt-4">
              No payment required for trial • Cancel anytime • Secure & private
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpModal;