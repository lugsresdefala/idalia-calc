import { useState } from "react";
import GestationalCalculator from "@/components/calculator/GestationalCalculator";
import FertilityCalculator from "@/components/calculator/FertilityCalculator";

const Home = () => {
  const [activeTab, setActiveTab] = useState<"gestational" | "fertility">("fertility");

  return (
    <div className="min-h-screen tech-bg">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 tech-text-glow">
            Idalia Calc
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">
            Calculadora de precisão médica com análise avançada de ciclos e desenvolvimento gestacional
          </p>
        </header>

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

        <footer className="mt-8 text-center text-sm text-blue-200 glass-panel p-4 rounded-lg shadow-md">
          <p className="mb-2">
            Esta calculadora de precisão fornece análises baseadas em metodologias científicas e algoritmos avançados.
          </p>
          <p>
            Consulte sempre um profissional de saúde para interpretação dos resultados e orientações específicas.
          </p>
          <div className="mt-4 text-xs text-blue-300/70 flex justify-center items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-blue-400 pulse-animation"></span>
            <span>Idalia Calc v1.2.1</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
