import { PROFESSIONAL_BOUNDARY } from './site';

export type ToolKind = 'ac' | 'window-ac' | 'portable-ac' | 'tonnage' | 'dehumidifier' | 'basement-dehumidifier' | 'cfm-by-ach' | 'ach' | 'bathroom-fan' | 'garage' | 'btu-kw' | 'pints-liters';

export type ContentPage = {
  path: string;
  kind: 'tool' | 'guide' | 'longtail' | 'template' | 'support';
  toolKind?: ToolKind;
  h1: string;
  title: string;
  description: string;
  directAnswer?: string;
  relatedToolPath?: string;
  faqs?: Array<{ question: string; answer: string }>;
  includes?: string[];
  excludes?: string[];
};

const standardFaqs = [
  { question: 'Is this a professional HVAC design?', answer: 'No. It is a room-level preliminary estimate and does not replace Manual J, Manual S, Manual D, product manuals, local code, or qualified professionals.' },
  { question: 'Why does the calculator show a range?', answer: 'Room conditions vary by climate, windows, insulation, air leakage, installation, product labels and moisture sources, so a range is more honest than a pseudo-exact number.' }
];

const includes = ['Visible formula and assumptions', 'Browser-side instant result', 'Result range instead of pseudo-precision', 'Copy result, share URL, CSV export and print/PDF', 'Source notes and professional boundary'];
const excludes = ['Whole-home Manual J/S/D design', 'Local code compliance', 'Health or mold remediation guarantee', 'Electrical, refrigerant, gas or combustion safety', 'Product installation approval'];

export const allTools: ContentPage[] = [
  { path: '/room-ac-btu-calculator/', kind: 'tool', toolKind: 'ac', h1: 'Room AC BTU Calculator', title: 'Room AC BTU Calculator', description: 'Estimate a room air conditioner BTU range from room size, ceiling height, sun, occupants, kitchen heat and insulation.', faqs: standardFaqs, includes, excludes },
  { path: '/window-ac-size-calculator/', kind: 'tool', toolKind: 'window-ac', h1: 'Window Air Conditioner Size Calculator', title: 'Window Air Conditioner Size Calculator', description: 'Estimate window AC size and review oversizing, humidity, window fit, CEER/EER, noise, drainage and installation limits.', faqs: standardFaqs, includes, excludes },
  { path: '/portable-ac-size-calculator/', kind: 'tool', toolKind: 'portable-ac', h1: 'Portable AC Size Calculator', title: 'Portable AC Size Calculator', description: 'Estimate portable AC capacity and understand SACC, BTU labels, hose losses, exhaust sealing and product label checks.', faqs: standardFaqs, includes, excludes },
  { path: '/ac-tonnage-calculator/', kind: 'tool', toolKind: 'tonnage', h1: 'AC Tonnage Calculator', title: 'AC Tonnage Calculator', description: 'Convert BTU per hour to cooling tons and thermal kW without treating the result as central HVAC sizing.', faqs: standardFaqs, includes, excludes },
  { path: '/dehumidifier-size-calculator/', kind: 'tool', toolKind: 'dehumidifier', h1: 'Dehumidifier Size Calculator', title: 'Dehumidifier Size Calculator', description: 'Estimate dehumidifier pints/day by room area, dampness level, basement condition, temperature, water intrusion and drain access.', faqs: standardFaqs, includes, excludes },
  { path: '/basement-dehumidifier-size-calculator/', kind: 'tool', toolKind: 'basement-dehumidifier', h1: 'Basement Dehumidifier Size Calculator', title: 'Basement Dehumidifier Size Calculator', description: 'Estimate basement dehumidifier size with water intrusion, cool temperature, continuous drain and mold-remediation boundaries.', faqs: standardFaqs, includes, excludes },
  { path: '/cfm-by-ach-calculator/', kind: 'tool', toolKind: 'cfm-by-ach', h1: 'CFM by ACH Calculator', title: 'CFM by ACH Calculator', description: 'Calculate CFM from room volume and target ACH while avoiding duct-design and code-compliance claims.', faqs: standardFaqs, includes, excludes },
  { path: '/ach-calculator/', kind: 'tool', toolKind: 'ach', h1: 'ACH Calculator', title: 'ACH Calculator', description: 'Calculate air changes per hour from CFM and room volume.', faqs: standardFaqs, includes, excludes },
  { path: '/bathroom-fan-cfm-calculator/', kind: 'tool', toolKind: 'bathroom-fan', h1: 'Bathroom Fan CFM Calculator', title: 'Bathroom Fan CFM Calculator', description: 'Estimate bathroom fan CFM using area and fixture rules plus duct, fan rating and local-code caveats.', faqs: standardFaqs, includes, excludes },
  { path: '/garage-ventilation-calculator/', kind: 'tool', toolKind: 'garage', h1: 'Garage Ventilation Calculator', title: 'Garage Ventilation Calculator', description: 'Estimate garage ventilation CFM by ACH with explicit CO, combustion appliance and code-compliance boundaries.', faqs: standardFaqs, includes, excludes },
  { path: '/room-ventilation-calculator/', kind: 'tool', toolKind: 'cfm-by-ach', h1: 'Room Ventilation Calculator', title: 'Room Ventilation Calculator', description: 'Estimate room ventilation airflow from room volume and target ACH.', faqs: standardFaqs, includes, excludes },
  { path: '/btu-to-tons-calculator/', kind: 'tool', toolKind: 'tonnage', h1: 'BTU to Tons Calculator', title: 'BTU to Tons Calculator', description: 'Convert BTU/h to cooling tons.', faqs: standardFaqs, includes, excludes },
  { path: '/btu-to-kw-calculator/', kind: 'tool', toolKind: 'btu-kw', h1: 'BTU to kW Calculator', title: 'BTU to kW Calculator', description: 'Convert BTU/h to thermal kW and explain why it is not electrical input.', faqs: standardFaqs, includes, excludes },
  { path: '/pints-to-liters-calculator/', kind: 'tool', toolKind: 'pints-liters', h1: 'Pints to Liters Calculator', title: 'Pints to Liters Calculator', description: 'Convert dehumidifier pints/day and liters/day while distinguishing capacity from bucket volume.', faqs: standardFaqs, includes, excludes }
];

export const guidePages: ContentPage[] = [
  ['how-many-btu-per-square-foot', 'How Many BTU Per Square Foot?', '/room-ac-btu-calculator/'],
  ['why-oversized-ac-does-not-dehumidify', 'Why Oversized AC Does Not Dehumidify', '/room-ac-btu-calculator/'],
  ['portable-ac-sacc-vs-btu', 'Portable AC SACC vs BTU', '/portable-ac-size-calculator/'],
  ['30-pint-vs-50-pint-dehumidifier', '30 Pint vs 50 Pint Dehumidifier', '/dehumidifier-size-calculator/'],
  ['what-size-dehumidifier-for-basement', 'What Size Dehumidifier for Basement?', '/basement-dehumidifier-size-calculator/'],
  ['cfm-vs-ach', 'CFM vs ACH', '/cfm-by-ach-calculator/'],
  ['bathroom-fan-cfm-guide', 'Bathroom Fan CFM Guide', '/bathroom-fan-cfm-calculator/'],
  ['what-is-ac-tonnage', 'What Is AC Tonnage?', '/ac-tonnage-calculator/'],
  ['dehumidifier-pints-explained', 'Dehumidifier Pints Explained', '/dehumidifier-size-calculator/']
].map(([slug, h1, relatedToolPath]) => ({ path: `/guides/${slug}/`, kind: 'guide', h1, title: h1, relatedToolPath, description: `Guide to ${String(h1).toLowerCase()} with formulas, examples, source notes and professional boundaries.`, directAnswer: `This guide explains ${String(h1).toLowerCase()} for preliminary home comfort decisions. ${PROFESSIONAL_BOUNDARY}`, faqs: standardFaqs }));

export const longTailPages: ContentPage[] = [
  { path: '/room-size/what-size-ac-for-150-sq-ft/', kind: 'longtail', h1: 'What Size AC for 150 Sq Ft?', title: 'What Size AC for 150 Sq Ft?', description: 'Worked room AC sizing example for a 150 sq ft room.', relatedToolPath: '/room-ac-btu-calculator/', directAnswer: 'A 150 sq ft room starts near 3,000 BTU/h before real-world adjustments.' },
  { path: '/room-size/what-size-ac-for-300-sq-ft/', kind: 'longtail', h1: 'What Size AC for 300 Sq Ft?', title: 'What Size AC for 300 Sq Ft?', description: 'Worked room AC sizing example for a 300 sq ft room.', relatedToolPath: '/room-ac-btu-calculator/', directAnswer: 'A 300 sq ft room starts near 6,000 BTU/h before real-world adjustments.' },
  { path: '/room-size/what-size-ac-for-500-sq-ft/', kind: 'longtail', h1: 'What Size AC for 500 Sq Ft?', title: 'What Size AC for 500 Sq Ft?', description: 'Worked room AC sizing example for a 500 sq ft room.', relatedToolPath: '/room-ac-btu-calculator/', directAnswer: 'A 500 sq ft room starts near 10,000 BTU/h before real-world adjustments.' },
  { path: '/portable-ac/14000-btu-portable-ac-room-size/', kind: 'longtail', h1: '14,000 BTU Portable AC Room Size', title: '14,000 BTU Portable AC Room Size', description: 'Portable AC label interpretation for 14,000 BTU units and SACC caveats.', relatedToolPath: '/portable-ac-size-calculator/', directAnswer: 'A 14,000 BTU portable AC label does not automatically mean the same practical room coverage as a window AC; check SACC, hose design and product label.' },
  { path: '/dehumidifier/what-size-dehumidifier-for-1000-sq-ft-basement/', kind: 'longtail', h1: 'What Size Dehumidifier for a 1000 Sq Ft Basement?', title: 'What Size Dehumidifier for a 1000 Sq Ft Basement?', description: 'Worked dehumidifier sizing example for a 1000 sq ft basement.', relatedToolPath: '/basement-dehumidifier-size-calculator/', directAnswer: 'A 1000 sq ft damp basement commonly lands around 40-60 pints/day before water-source and temperature checks.' },
  { path: '/bathroom-fan/what-size-fan-for-small-bathroom/', kind: 'longtail', h1: 'What Size Fan for a Small Bathroom?', title: 'What Size Fan for a Small Bathroom?', description: 'Worked bathroom fan sizing example for a small bathroom.', relatedToolPath: '/bathroom-fan-cfm-calculator/', directAnswer: 'Small bathrooms generally start at 50 CFM, but duct length, fittings and local code still matter.' }
];

export const templatePages: ContentPage[] = ['room-ac-sizing-worksheet', 'basement-humidity-checklist', 'hvac-contractor-questions'].map((slug) => ({
  path: `/templates/${slug}/`,
  kind: 'template',
  h1: slug.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' '),
  title: slug.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' '),
  description: `Printable ${slug.replaceAll('-', ' ')} for room comfort planning.`,
  directAnswer: 'Use this checklist to record dimensions, assumptions, product labels, questions and boundaries before purchasing or calling a contractor.'
}));

export const supportPages: ContentPage[] = ['about', 'contact', 'privacy', 'terms', 'disclaimer'].map((slug) => ({
  path: `/${slug}/`,
  kind: 'support',
  h1: slug === 'privacy' ? 'Privacy Policy' : slug[0].toUpperCase() + slug.slice(1),
  title: slug === 'privacy' ? 'Privacy Policy' : slug[0].toUpperCase() + slug.slice(1),
  description: `${slug} page for Room Comfort Calculators.`,
  directAnswer: PROFESSIONAL_BOUNDARY
}));

export const allContentPages: ContentPage[] = [...allTools, ...guidePages, ...longTailPages, ...templatePages, ...supportPages];
export const allPagePaths = ['/', ...allContentPages.map((page) => page.path)];

export function findPageBySlug(slug: string[]) {
  const path = `/${slug.join('/')}${slug.length ? '/' : ''}`;
  return allContentPages.find((page) => page.path === path);
}
