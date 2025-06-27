import React from 'react';

const SimpleFooter: React.FC = () => {
  return (
    <footer className="h-8 bg-transparent border-t border-white/10 flex items-center justify-between px-4 text-xs text-white/60 z-30">
      <div className="flex items-center space-x-4">
        <span>Eliza AI • Always here for you</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <span className="text-white/40">Backend: http://127.0.0.1:8080</span>
      </div>
    </footer>
  );
};

export default SimpleFooter;