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
  ChevronUp 
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

  const handleCalculate = () => {
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
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-[#c60055]">Idalia Calc - Idade Gestacional</h2>
      
      <div className="mb-6 bg-pink-50 p-4 rounded-lg border border-pink-200">
        <p className="text-sm text-gray-600 italic">
          Calcule a idade gestacional, data provável do parto e conheça detalhes do desenvolvimento fetal, exames e cuidados recomendados para cada fase da gestação.
        </p>
      </div>

      <div className="mb-6">
        <Label className="block text-sm font-medium text-gray-700 mb-2">Método de Cálculo</Label>
        <RadioGroup 
          value={calculationType} 
          onValueChange={(value) => setCalculationType(value as CalculationType)}
          className="grid grid-cols-1 md:grid-cols-3 gap-3"
        >
          <div className="relative flex items-center p-3 rounded border cursor-pointer hover:bg-pink-50 transition">
            <RadioGroupItem value="lmp" id="lmp" className="h-4 w-4" />
            <Label htmlFor="lmp" className="ml-3 font-medium text-sm cursor-pointer">
              Data da Última Menstruação
            </Label>
          </div>
          <div className="relative flex items-center p-3 rounded border cursor-pointer hover:bg-pink-50 transition">
            <RadioGroupItem value="ultrasound" id="ultrasound" className="h-4 w-4" />
            <Label htmlFor="ultrasound" className="ml-3 font-medium text-sm cursor-pointer">
              Data do Ultrassom
            </Label>
          </div>
          <div className="relative flex items-center p-3 rounded border cursor-pointer hover:bg-pink-50 transition">
            <RadioGroupItem value="transfer" id="transfer" className="h-4 w-4" />
            <Label htmlFor="transfer" className="ml-3 font-medium text-sm cursor-pointer">
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
                <Label htmlFor="lmp-date" className="block text-sm font-medium text-gray-700 mb-2">
                  Data da Última Menstruação
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="ml-1 text-gray-400 cursor-help">
                        <Info className="h-4 w-4 inline" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[200px] text-xs">
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
                className="mt-1 w-full"
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleCalculate}
                className="px-6 py-2 bg-[#ff4081] hover:bg-[#c60055] text-white rounded-md"
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
                <Label htmlFor="usg-date" className="block text-sm font-medium text-gray-700 mb-2">
                  Data do Ultrassom
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="ml-1 text-gray-400 cursor-help">
                        <Info className="h-4 w-4 inline" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[200px] text-xs">
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
                className="mt-1 w-full"
              />
            </div>
            <div>
              <Label htmlFor="usg-weeks" className="block text-sm font-medium text-gray-700 mb-2">
                Idade Gestacional no Ultrassom
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="usg-weeks" className="block text-xs text-gray-500">Semanas</Label>
                  <Input 
                    id="usg-weeks"
                    type="number"
                    min={0}
                    max={42}
                    value={ultrasoundWeeks}
                    onChange={(e) => setUltrasoundWeeks(parseInt(e.target.value) || 0)}
                    className="mt-1 w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="usg-days" className="block text-xs text-gray-500">Dias</Label>
                  <Input 
                    id="usg-days"
                    type="number"
                    min={0}
                    max={6}
                    value={ultrasoundDays}
                    onChange={(e) => setUltrasoundDays(parseInt(e.target.value) || 0)}
                    className="mt-1 w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Button 
              onClick={handleCalculate}
              className="px-6 py-2 bg-[#ff4081] hover:bg-[#c60055] text-white rounded-md"
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
                <Label htmlFor="transfer-date" className="block text-sm font-medium text-gray-700 mb-2">
                  Data da Transferência Embrionária
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="ml-1 text-gray-400 cursor-help">
                        <Info className="h-4 w-4 inline" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[200px] text-xs">
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
                className="mt-1 w-full"
              />
            </div>
            <div>
              <div className="flex items-center">
                <Label htmlFor="embryo-days" className="block text-sm font-medium text-gray-700 mb-2">
                  Dias de Desenvolvimento do Embrião
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="ml-1 text-gray-400 cursor-help">
                        <Info className="h-4 w-4 inline" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[200px] text-xs">
                      Número de dias que o embrião se desenvolveu antes da transferência (geralmente 3 ou 5 dias)
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select 
                value={embryoDays} 
                onValueChange={setEmbryoDays}
              >
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 dias</SelectItem>
                  <SelectItem value="5">5 dias (blastocisto)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4">
            <Button 
              onClick={handleCalculate}
              className="px-6 py-2 bg-[#ff4081] hover:bg-[#c60055] text-white rounded-md"
            >
              Calcular
            </Button>
          </div>
        </div>
      )}

      {results && (
        <div className="mt-8">
          <Card className="border-2 border-[#ff4081] overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-pink-100 to-purple-100 pb-4">
              <CardTitle className="text-xl font-bold text-[#c60055]">Resultados</CardTitle>
              <CardDescription>
                <span className="font-semibold">{results.gestationalAge}</span> - {results.currentTrimester}º Trimestre
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="border border-pink-200 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-5 w-5 text-[#ff4081] mr-2" />
                      <p className="text-sm text-gray-500">Data Provável do Parto</p>
                    </div>
                    <p className="text-xl font-medium text-[#ff4081]">{results.dueDate}</p>
                  </CardContent>
                </Card>
                <Card className="border border-pink-200 shadow-sm col-span-2">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-5 w-5 text-[#ff4081] mr-2" />
                      <p className="text-sm text-gray-500">Trimestres</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm">1º Trimestre até:</p>
                        <p className="font-medium">{results.firstTrimester}</p>
                      </div>
                      <div>
                        <p className="text-sm">2º Trimestre até:</p>
                        <p className="font-medium">{results.secondTrimester}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Desenvolvimento Fetal */}
              <div className="mb-6">
                <button 
                  onClick={() => toggleSection('development')}
                  className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-100 mb-2"
                >
                  <div className="flex items-center">
                    <Baby className="h-5 w-5 mr-2 text-[#c60055]" />
                    <span className="font-semibold text-[#c60055]">Desenvolvimento Fetal</span>
                  </div>
                  {expandedSection === 'development' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                
                {expandedSection === 'development' && (
                  <div className="mt-3 p-4 bg-white rounded-lg border border-gray-200">
                    <h4 className="text-lg font-semibold mb-3 text-[#c60055]">{results.developmentInfo.title}</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="font-medium mb-1">Desenvolvimento:</p>
                        <p className="text-sm text-gray-700 mb-3">{results.developmentInfo.development}</p>
                        
                        <p className="font-medium mb-1">Marco importante:</p>
                        <p className="text-sm text-gray-700">{results.developmentInfo.milestone}</p>
                      </div>
                      <div>
                        <p className="font-medium mb-1">Tamanho aproximado:</p>
                        <p className="text-xl font-bold text-[#ff4081] mb-4">{results.developmentInfo.size}</p>
                        
                        <div className="bg-pink-50 rounded-lg p-3 border border-pink-100">
                          <p className="text-sm">
                            <span className="font-medium">Trimestre {results.currentTrimester}: </span>
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
                  className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-100 mb-2"
                >
                  <div className="flex items-center">
                    <Stethoscope className="h-5 w-5 mr-2 text-[#c60055]" />
                    <span className="font-semibold text-[#c60055]">Cuidados Pré-Natais</span>
                  </div>
                  {expandedSection === 'prenatal' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                
                {expandedSection === 'prenatal' && (
                  <div className="mt-3">
                    <div className="mb-4 bg-white rounded-lg border border-gray-200 p-4">
                      <div className="flex items-center mb-2">
                        <FileHeart className="h-5 w-5 text-[#ff4081] mr-2" />
                        <h5 className="font-medium">Exames Recomendados</h5>
                      </div>
                      <p className="text-sm text-gray-700">{results.prenatalCare.examinations}</p>
                    </div>
                    
                    <div className="mb-4 bg-white rounded-lg border border-gray-200 p-4">
                      <div className="flex items-center mb-2">
                        <Syringe className="h-5 w-5 text-[#ff4081] mr-2" />
                        <h5 className="font-medium">Vacinas</h5>
                      </div>
                      <p className="text-sm text-gray-700">{results.prenatalCare.vaccines}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <h5 className="font-medium mb-2">Alimentação e Suplementação</h5>
                        <p className="text-sm text-gray-700">{results.prenatalCare.nutrition}</p>
                      </div>
                      
                      <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <h5 className="font-medium mb-2">Cuidados Especiais</h5>
                        <p className="text-sm text-gray-700">{results.prenatalCare.special_care}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-pink-50 rounded-lg border border-pink-200 p-4">
                      <h5 className="font-medium mb-2 text-[#c60055]">Sinais de Alerta - Procure atendimento médico:</h5>
                      <p className="text-sm text-gray-700">{results.prenatalCare.warning_signs}</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Observações */}
              <div className="rounded-lg border border-gray-200 p-4 text-sm text-gray-600">
                <p className="mb-2">
                  <span className="font-medium">IMPORTANTE:</span> Esta ferramenta fornece estimativas baseadas em cálculos padrão.
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