import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/app/layout/Layout';
import HomePage from '@/app/pages/HomePage';
import PphFinalPage from '@/app/pages/PphFinalPage';
import PphGeneralPage from '@/app/pages/PphGeneralPage';
import PpnPage from '@/app/pages/PpnPage';
import Pph24Page from '@/app/pages/Pph24Page';
import NpwpValidationPage from '@/app/pages/NpwpValidationPage';
import NotFoundPage from '@/app/pages/NotFoundPage';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pph-final" element={<PphFinalPage />} />
          <Route path="/pph-general" element={<PphGeneralPage />} />
          <Route path="/ppn" element={<PpnPage />} />
          <Route path="/pph24" element={<Pph24Page />} />
          <Route path="/npwp-validation" element={<NpwpValidationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}