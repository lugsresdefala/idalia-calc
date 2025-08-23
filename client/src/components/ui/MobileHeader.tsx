import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  Calculator, 
  BarChart3, 
  Bell, 
  Activity, 
  Menu, 
  X,
  Home,
  CreditCard
} from "lucide-react";

const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Início", active: location === "/" },
    { path: "/dashboard", icon: BarChart3, label: "Dashboard", active: location === "/dashboard" },
    { path: "/notifications", icon: Bell, label: "Notificações", active: location === "/notifications" },
    { path: "/subscription", icon: CreditCard, label: "Assinatura", active: location === "/subscription" },
    { path: "/algoritmos", icon: Activity, label: "Algoritmos", active: location === "/algoritmos" }
  ];

  return (
    <>
      {/* Header Principal Mobile */}
      <header className="sticky top-0 z-50 mobile-safe-area">
        <div className="mobile-glass border-b border-white/10">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Logo e Título */}
            <div className="flex items-center gap-3">
              <img 
                src="/idalia-logo.png" 
                alt="Idalia" 
                className="w-10 h-10 drop-shadow-lg"
              />
              <div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-yellow-400">
                  Idalia Calc
                </h1>
                <p className="text-xs text-white/70">Saúde Reprodutiva</p>
              </div>
            </div>

            {/* Menu Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mobile-button p-2 bg-white/10"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Menu Dropdown Mobile */}
        {isMenuOpen && (
          <div className="mobile-glass border-b border-white/10 animate-in slide-in-from-top duration-200">
            <nav className="p-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    flex items-center gap-3 p-3 rounded-xl transition-all duration-200
                    ${item.active 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                      : 'text-white/80 hover:bg-white/10'
                    }
                  `}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 mobile-safe-area">
        <div className="mobile-glass border-t border-white/10">
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`
                  mobile-nav-item p-2
                  ${item.active 
                    ? 'text-cyan-300' 
                    : 'text-white/60'
                  }
                `}
              >
                <item.icon className={`h-6 w-6 mb-1 ${item.active ? 'scale-110' : ''} transition-transform duration-200`} />
                <span className="text-xs">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default MobileHeader;