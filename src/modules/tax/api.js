import { internal as pphFinalServices } from './internal/pphFinal.js';
import { internal as pph21Services } from './internal/pph21.js';
import { internal as pph22Services } from './internal/pph22.js';
import { internal as pph23Services } from './internal/pph23.js';
import { internal as pph4Ayat2Services } from './internal/pph4Ayat2.js';
import { internal as pph25Services } from './internal/pph25.js';
import { internal as ppnServices } from './internal/ppn.js';
import { internal as pph24Services } from './internal/pph24.js';
import { validatePphFinalInput, validatePphFinalResult } from './validators.js';

export const api = {
  // PPh Final 0.3% calculations
  calculatePphFinal(data) {
    const validatedData = validatePphFinalInput(data, {
      actionName: 'calculatePphFinal',
      location: 'tax/api.js',
      direction: 'incoming',
      moduleFrom: 'client',
      moduleTo: 'tax'
    });
    
    const result = pphFinalServices.calculatePphFinal(validatedData);
    
    return validatePphFinalResult(result, {
      actionName: 'calculatePphFinal',
      location: 'tax/api.js',
      direction: 'outgoing',
      moduleFrom: 'tax',
      moduleTo: 'client'
    });
  },
  
  // Check if CV qualifies for PPh Final
  checkPphFinalEligibility(data) {
    return pphFinalServices.checkEligibility(data);
  },
  
  // PPh 21 calculations
  calculatePph21(data) {
    return pph21Services.calculate(data);
  },
  
  // PPh 22 calculations
  calculatePph22(data) {
    return pph22Services.calculate(data);
  },
  
  // PPh 23 calculations
  calculatePph23(data) {
    return pph23Services.calculate(data);
  },
  
  // PPh 4(2) calculations
  calculatePph4Ayat2(data) {
    return pph4Ayat2Services.calculate(data);
  },
  
  // PPh 25 calculations
  calculatePph25(data) {
    return pph25Services.calculate(data);
  },
  
  // PPN calculations
  calculatePpn(data) {
    return ppnServices.calculate(data);
  },
  
  // PPh 24 calculations
  calculatePph24(data) {
    return pph24Services.calculate(data);
  }
};