import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Pajak CV KU</h3>
            <p className="text-gray-300 text-sm">
              Aplikasi penghitung pajak untuk badan usaha berbentuk Commanditaire Vennootschap (CV) di Indonesia.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Referensi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://www.pajak.go.id/id/peraturan-pemerintah-nomor-55-tahun-2022" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white hover:underline"
                >
                  PP No. 55 Tahun 2022
                </a>
              </li>
              <li>
                <a 
                  href="https://www.pajak.go.id/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white hover:underline"
                >
                  Direktorat Jenderal Pajak
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Disclaimer</h3>
            <p className="text-gray-300 text-sm">
              Aplikasi ini dibuat untuk membantu perhitungan pajak. Untuk informasi resmi, selalu rujuk ke peraturan perpajakan terbaru dan konsultasikan dengan konsultan pajak.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>© {currentYear} Pajak CV KU. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;