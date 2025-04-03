
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Info, 
  Droplets, 
  Thermometer, 
  ChevronDown, 
  ChevronUp,
  Calendar as CalendarIcon,
  ArrowRight
} from "lucide-react";
import { 
  calculateFertilePeriod, 
  getCyclePhaseDetail, 
  type CycleHistory 
} from "@/lib/calculators";
import { 
  addDays, 
  format, 
  isSameDay, 
  startOfMonth, 
  endOfMonth, 
  getDay, 
  isWithinInterval, 
  differenceInDays
} from "date-fns";
import { ptBR } from "date-fns/locale";

const FertilityCalculator = () => {
  const [lastPeriodStart, setLastPeriodStart] = useState<string>("");
  const [lastPeriodEnd, setLastPeriodEnd] = useState<string>("");
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [cycleHistory, setCycleHistory] = useState<CycleHistory[]>([]);
  const [currentSelection, setCurrentSelection] = useState<{start?: Date, end?: Date}>({});
  const [expandedSection, setExpandedSection] = useState<string | null>("bodyChanges");
  const [results, setResults] = useState<{
    ovulationDay: Date;
    fertileStart: Date;
    fertileEnd: Date;
    nextPeriodStart: Date;
    nextPeriodEnd: Date;
    currentCyclePhase: string;
    daysUntilNextPhase: number;
    nextPhase: string;
    cycleVariability?: number;
  } | null>(null);

  const addCycle = () => {
    if (currentSelection.start && currentSelection.end) {
      const newCycle: CycleHistory = {
        periodStart: currentSelection.start,
        periodLength: Math.round((currentSelection.end.getTime() - currentSelection.start.getTime()) / (1000 * 60 * 60 * 24)) + 1,
        cycleLength: cycleHistory.length > 0 
          ? Math.round((currentSelection.start.getTime() - cycleHistory[cycleHistory.length - 1].periodStart.getTime()) / (1000 * 60 * 60 * 24))
          : 28
      };
      
      setCycleHistory([...cycleHistory, newCycle]);
      setCurrentSelection({});
    }
  };

  const handleCalculate = () => {
    if (!lastPeriodStart || !lastPeriodEnd) return;

    try {
      const avgCycleLength = cycleHistory.length > 1
        ? Math.round(cycleHistory.reduce((acc, cycle) => acc + cycle.cycleLength, 0) / cycleHistory.length)
        : cycleLength;

      const result = calculateFertilePeriod(
        new Date(lastPeriodStart),
        new Date(lastPeriodEnd),
        avgCycleLength,
        cycleHistory
      );

      const today = new Date();
      let currentCyclePhase = "";
      let daysUntilNextPhase = 0;
      let nextPhase = "";

      // Determinar a fase atual do ciclo
      if (isWithinInterval(today, {
        start: new Date(lastPeriodStart),
        end: new Date(lastPeriodEnd)
      })) {
        currentCyclePhase = "menstrual";
        nextPhase = "folicular";
        daysUntilNextPhase = differenceInDays(new Date(lastPeriodEnd), today) + 1;
      } else if (isWithinInterval(today, {
        start: addDays(new Date(lastPeriodEnd), 1),
        end: addDays(result.fertileStart, -1)
      })) {
        currentCyclePhase = "folicular";
        nextPhase = "fértil";
        daysUntilNextPhase = differenceInDays(result.fertileStart, today);
      } else if (isWithinInterval(today, {
        start: result.fertileStart,
        end: result.fertileEnd
      })) {
        currentCyclePhase = "fértil";
        if (isSameDay(today, result.ovulationDay)) {
          currentCyclePhase = "ovulatória";
        }
        nextPhase = "lútea";
        daysUntilNextPhase = differenceInDays(addDays(result.fertileEnd, 1), today);
      } else if (isWithinInterval(today, {
        start: addDays(result.fertileEnd, 1),
        end: addDays(result.nextPeriodStart, -1)
      })) {
        currentCyclePhase = "lútea";
        nextPhase = "menstrual";
        daysUntilNextPhase = differenceInDays(result.nextPeriodStart, today);
      } else if (isWithinInterval(today, {
        start: result.nextPeriodStart,
        end: result.nextPeriodEnd
      })) {
        currentCyclePhase = "menstrual";
        nextPhase = "folicular";
        daysUntilNextPhase = differenceInDays(result.nextPeriodEnd, today) + 1;
      }

      setResults({
        ...result,
        currentCyclePhase,
        daysUntilNextPhase,
        nextPhase
      });
    } catch (error) {
      console.error("Calculation error:", error);
    }
  };

  const renderCalendar = () => {
    if (!results) return null;

    const startDate = startOfMonth(results.nextPeriodStart);
    const endDate = endOfMonth(results.nextPeriodStart);
    const startDayOfWeek = getDay(startDate);
    
    const today = new Date();
    
    const days = [];
    
    // Adicionar células vazias para os dias antes do primeiro dia do mês
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(
        <div key={`empty-${i}`} className="p-2"></div>
      );
    }
    
    // Adicionar os dias do mês
    let currentDate = startDate;
    while (currentDate <= endDate) {
      const formattedDate = format(currentDate, "d");
      const isToday = isSameDay(currentDate, today);
      const isPeriodDay = isWithinInterval(currentDate, {
        start: results.nextPeriodStart,
        end: results.nextPeriodEnd
      }) || isWithinInterval(currentDate, {
        start: new Date(lastPeriodStart),
        end: new Date(lastPeriodEnd)
      });
      
      const isFertileDay = isWithinInterval(currentDate, {
        start: results.fertileStart,
        end: results.fertileEnd
      });
      
      const isOvulationDay = isSameDay(currentDate, results.ovulationDay);
      
      let className = "p-2 border rounded text-center";
      
      if (isPeriodDay) {
        className += " bg-red-100";
      }
      
      if (isFertileDay) {
        className += " fertile-day";
      }
      
      if (isOvulationDay) {
        className += " ovulation-day";
      }
      
      if (isToday) {
        className += " border-2 border-blue-500";
      }
      
      days.push(
        <div key={currentDate.toISOString()} className={className}>
          {formattedDate}
        </div>
      );
      
      currentDate = addDays(currentDate, 1);
    }
    
    return days;
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const renderCyclePhaseInfo = () => {
    if (!results) return null;

    const { mucus, bbt, hormones } = getCyclePhaseDetail(results.currentCyclePhase);

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <Card className="bg-white border border-blue-100">
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <Droplets className="h-5 w-5 text-blue-500 mr-2" />
              <CardTitle className="text-md">Muco Cervical</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{mucus}</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-red-100">
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <Thermometer className="h-5 w-5 text-red-500 mr-2" />
              <CardTitle className="text-md">Temperatura Basal</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{bbt}</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-purple-100">
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-purple-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
              </svg>
              <CardTitle className="text-md">Hormônios</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{hormones}</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="glass-card rounded-lg shadow-md p-6 mb-6 text-blue-100">
      <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 tech-text-glow">Idalia Calc - Análise de Fertilidade</h2>
      
      <div className="mb-6 glass-panel p-4 rounded-lg tech-border">
        <p className="text-sm text-blue-200 italic">
          Sistema avançado de análise de ciclos com detecção de períodos férteis baseada em biomarcadores como muco cervical, temperatura basal e padrões hormonais.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="flex items-center">
            <Label htmlFor="last-period-start" className="block text-sm font-medium text-blue-200 mb-2">
              Início da Última Menstruação
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="ml-1 text-blue-400 cursor-help">
                    <Info className="h-4 w-4 inline tech-glow" />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-[200px] text-xs glass-panel tech-border">
                  Primeiro dia do seu último ciclo menstrual
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input 
            id="last-period-start" 
            type="date" 
            value={lastPeriodStart}
            onChange={(e) => setLastPeriodStart(e.target.value)}
            className="mt-1 w-full bg-blue-900/20 border-blue-500/30 text-blue-100"
          />
        </div>
        <div>
          <div className="flex items-center">
            <Label htmlFor="last-period-end" className="block text-sm font-medium text-blue-200 mb-2">
              Fim da Última Menstruação
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="ml-1 text-blue-400 cursor-help">
                    <Info className="h-4 w-4 inline tech-glow" />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-[200px] text-xs glass-panel tech-border">
                  Último dia do seu último ciclo menstrual
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input 
            id="last-period-end" 
            type="date" 
            value={lastPeriodEnd}
            onChange={(e) => setLastPeriodEnd(e.target.value)}
            className="mt-1 w-full bg-blue-900/20 border-blue-500/30 text-blue-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 mb-6">
        <div>
          <div className="flex items-center">
            <Label htmlFor="cycle-length" className="block text-sm font-medium text-blue-200 mb-2">
              Duração média do ciclo menstrual
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="ml-1 text-blue-400 cursor-help">
                    <Info className="h-4 w-4 inline tech-glow" />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-[200px] text-xs glass-panel tech-border">
                  Geralmente entre 21 e 35 dias, com média de 28 dias
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center">
            <Input
              id="cycle-length"
              type="number"
              min={21}
              max={45}
              value={cycleLength}
              onChange={(e) => setCycleLength(parseInt(e.target.value) || 28)}
              className="mt-1 w-24 bg-blue-900/20 border-blue-500/30 text-blue-100"
            />
            <span className="ml-2 text-blue-300">dias</span>
          </div>
        </div>
        <div className="flex items-end">
          <Button 
            onClick={handleCalculate}
            className="tech-button px-6 py-2 tech-glow"
          >
            Calcular
          </Button>
        </div>
      </div>

      {cycleHistory.length > 0 && (
        <div className="mb-6 p-4 glass-panel rounded-lg tech-border">
          <h3 className="text-lg font-medium mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">Histórico de Ciclos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cycleHistory.map((cycle, index) => (
              <Card key={index} className="glass-card border-blue-400/20">
                <CardContent className="p-4 text-blue-200">
                  <p>Início: {format(cycle.periodStart, "dd/MM/yyyy")}</p>
                  <p>Duração: {cycle.periodLength} dias</p>
                  <p>Ciclo: {cycle.cycleLength} dias</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {results && (
        <div className="mt-8">
          <Card className="glass-card border-blue-400/30 overflow-hidden">
            <CardHeader className="glass-header pb-4">
              <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-200 tech-text-glow">Análise do Ciclo</CardTitle>
              <CardDescription className="text-blue-200">
                Hoje você está na fase <span className="font-bold text-blue-300 tech-text-glow">{results.currentCyclePhase}</span> do seu ciclo
                {results.daysUntilNextPhase > 0 && 
                  <span> (faltam {results.daysUntilNextPhase} dia(s) para a fase {results.nextPhase})</span>
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card className="glass-panel tech-border">
                  <CardContent className="p-4">
                    <p className="text-sm text-blue-300 mb-1">Janela Fértil</p>
                    <p className="text-xl font-medium text-blue-200 tech-text-glow">
                      {format(results.fertileStart, "dd/MM/yyyy", { locale: ptBR })} a {" "}
                      {format(results.fertileEnd, "dd/MM/yyyy", { locale: ptBR })}
                    </p>
                    <p className="text-sm text-blue-300/70 mt-2">Durante estes dias, a probabilidade de concepção é elevada</p>
                  </CardContent>
                </Card>
                <Card className="glass-panel tech-border pulse-animation">
                  <CardContent className="p-4">
                    <p className="text-sm text-blue-300 mb-1">Dia Provável da Ovulação</p>
                    <p className="text-xl font-medium text-blue-200 tech-text-glow">
                      {format(results.ovulationDay, "dd/MM/yyyy", { locale: ptBR })}
                    </p>
                    <p className="text-sm text-blue-300/70 mt-2">Período de 24 horas de viabilidade máxima do óvulo pós-ovulação</p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Seção de características corporais na fase atual */}
              <div className="mb-6">
                <button 
                  onClick={() => toggleSection('bodyChanges')}
                  className="w-full flex items-center justify-between p-3 tech-gradient rounded-lg tech-border mb-2"
                >
                  <span className="font-semibold text-blue-100">Biomarcadores na Fase {results.currentCyclePhase}</span>
                  {expandedSection === 'bodyChanges' ? 
                    <ChevronUp className="h-5 w-5 text-blue-200 tech-glow" /> : 
                    <ChevronDown className="h-5 w-5 text-blue-200" />
                  }
                </button>
                
                {expandedSection === 'bodyChanges' && renderCyclePhaseInfo()}
              </div>
              
              {/* Próxima menstruação */}
              <div className="mb-6">
                <button 
                  onClick={() => toggleSection('nextPeriod')}
                  className="w-full flex items-center justify-between p-3 tech-gradient rounded-lg tech-border mb-2"
                >
                  <span className="font-semibold text-blue-100">Próximo Ciclo Menstrual</span>
                  {expandedSection === 'nextPeriod' ? 
                    <ChevronUp className="h-5 w-5 text-blue-200 tech-glow" /> : 
                    <ChevronDown className="h-5 w-5 text-blue-200" />
                  }
                </button>
                
                {expandedSection === 'nextPeriod' && (
                  <div className="mt-3 p-4 glass-panel rounded-lg tech-border">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-3">
                      <div className="text-center">
                        <p className="text-sm text-blue-300">Início</p>
                        <p className="text-xl font-medium text-blue-200 tech-text-glow">{format(results.nextPeriodStart, "dd/MM/yyyy", { locale: ptBR })}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-blue-400" />
                      <div className="text-center">
                        <p className="text-sm text-blue-300">Fim</p>
                        <p className="text-xl font-medium text-blue-200 tech-text-glow">{format(results.nextPeriodEnd, "dd/MM/yyyy", { locale: ptBR })}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Calendário */}
              <div>
                <button 
                  onClick={() => toggleSection('calendar')}
                  className="w-full flex items-center justify-between p-3 tech-gradient rounded-lg tech-border mb-2"
                >
                  <div className="flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2 text-blue-200 tech-glow" />
                    <span className="font-semibold text-blue-100">Calendário Analítico</span>
                  </div>
                  {expandedSection === 'calendar' ? 
                    <ChevronUp className="h-5 w-5 text-blue-200 tech-glow" /> : 
                    <ChevronDown className="h-5 w-5 text-blue-200" />
                  }
                </button>
                
                {expandedSection === 'calendar' && (
                  <div className="mt-3 p-4 glass-panel rounded-lg tech-border">
                    <div className="grid grid-cols-7 gap-1 text-center text-sm">
                      <div className="p-1 font-medium text-blue-300">Dom</div>
                      <div className="p-1 font-medium text-blue-300">Seg</div>
                      <div className="p-1 font-medium text-blue-300">Ter</div>
                      <div className="p-1 font-medium text-blue-300">Qua</div>
                      <div className="p-1 font-medium text-blue-300">Qui</div>
                      <div className="p-1 font-medium text-blue-300">Sex</div>
                      <div className="p-1 font-medium text-blue-300">Sáb</div>
                      {renderCalendar()}
                    </div>
                    
                    <div className="flex flex-wrap justify-center items-center mt-4 text-sm gap-3 text-blue-200">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-red-300/50 rounded mr-1 tech-border"></div>
                        <span>Menstruação</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 fertile-day rounded mr-1 tech-border"></div>
                        <span>Período Fértil</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 ovulation-day rounded mr-1 tech-border pulse-animation"></div>
                        <span>Ovulação</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 border border-blue-500 rounded mr-1 tech-highlight"></div>
                        <span>Hoje</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}


    </div>
  );
};

export default FertilityCalculator;
