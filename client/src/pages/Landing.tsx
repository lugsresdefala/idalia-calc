import { ArrowRight, Calculator, Calendar, Activity, Stethoscope, Shield, Users, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800">
      {/* Header Clean */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-lg">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/idalia-logo.png" 
              alt="Idalia Calc" 
              className="h-10 w-10"
            />
            <div>
              <h1 className="text-xl font-semibold text-slate-800">Idalia Calc</h1>
              <p className="text-xs text-slate-600">Sistema Médico</p>
            </div>
          </div>
          <Button
            onClick={() => window.location.href = '/api/login'}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Acessar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Hero Limpo */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm mb-4">
              <Stethoscope className="h-4 w-4" />
              CRM: 220558
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
              Sistema de Cálculo Gestacional
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Ferramenta médica para análise de fertilidade e acompanhamento gestacional com base em protocolos clínicos.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.location.href = '/api/login'}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Iniciar Análise
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Ver Recursos
            </Button>
          </div>
        </div>
      </section>

      {/* Recursos Funcionais */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">
              Funcionalidades Médicas
            </h2>
            <p className="text-lg text-slate-600">
              Ferramentas baseadas em evidências científicas e diretrizes médicas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-slate-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Análise de Fertilidade</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Cálculo de janela fértil baseado em ciclo menstrual, temperatura basal e características do muco cervical.
                </p>
                <ul className="space-y-1 text-sm text-slate-500">
                  <li>• Predição de ovulação</li>
                  <li>• Monitoramento de ciclos</li>
                  <li>• Análise de padrões</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-green-100">
                    <Calculator className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Idade Gestacional</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Cálculo gestacional por DUM, ultrassonografia ou transferência embrionária (FIV).
                </p>
                <ul className="space-y-1 text-sm text-slate-500">
                  <li>• Regra de Naegele</li>
                  <li>• Compatível com FIV</li>
                  <li>• Marcos do desenvolvimento</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-purple-100">
                    <Activity className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Acompanhamento</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Dashboard com histórico, gráficos e relatórios para acompanhamento clínico.
                </p>
                <ul className="space-y-1 text-sm text-slate-500">
                  <li>• Histórico completo</li>
                  <li>• Gráficos de tendências</li>
                  <li>• Relatórios médicos</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Informações Médicas */}
      <section className="py-12 px-6 bg-slate-50">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Shield className="h-5 w-5 text-slate-600" />
              <h2 className="text-lg font-semibold text-slate-900">Informações Médicas</h2>
            </div>
            <p className="text-slate-700 mb-2">
              <strong>Dra. Idalia Aline de Souza</strong>
            </p>
            <p className="text-slate-600 text-sm">
              CRM: 220558 • Medicina Reprodutiva<br/>
              Baseado em protocolos do Ministério da Saúde e FEBRASGO
            </p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-slate-900">
            Acesse o Sistema
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Utilize ferramentas médicas profissionais para análise reprodutiva.
          </p>
          <Button
            size="lg"
            onClick={() => window.location.href = '/api/login'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            Começar Análise
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer Limpo */}
      <footer className="border-t border-slate-200 bg-white py-8 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="/idalia-logo.png" alt="Idalia Calc" className="h-8 w-8" />
              <div>
                <h3 className="font-semibold text-slate-900">Idalia Calc</h3>
                <p className="text-slate-600 text-sm">Sistema Médico</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-slate-600 text-sm">© 2025 Idalia Calc</p>
              <p className="text-slate-500 text-xs">CRM: 220558</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}