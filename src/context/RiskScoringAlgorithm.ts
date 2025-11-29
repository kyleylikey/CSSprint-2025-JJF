import type { Report, ReportCategory, ReportSeverity } from './ReportContext';

export interface RiskScore {
  score: number;          // 0-100 scale
  level: 'low' | 'medium' | 'high' | 'critical';
  factors: RiskFactor[];
  confidence: number;     // 0-100 scale
}

export interface RiskFactor {
  name: string;
  weight: number;
  contribution: number;
  description: string;
}

// Sensitive departments that warrant higher risk scores
const SENSITIVE_DEPARTMENTS = ['finance', 'executive', 'hr', 'legal', 'compliance', 'security'];

// Categories by rarity (less common = higher baseline risk)
const CATEGORY_RARITY: Record<ReportCategory, number> = {
  corruption: 0.9,       // Very rare - highest risk multiplier
  fraud: 0.8,            // Rare
  data: 0.7,             // Moderately rare
  discrimination: 0.5,   // Moderate
  harassment: 0.4,       // Common
  safety: 0.5,           // Moderate
  conflict: 0.6,         // Somewhat rare
  other: 0.3,            // Common
};

// Severity weights
const SEVERITY_WEIGHTS: Record<ReportSeverity, number> = {
  low: 10,
  medium: 25,
  high: 50,
  critical: 80,
};

/**
 * Justifiable Judgment Flagging (JJF) Risk Scoring Algorithm
 * 
 * This algorithm calculates a risk score for each report based on:
 * 1. Source Type: Employee reports weighted higher than automated flags
 * 2. Severity: Higher severity increases risk
 * 3. Department Sensitivity: Finance, Executive, etc. increase risk
 * 4. Category Rarity: Rare event types have slightly higher risk
 * 5. Corroboration: Multiple related reports increase confidence
 */
export function calculateRiskScore(
  report: Report,
  allReports: Report[],
  isAutomatedFlag: boolean = false
): RiskScore {
  const factors: RiskFactor[] = [];
  let totalScore = 0;
  let confidenceScore = 50; // Base confidence

  // Factor 1: Source Type (Employee vs Automated)
  // Employee reports are weighted 1.5x higher than automated flags
  const sourceMultiplier = isAutomatedFlag ? 0.7 : 1.0;
  const sourceContribution = isAutomatedFlag ? 15 : 25;
  totalScore += sourceContribution;
  factors.push({
    name: 'Source Type',
    weight: sourceMultiplier,
    contribution: sourceContribution,
    description: isAutomatedFlag 
      ? 'Automated detection (lower weight)'
      : 'Employee report (higher weight)',
  });

  // Factor 2: Severity Level
  const severityScore = SEVERITY_WEIGHTS[report.severity];
  const severityContribution = severityScore * sourceMultiplier;
  totalScore += severityContribution;
  factors.push({
    name: 'Severity Level',
    weight: severityScore / 100,
    contribution: severityContribution,
    description: `${report.severity.charAt(0).toUpperCase() + report.severity.slice(1)} severity report`,
  });

  // Factor 3: Department Sensitivity
  const involvedParties = (report.involvedParties || '').toLowerCase();
  const isSensitiveDept = SENSITIVE_DEPARTMENTS.some(dept => 
    involvedParties.includes(dept) || 
    report.description.toLowerCase().includes(dept)
  );
  if (isSensitiveDept) {
    const deptContribution = 15 * sourceMultiplier;
    totalScore += deptContribution;
    factors.push({
      name: 'Sensitive Department',
      weight: 0.15,
      contribution: deptContribution,
      description: 'Involves sensitive department (Finance, Executive, HR, etc.)',
    });
    confidenceScore += 10;
  }

  // Factor 4: Category Rarity
  const rarityMultiplier = CATEGORY_RARITY[report.category];
  const rarityContribution = rarityMultiplier * 10 * sourceMultiplier;
  totalScore += rarityContribution;
  factors.push({
    name: 'Event Rarity',
    weight: rarityMultiplier,
    contribution: rarityContribution,
    description: `${report.category} events are ${rarityMultiplier > 0.6 ? 'rare' : 'common'}`,
  });

  // Factor 5: Corroborating Reports
  const relatedReports = findCorroboratingReports(report, allReports);
  if (relatedReports.length > 0) {
    const corroborationBonus = Math.min(relatedReports.length * 5, 20);
    totalScore += corroborationBonus;
    confidenceScore += Math.min(relatedReports.length * 10, 30);
    factors.push({
      name: 'Corroboration',
      weight: relatedReports.length / 5,
      contribution: corroborationBonus,
      description: `${relatedReports.length} related report(s) found`,
    });
  }

  // Normalize score to 0-100
  const normalizedScore = Math.min(Math.round(totalScore), 100);
  const normalizedConfidence = Math.min(Math.round(confidenceScore), 100);

  // Determine risk level
  let level: RiskScore['level'];
  if (normalizedScore >= 70) {
    level = 'critical';
  } else if (normalizedScore >= 50) {
    level = 'high';
  } else if (normalizedScore >= 30) {
    level = 'medium';
  } else {
    level = 'low';
  }

  return {
    score: normalizedScore,
    level,
    factors,
    confidence: normalizedConfidence,
  };
}

/**
 * Find reports that may corroborate the given report
 * Based on: same category, similar timeframe, related parties
 */
function findCorroboratingReports(report: Report, allReports: Report[]): Report[] {
  const reportDate = new Date(report.date);
  const oneWeekMs = 7 * 24 * 60 * 60 * 1000;

  return allReports.filter(r => {
    // Don't count the same report
    if (r.id === report.id) return false;

    // Check if same category
    const sameCategory = r.category === report.category;

    // Check if within 2 weeks
    const rDate = new Date(r.date);
    const withinTimeframe = Math.abs(reportDate.getTime() - rDate.getTime()) < oneWeekMs * 2;

    // Check for related parties
    const hasRelatedParties = report.involvedParties && r.involvedParties &&
      report.involvedParties.toLowerCase().includes(r.involvedParties.toLowerCase().split(' ')[0]);

    // A report is corroborating if it shares category and timeframe, or has related parties
    return (sameCategory && withinTimeframe) || hasRelatedParties;
  });
}

/**
 * Get risk level color for UI display
 */
export function getRiskLevelColor(level: RiskScore['level']): string {
  switch (level) {
    case 'critical': return '#c53030';
    case 'high': return '#dd6b20';
    case 'medium': return '#d69e2e';
    case 'low': return '#38a169';
    default: return '#718096';
  }
}

/**
 * Format risk score for display
 */
export function formatRiskScore(score: RiskScore): string {
  return `${score.score}/100 (${score.level.toUpperCase()})`;
}
