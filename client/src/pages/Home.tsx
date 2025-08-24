import { useState, useEffect } from "react";
import { Link } from "wouter";
import MobileHome from "@/components/ui/MobileHome";
import GestationalCalculator from "@/components/calculator/GestationalCalculator";
import FertilityCalculator from "@/components/calculator/FertilityCalculator";

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

const Home = () => {
  const [activeTab, setActiveTab] = useState<"gestational" | "fertility">("fertility");
  const isMobile = useIsMobile();

  // Versão mobile otimizada
  if (isMobile) {
    return <MobileHome />;
  }

  // Versão desktop
  return (
    <div className="min-h-screen tech-bg">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3 text-cyan-200">
            Suas Calculadoras de Saúde
          </h1>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Selecione abaixo a calculadora desejada para obter análises precisas e personalizadas
          </p>
        </div>

        <div className="glass-card rounded-t-lg shadow-md flex border-b border-blue-400/20">
          <button
            onClick={() => setActiveTab("fertility")}
            className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-300 ${
              activeTab === "fertility" 
                ? "text-cyan-200 border-b-2 border-cyan-500 bg-gradient-to-r from-blue-900/50 to-teal-900/30 tech-text-glow" 
                : "text-cyan-300 hover:bg-blue-900/30"
            }`}
          >
            Período Fértil
          </button>
          <button
            onClick={() => setActiveTab("gestational")}
            className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-300 ${
              activeTab === "gestational" 
                ? "text-teal-200 border-b-2 border-teal-500 bg-gradient-to-r from-blue-900/50 to-teal-900/30 tech-text-glow" 
                : "text-teal-300 hover:bg-blue-900/30"
            }`}
          >
            Idade Gestacional
          </button>
        </div>

        {activeTab === "gestational" ? (
          <GestationalCalculator />
        ) : (
          <FertilityCalculator />
        )}

        <footer className="mt-8 text-center text-sm text-blue-200 glass-card p-6 rounded-lg shadow-xl tech-border">
          <p className="mb-3 text-cyan-300 font-medium">
            💙 Esta calculadora fornece análises baseadas em métodos obstétricos estabelecidos
          </p>
          <p className="mb-4 text-blue-200">
            Consulte sempre um profissional de saúde para interpretação dos resultados e orientações específicas
          </p>
          <div className="mb-4">
            <Link href="/algoritmos" className="inline-flex items-center text-cyan-300 hover:text-cyan-200 transition-colors tech-text-glow px-3 py-1 rounded-md glass-panel tech-border-faint">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Saiba mais sobre os métodos de cálculo
            </Link>
          </div>
          <div className="text-xs text-blue-300/70 flex justify-center items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-blue-400 pulse-animation"></span>
            <span>Idalia Calc v1.2.1</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
