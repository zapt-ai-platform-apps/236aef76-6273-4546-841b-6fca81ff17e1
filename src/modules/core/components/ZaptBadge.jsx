import React from 'react';

export default function ZaptBadge() {
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <a 
        href="https://www.zapt.ai" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center px-3 py-2 rounded-full bg-white shadow-md border text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        Made on ZAPT
      </a>
    </div>
  );
}