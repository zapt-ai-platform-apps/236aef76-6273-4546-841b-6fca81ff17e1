import { z } from 'zod';
import { createValidator } from '../core/validators.js';

// PPh Final input schema
export const pphFinalInputSchema = z.object({
  grossIncome: z.number().positive('Omzet bruto harus lebih dari 0'),
  startDate: z.string().optional(),
  taxId: z.string().optional()
});

// PPh Final result schema
export const pphFinalResultSchema = z.object({
  grossIncome: z.number().positive(),
  taxRate: z.number(),
  taxAmount: z.number(),
  netIncome: z.number(),
  eligibleForFinalTax: z.boolean(),
  remainingEligibilityPeriod: z.number().optional(),
  maxEligibilityDate: z.string().optional()
});

// PPh 21 input schema
export const pph21InputSchema = z.object({
  employeeSalary: z.number().positive('Gaji karyawan harus lebih dari 0'),
  taxDeductions: z.number().optional(),
  isJKKJKMRegistered: z.boolean().default(false),
  isPensionPlanRegistered: z.boolean().default(false)
});

// PPh 23 input schema
export const pph23InputSchema = z.object({
  amount: z.number().positive('Jumlah harus lebih dari 0'),
  serviceType: z.string()
});

// PPh 4(2) input schema
export const pph4Ayat2InputSchema = z.object({
  amount: z.number().positive('Jumlah harus lebih dari 0'),
  incomeType: z.string()
});

// PPN input schema
export const ppnInputSchema = z.object({
  salesAmount: z.number().positive('Jumlah penjualan harus lebih dari 0'),
  isPKP: z.boolean().default(false)
});

// PPh 24 input schema
export const pph24InputSchema = z.object({
  foreignIncome: z.number().positive('Penghasilan luar negeri harus lebih dari 0'),
  foreignTaxPaid: z.number().min(0, 'Pajak luar negeri tidak boleh negatif'),
  countryCode: z.string()
});

// Create validators
export const validatePphFinalInput = createValidator(pphFinalInputSchema, 'PphFinalInput');
export const validatePphFinalResult = createValidator(pphFinalResultSchema, 'PphFinalResult');
export const validatePph21Input = createValidator(pph21InputSchema, 'Pph21Input');
export const validatePph23Input = createValidator(pph23InputSchema, 'Pph23Input');
export const validatePph4Ayat2Input = createValidator(pph4Ayat2InputSchema, 'Pph4Ayat2Input');
export const validatePpnInput = createValidator(ppnInputSchema, 'PpnInput');
export const validatePph24Input = createValidator(pph24InputSchema, 'Pph24Input');