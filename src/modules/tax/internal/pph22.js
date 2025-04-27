/**
 * Internal services for PPh 22 calculations
 */
export const internal = {
  /**
   * Calculate PPh 22 for CV
   * @param {Object} data - Input data for calculation
   * @returns {Object} - Calculation result
   */
  calculate(data) {
    // PPh 22 has different rates based on transaction types
    // This is a simplified implementation
    const { 
      transactionType = 'import',
      transactionValue = 0
    } = data;
    
    let taxRate = 0;
    let taxAmount = 0;
    
    switch (transactionType) {
      case 'import':
        // Import of certain goods
        taxRate = 0.075; // 7.5%
        taxAmount = transactionValue * taxRate;
        break;
        
      case 'government':
        // Payments from government treasury for goods purchase
        taxRate = 0.015; // 1.5%
        taxAmount = transactionValue * taxRate;
        break;
        
      case 'fuel':
        // Fuel purchases from Pertamina/other distributors
        taxRate = 0.003; // 0.3%
        taxAmount = transactionValue * taxRate;
        break;
        
      default:
        taxRate = 0;
        taxAmount = 0;
    }
    
    return {
      transactionType,
      transactionValue,
      taxRate,
      taxAmount,
      netAmount: transactionValue - taxAmount
    };
  }
};