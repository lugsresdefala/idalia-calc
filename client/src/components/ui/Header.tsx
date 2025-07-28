import { Link } from "wouter";
import { Activity, Calculator, BarChart3, Bell, FileText, LogIn, CreditCard } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const { isAuthenticated, user } = useAuth();
  return (
    <header className="mb-8">
      <div className="flex items-center justify-center mb-4">
        {/* Logo oficial da Idalia */}
        <div className="relative">
          <img 
            src="/idalia-logo.png" 
            alt="Idalia Calc - Logo" 
            className="w-16 h-16 drop-shadow-lg hover:scale-105 transition-transform duration-300"
          />
          {/* Efeito de brilho sutil */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
        </div>
      </div>
      
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-yellow-400 tech-text-glow">
          Idalia Calc
        </h1>
        <p className="text-blue-100 max-w-2xl mx-auto text-lg mb-4">
          Calculadoras médicas especializadas
        </p>
        
        {/* Navegação */}
        <nav className="flex justify-center gap-3 flex-wrap">
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass-panel text-cyan-300 hover:text-cyan-200 transition-all duration-300 tech-border-faint">
            <Calculator className="h-4 w-4" />
            Calculadoras
          </Link>
          <Link href="/dashboard" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass-panel text-blue-300 hover:text-blue-200 transition-all duration-300 tech-border-faint">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </Link>
          <Link href="/notifications" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass-panel text-yellow-300 hover:text-yellow-200 transition-all duration-300 tech-border-faint">
            <Bell className="h-4 w-4" />
            Notificações
          </Link>
          <Link href="/history" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass-panel text-purple-300 hover:text-purple-200 transition-all duration-300 tech-border-faint">
            <FileText className="h-4 w-4" />
            Histórico
          </Link>
          <Link href="/algoritmos" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass-panel text-teal-300 hover:text-teal-200 transition-all duration-300 tech-border-faint">
            <Activity className="h-4 w-4" />
            Algoritmos
          </Link>
        </nav>
        
        {/* Botões de Autenticação e Assinatura */}
        <div className="mt-6 flex justify-center gap-4">
          {!isAuthenticated ? (
            <button 
              onClick={() => window.location.href = '/api/login'}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/25"
            >
              <LogIn className="h-5 w-5" />
              Entrar / Cadastrar
            </button>
          ) : (
            <>
              <div className="flex items-center gap-4">
                <span className="text-cyan-300">Olá, {user?.firstName || 'Usuário'}</span>
                {!user?.subscriptionActive && (
                  <button 
                    onClick={() => window.location.href = '/subscribe'}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 transition-all"
                  >
                    <CreditCard className="h-4 w-4" />
                    Assinar Premium
                  </button>
                )}
                <button 
                  onClick={() => window.location.href = '/api/logout'}
                  className="px-4 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors border border-red-500/30"
                >
                  Sair
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;