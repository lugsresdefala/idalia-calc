import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, ChevronRight, Shield, Award, Users } from "lucide-react";
import { useLocation } from "wouter";

export default function Landing() {
  const [, setLocation] = useLocation();

  const plans = [
    {
      id: "free",
      name: "Básico",
      price: "Grátis",
      description: "1 cálculo completo",
      features: [
        "1 cálculo de fertilidade",
        "Calendário básico",
        "Resultados instantâneos"
      ]
    },
    {
      id: "professional",
      name: "Premium",
      price: "R$ 29,90",
      period: "/mês",
      description: "Acesso completo",
      popular: true,
      features: [
        "Cálculos ilimitados",
        "Histórico completo",
        "Dashboard personalizado",
        "Análise de temperatura basal",
        "Notificações inteligentes",
        "Exportação de dados",
        "Suporte prioritário"
      ]
    },
    {
      id: "fetalpro",
      name: "Bundle",
      price: "R$ 49,90",
      period: "/mês",
      description: "IdaliaCalc + FetalPro",
      badge: "NOVO",
      features: [
        "Tudo do Premium",
        "Acesso ao FetalPro",
        "Calculadoras fetais avançadas",
        "Curvas de crescimento",
        "Relatórios médicos",
        "Integração completa",
        "Suporte VIP"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <img 
                src="/idalia-logo-new.png" 
                alt="Idalia Calc" 
                className="h-10 w-auto"
              />
              <span className="text-xl font-light text-gray-900">Idalia Calc</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 text-sm">
                Recursos
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 text-sm">
                Planos
              </a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 text-sm">
                Sobre
              </a>
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => window.location.href = "/api/login"}
              >
                Entrar
              </Button>
              <Button
                className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 hover:opacity-90 text-white px-6"
                onClick={() => window.location.href = "/api/login"}
              >
                Começar Agora
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-purple-50/20 to-white py-24">
        <div className="absolute inset-0 bg-grid-gray-100/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
            Saúde Reprodutiva
            <span className="block font-normal bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
              Com Precisão Médica
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Plataforma profissional para acompanhamento da fertilidade e gestação, 
            baseada em evidências científicas e recomendações médicas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 hover:opacity-90 text-white px-8 py-6 text-lg"
              onClick={() => setLocation("/app")}
            >
              Usar Gratuitamente
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-300 text-gray-700 px-8 py-6 text-lg"
              onClick={() => setLocation("/algoritmos")}
            >
              Como Funciona
            </Button>
          </div>
          
          {/* Trust badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 items-center">
            <div className="flex items-center gap-2 text-gray-600">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="text-sm">Dados Seguros</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Award className="h-5 w-5 text-blue-600" />
              <span className="text-sm">Baseado em Evidências</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="h-5 w-5 text-purple-600" />
              <span className="text-sm">Milhares de Usuárias</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Recursos Profissionais
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ferramentas desenvolvidas com rigor científico para profissionais e pacientes
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 border-0 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-purple-600 rounded"></div>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Calculadora de Fertilidade
              </h3>
              <p className="text-gray-600">
                Algoritmos avançados para determinar período fértil com precisão clínica
              </p>
            </Card>
            
            <Card className="p-8 border-0 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-blue-600 rounded"></div>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Análise Gestacional
              </h3>
              <p className="text-gray-600">
                Acompanhamento detalhado da gestação com marcos do desenvolvimento fetal
              </p>
            </Card>
            
            <Card className="p-8 border-0 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-teal-600 rounded"></div>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Dashboard Inteligente
              </h3>
              <p className="text-gray-600">
                Visualização clara de dados e tendências para tomada de decisão informada
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Escolha seu Plano
            </h2>
            <p className="text-lg text-gray-600">
              Acesso profissional com preços acessíveis
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`relative p-8 ${
                  plan.popular 
                    ? 'border-2 border-purple-200 shadow-xl' 
                    : 'border shadow-sm'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                      RECOMENDADO
                    </span>
                  </div>
                )}
                {plan.badge && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-gradient-to-r from-blue-600 to-teal-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                      {plan.badge}
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-light text-gray-900">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-500 text-sm">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {plan.description}
                  </p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 hover:opacity-90 text-white'
                      : plan.badge
                      ? 'bg-gradient-to-r from-blue-600 to-teal-600 hover:opacity-90 text-white'
                      : 'bg-white hover:bg-gray-50 text-gray-900 border'
                  }`}
                  onClick={() => {
                    if (plan.id === 'free') {
                      setLocation("/app");
                    } else {
                      window.location.href = "/api/login";
                    }
                  }}
                >
                  {plan.id === 'free' ? 'Começar Grátis' : 'Assinar Agora'}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/idalia-logo-new.png" 
                alt="Idalia Calc" 
                className="h-8 w-auto opacity-80"
              />
              <span className="text-lg font-light text-gray-700">Idalia Calc</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-600">
              <a href="/terms" className="hover:text-gray-900">Termos de Uso</a>
              <a href="/privacy" className="hover:text-gray-900">Privacidade</a>
              <a href="/contact" className="hover:text-gray-900">Contato</a>
            </div>
            <p className="text-sm text-gray-500">
              © 2025 Idalia Calc. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}