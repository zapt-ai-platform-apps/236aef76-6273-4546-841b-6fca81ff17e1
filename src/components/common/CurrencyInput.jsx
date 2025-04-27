import React from 'react';

const CurrencyInput = ({ 
  id, 
  label, 
  value, 
  onChange, 
  placeholder = "0", 
  required = false,
  helperText = "",
  error = false
}) => {
  const handleChange = (e) => {
    const inputValue = e.target.value;
    
    // Remove all non-digit characters except decimal point
    const numericValue = inputValue.replace(/[^\d.]/g, '');
    
    // Ensure only one decimal point exists
    const parts = numericValue.split('.');
    const formattedValue = parts[0] + (parts.length > 1 ? '.' + parts.slice(1).join('') : '');
    
    onChange(formattedValue);
  };

  const formatForDisplay = (value) => {
    if (!value) return '';
    
    // Parse the number and format with thousand separators
    const number = parseFloat(value);
    if (isNaN(number)) return value;
    
    return number.toLocaleString('id-ID');
  };

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">Rp</span>
        </div>
        <input
          type="text"
          id={id}
          className={`input box-border pl-12 ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
          placeholder={placeholder}
          value={formatForDisplay(value)}
          onChange={handleChange}
          required={required}
          inputMode="decimal"
        />
      </div>
      {helperText && (
        <p className={`mt-1 text-sm ${error ? 'text-red-500' : 'text-gray-500'}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default CurrencyInput;