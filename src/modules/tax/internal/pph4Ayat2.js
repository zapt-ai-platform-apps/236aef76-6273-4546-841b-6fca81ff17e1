import { PPH_4_AYAT_2_RATES } from '../constants.js';

/**
 * Internal services for PPh 4(2) calculations
 */
export const internal = {
  /**
   * Calculate PPh 4(2) for various types of final income
   * @param {Object} data - Input data for calculation
   * @param {number} data.amount - Transaction amount
   * @param {string} data.incomeType - Type of income (landBuildingSale, landBuildingRental, etc.)
   * @param {string} [data.constructionType] - Type of construction (planning, implementation, supervision)
   * @param {string} [data.implementationScale] - Scale of implementation (small, medium, large)
   * @returns {Object} - Calculation result
   */
  calculate(data) {
    const { 
      amount, 
      incomeType, 
      constructionType, 
      implementationScale 
    } = data;
    
    let taxRate = 0;
    
    // Determine tax rate based on income type
    if (incomeType === 'construction') {
      if (constructionType === 'implementation') {
        taxRate = PPH_4_AYAT_2_RATES.construction.implementation[implementationScale] || 
                 PPH_4_AYAT_2_RATES.construction.implementation.small;
      } else {
        taxRate = PPH_4_AYAT_2_RATES.construction[constructionType] || 
                 PPH_4_AYAT_2_RATES.construction.planning;
      }
    } else {
      taxRate = PPH_4_AYAT_2_RATES[incomeType] || 0;
    }
    
    // Calculate tax amount
    const taxAmount = amount * taxRate;
    
    return {
      amount,
      incomeType,
      taxRate,
      taxAmount,
      netAmount: amount - taxAmount
    };
  }
};