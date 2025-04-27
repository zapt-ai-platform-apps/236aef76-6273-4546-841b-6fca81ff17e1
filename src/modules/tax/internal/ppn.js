import { PPN_RATE, PPN_THRESHOLD } from '../constants.js';

/**
 * Internal services for PPN (VAT) calculations
 */
export const internal = {
  /**
   * Calculate PPN (VAT) for CV that are registered as PKP
   * @param {Object} data - Input data for calculation
   * @param {number} data.salesAmount - Sales amount
   * @param {number} [data.inputTax] - Input tax (VAT paid on purchases)
   * @param {boolean} [data.isPKP] - Whether the CV is a PKP (Pengusaha Kena Pajak)
   * @returns {Object} - Calculation result
   */
  calculate(data) {
    const { 
      salesAmount, 
      inputTax = 0, 
      isPKP = false 
    } = data;
    
    // Only calculate PPN if the CV is a PKP
    if (!isPKP) {
      return {
        salesAmount,
        isPKP,
        isEligible: salesAmount > PPN_THRESHOLD,
        ppnRate: 0,
        outputTax: 0,
        inputTax: 0,
        ppnToBePaid: 0
      };
    }
    
    // Calculate output tax (PPN on sales)
    const outputTax = salesAmount * PPN_RATE;
    
    // Calculate PPN to be paid (output tax - input tax)
    const ppnToBePaid = Math.max(0, outputTax - inputTax);
    
    return {
      salesAmount,
      isPKP,
      isEligible: salesAmount > PPN_THRESHOLD,
      ppnRate: PPN_RATE,
      outputTax,
      inputTax,
      ppnToBePaid
    };
  }
};