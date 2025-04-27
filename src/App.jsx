import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ZaptBadge from '@/components/ZaptBadge';
import HomePage from '@/modules/home/HomePage';
import PPHFinalPage from '@/modules/pphFinal/PPHFinalPage';
import PPHPasal21Page from '@/modules/pphPasal21/PPHPasal21Page';
import PPHPasal22Page from '@/modules/pphPasal22/PPHPasal22Page';
import PPHPasal23Page from '@/modules/pphPasal23/PPHPasal23Page';
import PPHPasal4Ayat2Page from '@/modules/pphPasal4Ayat2/PPHPasal4Ayat2Page';
import PPHPasal25Page from '@/modules/pphPasal25/PPHPasal25Page';
import PPNPage from '@/modules/ppn/PPNPage';
import PPHPasal24Page from '@/modules/pphPasal24/PPHPasal24Page';
import NPWPValidationPage from '@/modules/npwpValidation/NPWPValidationPage';
import NotFoundPage from '@/modules/core/NotFoundPage';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pph-final" element={<PPHFinalPage />} />
            <Route path="/pph-pasal-21" element={<PPHPasal21Page />} />
            <Route path="/pph-pasal-22" element={<PPHPasal22Page />} />
            <Route path="/pph-pasal-23" element={<PPHPasal23Page />} />
            <Route path="/pph-pasal-4-ayat-2" element={<PPHPasal4Ayat2Page />} />
            <Route path="/pph-pasal-25" element={<PPHPasal25Page />} />
            <Route path="/ppn" element={<PPNPage />} />
            <Route path="/pph-pasal-24" element={<PPHPasal24Page />} />
            <Route path="/validasi-npwp" element={<NPWPValidationPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <ZaptBadge />
        <Footer />
      </div>
    </Router>
  );
}