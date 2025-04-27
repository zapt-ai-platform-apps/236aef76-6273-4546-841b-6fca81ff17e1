import React from 'react';
import { Link } from 'react-router-dom';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import TaxSummaryCard from './components/TaxSummaryCard';
import TaxDeadlinesCard from './components/TaxDeadlinesCard';

// Register Chart.js components
Chart.register(...registerables);

export default function Dashboard() {
  // Demo data for tax summary
  const pphTaxData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'PPh Final UMKM (0.3%)',
        data: [120000, 150000, 180000, 130000, 160000, 170000],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
      {
        label: 'PPh Pasal 21',
        data: [80000, 90000, 85000, 100000, 95000, 110000],
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
      }
    ],
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Ringkasan Pajak 6 Bulan Terakhir'
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Ringkasan kewajiban pajak Anda</p>
        </div>
        <div className="flex gap-3">
          <Link to="/calculator" className="btn-primary cursor-pointer">
            Hitung Pajak
          </Link>
          <Link to="/profile" className="btn-outline cursor-pointer">
            Profil Bisnis
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TaxSummaryCard 
          title="PPh Final UMKM (0.3%)"
          currentAmount={170000}
          previousAmount={160000}
          changePercent={6.25}
          type="currency"
        />
        <TaxSummaryCard 
          title="PPh Pasal 21"
          currentAmount={110000}
          previousAmount={95000}
          changePercent={15.79}
          type="currency"
        />
        <TaxSummaryCard 
          title="PPN"
          currentAmount={550000}
          previousAmount={520000}
          changePercent={5.77}
          type="currency"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2">
          <h2 className="text-lg font-medium mb-4">Tren Pembayaran Pajak</h2>
          <div className="h-80">
            <Bar options={chartOptions} data={pphTaxData} />
          </div>
        </div>
        
        <TaxDeadlinesCard />
      </div>
      
      <div className="card">
        <h2 className="text-lg font-medium mb-4">Fitur Penghitungan Pajak</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <h3 className="font-medium mb-2">PPh Final UMKM (0.3%)</h3>
            <p className="text-sm text-gray-600 mb-3">Hitung Pajak Penghasilan Final sebesar 0.3% dari omzet bruto untuk UKM.</p>
            <Link to="/pph" className="text-blue-600 text-sm font-medium hover:underline">
              Hitung sekarang →
            </Link>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <h3 className="font-medium mb-2">PPh Pasal 21</h3>
            <p className="text-sm text-gray-600 mb-3">Hitung pemotongan PPh atas penghasilan atau gaji karyawan.</p>
            <Link to="/pph" className="text-blue-600 text-sm font-medium hover:underline">
              Hitung sekarang →
            </Link>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <h3 className="font-medium mb-2">PPN (11%)</h3>
            <p className="text-sm text-gray-600 mb-3">Hitung Pajak Pertambahan Nilai untuk usaha dengan omzet > Rp4,8 miliar.</p>
            <Link to="/ppn" className="text-blue-600 text-sm font-medium hover:underline">
              Hitung sekarang →
            </Link>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <h3 className="font-medium mb-2">PPh Pasal 23</h3>
            <p className="text-sm text-gray-600 mb-3">Hitung PPh yang dipungut terkait transaksi dengan pihak lain.</p>
            <Link to="/pph" className="text-blue-600 text-sm font-medium hover:underline">
              Hitung sekarang →
            </Link>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <h3 className="font-medium mb-2">PPh Pasal 4 ayat (2)</h3>
            <p className="text-sm text-gray-600 mb-3">Hitung PPh final atas penghasilan dari penjualan atau sewa properti.</p>
            <Link to="/pph" className="text-blue-600 text-sm font-medium hover:underline">
              Hitung sekarang →
            </Link>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <h3 className="font-medium mb-2">PPh Pasal 25</h3>
            <p className="text-sm text-gray-600 mb-3">Hitung angsuran PPh Pasal 25 untuk tarif PPh Badan normal.</p>
            <Link to="/pph" className="text-blue-600 text-sm font-medium hover:underline">
              Hitung sekarang →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}