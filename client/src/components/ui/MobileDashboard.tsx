import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Calendar, 
  Thermometer, 
  Droplets, 
  TrendingUp, 
  Plus,
  ChevronRight,
  Heart,
  Activity
} from "lucide-react";

interface MobileDashboardProps {
  userId?: number;
}

const MobileDashboard = ({ userId = 1 }: MobileDashboardProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'cycle' | 'data'>('overview');

  // Queries para dados reais
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

  const hasCycles = Array.isArray(menstrualCycles) && menstrualCycles.length > 0;
  const hasTemperatures = Array.isArray(basalTemperatures) && basalTemperatures.length > 0;
  const hasMucusData = Array.isArray(cervicalMucus) && cervicalMucus.length > 0;

  const LoadingCard = () => (
    <div className="mobile-card">
      <div className="animate-pulse space-y-3">
        <div className="h-4 bg-white/20 rounded w-3/4"></div>
        <div className="h-8 bg-white/20 rounded"></div>
        <div className="h-3 bg-white/20 rounded w-1/2"></div>
      </div>
    </div>
  );

  const EmptyStateCard = ({ icon: Icon, title, description, actionText }: {
    icon: any;
    title: string;
    description: string;
    actionText: string;
  }) => (
    <div className="mobile-card text-center">
      <Icon className="h-12 w-12 mx-auto mb-3 text-white/40" />
      <h3 className="mobile-subtitle text-white">{title}</h3>
      <p className="mobile-caption mb-4">{description}</p>
      <button className="mobile-button bg-cyan-500/20 text-cyan-300 px-6 py-2 border border-cyan-500/30">
        <Plus className="h-4 w-4 inline mr-2" />
        {actionText}
      </button>
    </div>
  );

  const DataCard = ({ icon: Icon, title, value, subtitle, hasData, color = "blue" }: {
    icon: any;
    title: string;
    value: string | number;
    subtitle: string;
    hasData: boolean;
    color?: string;
  }) => {
    const colorClasses = {
      blue: "text-blue-300 border-blue-500/30 bg-blue-500/10",
      red: "text-red-300 border-red-500/30 bg-red-500/10",
      teal: "text-teal-300 border-teal-500/30 bg-teal-500/10",
      purple: "text-purple-300 border-purple-500/30 bg-purple-500/10"
    };

    return (
      <div className={`mobile-card ${hasData ? colorClasses[color as keyof typeof colorClasses] : ''}`}>
        <div className="flex items-center justify-between mb-2">
          <Icon className="h-6 w-6" />
          <ChevronRight className="h-4 w-4 text-white/40" />
        </div>
        <div className="space-y-1">
          <h3 className="mobile-subtitle text-white">{title}</h3>
          <div className="text-2xl font-bold text-white">{value}</div>
          <p className="mobile-caption">{subtitle}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="mobile-container pb-20">
      {/* Tabs de Navegação */}
      <div className="mobile-section">
        <div className="flex bg-white/5 rounded-2xl p-1 backdrop-blur-sm">
          {[
            { id: 'overview', label: 'Resumo', icon: Activity },
            { id: 'cycle', label: 'Ciclo', icon: Calendar },
            { id: 'data', label: 'Dados', icon: TrendingUp }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-200
                ${activeTab === tab.id 
                  ? 'bg-cyan-500/20 text-cyan-300 shadow-lg' 
                  : 'text-white/60'
                }
              `}
            >
              <tab.icon className="h-4 w-4" />
              <span className="text-sm">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo das Tabs */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* Status Geral */}
          <div className="mobile-card">
            <h2 className="mobile-title text-white mb-4">Status Geral</h2>
            
            {cyclesLoading || temperaturesLoading || mucusLoading ? (
              <div className="text-center py-4">
                <div className="animate-spin h-8 w-8 border-2 border-cyan-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                <p className="mobile-caption">Carregando...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Progresso de Dados */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="mobile-body text-white">Dados Registrados</span>
                    <span className="text-sm font-medium text-cyan-300">
                      {[hasCycles, hasTemperatures, hasMucusData].filter(Boolean).length}/3
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${([hasCycles, hasTemperatures, hasMucusData].filter(Boolean).length / 3) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>

                {/* Ações Rápidas */}
                <div className="space-y-2">
                  {!hasTemperatures && (
                    <div className="flex items-center gap-3 p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                      <Thermometer className="h-5 w-5 text-red-400" />
                      <div className="flex-1">
                        <p className="mobile-body text-white">Medir temperatura basal</p>
                        <p className="mobile-caption">Recomendado: ao acordar</p>
                      </div>
                    </div>
                  )}
                  
                  {!hasMucusData && (
                    <div className="flex items-center gap-3 p-3 bg-teal-500/10 rounded-xl border border-teal-500/20">
                      <Droplets className="h-5 w-5 text-teal-400" />
                      <div className="flex-1">
                        <p className="mobile-body text-white">Observar muco cervical</p>
                        <p className="mobile-caption">Registre as características</p>
                      </div>
                    </div>
                  )}
                  
                  {!hasCycles && (
                    <div className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                      <Calendar className="h-5 w-5 text-purple-400" />
                      <div className="flex-1">
                        <p className="mobile-body text-white">Registrar ciclo menstrual</p>
                        <p className="mobile-caption">Comece com seu último ciclo</p>
                      </div>
                    </div>
                  )}

                  {hasCycles && hasTemperatures && hasMucusData && (
                    <div className="text-center p-6 bg-green-500/10 rounded-xl border border-green-500/20">
                      <Heart className="h-8 w-8 mx-auto mb-2 text-green-400" />
                      <p className="mobile-body text-white">Todos os dados básicos registrados!</p>
                      <p className="mobile-caption">Continue monitorando regularmente</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'cycle' && (
        <div className="space-y-4">
          {cyclesLoading ? (
            <LoadingCard />
          ) : hasCycles ? (
            <div className="mobile-card">
              <h2 className="mobile-title text-white mb-4">Ciclo Atual</h2>
              <div className="text-center py-4">
                <Calendar className="h-12 w-12 mx-auto mb-3 text-cyan-400" />
                <p className="mobile-body text-white mb-1">
                  {Array.isArray(menstrualCycles) ? menstrualCycles.length : 0} ciclo{(Array.isArray(menstrualCycles) ? menstrualCycles.length : 0) !== 1 ? 's' : ''} registrado{(Array.isArray(menstrualCycles) ? menstrualCycles.length : 0) !== 1 ? 's' : ''}
                </p>
                <p className="mobile-caption">Análise detalhada em desenvolvimento</p>
              </div>
            </div>
          ) : (
            <EmptyStateCard
              icon={Calendar}
              title="Nenhum Ciclo Registrado"
              description="Registre seu primeiro ciclo para ver análises detalhadas"
              actionText="Registrar Ciclo"
            />
          )}
        </div>
      )}

      {activeTab === 'data' && (
        <div className="space-y-4">
          <div className="mobile-grid-2">
            {temperaturesLoading ? (
              <LoadingCard />
            ) : (
              <DataCard
                icon={Thermometer}
                title="Temperatura"
                value={hasTemperatures ? (Array.isArray(basalTemperatures) ? basalTemperatures.length : 0) : 0}
                subtitle={hasTemperatures ? "Medições registradas" : "Nenhuma medição"}
                hasData={hasTemperatures}
                color="red"
              />
            )}

            {mucusLoading ? (
              <LoadingCard />
            ) : (
              <DataCard
                icon={Droplets}
                title="Observações"
                value={hasMucusData ? (Array.isArray(cervicalMucus) ? cervicalMucus.length : 0) : 0}
                subtitle={hasMucusData ? "Registros de muco" : "Nenhuma observação"}
                hasData={hasMucusData}
                color="teal"
              />
            )}
          </div>

          {/* Ações de Entrada de Dados */}
          <div className="space-y-3">
            <button className="w-full mobile-button bg-red-500/20 text-red-300 py-4 border border-red-500/30 flex items-center justify-center gap-3">
              <Thermometer className="h-5 w-5" />
              <span>Registrar Temperatura</span>
            </button>
            
            <button className="w-full mobile-button bg-teal-500/20 text-teal-300 py-4 border border-teal-500/30 flex items-center justify-center gap-3">
              <Droplets className="h-5 w-5" />
              <span>Registrar Observação</span>
            </button>
            
            <button className="w-full mobile-button bg-purple-500/20 text-purple-300 py-4 border border-purple-500/30 flex items-center justify-center gap-3">
              <Calendar className="h-5 w-5" />
              <span>Registrar Ciclo</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileDashboard;