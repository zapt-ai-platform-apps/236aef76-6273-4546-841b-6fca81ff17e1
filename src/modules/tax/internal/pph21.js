import { PPH_21_RATES } from '../constants.js';

/**
 * Internal services for PPh 21 calculations
 */
export const internal = {
  /**
   * Calculate PPh 21 for employee salary
   * @param {Object} data - Input data for calculation
   * @param {number} data.employeeSalary - Annual employee salary
   * @param {number} [data.taxDeductions] - Tax deductions
   * @param {boolean} [data.isJKKJKMRegistered] - Whether the employee is registered in JKK/JKM
   * @param {boolean} [data.isPensionPlanRegistered] - Whether the employee has a pension plan
   * @returns {Object} - Calculation result
   */
  calculate(data) {
    const { 
      employeeSalary, 
      taxDeductions = 0, 
      isJKKJKMRegistered = false, 
      isPensionPlanRegistered = false 
    } = data;
    
    // Calculate deductions
    const jkkJkmDeduction = isJKKJKMRegistered ? employeeSalary * 0.0074 : 0; // JKK 0.24% + JKM 0.5%
    const pensionDeduction = isPensionPlanRegistered ? employeeSalary * 0.02 : 0; // Pension 2%
    const occupationalDeduction = Math.min(employeeSalary * 0.05, 6000000); // 5% up to 6 million
    const personalDeduction = 54000000; // Basic personal relief (PTKP) for single person
    
    // Total deductions
    const totalDeductions = jkkJkmDeduction + pensionDeduction + occupationalDeduction + personalDeduction + taxDeductions;
    
    // Taxable income
    const taxableIncome = Math.max(0, employeeSalary - totalDeductions);
    
    // Calculate progressive tax
    let remainingIncome = taxableIncome;
    let totalTax = 0;
    
    for (const { threshold, rate } of PPH_21_RATES) {
      if (remainingIncome <= 0) break;
      
      const taxableAmount = Math.min(remainingIncome, threshold);
      totalTax += taxableAmount * rate;
      remainingIncome -= taxableAmount;
    }
    
    return {
      employeeSalary,
      deductions: {
        jkkJkm: jkkJkmDeduction,
        pension: pensionDeduction,
        occupational: occupationalDeduction,
        personal: personalDeduction,
        other: taxDeductions,
        total: totalDeductions
      },
      taxableIncome,
      taxAmount: totalTax,
      netSalary: employeeSalary - totalTax
    };
  }
};