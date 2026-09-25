export type DocumentType =
  | 'Bank Cheques'
  | 'Bank Documents'
  | 'ID Cards'
  | 'KYC Documents'
  | 'Invoice'
  | 'Bill of Lading'
  | 'Packing List'
  | 'Purchase Order'
  | 'Contract'
  | 'P&L Statements'
  | 'Cashflow Statements';

export type ModelType = 'Single' | 'Multi';

export interface DocumentTypeConfig {
  name: DocumentType;
  tier: 'tier1' | 'tier2' | 'tier3';
  allowedModels: ModelType[];
}

export const DOCUMENT_CONFIGS: Record<DocumentType, DocumentTypeConfig> = {
  'Bank Cheques': { name: 'Bank Cheques', tier: 'tier1', allowedModels: ['Single', 'Multi'] },
  'Bank Documents': { name: 'Bank Documents', tier: 'tier1', allowedModels: ['Single', 'Multi'] },
  'ID Cards': { name: 'ID Cards', tier: 'tier1', allowedModels: ['Single', 'Multi'] },
  'KYC Documents': { name: 'KYC Documents', tier: 'tier1', allowedModels: ['Single', 'Multi'] },
  'Invoice': { name: 'Invoice', tier: 'tier2', allowedModels: ['Single', 'Multi'] },
  'Bill of Lading': { name: 'Bill of Lading', tier: 'tier2', allowedModels: ['Single', 'Multi'] },
  'Packing List': { name: 'Packing List', tier: 'tier2', allowedModels: ['Single', 'Multi'] },
  'Purchase Order': { name: 'Purchase Order', tier: 'tier2', allowedModels: ['Single', 'Multi'] },
  'Contract': { name: 'Contract', tier: 'tier3', allowedModels: ['Single'] },
  'P&L Statements': { name: 'P&L Statements', tier: 'tier3', allowedModels: ['Single'] },
  'Cashflow Statements': { name: 'Cashflow Statements', tier: 'tier3', allowedModels: ['Single'] },
};

export interface PricingRule {
  fixedAnnualCost: number;
  rates: {
    s1: number; // 36,001–120,000
    s2: number; // 120,001–300,000
    s3: number; // 300,001–500,000
    s4: number; // 500,001–1,000,000
    s5: number; // Above 1,000,000
  };
}

export const PRICING_KEYS: Record<string, PricingRule> = {
  'tier1|single': {
    fixedAnnualCost: 25000,
    rates: { s1: 0.07, s2: 0.05, s3: 0.05, s4: 0.04, s5: 0.03 },
  },
  'tier1|multi': {
    fixedAnnualCost: 18000,
    rates: { s1: 0.05, s2: 0.04, s3: 0.03, s4: 0.02, s5: 0.01 },
  },
  'tier2|single': {
    fixedAnnualCost: 36000,
    rates: { s1: 0.09, s2: 0.08, s3: 0.07, s4: 0.05, s5: 0.04 },
  },
  'tier2|multi': {
    fixedAnnualCost: 27000,
    rates: { s1: 0.07, s2: 0.05, s3: 0.05, s4: 0.04, s5: 0.03 },
  },
  'tier3|single': {
    fixedAnnualCost: 54000,
    rates: { s1: 0.15, s2: 0.14, s3: 0.13, s4: 0.12, s5: 0.11 },
  },
};

export interface RoiInput {
  documentType: DocumentType;
  model: ModelType;
  annualVolume: number; // total pages per year
  avgMonthlySalary: number; // INR
}

export interface RoiResult {
  resourcesNeeded: number;
  monthlyManualCost: number;
  klearStackAnnualCost: number;
  klearStackMonthlyCost: number;
  netMonthlySavings: number;
  annualSavings: number;
  equivalentResources: number;
  paybackMonths: number;
  tier: string;
  pricingKey: string;
}

export function calculateRoi(input: RoiInput): RoiResult {
  const config = DOCUMENT_CONFIGS[input.documentType];
  const selectedTier = config.tier;

  // Enforce tier3 model restriction (only single model allowed)
  let selectedModel = input.model;
  if (selectedTier === 'tier3') {
    selectedModel = 'Single';
  }

  const pricingKey = `${selectedTier}|${selectedModel.toLowerCase()}`;
  const rule = PRICING_KEYS[pricingKey] || PRICING_KEYS['tier1|single'];

  // 1. Resources Needed = Annual Volume / 30,000
  const resourcesNeeded = input.annualVolume / 30000;

  // 2. Monthly Manual Cost = Resources Needed * Avg Monthly Salary
  const monthlyManualCost = resourcesNeeded * input.avgMonthlySalary;

  // 3. KlearStack Annual Cost = Fixed Annual Cost + cumulative slab charges above 36,000 pages
  let slabCharges = 0;
  if (input.annualVolume > 36000) {
    const s1 = Math.max(0, Math.min(input.annualVolume, 120000) - 36000) * rule.rates.s1;
    const s2 = Math.max(0, Math.min(input.annualVolume, 300000) - 120000) * rule.rates.s2;
    const s3 = Math.max(0, Math.min(input.annualVolume, 500000) - 300000) * rule.rates.s3;
    const s4 = Math.max(0, Math.min(input.annualVolume, 1000000) - 500000) * rule.rates.s4;
    const s5 = Math.max(0, input.annualVolume - 1000000) * rule.rates.s5;
    slabCharges = s1 + s2 + s3 + s4 + s5;
  }

  const klearStackAnnualCost = rule.fixedAnnualCost + slabCharges;

  // 4. Monthly Cost = KlearStack Annual Cost / 12
  const klearStackMonthlyCost = klearStackAnnualCost / 12;

  // 5. Net Monthly Savings = Monthly Manual Cost - KlearStack Monthly Cost
  const netMonthlySavings = monthlyManualCost - klearStackMonthlyCost;

  // 6. Annual Savings = Net Monthly Savings * 12
  const annualSavings = netMonthlySavings * 12;

  // 7. Equivalent Resources = Round Resources Needed up to next whole number
  const equivalentResources = Math.ceil(resourcesNeeded);

  // 8. Payback Months = Monthly Cost / Monthly Manual Cost, rounded to 1 decimal place
  let paybackMonths = 0;
  if (monthlyManualCost > 0) {
    paybackMonths = Number((klearStackMonthlyCost / monthlyManualCost).toFixed(1));
  }

  return {
    resourcesNeeded,
    monthlyManualCost,
    klearStackAnnualCost,
    klearStackMonthlyCost,
    netMonthlySavings,
    annualSavings,
    equivalentResources,
    paybackMonths,
    tier: selectedTier,
    pricingKey,
  };
}

export function formatINR(amount: number, includeDecimals = true): string {
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: includeDecimals ? 2 : 0,
    minimumFractionDigits: includeDecimals ? 2 : 0,
  }).format(amount);
  return `₹${formatted}`;
}

export function formatShortINR(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} Lakh`;
  }
  return formatINR(amount, false);
}
