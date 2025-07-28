import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, Thermometer, Droplets, Clock, CheckCircle, Plus } from "lucide-react";

interface DashboardProps {
  userId?: number;
}

const Dashboard = ({ userId = 1 }: DashboardProps) => {
  // Query para buscar dados reais do usuário
  const { data: menstrualCycles, isLoading: cyclesLoading } = useQuery({
    queryKey: ['/api/menstrual-cycles', userId],
    enabled: !!userId
  });

  const { data: basalTemperatures, isLoading: temperaturesLoading } = useQuery({
    queryKey: ['/api/basal-temperatures', userId],
    enabled: !!userId
  });

  const { data: cervicalMucus, isLoading: mucusLoading } = useQuery({
    queryKey: ['/api/cervical-mucus', userId],
    enabled: !!userId
  });

  const hasCycles = menstrualCycles && menstrualCycles.length > 0;
  const hasTemperatures = basalTemperatures && basalTemperatures.length > 0;
  const hasMucusData = cervicalMucus && cervicalMucus.length > 0;

  return (
    <div className="space-y-6">
      {/* Status do Ciclo Atual */}
      <Card className="glass-card border-cyan-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan-300">
            <Calendar className="h-5 w-5" />
            Status do Ciclo Atual
          </CardTitle>
        </CardHeader>
        <CardContent>
          {cyclesLoading ? (
            <div className="text-center p-4 text-gray-400">
              <div className="animate-spin h-6 w-6 border-2 border-cyan-500 border-t-transparent rounded-full mx-auto mb-2"></div>
              Carregando dados do ciclo...
            </div>
          ) : hasCycles ? (
            <div className="space-y-4">
              <div className="text-center p-4 text-gray-400">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-cyan-400" />
                <p className="text-white">Ciclos registrados: {menstrualCycles.length}</p>
                <p className="text-sm">Análise detalhada em desenvolvimento</p>
              </div>
            </div>
          ) : (
            <div className="text-center p-6 text-gray-400">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="mb-2">Nenhum ciclo registrado ainda</p>
              <p className="text-sm">Registre seu primeiro ciclo para ver as análises</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cards de Resumo */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Ciclos Menstruais */}
        <Card className="glass-card border-blue-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-300 text-lg">
              <Calendar className="h-5 w-5" />
              Ciclos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {cyclesLoading ? (
              <div className="text-center">
                <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                <p className="text-sm text-gray-400">Carregando...</p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-2xl font-bold text-white">
                  {hasCycles ? menstrualCycles.length : 0}
                </div>
                <p className="text-sm text-gray-400">
                  {hasCycles ? "Ciclos registrados" : "Nenhum ciclo ainda"}
                </p>
                {!hasCycles && (
                  <div className="mt-3 p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <p className="text-xs text-blue-300">
                      <Plus className="h-3 w-3 inline mr-1" />
                      Registre seu primeiro ciclo
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Temperaturas Basais */}
        <Card className="glass-card border-red-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-red-300 text-lg">
              <Thermometer className="h-5 w-5" />
              Temperatura
            </CardTitle>
          </CardHeader>
          <CardContent>
            {temperaturesLoading ? (
              <div className="text-center">
                <div className="animate-spin h-5 w-5 border-2 border-red-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                <p className="text-sm text-gray-400">Carregando...</p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-2xl font-bold text-white">
                  {hasTemperatures ? basalTemperatures.length : 0}
                </div>
                <p className="text-sm text-gray-400">
                  {hasTemperatures ? "Medições registradas" : "Nenhuma medição ainda"}
                </p>
                {!hasTemperatures && (
                  <div className="mt-3 p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                    <p className="text-xs text-red-300">
                      <Plus className="h-3 w-3 inline mr-1" />
                      Registre sua primeira temperatura
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Muco Cervical */}
        <Card className="glass-card border-teal-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-teal-300 text-lg">
              <Droplets className="h-5 w-5" />
              Observações
            </CardTitle>
          </CardHeader>
          <CardContent>
            {mucusLoading ? (
              <div className="text-center">
                <div className="animate-spin h-5 w-5 border-2 border-teal-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                <p className="text-sm text-gray-400">Carregando...</p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-2xl font-bold text-white">
                  {hasMucusData ? cervicalMucus.length : 0}
                </div>
                <p className="text-sm text-gray-400">
                  {hasMucusData ? "Observações no sistema" : "Nenhuma observação ainda"}
                </p>
                {!hasMucusData && (
                  <div className="mt-3 p-2 bg-teal-500/10 rounded-lg border border-teal-500/20">
                    <p className="text-xs text-teal-300">
                      <Plus className="h-3 w-3 inline mr-1" />
                      Registre sua primeira observação
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Lembretes de Hoje */}
      <Card className="glass-card border-yellow-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-300">
            <Clock className="h-5 w-5" />
            Lembretes de Hoje
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {!hasTemperatures && (
              <div className="flex items-center gap-3 p-3 glass-panel rounded-lg">
                <Thermometer className="h-4 w-4 text-red-400" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">
                    Medir temperatura basal
                  </div>
                  <div className="text-xs text-gray-400">
                    Recomendado: ao acordar, antes de se levantar
                  </div>
                </div>
              </div>
            )}
            
            {!hasMucusData && (
              <div className="flex items-center gap-3 p-3 glass-panel rounded-lg">
                <Droplets className="h-4 w-4 text-blue-400" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">
                    Observar muco cervical
                  </div>
                  <div className="text-xs text-gray-400">
                    Registre as características observadas
                  </div>
                </div>
              </div>
            )}
            
            {!hasCycles && (
              <div className="flex items-center gap-3 p-3 glass-panel rounded-lg">
                <Calendar className="h-4 w-4 text-purple-400" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">
                    Registrar ciclo menstrual
                  </div>
                  <div className="text-xs text-gray-400">
                    Comece registrando seu último ciclo
                  </div>
                </div>
              </div>
            )}
            
            {hasTemperatures && hasMucusData && hasCycles && (
              <div className="text-center p-4 text-gray-400">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-400" />
                <p>Todos os dados básicos registrados!</p>
                <p className="text-sm">Continue monitorando regularmente</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;