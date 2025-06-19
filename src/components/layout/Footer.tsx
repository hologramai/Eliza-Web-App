import React from 'react';
import { API_BASE } from '../../services/api';

const Footer: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-between items-center p-4 z-10">
      <div className="text-cyber-pink/60 text-sm">
        <p className="cyber-text-glow">Eliza AI • Always here for you</p>
      </div>
      
      <div className="text-cyber-pink/60 text-sm">
        <p className="cyber-text-glow">Backend: {API_BASE}</p>
      </div>
    </div>
  );
};

export default Footer;