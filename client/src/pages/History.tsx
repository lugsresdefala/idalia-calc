import { useState, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Baby, RefreshCw, Upload, Clock } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAuth } from "@/hooks/useAuth";
import { ReimportModal } from "@/components/ui/ReimportModal";
import { invalidateAllUserData, formatStatusDate, type DataStatus } from "@/lib/dataSync";
import { getQueryFn } from "@/lib/queryClient";

interface CalculatorHistoryItem {
  id: string;
  userId: string;
  type: string;
  calculatorType?: string;
  inputData: any;
  resultData: any;
  createdAt: string;
}

const History = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const userId = (user as any)?.id ?? "";

  const [importOpen, setImportOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const historyQueryKey = userId ? `/api/calculator-history/${userId}` : null;

  const { data: history = [], isLoading } = useQuery<CalculatorHistoryItem[]>({
    queryKey: [historyQueryKey],
    enabled: !!userId,
    queryFn: getQueryFn({ on401: "returnNull" }),
    staleTime: 0,
  });

  const { data: dataStatus } = useQuery<DataStatus>({
    queryKey: ["/api/data-status"],
    enabled: !!userId,
    queryFn: getQueryFn({ on401: "returnNull" }),
    staleTime: 30_000,
  });

  const handleRefresh = useCallback(async () => {
    if (!userId) return;
    setIsRefreshing(true);
    try {
      await invalidateAllUserData(queryClient, userId);
      await queryClient.refetchQueries({ queryKey: [historyQueryKey] });
      await queryClient.refetchQueries({ queryKey: ["/api/data-status"] });
    } finally {
      setIsRefreshing(false);
    }
  }, [queryClient, userId, historyQueryKey]);

  const getCalculatorType = (item: CalculatorHistoryItem) =>
    item.calculatorType ?? item.type ?? "";

  const safeParseJSON = (data: any) => {
    if (typeof data === "object" && data !== null) return data;
    try {
      return JSON.parse(data);
    } catch {
      return {};
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="glass-card rounded-lg p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-300 tech-text-glow">
              Histórico de Cálculos
            </h1>

            {dataStatus && (
              <div className="flex flex-wrap gap-2 mt-3">
                {(
                  [
                    { key: "cycles", label: "Ciclos" },
                    { key: "temperatures", label: "Temperaturas" },
                    { key: "mucus", label: "Muco" },
                    { key: "calculations", label: "Cálculos" },
                  ] as const
                ).map(({ key, label }) => (
                  <div
                    key={key}
                    className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/60 rounded px-2 py-1 border border-slate-700"
                  >
                    <Clock className="h-3 w-3 text-cyan-500" />
                    <span className="text-slate-300">{label}:</span>
                    <span>{formatStatusDate(dataStatus[key])}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              size="sm"
              variant="outline"
              onClick={handleRefresh}
              disabled={isRefreshing || !userId}
              className="border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 transition-colors"
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Atualizar
            </Button>
            <Button
              size="sm"
              onClick={() => setImportOpen(true)}
              disabled={!userId}
              className="bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
            >
              <Upload className="h-4 w-4 mr-2" />
              Importar
            </Button>
          </div>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-16">
            <CalendarDays className="h-12 w-12 mx-auto text-slate-600 mb-3" />
            <p className="text-slate-400 mb-2">Nenhum cálculo registrado ainda.</p>
            <p className="text-slate-500 text-sm">
              Use os calculadores ou importe dados históricos com o botão acima.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => {
              const calcType = getCalculatorType(item);
              const inputData = safeParseJSON(item.inputData);
              const resultData = safeParseJSON(item.resultData);
              const isFertility = calcType === "fertility";

              return (
                <Card key={item.id} className="glass-panel tech-border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {isFertility ? (
                          <>
                            <CalendarDays className="h-5 w-5 text-cyan-400" />
                            <span>Calculadora de Fertilidade</span>
                          </>
                        ) : (
                          <>
                            <Baby className="h-5 w-5 text-pink-400" />
                            <span>Calculadora Gestacional</span>
                          </>
                        )}
                        <Badge
                          className={`text-xs border-0 ${
                            isFertility
                              ? "bg-cyan-900/40 text-cyan-300"
                              : "bg-pink-900/40 text-pink-300"
                          }`}
                        >
                          {isFertility ? "Fertilidade" : "Gestacional"}
                        </Badge>
                      </CardTitle>
                      <span className="text-sm text-blue-300">
                        {format(new Date(item.createdAt), "dd/MM/yyyy HH:mm", {
                          locale: ptBR,
                        })}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {isFertility ? (
                      <div className="space-y-2 text-sm">
                        {inputData?.lastPeriodStart && (
                          <div className="flex justify-between">
                            <span className="text-blue-300">Início do ciclo:</span>
                            <span className="text-blue-100">
                              {format(
                                new Date(inputData.lastPeriodStart),
                                "dd/MM/yyyy",
                                { locale: ptBR }
                              )}
                            </span>
                          </div>
                        )}
                        {resultData?.fertileStart && resultData?.fertileEnd && (
                          <div className="flex justify-between">
                            <span className="text-blue-300">Período fértil:</span>
                            <span className="text-blue-100">
                              {format(new Date(resultData.fertileStart), "dd/MM", {
                                locale: ptBR,
                              })}{" "}
                              -{" "}
                              {format(new Date(resultData.fertileEnd), "dd/MM/yyyy", {
                                locale: ptBR,
                              })}
                            </span>
                          </div>
                        )}
                        {resultData?.ovulationDay && (
                          <div className="flex justify-between">
                            <span className="text-blue-300">Dia da ovulação:</span>
                            <span className="text-blue-100">
                              {format(new Date(resultData.ovulationDay), "dd/MM/yyyy", {
                                locale: ptBR,
                              })}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-2 text-sm">
                        {resultData?.gestationalAge && (
                          <div className="flex justify-between">
                            <span className="text-blue-300">Idade gestacional:</span>
                            <span className="text-blue-100">{resultData.gestationalAge}</span>
                          </div>
                        )}
                        {resultData?.dueDate && (
                          <div className="flex justify-between">
                            <span className="text-blue-300">Data provável do parto:</span>
                            <span className="text-blue-100">{resultData.dueDate}</span>
                          </div>
                        )}
                        {resultData?.currentTrimester && (
                          <div className="flex justify-between">
                            <span className="text-blue-300">Trimestre atual:</span>
                            <span className="text-blue-100">{resultData.currentTrimester}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <ReimportModal
        open={importOpen}
        onClose={() => setImportOpen(false)}
        userId={userId}
      />
    </div>
  );
};

export default History;
