import React from 'react';
import { API_BASE } from '../../services/api';

const Footer: React.FC = () => {
  return (
    <>
      <div className="absolute bottom-4 left-4 text-cyber-pink/60 text-sm">
        <p className="cyber-text-glow">Eliza AI • Always here for you</p>
      </div>
      
      <div className="absolute bottom-4 right-4 text-cyber-pink/60 text-sm">
        <p className="cyber-text-glow">Backend: {API_BASE}</p>
      </div>
    </>
  );
};

export default Footer;