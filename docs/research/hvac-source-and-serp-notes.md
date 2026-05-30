# HVAC source and SERP notes

Last reviewed: 2026-05-30

This note records the external source research used for the current content-module update. It is not a build step and does not replace official product manuals, local code, Manual J / Manual S / Manual D design, waterproofing review, mold remediation or professional inspection.

## Official and authoritative source findings

| Topic | Source | Relevant finding | Implementation decision |
|---|---|---|---|
| Room AC BTU | DOE Room Air Conditioners | Room AC sizing commonly starts around 20 BTU per square foot and should consider room height, local climate, shading and windows. | Keep 20 BTU/sq ft as starting assumption, expose ceiling height and room-condition inputs, show range instead of one exact value. |
| Room AC adjustments | ENERGY STAR Room Air Conditioners | Heavy shade, very sunny rooms and additional occupants are called out as sizing adjustments. | Keep sun exposure and occupant fields visible. Keep kitchen / heat source and insulation as planning cautions rather than official precision factors. |
| Dehumidifier capacity | ENERGY STAR Dehumidifiers | Dehumidifier capacity is usually measured in pints per 24 hours and depends on space size and existing conditions. | Keep pints/day output, area and dampness inputs; clearly label the lookup table as an internal planning assumption. |
| Dehumidifier testing | ENERGY STAR Dehumidifier Testing and Capacity | Efficiency and capacity are tied to test conditions, not bucket volume. | Continue distinguishing pints/day capacity from bucket size. |
| Bathroom fan sizing | HVI How Much Ventilation Do I Need? | Bathrooms under 100 sq ft use 1 CFM per sq ft with a minimum of 50 CFM; larger bathrooms use fixture-based additions. | Keep area rule and fixture rule visible. Add source-backed boundary notes to pages and presets. |
| Bathroom fan caveats | HVI Bathroom Exhaust Fans | 50 CFM minimum classes, 1 CFM/sq ft examples and delivered airflow considerations matter. | Keep duct length warning and avoid claiming code compliance. |
| Professional design boundary | ACCA manuals | Manual J, Manual S and Manual D are professional design domains. | Keep clear boundary that room calculators are not whole-home equipment or duct design. |
| Mold / water source boundary | EPA mold guidance | Moisture source and mold issues require source control and appropriate remediation. | Keep warning that dehumidifier sizing is not mold remediation or waterproofing. |

## SERP and competitor shape notes

| Query / intent | Observed SERP shape | Examples observed | Content decision |
|---|---|---|---|
| room AC BTU calculator | Mostly tool pages with short explanation | Calculator.net, Omni Calculator, MiniWebTool, Calcbe | Compete as a tool-first page; avoid long article above the calculator. Add visible input rationale and source-backed assumptions below the tool. |
| dehumidifier size calculator | Tool pages plus buying-guide pages | WhichDehumidifier, dehumidify.net, retail / review pages | Keep pints/day calculator first; add boundaries around wet basements, drains, temperature and water intrusion. |
| CFM / ACH calculator | Tool pages and formula explainers | Vaniman, ServiceTitan, HVAC calculator sites | Keep formula transparent; emphasize that ACH math is not delivered-airflow or code proof. |
| bathroom fan CFM calculator | Tool pages and contractor guides | HVI guidance, HVAC tool pages, plumber / contractor articles | Use HVI-style area and fixture rules; include duct and local-code caveats. |

## URL and module decisions

- Do not create many new URLs without first-party query data.
- Strengthen existing tool pages and existing long-tail presets first.
- Keep long-tail pages as preset pages with parameters, source boundary, common mistakes and related tools.
- Keep FAQ, sources, related links and long explanatory content below the calculator so the first screen remains task-focused.

## 2026-05-30 execution update: content modules applied

The later content pass used the universal tool-page content workflow: tool use stays first, visible copy stays short, facts and formulas stay source-bound, and unsupported keywords are recorded as candidates rather than published claims.

### Keyword evidence table

| Keyword | Type | Evidence level | Source | SERP shape | User first task | Current page | Action |
|---|---|---:|---|---|---|---|---|
| room ac btu calculator | Tool | C | Manual SERP / competitor shape | Tool pages with short explanations | Enter room dimensions and get BTU range | `/room-ac-btu-calculator/` | Strengthen existing page; do not create duplicate URL. |
| ac btu calculator | Tool | C | Manual SERP / competitor shape | Tool pages | Estimate cooling capacity | `/room-ac-btu-calculator/` | Keep as main tool intent. |
| what size ac for 300 sq ft | Preset | C | Existing URL + SERP-like task | Long-tail examples and calculator modules | Get a quick 300 sq ft estimate | `/room-size/what-size-ac-for-300-sq-ft/` | Keep preset page with source boundary and related presets. |
| portable ac sacc vs btu | Guide | C | Official test-procedure context + visible SERP theme | Guides / product explanation | Understand which label value to compare | `/guides/portable-ac-sacc-vs-btu/` | Strengthen guide and link to portable calculator. |
| dehumidifier size calculator | Tool | C | Manual SERP / competitor shape | Tool + buying guide | Estimate pints/day | `/dehumidifier-size-calculator/` | Keep as main dehumidifier tool intent. |
| what size dehumidifier for 1000 sq ft basement | Preset | C | Existing URL + competitor shape | Buying guide + calculator examples | Estimate basement pints/day class | `/dehumidifier/what-size-dehumidifier-for-1000-sq-ft-basement/` | Keep preset page; add water-source and drain boundary. |
| bathroom fan cfm calculator | Tool | C | HVI source + SERP shape | Tool / contractor guide / official guidance | Estimate fan CFM | `/bathroom-fan-cfm-calculator/` | Keep as main bathroom fan tool intent. |
| cfm ach calculator | Tool | C | Formula pages / calculators | Formula tool pages | Convert room volume and ACH to CFM | `/cfm-by-ach-calculator/` | Keep formula transparent and avoid code-compliance claims. |
| garage ventilation cfm calculator | Candidate | D | Logical combination only | Not fully validated | Estimate garage airflow | `/garage-ventilation-calculator/` | Do not add new pages until GSC/Bing data appears. |

### Content execution notes

- Guide pages were expanded only where the content explains how to use an existing calculator or prevents misuse of a result.
- No new bulk long-tail URLs were created because no GSC / Bing / Keyword Planner data was provided.
- Pints/day copy stays separate from bucket-size copy.
- Portable AC copy now treats SACC / adjusted-capacity context as the safer comparison point.
- Bathroom fan copy keeps HVI-style area and fixture rules but still warns that delivered airflow and local code can control final selection.
- CFM / ACH pages keep the formula visible but do not claim indoor-air-quality, safety or code compliance.

### Publication guardrails

- Do not move source notes, FAQs, related links or long explanations above the calculator.
- Do not add FAQ schema for invisible or invented FAQ content.
- Do not create independent pages from D-level keyword candidates.
- Do not claim official endorsement, certified sizing, guaranteed comfort, mold remediation or code compliance.
