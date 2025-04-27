import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ toggleSidebar }) {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white md:hidden"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <Link to="/" className="flex items-center">
              <img 
                src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=40&height=40" 
                alt="Pajak CV KU Logo" 
                className="h-8 w-8 mr-2" 
              />
              <span className="text-xl font-bold">Pajak CV KU</span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center">
            <a 
              href="https://www.zapt.ai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-blue-100 text-sm"
            >
              Made on ZAPT
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}