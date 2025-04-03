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
  
  // Determine trimester
  let currentTrimester = 1;
  if (diffDays > 182) {
    currentTrimester = 3;
  } else if (diffDays > 84) {
    currentTrimester = 2;
  }
  
  // Get developmental information and recommendations
  const developmentInfo = getGestationalDevelopmentInfo(weeks);
  const prenatalCare = getPrenatalCareRecommendations(weeks);
  
  return {
    weeks,
    days,
    dueDate,
    firstTrimesterEnd,
    secondTrimesterEnd,
    currentTrimester,
    developmentInfo,
    prenatalCare
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

// Informações sobre desenvolvimento fetal por semana
export function getGestationalDevelopmentInfo(weeks: number) {
  if (weeks < 4) {
    return {
      title: "Implantação do embrião",
      development: "Nas primeiras semanas, o óvulo fertilizado (blastocisto) implanta-se no útero e as células começam a se diferenciar. O saco gestacional e disco embrionário começam a se formar.",
      size: "0,1-0,2 mm (microscópico)",
      milestone: "Implantação no útero e início da produção do hCG (hormônio da gravidez)."
    };
  } else if (weeks < 8) {
    return {
      title: "Embriogênese inicial",
      development: "Formação do tubo neural, início dos batimentos cardíacos, desenvolvimento dos brotos dos membros. Começo da formação dos principais órgãos.",
      size: weeks < 6 ? "2-4 mm (tamanho de uma semente de papoula)" : "5-10 mm (tamanho de uma ervilha)",
      milestone: "Batimentos cardíacos detectáveis por volta da 6ª semana."
    };
  } else if (weeks < 13) {
    return {
      title: "Final do período embrionário",
      development: "Todos os órgãos principais estão formados. Começo da calcificação óssea. Intestinos começam a se formar e função renal inicia-se. Genitália externa começa a se diferenciar mas ainda não é identificável por ultrassom.",
      size: "5-8 cm (tamanho de um limão pequeno)",
      milestone: "Fim do período de maior risco para malformações congênitas causadas por agentes externos."
    };
  } else if (weeks < 17) {
    return {
      title: "Início do segundo trimestre",
      development: "Começo da formação do lanugo (pelos finos) e vernix caseosa (substância que protege a pele). Movimentos fetais presentes mas ainda não sentidos pela mãe. Desenvolvimento ativo do cérebro e sistema nervoso.",
      size: "10-15 cm (tamanho de uma pera)",
      milestone: "Sexo fetal geralmente visível na ultrassonografia."
    };
  } else if (weeks < 21) {
    return {
      title: "Meio da gestação",
      development: "Desenvolvimento das glândulas sudoríparas. Aparecimento de cabelos e sobrancelhas. Rápido crescimento cerebral. Feto começa a ouvir sons.",
      size: "16-25 cm (tamanho de uma banana)",
      milestone: "Movimentos fetais geralmente percebidos pela mãe ('quickening')."
    };
  } else if (weeks < 25) {
    return {
      title: "Viabilidade fetal",
      development: "Desenvolvimento de padrão sono-vigília. Formação de impressões digitais. Pulmões começam a produzir surfactante, essencial para respiração após o nascimento.",
      size: "28-30 cm (tamanho de uma berinjela)",
      milestone: "Período de viabilidade fetal (23-24 semanas) - sobrevivência possível com cuidados intensivos."
    };
  } else if (weeks < 29) {
    return {
      title: "Desenvolvimento cerebral acelerado",
      development: "Cérebro desenvolve sulcos e circunvoluções. Olhos começam a abrir e fechar. Sistema respiratório continua a amadurecer. O feto responde a sons externos e luz.",
      size: "35-38 cm (tamanho de uma couve-flor)",
      milestone: "Reflexo de piscar e resposta a estímulos sonoros."
    };
  } else if (weeks < 33) {
    return {
      title: "Desenvolvimento final do sistema respiratório",
      development: "Aumento rápido de peso. Maior produção de surfactante pulmonar. Desenvolvimento de ritmos de sucção e deglutição coordenados.",
      size: "40-43 cm (tamanho de um abacaxi)",
      milestone: "Maior probabilidade de sobrevivência sem complicações graves em caso de parto prematuro."
    };
  } else if (weeks < 37) {
    return {
      title: "Crescimento final",
      development: "Ganho significativo de peso. Desenvolvimento de padrões de sono mais definidos. Sistemas orgânicos finalizam seu amadurecimento.",
      size: "45-48 cm (tamanho de um melão)",
      milestone: "O feto geralmente se posiciona de cabeça para baixo em preparação para o nascimento."
    };
  } else {
    return {
      title: "Gestação a termo",
      development: "Órgãos completamente formados e funcionais. Continua o acúmulo de gordura subcutânea. A maioria dos bebês começa a descer para a pelve (encaixamento).",
      size: "48-52 cm (tamanho de uma melancia pequena)",
      milestone: "Preparação para o parto. Pulmões completamente maduros para respiração fora do útero."
    };
  }
}

// Recomendações de pré-natal conforme a idade gestacional
export function getPrenatalCareRecommendations(weeks: number) {
  // Recomendações básicas para todas as idades gestacionais
  const basicRecommendations = {
    nutrition: "Alimentação equilibrada rica em proteínas, fibras, frutas e vegetais. Suplementação de ácido fólico 400mcg/dia.",
    lifestyle: "Evitar álcool, tabaco e outras drogas. Prática de atividade física moderada conforme orientação médica.",
    warning_signs: "Procure atendimento médico imediato em caso de sangramento vaginal, contrações uterinas regulares, diminuição dos movimentos fetais, dor abdominal intensa, ruptura da bolsa ou dor de cabeça severa com alterações visuais."
  };

  // Recomendações específicas por período
  let examinations = "";
  let vaccines = "";
  let special_care = "";

  if (weeks < 13) {
    // 1° Trimestre
    examinations = "Hemograma completo, tipagem sanguínea e fator Rh, glicemia de jejum, VDRL, HIV, hepatites B e C, toxoplasmose, rubéola, citomegalovírus, urina tipo I e urocultura, ultrassom obstétrico transvaginal ou pélvico.";
    vaccines = "Verificar situação vacinal para dT (difteria e tétano), dTpa (difteria, tétano e coqueluche acelular), hepatite B e influenza sazonal.";
    special_care = "Controle de náuseas e vômitos. Evitar medicamentos sem prescrição médica. Hidratação adequada.";
  } else if (weeks < 28) {
    // 2° Trimestre
    examinations = "Ultrassom morfológico entre 20-24 semanas, teste oral de tolerância à glicose (24-28 semanas), repetição de exames conforme necessidade clínica. Avaliação do crescimento uterino e batimentos cardíacos fetais.";
    vaccines = "Administração da dTpa a partir da 20ª semana, preferencialmente entre 27-36 semanas. Completar esquema de hepatite B se necessário.";
    special_care = "Observar movimentos fetais. Cuidado com a postura - uso de calçados confortáveis. Prevenção de estrias e melasma.";
  } else {
    // 3° Trimestre
    examinations = "Hemograma, glicemia, VDRL, HIV, hepatites (repetição), urina tipo I e urocultura, pesquisa de estreptococo do grupo B (35-37 semanas), ultrassom para avaliação de crescimento e bem-estar fetal. Cardiotocografia a partir de 40 semanas ou conforme indicação.";
    vaccines = "Confirmação da aplicação da dTpa. Esquema vacinal deve estar completo antes do parto.";
    special_care = "Atenção aos sinais de trabalho de parto. Contagem de movimentos fetais. Prevenção de edema e varicosidades. Preparo para amamentação. Planejamento do parto.";
  }

  return {
    ...basicRecommendations,
    examinations,
    vaccines,
    special_care
  };
}
