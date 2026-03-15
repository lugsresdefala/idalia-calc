
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Info,
  Droplets,
  Thermometer,
  ChevronDown,
  ChevronUp,
  Calendar as CalendarIcon,
  ArrowRight,
  Lock,
  Sparkles,
  LogIn,
  Activity,
  Heart,
  Clock,
  TrendingUp
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
import CycleVisualization from "@/components/ui/CycleVisualization";
import TemperatureChart from "@/components/ui/TemperatureChart";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

const PHASE_CONFIG: Record<string, { color: string; bg: string; border: string; dot: string; label: string; description: string }> = {
  menstrual:  { color: "text-red-300",    bg: "bg-red-500/15",    border: "border-red-500/30",    dot: "bg-red-400",    label: "Menstrual",  description: "Fase de renovação" },
  folicular:  { color: "text-blue-300",   bg: "bg-blue-500/15",   border: "border-blue-500/30",   dot: "bg-blue-400",   label: "Folicular",  description: "Fase de crescimento" },
  fértil:     { color: "text-cyan-300",   bg: "bg-cyan-500/15",   border: "border-cyan-500/30",   dot: "bg-cyan-400",   label: "Fértil",     description: "Janela de fertilidade" },
  ovulatória: { color: "text-yellow-300", bg: "bg-yellow-500/15", border: "border-yellow-500/30", dot: "bg-yellow-400", label: "Ovulatória", description: "Pico máximo de fertilidade" },
  lútea:      { color: "text-teal-300",   bg: "bg-teal-500/15",   border: "border-teal-500/30",   dot: "bg-teal-400",   label: "Lútea",      description: "Fase de espera" },
};

const CYCLE_PHASES = [
  { key: "menstrual",  label: "Menstrual",  color: "bg-red-400",    width: 18 },
  { key: "folicular",  label: "Folicular",  color: "bg-blue-400",   width: 32 },
  { key: "fértil",     label: "Fértil",     color: "bg-cyan-400",   width: 21 },
  { key: "lútea",      label: "Lútea",      color: "bg-teal-400",   width: 29 },
];

const FertilityCalculator = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [lastPeriodStart, setLastPeriodStart] = useState<string>("");
  const [lastPeriodEnd, setLastPeriodEnd] = useState<string>("");
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [cycleHistory, setCycleHistory] = useState<CycleHistory[]>([]);
  const [expandedSection, setExpandedSection] = useState<string | null>("bodyChanges");
  const [hasFullAccess, setHasFullAccess] = useState(false);
  const [accessMessage, setAccessMessage] = useState("");
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

  useEffect(() => {
    checkAccess();
  }, [isAuthenticated]);

  const checkAccess = async () => {
    try {
      const response = await fetch('/api/check-calculation-access');
      const data = await response.json();
      setHasFullAccess(data.hasFullAccess);
      setAccessMessage(data.message || '');
    } catch (error) {
      setHasFullAccess(false);
    }
  };

  const handleCalculate = async () => {
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

      if (isWithinInterval(today, { start: new Date(lastPeriodStart), end: new Date(lastPeriodEnd) })) {
        currentCyclePhase = "menstrual";
        nextPhase = "folicular";
        daysUntilNextPhase = differenceInDays(new Date(lastPeriodEnd), today) + 1;
      } else if (isWithinInterval(today, { start: addDays(new Date(lastPeriodEnd), 1), end: addDays(result.fertileStart, -1) })) {
        currentCyclePhase = "folicular";
        nextPhase = "fértil";
        daysUntilNextPhase = differenceInDays(result.fertileStart, today);
      } else if (isWithinInterval(today, { start: result.fertileStart, end: result.fertileEnd })) {
        currentCyclePhase = isSameDay(today, result.ovulationDay) ? "ovulatória" : "fértil";
        nextPhase = "lútea";
        daysUntilNextPhase = differenceInDays(addDays(result.fertileEnd, 1), today);
      } else if (isWithinInterval(today, { start: addDays(result.fertileEnd, 1), end: addDays(result.nextPeriodStart, -1) })) {
        currentCyclePhase = "lútea";
        nextPhase = "menstrual";
        daysUntilNextPhase = differenceInDays(result.nextPeriodStart, today);
      } else if (isWithinInterval(today, { start: result.nextPeriodStart, end: result.nextPeriodEnd })) {
        currentCyclePhase = "menstrual";
        nextPhase = "folicular";
        daysUntilNextPhase = differenceInDays(result.nextPeriodEnd, today) + 1;
      }

      setResults({ ...result, currentCyclePhase, daysUntilNextPhase, nextPhase });

      if (!hasFullAccess) return;

      if (isAuthenticated) {
        try {
          await apiRequest('POST', '/api/register-calculation-use', {
            calculationType: 'fertility',
            calculationData: { lastPeriodStart, lastPeriodEnd, cycleLength, result: { ...result, currentCyclePhase, daysUntilNextPhase, nextPhase } }
          });
          await checkAccess();
        } catch (error) {}

        try {
          await apiRequest('POST', '/api/calculator-history', {
            calculatorType: 'fertility',
            inputData: JSON.stringify({ lastPeriodStart, lastPeriodEnd, cycleLength }),
            resultData: JSON.stringify({ ...result, currentCyclePhase, daysUntilNextPhase, nextPhase })
          });
        } catch (error) {}
      }
    } catch (error) {}
  };

  const renderCalendar = () => {
    if (!results) return null;

    const startDate = startOfMonth(results.nextPeriodStart);
    const endDate = endOfMonth(results.nextPeriodStart);
    const startDayOfWeek = getDay(startDate);
    const today = new Date();
    const days = [];

    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="p-0.5 sm:p-1.5" />);
    }

    let currentDate = startDate;
    while (currentDate <= endDate) {
      const isToday = isSameDay(currentDate, today);
      const isPeriodDay = isWithinInterval(currentDate, { start: results.nextPeriodStart, end: results.nextPeriodEnd })
        || isWithinInterval(currentDate, { start: new Date(lastPeriodStart), end: new Date(lastPeriodEnd) });
      const isFertileDay = isWithinInterval(currentDate, { start: results.fertileStart, end: results.fertileEnd });
      const isOvulationDay = isSameDay(currentDate, results.ovulationDay);

      let cellClass = "relative flex items-center justify-center rounded-lg text-xs sm:text-sm font-medium h-7 sm:h-8 transition-all duration-200 ";

      if (isOvulationDay) {
        cellClass += "bg-cyan-400 text-slate-900 shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-300";
      } else if (isFertileDay) {
        cellClass += "bg-cyan-500/25 text-cyan-200 ring-1 ring-cyan-500/40";
      } else if (isPeriodDay) {
        cellClass += "bg-red-500/25 text-red-200 ring-1 ring-red-500/30";
      } else if (isToday) {
        cellClass += "ring-2 ring-blue-400 text-blue-200 bg-blue-500/10";
      } else {
        cellClass += "text-blue-300/70 hover:bg-blue-800/30";
      }

      days.push(
        <div key={currentDate.toISOString()} className={cellClass}>
          {format(currentDate, "d")}
          {isOvulationDay && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />}
        </div>
      );

      currentDate = addDays(currentDate, 1);
    }

    return days;
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const phaseConfig = results ? (PHASE_CONFIG[results.currentCyclePhase] || PHASE_CONFIG["folicular"]) : null;

  const renderCyclePhaseInfo = () => {
    if (!results) return null;
    const { mucus, bbt, hormones } = getCyclePhaseDetail(results.currentCyclePhase);

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
        <div className="glass-panel tech-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-blue-500/20">
              <Droplets className="h-4 w-4 text-blue-300" />
            </div>
            <span className="text-sm font-medium text-blue-200">Muco Cervical</span>
          </div>
          <p className="text-xs text-blue-300/80 leading-relaxed">{mucus}</p>
        </div>

        <div className="glass-panel tech-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-red-500/20">
              <Thermometer className="h-4 w-4 text-red-300" />
            </div>
            <span className="text-sm font-medium text-blue-200">Temperatura Basal</span>
          </div>
          <p className="text-xs text-blue-300/80 leading-relaxed">{bbt}</p>
        </div>

        <div className="glass-panel tech-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-teal-500/20">
              <Activity className="h-4 w-4 text-teal-300" />
            </div>
            <span className="text-sm font-medium text-blue-200">Hormônios</span>
          </div>
          <p className="text-xs text-blue-300/80 leading-relaxed">{hormones}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="glass-card rounded-xl shadow-md p-4 sm:p-6 mb-6 text-blue-100 max-w-full overflow-hidden">
      <h2 className="text-xl sm:text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-300 tech-text-glow">
        Idalia Calc — Análise de Fertilidade
      </h2>

      <div className="mb-5 glass-panel p-3 rounded-lg tech-border">
        <p className="text-xs sm:text-sm text-blue-200/80 italic">
          Sistema avançado de análise de ciclos com detecção de períodos férteis baseada em biomarcadores — muco cervical, temperatura basal e padrões hormonais.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {[
          { id: "last-period-start", label: "Início da Última Menstruação", value: lastPeriodStart, onChange: setLastPeriodStart, tip: "Primeiro dia do seu último ciclo menstrual" },
          { id: "last-period-end",   label: "Fim da Última Menstruação",   value: lastPeriodEnd,   onChange: setLastPeriodEnd,   tip: "Último dia do seu último ciclo menstrual" },
        ].map(field => (
          <div key={field.id}>
            <div className="flex items-center mb-1.5">
              <Label htmlFor={field.id} className="text-sm font-medium text-blue-200">{field.label}</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="ml-1.5 text-blue-400 cursor-help"><Info className="h-3.5 w-3.5 inline" /></span>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[200px] text-xs glass-panel tech-border">{field.tip}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id={field.id}
              type="date"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              className="w-full bg-blue-900/20 border-blue-500/30 text-blue-100 rounded-lg"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 mb-5">
        <div>
          <div className="flex items-center mb-1.5">
            <Label htmlFor="cycle-length" className="text-sm font-medium text-blue-200">Duração Média do Ciclo</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="ml-1.5 text-blue-400 cursor-help"><Info className="h-3.5 w-3.5 inline" /></span>
                </TooltipTrigger>
                <TooltipContent className="max-w-[200px] text-xs glass-panel tech-border">Geralmente entre 21 e 35 dias, com média de 28 dias</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center gap-2">
            <Input
              id="cycle-length"
              type="number"
              min={21}
              max={45}
              value={cycleLength}
              onChange={(e) => setCycleLength(parseInt(e.target.value) || 28)}
              className="w-20 bg-blue-900/20 border-blue-500/30 text-blue-100 rounded-lg"
            />
            <span className="text-sm text-blue-300">dias</span>
          </div>
        </div>
        <Button onClick={handleCalculate} className="tech-button px-8 py-2.5 tech-glow font-semibold">
          Calcular Ciclo
        </Button>
      </div>

      {cycleHistory.length > 0 && (
        <div className="mb-5 p-4 glass-panel rounded-xl tech-border">
          <h3 className="text-base font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">Histórico de Ciclos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {cycleHistory.map((cycle, index) => (
              <div key={index} className="glass-card border-blue-400/20 rounded-lg p-3 text-blue-200 text-sm">
                <p>Início: {format(cycle.periodStart, "dd/MM/yyyy")}</p>
                <p>Duração: {cycle.periodLength} dias</p>
                <p>Ciclo: {cycle.cycleLength} dias</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {results && (
        <div className="mt-6 space-y-5">
          {!hasFullAccess && (
            <Alert className="border-cyan-400/40 bg-cyan-900/20 rounded-xl">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <AlertTitle className="text-cyan-200">{!isAuthenticated ? 'Faça login para ver o resultado completo' : accessMessage}</AlertTitle>
              <AlertDescription className="mt-2">
                {!isAuthenticated ? (
                  <div className="space-y-2">
                    <p className="text-blue-300 text-sm">Você está vendo uma versão limitada do resultado.</p>
                    <div className="flex gap-2 mt-3">
                      <Button onClick={() => window.location.href = '/api/login'} className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-sm">
                        <LogIn className="mr-2 h-4 w-4" /> Fazer Login
                      </Button>
                      <Link href="/subscription">
                        <Button variant="outline" className="border-cyan-400/50 text-cyan-300 text-sm">Ver Planos</Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-blue-300 text-sm">{accessMessage}</p>
                    <Link href="/subscription">
                      <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 mt-2 text-sm">
                        <Sparkles className="mr-2 h-4 w-4" /> Assinar Agora
                      </Button>
                    </Link>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}

          {/* Hero Phase Banner */}
          <div className={`rounded-2xl p-5 border ${phaseConfig?.bg} ${phaseConfig?.border} relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ background: "radial-gradient(ellipse at top right, white, transparent 70%)" }} />
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-2.5 h-2.5 rounded-full ${phaseConfig?.dot} animate-pulse`} />
                  <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Fase Atual</span>
                  {!hasFullAccess && <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 text-xs"><Lock className="mr-1 h-2.5 w-2.5" />Parcial</Badge>}
                </div>
                <h3 className={`text-2xl sm:text-3xl font-bold capitalize ${phaseConfig?.color} tech-text-glow`}>
                  {results.currentCyclePhase}
                </h3>
                <p className="text-sm text-blue-300/70 mt-1">{phaseConfig?.description}</p>
              </div>
              <div className="flex gap-4">
                {results.daysUntilNextPhase > 0 && (
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">{results.daysUntilNextPhase}</div>
                    <div className="text-xs text-blue-400 uppercase tracking-wide">dias para</div>
                    <div className={`text-xs font-semibold capitalize ${PHASE_CONFIG[results.nextPhase]?.color || "text-blue-300"}`}>{results.nextPhase}</div>
                  </div>
                )}
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{cycleLength}</div>
                  <div className="text-xs text-blue-400 uppercase tracking-wide">dias</div>
                  <div className="text-xs font-semibold text-blue-300">do ciclo</div>
                </div>
              </div>
            </div>

            {/* Phase progress bar */}
            <div className="mt-4">
              <div className="flex h-2.5 rounded-full overflow-hidden gap-px">
                {CYCLE_PHASES.map(p => (
                  <div
                    key={p.key}
                    className={`${p.color} ${results.currentCyclePhase === p.key || results.currentCyclePhase === "ovulatória" && p.key === "fértil" ? "opacity-100" : "opacity-30"} transition-opacity duration-500`}
                    style={{ width: `${p.width}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-1">
                {CYCLE_PHASES.map(p => (
                  <span key={p.key} className="text-xs text-blue-400/60" style={{ width: `${p.width}%` }}>{p.label}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Key Date Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Fertile Window */}
            <div className={`rounded-xl border relative overflow-hidden ${!hasFullAccess ? "border-slate-700/50" : "border-cyan-500/30"}`}>
              {!hasFullAccess && (
                <div className="absolute inset-0 z-10 bg-slate-900/85 backdrop-blur-sm flex flex-col items-center justify-center gap-2">
                  <Lock className="h-7 w-7 text-cyan-400" />
                  <span className="text-xs text-cyan-300">Conteúdo Premium</span>
                </div>
              )}
              <div className={`p-4 ${!hasFullAccess ? "blur-sm" : ""}`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded-lg bg-cyan-500/20">
                    <Heart className="h-4 w-4 text-cyan-300" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Janela Fértil</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-center">
                    <div className="text-xs text-blue-400 mb-0.5">Início</div>
                    <div className="text-base font-bold text-white">{format(results.fertileStart, "dd MMM", { locale: ptBR })}</div>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="h-px flex-1 bg-cyan-500/30" />
                    <ArrowRight className="h-3 w-3 text-cyan-400 mx-1" />
                    <div className="h-px flex-1 bg-cyan-500/30" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-blue-400 mb-0.5">Fim</div>
                    <div className="text-base font-bold text-white">{format(results.fertileEnd, "dd MMM", { locale: ptBR })}</div>
                  </div>
                </div>
                <p className="text-xs text-blue-300/60 mt-3">Probabilidade elevada de concepção</p>
              </div>
            </div>

            {/* Ovulation Day */}
            <div className={`rounded-xl border relative overflow-hidden ${!hasFullAccess ? "border-slate-700/50" : "border-yellow-500/30"}`}>
              {!hasFullAccess && (
                <div className="absolute inset-0 z-10 bg-slate-900/85 backdrop-blur-sm flex flex-col items-center justify-center gap-2">
                  <Lock className="h-7 w-7 text-cyan-400" />
                  <span className="text-xs text-cyan-300">Conteúdo Premium</span>
                </div>
              )}
              <div className={`p-4 ${!hasFullAccess ? "blur-sm" : ""}`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded-lg bg-yellow-500/20">
                    <Sparkles className="h-4 w-4 text-yellow-300" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-yellow-400">Dia da Ovulação</span>
                  <span className="ml-auto">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full inline-block animate-pulse" />
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {format(results.ovulationDay, "dd 'de' MMMM", { locale: ptBR })}
                </div>
                <p className="text-xs text-blue-300/60">24h de viabilidade máxima do óvulo</p>
              </div>
            </div>
          </div>

          {/* Next Period */}
          <div className="rounded-xl border border-blue-500/20 overflow-hidden">
            <button
              onClick={() => toggleSection('nextPeriod')}
              className="w-full flex items-center justify-between p-4 tech-gradient hover:opacity-90 transition-opacity"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-blue-500/20">
                  <Clock className="h-4 w-4 text-blue-300" />
                </div>
                <span className="text-sm font-semibold text-blue-100">Próxima Menstruação</span>
              </div>
              {expandedSection === 'nextPeriod'
                ? <ChevronUp className="h-4 w-4 text-blue-300" />
                : <ChevronDown className="h-4 w-4 text-blue-300" />}
            </button>
            {expandedSection === 'nextPeriod' && (
              <div className="p-4 glass-panel">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <div className="text-center">
                    <div className="text-xs text-blue-400 mb-1 uppercase tracking-wide">Início</div>
                    <div className="text-xl font-bold text-blue-100">{format(results.nextPeriodStart, "dd/MM/yyyy", { locale: ptBR })}</div>
                    <div className="text-xs text-blue-400 mt-1">{format(results.nextPeriodStart, "EEEE", { locale: ptBR })}</div>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="h-px w-16 bg-blue-500/30" />
                    <ArrowRight className="h-4 w-4 text-blue-400" />
                    <div className="h-px w-16 bg-blue-500/30" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-blue-400 mb-1 uppercase tracking-wide">Fim</div>
                    <div className="text-xl font-bold text-blue-100">{format(results.nextPeriodEnd, "dd/MM/yyyy", { locale: ptBR })}</div>
                    <div className="text-xs text-blue-400 mt-1">{format(results.nextPeriodEnd, "EEEE", { locale: ptBR })}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Biomarcadores */}
          <div className={`rounded-xl border border-blue-500/20 overflow-hidden relative ${!hasFullAccess ? "opacity-60" : ""}`}>
            {!hasFullAccess && <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900/90 rounded-xl" />}
            <button
              onClick={() => hasFullAccess && toggleSection('bodyChanges')}
              className={`w-full flex items-center justify-between p-4 tech-gradient ${!hasFullAccess ? "cursor-not-allowed" : "hover:opacity-90 transition-opacity"}`}
              disabled={!hasFullAccess}
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-teal-500/20">
                  <Activity className="h-4 w-4 text-teal-300" />
                </div>
                <span className="text-sm font-semibold text-blue-100">
                  Biomarcadores — Fase {results.currentCyclePhase}
                  {!hasFullAccess && <Lock className="inline ml-2 h-3.5 w-3.5 text-yellow-400" />}
                </span>
              </div>
              {hasFullAccess && (expandedSection === 'bodyChanges'
                ? <ChevronUp className="h-4 w-4 text-blue-300" />
                : <ChevronDown className="h-4 w-4 text-blue-300" />)}
            </button>
            {expandedSection === 'bodyChanges' && hasFullAccess && (
              <div className="p-4 glass-panel">{renderCyclePhaseInfo()}</div>
            )}
          </div>

          {/* Visualizações Gráficas */}
          {hasFullAccess && (
            <div className="space-y-5">
              <CycleVisualization
                cycleLength={cycleLength}
                currentDay={Math.abs(differenceInDays(new Date(), new Date(lastPeriodStart))) % cycleLength + 1}
                periodLength={5}
                ovulationDay={Math.round(cycleLength - 14)}
              />
              <TemperatureChart ovulationDay={Math.round(cycleLength - 14)} />
            </div>
          )}

          {/* Calendar */}
          <div className="rounded-xl border border-blue-500/20 overflow-hidden">
            <button
              onClick={() => toggleSection('calendar')}
              className="w-full flex items-center justify-between p-4 tech-gradient hover:opacity-90 transition-opacity"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-blue-500/20">
                  <CalendarIcon className="h-4 w-4 text-blue-300" />
                </div>
                <span className="text-sm font-semibold text-blue-100">Calendário Analítico</span>
              </div>
              {expandedSection === 'calendar'
                ? <ChevronUp className="h-4 w-4 text-blue-300" />
                : <ChevronDown className="h-4 w-4 text-blue-300" />}
            </button>
            {expandedSection === 'calendar' && (
              <div className="p-4 glass-panel">
                <p className="text-xs text-center text-blue-400 mb-3 font-medium">
                  {format(results.nextPeriodStart, "MMMM yyyy", { locale: ptBR }).toUpperCase()}
                </p>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {["D","S","T","Q","Q","S","S"].map((d, i) => (
                    <div key={i} className="text-xs font-semibold text-blue-400/60 pb-1">{d}</div>
                  ))}
                  {renderCalendar()}
                </div>
                <div className="flex flex-wrap justify-center items-center mt-4 gap-3 text-xs text-blue-300">
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-red-500/30 ring-1 ring-red-500/40" /><span>Menstruação</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-cyan-500/30 ring-1 ring-cyan-500/40" /><span>Fértil</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-cyan-400 ring-1 ring-cyan-300" /><span>Ovulação</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded ring-2 ring-blue-400" /><span>Hoje</span></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FertilityCalculator;
