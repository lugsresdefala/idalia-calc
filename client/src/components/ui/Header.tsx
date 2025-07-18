import { Link } from "wouter";
import { Heart, Calculator, BarChart3, Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="mb-8">
      <div className="flex items-center justify-center mb-4">
        {/* Logo do Beija-flor inspirado no design original */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-teal-600 p-1 shadow-lg">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-sky-200/90 via-blue-200/80 to-teal-200/90 flex items-center justify-center">
              {/* Beija-flor estilizado com CSS */}
              <div className="relative">
                <svg 
                  width="32" 
                  height="32" 
                  viewBox="0 0 32 32" 
                  className="text-teal-700"
                  fill="currentColor"
                >
                  {/* Corpo do beija-flor */}
                  <ellipse cx="16" cy="18" rx="2" ry="6" className="fill-teal-800"/>
                  
                  {/* Cabeça */}
                  <circle cx="16" cy="10" r="2.5" className="fill-teal-800"/>
                  
                  {/* Bico */}
                  <path d="M16 7 L16 4" stroke="currentColor" strokeWidth="1" className="stroke-yellow-600"/>
                  
                  {/* Asa esquerda */}
                  <path d="M14 12 Q8 10 6 16 Q8 14 14 16" className="fill-gradient-to-r from-teal-600 to-blue-600"/>
                  
                  {/* Asa direita */}
                  <path d="M18 12 Q24 10 26 16 Q24 14 18 16" className="fill-gradient-to-l from-teal-600 to-blue-600"/>
                  
                  {/* Cauda */}
                  <path d="M16 24 Q12 28 14 30 Q16 28 18 30 Q20 28 16 24" className="fill-teal-700"/>
                  
                  {/* Flores pequenas */}
                  <circle cx="8" cy="8" r="1" className="fill-yellow-500 opacity-70"/>
                  <circle cx="24" cy="8" r="1" className="fill-yellow-500 opacity-70"/>
                  <circle cx="10" cy="24" r="1" className="fill-yellow-500 opacity-70"/>
                  <circle cx="22" cy="24" r="1" className="fill-yellow-500 opacity-70"/>
                </svg>
              </div>
            </div>
          </div>
          {/* Efeito de brilho */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent"></div>
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
          <Link href="/aloritmos" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass-panel text-teal-300 hover:text-teal-200 transition-all duration-300 tech-border-faint">
            <Heart className="h-4 w-4" />
            Algoritmos
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;