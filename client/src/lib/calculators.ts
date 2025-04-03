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

export interface CycleHistory {
  periodStart: Date;
  periodLength: number;
  cycleLength: number;
}

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

export function calculateFertilePeriod(
  lastPeriodStart: Date,
  lastPeriodEnd: Date,
  cycleLength: number = 28,
  previousCycles: CycleHistory[] = []
) {
  // Cálculo padrão da ovulação (14 dias antes do próximo período)
  const ovulationDay = addDays(lastPeriodStart, cycleLength - 14);
  
  // Cálculo padrão da janela fértil (5 dias antes da ovulação mais o dia da ovulação)
  const fertileStart = addDays(ovulationDay, -5);
  
  // Dia da ovulação mais 1 dia para viabilidade do óvulo (24 horas)
  const fertileEnd = addDays(ovulationDay, 1);
  
  // Cálculo do próximo período
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

// Função para obter informações detalhadas sobre cada fase do ciclo
export function getCyclePhaseDetail(phase: string) {
  switch (phase) {
    case "menstrual":
      return {
        mucus: "Fluxo menstrual presente. Pouco ou nenhum muco cervical visível além do sangue menstrual.",
        bbt: "Temperatura basal baixa (fase de temperatura baixa do ciclo).",
        hormones: "Níveis baixos de estrogênio e progesterona. O FSH (hormônio folículo-estimulante) começa a aumentar para estimular o desenvolvimento folicular."
      };
    case "folicular":
      return {
        mucus: "Inicialmente seco, depois torna-se mais úmido. Muco cervical escasso a moderado, branco ou amarelado, pegajoso e espesso (pouco fértil).",
        bbt: "Temperatura basal ainda baixa, relativamente estável.",
        hormones: "Aumento gradual dos níveis de estrogênio à medida que os folículos se desenvolvem. FSH presente, iniciando-se a produção de LH (hormônio luteinizante)."
      };
    case "fértil":
      return {
        mucus: "Abundante, claro, elástico, escorregadio e transparente (semelhante à clara de ovo crua). Altamente fértil, projetado para ajudar os espermatozoides a atingir o óvulo.",
        bbt: "Ligeira queda antes da ovulação seguida por um aumento acentuado após a ovulação.",
        hormones: "Pico de estrogênio seguido por um aumento rápido de LH, desencadeando a liberação do óvulo. Pequeno aumento de progesterona."
      };
    case "ovulatória":
      return {
        mucus: "Extremamente elástico e escorregadio, transparente como clara de ovo. Máxima elasticidade ('spinnbarkeit'). O muco pode se esticar vários centímetros entre os dedos.",
        bbt: "Queda transitória seguida por aumento significativo nas próximas 24 horas (0,2-0,5°C).",
        hormones: "Pico de LH (hormônio luteinizante) que desencadeia a liberação do óvulo. Pico de estrogênio seguido por aumento gradual da progesterona."
      };
    case "lútea":
      return {
        mucus: "Retorna rapidamente a um padrão menos fértil - mais espesso, pegajoso e opaco. Diminui em quantidade até ficar seco novamente.",
        bbt: "Temperatura elevada que se mantém por toda a fase lútea (fase de temperatura alta do ciclo).",
        hormones: "Aumento da progesterona produzida pelo corpo lúteo. Estrogênio em nível moderado. Se não houver gravidez, os níveis hormonais diminuem no final desta fase."
      };
    default:
      return {
        mucus: "Características do muco cervical variam conforme a fase do ciclo.",
        bbt: "A temperatura corporal basal flutua ao longo do ciclo, com um padrão bifásico.",
        hormones: "Os níveis hormonais flutuam ao longo do ciclo menstrual, regulando as diferentes fases."
      };
  }
}
