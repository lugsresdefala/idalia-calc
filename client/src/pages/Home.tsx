import { useState } from "react";
import GestationalCalculator from "@/components/calculator/GestationalCalculator";
import FertilityCalculator from "@/components/calculator/FertilityCalculator";

const Home = () => {
  const [activeTab, setActiveTab] = useState<"gestational" | "fertility">("fertility");

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-pink-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#c60055] to-[#ff4081]">
            Idalia Calc
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Compreenda seu ciclo menstrual com detalhes das fases hormonais, muco cervical e padrões de fertilidade
          </p>
        </header>

        <div className="bg-white rounded-t-lg shadow-sm flex border-b">
          <button
            onClick={() => setActiveTab("fertility")}
            className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-300 ${
              activeTab === "fertility" 
                ? "text-[#c60055] border-b-2 border-[#ff4081] bg-gradient-to-r from-pink-50 to-transparent" 
                : "text-gray-600 hover:bg-pink-50"
            }`}
          >
            Período Fértil
          </button>
          <button
            onClick={() => setActiveTab("gestational")}
            className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-300 ${
              activeTab === "gestational" 
                ? "text-[#c60055] border-b-2 border-[#ff4081] bg-gradient-to-r from-pink-50 to-transparent" 
                : "text-gray-600 hover:bg-pink-50"
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

        <footer className="mt-8 text-center text-sm text-gray-600 bg-white p-4 rounded-lg shadow-sm">
          <p className="mb-2">
            Esta calculadora fornece estimativas baseadas em cálculos padrão e informações científicas sobre o ciclo menstrual.
          </p>
          <p>
            Consulte sempre um profissional de saúde para orientações específicas sobre fertilidade e planejamento familiar.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
