/**
 * Format number as Indonesian Rupiah
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
export function formatRupiah(amount) {
  if (amount === undefined || amount === null) return 'Rp 0';
  
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Format a number with thousand separators
 * @param {number} num - The number to format
 * @returns {string} Formatted number with thousand separators
 */
export function formatNumber(num) {
  if (num === undefined || num === null) return '0';
  
  return new Intl.NumberFormat('id-ID').format(num);
}

/**
 * Format a percentage value
 * @param {number} value - The value to format (0-1)
 * @returns {string} Formatted percentage
 */
export function formatPercentage(value) {
  if (value === undefined || value === null) return '0%';
  
  return new Intl.NumberFormat('id-ID', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
  }).format(value);
}