
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { calculateFertilePeriod, type CycleHistory } from "@/lib/calculators";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const FertilityCalculator = () => {
  const [lastPeriodStart, setLastPeriodStart] = useState<string>("");
  const [lastPeriodEnd, setLastPeriodEnd] = useState<string>("");
  const [cycleHistory, setCycleHistory] = useState<CycleHistory[]>([]);
  const [currentSelection, setCurrentSelection] = useState<{start?: Date, end?: Date}>({});
  const [results, setResults] = useState<{
    ovulationDay: Date;
    fertileStart: Date;
    fertileEnd: Date;
    nextPeriodStart: Date;
    nextPeriodEnd: Date;
    cycleVariability?: number;
    fertileWindowConfidence?: string;
  } | null>(null);

  const addCycle = () => {
    if (currentSelection.start && currentSelection.end) {
      const newCycle: CycleHistory = {
        periodStart: currentSelection.start,
        periodLength: Math.round((currentSelection.end.getTime() - currentSelection.start.getTime()) / (1000 * 60 * 60 * 24)),
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
        : 28;

      const result = calculateFertilePeriod(
        new Date(lastPeriodStart),
        new Date(lastPeriodEnd),
        avgCycleLength,
        cycleHistory
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
          <Label className="block text-sm font-medium mb-2">Histórico de Ciclos</Label>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
            <Calendar
              mode="range"
              selected={{
                from: currentSelection.start,
                to: currentSelection.end
              }}
              onSelect={(range) => {
                if (range?.from) {
                  setCurrentSelection({
                    start: range.from,
                    end: range.to
                  });
                }
              }}
              className="rounded-md border"
              disabled={{ after: new Date() }}
            />
            <Button 
              onClick={addCycle}
              disabled={!currentSelection.start || !currentSelection.end}
              className="mt-4 w-full"
            >
              Adicionar Ciclo
            </Button>
          </div>
        </div>

        <div>
          <Label className="block text-sm font-medium mb-2">Último Ciclo</Label>
          <div className="space-y-4">
            <div>
              <Label htmlFor="last-period-start">Data de Início</Label>
              <Input
                id="last-period-start"
                type="date"
                value={lastPeriodStart}
                onChange={(e) => setLastPeriodStart(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="last-period-end">Data de Fim</Label>
              <Input
                id="last-period-end"
                type="date"
                value={lastPeriodEnd}
                onChange={(e) => setLastPeriodEnd(e.target.value)}
              />
            </div>
            <Button onClick={handleCalculate} className="w-full">
              Calcular
            </Button>
          </div>
        </div>
      </div>

      {cycleHistory.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Ciclos Registrados</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cycleHistory.map((cycle, index) => (
              <Card key={index}>
                <CardContent className="p-4">
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
        <div className="mt-8 p-4 rounded-lg border-2 border-[#ff4081] bg-pink-50/30 backdrop-blur-sm">
          <h3 className="text-lg font-medium text-[#c60055] mb-3">Seu Período Fértil</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <p className="text-sm text-gray-500 mb-1">Janela Fértil</p>
                <p className="text-xl font-medium">
                  {format(results.fertileStart, "dd/MM/yyyy")} a {" "}
                  {format(results.fertileEnd, "dd/MM/yyyy")}
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
                  {format(results.ovulationDay, "dd/MM/yyyy")}
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
                {format(results.nextPeriodStart, "dd/MM/yyyy")} a {" "}
                {format(results.nextPeriodEnd, "dd/MM/yyyy")}
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
