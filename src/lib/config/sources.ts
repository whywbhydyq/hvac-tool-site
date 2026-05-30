export type Source = {
  id: string;
  name: string;
  url: string;
  lastCheckedAt: string;
  notes: string;
};

export const SOURCES: Source[] = [
  {
    id: 'doe-room-ac',
    name: 'DOE Room Air Conditioners',
    url: 'https://www.energy.gov/energysaver/room-air-conditioners',
    lastCheckedAt: '2026-05-30',
    notes: 'Used for the 20 BTU per square foot room AC starting point and for caveats that room height, climate, shading and windows can move the estimate.'
  },
  {
    id: 'energy-star-room-ac',
    name: 'ENERGY STAR Room Air Conditioners',
    url: 'https://www.energystar.gov/products/room_air_conditioners',
    lastCheckedAt: '2026-05-30',
    notes: 'Used for room AC adjustment context: reduce capacity for heavy shade, increase for very sunny rooms, and add capacity for additional occupants.'
  },
  {
    id: 'doe-portable-ac',
    name: 'DOE Portable Air Conditioners Test Procedure',
    url: 'https://www.energy.gov/eere/buildings/articles/energy-conservation-program-test-procedure-portable-air-conditioners',
    lastCheckedAt: '2026-05-30',
    notes: 'Used for portable AC label caution. Portable AC comparisons should check the current label and adjusted capacity context rather than relying only on the largest marketing BTU value.'
  },
  {
    id: 'energy-star-dehumidifier',
    name: 'ENERGY STAR Dehumidifiers',
    url: 'https://www.energystar.gov/products/dehumidifiers',
    lastCheckedAt: '2026-05-30',
    notes: 'Used for dehumidifier capacity context: capacity is usually measured in pints per 24 hours and depends on both space size and existing conditions.'
  },
  {
    id: 'energy-star-dehumidifier-testing',
    name: 'ENERGY STAR Dehumidifier Testing and Capacity',
    url: 'https://www.energystar.gov/products/dehumidifier_testing_and_capacity',
    lastCheckedAt: '2026-05-30',
    notes: 'Used to distinguish pints/day moisture-removal capacity and efficiency testing from bucket volume or waterproofing claims.'
  },
  {
    id: 'hvi-how-much-ventilation',
    name: 'Home Ventilating Institute: How Much Ventilation Do I Need?',
    url: 'https://www.hvi.org/resources/publications/home-ventilation-guide-articles/how-much-ventilation-do-i-need/',
    lastCheckedAt: '2026-05-30',
    notes: 'Used for bathroom intermittent ventilation rules: under 100 square feet starts at 1 CFM per square foot with a 50 CFM minimum; larger bathrooms use fixture-based additions.'
  },
  {
    id: 'hvi-bathroom-exhaust',
    name: 'Home Ventilating Institute Bathroom Exhaust Fans',
    url: 'https://www.hvi.org/resources/publications/bathroom-exhaust-fans/',
    lastCheckedAt: '2026-05-30',
    notes: 'Used for bathroom exhaust fan context, including 50 CFM minimum classes, 1 CFM per square foot examples and delivered-airflow caveats.'
  },

  {
    id: 'federal-register-portable-ac-test',
    name: 'Federal Register: Portable Air Conditioner Test Procedure',
    url: 'https://www.federalregister.gov/documents/2023/05/15/2023-09755/energy-conservation-program-test-procedure-for-portable-air-conditioners',
    lastCheckedAt: '2026-05-30',
    notes: 'Used as source context for SACC, CEER, annual energy consumption and the distinction between portable AC adjusted capacity and a larger marketing BTU number.'
  },
  {
    id: 'epa-humidity-mold-brief-guide',
    name: 'EPA Brief Guide to Mold, Moisture, and Your Home',
    url: 'https://www.epa.gov/mold/brief-guide-mold-moisture-and-your-home',
    lastCheckedAt: '2026-05-30',
    notes: 'Used for the boundary that moisture-source control matters and dehumidifier sizing is not mold remediation, waterproofing or a health guarantee.'
  },
  {
    id: 'cfm-ach-formula-reference',
    name: 'CFM and ACH Formula Reference',
    url: 'https://www.vaniman.com/air-changes-per-hour-calculator/',
    lastCheckedAt: '2026-05-30',
    notes: 'Used as formula-reference context for CFM = room volume × ACH ÷ 60 and ACH = CFM × 60 ÷ room volume.'
  },
  {
    id: 'acca-manuals',
    name: 'ACCA Technical Manuals',
    url: 'https://www.acca.org/standards/technical-manuals',
    lastCheckedAt: '2026-05-30',
    notes: 'Used to define the boundary between simplified room-level estimates and professional Manual J, Manual S and Manual D design.'
  },
  {
    id: 'epa-mold',
    name: 'EPA Mold and Indoor Air Guidance',
    url: 'https://www.epa.gov/mold',
    lastCheckedAt: '2026-05-30',
    notes: 'Used for mold, water intrusion and indoor-air-quality disclaimers. Dehumidifier or fan sizing is not mold remediation or a health guarantee.'
  }
];

export const sourceById = (id: string) => SOURCES.find((source) => source.id === id);
