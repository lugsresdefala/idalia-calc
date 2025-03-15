import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { calculateFertilePeriod } from "@/lib/calculators";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface CycleHistory {
  periodStart: Date;
  periodLength: number;
  cycleLength: number;
}

const FertilityCalculator = () => {
  const [lastPeriodStart, setLastPeriodStart] = useState<string>("");
  const [lastPeriodEnd, setLastPeriodEnd] = useState<string>("");
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [previousCycles, setPreviousCycles] = useState<CycleHistory[]>([]);
  const [results, setResults] = useState<{
    ovulationDay: Date;
    fertileStart: Date;
    fertileEnd: Date;
    nextPeriodStart: Date;
    nextPeriodEnd: Date;
    cycleVariability?: number;
    fertileWindowConfidence?: string;
  } | null>(null);

  const handleCalculate = () => {
    if (!lastPeriodStart || !lastPeriodEnd) return;

    try {
      const result = calculateFertilePeriod(
        new Date(lastPeriodStart),
        new Date(lastPeriodEnd),
        cycleLength,
        previousCycles
      );

      setResults(result);
    } catch (error) {
      console.error("Calculation error:", error);
    }
  };

  return (
    <div className="glass-card gradient-bg p-6 mb-6">
      <h2 className="text-xl font-medium mb-4">Calculadora do Período Fértil</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="flex items-center">
            <Label htmlFor="period-start" className="block text-sm font-medium text-gray-700 mb-2">
              Início da Última Menstruação
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="ml-1 text-gray-400 cursor-help">
                    <Info className="h-4 w-4 inline" />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-[200px] text-xs">
                  Data do primeiro dia da última menstruação
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input 
            id="period-start"
            type="date"
            value={lastPeriodStart}
            onChange={(e) => setLastPeriodStart(e.target.value)}
            className="mt-1 w-full"
          />
        </div>

        <div>
          <div className="flex items-center">
            <Label htmlFor="period-end" className="block text-sm font-medium text-gray-700 mb-2">
              Fim da Última Menstruação
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="ml-1 text-gray-400 cursor-help">
                    <Info className="h-4 w-4 inline" />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-[200px] text-xs">
                  Data do último dia da menstruação
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input 
            id="period-end"
            type="date"
            value={lastPeriodEnd}
            onChange={(e) => setLastPeriodEnd(e.target.value)}
            className="mt-1 w-full"
          />
        </div>

        <div>
          <div className="flex items-center">
            <Label htmlFor="cycle-length" className="block text-sm font-medium text-gray-700 mb-2">
              Duração do Ciclo
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="ml-1 text-gray-400 cursor-help">
                    <Info className="h-4 w-4 inline" />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-[200px] text-xs">
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
              className="mt-1 w-24"
            />
            <span className="ml-2 text-gray-600">dias</span>
          </div>
        </div>

        <div className="flex items-end">
          <Button 
            onClick={handleCalculate}
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Calcular
          </Button>
        </div>
      </div>

      {results && (
        <div className="mt-8 p-4 rounded-lg border-2 border-[#ff4081] bg-pink-50/30 backdrop-blur-sm">
          <h3 className="text-lg font-medium text-[#c60055] mb-3">Seu Período Fértil</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <p className="text-sm text-gray-500 mb-1">Janela Fértil</p>
                <p className="text-xl font-medium">
                  {format(results.fertileStart, "dd/MM/yyyy", { locale: ptBR })} a {" "}
                  {format(results.fertileEnd, "dd/MM/yyyy", { locale: ptBR })}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Período com maiores chances de gravidez
                  {results.cycleVariability && 
                    ` (Variabilidade: ±${results.cycleVariability.toFixed(1)} dias)`
                  }
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <p className="text-sm text-gray-500 mb-1">Dia Provável da Ovulação</p>
                <p className="text-xl font-medium text-[#ff4081]">
                  {format(results.ovulationDay, "dd/MM/yyyy", { locale: ptBR })}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  O óvulo permanece viável por aproximadamente 24 horas após a ovulação
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm mt-6">
            <CardContent className="p-4">
              <p className="text-sm text-gray-500 mb-1">Próxima Menstruação Prevista</p>
              <p className="text-xl font-medium">
                {format(results.nextPeriodStart, "dd/MM/yyyy", { locale: ptBR })} a {" "}
                {format(results.nextPeriodEnd, "dd/MM/yyyy", { locale: ptBR })}
              </p>
              {results.fertileWindowConfidence && (
                <p className="text-sm text-gray-600 mt-2">
                  Confiança da previsão: {results.fertileWindowConfidence}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FertilityCalculator;