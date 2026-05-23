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
  {
    question: 'Which HVAC calculator should I start with?',
    answer: 'Use the AC BTU calculator for room cooling, the portable AC calculator when a unit lists SACC or multiple BTU ratings, the dehumidifier calculator for moisture control, and the CFM / ACH calculators for airflow estimates.'
  },
  {
    question: 'Why does the calculator show a range instead of one exact number?',
    answer: 'Room comfort depends on ceiling height, windows, insulation, sun exposure, moisture sources, installation details and product labels. A range is more useful for early comparison than a pseudo-exact number.'
  },
  {
    question: 'Can I use this instead of Manual J or a contractor review?',
    answer: 'No. These tools are for room-level preliminary estimates. Whole-home HVAC design, duct sizing, equipment selection, electrical work, combustion safety, mold remediation and code compliance require qualified review.'
  }
];

const acFaqs = [
  ...standardFaqs,
  {
    question: 'How should I choose between two common AC sizes?',
    answer: 'Start with the calculator range, then check sun exposure, ceiling height, kitchen heat, insulation and the product label. If the room is humid, avoid sizing far above the calculated range because oversizing can cool quickly without removing enough moisture.'
  },
  {
    question: 'Does this work for central AC sizing?',
    answer: 'No. The AC calculator is for room, window and portable AC estimates. Central systems need load calculations, duct review, airflow checks and installation-specific design.'
  }
];

const dehumidifierFaqs = [
  ...standardFaqs,
  {
    question: 'Is dehumidifier capacity the same as bucket size?',
    answer: 'No. Capacity usually refers to moisture removal per day under rating conditions. Bucket volume only describes how much water the tank can hold before emptying.'
  },
  {
    question: 'When should I use a larger dehumidifier range?',
    answer: 'Use the higher end when the space is very damp, cool, below grade, has water intrusion, dries laundry, or needs continuous operation. Fixing water sources and drainage often matters more than buying a larger unit.'
  }
];

const ventilationFaqs = [
  ...standardFaqs,
  {
    question: 'What is the difference between CFM and ACH?',
    answer: 'CFM is airflow volume per minute. ACH is how many times the room air volume is exchanged per hour. The conversion depends on room volume, so the same CFM can produce different ACH in different rooms.'
  },
  {
    question: 'Can this confirm code-compliant ventilation?',
    answer: 'No. The calculators explain the math and help with early planning, but code-compliant ventilation depends on room use, local rules, equipment ratings, ducts, controls and inspection requirements.'
  }
];

const conversionFaqs = [
  ...standardFaqs,
  {
    question: 'Are BTU, tons and kW all the same kind of value?',
    answer: 'They can describe cooling or heat transfer capacity, but electrical power, thermal capacity and real equipment performance are not identical. Efficiency ratings determine how capacity relates to electrical input.'
  }
];

const includes = [
  'Instant browser-side calculation',
  'Visible formula and assumptions',
  'Practical result range instead of false precision',
  'Common-size context for early product comparison',
  'Copy result, share URL, CSV export and print/PDF workflow'
];

const excludes = [
  'Whole-home Manual J, Manual S or Manual D design',
  'Local code, permit or inspection approval',
  'Electrical, refrigerant, gas, combustion or structural safety review',
  'Mold remediation, health advice or moisture-source repair',
  'Final product selection or installation approval'
];

export const allTools: ContentPage[] = [
  {
    path: '/room-ac-btu-calculator/',
    kind: 'tool',
    toolKind: 'ac',
    h1: 'Room AC BTU Calculator',
    title: 'Room AC BTU Calculator - Estimate Air Conditioner Size',
    description: 'Estimate a room air conditioner BTU range from room size, ceiling height, sun exposure, occupants, kitchen heat and insulation, then compare common AC sizes.',
    faqs: acFaqs,
    includes,
    excludes
  },
  {
    path: '/window-ac-size-calculator/',
    kind: 'tool',
    toolKind: 'window-ac',
    h1: 'Window Air Conditioner Size Calculator',
    title: 'Window AC Size Calculator - BTU Range by Room Size',
    description: 'Estimate a window AC BTU range and review oversizing, humidity, window fit, CEER/EER, noise, drainage and installation checks before buying.',
    faqs: acFaqs,
    includes,
    excludes
  },
  {
    path: '/portable-ac-size-calculator/',
    kind: 'tool',
    toolKind: 'portable-ac',
    h1: 'Portable AC Size Calculator',
    title: 'Portable AC Size Calculator - BTU and SACC Estimate',
    description: 'Estimate portable AC capacity from room inputs and understand SACC, ASHRAE BTU labels, hose losses, exhaust sealing and product label checks.',
    faqs: acFaqs,
    includes,
    excludes
  },
  {
    path: '/ac-tonnage-calculator/',
    kind: 'tool',
    toolKind: 'tonnage',
    h1: 'AC Tonnage Calculator',
    title: 'AC Tonnage Calculator - Convert BTU to Tons',
    description: 'Convert BTU per hour to cooling tons and thermal kW while keeping room estimates separate from central HVAC system sizing.',
    faqs: conversionFaqs,
    includes,
    excludes
  },
  {
    path: '/dehumidifier-size-calculator/',
    kind: 'tool',
    toolKind: 'dehumidifier',
    h1: 'Dehumidifier Size Calculator',
    title: 'Dehumidifier Size Calculator - Pints per Day Estimate',
    description: 'Estimate dehumidifier pints per day by room area, dampness level, basement condition, temperature, water intrusion and continuous drain access.',
    faqs: dehumidifierFaqs,
    includes,
    excludes
  },
  {
    path: '/basement-dehumidifier-size-calculator/',
    kind: 'tool',
    toolKind: 'basement-dehumidifier',
    h1: 'Basement Dehumidifier Size Calculator',
    title: 'Basement Dehumidifier Size Calculator - Pints per Day',
    description: 'Estimate basement dehumidifier size with dampness level, cool-temperature adjustment, water intrusion checks and continuous-drain planning.',
    faqs: dehumidifierFaqs,
    includes,
    excludes
  },
  {
    path: '/cfm-by-ach-calculator/',
    kind: 'tool',
    toolKind: 'cfm-by-ach',
    h1: 'CFM by ACH Calculator',
    title: 'CFM by ACH Calculator - Airflow from Room Volume',
    description: 'Calculate required CFM from room volume and target ACH for early ventilation planning, with formula, assumptions and code-compliance boundaries.',
    faqs: ventilationFaqs,
    includes,
    excludes
  },
  {
    path: '/ach-calculator/',
    kind: 'tool',
    toolKind: 'ach',
    h1: 'ACH Calculator',
    title: 'ACH Calculator - Air Changes per Hour from CFM',
    description: 'Calculate air changes per hour from fan CFM and room volume, then compare the result with your target ventilation assumption.',
    faqs: ventilationFaqs,
    includes,
    excludes
  },
  {
    path: '/bathroom-fan-cfm-calculator/',
    kind: 'tool',
    toolKind: 'bathroom-fan',
    h1: 'Bathroom Fan CFM Calculator',
    title: 'Bathroom Fan CFM Calculator - Area and Fixture Rules',
    description: 'Estimate bathroom fan CFM using area and fixture rules, then check duct length, fan rating, noise, controls and local-code caveats.',
    faqs: ventilationFaqs,
    includes,
    excludes
  },
  {
    path: '/garage-ventilation-calculator/',
    kind: 'tool',
    toolKind: 'garage',
    h1: 'Garage Ventilation Calculator',
    title: 'Garage Ventilation Calculator - CFM by ACH',
    description: 'Estimate garage ventilation CFM by ACH with explicit boundaries for carbon monoxide, combustion appliances and code-compliant ventilation design.',
    faqs: ventilationFaqs,
    includes,
    excludes
  },
  {
    path: '/room-ventilation-calculator/',
    kind: 'tool',
    toolKind: 'cfm-by-ach',
    h1: 'Room Ventilation Calculator',
    title: 'Room Ventilation Calculator - CFM from Room Size and ACH',
    description: 'Estimate room ventilation airflow from room dimensions and target ACH, with the formula and assumptions shown beside the result.',
    faqs: ventilationFaqs,
    includes,
    excludes
  },
  {
    path: '/btu-to-tons-calculator/',
    kind: 'tool',
    toolKind: 'tonnage',
    h1: 'BTU to Tons Calculator',
    title: 'BTU to Tons Calculator - Cooling Capacity Conversion',
    description: 'Convert BTU per hour to cooling tons and tons back to BTU per hour for air conditioner capacity comparison.',
    faqs: conversionFaqs,
    includes,
    excludes
  },
  {
    path: '/btu-to-kw-calculator/',
    kind: 'tool',
    toolKind: 'btu-kw',
    h1: 'BTU to kW Calculator',
    title: 'BTU to kW Calculator - Thermal Capacity Conversion',
    description: 'Convert BTU per hour to thermal kW and explain why thermal capacity is different from electrical input power.',
    faqs: conversionFaqs,
    includes,
    excludes
  },
  {
    path: '/pints-to-liters-calculator/',
    kind: 'tool',
    toolKind: 'pints-liters',
    h1: 'Pints to Liters Calculator',
    title: 'Pints to Liters Calculator - Dehumidifier Capacity',
    description: 'Convert dehumidifier pints per day and liters per day while distinguishing moisture-removal capacity from bucket volume.',
    faqs: dehumidifierFaqs,
    includes,
    excludes
  }
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
].map(([slug, h1, relatedToolPath]) => ({
  path: `/guides/${slug}/`,
  kind: 'guide',
  h1,
  title: `${h1} - Formula, Example and Calculator`,
  relatedToolPath,
  description: `Plain-English guide to ${String(h1).toLowerCase()} with formula notes, examples, source context and a related calculator.`,
  directAnswer: `This guide explains ${String(h1).toLowerCase()} for early room-comfort planning. Use it to understand the formula, common assumptions and when to open the related calculator. ${PROFESSIONAL_BOUNDARY}`,
  faqs: standardFaqs
}));

export const longTailPages: ContentPage[] = [
  {
    path: '/room-size/what-size-ac-for-150-sq-ft/',
    kind: 'longtail',
    h1: 'What Size AC for 150 Sq Ft?',
    title: 'What Size AC for 150 Sq Ft? - Worked BTU Example',
    description: 'Worked room AC sizing example for a 150 sq ft room with adjustment notes for sun, occupants, ceiling height and kitchen heat.',
    relatedToolPath: '/room-ac-btu-calculator/',
    directAnswer: 'A 150 sq ft room starts near 3,000 BTU/h before real-world adjustments. Use the calculator to adjust for sun, ceiling height, insulation, occupants and heat sources.'
  },
  {
    path: '/room-size/what-size-ac-for-300-sq-ft/',
    kind: 'longtail',
    h1: 'What Size AC for 300 Sq Ft?',
    title: 'What Size AC for 300 Sq Ft? - Worked BTU Example',
    description: 'Worked room AC sizing example for a 300 sq ft room with common-size context and oversizing notes.',
    relatedToolPath: '/room-ac-btu-calculator/',
    directAnswer: 'A 300 sq ft room starts near 6,000 BTU/h before real-world adjustments. Sun exposure, ceiling height, insulation and kitchen heat can move the practical range.'
  },
  {
    path: '/room-size/what-size-ac-for-500-sq-ft/',
    kind: 'longtail',
    h1: 'What Size AC for 500 Sq Ft?',
    title: 'What Size AC for 500 Sq Ft? - Worked BTU Example',
    description: 'Worked room AC sizing example for a 500 sq ft room, including common AC size comparison and humidity caveats.',
    relatedToolPath: '/room-ac-btu-calculator/',
    directAnswer: 'A 500 sq ft room starts near 10,000 BTU/h before adjustments. Check sun, ceiling height, insulation and humidity before choosing a larger labeled size.'
  },
  {
    path: '/portable-ac/14000-btu-portable-ac-room-size/',
    kind: 'longtail',
    h1: '14,000 BTU Portable AC Room Size',
    title: '14,000 BTU Portable AC Room Size - SACC and Label Checks',
    description: 'Portable AC label interpretation for 14,000 BTU units, SACC ratings, hose losses and realistic room-size comparison.',
    relatedToolPath: '/portable-ac-size-calculator/',
    directAnswer: 'A 14,000 BTU portable AC label does not automatically mean the same practical coverage as a 14,000 BTU window AC. Check SACC, hose design, exhaust sealing and the product label.'
  },
  {
    path: '/dehumidifier/what-size-dehumidifier-for-1000-sq-ft-basement/',
    kind: 'longtail',
    h1: 'What Size Dehumidifier for a 1000 Sq Ft Basement?',
    title: 'What Size Dehumidifier for a 1000 Sq Ft Basement?',
    description: 'Worked dehumidifier sizing example for a 1000 sq ft basement with dampness, temperature, drain and water-source checks.',
    relatedToolPath: '/basement-dehumidifier-size-calculator/',
    directAnswer: 'A 1000 sq ft damp basement commonly lands around 40-60 pints/day before water-source and temperature checks. Very damp or wet basements may need source repair, drainage and professional review.'
  },
  {
    path: '/bathroom-fan/what-size-fan-for-small-bathroom/',
    kind: 'longtail',
    h1: 'What Size Fan for a Small Bathroom?',
    title: 'What Size Fan for a Small Bathroom? - CFM Example',
    description: 'Worked bathroom fan sizing example for a small bathroom with area rule, fixture rule, duct length and local-code caveats.',
    relatedToolPath: '/bathroom-fan-cfm-calculator/',
    directAnswer: 'Small bathrooms generally start at 50 CFM, but duct length, fixtures, fan rating, controls and local code still matter. Use the calculator to compare the area and fixture rules.'
  }
];

export const templatePages: ContentPage[] = [
  {
    path: '/templates/room-ac-sizing-worksheet/',
    kind: 'template',
    h1: 'Room AC Sizing Worksheet',
    title: 'Room AC Sizing Worksheet - Printable Inputs and Checks',
    description: 'Printable worksheet for recording room dimensions, sun exposure, insulation, product labels and AC sizing assumptions.',
    directAnswer: 'Use this worksheet to record dimensions, assumptions, product labels and questions before comparing room AC units or asking a contractor.'
  },
  {
    path: '/templates/basement-humidity-checklist/',
    kind: 'template',
    h1: 'Basement Humidity Checklist',
    title: 'Basement Humidity Checklist - Printable Dehumidifier Notes',
    description: 'Printable checklist for basement dampness, temperature, water sources, drainage, dehumidifier capacity and follow-up checks.',
    directAnswer: 'Use this checklist to record basement dampness, water-source clues, drain access, target humidity and dehumidifier sizing assumptions.'
  },
  {
    path: '/templates/hvac-contractor-questions/',
    kind: 'template',
    h1: 'HVAC Contractor Questions',
    title: 'HVAC Contractor Questions - Sizing, Ventilation and Installation',
    description: 'Printable questions to ask an HVAC contractor about sizing method, ducts, airflow, electrical needs, installation and warranty.',
    directAnswer: 'Use this checklist to ask how sizing was calculated, what assumptions were used, what the installation requires and what should be verified before purchase.'
  }
];

const supportContent: Record<string, { h1: string; title: string; description: string; directAnswer: string }> = {
  about: {
    h1: 'About Room Comfort Calculators',
    title: 'About Room Comfort Calculators',
    description: 'About the browser-side HVAC calculator hub for room AC sizing, dehumidifier sizing, CFM, ACH and unit conversions.',
    directAnswer: 'Room Comfort Calculators provides browser-side tools for early room-level comfort planning. The calculators focus on transparent formulas, visible assumptions, copyable results and source notes so homeowners, renters and small-space planners can compare AC, dehumidifier and ventilation options before buying or asking a professional.'
  },
  contact: {
    h1: 'Contact',
    title: 'Contact',
    description: 'Contact information for Room Comfort Calculators, including feedback, correction and source update requests.',
    directAnswer: 'Use the contact page for correction requests, source suggestions, bug reports and calculator feedback. Do not send sensitive personal, medical, financial, account or property-identifying information through calculator inputs or feedback messages.'
  },
  privacy: {
    h1: 'Privacy Policy',
    title: 'Privacy Policy',
    description: 'Privacy policy for browser-side HVAC calculators, including local calculation, share URLs, analytics and advertising notes.',
    directAnswer: 'The calculators are designed to run in your browser and do not require login. Calculator inputs such as room dimensions, dampness selections and airflow targets are intended to be low-sensitivity planning data. Share URLs may include the inputs you choose so the same estimate can be reopened. If analytics or advertising are enabled, they should be used to understand page performance and support the free site, not to collect sensitive HVAC, health or property-identifying data.'
  },
  terms: {
    h1: 'Terms',
    title: 'Terms',
    description: 'Terms of use for Room Comfort Calculators, including educational use, professional review boundaries and acceptable use.',
    directAnswer: `These calculators are provided for educational, preliminary room-comfort planning. You may use them to compare assumptions, save notes and prepare questions, but you should not treat the results as final design, product approval, installation instruction or code compliance. ${PROFESSIONAL_BOUNDARY}`
  },
  disclaimer: {
    h1: 'Disclaimer',
    title: 'Disclaimer',
    description: 'HVAC, dehumidifier, ventilation, mold, safety and code-compliance disclaimer for Room Comfort Calculators.',
    directAnswer: `Results are preliminary estimates based on simplified inputs and published assumptions. They do not inspect your building, diagnose moisture sources, verify product labels, confirm duct performance, evaluate combustion safety or satisfy local code. ${PROFESSIONAL_BOUNDARY}`
  }
};

export const supportPages: ContentPage[] = Object.entries(supportContent).map(([slug, content]) => ({
  path: `/${slug}/`,
  kind: 'support',
  ...content
}));

export const allContentPages: ContentPage[] = [...allTools, ...guidePages, ...longTailPages, ...templatePages, ...supportPages];
export const allPagePaths = ['/', ...allContentPages.map((page) => page.path)];

export function findPageBySlug(slug: string[]) {
  const path = `/${slug.join('/')}${slug.length ? '/' : ''}`;
  return allContentPages.find((page) => page.path === path);
}
