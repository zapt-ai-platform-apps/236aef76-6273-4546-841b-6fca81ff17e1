import { addYears, isBefore, parseISO, format } from 'date-fns';
import { PPH_FINAL_RATE, PPH_FINAL_MAX_YEARS, PPH_FINAL_MAX_INCOME } from '../constants.js';

/**
 * Internal services for PPh Final calculations
 */
export const internal = {
  /**
   * Calculate PPh Final 0.3% for CV that qualify as SMEs
   * @param {Object} data - Input data for calculation
   * @param {number} data.grossIncome - Gross income/turnover (omzet)
   * @param {string} [data.startDate] - Date when the CV started using PPh Final
   * @returns {Object} - Calculation result
   */
  calculatePphFinal(data) {
    const { grossIncome, startDate } = data;
    
    // Check eligibility
    const eligible = this.checkEligibility({ grossIncome });
    
    // Calculate tax
    const taxRate = PPH_FINAL_RATE;
    const taxAmount = grossIncome * taxRate;
    const netIncome = grossIncome - taxAmount;
    
    // Calculate remaining eligibility period if start date is provided
    let remainingEligibilityPeriod = null;
    let maxEligibilityDate = null;
    
    if (startDate && eligible) {
      const startDateObj = parseISO(startDate);
      const endDateObj = addYears(startDateObj, PPH_FINAL_MAX_YEARS);
      const currentDate = new Date();
      
      if (isBefore(currentDate, endDateObj)) {
        // Calculate remaining days
        const remainingMillis = endDateObj.getTime() - currentDate.getTime();
        const remainingDays = Math.ceil(remainingMillis / (1000 * 60 * 60 * 24));
        remainingEligibilityPeriod = remainingDays;
        maxEligibilityDate = format(endDateObj, 'yyyy-MM-dd');
      } else {
        // Eligibility has expired
        remainingEligibilityPeriod = 0;
        maxEligibilityDate = format(endDateObj, 'yyyy-MM-dd');
      }
    }
    
    return {
      grossIncome,
      taxRate,
      taxAmount,
      netIncome,
      eligibleForFinalTax: eligible,
      ...(remainingEligibilityPeriod !== null && { remainingEligibilityPeriod }),
      ...(maxEligibilityDate !== null && { maxEligibilityDate })
    };
  },
  
  /**
   * Check if a CV qualifies for PPh Final based on gross income
   * @param {Object} data - Input data
   * @param {number} data.grossIncome - Gross income/turnover (omzet)
   * @returns {boolean} - Whether the CV is eligible for PPh Final
   */
  checkEligibility({ grossIncome }) {
    return grossIncome <= PPH_FINAL_MAX_INCOME;
  }
};