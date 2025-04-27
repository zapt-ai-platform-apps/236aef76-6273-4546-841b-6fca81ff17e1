import { z } from 'zod';
import { createValidator } from '../core/validators.js';

// NPWP input schema
export const npwpInputSchema = z.object({
  npwpNumber: z.string().min(1, 'Nomor NPWP tidak boleh kosong')
});

// Create validators
export const validateNpwpInput = createValidator(npwpInputSchema, 'NpwpInput');