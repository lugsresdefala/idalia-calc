import { ArrowRight, Calculator, Calendar, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/idalia-logo.png" 
              alt="Idalia" 
              className="h-8 w-8"
            />
            <span className="text-xl font-semibold text-gray-900">
              Idalia Calc
            </span>
          </div>
          <Button
            onClick={() => window.location.href = '/api/login'}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Entrar
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Calculadoras Médicas para Saúde Reprodutiva
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Ferramentas precisas para análise de fertilidade e acompanhamento gestacional, baseadas em evidências científicas.
          </p>
          <Button
            size="lg"
            onClick={() => window.location.href = '/api/login'}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Começar Agora
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Recursos Principais
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Calendar className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Calculadora de Fertilidade</h3>
              <p className="text-gray-600">
                Determine sua janela fértil com precisão e acompanhe seu ciclo menstrual.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Calculator className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Idade Gestacional</h3>
              <p className="text-gray-600">
                Calcule a idade gestacional e acompanhe o desenvolvimento fetal.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Activity className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Monitoramento</h3>
              <p className="text-gray-600">
                Registre dados biológicos e visualize tendências ao longo do time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pronto para começar?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Acesse todas as ferramentas profissionais para saúde reprodutiva.
          </p>
          <Button
            size="lg"
            onClick={() => window.location.href = '/api/login'}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Criar Conta Gratuita
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="mb-2">© 2025 Idalia Calc. Todos os direitos reservados.</p>
          <p className="text-sm text-gray-400">
            Dra. Idalia Aline de Souza • CRM: 220558
          </p>
        </div>
      </footer>
    </div>
  );
}