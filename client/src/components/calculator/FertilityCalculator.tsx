import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { calculateFertilePeriod } from "@/lib/calculators";
import { addDays, format, isSameDay, startOfMonth, endOfMonth, getDay, isWithinInterval } from "date-fns";
import { ptBR } from "date-fns/locale";

const FertilityCalculator = () => {
  const [lastPeriodStart, setLastPeriodStart] = useState<string>("");
  const [lastPeriodEnd, setLastPeriodEnd] = useState<string>("");
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [results, setResults] = useState<{
    ovulationDay: Date;
    fertileStart: Date;
    fertileEnd: Date;
    nextPeriodStart: Date;
    nextPeriodEnd: Date;
  } | null>(null);

  const handleCalculate = () => {
    if (!lastPeriodStart || !lastPeriodEnd) return;

    try {
      const result = calculateFertilePeriod(
        new Date(lastPeriodStart),
        new Date(lastPeriodEnd),
        cycleLength
      );

      setResults(result);
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
    const daysInMonth = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(
        <div key={`empty-${i}`} className="p-2"></div>
      );
    }
    
    // Add days of the month
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
      
      let className = "p-2 border rounded";
      
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

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-medium mb-4">Calculadora de Período Fértil</h2>
      
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center">
              <Label htmlFor="last-period-start" className="block text-sm font-medium text-gray-700 mb-2">
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
              className="mt-1 w-full"
            />
          </div>
          <div>
            <div className="flex items-center">
              <Label htmlFor="last-period-end" className="block text-sm font-medium text-gray-700 mb-2">
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
              className="mt-1 w-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <div className="flex items-center">
              <Label htmlFor="cycle-length" className="block text-sm font-medium text-gray-700 mb-2">
                Duração média do ciclo menstrual
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
      </div>

      {results && (
        <div className="mt-8 p-4 rounded-lg border-2 border-[#ff4081] bg-pink-50">
          <h3 className="text-lg font-medium text-[#c60055] mb-3">Seu Período Fértil</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Card className="bg-white">
              <CardContent className="p-4">
                <p className="text-sm text-gray-500 mb-1">Janela Fértil</p>
                <p className="text-xl font-medium">
                  {format(results.fertileStart, "dd/MM/yyyy", { locale: ptBR })} a {" "}
                  {format(results.fertileEnd, "dd/MM/yyyy", { locale: ptBR })}
                </p>
                <p className="text-sm text-gray-600 mt-2">Durante estes dias, as chances de gravidez são maiores</p>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-4">
                <p className="text-sm text-gray-500 mb-1">Dia Provável da Ovulação</p>
                <p className="text-xl font-medium text-[#ff4081]">
                  {format(results.ovulationDay, "dd/MM/yyyy", { locale: ptBR })}
                </p>
                <p className="text-sm text-gray-600 mt-2">O óvulo permanece viável por aproximadamente 24 horas após a ovulação</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-white mt-6">
            <CardContent className="p-4">
              <h4 className="font-medium mb-3">Calendário do Ciclo</h4>
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                <div className="p-1 font-medium text-gray-600">Dom</div>
                <div className="p-1 font-medium text-gray-600">Seg</div>
                <div className="p-1 font-medium text-gray-600">Ter</div>
                <div className="p-1 font-medium text-gray-600">Qua</div>
                <div className="p-1 font-medium text-gray-600">Qui</div>
                <div className="p-1 font-medium text-gray-600">Sex</div>
                <div className="p-1 font-medium text-gray-600">Sáb</div>
                {renderCalendar()}
              </div>
              
              <div className="flex justify-center items-center mt-4 text-sm">
                <div className="flex items-center mr-4">
                  <div className="w-4 h-4 bg-pink-100 rounded mr-1"></div>
                  <span>Período Fértil</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-pink-300 rounded mr-1"></div>
                  <span>Ovulação</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <style jsx>{`
        .fertile-day {
          background-color: rgba(255, 64, 129, 0.1);
        }
        
        .ovulation-day {
          background-color: rgba(255, 64, 129, 0.3);
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default FertilityCalculator;
