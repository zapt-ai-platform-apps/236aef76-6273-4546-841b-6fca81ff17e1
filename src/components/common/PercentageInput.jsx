import React from 'react';

const PercentageInput = ({ 
  id, 
  label, 
  value, 
  onChange, 
  placeholder = "0", 
  required = false,
  helperText = "",
  error = false, 
  disabled = false,
  min = 0,
  max = 100
}) => {
  const handleChange = (e) => {
    const inputValue = e.target.value;
    
    // Remove all non-digit characters except decimal point
    const numericValue = inputValue.replace(/[^\d.]/g, '');
    
    // Ensure only one decimal point exists
    const parts = numericValue.split('.');
    let formattedValue = parts[0] + (parts.length > 1 ? '.' + parts.slice(1).join('') : '');
    
    // Check if the value is within the allowed range
    const numValue = parseFloat(formattedValue);
    if (!isNaN(numValue)) {
      if (numValue < min) formattedValue = min.toString();
      if (numValue > max) formattedValue = max.toString();
    }
    
    onChange(formattedValue);
  };

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative rounded-md shadow-sm">
        <input
          type="text"
          id={id}
          className={`input box-border pr-10 ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''} ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          required={required}
          disabled={disabled}
          inputMode="decimal"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">%</span>
        </div>
      </div>
      {helperText && (
        <p className={`mt-1 text-sm ${error ? 'text-red-500' : 'text-gray-500'}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default PercentageInput;