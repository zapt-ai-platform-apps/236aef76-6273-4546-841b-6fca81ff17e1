import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Dashboard from '@/modules/dashboard/Dashboard';
import TaxCalculator from '@/modules/tax/TaxCalculator';
import BusinessProfile from '@/modules/business/BusinessProfile';
import PPHCalculator from '@/modules/tax/PPHCalculator';
import PPNCalculator from '@/modules/tax/PPNCalculator';
import TaxSettings from '@/modules/tax/TaxSettings';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="calculator" element={<TaxCalculator />} />
          <Route path="profile" element={<BusinessProfile />} />
          <Route path="pph" element={<PPHCalculator />} />
          <Route path="ppn" element={<PPNCalculator />} />
          <Route path="settings" element={<TaxSettings />} />
        </Route>
      </Routes>
      
      <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="zapt-badge">
        Made on ZAPT
      </a>
    </div>
  );
}