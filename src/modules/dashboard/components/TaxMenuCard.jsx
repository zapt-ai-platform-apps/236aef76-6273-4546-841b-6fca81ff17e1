import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

export default function TaxMenuCard({ title, description, icon, linkTo, color = "bg-teal-50" }) {
  return (
    <Link 
      to={linkTo} 
      className={`block ${color} border rounded-lg p-6 transition-transform hover:-translate-y-1 hover:shadow-md`}
    >
      <div className="flex items-start">
        <div className="mr-4 mt-1">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          <div className="flex items-center text-teal-700 font-medium text-sm">
            <span>Hitung Sekarang</span>
            <FiArrowRight className="ml-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}