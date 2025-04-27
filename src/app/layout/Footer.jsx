import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Pajak CV KU. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="https://www.zapt.ai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Di buat oleh maulapps
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}