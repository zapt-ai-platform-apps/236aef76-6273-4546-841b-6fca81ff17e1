import { internal as npwpServices } from './internal/validation.js';
import { validateNpwpInput } from './validators.js';

export const api = {
  /**
   * Validate an NPWP (Nomor Pokok Wajib Pajak)
   * @param {Object} data - Input data
   * @param {string} data.npwpNumber - NPWP number to validate
   * @returns {Object} - Validation result
   */
  validateNpwp(data) {
    const validatedData = validateNpwpInput(data, {
      actionName: 'validateNpwp',
      location: 'npwp/api.js',
      direction: 'incoming',
      moduleFrom: 'client',
      moduleTo: 'npwp'
    });
    
    return npwpServices.validateNpwp(validatedData.npwpNumber);
  },
  
  /**
   * Format an NPWP number to standard format
   * @param {string} npwpNumber - Raw NPWP number
   * @returns {string} - Formatted NPWP number
   */
  formatNpwp(npwpNumber) {
    return npwpServices.formatNpwp(npwpNumber);
  }
};