import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid';

export default function TaxSummaryCard({ title, currentAmount, previousAmount, changePercent, type = 'currency' }) {
  const isPositive = changePercent > 0;
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const formatNumber = (amount) => {
    return new Intl.NumberFormat('id-ID').format(amount);
  };
  
  const formattedCurrentAmount = type === 'currency' 
    ? formatCurrency(currentAmount)
    : formatNumber(currentAmount);
    
  return (
    <div className="card">
      <h2 className="text-sm font-medium text-gray-500">{title}</h2>
      <div className="mt-1 flex items-baseline justify-between">
        <p className="text-2xl font-semibold text-gray-900">{formattedCurrentAmount}</p>
        <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
          isPositive ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
        }`}>
          <span className="flex items-center">
            {isPositive ? (
              <ArrowUpIcon className="mr-1 h-3 w-3" />
            ) : (
              <ArrowDownIcon className="mr-1 h-3 w-3" />
            )}
            {Math.abs(changePercent).toFixed(1)}%
          </span>
        </div>
      </div>
      <p className="mt-1 text-xs text-gray-500">
        Dibandingkan dengan bulan lalu ({type === 'currency' ? formatCurrency(previousAmount) : formatNumber(previousAmount)})
      </p>
    </div>
  );
}