import { addDays, differenceInDays } from "date-fns";

// Gestational Age Calculator functions

export function calculateGestationalAgeFromLMP(lmpDate: Date) {
  // Calculate due date (40 weeks from LMP)
  const dueDate = addDays(lmpDate, 280); // 40 weeks = 280 days
  
  // Calculate current gestational age
  const today = new Date();
  const diffDays = differenceInDays(today, lmpDate);
  const weeks = Math.floor(diffDays / 7);
  const days = diffDays % 7;
  
  // Calculate trimester dates
  const firstTrimesterEnd = addDays(lmpDate, 84); // 12 weeks = 84 days
  const secondTrimesterEnd = addDays(lmpDate, 182); // 26 weeks = 182 days
  
  return {
    weeks,
    days,
    dueDate,
    firstTrimesterEnd,
    secondTrimesterEnd
  };
}

export function calculateGestationalAgeFromUltrasound(
  usgDate: Date,
  usgWeeks: number,
  usgDays: number
) {
  // Calculate LMP based on USG measurements
  const totalDays = (usgWeeks * 7) + usgDays;

function calculateCycleVariability(cycles: CycleHistory[]): number {
  if (cycles.length < 2) return 1;
  
  const lengths = cycles.map(c => c.cycleLength);
  const average = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  const variance = lengths.reduce((a, b) => a + Math.pow(b - average, 2), 0) / lengths.length;
  
  return Math.sqrt(variance) / 2; // Desvio padrão dividido por 2 para ajuste da janela
}

function calculateAverageLutealPhase(cycles: CycleHistory[]): number | null {
  if (cycles.length < 3) return null;
  
  const lutealPhases = cycles.map(c => c.cycleLength - 14); // Estimativa básica
  return Math.round(lutealPhases.reduce((a, b) => a + b, 0) / lutealPhases.length);
}

function predictNextCycle(cycles: CycleHistory[]): number {
  if (cycles.length < 3) return 28;
  
  // Média móvel ponderada dos últimos ciclos
  const weights = cycles.map((_, i) => i + 1);
  const weightSum = weights.reduce((a, b) => a + b, 0);
  
  return Math.round(
    cycles.reduce((acc, cycle, i) => acc + (cycle.cycleLength * weights[i]), 0) / weightSum
  );
}

  const lmpDate = addDays(usgDate, -totalDays);
  
  return calculateGestationalAgeFromLMP(lmpDate);
}

export function calculateGestationalAgeFromTransfer(
  transferDate: Date,
  embryoDays: number
) {
  // Calculate estimated LMP
  // For a 5-day blastocyst, the embryo is already 19 days old in gestational age terms (14 + 5)
  // For a 3-day embryo, it's 17 days old (14 + 3)
  const additionalDays = embryoDays === 5 ? 19 : 17;
  
  const lmpDate = addDays(transferDate, -additionalDays);
  
  return calculateGestationalAgeFromLMP(lmpDate);
}

// Fertility Period Calculator functions

export interface CycleHistory {
  periodStart: Date;
  periodLength: number;
  cycleLength: number;
}

export function calculateFertilePeriod(
  lastPeriodStart: Date,
  lastPeriodEnd: Date,
  cycleLength: number = 28,
  previousCycles: CycleHistory[] = []
) {
  // Análise de variabilidade do ciclo
  const cycleVariability = previousCycles.length > 0 
    ? calculateCycleVariability(previousCycles)
    : 1;

  // Ajuste do dia da ovulação baseado no histórico
  const lutealPhaseLength = calculateAverageLutealPhase(previousCycles);
  const adjustedOvulationDay = addDays(lastPeriodStart, cycleLength - (lutealPhaseLength || 14));
  
  // Ajuste da janela fértil baseado na variabilidade
  const fertileWindowStart = addDays(adjustedOvulationDay, -5 - Math.floor(cycleVariability));
  const fertileWindowEnd = addDays(adjustedOvulationDay, 1 + Math.ceil(cycleVariability));
  
  // Calculate next period
  const nextPeriodStart = addDays(lastPeriodStart, cycleLength);
  const periodLength = differenceInDays(lastPeriodEnd, lastPeriodStart);
  const nextPeriodEnd = addDays(nextPeriodStart, periodLength);
  
  return {
    ovulationDay,
    fertileStart,
    fertileEnd,
    nextPeriodStart,
    nextPeriodEnd
  };
}
