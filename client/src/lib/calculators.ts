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

export function calculateFertilePeriod(
  lastPeriodStart: Date, 
  lastPeriodEnd: Date, 
  cycleLength: number = 28
) {
  // Calculate ovulation day (typically 14 days before the next period)
  const ovulationDay = addDays(lastPeriodStart, cycleLength - 14);
  
  // Calculate fertile window (5 days before ovulation plus ovulation day)
  const fertileStart = addDays(ovulationDay, -5);
  
  // Ovulation day plus 1 day for egg viability (24 hours)
  const fertileEnd = addDays(ovulationDay, 1);
  
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
