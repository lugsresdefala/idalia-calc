import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, Thermometer, Droplets, Clock, Heart } from "lucide-react";

interface DashboardProps {
  userId?: number;
}

interface CycleStatus {
  currentDay: number;
  totalDays: number;
  phase: "menstrual" | "follicular" | "ovulatory" | "luteal";
  daysToOvulation: number;
  fertilityStatus: "high" | "medium" | "low";
}

const Dashboard = ({ userId = 1 }: DashboardProps) => {
  const [currentCycleStatus, setCurrentCycleStatus] = useState<CycleStatus>({
    currentDay: 14,
    totalDays: 28,
    phase: "ovulatory",
    daysToOvulation: 0,
    fertilityStatus: "high"
  });

  // Query para buscar dados do usuário
  const { data: menstrualCycles } = useQuery({
    queryKey: ['/api/menstrual-cycles', userId],
    enabled: !!userId
  });

  const { data: basalTemperatures } = useQuery({
    queryKey: ['/api/basal-temperatures', userId],
    enabled: !!userId
  });

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "menstrual": return "bg-red-500/20 text-red-300 border-red-500/30";
      case "follicular": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "ovulatory": return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "luteal": return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getFertilityColor = (status: string) => {
    switch (status) {
      case "high": return "bg-green-500/20 text-green-300 border-green-500/30";
      case "medium": return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "low": return "bg-gray-500/20 text-gray-300 border-gray-500/30";
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getPhaseDescription = (phase: string) => {
    switch (phase) {
      case "menstrual": return "Período menstrual - baixa fertilidade";
      case "follicular": return "Fase folicular - fertilidade crescente";
      case "ovulatory": return "Ovulação - alta fertilidade";
      case "luteal": return "Fase lútea - fertilidade declinante";
      default: return "Fase não identificada";
    }
  };

  return (
    <div className="space-y-6">
      {/* Status do Ciclo Atual */}
      <Card className="glass-card border-cyan-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan-300">
            <Heart className="h-5 w-5 text-yellow-500 animate-pulse" />
            Status do Ciclo Atual
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-white">
                Dia {currentCycleStatus.currentDay}
              </div>
              <div className="text-sm text-gray-300">
                de {currentCycleStatus.totalDays} dias
              </div>
            </div>
            <Badge className={getPhaseColor(currentCycleStatus.phase)}>
              {currentCycleStatus.phase}
            </Badge>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-yellow-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentCycleStatus.currentDay / currentCycleStatus.totalDays) * 100}%` }}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 glass-panel rounded-lg">
              <div className="text-sm text-gray-300">Fertilidade</div>
              <Badge className={getFertilityColor(currentCycleStatus.fertilityStatus)}>
                {currentCycleStatus.fertilityStatus === "high" ? "Alta" : 
                 currentCycleStatus.fertilityStatus === "medium" ? "Média" : "Baixa"}
              </Badge>
            </div>
            <div className="text-center p-3 glass-panel rounded-lg">
              <div className="text-sm text-gray-300">Próxima Ovulação</div>
              <div className="text-lg font-semibold text-yellow-400">
                {currentCycleStatus.daysToOvulation === 0 ? "Hoje" : `${currentCycleStatus.daysToOvulation} dias`}
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-300 text-center p-2 glass-panel rounded-lg">
            {getPhaseDescription(currentCycleStatus.phase)}
          </div>
        </CardContent>
      </Card>

      {/* Cards de Resumo */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="glass-card border-blue-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm text-blue-300">
              <Calendar className="h-4 w-4" />
              Ciclos Registrados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {menstrualCycles?.length || 0}
            </div>
            <p className="text-xs text-gray-400">
              Últimos 6 meses
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-red-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm text-red-300">
              <Thermometer className="h-4 w-4" />
              Temperatura Média
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              36.5°C
            </div>
            <p className="text-xs text-gray-400">
              Basal corporal
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-teal-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm text-teal-300">
              <TrendingUp className="h-4 w-4" />
              Tendência
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">
              Regular
            </div>
            <p className="text-xs text-gray-400">
              Ciclo estável
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Lembretes e Ações Rápidas */}
      <Card className="glass-card border-yellow-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-300">
            <Clock className="h-5 w-5" />
            Lembretes de Hoje
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 p-3 glass-panel rounded-lg">
            <Thermometer className="h-5 w-5 text-red-400" />
            <div className="flex-1">
              <div className="text-sm font-medium text-white">Medir temperatura basal</div>
              <div className="text-xs text-gray-400">Recomendado ao acordar</div>
            </div>
            <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300">
              Pendente
            </Badge>
          </div>
          
          <div className="flex items-center gap-3 p-3 glass-panel rounded-lg">
            <Droplets className="h-5 w-5 text-blue-400" />
            <div className="flex-1">
              <div className="text-sm font-medium text-white">Observar muco cervical</div>
              <div className="text-xs text-gray-400">Período de alta fertilidade</div>
            </div>
            <Badge variant="secondary" className="bg-green-500/20 text-green-300">
              Importante
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;