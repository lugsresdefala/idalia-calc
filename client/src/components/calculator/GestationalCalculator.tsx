import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
import { Info } from "lucide-react";
import { 
  calculateGestationalAgeFromLMP, 
  calculateGestationalAgeFromUltrasound, 
  calculateGestationalAgeFromTransfer 
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
  const [results, setResults] = useState<{
    gestationalAge: string;
    dueDate: string;
    firstTrimester: string;
    secondTrimester: string;
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
          dueDate: format(result.dueDate, "dd/MM/yyyy", { locale: ptBR }),
          firstTrimester: format(result.firstTrimesterEnd, "dd/MM/yyyy", { locale: ptBR }),
          secondTrimester: format(result.secondTrimesterEnd, "dd/MM/yyyy", { locale: ptBR }),
        });
      }
    } catch (error) {
      console.error("Calculation error:", error);
    }
  };

  return (
    <div className="glass-card gradient-bg p-6 mb-6">
      <h2 className="text-xl font-medium mb-4">Calculadora de Idade Gestacional</h2>

      <div className="mb-6">
        <Label className="block text-sm font-medium text-gray-700 mb-2">Método de Cálculo</Label>
        <RadioGroup 
          value={calculationType} 
          onValueChange={(value) => setCalculationType(value as CalculationType)}
          className="grid grid-cols-1 md:grid-cols-3 gap-3"
        >
          <div className="relative flex items-center p-3 rounded border cursor-pointer hover:bg-neutral-100 transition">
            <RadioGroupItem value="lmp" id="lmp" className="h-4 w-4" />
            <Label htmlFor="lmp" className="ml-3 font-medium text-sm cursor-pointer">
              Data da Última Menstruação
            </Label>
          </div>
          <div className="relative flex items-center p-3 rounded border cursor-pointer hover:bg-neutral-100 transition">
            <RadioGroupItem value="ultrasound" id="ultrasound" className="h-4 w-4" />
            <Label htmlFor="ultrasound" className="ml-3 font-medium text-sm cursor-pointer">
              Data do Ultrassom
            </Label>
          </div>
          <div className="relative flex items-center p-3 rounded border cursor-pointer hover:bg-neutral-100 transition">
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
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium shadow-md"
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
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium shadow-md"
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
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium shadow-md"
            >
              Calcular
            </Button>
          </div>
        </div>
      )}

      {results && (
        <div className="mt-8 p-6 rounded-xl glass gradient-bg shadow-2xl">
          <h3 className="text-2xl font-semibold text-primary mb-6 border-b pb-3">Resultados</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card parallax bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-xl">
              <CardContent className="p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                <p className="text-sm text-gray-600 mb-2 relative z-10">Idade Gestacional</p>
                <p className="text-2xl font-semibold text-primary relative z-10">{results.gestationalAge}</p>
              </CardContent>
            </Card>
            <Card className="glass-card parallax bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-xl">
              <CardContent className="p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10"></div>
                <p className="text-sm text-gray-600 mb-2 relative z-10">Data Provável do Parto</p>
                <p className="text-2xl font-semibold text-primary relative z-10">{results.dueDate}</p>
              </CardContent>
            </Card>
            <Card className="glass-card parallax bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-xl">
              <CardContent className="p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10"></div>
                <p className="text-sm text-gray-600 mb-2 relative z-10">Primeiro Trimestre até</p>
                <p className="text-xl font-semibold text-primary relative z-10">{results.firstTrimester}</p>
                <p className="text-sm text-gray-600 mt-3 mb-1 relative z-10">Segundo Trimestre até</p>
                <p className="text-xl font-semibold text-primary relative z-10">{results.secondTrimester}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestationalCalculator;