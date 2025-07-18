import { useState } from "react";
import Header from "@/components/ui/Header";
import Dashboard from "@/components/ui/Dashboard";
import DataEntry from "@/components/ui/DataEntry";
import QuickActions from "@/components/ui/QuickActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, TrendingUp, Thermometer, Droplets, Activity, FileText } from "lucide-react";

const DashboardPage = () => {
  const [userId] = useState(1); // Mock user ID

  return (
    <div className="min-h-screen tech-bg">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Header />
        
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Dashboard userId={userId} />
            
            <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5 glass-card p-1">
              <TabsTrigger value="overview" className="text-cyan-300">Visão Geral</TabsTrigger>
              <TabsTrigger value="entry" className="text-yellow-300">Registrar</TabsTrigger>
              <TabsTrigger value="cycles" className="text-blue-300">Ciclos</TabsTrigger>
              <TabsTrigger value="temperature" className="text-red-300">Temperatura</TabsTrigger>
              <TabsTrigger value="reports" className="text-teal-300">Relatórios</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="glass-card border-cyan-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-cyan-300">
                      <Activity className="h-5 w-5" />
                      Resumo dos Últimos 30 Dias
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Dias de ciclo:</span>
                      <span className="text-white font-semibold">14/28</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Temperaturas registradas:</span>
                      <span className="text-white font-semibold">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Observações de muco:</span>
                      <span className="text-white font-semibold">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Consistência do ciclo:</span>
                      <span className="text-green-400 font-semibold">Regular</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-card border-yellow-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-yellow-300">
                      <TrendingUp className="h-5 w-5" />
                      Tendências e Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 glass-panel rounded-lg">
                      <div className="text-sm font-medium text-white mb-1">Padrão de Ovulação</div>
                      <div className="text-xs text-gray-400">Ovulação consistente no dia 14 ± 1 dia</div>
                    </div>
                    <div className="p-3 glass-panel rounded-lg">
                      <div className="text-sm font-medium text-white mb-1">Temperatura Basal</div>
                      <div className="text-xs text-gray-400">Padrão bifásico típico observado</div>
                    </div>
                    <div className="p-3 glass-panel rounded-lg">
                      <div className="text-sm font-medium text-white mb-1">Duração do Ciclo</div>
                      <div className="text-xs text-gray-400">Média de 28 dias com variação mínima</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="entry" className="space-y-4">
              <DataEntry userId={userId} />
            </TabsContent>
            
            <TabsContent value="cycles" className="space-y-4">
              <Card className="glass-card border-blue-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-300">
                    <Calendar className="h-5 w-5" />
                    Histórico de Ciclos Menstruais
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[1, 2, 3].map((cycle) => (
                      <div key={cycle} className="flex items-center justify-between p-3 glass-panel rounded-lg">
                        <div>
                          <div className="text-sm font-medium text-white">Ciclo {cycle}</div>
                          <div className="text-xs text-gray-400">Janeiro 2025 • 28 dias</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-cyan-300">Regular</div>
                          <div className="text-xs text-gray-400">Ovulação dia 14</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="temperature" className="space-y-4">
              <Card className="glass-card border-red-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-300">
                    <Thermometer className="h-5 w-5" />
                    Gráfico de Temperatura Basal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 glass-panel rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <Thermometer className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Gráfico de temperatura em desenvolvimento</p>
                      <p className="text-sm">Registre temperaturas para visualizar tendências</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports" className="space-y-4">
              <Card className="glass-card border-teal-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-teal-300">
                    <FileText className="h-5 w-5" />
                    Relatórios Personalizados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 glass-panel rounded-lg text-center">
                      <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                      <h3 className="text-white font-medium mb-1">Relatório Mensal</h3>
                      <p className="text-xs text-gray-400 mb-3">Análise completa do ciclo</p>
                      <button className="tech-button w-full text-sm">Gerar</button>
                    </div>
                    <div className="p-4 glass-panel rounded-lg text-center">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-400" />
                      <h3 className="text-white font-medium mb-1">Análise de Fertilidade</h3>
                      <p className="text-xs text-gray-400 mb-3">Padrões e recomendações</p>
                      <button className="tech-button w-full text-sm">Gerar</button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          </div>
          
          {/* Sidebar com ações rápidas */}
          <div className="space-y-6">
            <QuickActions userId={userId} />
          </div>
        </div>
        
        <footer className="mt-8 text-center text-sm text-blue-200 glass-panel p-4 rounded-lg shadow-md">
          <div className="text-xs text-blue-300/70 flex justify-center items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-yellow-400 pulse-animation"></span>
            <span>Idalia Calc • Dashboard v1.0</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardPage;