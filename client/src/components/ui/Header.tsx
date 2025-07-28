import { Link } from "wouter";
import { Heart, Calculator, BarChart3, Bell } from "lucide-react";

const Header = () => {
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
          Plataforma médica especializada em saúde reprodutiva e análise de fertilidade
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
          <Link href="/algoritmos" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass-panel text-teal-300 hover:text-teal-200 transition-all duration-300 tech-border-faint">
            <Heart className="h-4 w-4" />
            Algoritmos
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;