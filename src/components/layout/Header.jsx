import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';

export default function Header({ setSidebarOpen }) {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="h-16 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <button
            type="button"
            className="md:hidden text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <h1 className="text-xl font-semibold ml-2 md:ml-0">Pajak CV KU</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Versi 1.0.0</span>
        </div>
      </div>
    </header>
  );
}