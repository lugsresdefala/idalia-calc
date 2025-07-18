import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  BellRing, 
  Settings, 
  Clock, 
  Calendar,
  Thermometer,
  Droplets,
  Heart,
  CheckCircle2,
  X,
  AlertCircle
} from "lucide-react";

interface Notification {
  id: number;
  type: "reminder" | "alert" | "info" | "warning";
  category: "temperature" | "cycle" | "observation" | "appointment" | "general";
  title: string;
  message: string;
  time: Date;
  read: boolean;
  urgent: boolean;
  actionRequired: boolean;
}

interface NotificationSystemProps {
  userId?: number;
}

const NotificationSystem = ({ userId = 1 }: NotificationSystemProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "reminder",
      category: "temperature",
      title: "Temperatura Basal",
      message: "Hora de medir sua temperatura basal. Lembre-se de fazer isso antes de se levantar.",
      time: new Date(),
      read: false,
      urgent: true,
      actionRequired: true
    },
    {
      id: 2,
      type: "info",
      category: "cycle",
      title: "Período Fértil",
      message: "Seu período fértil está começando em 2 dias. Considere aumentar a frequência de observações.",
      time: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
      read: false,
      urgent: false,
      actionRequired: false
    },
    {
      id: 3,
      type: "alert",
      category: "observation",
      title: "Muco Cervical",
      message: "Você não registrou observações de muco cervical há 3 dias. Isso pode afetar a precisão das previsões.",
      time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
      read: true,
      urgent: false,
      actionRequired: true
    },
    {
      id: 4,
      type: "info",
      category: "general",
      title: "Análise de Ciclo",
      message: "Seu relatório mensal está pronto! Seus ciclos continuam regulares com média de 28 dias.",
      time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 dia atrás
      read: true,
      urgent: false,
      actionRequired: false
    }
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    temperatureReminders: true,
    cycleAlerts: true,
    ovulationNotifications: true,
    missedDataWarnings: true,
    weeklyReports: true
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const urgentCount = notifications.filter(n => !n.read && n.urgent).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const dismissNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIconForCategory = (category: string) => {
    switch (category) {
      case "temperature": return <Thermometer className="h-4 w-4 text-red-400" />;
      case "cycle": return <Calendar className="h-4 w-4 text-purple-400" />;
      case "observation": return <Droplets className="h-4 w-4 text-blue-400" />;
      case "appointment": return <Clock className="h-4 w-4 text-green-400" />;
      default: return <Bell className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTypeColor = (type: string, urgent: boolean) => {
    if (urgent) return "border-red-500/30 bg-red-500/10";
    
    switch (type) {
      case "reminder": return "border-blue-500/30 bg-blue-500/10";
      case "alert": return "border-orange-500/30 bg-orange-500/10";
      case "info": return "border-cyan-500/30 bg-cyan-500/10";
      case "warning": return "border-yellow-500/30 bg-yellow-500/10";
      default: return "border-gray-500/30 bg-gray-500/10";
    }
  };

  const formatTime = (time: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - time.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return "Agora";
    if (diffMins < 60) return `${diffMins}m atrás`;
    if (diffHours < 24) return `${diffHours}h atrás`;
    if (diffDays < 7) return `${diffDays}d atrás`;
    return time.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header das Notificações */}
      <Card className="glass-card border-cyan-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-cyan-300">
              <BellRing className="h-5 w-5" />
              Notificações
              {unreadCount > 0 && (
                <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                  {unreadCount}
                </Badge>
              )}
              {urgentCount > 0 && (
                <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                  {urgentCount} urgente{urgentCount > 1 ? 's' : ''}
                </Badge>
              )}
            </CardTitle>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={markAllAsRead}
                  className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                >
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  Marcar todas como lidas
                </Button>
              )}
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-gray-300"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Lista de Notificações */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <Card className="glass-card border-gray-500/20">
            <CardContent className="p-8 text-center text-gray-400">
              <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma notificação no momento</p>
            </CardContent>
          </Card>
        ) : (
          notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`glass-card transition-all duration-300 ${
                notification.read ? 'opacity-70' : ''
              } ${getTypeColor(notification.type, notification.urgent)}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getIconForCategory(notification.category)}
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className={`text-sm font-medium ${
                        notification.read ? 'text-gray-300' : 'text-white'
                      }`}>
                        {notification.title}
                      </h4>
                      
                      {notification.urgent && (
                        <AlertCircle className="h-4 w-4 text-orange-400" />
                      )}
                      
                      {notification.actionRequired && (
                        <Badge 
                          variant="secondary" 
                          className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs"
                        >
                          Ação necessária
                        </Badge>
                      )}
                    </div>
                    
                    <p className={`text-sm ${
                      notification.read ? 'text-gray-400' : 'text-gray-300'
                    }`}>
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">
                        {formatTime(notification.time)}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => markAsRead(notification.id)}
                            className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 text-xs"
                          >
                            Marcar como lida
                          </Button>
                        )}
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => dismissNotification(notification.id)}
                          className="text-gray-400 hover:text-gray-300 hover:bg-gray-500/10"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Configurações de Notificações */}
      <Card className="glass-card border-gray-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-300">
            <Settings className="h-5 w-5" />
            Configurações de Notificações
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(notificationSettings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 glass-panel rounded-lg">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-white">
                    {key === 'temperatureReminders' && 'Lembretes de Temperatura'}
                    {key === 'cycleAlerts' && 'Alertas de Ciclo'}
                    {key === 'ovulationNotifications' && 'Notificações de Ovulação'}
                    {key === 'missedDataWarnings' && 'Avisos de Dados Perdidos'}
                    {key === 'weeklyReports' && 'Relatórios Semanais'}
                  </div>
                  <div className="text-xs text-gray-400">
                    {key === 'temperatureReminders' && 'Lembrete diário para medir temperatura basal'}
                    {key === 'cycleAlerts' && 'Notificações sobre mudanças no ciclo'}
                    {key === 'ovulationNotifications' && 'Alertas do período fértil e ovulação'}
                    {key === 'missedDataWarnings' && 'Avisos quando dados não são registrados'}
                    {key === 'weeklyReports' && 'Resumos semanais automáticos'}
                  </div>
                </div>
                <div className={`w-10 h-6 rounded-full transition-colors ${
                  value ? 'bg-green-500' : 'bg-gray-600'
                } relative cursor-pointer`}
                  onClick={() => setNotificationSettings(prev => ({ ...prev, [key]: !value }))}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                    value ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSystem;