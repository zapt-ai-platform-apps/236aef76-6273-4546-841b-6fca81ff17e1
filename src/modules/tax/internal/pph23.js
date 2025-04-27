import { PPH_23_RATES } from '../constants.js';

/**
 * Internal services for PPh 23 calculations
 */
export const internal = {
  /**
   * Calculate PPh 23 for various services
   * @param {Object} data - Input data for calculation
   * @param {number} data.amount - Transaction amount
   * @param {string} data.serviceType - Type of service (rental, technical, management, consulting, other)
   * @returns {Object} - Calculation result
   */
  calculate(data) {
    const { amount, serviceType = 'other' } = data;
    
    // Get tax rate based on service type
    const taxRate = PPH_23_RATES[serviceType] || PPH_23_RATES.other;
    
    // Calculate tax amount
    const taxAmount = amount * taxRate;
    
    return {
      amount,
      serviceType,
      taxRate,
      taxAmount,
      netAmount: amount - taxAmount
    };
  }
};