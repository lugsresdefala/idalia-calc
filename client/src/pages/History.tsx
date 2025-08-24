import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Baby, ChevronRight, Clock, ArrowLeft, Filter, Download, Calendar } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/ui/Header";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";

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
  const [, setLocation] = useLocation();
  
  const { data: history = [], isLoading } = useQuery<CalculatorHistoryItem[]>({
    queryKey: ['/api/calculator-history', (user as any)?.id || 'anonymous'],
    enabled: true,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen tech-bg">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <Header />
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-500 border-t-transparent"></div>
              <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-2 border-cyan-400 opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatResultData = (type: string, inputData: any, resultData: any) => {
    if (type === 'fertility') {
      return {
        title: "Período Fértil",
        icon: CalendarDays,
        color: "cyan",
        items: [
          { label: "Início do ciclo", value: format(new Date(inputData.lastPeriodStart), "dd/MM/yyyy", { locale: ptBR }) },
          { label: "Janela fértil", value: `${format(new Date(resultData.fertileStart), "dd/MM", { locale: ptBR })} - ${format(new Date(resultData.fertileEnd), "dd/MM/yyyy", { locale: ptBR })}` },
          { label: "Dia da ovulação", value: format(new Date(resultData.ovulationDay), "dd/MM/yyyy", { locale: ptBR }) },
          { label: "Fase atual", value: resultData.currentCyclePhase || "Não calculada" },
          { label: "Próxima menstruação", value: resultData.nextPeriodStart ? format(new Date(resultData.nextPeriodStart), "dd/MM/yyyy", { locale: ptBR }) : "Não calculada" }
        ]
      };
    } else {
      return {
        title: "Idade Gestacional",
        icon: Baby,
        color: "teal",
        items: [
          { label: "Idade gestacional", value: resultData.gestationalAge || `${resultData.weeks} semanas e ${resultData.days} dias` },
          { label: "Data provável do parto", value: resultData.dueDate },
          { label: "Trimestre atual", value: `${resultData.currentTrimester}º trimestre` },
          { label: "Desenvolvimento", value: resultData.developmentInfo?.title || "Desenvolvimento normal" }
        ]
      };
    }
  };

  return (
    <div className="min-h-screen tech-bg">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Header />
        
        <div className="glass-card rounded-lg p-8 mb-6">
          {/* Header com navegação */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 tech-text-glow">
                Histórico de Cálculos
              </h1>
              <p className="text-blue-200">
                Todos os seus cálculos salvos e organizados
              </p>
            </div>
            <div className="flex gap-3 mt-4 sm:mt-0">
              <Button
                variant="outline"
                onClick={() => setLocation("/app")}
                className="glass-panel tech-border text-cyan-300 hover:bg-cyan-900/30"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <Button
                variant="outline"
                className="glass-panel tech-border text-blue-300 hover:bg-blue-900/30"
                disabled={history.length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>

          {/* Estatísticas */}
          {history.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <Card className="glass-panel tech-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-300 text-sm">Total de Cálculos</p>
                      <p className="text-2xl font-bold text-cyan-200">{history.length}</p>
                    </div>
                    <div className="w-10 h-10 glass-panel rounded-lg flex items-center justify-center tech-border">
                      <Calendar className="h-5 w-5 text-cyan-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-panel tech-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-300 text-sm">Fertilidade</p>
                      <p className="text-2xl font-bold text-cyan-200">
                        {history.filter(h => h.calculatorType === 'fertility').length}
                      </p>
                    </div>
                    <div className="w-10 h-10 glass-panel rounded-lg flex items-center justify-center tech-border">
                      <CalendarDays className="h-5 w-5 text-cyan-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-panel tech-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-300 text-sm">Gestacional</p>
                      <p className="text-2xl font-bold text-teal-200">
                        {history.filter(h => h.calculatorType === 'gestational').length}
                      </p>
                    </div>
                    <div className="w-10 h-10 glass-panel rounded-lg flex items-center justify-center tech-border">
                      <Baby className="h-5 w-5 text-teal-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Lista de histórico */}
          {history.length === 0 ? (
            <Card className="glass-panel tech-border">
              <CardContent className="py-16 text-center">
                <div className="w-20 h-20 glass-panel rounded-full flex items-center justify-center mx-auto mb-6 tech-border">
                  <Clock className="h-10 w-10 text-cyan-400" />
                </div>
                <p className="text-xl text-cyan-200 mb-2">Nenhum cálculo registrado ainda</p>
                <p className="text-blue-300 mb-6">
                  Comece usando as calculadoras para ver seu histórico aqui
                </p>
                <Button
                  onClick={() => setLocation("/app")}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                >
                  Usar Calculadoras
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {history.map((item) => {
                const inputData = JSON.parse(item.inputData);
                const resultData = JSON.parse(item.resultData);
                const formattedData = formatResultData(item.calculatorType, inputData, resultData);
                const Icon = formattedData.icon;
                
                return (
                  <Card key={item.id} className="glass-panel tech-border hover:scale-[1.02] transition-transform">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 bg-gradient-to-br ${
                            formattedData.color === 'cyan' 
                              ? 'from-blue-500 to-cyan-500' 
                              : 'from-cyan-500 to-teal-500'
                          } rounded-lg flex items-center justify-center shadow-lg`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg text-cyan-200">
                              {formattedData.title}
                            </CardTitle>
                            <p className="text-sm text-blue-300 mt-1">
                              {format(new Date(item.createdAt), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                            </p>
                          </div>
                        </div>
                        <Badge className="glass-panel tech-border text-cyan-300">
                          #{item.id}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {formattedData.items.map((detail, idx) => (
                          <div key={idx} className="flex justify-between items-center glass-panel p-3 rounded-lg tech-border-faint">
                            <span className="text-blue-300 text-sm">{detail.label}:</span>
                            <span className="text-cyan-200 font-medium text-sm">{detail.value}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Ações */}
                      <div className="flex gap-3 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setLocation("/app")}
                          className="glass-panel tech-border text-cyan-300 hover:bg-cyan-900/30"
                        >
                          Recalcular
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="glass-panel tech-border text-blue-300 hover:bg-blue-900/30"
                        >
                          Ver Detalhes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-blue-200 glass-panel p-4 rounded-lg tech-border">
          <p className="mb-2">
            Histórico completo de todos os seus cálculos médicos
          </p>
          <div className="flex justify-center items-center gap-4 text-cyan-300">
            <button onClick={() => setLocation("/app")} className="hover:text-cyan-200 transition-colors">
              Calculadoras
            </button>
            <span>•</span>
            <button onClick={() => setLocation("/dashboard")} className="hover:text-cyan-200 transition-colors">
              Dashboard
            </button>
            <span>•</span>
            <button onClick={() => setLocation("/algoritmos")} className="hover:text-cyan-200 transition-colors">
              Algoritmos
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default History;