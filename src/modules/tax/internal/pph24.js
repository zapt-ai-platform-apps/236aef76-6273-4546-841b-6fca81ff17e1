import { TAX_TREATY_RATES } from '../constants.js';

/**
 * Internal services for PPh 24 calculations
 */
export const internal = {
  /**
   * Calculate potential PPh 24 credit for foreign income
   * @param {Object} data - Input data for calculation
   * @param {number} data.foreignIncome - Income from foreign sources
   * @param {number} data.foreignTaxPaid - Tax paid in foreign country
   * @param {string} data.countryCode - Country code (for tax treaty rates)
   * @returns {Object} - Calculation result
   */
  calculate(data) {
    const { 
      foreignIncome, 
      foreignTaxPaid, 
      countryCode = 'default' 
    } = data;
    
    // Get tax treaty rate for the country
    const treatyRate = TAX_TREATY_RATES[countryCode] || TAX_TREATY_RATES.default;
    
    // Calculate maximum creditable tax based on treaty rate
    const maxCreditableTax = foreignIncome * treatyRate;
    
    // The lower of foreign tax paid or maximum creditable tax
    const creditableTax = Math.min(foreignTaxPaid, maxCreditableTax);
    
    // Calculate effective tax rate
    const effectiveTaxRate = foreignIncome > 0 
      ? creditableTax / foreignIncome 
      : 0;
    
    return {
      foreignIncome,
      foreignTaxPaid,
      countryCode,
      treatyRate,
      maxCreditableTax,
      creditableTax,
      effectiveTaxRate
    };
  }
};