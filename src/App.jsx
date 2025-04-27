import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import Dashboard from '@/pages/Dashboard';
import PPhFinalCalculator from '@/pages/PPhFinalCalculator';
import PPhArticle21Calculator from '@/pages/PPhArticle21Calculator';
import PPhArticle22Calculator from '@/pages/PPhArticle22Calculator';
import PPhArticle23Calculator from '@/pages/PPhArticle23Calculator';
import PPhArticle4Calculator from '@/pages/PPhArticle4Calculator';
import PPhArticle25Calculator from '@/pages/PPhArticle25Calculator';
import PPNCalculator from '@/pages/PPNCalculator';
import PPhArticle24Calculator from '@/pages/PPhArticle24Calculator';
import NPWPValidator from '@/pages/NPWPValidator';
import AboutPage from '@/pages/AboutPage';
import NotFound from '@/pages/NotFound';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-1 w-full">
          <Sidebar />
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/pph-final" element={<PPhFinalCalculator />} />
              <Route path="/pph-21" element={<PPhArticle21Calculator />} />
              <Route path="/pph-22" element={<PPhArticle22Calculator />} />
              <Route path="/pph-23" element={<PPhArticle23Calculator />} />
              <Route path="/pph-4-2" element={<PPhArticle4Calculator />} />
              <Route path="/pph-25" element={<PPhArticle25Calculator />} />
              <Route path="/ppn" element={<PPNCalculator />} />
              <Route path="/pph-24" element={<PPhArticle24Calculator />} />
              <Route path="/npwp-validator" element={<NPWPValidator />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}