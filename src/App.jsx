import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './modules/core/components/Layout';
import Dashboard from './modules/dashboard/Dashboard';
import PPHFinalCalculator from './modules/pphFinal/PPHFinalCalculator';
import PPH21Calculator from './modules/pphOther/components/PPH21Calculator';
import PPH22Calculator from './modules/pphOther/components/PPH22Calculator';
import PPH23Calculator from './modules/pphOther/components/PPH23Calculator';
import PPH4Ayat2Calculator from './modules/pphOther/components/PPH4Ayat2Calculator';
import PPH25Calculator from './modules/pphOther/components/PPH25Calculator';
import PPNCalculator from './modules/ppn/PPNCalculator';
import PPH24Calculator from './modules/pph24/PPH24Calculator';
import NPWPValidator from './modules/npwpValidation/NPWPValidator';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pph-final" element={<PPHFinalCalculator />} />
          <Route path="/pph21" element={<PPH21Calculator />} />
          <Route path="/pph22" element={<PPH22Calculator />} />
          <Route path="/pph23" element={<PPH23Calculator />} />
          <Route path="/pph4ayat2" element={<PPH4Ayat2Calculator />} />
          <Route path="/pph25" element={<PPH25Calculator />} />
          <Route path="/ppn" element={<PPNCalculator />} />
          <Route path="/pph24" element={<PPH24Calculator />} />
          <Route path="/npwp-validator" element={<NPWPValidator />} />
        </Routes>
      </Layout>
    </Router>
  );
}