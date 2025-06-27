import React from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatScrollControlsProps {
  showScrollToTop: boolean;
  onScrollToTop: () => void;
}

const ChatScrollControls: React.FC<ChatScrollControlsProps> = ({ 
  showScrollToTop, 
  onScrollToTop 
}) => {
  return (
    <>
      {/* Scroll to Top Button - Always visible when there are messages */}
      {showScrollToTop && (
        <Button
          onClick={onScrollToTop}
          size="icon"
          className="absolute top-2 right-2 z-20 h-8 w-8 rounded-full bg-cyber-pink/30 hover:bg-cyber-pink/50 border border-cyber-pink/40 backdrop-blur-md transition-all duration-300 shadow-lg"
          variant="ghost"
        >
          <ChevronUp className="h-4 w-4 text-cyber-pink" />
        </Button>
      )}
    </>
  );
};

export default ChatScrollControls;