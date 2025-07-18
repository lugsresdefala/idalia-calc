import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Algorithms from "@/pages/Algorithms";
import Dashboard from "@/pages/Dashboard";
import Notifications from "@/pages/Notifications";
import "./styles/global.css"; // Added import for global styles

// Função para encaminhar URLs personalizados para as rotas corretas
function Router() {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/notifications" component={Notifications} />
        <Route path="/algorithms" component={Algorithms} />
        {/* Rota personalizada em português */}
        <Route path="/aloritmos" component={Algorithms} />
        {/* Fallback para 404 */}
        <Route component={NotFound} />
      </Switch>
    </>
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