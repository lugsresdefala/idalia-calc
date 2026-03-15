import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info, Calendar, Baby, Stethoscope, Syringe, FileHeart, ChevronDown, ChevronUp, CircleAlert as AlertCircle, HeartPulse, Salad, Lock, Sparkles, LogIn, Ruler, Scale, Activity, ArrowRight } from "lucide-react";
import {
  calculateGestationalAgeFromLMP,
  calculateGestationalAgeFromUltrasound,
  calculateGestationalAgeFromTransfer,
  getGestationalDevelopmentInfo,
  getPrenatalCareRecommendations
} from "@/lib/calculators";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { apiRequest } from "@/lib/queryClient";
import GestationalVisualization from "@/components/ui/GestationalVisualization";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

type CalculationType = "lmp" | "ultrasound" | "transfer";

const TRIMESTER_CONFIG = [
  { number: 1, label: "1º Trimestre", color: "text-blue-300",  bg: "bg-blue-500/15",   border: "border-blue-500/30",  bar: "bg-blue-400",   range: "Semanas 1–13",  description: "Formação dos órgãos" },
  { number: 2, label: "2º Trimestre", color: "text-green-300", bg: "bg-green-500/15",  border: "border-green-500/30", bar: "bg-green-400",  range: "Semanas 14–27", description: "Crescimento rápido" },
  { number: 3, label: "3º Trimestre", color: "text-teal-300",  bg: "bg-teal-500/15",   border: "border-teal-500/30",  bar: "bg-teal-400",   range: "Semanas 28–40", description: "Maturação final" },
];

const GestationalCalculator = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [calculationType, setCalculationType] = useState<CalculationType>("lmp");
  const [lmpDate, setLmpDate] = useState<string>("");
  const [ultrasoundDate, setUltrasoundDate] = useState<string>("");
  const [ultrasoundWeeks, setUltrasoundWeeks] = useState<number>(0);
  const [ultrasoundDays, setUltrasoundDays] = useState<number>(0);
  const [transferDate, setTransferDate] = useState<string>("");
  const [embryoDays, setEmbryoDays] = useState<string>("5");
  const [expandedSection, setExpandedSection] = useState<string | null>("development");
  const [hasFullAccess, setHasFullAccess] = useState(false);
  const [accessMessage, setAccessMessage] = useState("");
  const [results, setResults] = useState<{
    gestationalAge: string;
    weeks: number;
    days: number;
    dueDate: string;
    dueDateRaw: Date;
    firstTrimester: string;
    secondTrimester: string;
    currentTrimester: number;
    progressPercent: number;
    developmentInfo: {
      title: string;
      development: string;
      size: string;
      milestone: string;
    };
    prenatalCare: {
      nutrition: string;
      lifestyle: string;
      warning_signs: string;
      examinations: string;
      vaccines: string;
      special_care: string;
    };
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
    try {
      let result;

      if (calculationType === "lmp") {
        if (!lmpDate) return;
        result = calculateGestationalAgeFromLMP(new Date(lmpDate));
      } else if (calculationType === "ultrasound") {
        if (!ultrasoundDate) return;
        result = calculateGestationalAgeFromUltrasound(new Date(ultrasoundDate), ultrasoundWeeks, ultrasoundDays);
      } else if (calculationType === "transfer") {
        if (!transferDate) return;
        result = calculateGestationalAgeFromTransfer(new Date(transferDate), parseInt(embryoDays));
      }

      if (result) {
        const totalWeeks = 40;
        const progressPercent = Math.min(100, Math.round((result.weeks / totalWeeks) * 100));

        setResults({
          gestationalAge: `${result.weeks} semanas e ${result.days} dias`,
          weeks: result.weeks,
          days: result.days,
          dueDate: format(result.dueDate, "dd/MM/yyyy", { locale: ptBR }),
          dueDateRaw: result.dueDate,
          firstTrimester: format(result.firstTrimesterEnd, "dd/MM/yyyy", { locale: ptBR }),
          secondTrimester: format(result.secondTrimesterEnd, "dd/MM/yyyy", { locale: ptBR }),
          currentTrimester: result.currentTrimester,
          progressPercent,
          developmentInfo: result.developmentInfo,
          prenatalCare: result.prenatalCare
        });

        if (!hasFullAccess) return;

        if (isAuthenticated) {
          try {
            await apiRequest('POST', '/api/register-calculation-use', {
              calculationType: 'gestational',
              calculationData: {
                calculationType, lmpDate, ultrasoundDate, ultrasoundWeeks, ultrasoundDays, transferDate, embryoDays,
                result: { gestationalAge: `${result.weeks} semanas e ${result.days} dias`, weeks: result.weeks, days: result.days, dueDate: format(result.dueDate, "dd/MM/yyyy", { locale: ptBR }), currentTrimester: result.currentTrimester }
              }
            });
            await checkAccess();
          } catch (error) {}

          try {
            await apiRequest('POST', '/api/calculator-history', {
              calculatorType: 'gestational',
              inputData: JSON.stringify({ calculationType, lmpDate, ultrasoundDate, ultrasoundWeeks, ultrasoundDays, transferDate, embryoDays }),
              resultData: JSON.stringify({
                gestationalAge: `${result.weeks} semanas e ${result.days} dias`,
                weeks: result.weeks, days: result.days,
                dueDate: format(result.dueDate, "dd/MM/yyyy", { locale: ptBR }),
                firstTrimester: format(result.firstTrimesterEnd, "dd/MM/yyyy", { locale: ptBR }),
                secondTrimester: format(result.secondTrimesterEnd, "dd/MM/yyyy", { locale: ptBR }),
                currentTrimester: result.currentTrimester,
                developmentInfo: result.developmentInfo,
                prenatalCare: result.prenatalCare
              })
            });
          } catch (error) {}
        }
      }
    } catch (error) {}
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const trimesterCfg = results ? TRIMESTER_CONFIG[results.currentTrimester - 1] : null;

  const renderInputSection = () => {
    if (calculationType === "lmp") return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center mb-1.5">
            <Label htmlFor="lmp-date" className="text-sm font-medium text-blue-200">Data da Última Menstruação</Label>
            <TooltipProvider><Tooltip>
              <TooltipTrigger asChild><span className="ml-1.5 text-blue-400 cursor-help"><Info className="h-3.5 w-3.5 inline" /></span></TooltipTrigger>
              <TooltipContent className="max-w-[200px] text-xs glass-panel tech-border">Primeiro dia do último ciclo menstrual</TooltipContent>
            </Tooltip></TooltipProvider>
          </div>
          <Input id="lmp-date" type="date" value={lmpDate} onChange={(e) => setLmpDate(e.target.value)} className="w-full bg-blue-900/20 border-blue-500/30 text-blue-100 rounded-lg" />
        </div>
        <div className="flex items-end">
          <Button onClick={handleCalculate} className="tech-button px-8 py-2.5 tech-glow font-semibold">Calcular</Button>
        </div>
      </div>
    );

    if (calculationType === "ultrasound") return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center mb-1.5">
              <Label htmlFor="usg-date" className="text-sm font-medium text-blue-200">Data do Ultrassom</Label>
              <TooltipProvider><Tooltip>
                <TooltipTrigger asChild><span className="ml-1.5 text-blue-400 cursor-help"><Info className="h-3.5 w-3.5 inline" /></span></TooltipTrigger>
                <TooltipContent className="max-w-[200px] text-xs glass-panel tech-border">Data em que o exame de ultrassom foi realizado</TooltipContent>
              </Tooltip></TooltipProvider>
            </div>
            <Input id="usg-date" type="date" value={ultrasoundDate} onChange={(e) => setUltrasoundDate(e.target.value)} className="w-full bg-blue-900/20 border-blue-500/30 text-blue-100 rounded-lg" />
          </div>
          <div>
            <Label className="text-sm font-medium text-blue-200 mb-1.5 block">Idade Gestacional no Ultrassom</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="usg-weeks" className="text-xs text-cyan-300 mb-1 block">Semanas</Label>
                <Input id="usg-weeks" type="number" min={0} max={42} value={ultrasoundWeeks} onChange={(e) => setUltrasoundWeeks(parseInt(e.target.value) || 0)} className="w-full bg-blue-900/20 border-blue-500/30 text-blue-100 rounded-lg" />
              </div>
              <div>
                <Label htmlFor="usg-days" className="text-xs text-cyan-300 mb-1 block">Dias</Label>
                <Input id="usg-days" type="number" min={0} max={6} value={ultrasoundDays} onChange={(e) => setUltrasoundDays(parseInt(e.target.value) || 0)} className="w-full bg-blue-900/20 border-blue-500/30 text-blue-100 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
        <Button onClick={handleCalculate} className="tech-button px-8 py-2.5 tech-glow font-semibold">Calcular</Button>
      </div>
    );

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center mb-1.5">
              <Label htmlFor="transfer-date" className="text-sm font-medium text-blue-200">Data da Transferência Embrionária</Label>
              <TooltipProvider><Tooltip>
                <TooltipTrigger asChild><span className="ml-1.5 text-blue-400 cursor-help"><Info className="h-3.5 w-3.5 inline" /></span></TooltipTrigger>
                <TooltipContent className="max-w-[200px] text-xs glass-panel tech-border">Data em que ocorreu a transferência do embrião</TooltipContent>
              </Tooltip></TooltipProvider>
            </div>
            <Input id="transfer-date" type="date" value={transferDate} onChange={(e) => setTransferDate(e.target.value)} className="w-full bg-blue-900/20 border-blue-500/30 text-blue-100 rounded-lg" />
          </div>
          <div>
            <div className="flex items-center mb-1.5">
              <Label htmlFor="embryo-days" className="text-sm font-medium text-blue-200">Dias de Desenvolvimento do Embrião</Label>
              <TooltipProvider><Tooltip>
                <TooltipTrigger asChild><span className="ml-1.5 text-blue-400 cursor-help"><Info className="h-3.5 w-3.5 inline" /></span></TooltipTrigger>
                <TooltipContent className="max-w-[200px] text-xs glass-panel tech-border">Número de dias que o embrião se desenvolveu antes da transferência (geralmente 3 ou 5)</TooltipContent>
              </Tooltip></TooltipProvider>
            </div>
            <Select value={embryoDays} onValueChange={setEmbryoDays}>
              <SelectTrigger className="w-full bg-blue-900/20 border-blue-500/30 text-blue-100 rounded-lg">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent className="glass-panel tech-border">
                <SelectItem value="3" className="text-blue-200 hover:bg-blue-900/50 focus:bg-blue-800/50">3 dias</SelectItem>
                <SelectItem value="5" className="text-blue-200 hover:bg-blue-900/50 focus:bg-blue-800/50">5 dias (blastocisto)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={handleCalculate} className="tech-button px-8 py-2.5 tech-glow font-semibold">Calcular</Button>
      </div>
    );
  };

  return (
    <div className="glass-card rounded-xl shadow-md p-4 sm:p-6 mb-6 text-blue-100 max-w-full overflow-hidden">
      <h2 className="text-xl sm:text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-300 tech-text-glow">
        Idalia Calc — Análise Gestacional
      </h2>

      <div className="mb-5 glass-panel p-3 rounded-lg tech-border">
        <p className="text-xs sm:text-sm text-blue-200/80 italic">
          Sistema avançado de cálculo gestacional com análise de desenvolvimento embrionário, protocolos de pré-natal e recomendações médicas precisas para cada fase.
        </p>
      </div>

      <div className="mb-5">
        <Label className="text-sm font-medium text-blue-200 mb-2 block">Método de Cálculo</Label>
        <RadioGroup value={calculationType} onValueChange={(v) => setCalculationType(v as CalculationType)} className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { value: "lmp",        label: "Última Menstruação",     desc: "Método padrão" },
            { value: "ultrasound", label: "Data do Ultrassom",       desc: "Via imagem" },
            { value: "transfer",   label: "Transferência Embrionária", desc: "FIV / IVF" },
          ].map(opt => (
            <div key={opt.value} className={`relative flex items-start p-3 rounded-xl tech-border glass-panel cursor-pointer transition-all duration-200 hover:bg-blue-900/30 ${calculationType === opt.value ? "ring-2 ring-cyan-400/50 bg-cyan-900/10" : ""}`}>
              <RadioGroupItem value={opt.value} id={opt.value} className="h-4 w-4 text-blue-400 mt-0.5" />
              <Label htmlFor={opt.value} className="ml-3 cursor-pointer">
                <div className="text-sm font-medium text-blue-200">{opt.label}</div>
                <div className="text-xs text-blue-400/70 mt-0.5">{opt.desc}</div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="mb-6">{renderInputSection()}</div>

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

          {/* Hero Gestational Banner */}
          <div className={`rounded-2xl p-5 border ${trimesterCfg?.bg} ${trimesterCfg?.border} relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ background: "radial-gradient(ellipse at top right, white, transparent 70%)" }} />
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-2.5 h-2.5 rounded-full ${trimesterCfg?.bar} animate-pulse`} />
                  <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">{trimesterCfg?.label}</span>
                  {!hasFullAccess && <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 text-xs"><Lock className="mr-1 h-2.5 w-2.5" />Parcial</Badge>}
                </div>
                <h3 className={`text-3xl sm:text-4xl font-bold ${trimesterCfg?.color} tech-text-glow`}>
                  {results.weeks}<span className="text-lg font-medium ml-1 text-blue-300">sem</span>
                  <span className="ml-2">{results.days}</span><span className="text-lg font-medium ml-1 text-blue-300">dias</span>
                </h3>
                <p className="text-sm text-blue-300/70 mt-1">{trimesterCfg?.description} · {trimesterCfg?.range}</p>
              </div>
              <div className="text-center">
                <div className="text-xs text-blue-400 uppercase tracking-wide mb-1">Progresso</div>
                <div className="text-3xl font-bold text-white">{results.progressPercent}%</div>
                <div className="text-xs text-blue-400">da gestação</div>
              </div>
            </div>

            {/* Gestational progress bar */}
            <div className="mt-4">
              <div className="flex h-2.5 rounded-full overflow-hidden bg-blue-900/40 gap-px">
                <div className="bg-blue-400/80 transition-all duration-700" style={{ width: `${Math.min(32.5, results.progressPercent)}%` }} />
                <div className="bg-green-400/80 transition-all duration-700" style={{ width: `${Math.min(35, Math.max(0, results.progressPercent - 32.5))}%` }} />
                <div className="bg-teal-400/80 transition-all duration-700" style={{ width: `${Math.max(0, results.progressPercent - 67.5)}%` }} />
                <div className="flex-1 bg-blue-900/30" />
              </div>
              <div className="flex justify-between mt-1 text-xs text-blue-400/60">
                <span>1º Trim</span><span>2º Trim</span><span>3º Trim</span><span>40sem</span>
              </div>
            </div>
          </div>

          {/* Key Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Due Date */}
            <div className={`rounded-xl border relative overflow-hidden ${!hasFullAccess ? "border-slate-700/50" : "border-cyan-500/30"}`}>
              {!hasFullAccess && (
                <div className="absolute inset-0 z-10 bg-slate-900/85 backdrop-blur-sm flex flex-col items-center justify-center gap-2">
                  <Lock className="h-6 w-6 text-cyan-400" />
                  <span className="text-xs text-cyan-300">Premium</span>
                </div>
              )}
              <div className={`p-4 ${!hasFullAccess ? "blur-sm" : ""}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-cyan-500/20"><Calendar className="h-4 w-4 text-cyan-300" /></div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Data do Parto</span>
                </div>
                <div className="text-lg font-bold text-white">{results.dueDate}</div>
                <p className="text-xs text-blue-300/60 mt-1">Data provável estimada</p>
              </div>
            </div>

            {/* Fetal Size */}
            <div className="rounded-xl border border-blue-500/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-blue-500/20"><Ruler className="h-4 w-4 text-blue-300" /></div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Tamanho Fetal</span>
              </div>
              <div className="text-lg font-bold text-white">{results.developmentInfo.size}</div>
              <p className="text-xs text-blue-300/60 mt-1">Comparação aproximada</p>
            </div>

            {/* Milestone */}
            <div className="rounded-xl border border-teal-500/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-teal-500/20"><Baby className="h-4 w-4 text-teal-300" /></div>
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">Marco desta Semana</span>
              </div>
              <div className="text-sm font-medium text-white leading-snug">{results.developmentInfo.milestone}</div>
            </div>
          </div>

          {/* Trimester Dates */}
          <div className="rounded-xl border border-blue-500/20 p-4 glass-panel">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg bg-blue-500/20"><Calendar className="h-4 w-4 text-blue-300" /></div>
              <span className="text-sm font-semibold text-blue-200">Fim dos Trimestres</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-0">
              <div className="text-center flex-1">
                <div className={`text-xs font-semibold mb-1 ${TRIMESTER_CONFIG[0].color}`}>1º Trimestre</div>
                <div className="text-base font-bold text-white">{results.firstTrimester}</div>
                <div className="text-xs text-blue-400/60">até semana 13</div>
              </div>
              <ArrowRight className="h-4 w-4 text-blue-500/40 rotate-0 sm:block hidden mx-2" />
              <div className="text-center flex-1">
                <div className={`text-xs font-semibold mb-1 ${TRIMESTER_CONFIG[1].color}`}>2º Trimestre</div>
                <div className="text-base font-bold text-white">{results.secondTrimester}</div>
                <div className="text-xs text-blue-400/60">até semana 27</div>
              </div>
              <ArrowRight className="h-4 w-4 text-blue-500/40 sm:block hidden mx-2" />
              <div className="text-center flex-1">
                <div className={`text-xs font-semibold mb-1 ${TRIMESTER_CONFIG[2].color}`}>3º Trimestre</div>
                <div className="text-base font-bold text-white">{results.dueDate}</div>
                <div className="text-xs text-blue-400/60">até semana 40</div>
              </div>
            </div>
          </div>

          {/* Fetal Development */}
          <div className={`rounded-xl border border-blue-500/20 overflow-hidden relative ${!hasFullAccess ? "opacity-60" : ""}`}>
            {!hasFullAccess && <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900/90 rounded-xl" />}
            <button
              onClick={() => hasFullAccess && toggleSection('development')}
              className={`w-full flex items-center justify-between p-4 tech-gradient ${!hasFullAccess ? "cursor-not-allowed" : "hover:opacity-90 transition-opacity"}`}
              disabled={!hasFullAccess}
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-cyan-500/20"><Baby className="h-4 w-4 text-cyan-300" /></div>
                <span className="text-sm font-semibold text-blue-100">
                  Desenvolvimento Fetal — Semana {results.weeks}
                  {!hasFullAccess && <Lock className="inline ml-2 h-3.5 w-3.5 text-yellow-400" />}
                </span>
              </div>
              {hasFullAccess && (expandedSection === 'development'
                ? <ChevronUp className="h-4 w-4 text-blue-300" />
                : <ChevronDown className="h-4 w-4 text-blue-300" />)}
            </button>
            {expandedSection === 'development' && hasFullAccess && (
              <div className="p-4 glass-panel space-y-4">
                <div>
                  <h4 className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 mb-2">{results.developmentInfo.title}</h4>
                  <p className="text-sm text-blue-200/80 leading-relaxed">{results.developmentInfo.development}</p>
                </div>
                <div className={`rounded-xl p-4 border ${trimesterCfg?.bg} ${trimesterCfg?.border}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <HeartPulse className="h-4 w-4 text-teal-300" />
                    <span className="text-sm font-medium text-teal-200">Trimestre {results.currentTrimester}</span>
                  </div>
                  <p className="text-xs text-blue-300/80">
                    {results.currentTrimester === 1
                      ? "Período crítico de formação dos principais órgãos e sistemas."
                      : results.currentTrimester === 2
                        ? "Fase de crescimento rápido e desenvolvimento dos sistemas."
                        : "Período de ganho de peso e maturação final dos sistemas."}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Prenatal Care */}
          <div className={`rounded-xl border border-blue-500/20 overflow-hidden relative ${!hasFullAccess ? "opacity-60" : ""}`}>
            {!hasFullAccess && <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900/90 rounded-xl" />}
            <button
              onClick={() => hasFullAccess && toggleSection('prenatal')}
              className={`w-full flex items-center justify-between p-4 tech-gradient ${!hasFullAccess ? "cursor-not-allowed" : "hover:opacity-90 transition-opacity"}`}
              disabled={!hasFullAccess}
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-teal-500/20"><Stethoscope className="h-4 w-4 text-teal-300" /></div>
                <span className="text-sm font-semibold text-blue-100">
                  Cuidados Pré-Natais
                  {!hasFullAccess && <Lock className="inline ml-2 h-3.5 w-3.5 text-yellow-400" />}
                </span>
              </div>
              {hasFullAccess && (expandedSection === 'prenatal'
                ? <ChevronUp className="h-4 w-4 text-blue-300" />
                : <ChevronDown className="h-4 w-4 text-blue-300" />)}
            </button>
            {expandedSection === 'prenatal' && hasFullAccess && (
              <div className="p-4 glass-panel space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="rounded-xl p-4 bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1 rounded-lg bg-blue-500/20"><FileHeart className="h-4 w-4 text-blue-300" /></div>
                      <span className="text-sm font-medium text-blue-200">Exames Recomendados</span>
                    </div>
                    <p className="text-xs text-blue-300/80 leading-relaxed">{results.prenatalCare.examinations}</p>
                  </div>

                  <div className="rounded-xl p-4 bg-teal-500/10 border border-teal-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1 rounded-lg bg-teal-500/20"><Syringe className="h-4 w-4 text-teal-300" /></div>
                      <span className="text-sm font-medium text-blue-200">Vacinas</span>
                    </div>
                    <p className="text-xs text-blue-300/80 leading-relaxed">{results.prenatalCare.vaccines}</p>
                  </div>

                  <div className="rounded-xl p-4 bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1 rounded-lg bg-green-500/20"><Salad className="h-4 w-4 text-green-300" /></div>
                      <span className="text-sm font-medium text-blue-200">Alimentação</span>
                    </div>
                    <p className="text-xs text-blue-300/80 leading-relaxed">{results.prenatalCare.nutrition}</p>
                  </div>

                  <div className="rounded-xl p-4 bg-cyan-500/10 border border-cyan-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1 rounded-lg bg-cyan-500/20"><HeartPulse className="h-4 w-4 text-cyan-300" /></div>
                      <span className="text-sm font-medium text-blue-200">Cuidados Especiais</span>
                    </div>
                    <p className="text-xs text-blue-300/80 leading-relaxed">{results.prenatalCare.special_care}</p>
                  </div>
                </div>

                <div className="rounded-xl p-4 bg-red-500/10 border border-red-500/25">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-red-300" />
                    <span className="text-sm font-semibold text-red-200">Sinais de Alerta</span>
                    <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-xs ml-auto">Urgente</Badge>
                  </div>
                  <p className="text-xs text-blue-300/80 leading-relaxed">{results.prenatalCare.warning_signs}</p>
                </div>
              </div>
            )}
          </div>

          {/* Gestational Visualization */}
          {hasFullAccess && (
            <div>
              <GestationalVisualization
                currentWeek={results.weeks}
                dueDate={results.dueDateRaw}
              />
            </div>
          )}

          {/* Important Note */}
          <div className="rounded-xl border border-blue-500/15 p-4 glass-panel">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-teal-300 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold text-cyan-300">IMPORTANTE: </span>
                <span className="text-xs text-blue-300/70">Esta ferramenta fornece estimativas baseadas em cálculos padrão. As recomendações são baseadas nas diretrizes do Ministério da Saúde, Febrasgo e ACOG. Consulte sempre um profissional de saúde.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestationalCalculator;
