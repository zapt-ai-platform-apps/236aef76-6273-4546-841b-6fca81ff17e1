/**
 * Internal services for NPWP validation
 */
export const internal = {
  /**
   * Validate an NPWP (Nomor Pokok Wajib Pajak)
   * @param {string} npwpNumber - NPWP number to validate
   * @returns {Object} - Validation result
   */
  validateNpwp(npwpNumber) {
    // Remove any non-digit characters
    const cleanNpwp = npwpNumber.replace(/\D/g, '');
    
    // Basic validation rules:
    // 1. NPWP should be 15 digits
    // 2. First 9 digits are tax ID
    // 3. Next 3 digits are tax office code
    // 4. Last 3 digits are tax status code
    
    const isValidLength = cleanNpwp.length === 15;
    
    // Extract components
    const taxId = isValidLength ? cleanNpwp.substring(0, 9) : '';
    const taxOfficeCode = isValidLength ? cleanNpwp.substring(9, 12) : '';
    const taxStatusCode = isValidLength ? cleanNpwp.substring(12, 15) : '';
    
    // Check tax office code range (simplified)
    const isValidTaxOfficeCode = taxOfficeCode >= '001' && taxOfficeCode <= '999';
    
    // Check tax status code (simplified)
    const isValidTaxStatusCode = taxStatusCode >= '000' && taxStatusCode <= '999';
    
    // Format NPWP number if valid
    const formattedNpwp = isValidLength ? this.formatNpwp(cleanNpwp) : '';
    
    const isValid = isValidLength && isValidTaxOfficeCode && isValidTaxStatusCode;
    
    return {
      isValid,
      npwpNumber: cleanNpwp,
      formattedNpwp,
      components: {
        taxId,
        taxOfficeCode,
        taxStatusCode
      },
      errors: isValid ? [] : [
        ...(!isValidLength ? ['Panjang NPWP harus 15 digit'] : []),
        ...(!isValidTaxOfficeCode ? ['Kode kantor pajak tidak valid'] : []),
        ...(!isValidTaxStatusCode ? ['Kode status pajak tidak valid'] : [])
      ]
    };
  },
  
  /**
   * Format an NPWP number to standard format
   * @param {string} npwpNumber - Raw NPWP number
   * @returns {string} - Formatted NPWP number (XX.XXX.XXX.X-XXX.XXX)
   */
  formatNpwp(npwpNumber) {
    // Remove any non-digit characters
    const cleanNpwp = npwpNumber.replace(/\D/g, '');
    
    if (cleanNpwp.length !== 15) {
      return cleanNpwp; // Return as is if not valid length
    }
    
    // Format as XX.XXX.XXX.X-XXX.XXX
    return `${cleanNpwp.substring(0, 2)}.${cleanNpwp.substring(2, 5)}.${cleanNpwp.substring(5, 8)}.${cleanNpwp.substring(8, 9)}-${cleanNpwp.substring(9, 12)}.${cleanNpwp.substring(12, 15)}`;
  }
};