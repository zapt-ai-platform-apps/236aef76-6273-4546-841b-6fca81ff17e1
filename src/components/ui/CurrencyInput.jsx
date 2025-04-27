import React from 'react';

export default function CurrencyInput({ 
  value, 
  onChange, 
  placeholder = "Masukkan nilai", 
  label, 
  id, 
  required = false,
  error
}) {
  const handleChange = (e) => {
    // Remove non-numeric characters
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    onChange(numericValue);
  };

  // Format the value for display
  const formatValue = (val) => {
    if (!val) return '';
    return new Intl.NumberFormat('id-ID').format(val);
  };

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="block mb-1 text-gray-700 font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          Rp
        </span>
        <input
          type="text"
          id={id}
          value={formatValue(value)}
          onChange={handleChange}
          placeholder={placeholder}
          className={`box-border pl-9 py-2 px-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
          required={required}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}