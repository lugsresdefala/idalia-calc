import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import Algorithms from "@/pages/Algorithms";
import Dashboard from "@/pages/Dashboard";
import Notifications from "@/pages/Notifications";
import History from "@/pages/History";
import Header from "./components/ui/Header";
import MobileHeader from "./components/ui/MobileHeader";
import "./styles/global.css";

// Hook para detectar dispositivos móveis
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || 
                   /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

// Função para encaminhar URLs personalizados para as rotas corretas
function Router() {
  const isMobile = useIsMobile();
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <div className={`min-h-screen ${isMobile ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800' : ''}`}>
      {isAuthenticated && (isMobile ? <MobileHeader /> : <Header />)}
      
      <main className={isMobile && isAuthenticated ? '' : 'container mx-auto px-4'}>
        <Switch>
          {isLoading || !isAuthenticated ? (
            <Route path="/" component={Landing} />
          ) : (
            <>
              <Route path="/" component={Home} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/notifications" component={Notifications} />
              <Route path="/history" component={History} />
              <Route path="/algorithms" component={Algorithms} />
              {/* Rota personalizada em português */}
              <Route path="/algoritmos" component={Algorithms} />
            </>
          )}
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;