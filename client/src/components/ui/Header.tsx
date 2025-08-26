import { Link } from "wouter";
import { Activity, Calculator, BarChart3, Bell, FileText, CreditCard } from "lucide-react";

const Header = () => {
  return (
    <header className="mb-8">
      <div className="flex items-center justify-center mb-4">
        {/* Logo oficial da Idalia */}
        <div className="relative">
          <img 
            src="/idalia-logo-new.png" 
            alt="Idalia Calc - Logo" 
            className="h-16 w-auto drop-shadow-lg hover:scale-105 transition-transform duration-300"
          />
          {/* Efeito de brilho sutil */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
        </div>
      </div>
      
      <div className="text-center">
        <h1 className="text-3xl font-semibold mb-2 text-slate-900">
          Idalia Calc
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-base mb-4">
          Plataforma médica especializada em saúde reprodutiva
        </p>
        
        {/* Navegação */}
        <nav className="flex justify-center gap-3 flex-wrap">
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors">
            <Calculator className="h-4 w-4" />
            Calculadoras
          </Link>
          <Link href="/dashboard" className="inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </Link>
          <Link href="/notifications" className="inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors">
            <Bell className="h-4 w-4" />
            Notificações
          </Link>
          <Link href="/history" className="inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors">
            <FileText className="h-4 w-4" />
            Histórico
          </Link>
          <Link href="/subscription" className="inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors">
            <CreditCard className="h-4 w-4" />
            Assinatura
          </Link>
          <Link href="/algoritmos" className="inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors">
            <Activity className="h-4 w-4" />
            Algoritmos
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;