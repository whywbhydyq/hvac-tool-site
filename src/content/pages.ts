import { PROFESSIONAL_BOUNDARY } from './site';

export type ToolKind = 'ac' | 'window-ac' | 'portable-ac' | 'tonnage' | 'dehumidifier' | 'basement-dehumidifier' | 'cfm-by-ach' | 'ach' | 'bathroom-fan' | 'garage' | 'btu-kw' | 'pints-liters';

export type ContentSection = {
  heading: string;
  body: string[];
  bullets?: string[];
  table?: { headers: string[]; rows: string[][] };
};

export type WorkedExample = {
  title: string;
  inputs: string[];
  result: string;
  explanation: string;
};

export type ContentPage = {
  path: string;
  kind: 'tool' | 'guide' | 'longtail' | 'template' | 'support';
  toolKind?: ToolKind;
  h1: string;
  title: string;
  description: string;
  directAnswer?: string;
  sections?: ContentSection[];
  examples?: WorkedExample[];
  relatedToolPath?: string;
  relatedLinks?: Array<{ path: string; label: string }>;
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

const acSections: ContentSection[] = [
  {
    heading: 'How the AC BTU estimate works',
    body: ['The estimate starts with room area. DOE room-air-conditioner guidance uses 20 BTU per square foot as a common starting point, while ENERGY STAR-style room AC guidance calls out heavy shade, very sunny rooms and extra occupants as adjustment factors. This calculator keeps those assumptions visible and editable. The result is intentionally shown as a range because a quick room calculator cannot know the building envelope, leakage, climate or installation quality.'],
    bullets: ['Measure the conditioned room, not the whole home.', 'Use the high end when the room has high ceilings, strong afternoon sun or poor insulation.', 'Use the result as a shopping range, not as central HVAC design.']
  },
  {
    heading: 'Why oversizing can reduce comfort',
    body: ['A larger unit is not automatically better. If it cools the room too quickly, it may shut off before removing enough humidity. That can leave the room cool but clammy, especially in humid climates or bedrooms with limited air mixing.']
  }
];

const portableSections: ContentSection[] = [
  {
    heading: 'Portable AC labels need extra checking',
    body: ['Portable air conditioners often show more than one capacity value. Practical room coverage should be checked against the current product label, SACC / adjusted-capacity context and installation conditions, not only the largest marketing BTU number. Hose layout, exhaust sealing and whether the model is single-hose or dual-hose can change real performance.'],
    table: { headers: ['Label or condition', 'Why it matters'], rows: [['Large ASHRAE BTU label', 'Can overstate real portable AC room performance.'], ['SACC rating', 'Usually closer to practical adjusted room cooling.'], ['Poor exhaust sealing', 'Can pull hot outdoor air back into the room and reduce comfort.']] }
  }
];

const dehumidifierSections: ContentSection[] = [
  {
    heading: 'How dehumidifier sizing is estimated',
    body: ['The estimate combines area, dampness level, basement condition, temperature and water-source warnings. ENERGY STAR describes dehumidifier size or capacity as pints per 24 hours and notes that the needed capacity depends on both the size of the space and the conditions in that space. The lookup table here is an internal planning assumption, not an official ENERGY STAR sizing table.'],
    bullets: ['Choose a higher range for very damp, wet, cool or below-grade spaces.', 'Continuous drain matters when the unit must run for long periods.', 'Fix water intrusion before relying on appliance capacity alone.']
  },
  {
    heading: 'Moisture-source boundary',
    body: ['A dehumidifier is not waterproofing, mold remediation or a health guarantee. If there is seepage, plumbing leakage, roof leakage, grading failure or visible mold, the moisture source should be reviewed separately.']
  }
];

const ventilationSections: ContentSection[] = [
  {
    heading: 'CFM and ACH formula',
    body: ['CFM is airflow in cubic feet per minute. ACH is air changes per hour. The forward calculation is CFM = room volume × target ACH ÷ 60. The reverse calculation is ACH = CFM × 60 ÷ room volume. This is a math conversion for planning airflow targets, not proof of delivered airflow, indoor air quality or code compliance.'],
    table: { headers: ['Input', 'Meaning'], rows: [['Room volume', 'Length × width × ceiling height.'], ['Target ACH', 'Theoretical room-volume exchanges per hour.'], ['CFM', 'Airflow needed in ideal conditions.']] }
  },
  {
    heading: 'Ventilation caveat',
    body: ['ACH math does not prove indoor air quality or code compliance. Real airflow depends on fan curve, duct length, filters, grilles, controls, pressure differences and local requirements.']
  }
];

const bathroomSections: ContentSection[] = [
  {
    heading: 'Bathroom fan sizing basics',
    body: ['Bathroom fan CFM is commonly estimated from room area and fixture count. HVI guidance for intermittent bathroom ventilation starts bathrooms under 100 square feet at 1 CFM per square foot with a 50 CFM minimum, while larger bathrooms use fixture-based additions for toilets, showers, bathtubs and jetted tubs.'],
    bullets: ['Check duct length and elbows.', 'Exhaust outdoors, not into an attic or wall cavity.', 'Review local code and product instructions before buying.']
  }
];

const defaultSections: ContentSection[] = [
  { heading: 'How to interpret this calculator', body: ['Use the result as a preliminary planning value. The formula and assumptions are shown so you can understand what moved the estimate and decide what should be checked next.'] }
];

export const allTools: ContentPage[] = [
  { path: '/room-ac-btu-calculator/', kind: 'tool', toolKind: 'ac', h1: 'Room AC BTU Calculator', title: 'Room AC BTU Calculator - Estimate Air Conditioner Size', description: 'Estimate a room air conditioner BTU range from room size, ceiling height, sun exposure, occupants, kitchen heat and insulation, then compare common AC sizes.', faqs: acFaqs, includes, excludes, sections: acSections, relatedLinks: [{ path: '/guides/how-many-btu-per-square-foot/', label: 'How many BTU per square foot?' }, { path: '/guides/why-oversized-ac-does-not-dehumidify/', label: 'Why oversized AC does not dehumidify' }, { path: '/room-size/what-size-ac-for-300-sq-ft/', label: '300 sq ft AC example' }] },
  { path: '/window-ac-size-calculator/', kind: 'tool', toolKind: 'window-ac', h1: 'Window Air Conditioner Size Calculator', title: 'Window AC Size Calculator - BTU Range by Room Size', description: 'Estimate a window AC BTU range and review oversizing, humidity, window fit, CEER/EER, noise, drainage and installation checks before buying.', faqs: acFaqs, includes, excludes, sections: acSections, relatedLinks: [{ path: '/room-ac-btu-calculator/', label: 'Room AC BTU calculator' }, { path: '/guides/why-oversized-ac-does-not-dehumidify/', label: 'Oversizing and humidity guide' }] },
  { path: '/portable-ac-size-calculator/', kind: 'tool', toolKind: 'portable-ac', h1: 'Portable AC Size Calculator', title: 'Portable AC Size Calculator - BTU and SACC Estimate', description: 'Estimate portable AC capacity from room inputs and understand SACC, ASHRAE BTU labels, hose losses, exhaust sealing and product label checks.', faqs: acFaqs, includes, excludes, sections: portableSections, relatedLinks: [{ path: '/guides/portable-ac-sacc-vs-btu/', label: 'SACC vs BTU guide' }, { path: '/portable-ac/14000-btu-portable-ac-room-size/', label: '14,000 BTU portable AC example' }] },
  { path: '/ac-tonnage-calculator/', kind: 'tool', toolKind: 'tonnage', h1: 'AC Tonnage Calculator', title: 'AC Tonnage Calculator - Convert BTU to Tons', description: 'Convert BTU per hour to cooling tons and thermal kW while keeping room estimates separate from central HVAC system sizing.', faqs: conversionFaqs, includes, excludes, sections: defaultSections, relatedLinks: [{ path: '/guides/what-is-ac-tonnage/', label: 'What is AC tonnage?' }, { path: '/btu-to-kw-calculator/', label: 'BTU to kW calculator' }] },
  { path: '/dehumidifier-size-calculator/', kind: 'tool', toolKind: 'dehumidifier', h1: 'Dehumidifier Size Calculator', title: 'Dehumidifier Size Calculator - Pints per Day Estimate', description: 'Estimate dehumidifier pints per day by room area, dampness level, basement condition, temperature, water intrusion and continuous drain access.', faqs: dehumidifierFaqs, includes, excludes, sections: dehumidifierSections, relatedLinks: [{ path: '/guides/dehumidifier-pints-explained/', label: 'Dehumidifier pints explained' }, { path: '/guides/30-pint-vs-50-pint-dehumidifier/', label: '30 pint vs 50 pint' }] },
  { path: '/basement-dehumidifier-size-calculator/', kind: 'tool', toolKind: 'basement-dehumidifier', h1: 'Basement Dehumidifier Size Calculator', title: 'Basement Dehumidifier Size Calculator - Pints per Day', description: 'Estimate basement dehumidifier size with dampness level, cool-temperature adjustment, water intrusion checks and continuous-drain planning.', faqs: dehumidifierFaqs, includes, excludes, sections: dehumidifierSections, relatedLinks: [{ path: '/guides/what-size-dehumidifier-for-basement/', label: 'Basement dehumidifier guide' }, { path: '/templates/basement-humidity-checklist/', label: 'Basement humidity checklist' }] },
  { path: '/cfm-by-ach-calculator/', kind: 'tool', toolKind: 'cfm-by-ach', h1: 'CFM by ACH Calculator', title: 'CFM by ACH Calculator - Airflow from Room Volume', description: 'Calculate required CFM from room volume and target ACH for early ventilation planning, with formula, assumptions and code-compliance boundaries.', faqs: ventilationFaqs, includes, excludes, sections: ventilationSections, relatedLinks: [{ path: '/guides/cfm-vs-ach/', label: 'CFM vs ACH guide' }, { path: '/ach-calculator/', label: 'ACH calculator' }] },
  { path: '/ach-calculator/', kind: 'tool', toolKind: 'ach', h1: 'ACH Calculator', title: 'ACH Calculator - Air Changes per Hour from CFM', description: 'Calculate air changes per hour from fan CFM and room volume, then compare the result with your target ventilation assumption.', faqs: ventilationFaqs, includes, excludes, sections: ventilationSections, relatedLinks: [{ path: '/cfm-by-ach-calculator/', label: 'CFM by ACH calculator' }, { path: '/guides/cfm-vs-ach/', label: 'CFM vs ACH guide' }] },
  { path: '/bathroom-fan-cfm-calculator/', kind: 'tool', toolKind: 'bathroom-fan', h1: 'Bathroom Fan CFM Calculator', title: 'Bathroom Fan CFM Calculator - Area and Fixture Rules', description: 'Estimate bathroom fan CFM using area and fixture rules, then check duct length, fan rating, noise, controls and local-code caveats.', faqs: ventilationFaqs, includes, excludes, sections: bathroomSections, relatedLinks: [{ path: '/guides/bathroom-fan-cfm-guide/', label: 'Bathroom fan CFM guide' }, { path: '/bathroom-fan/what-size-fan-for-small-bathroom/', label: 'Small bathroom fan example' }] },
  { path: '/garage-ventilation-calculator/', kind: 'tool', toolKind: 'garage', h1: 'Garage Ventilation Calculator', title: 'Garage Ventilation Calculator - CFM by ACH', description: 'Estimate garage ventilation CFM by ACH with explicit boundaries for carbon monoxide, combustion appliances and code-compliant ventilation design.', faqs: ventilationFaqs, includes, excludes, sections: ventilationSections, relatedLinks: [{ path: '/cfm-by-ach-calculator/', label: 'CFM by ACH calculator' }] },
  { path: '/room-ventilation-calculator/', kind: 'tool', toolKind: 'cfm-by-ach', h1: 'Room Ventilation Calculator', title: 'Room Ventilation Calculator - CFM from Room Size and ACH', description: 'Estimate room ventilation airflow from room dimensions and target ACH, with the formula and assumptions shown beside the result.', faqs: ventilationFaqs, includes, excludes, sections: ventilationSections, relatedLinks: [{ path: '/cfm-by-ach-calculator/', label: 'CFM by ACH calculator' }, { path: '/guides/cfm-vs-ach/', label: 'CFM vs ACH guide' }] },
  { path: '/btu-to-tons-calculator/', kind: 'tool', toolKind: 'tonnage', h1: 'BTU to Tons Calculator', title: 'BTU to Tons Calculator - Cooling Capacity Conversion', description: 'Convert BTU per hour to cooling tons and tons back to BTU per hour for air conditioner capacity comparison.', faqs: conversionFaqs, includes, excludes, sections: defaultSections, relatedLinks: [{ path: '/ac-tonnage-calculator/', label: 'AC tonnage calculator' }] },
  { path: '/btu-to-kw-calculator/', kind: 'tool', toolKind: 'btu-kw', h1: 'BTU to kW Calculator', title: 'BTU to kW Calculator - Thermal Capacity Conversion', description: 'Convert BTU per hour to thermal kW and explain why thermal capacity is different from electrical input power.', faqs: conversionFaqs, includes, excludes, sections: defaultSections, relatedLinks: [{ path: '/btu-to-tons-calculator/', label: 'BTU to tons calculator' }] },
  { path: '/pints-to-liters-calculator/', kind: 'tool', toolKind: 'pints-liters', h1: 'Pints to Liters Calculator', title: 'Pints to Liters Calculator - Dehumidifier Capacity', description: 'Convert dehumidifier pints per day and liters per day while distinguishing moisture-removal capacity from bucket volume.', faqs: dehumidifierFaqs, includes, excludes, sections: defaultSections, relatedLinks: [{ path: '/guides/dehumidifier-pints-explained/', label: 'Dehumidifier pints explained' }] }
];

const guideCopy: Record<string, { sections: ContentSection[]; examples?: WorkedExample[]; relatedLinks: Array<{ path: string; label: string }> }> = {
  'how-many-btu-per-square-foot': {
    sections: [
      { heading: 'The common starting rule', body: ['A common quick estimate for room air conditioners starts near 20 BTU per square foot. That number is useful because it gives a simple first pass from floor area, but it is not a final equipment decision. The calculator keeps the area rule visible and then lets room conditions move the result.'] },
      { heading: 'When to adjust the number', body: ['Move the estimate upward when the room has strong afternoon sun, a high ceiling, poor insulation, kitchen heat or more regular occupants. Move cautiously downward only when the room is shaded, well insulated and lightly used.'] },
      { heading: 'Source boundary', body: ['The 20 BTU per square foot rule belongs on room, window and portable AC planning pages. It does not replace ACCA Manual J, duct review, electrical review or product installation requirements.'] }
    ],
    examples: [{ title: '300 sq ft room', inputs: ['300 sq ft', 'Average ceiling', 'Average sun'], result: 'About 6,000 BTU/h before adjustments', explanation: 'The room starts at 300 × 20. The calculator then applies room-condition adjustments.' }],
    relatedLinks: [{ path: '/room-ac-btu-calculator/', label: 'Room AC BTU calculator' }, { path: '/room-size/what-size-ac-for-300-sq-ft/', label: '300 sq ft AC example' }, { path: '/guides/why-oversized-ac-does-not-dehumidify/', label: 'Oversizing and humidity guide' }]
  },
  'why-oversized-ac-does-not-dehumidify': {
    sections: [
      { heading: 'Cooling time and moisture removal', body: ['An oversized room AC can satisfy the thermostat quickly, then shut off before running long enough to remove moisture from the air. That is why a room can feel cold but still damp or clammy.'] },
      { heading: 'Practical sizing check', body: ['Avoid jumping far above the estimated range unless there is a specific reason such as major sun exposure, high ceilings, kitchen heat or weak insulation. A right-sized unit often gives better comfort than a much larger unit because it can run long enough to mix air and remove humidity.'] },
      { heading: 'What this guide does not prove', body: ['This guide explains a room-comfort pattern. It does not diagnose duct performance, refrigerant charge, central equipment sizing, mold, medical comfort or building-code compliance.'] }
    ],
    examples: [{ title: 'Cold but clammy bedroom', inputs: ['Small bedroom', 'Oversized unit', 'Short cycling'], result: 'Check whether the unit is above the practical range', explanation: 'If the compressor shuts off too quickly, the air can cool before enough moisture is removed.' }],
    relatedLinks: [{ path: '/room-ac-btu-calculator/', label: 'Room AC BTU calculator' }, { path: '/guides/how-many-btu-per-square-foot/', label: 'BTU per square foot guide' }, { path: '/dehumidifier-size-calculator/', label: 'Dehumidifier calculator' }]
  },
  'portable-ac-sacc-vs-btu': {
    sections: [
      { heading: 'Why two BTU numbers appear', body: ['Portable AC units may show a large BTU value and a lower adjusted capacity value. For practical room comparison, the adjusted capacity or SACC context is usually more useful than the largest marketing BTU number.'] },
      { heading: 'What to check before buying', body: ['Check the current product label, hose layout, window kit seal, drainage path, noise rating and whether the unit is single-hose or dual-hose. Poor exhaust sealing can pull hot outdoor air back into the room and reduce real comfort.'] },
      { heading: 'Calculator boundary', body: ['Use the portable AC calculator to compare room load against label context. Do not treat a 14,000 BTU marketing label as equivalent to a 14,000 BTU window AC in the same room.'] }
    ],
    examples: [{ title: '14,000 BTU portable label', inputs: ['Large BTU label', 'Separate SACC value', 'Single-hose installation'], result: 'Use the SACC or adjusted-capacity value for practical comparison', explanation: 'The large label alone can overstate practical room cooling because exhaust and infiltration losses matter.' }],
    relatedLinks: [{ path: '/portable-ac-size-calculator/', label: 'Portable AC calculator' }, { path: '/portable-ac/14000-btu-portable-ac-room-size/', label: '14,000 BTU portable AC example' }, { path: '/room-ac-btu-calculator/', label: 'Room AC BTU calculator' }]
  },
  '30-pint-vs-50-pint-dehumidifier': {
    sections: [
      { heading: 'Capacity is moisture removal', body: ['A 30 pint or 50 pint dehumidifier label refers to daily moisture removal under rating conditions. It is not the same thing as bucket size. Bucket volume only affects how often the tank must be emptied.'] },
      { heading: 'When 50 pint is safer', body: ['Use the larger class when the space is a basement, very damp, cool, used continuously, connected to laundry moisture or affected by uncertain water-source conditions. Continuous drain access can matter as much as the capacity number.'] },
      { heading: 'Source boundary', body: ['This site uses pints/day as a planning output and marks its sizing table as an internal assumption. It does not claim to reproduce an official ENERGY STAR sizing table.'] }
    ],
    examples: [{ title: 'Damp basement comparison', inputs: ['800-1000 sq ft', 'Damp or very damp', 'Below grade'], result: 'Compare the mid-size and large pints/day classes', explanation: 'A larger class may be safer for continuous operation, but seepage or leaks still need source repair.' }],
    relatedLinks: [{ path: '/dehumidifier-size-calculator/', label: 'Dehumidifier calculator' }, { path: '/guides/dehumidifier-pints-explained/', label: 'Pints explained' }, { path: '/templates/basement-humidity-checklist/', label: 'Basement humidity checklist' }]
  },
  'what-size-dehumidifier-for-basement': {
    sections: [
      { heading: 'Basements need extra caution', body: ['Basements are often cooler, below grade and more exposed to water-source problems. The same square footage can require a higher dehumidifier class than an upstairs room, especially if the basement is damp after rain or lacks continuous drain access.'] },
      { heading: 'Capacity is not waterproofing', body: ['If water enters the basement, address grading, drainage, plumbing, foundation, roof or envelope problems before expecting a dehumidifier to solve the issue. A dehumidifier can remove moisture from air; it cannot stop water intrusion.'] },
      { heading: 'What to record before buying', body: ['Record basement area, typical humidity, temperature, dampness level, visible seepage, drain access and whether the problem changes after rain. Use the checklist template if those details are not clear yet.'] }
    ],
    examples: [{ title: '1000 sq ft damp basement', inputs: ['1000 sq ft', 'Damp', 'Below grade'], result: 'Often around 40-60 pints/day before water-source checks', explanation: 'Very damp or wet conditions push the range upward and may require source repair.' }],
    relatedLinks: [{ path: '/basement-dehumidifier-size-calculator/', label: 'Basement dehumidifier calculator' }, { path: '/dehumidifier/what-size-dehumidifier-for-1000-sq-ft-basement/', label: '1000 sq ft basement example' }, { path: '/templates/basement-humidity-checklist/', label: 'Basement humidity checklist' }]
  },
  'cfm-vs-ach': {
    sections: [
      ...ventilationSections,
      { heading: 'When each value is useful', body: ['Use CFM when comparing fan airflow or product ratings. Use ACH when the question is how many theoretical room-volume exchanges occur per hour. The two values are connected by room volume, so neither should be interpreted without dimensions.'] },
      { heading: 'Code and delivered-airflow boundary', body: ['CFM / ACH math does not prove code compliance or indoor air quality. Real airflow can be reduced by filters, grilles, duct length, fan curve, pressure differences and controls.'] }
    ],
    examples: [{ title: '12 × 10 × 8 room at 6 ACH', inputs: ['960 cubic feet', '6 ACH target'], result: '96 CFM', explanation: '960 × 6 ÷ 60 = 96 CFM in ideal conditions.' }],
    relatedLinks: [{ path: '/cfm-by-ach-calculator/', label: 'CFM by ACH calculator' }, { path: '/ach-calculator/', label: 'ACH calculator' }, { path: '/room-ventilation-calculator/', label: 'Room ventilation calculator' }]
  },
  'bathroom-fan-cfm-guide': {
    sections: [
      ...bathroomSections,
      { heading: 'Area rule vs fixture rule', body: ['Small bathrooms often start from area with a minimum fan class, while larger or more complex bathrooms should also check toilets, showers, bathtubs and jetted tubs. The calculator shows both ideas so users can compare the controlling assumption.'] },
      { heading: 'Delivered airflow boundary', body: ['A fan label is not always the same as delivered airflow at the grille. Long duct runs, elbows, caps, undersized ducts and poor installation can reduce actual performance.'] }
    ],
    examples: [{ title: 'Small bathroom', inputs: ['45 sq ft', 'Toilet and shower'], result: 'Start near 50 CFM, then check fixture and duct conditions', explanation: 'Small rooms commonly start at the minimum class, but duct losses and code can move the decision.' }],
    relatedLinks: [{ path: '/bathroom-fan-cfm-calculator/', label: 'Bathroom fan CFM calculator' }, { path: '/bathroom-fan/what-size-fan-for-small-bathroom/', label: 'Small bathroom fan example' }, { path: '/cfm-by-ach-calculator/', label: 'CFM by ACH calculator' }]
  },
  'what-is-ac-tonnage': {
    sections: [
      { heading: 'One ton equals 12,000 BTU per hour', body: ['Cooling tonnage is a capacity unit. It is useful for conversions and product comparison, but it is not a substitute for central HVAC equipment selection or duct design.'] },
      { heading: 'Do not use tonnage alone for room sizing', body: ['A quick BTU-to-tons conversion does not account for room area, sun, occupancy, insulation, duct losses or central-system design. Use it as a unit conversion, then return to the room calculator or a professional load calculation when sizing equipment.'] }
    ],
    examples: [{ title: '24,000 BTU/h', inputs: ['24,000 BTU/h'], result: '2 tons', explanation: '24,000 ÷ 12,000 = 2. This is a unit conversion, not equipment approval.' }],
    relatedLinks: [{ path: '/ac-tonnage-calculator/', label: 'AC tonnage calculator' }, { path: '/btu-to-tons-calculator/', label: 'BTU to tons calculator' }, { path: '/room-ac-btu-calculator/', label: 'Room AC BTU calculator' }]
  },
  'dehumidifier-pints-explained': {
    sections: [
      { heading: 'Pints per day is not bucket size', body: ['Pints per day describes how much moisture a dehumidifier can remove under rating conditions. Bucket size only determines how often the tank may need to be emptied.'] },
      { heading: 'Why room conditions still matter', body: ['A capacity label does not know your basement temperature, water source, drain access, humidity target or airflow. Those conditions can change whether a model is practical for a space.'] },
      { heading: 'What the calculator can and cannot do', body: ['The calculator can compare a planning pints/day range. It cannot identify leaks, repair water intrusion, remove mold or guarantee a specific humidity level in every condition.'] }
    ],
    examples: [{ title: '50 pint class', inputs: ['Damp basement', 'Continuous use', 'Drain nearby'], result: 'Often a more practical class than a smaller bucket-only comparison', explanation: 'Capacity and drainage should be considered separately.' }],
    relatedLinks: [{ path: '/dehumidifier-size-calculator/', label: 'Dehumidifier calculator' }, { path: '/pints-to-liters-calculator/', label: 'Pints to liters calculator' }, { path: '/guides/30-pint-vs-50-pint-dehumidifier/', label: '30 pint vs 50 pint guide' }]
  }
};

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
].map(([slug, h1, relatedToolPath]) => ({ path: `/guides/${slug}/`, kind: 'guide', h1, title: `${h1} - Formula, Example and Calculator`, relatedToolPath, description: `Plain-English guide to ${String(h1).toLowerCase()} with formula notes, examples, source context and a related calculator.`, directAnswer: `This guide explains ${String(h1).toLowerCase()} for early room-comfort planning. Use it to understand the formula, common assumptions and when to open the related calculator. ${PROFESSIONAL_BOUNDARY}`, faqs: standardFaqs, sections: guideCopy[String(slug)].sections, examples: guideCopy[String(slug)].examples, relatedLinks: guideCopy[String(slug)].relatedLinks }));

function longTailSections(topic: string, estimate: string): ContentSection[] {
  return [
    { heading: 'Quick estimate', body: [estimate] },
    { heading: 'What can move the result', body: ['Real rooms vary. Sun exposure, ceiling height, insulation, kitchen heat, moisture, ducts, drain access, product labels and installation details can all move a quick estimate. Use the related calculator when any condition is uncertain.'] },
    { heading: 'When to get professional help', body: [`Do not use this ${topic} example for central HVAC design, electrical work, code compliance, mold remediation, combustion safety or final product approval.`] }
  ];
}

export const longTailPages: ContentPage[] = [
  { path: '/room-size/what-size-ac-for-150-sq-ft/', kind: 'longtail', h1: 'What Size AC for 150 Sq Ft?', title: 'What Size AC for 150 Sq Ft? - Worked BTU Example', description: 'Worked room AC sizing example for a 150 sq ft room with adjustment notes for sun, occupants, ceiling height and kitchen heat.', relatedToolPath: '/room-ac-btu-calculator/', directAnswer: 'A 150 sq ft room starts near 3,000 BTU/h before real-world adjustments. Use the calculator to adjust for sun, ceiling height, insulation, occupants and heat sources.', sections: longTailSections('AC sizing', 'A 150 sq ft room starts around 150 × 20 = 3,000 BTU/h before adjustments.'), examples: [{ title: '150 sq ft room', inputs: ['150 sq ft', 'Average sun', 'Standard ceiling'], result: 'About 3,000 BTU/h before adjustments', explanation: 'The estimate should be adjusted upward for strong sun, kitchen heat or poor insulation.' }], relatedLinks: [{ path: '/room-ac-btu-calculator/', label: 'Room AC BTU calculator' }, { path: '/room-size/what-size-ac-for-300-sq-ft/', label: '300 sq ft AC example' }, { path: '/room-size/what-size-ac-for-500-sq-ft/', label: '500 sq ft AC example' }, { path: '/guides/how-many-btu-per-square-foot/', label: 'BTU per square foot guide' }] },
  { path: '/room-size/what-size-ac-for-300-sq-ft/', kind: 'longtail', h1: 'What Size AC for 300 Sq Ft?', title: 'What Size AC for 300 Sq Ft? - Worked BTU Example', description: 'Worked room AC sizing example for a 300 sq ft room with common-size context and oversizing notes.', relatedToolPath: '/room-ac-btu-calculator/', directAnswer: 'A 300 sq ft room starts near 6,000 BTU/h before real-world adjustments. Sun exposure, ceiling height, insulation and kitchen heat can move the practical range.', sections: longTailSections('AC sizing', 'A 300 sq ft room starts around 300 × 20 = 6,000 BTU/h before adjustments.'), examples: [{ title: '300 sq ft room', inputs: ['300 sq ft', 'Average sun', 'Two occupants'], result: 'About 6,000 BTU/h before adjustments', explanation: 'Choose a product class near the adjusted calculator range rather than assuming bigger is always better.' }], relatedLinks: [{ path: '/room-ac-btu-calculator/', label: 'Room AC BTU calculator' }, { path: '/room-size/what-size-ac-for-150-sq-ft/', label: '150 sq ft AC example' }, { path: '/room-size/what-size-ac-for-500-sq-ft/', label: '500 sq ft AC example' }, { path: '/guides/why-oversized-ac-does-not-dehumidify/', label: 'Oversized AC guide' }] },
  { path: '/room-size/what-size-ac-for-500-sq-ft/', kind: 'longtail', h1: 'What Size AC for 500 Sq Ft?', title: 'What Size AC for 500 Sq Ft? - Worked BTU Example', description: 'Worked room AC sizing example for a 500 sq ft room, including common AC size comparison and humidity caveats.', relatedToolPath: '/room-ac-btu-calculator/', directAnswer: 'A 500 sq ft room starts near 10,000 BTU/h before adjustments. Check sun, ceiling height, insulation and humidity before choosing a larger labeled size.', sections: longTailSections('AC sizing', 'A 500 sq ft room starts around 500 × 20 = 10,000 BTU/h before adjustments.'), examples: [{ title: '500 sq ft room', inputs: ['500 sq ft', 'Standard ceiling', 'Average insulation'], result: 'About 10,000 BTU/h before adjustments', explanation: 'High sun or kitchen heat can push the practical range higher.' }], relatedLinks: [{ path: '/room-ac-btu-calculator/', label: 'Room AC BTU calculator' }, { path: '/window-ac-size-calculator/', label: 'Window AC calculator' }, { path: '/room-size/what-size-ac-for-300-sq-ft/', label: '300 sq ft AC example' }, { path: '/portable-ac/14000-btu-portable-ac-room-size/', label: 'Portable AC comparison' }] },
  { path: '/portable-ac/14000-btu-portable-ac-room-size/', kind: 'longtail', h1: '14,000 BTU Portable AC Room Size', title: '14,000 BTU Portable AC Room Size - SACC and Label Checks', description: 'Portable AC label interpretation for 14,000 BTU units, SACC ratings, hose losses and realistic room-size comparison.', relatedToolPath: '/portable-ac-size-calculator/', directAnswer: 'A 14,000 BTU portable AC label does not automatically mean the same practical coverage as a 14,000 BTU window AC. Check SACC, hose design, exhaust sealing and the product label.', sections: longTailSections('portable AC sizing', 'A 14,000 BTU portable label should be compared against SACC and installation conditions before assuming room coverage.'), relatedLinks: [{ path: '/portable-ac-size-calculator/', label: 'Portable AC calculator' }, { path: '/guides/portable-ac-sacc-vs-btu/', label: 'SACC vs BTU guide' }, { path: '/room-size/what-size-ac-for-500-sq-ft/', label: '500 sq ft AC example' }, { path: '/room-ac-btu-calculator/', label: 'Room AC BTU calculator' }] },
  { path: '/dehumidifier/what-size-dehumidifier-for-1000-sq-ft-basement/', kind: 'longtail', h1: 'What Size Dehumidifier for a 1000 Sq Ft Basement?', title: 'What Size Dehumidifier for a 1000 Sq Ft Basement?', description: 'Worked dehumidifier sizing example for a 1000 sq ft basement with dampness, temperature, drain and water-source checks.', relatedToolPath: '/basement-dehumidifier-size-calculator/', directAnswer: 'A 1000 sq ft damp basement commonly lands around 40-60 pints/day before water-source and temperature checks. Very damp or wet basements may need source repair, drainage and professional review.', sections: longTailSections('dehumidifier sizing', 'A 1000 sq ft damp basement often starts around the 40-60 pints/day class, then moves based on wetness, temperature and water source.'), relatedLinks: [{ path: '/basement-dehumidifier-size-calculator/', label: 'Basement dehumidifier calculator' }, { path: '/dehumidifier-size-calculator/', label: 'Room dehumidifier calculator' }, { path: '/guides/30-pint-vs-50-pint-dehumidifier/', label: '30 pint vs 50 pint guide' }, { path: '/templates/basement-humidity-checklist/', label: 'Basement humidity checklist' }] },
  { path: '/bathroom-fan/what-size-fan-for-small-bathroom/', kind: 'longtail', h1: 'What Size Fan for a Small Bathroom?', title: 'What Size Fan for a Small Bathroom? - CFM Example', description: 'Worked bathroom fan sizing example for a small bathroom with area rule, fixture rule, duct length and local-code caveats.', relatedToolPath: '/bathroom-fan-cfm-calculator/', directAnswer: 'Small bathrooms generally start at 50 CFM, but duct length, fixtures, fan rating, controls and local code still matter. Use the calculator to compare the area and fixture rules.', sections: longTailSections('bathroom fan sizing', 'A small bathroom commonly starts at 50 CFM, then fixture count and duct conditions can move the recommendation.'), relatedLinks: [{ path: '/bathroom-fan-cfm-calculator/', label: 'Bathroom fan calculator' }, { path: '/guides/bathroom-fan-cfm-guide/', label: 'Bathroom fan guide' }, { path: '/cfm-by-ach-calculator/', label: 'CFM by ACH calculator' }, { path: '/room-ventilation-calculator/', label: 'Room ventilation calculator' }] }
];

export const templatePages: ContentPage[] = [
  { path: '/templates/room-ac-sizing-worksheet/', kind: 'template', h1: 'Room AC Sizing Worksheet', title: 'Room AC Sizing Worksheet - Printable Inputs and Checks', description: 'Printable worksheet for recording room dimensions, sun exposure, insulation, product labels and AC sizing assumptions.', directAnswer: 'Use this worksheet to record dimensions, assumptions, product labels and questions before comparing room AC units or asking a contractor.', sections: [{ heading: 'What to record', body: ['Record dimensions, ceiling height, sun exposure, shade, insulation, kitchen heat, typical occupants, product labels and installation questions.'] }], relatedLinks: [{ path: '/room-ac-btu-calculator/', label: 'Room AC BTU calculator' }] },
  { path: '/templates/basement-humidity-checklist/', kind: 'template', h1: 'Basement Humidity Checklist', title: 'Basement Humidity Checklist - Printable Dehumidifier Notes', description: 'Printable checklist for basement dampness, temperature, water sources, drainage, dehumidifier capacity and follow-up checks.', directAnswer: 'Use this checklist to record basement dampness, water-source clues, drain access, target humidity and dehumidifier sizing assumptions.', sections: [{ heading: 'Checklist items', body: ['Record visible seepage, musty odor, humidity reading, temperature, drain access and whether the issue changes after rain.'] }], relatedLinks: [{ path: '/basement-dehumidifier-size-calculator/', label: 'Basement dehumidifier calculator' }] },
  { path: '/templates/hvac-contractor-questions/', kind: 'template', h1: 'HVAC Contractor Questions', title: 'HVAC Contractor Questions - Sizing, Ventilation and Installation', description: 'Printable questions to ask an HVAC contractor about sizing method, ducts, airflow, electrical needs, installation and warranty.', directAnswer: 'Use this checklist to ask how sizing was calculated, what assumptions were used, what the installation requires and what should be verified before purchase.', sections: [{ heading: 'Questions to ask', body: ['Ask whether a load calculation was performed, whether ducts and airflow were checked, how humidity is handled, and what code, permit or product requirements apply.'] }], relatedLinks: [{ path: '/disclaimer/', label: 'Disclaimer' }] }
];

const supportContent: Record<string, { h1: string; title: string; description: string; directAnswer: string; sections: ContentSection[] }> = {
  about: { h1: 'About Room Comfort Calculators', title: 'About Room Comfort Calculators', description: 'About the browser-side HVAC calculator hub for room AC sizing, dehumidifier sizing, CFM, ACH and unit conversions.', directAnswer: 'Room Comfort Calculators provides browser-side tools for early room-level comfort planning. The calculators focus on transparent formulas, visible assumptions, copyable results and source notes so homeowners, renters and small-space planners can compare AC, dehumidifier and ventilation options before buying or asking a professional.', sections: [{ heading: 'Purpose', body: ['The site helps users make preliminary room comfort decisions with visible formulas, assumptions and source notes.'] }, { heading: 'Boundary', body: [PROFESSIONAL_BOUNDARY] }] },
  contact: { h1: 'Contact Room Comfort Calculators', title: 'Contact', description: 'Contact information for Room Comfort Calculators, including feedback, correction and source update requests.', directAnswer: 'Use the contact page for correction requests, source suggestions, bug reports and calculator feedback. Do not send sensitive personal, medical, financial, account or property-identifying information through calculator inputs or feedback messages.', sections: [{ heading: 'Contact email', body: ['Email: aren.ymir@gmail.com'] }, { heading: 'What to include', body: ['Include the page URL, the calculator inputs that produced the concern, what appears incorrect, what result you expected, and any official source or product manual that should be reviewed. Do not send sensitive personal, medical, financial, account, or property-identifying information.'] }] },
  privacy: { h1: 'Privacy Policy', title: 'Privacy Policy', description: 'Privacy policy for browser-side HVAC calculators, including local calculation, share URLs, analytics and advertising notes.', directAnswer: 'The calculators are designed to run in your browser and do not require login. Calculator inputs such as room dimensions, dampness selections and airflow targets are intended to be low-sensitivity planning data.', sections: [{ heading: 'Calculator inputs', body: ['The tools ask for non-sensitive room values such as dimensions, dampness level and airflow targets. They do not require an account or file upload.'] }, { heading: 'Analytics, ads and cookies', body: ['The site may use hosting logs, privacy-conscious analytics, Google AdSense or other advertising systems. Those services may use cookies or similar technologies according to their own policies.'] }, { heading: 'Share URLs and third-party links', body: ['If a share URL includes inputs, anyone with that URL may see them. Source links and references lead to third-party sites with their own policies.'] }] },
  terms: { h1: 'Terms of Use', title: 'Terms of Use', description: 'Terms of use for Room Comfort Calculators, including educational use, professional review boundaries and acceptable use.', directAnswer: `These calculators are provided for educational, preliminary room-comfort planning. You may use them to compare assumptions, save notes and prepare questions, but you should not treat the results as final design, product approval, installation instruction or code compliance. ${PROFESSIONAL_BOUNDARY}`, sections: [{ heading: 'Educational use', body: ['Results are approximate and depend on the inputs and assumptions shown on each page.'] }, { heading: 'No professional relationship', body: ['Using the site does not create a contractor, engineer, consultant, inspector, medical, legal or safety professional relationship.'] }, { heading: 'Acceptable use', body: ['Do not misuse the site, interfere with its operation, or represent calculator output as certified professional design.'] }] },
  disclaimer: { h1: 'HVAC Calculator Disclaimer', title: 'Disclaimer', description: 'HVAC, dehumidifier, ventilation, mold, safety and code-compliance disclaimer for Room Comfort Calculators.', directAnswer: `Results are preliminary estimates based on simplified inputs and published assumptions. They do not inspect your building, diagnose moisture sources, verify product labels, confirm duct performance, evaluate combustion safety or satisfy local code. ${PROFESSIONAL_BOUNDARY}`, sections: [{ heading: 'Preliminary estimates only', body: ['Calculator outputs are rough educational estimates and not guarantees of comfort, performance, air quality, moisture control or energy use.'] }, { heading: 'Not code, safety or installation advice', body: ['The site does not determine local code compliance, electrical sizing, refrigerant work, combustion safety, permits, product installation or manufacturer requirements.'] }, { heading: 'Not mold or health advice', body: ['Dehumidifier and ventilation content is not mold remediation, waterproofing, medical advice or an indoor air quality guarantee.'] }] }
};

export const supportPages: ContentPage[] = Object.entries(supportContent).map(([slug, content]) => ({ path: `/${slug}/`, kind: 'support', ...content }));

export const allContentPages: ContentPage[] = [...allTools, ...guidePages, ...longTailPages, ...templatePages, ...supportPages];
export const allPagePaths = ['/', ...allContentPages.map((page) => page.path)];

export function findPageBySlug(slug: string[]) {
  const path = `/${slug.join('/')}${slug.length ? '/' : ''}`;
  return allContentPages.find((page) => page.path === path);
}
