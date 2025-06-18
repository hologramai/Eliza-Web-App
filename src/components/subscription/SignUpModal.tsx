import React from 'react';
import { X, Zap, Crown, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (planId: string) => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose, onSelectPlan }) => {
  if (!isOpen) return null;

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$4.99',
      period: '/month',
      icon: Zap,
      features: [
        '200 messages per day',
        'Fast AI responses',
        'Email support',
        'Mobile & web access',
        'Basic memory retention'
      ],
      popular: false,
      color: 'cyber-purple'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$9.99',
      period: '/month',
      icon: Crown,
      features: [
        '500 messages per day',
        'Advanced AI responses',
        'Priority support',
        'Enhanced personality',
        'Extended memory',
        'Voice synthesis ready'
      ],
      popular: true,
      color: 'cyber-pink'
    },
    {
      id: 'power',
      name: 'Power User',
      price: '$17.99',
      period: '/month',
      icon: Star,
      features: [
        '1,000 messages per day',
        'Premium AI responses',
        'VIP support',
        'Custom personality traits',
        'Long-term memory',
        'API access',
        'Advanced analytics'
      ],
      popular: false,
      color: 'cyber-gold'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="bg-cyber-dark/95 border border-cyber-pink/30 rounded-2xl cyber-bg-blur backdrop-blur-md p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-cyber-pink cyber-text-glow">
                Unlock Unlimited Conversations ✨
              </h2>
              <p className="text-cyber-pink/70 mt-2">
                You've reached your free message limit. Choose a plan to continue chatting with Eliza!
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-cyber-pink/60 hover:text-cyber-pink hover:bg-cyber-pink/10"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const IconComponent = plan.icon;
              return (
                <Card
                  key={plan.id}
                  className={`relative bg-cyber-dark/80 border-2 transition-all duration-300 hover:scale-105 ${
                    plan.popular 
                      ? 'border-cyber-pink shadow-lg shadow-cyber-pink/20' 
                      : 'border-cyber-purple/30 hover:border-cyber-pink/50'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-cyber-pink to-cyber-magenta text-cyber-dark px-4 py-1 rounded-full text-sm font-bold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${plan.color}/20 flex items-center justify-center`}>
                      <IconComponent className={`w-8 h-8 text-${plan.color}`} />
                    </div>
                    <CardTitle className="text-xl text-white">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold text-cyber-pink">
                      {plan.price}
                      <span className="text-lg text-cyber-pink/60">{plan.period}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-cyber-pink/80">
                          <div className="w-2 h-2 bg-cyber-pink rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Button
                      onClick={() => onSelectPlan(plan.id)}
                      className={`w-full ${
                        plan.popular
                          ? 'bg-gradient-to-r from-cyber-pink to-cyber-magenta hover:from-cyber-magenta hover:to-cyber-violet'
                          : 'bg-cyber-purple/20 border border-cyber-purple hover:bg-cyber-purple/30'
                      } text-white font-semibold py-3 rounded-xl transition-all duration-300 cyber-glow`}
                    >
                      {plan.popular ? 'Start Pro Trial' : 'Choose Plan'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-cyber-pink/60 text-sm">
              All plans include a 7-day free trial • Cancel anytime • Secure payments via Stripe
            </p>
            <div className="flex justify-center items-center mt-4 space-x-4 text-cyber-pink/40 text-xs">
              <span>🔒 SSL Encrypted</span>
              <span>💳 Stripe Secure</span>
              <span>✨ Instant Access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;