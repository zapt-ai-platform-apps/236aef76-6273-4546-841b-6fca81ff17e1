/**
 * Validate an Indonesian NPWP (Tax ID) number
 * @param {string} npwp - NPWP number to validate
 * @returns {boolean} True if valid, false otherwise
 */
export function validateNPWP(npwp) {
  // Remove any non-digit characters
  const cleanNPWP = npwp.replace(/\D/g, '');
  
  // NPWP should be 15 digits
  if (cleanNPWP.length !== 15) {
    return false;
  }
  
  // Check format - first 9 digits are taxpayer ID, 
  // next 3 are tax office code, last 3 are status code
  const regex = /^(\d{2})(\d{3})(\d{3})(\d{1})(\d{3})(\d{3})$/;
  if (!regex.test(cleanNPWP)) {
    return false;
  }
  
  // This is a simplified validation
  // For complete validation, we would need to check against DJP database
  return true;
}

/**
 * Format an NPWP number with proper separators
 * @param {string} npwp - Raw NPWP number
 * @returns {string} Formatted NPWP
 */
export function formatNPWP(npwp) {
  // Remove any non-digit characters
  const cleanNPWP = npwp.replace(/\D/g, '');
  
  if (cleanNPWP.length === 0) return '';
  
  // Add separators in format: XX.XXX.XXX.X-XXX.XXX
  let formattedNPWP = cleanNPWP;
  
  if (cleanNPWP.length >= 2) {
    formattedNPWP = cleanNPWP.substring(0, 2) + (cleanNPWP.length > 2 ? '.' : '');
    
    if (cleanNPWP.length >= 5) {
      formattedNPWP += cleanNPWP.substring(2, 5) + (cleanNPWP.length > 5 ? '.' : '');
      
      if (cleanNPWP.length >= 8) {
        formattedNPWP += cleanNPWP.substring(5, 8) + (cleanNPWP.length > 8 ? '.' : '');
        
        if (cleanNPWP.length >= 9) {
          formattedNPWP += cleanNPWP.substring(8, 9) + (cleanNPWP.length > 9 ? '-' : '');
          
          if (cleanNPWP.length >= 12) {
            formattedNPWP += cleanNPWP.substring(9, 12) + (cleanNPWP.length > 12 ? '.' : '');
            
            if (cleanNPWP.length >= 15) {
              formattedNPWP += cleanNPWP.substring(12, 15);
            } else if (cleanNPWP.length > 12) {
              formattedNPWP += cleanNPWP.substring(12);
            }
          } else if (cleanNPWP.length > 9) {
            formattedNPWP += cleanNPWP.substring(9);
          }
        } else if (cleanNPWP.length > 8) {
          formattedNPWP += cleanNPWP.substring(8);
        }
      } else if (cleanNPWP.length > 5) {
        formattedNPWP += cleanNPWP.substring(5);
      }
    } else if (cleanNPWP.length > 2) {
      formattedNPWP += cleanNPWP.substring(2);
    }
  }
  
  return formattedNPWP;
}