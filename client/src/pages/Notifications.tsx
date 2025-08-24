import NotificationSystem from "@/components/ui/NotificationSystem";

const NotificationsPage = () => {
  return (
    <div className="min-h-screen tech-bg">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <NotificationSystem userId={1} />
        
        <footer className="mt-8 text-center text-sm text-blue-200 glass-panel p-4 rounded-lg shadow-md">
          <div className="text-xs text-blue-300/70 flex justify-center items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 pulse-animation"></span>
            <span>Idalia Calc • Central de Notificações</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default NotificationsPage;