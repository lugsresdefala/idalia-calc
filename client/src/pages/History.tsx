import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Baby, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAuth } from "@/hooks/useAuth";

interface CalculatorHistoryItem {
  id: number;
  userId: string;
  calculatorType: string;
  inputData: string;
  resultData: string;
  createdAt: string;
}

const History = () => {
  const { user } = useAuth();
  
  const { data: history = [], isLoading } = useQuery<CalculatorHistoryItem[]>({
    queryKey: ['/api/calculator-history', (user as any)?.id || 'anonymous'],
    enabled: true,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="glass-card rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-300 tech-text-glow">
          Histórico de Cálculos
        </h1>
        
        {history.length === 0 ? (
          <div className="text-center py-8 text-blue-200">
            <p>Nenhum cálculo registrado ainda.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => {
              const inputData = JSON.parse(item.inputData);
              const resultData = JSON.parse(item.resultData);
              
              return (
                <Card key={item.id} className="glass-panel tech-border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center">
                        {item.calculatorType === 'fertility' ? (
                          <>
                            <CalendarDays className="h-5 w-5 mr-2 text-cyan-400" />
                            Calculadora de Fertilidade
                          </>
                        ) : (
                          <>
                            <Baby className="h-5 w-5 mr-2 text-pink-400" />
                            Calculadora Gestacional
                          </>
                        )}
                      </CardTitle>
                      <span className="text-sm text-blue-300">
                        {format(new Date(item.createdAt), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {item.calculatorType === 'fertility' ? (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-blue-300">Início do ciclo:</span>
                          <span className="text-blue-100">{format(new Date(inputData.lastPeriodStart), "dd/MM/yyyy", { locale: ptBR })}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-300">Período fértil:</span>
                          <span className="text-blue-100">
                            {format(new Date(resultData.fertileStart), "dd/MM", { locale: ptBR })} - {format(new Date(resultData.fertileEnd), "dd/MM/yyyy", { locale: ptBR })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-300">Dia da ovulação:</span>
                          <span className="text-blue-100">{format(new Date(resultData.ovulationDay), "dd/MM/yyyy", { locale: ptBR })}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-blue-300">Idade gestacional:</span>
                          <span className="text-blue-100">{resultData.gestationalAge}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-300">Data provável do parto:</span>
                          <span className="text-blue-100">{resultData.dueDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-300">Trimestre atual:</span>
                          <span className="text-blue-100">{resultData.currentTrimester}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;