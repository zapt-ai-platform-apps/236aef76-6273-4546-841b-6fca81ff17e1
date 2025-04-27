/**
 * Internal services for PPh 25 calculations
 */
export const internal = {
  /**
   * Calculate PPh 25 installments for CV
   * @param {Object} data - Input data for calculation
   * @param {number} data.prevYearTaxAmount - Previous year's tax amount
   * @param {number} [data.fiscalLosses] - Fiscal losses from previous years
   * @param {number} [data.pphPaid] - PPh already paid this year
   * @returns {Object} - Calculation result
   */
  calculate(data) {
    const { 
      prevYearTaxAmount = 0, 
      fiscalLosses = 0, 
      pphPaid = 0 
    } = data;
    
    // Adjust for fiscal losses
    const adjustedTaxBase = Math.max(0, prevYearTaxAmount - fiscalLosses);
    
    // Calculate annual tax amount
    const annualTaxAmount = adjustedTaxBase;
    
    // Subtract already paid PPh
    const remainingTaxAmount = Math.max(0, annualTaxAmount - pphPaid);
    
    // Calculate monthly installment (divided by 12)
    const monthlyInstallment = remainingTaxAmount / 12;
    
    return {
      prevYearTaxAmount,
      fiscalLosses,
      adjustedTaxBase,
      annualTaxAmount,
      pphPaid,
      remainingTaxAmount,
      monthlyInstallment
    };
  }
};