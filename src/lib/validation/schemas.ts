import { z } from 'zod';
import type { ToolKind } from '@/src/content/pages';

const positive = z.coerce.number().positive();
const nonNegative = z.coerce.number().nonnegative();
const smallCount = z.coerce.number().int().min(0).max(20);

export const acInputSchema = z.object({
  lengthFt: positive.default(12),
  widthFt: positive.default(10),
  areaSqft: nonNegative.default(0),
  ceilingHeightFt: z.coerce.number().min(1).max(30).default(8),
  sunExposure: z.enum(['average', 'shaded', 'sunny']).default('average'),
  occupants: z.coerce.number().int().min(0).max(30).default(2),
  kitchen: z.coerce.boolean().default(false),
  insulation: z.enum(['poor', 'average', 'good']).default('average')
});

export const dehumidifierInputSchema = z.object({
  areaSqft: positive.max(10000).default(1000),
  dampness: z.enum(['slightly-damp', 'damp', 'very-damp', 'wet']).default('damp'),
  basement: z.coerce.boolean().default(false),
  temperatureF: z.coerce.number().min(40).max(100).default(70),
  waterIntrusion: z.coerce.boolean().default(false),
  continuousDrain: z.coerce.boolean().default(false)
});

export const ventilationInputSchema = z.object({
  lengthFt: positive.default(12),
  widthFt: positive.default(10),
  areaSqft: nonNegative.default(0),
  ceilingHeightFt: z.coerce.number().min(1).max(30).default(8),
  targetAch: z.coerce.number().min(0.1).max(100).default(6),
  cfm: z.coerce.number().min(1).max(100000).default(100)
});

export const bathroomFanInputSchema = z.object({
  areaSqft: positive.max(1000).default(80),
  toilet: smallCount.default(1),
  shower: smallCount.default(1),
  tub: smallCount.default(0),
  jettedTub: smallCount.default(0),
  ductLengthFt: nonNegative.max(300).default(10)
});

export const btuTonnageInputSchema = z.object({
  btu: positive.max(1000000).default(12000),
  tons: positive.max(100).default(1)
});

export const btuKwInputSchema = z.object({
  btu: positive.max(1000000).default(12000),
  kw: positive.max(1000).default(3.5)
});

export const pintsLitersInputSchema = z.object({
  pints: nonNegative.max(100000).default(50),
  liters: nonNegative.max(100000).default(24)
});

export type CalculatorValidationResult<T> =
  | { ok: true; data: T; errors: [] }
  | { ok: false; data: null; errors: string[] };

function messages(error: z.ZodError) {
  return error.issues.map((issue) => {
    const field = issue.path.length ? issue.path.join('.') : 'input';
    return `${field}: ${issue.message}`;
  });
}

export function validateCalculatorInput<T extends Record<string, unknown>>(kind: ToolKind, input: T): CalculatorValidationResult<T> {
  const schema = schemaForTool(kind);
  const result = schema.safeParse(input);
  if (!result.success) return { ok: false, data: null, errors: messages(result.error) };
  return { ok: true, data: { ...input, ...result.data } as T, errors: [] };
}

function schemaForTool(kind: ToolKind) {
  if (['ac', 'window-ac', 'portable-ac'].includes(kind)) return acInputSchema;
  if (['dehumidifier', 'basement-dehumidifier'].includes(kind)) return dehumidifierInputSchema;
  if (['cfm-by-ach', 'garage', 'ach'].includes(kind)) return ventilationInputSchema;
  if (kind === 'bathroom-fan') return bathroomFanInputSchema;
  if (kind === 'tonnage') return btuTonnageInputSchema;
  if (kind === 'btu-kw') return btuKwInputSchema;
  return pintsLitersInputSchema;
}
