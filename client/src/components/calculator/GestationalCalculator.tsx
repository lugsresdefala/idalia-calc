import { useState } from "react";
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
import { 
  Info, 
  Calendar, 
  Baby, 
  Stethoscope, 
  Syringe, 
  FileHeart, 
  ChevronDown, 
  ChevronUp,
  AlertCircle,
  HeartPulse,
  Salad
} from "lucide-react";
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

type CalculationType = "lmp" | "ultrasound" | "transfer";

const GestationalCalculator = () => {
  const [calculationType, setCalculationType] = useState<CalculationType>("lmp");
  const [lmpDate, setLmpDate] = useState<string>("");
  const [ultrasoundDate, setUltrasoundDate] = useState<string>("");
  const [ultrasoundWeeks, setUltrasoundWeeks] = useState<number>(0);
  const [ultrasoundDays, setUltrasoundDays] = useState<number>(0);
  const [transferDate, setTransferDate] = useState<string>("");
  const [embryoDays, setEmbryoDays] = useState<string>("5");
  const [expandedSection, setExpandedSection] = useState<string | null>("development");
  const [results, setResults] = useState<{
    gestationalAge: string;
    weeks: number;
    days: number;
    dueDate: string;
    firstTrimester: string;
    secondTrimester: string;
    currentTrimester: number;
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

  const handleCalculate = async () => {
    try {
      let result;

      if (calculationType === "lmp") {
        if (!lmpDate) return;
        result = calculateGestationalAgeFromLMP(new Date(lmpDate));
      } else if (calculationType === "ultrasound") {
        if (!ultrasoundDate) return;
        result = calculateGestationalAgeFromUltrasound(
          new Date(ultrasoundDate),
          ultrasoundWeeks,
          ultrasoundDays
        );
      } else if (calculationType === "transfer") {
        if (!transferDate) return;
        result = calculateGestationalAgeFromTransfer(
          new Date(transferDate),
          parseInt(embryoDays)
        );
      }

      if (result) {
        setResults({
          gestationalAge: `${result.weeks} semanas e ${result.days} dias`,
          weeks: result.weeks,
          days: result.days,
          dueDate: format(result.dueDate, "dd/MM/yyyy", { locale: ptBR }),
          firstTrimester: format(result.firstTrimesterEnd, "dd/MM/yyyy", { locale: ptBR }),
          secondTrimester: format(result.secondTrimesterEnd, "dd/MM/yyyy", { locale: ptBR }),
          currentTrimester: result.currentTrimester,
          developmentInfo: result.developmentInfo,
          prenatalCare: result.prenatalCare
        });
        
        // Salvar no histórico
        try {
          await apiRequest('POST', '/api/calculator-history', {
            calculatorType: 'gestational',
            inputData: JSON.stringify({ 
              calculationType,
              lmpDate,
              ultrasoundDate,
              ultrasoundWeeks,
              ultrasoundDays,
              transferDate,
              embryoDays 
            }),
            resultData: JSON.stringify({
              gestationalAge: `${result.weeks} semanas e ${result.days} dias`,
              weeks: result.weeks,
              days: result.days,
              dueDate: format(result.dueDate, "dd/MM/yyyy", { locale: ptBR }),
              firstTrimester: format(result.firstTrimesterEnd, "dd/MM/yyyy", { locale: ptBR }),
              secondTrimester: format(result.secondTrimesterEnd, "dd/MM/yyyy", { locale: ptBR }),
              currentTrimester: result.currentTrimester,
              developmentInfo: result.developmentInfo,
              prenatalCare: result.prenatalCare
            })
          });
        } catch (error) {
          console.error('Erro ao salvar histórico:', error);
        }
      }
    } catch (error) {
      console.error("Calculation error:", error);
    }
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <div className="glass-card rounded-lg shadow-md p-4 sm:p-6 mb-6 text-blue-100 max-w-full overflow-hidden">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-300 tech-text-glow">Idalia Calc - Análise Gestacional</h2>
      
      <div className="mb-6 glass-panel p-3 sm:p-4 rounded-lg tech-border">
        <p className="text-xs sm:text-sm text-blue-200 italic">
          Sistema avançado de cálculo gestacional com análise de desenvolvimento embrionário, protocolos de pré-natal e recomendações médicas precisas para cada fase.
        </p>
      </div>

      <div className="mb-6">
        <Label className="block text-sm font-medium text-blue-200 mb-2">Método de Cálculo</Label>
        <RadioGroup 
          value={calculationType} 
          onValueChange={(value) => setCalculationType(value as CalculationType)}
          className="grid grid-cols-1 md:grid-cols-3 gap-3"
        >
          <div className="relative flex items-center p-3 rounded tech-border glass-panel cursor-pointer hover:bg-blue-900/30 transition">
            <RadioGroupItem value="lmp" id="lmp" className="h-4 w-4 text-blue-400" />
            <Label htmlFor="lmp" className="ml-3 font-medium text-sm cursor-pointer text-blue-200">
              Data da Última Menstruação
            </Label>
          </div>
          <div className="relative flex items-center p-3 rounded tech-border glass-panel cursor-pointer hover:bg-blue-900/30 transition">
            <RadioGroupItem value="ultrasound" id="ultrasound" className="h-4 w-4 text-blue-400" />
            <Label htmlFor="ultrasound" className="ml-3 font-medium text-sm cursor-pointer text-blue-200">
              Data do Ultrassom
            </Label>
          </div>
          <div className="relative flex items-center p-3 rounded tech-border glass-panel cursor-pointer hover:bg-blue-900/30 transition">
            <RadioGroupItem value="transfer" id="transfer" className="h-4 w-4 text-blue-400" />
            <Label htmlFor="transfer" className="ml-3 font-medium text-sm cursor-pointer text-blue-200">
              Transferência Embrionária
            </Label>
          </div>
        </RadioGroup>
      </div>

      {calculationType === "lmp" && (
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center">
                <Label htmlFor="lmp-date" className="block text-sm font-medium text-blue-200 mb-2">
                  Data da Última Menstruação
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="ml-1 text-blue-400 cursor-help">
                        <Info className="h-4 w-4 inline tech-glow" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[200px] text-xs glass-panel tech-border">
                      Primeiro dia do último ciclo menstrual
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input 
                id="lmp-date" 
                type="date" 
                value={lmpDate}
                onChange={(e) => setLmpDate(e.target.value)}
                className="mt-1 w-full bg-blue-900/20 border-blue-500/30 text-blue-100"
              />
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
        </div>
      )}

      {calculationType === "ultrasound" && (
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center">
                <Label htmlFor="usg-date" className="block text-sm font-medium text-blue-200 mb-2">
                  Data do Ultrassom
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="ml-1 text-blue-400 cursor-help">
                        <Info className="h-4 w-4 inline tech-glow" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[200px] text-xs glass-panel tech-border">
                      Data em que o exame de ultrassom foi realizado
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input 
                id="usg-date" 
                type="date" 
                value={ultrasoundDate}
                onChange={(e) => setUltrasoundDate(e.target.value)}
                className="mt-1 w-full bg-blue-900/20 border-blue-500/30 text-blue-100"
              />
            </div>
            <div>
              <Label htmlFor="usg-weeks" className="block text-sm font-medium text-blue-200 mb-2">
                Idade Gestacional no Ultrassom
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="usg-weeks" className="block text-xs text-cyan-300">Semanas</Label>
                  <Input 
                    id="usg-weeks"
                    type="number"
                    min={0}
                    max={42}
                    value={ultrasoundWeeks}
                    onChange={(e) => setUltrasoundWeeks(parseInt(e.target.value) || 0)}
                    className="mt-1 w-full bg-blue-900/20 border-blue-500/30 text-blue-100"
                  />
                </div>
                <div>
                  <Label htmlFor="usg-days" className="block text-xs text-cyan-300">Dias</Label>
                  <Input 
                    id="usg-days"
                    type="number"
                    min={0}
                    max={6}
                    value={ultrasoundDays}
                    onChange={(e) => setUltrasoundDays(parseInt(e.target.value) || 0)}
                    className="mt-1 w-full bg-blue-900/20 border-blue-500/30 text-blue-100"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Button 
              onClick={handleCalculate}
              className="tech-button px-6 py-2 tech-glow"
            >
              Calcular
            </Button>
          </div>
        </div>
      )}

      {calculationType === "transfer" && (
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center">
                <Label htmlFor="transfer-date" className="block text-sm font-medium text-blue-200 mb-2">
                  Data da Transferência Embrionária
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="ml-1 text-blue-400 cursor-help">
                        <Info className="h-4 w-4 inline tech-glow" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[200px] text-xs glass-panel tech-border">
                      Data em que ocorreu a transferência do embrião
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input 
                id="transfer-date" 
                type="date" 
                value={transferDate}
                onChange={(e) => setTransferDate(e.target.value)}
                className="mt-1 w-full bg-blue-900/20 border-blue-500/30 text-blue-100"
              />
            </div>
            <div>
              <div className="flex items-center">
                <Label htmlFor="embryo-days" className="block text-sm font-medium text-blue-200 mb-2">
                  Dias de Desenvolvimento do Embrião
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="ml-1 text-blue-400 cursor-help">
                        <Info className="h-4 w-4 inline tech-glow" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[200px] text-xs glass-panel tech-border">
                      Número de dias que o embrião se desenvolveu antes da transferência (geralmente 3 ou 5 dias)
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select 
                value={embryoDays} 
                onValueChange={setEmbryoDays}
              >
                <SelectTrigger className="mt-1 w-full bg-blue-900/20 border-blue-500/30 text-blue-100">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent className="glass-panel tech-border">
                  <SelectItem value="3" className="text-blue-200 hover:bg-blue-900/50 focus:bg-blue-800/50">3 dias</SelectItem>
                  <SelectItem value="5" className="text-blue-200 hover:bg-blue-900/50 focus:bg-blue-800/50">5 dias (blastocisto)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4">
            <Button 
              onClick={handleCalculate}
              className="tech-button px-6 py-2 tech-glow"
            >
              Calcular
            </Button>
          </div>
        </div>
      )}

      {results && (
        <div className="mt-8">
          <Card className="glass-card border-blue-400/30 overflow-hidden">
            <CardHeader className="glass-header pb-4">
              <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-200 tech-text-glow">Análise Gestacional</CardTitle>
              <CardDescription className="text-blue-200">
                <span className="font-semibold tech-text-glow">{results.gestationalAge}</span> - {results.currentTrimester}º Trimestre
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-4 sm:pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
                <Card className="glass-panel tech-border">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 tech-glow mr-2" />
                      <p className="text-xs sm:text-sm text-blue-300">Data Provável do Parto</p>
                    </div>
                    <p className="text-base sm:text-xl font-medium text-blue-200 tech-text-glow">{results.dueDate}</p>
                  </CardContent>
                </Card>
                <Card className="glass-panel tech-border col-span-1 md:col-span-2">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-teal-400 tech-glow mr-2" />
                      <p className="text-xs sm:text-sm text-blue-300">Trimestres</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:gap-4">
                      <div>
                        <p className="text-xs sm:text-sm text-cyan-300">1º Trimestre até:</p>
                        <p className="text-xs sm:text-sm font-medium text-blue-200">{results.firstTrimester}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-cyan-300">2º Trimestre até:</p>
                        <p className="text-xs sm:text-sm font-medium text-blue-200">{results.secondTrimester}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Desenvolvimento Fetal */}
              <div className="mb-6">
                <button 
                  onClick={() => toggleSection('development')}
                  className="w-full flex items-center justify-between p-2 sm:p-3 tech-gradient rounded-lg tech-border mb-2"
                >
                  <div className="flex items-center">
                    <Baby className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-cyan-300 tech-glow" />
                    <span className="text-sm sm:text-base font-semibold text-blue-100">Desenvolvimento Fetal</span>
                  </div>
                  {expandedSection === 'development' ? <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-200 tech-glow" /> : <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-blue-200" />}
                </button>
                
                {expandedSection === 'development' && (
                  <div className="mt-2 sm:mt-3 p-3 sm:p-4 glass-panel rounded-lg tech-border">
                    <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 tech-text-glow">{results.developmentInfo.title}</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <p className="text-sm font-medium mb-1 text-cyan-300">Desenvolvimento:</p>
                        <p className="text-xs sm:text-sm text-blue-200 mb-3">{results.developmentInfo.development}</p>
                        
                        <p className="text-sm font-medium mb-1 text-cyan-300">Marco importante:</p>
                        <p className="text-xs sm:text-sm text-blue-200">{results.developmentInfo.milestone}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1 text-cyan-300">Tamanho aproximado:</p>
                        <p className="text-base sm:text-xl font-bold text-blue-100 tech-text-glow mb-3 sm:mb-4">{results.developmentInfo.size}</p>
                        
                        <div className="glass-panel p-2 sm:p-3 tech-border rounded-lg">
                          <p className="text-xs sm:text-sm text-blue-200">
                            <span className="font-medium text-teal-300">Trimestre {results.currentTrimester}: </span>
                            {results.currentTrimester === 1 
                              ? "Formação dos principais órgãos e sistemas."
                              : results.currentTrimester === 2 
                                ? "Crescimento rápido e desenvolvimento de sistemas."
                                : "Ganho de peso e maturação final dos sistemas."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Recomendações Pré-Natal */}
              <div className="mb-6">
                <button 
                  onClick={() => toggleSection('prenatal')}
                  className="w-full flex items-center justify-between p-2 sm:p-3 tech-gradient rounded-lg tech-border mb-2"
                >
                  <div className="flex items-center">
                    <Stethoscope className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-teal-300 tech-glow" />
                    <span className="text-sm sm:text-base font-semibold text-blue-100">Cuidados Pré-Natais</span>
                  </div>
                  {expandedSection === 'prenatal' ? <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-200 tech-glow" /> : <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-blue-200" />}
                </button>
                
                {expandedSection === 'prenatal' && (
                  <div className="mt-2 sm:mt-3">
                    <div className="mb-3 sm:mb-4 glass-panel rounded-lg tech-border p-3 sm:p-4">
                      <div className="flex items-center mb-1 sm:mb-2">
                        <FileHeart className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 tech-glow mr-2" />
                        <h5 className="text-sm sm:text-base font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">Exames Recomendados</h5>
                      </div>
                      <p className="text-xs sm:text-sm text-blue-200">{results.prenatalCare.examinations}</p>
                    </div>
                    
                    <div className="mb-3 sm:mb-4 glass-panel rounded-lg tech-border p-3 sm:p-4">
                      <div className="flex items-center mb-1 sm:mb-2">
                        <Syringe className="h-4 w-4 sm:h-5 sm:w-5 text-teal-400 tech-glow mr-2" />
                        <h5 className="text-sm sm:text-base font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">Vacinas</h5>
                      </div>
                      <p className="text-xs sm:text-sm text-blue-200">{results.prenatalCare.vaccines}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <div className="glass-panel rounded-lg tech-border p-3 sm:p-4">
                        <div className="flex items-center mb-1 sm:mb-2">
                          <Salad className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 tech-glow mr-2" />
                          <h5 className="text-sm sm:text-base font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">Alimentação e Suplementação</h5>
                        </div>
                        <p className="text-xs sm:text-sm text-blue-200">{results.prenatalCare.nutrition}</p>
                      </div>
                      
                      <div className="glass-panel rounded-lg tech-border p-3 sm:p-4">
                        <div className="flex items-center mb-1 sm:mb-2">
                          <HeartPulse className="h-4 w-4 sm:h-5 sm:w-5 text-teal-400 tech-glow mr-2" />
                          <h5 className="text-sm sm:text-base font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">Cuidados Especiais</h5>
                        </div>
                        <p className="text-xs sm:text-sm text-blue-200">{results.prenatalCare.special_care}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3 sm:mt-4 glass-panel tech-gradient-warning rounded-lg tech-border-alert p-3 sm:p-4">
                      <div className="flex items-center mb-1 sm:mb-2">
                        <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-300 tech-glow mr-2" />
                        <h5 className="text-sm sm:text-base font-medium text-blue-100">Sinais de Alerta - Procure atendimento médico:</h5>
                      </div>
                      <p className="text-xs sm:text-sm text-blue-200">{results.prenatalCare.warning_signs}</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Visualização Gráfica do Desenvolvimento */}
              <div className="mb-6">
                <GestationalVisualization 
                  currentWeek={results.weeks}
                  dueDate={new Date(results.dueDate)}
                />
              </div>
              
              {/* Observações */}
              <div className="glass-panel tech-border-accent rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-blue-200">
                <div className="flex items-center mb-1 sm:mb-2">
                  <Info className="h-4 w-4 sm:h-5 sm:w-5 text-teal-300 tech-glow mr-2" />
                  <span className="font-medium text-cyan-300">IMPORTANTE:</span>
                </div>
                <p className="mb-1 sm:mb-2">
                  Esta ferramenta fornece estimativas baseadas em cálculos padrão.
                </p>
                <p>
                  As recomendações e informações são baseadas em diretrizes do Ministério da Saúde, Febrasgo e ACOG. Consulte sempre um profissional de saúde para orientações específicas.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default GestationalCalculator;