import React from "react";
import "../index.css";           // ensures wave CSS is bundled

export default function CyberBackground() {
  return (
    <div className="cyber-wave-bg fixed inset-0 -z-10 pointer-events-none">
      <div className="cyber-wave wave-1" />
      <div className="cyber-wave wave-2" />
      <div className="cyber-wave wave-3" />
      <div className="cyber-wave wave-4" />
    </div>
  );
}
