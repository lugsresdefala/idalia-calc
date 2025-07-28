import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Thermometer, 
  Droplets, 
  Bell, 
  TrendingUp, 
  FileText, 
  Clock,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

interface QuickActionsProps {
  userId?: number;
}

const QuickActions = ({ userId = 1 }: QuickActionsProps) => {
  const [notifications, setNotifications] = useState<any[]>([]);

  const markAsComplete = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "temperature": return <Thermometer className="h-4 w-4 text-red-400" />;
      case "observation": return <Droplets className="h-4 w-4 text-blue-400" />;
      case "cycle": return <Calendar className="h-4 w-4 text-purple-400" />;
      default: return <Bell className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Ações Rápidas */}
      <Card className="glass-card border-yellow-500/20 golden-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-300">
            <Clock className="h-5 w-5" />
            Ações Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2 glass-panel border-red-500/30 hover:border-red-400 transition-all"
            >
              <Thermometer className="h-6 w-6 text-red-400" />
              <span className="text-xs text-center">Registrar Temperatura</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2 glass-panel border-blue-500/30 hover:border-blue-400 transition-all"
            >
              <Droplets className="h-6 w-6 text-blue-400" />
              <span className="text-xs text-center">Observar Muco</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2 glass-panel border-purple-500/30 hover:border-purple-400 transition-all"
            >
              <Calendar className="h-6 w-6 text-purple-400" />
              <span className="text-xs text-center">Novo Ciclo</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2 glass-panel border-green-500/30 hover:border-green-400 transition-all"
            >
              <FileText className="h-6 w-6 text-green-400" />
              <span className="text-xs text-center">Gerar Relatório</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notificações e Lembretes */}
      <Card className="glass-card border-cyan-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan-300">
            <Bell className="h-5 w-5" />
            Lembretes de Hoje
            {notifications.length > 0 && (
              <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                {notifications.length}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center p-6 text-gray-400">
              <CheckCircle2 className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Todas as tarefas concluídas!</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center gap-3 p-3 glass-panel rounded-lg"
              >
                {getIconForType(notification.type)}
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">
                    {notification.message}
                  </div>
                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {notification.time}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {notification.urgent && (
                    <AlertCircle className="h-4 w-4 text-orange-400" />
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => markAsComplete(notification.id)}
                    className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Insights Rápidos */}
      <Card className="glass-card border-teal-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-teal-300">
            <TrendingUp className="h-5 w-5" />
            Insights Rápidos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 glass-panel rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span className="text-sm font-medium text-white">Ciclo Regular</span>
            </div>
            <p className="text-xs text-gray-400">
              Seus ciclos têm sido consistentes em 28 ± 1 dia
            </p>
          </div>
          
          <div className="p-3 glass-panel rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              <span className="text-sm font-medium text-white">Padrão de Ovulação</span>
            </div>
            <p className="text-xs text-gray-400">
              Ovulação detectada consistentemente no dia 14
            </p>
          </div>
          
          <div className="p-3 glass-panel rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              <span className="text-sm font-medium text-white">Temperatura Basal</span>
            </div>
            <p className="text-xs text-gray-400">
              Padrão bifásico claro nos últimos 3 ciclos
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActions;