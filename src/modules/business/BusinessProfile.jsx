import React, { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';

export default function BusinessProfile() {
  const [formData, setFormData] = useState({
    cvName: '',
    npwp: '',
    address: '',
    establishmentDate: '',
    businessSector: '',
    annualRevenue: '',
    pkpStatus: 'non-pkp',
    owner: '',
    phone: '',
    email: '',
  });
  
  const [showAlert, setShowAlert] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleNPWPChange = (e) => {
    const value = e.target.value;
    // Format NPWP: XX.XXX.XXX.X-XXX.XXX
    let formattedValue = value.replace(/\D/g, '');
    
    if (formattedValue.length > 15) {
      formattedValue = formattedValue.slice(0, 15);
    }
    
    if (formattedValue.length > 0) {
      formattedValue = formattedValue.slice(0, 2) + 
        (formattedValue.length > 2 ? '.' + formattedValue.slice(2, 5) : '') +
        (formattedValue.length > 5 ? '.' + formattedValue.slice(5, 8) : '') +
        (formattedValue.length > 8 ? '.' + formattedValue.slice(8, 9) : '') +
        (formattedValue.length > 9 ? '-' + formattedValue.slice(9, 12) : '') +
        (formattedValue.length > 12 ? '.' + formattedValue.slice(12, 15) : '');
    }
    
    setFormData({
      ...formData,
      npwp: formattedValue,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Display success alert
    setShowAlert(true);
    
    // Hide alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Profil Bisnis</h1>
        <p className="mt-1 text-sm text-gray-500">Kelola informasi bisnis CV Anda</p>
      </div>
      
      {showAlert && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 flex items-start">
          <CheckIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
          <p className="text-sm text-green-700">
            Profil bisnis berhasil disimpan!
          </p>
        </div>
      )}
      
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-4">Informasi Dasar</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="cvName" className="label">
                    Nama CV
                  </label>
                  <input
                    type="text"
                    id="cvName"
                    name="cvName"
                    value={formData.cvName}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Nama lengkap CV"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="npwp" className="label">
                    NPWP
                  </label>
                  <input
                    type="text"
                    id="npwp"
                    name="npwp"
                    value={formData.npwp}
                    onChange={handleNPWPChange}
                    className="input-field"
                    placeholder="XX.XXX.XXX.X-XXX.XXX"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="address" className="label">
                    Alamat
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="input-field"
                    rows={3}
                    placeholder="Alamat lengkap CV"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="establishmentDate" className="label">
                    Tanggal Pendirian
                  </label>
                  <input
                    type="date"
                    id="establishmentDate"
                    name="establishmentDate"
                    value={formData.establishmentDate}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="businessSector" className="label">
                    Sektor Usaha
                  </label>
                  <select
                    id="businessSector"
                    name="businessSector"
                    value={formData.businessSector}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  >
                    <option value="">Pilih sektor usaha</option>
                    <option value="trade">Perdagangan</option>
                    <option value="service">Jasa</option>
                    <option value="manufacture">Manufaktur</option>
                    <option value="agriculture">Pertanian</option>
                    <option value="construction">Konstruksi</option>
                    <option value="technology">Teknologi</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-4">Informasi Pajak</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="annualRevenue" className="label">
                    Omzet Tahunan (Estimasi)
                  </label>
                  <select
                    id="annualRevenue"
                    name="annualRevenue"
                    value={formData.annualRevenue}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  >
                    <option value="">Pilih rentang omzet</option>
                    <option value="below500m">Dibawah Rp500 juta</option>
                    <option value="500m-1b">Rp500 juta - Rp1 miliar</option>
                    <option value="1b-2.5b">Rp1 miliar - Rp2,5 miliar</option>
                    <option value="2.5b-4.8b">Rp2,5 miliar - Rp4,8 miliar</option>
                    <option value="above4.8b">Diatas Rp4,8 miliar</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="pkpStatus" className="label">
                    Status PKP
                  </label>
                  <select
                    id="pkpStatus"
                    name="pkpStatus"
                    value={formData.pkpStatus}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  >
                    <option value="non-pkp">Bukan PKP</option>
                    <option value="pkp">PKP (Pengusaha Kena Pajak)</option>
                    <option value="in-process">Dalam Proses Pengajuan PKP</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-4">Informasi Kontak</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="owner" className="label">
                    Nama Pemilik / Penanggung Jawab
                  </label>
                  <input
                    type="text"
                    id="owner"
                    name="owner"
                    value={formData.owner}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Nama lengkap pemilik"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="label">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Nomor telepon aktif"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Email bisnis"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <button type="submit" className="btn-primary cursor-pointer">
              Simpan Profil
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}