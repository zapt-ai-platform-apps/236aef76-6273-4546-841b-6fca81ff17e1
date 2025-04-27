import React from 'react';

export default function InfoCard({ icon, title, value, color = 'blue' }) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    green: 'bg-green-100 text-green-800 border-green-200',
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    red: 'bg-red-100 text-red-800 border-red-200',
    purple: 'bg-purple-100 text-purple-800 border-purple-200',
  };
  
  return (
    <div className={`card border ${colorClasses[color]} p-4 rounded-lg`}>
      <div className="flex items-center">
        <div className="mr-4">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-xl font-bold mt-1">{value}</p>
        </div>
      </div>
    </div>
  );
}