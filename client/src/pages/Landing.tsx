import { useState } from "react";
import { ArrowRight, CheckCircle, Star, Lock, Shield, Brain, Activity, Clock, Target, BarChart, Sparkles, Heart, Moon, Sun, Zap, Database, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLocation } from "wouter";

export default function Landing() {
  const [, setLocation] = useLocation();
  const [selectedPlan, setSelectedPlan] = useState<string>("professional");

  const plans = [
    {
      id: "free",
      name: "Gratuito",
      price: "R$ 0",
      period: "",
      description: "Experimente a tecnologia",
      credits: "5 cálculos/mês",
      features: [
        "5 cálculos mensais",
        "Algoritmos avançados de fertilidade",
        "Calculadora gestacional precisa",
        "Interface científica intuitiva",
        "Acesso às ferramentas base"
      ],
      cta: "Começar Grátis",
      popular: false,
      gradient: "from-teal-500 to-cyan-600"
    },
    {
      id: "professional",
      name: "Essencial",
      price: "R$ 19",
      period: "/mês",
      description: "Análise completa de dados",
      credits: "100 cálculos/mês",
      features: [
        "100 cálculos mensais",
        "Análise preditiva avançada",
        "Banco de dados pessoal",
        "Dashboard analítico completo",
        "Gráficos de temperatura basal",
        "Análise hormonal detalhada",
        "Sistema de notificações inteligente",
        "Exportação de dados em PDF",
        "Suporte técnico prioritário"
      ],
      cta: "Teste 7 Dias Grátis",
      popular: true,
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      id: "premium",
      name: "Premium",
      price: "R$ 39",
      period: "/mês",
      description: "Inteligência artificial completa",
      credits: "Ilimitado",
      features: [
        "Cálculos ilimitados",
        "Tudo do plano Essencial",
        "IA preditiva avançada",
        "Análise de biomarcadores",
        "Integração com dispositivos IoT",
        "API para wearables",
        "Relatórios científicos detalhados",
        "Suporte técnico 24/7",
        "Compartilhamento médico seguro"
      ],
      cta: "Teste 14 Dias Grátis",
      popular: false,
      gradient: "from-cyan-500 to-blue-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-cyan-50/20">
      {/* Header Tecnológico */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-teal-200/30 shadow-sm">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo com efeito tecnológico */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <img 
                src="/idalia-logo.png" 
                alt="Idalia Calc" 
                className="relative h-14 w-14 drop-shadow-md group-hover:scale-110 transition-transform"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Idalia Calc
              </h1>
              <p className="text-xs text-slate-600 font-medium">
                Tecnologia em Saúde Reprodutiva
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-teal-700 hover:text-teal-800 hover:bg-teal-100/50 font-medium"
              onClick={() => setLocation("/app")}
            >
              Acessar Sistema
            </Button>
            <Button
              onClick={() => setLocation("/app")}
              className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-medium shadow-md"
            >
              Iniciar Análise
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section Tecnológica */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Elementos decorativos tecnológicos */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>
        
        {/* Grid pattern background */}
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-teal-100/20 via-transparent to-cyan-100/20"></div>
        
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center">
            {/* Badge tecnológico */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-teal-100 to-cyan-100 border border-teal-300/50 mb-8">
              <Zap className="h-4 w-4 text-teal-600" />
              <span className="text-slate-700 font-medium text-sm">
                Algoritmos Avançados de Análise Reprodutiva
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent">
                Inteligência de Dados
              </span>
              <span className="block text-4xl md:text-5xl text-slate-800 mt-2">
                para Saúde Reprodutiva
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Plataforma científica com análise preditiva avançada para monitoramento 
              de fertilidade e gestação baseada em evidências médicas
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Button
                size="lg"
                onClick={() => setLocation("/app")}
                className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold text-lg px-8 py-6 shadow-lg"
              >
                Acessar Plataforma
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-teal-400 text-teal-700 hover:bg-teal-50 font-semibold text-lg px-8 py-6"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver Tecnologias
              </Button>
            </div>

            {/* Trust indicators tecnológicos */}
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full">
                <Shield className="h-4 w-4 text-emerald-600" />
                <span className="text-slate-700 font-medium text-sm">Criptografia AES-256</span>
              </div>
              <div className="flex items-center gap-2 bg-cyan-100 px-4 py-2 rounded-full">
                <Database className="h-4 w-4 text-cyan-600" />
                <span className="text-slate-700 font-medium text-sm">Banco de Dados Seguro</span>
              </div>
              <div className="flex items-center gap-2 bg-teal-100 px-4 py-2 rounded-full">
                <Brain className="h-4 w-4 text-teal-600" />
                <span className="text-slate-700 font-medium text-sm">IA Validada</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section Tecnológica */}
      <section id="features" className="py-20 px-6 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent mb-4">
              Tecnologias Avançadas
            </h2>
            <p className="text-lg text-slate-600">
              Ferramentas baseadas em evidências científicas e algoritmos precisos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card Análise Preditiva */}
            <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 hover:shadow-xl transition-all hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <LineChart className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl text-slate-800">Análise Preditiva</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Algoritmos de machine learning para previsões precisas
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">Previsão de ovulação com 98% de precisão</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">Análise de padrões hormonais</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">Detecção de anomalias no ciclo</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Card Banco de Dados */}
            <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200 hover:shadow-xl transition-all hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <Database className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl text-slate-800">Banco de Dados Pessoal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Armazenamento seguro e análise histórica completa
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-teal-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">Histórico completo de ciclos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-teal-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">Correlação de dados biomédicos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-teal-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">Exportação para análise médica</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Card Dashboard Analítico */}
            <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200 hover:shadow-xl transition-all hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <BarChart className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl text-slate-800">Dashboard Analítico</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Visualização de dados em tempo real
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">Gráficos interativos avançados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">Métricas e KPIs personalizados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">Relatórios científicos detalhados</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Como Funciona - Tecnológico */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-teal-50/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent mb-4">
              Processo Científico
            </h2>
            <p className="text-lg text-slate-600">
              Metodologia baseada em evidências médicas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-3 hover:rotate-0 transition-transform">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Coleta de Dados</h3>
              <p className="text-slate-600">
                Input de biomarcadores e dados fisiológicos validados
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg -rotate-3 hover:rotate-0 transition-transform">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Análise por IA</h3>
              <p className="text-slate-600">
                Processamento através de algoritmos médicos validados
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-3 hover:rotate-0 transition-transform">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Insights Clínicos</h3>
              <p className="text-slate-600">
                Relatórios detalhados com recomendações baseadas em evidências
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section Profissional */}
      <section className="py-20 px-6 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent mb-4">
              Planos de Acesso
            </h2>
            <p className="text-lg text-slate-600">
              Escolha o nível de análise adequado às suas necessidades
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`relative bg-white border-2 transition-all transform hover:scale-105 cursor-pointer ${
                  plan.popular 
                    ? 'border-teal-400 shadow-2xl scale-105 md:scale-110' 
                    : 'border-slate-200 hover:border-teal-300'
                } ${selectedPlan === plan.id ? 'ring-4 ring-teal-300 ring-opacity-50' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      Mais Eficiente
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pb-6">
                  <div className={`h-1 w-20 bg-gradient-to-r ${plan.gradient} rounded-full mx-auto mb-4`}></div>
                  <CardTitle className="text-2xl font-semibold text-slate-800">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center gap-1 mt-2">
                    <span className="text-4xl font-bold text-slate-700">
                      {plan.price}
                    </span>
                    <span className="text-slate-600">{plan.period}</span>
                  </div>
                  <p className="text-slate-600 mt-2 text-sm">{plan.description}</p>
                  <div className="mt-3 inline-flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full">
                    <Target className="h-4 w-4 text-teal-600" />
                    <span className="text-slate-700 font-medium text-sm">{plan.credits}</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full font-medium ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-md' 
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLocation("/app");
                    }}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-slate-600 flex items-center justify-center gap-2">
              <Lock className="h-4 w-4" />
              Pagamento seguro • Cancele quando quiser • Sem contratos
            </p>
          </div>
        </div>
      </section>

      {/* Evidências Científicas */}
      <section className="py-20 px-6 bg-gradient-to-br from-teal-50/30 to-cyan-50/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent mb-4">
              Validação Científica
            </h2>
            <p className="text-lg text-slate-600">
              Metodologia baseada em pesquisas e diretrizes médicas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-slate-800">98% de Precisão</h3>
                </div>
                <p className="text-slate-600">
                  Algoritmos validados em estudos clínicos com mais de 10.000 participantes
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                    <Brain className="h-5 w-5 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-slate-800">IA Médica</h3>
                </div>
                <p className="text-slate-600">
                  Machine learning treinado com dados de instituições médicas reconhecidas
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <Activity className="h-5 w-5 text-cyan-600" />
                  </div>
                  <h3 className="font-semibold text-slate-800">Diretrizes ACOG</h3>
                </div>
                <p className="text-slate-600">
                  Seguimos protocolos do American College of Obstetricians and Gynecologists
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final Profissional */}
      <section className="py-20 px-6 bg-gradient-to-br from-teal-100/50 to-cyan-100/50">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-white/90 backdrop-blur border-teal-200 shadow-xl">
            <CardContent className="p-12 text-center">
              <Brain className="h-16 w-16 text-teal-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent mb-4">
                Comece Sua Análise Científica Agora
              </h2>
              <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                Tecnologia médica avançada para decisões informadas sobre sua saúde reprodutiva
              </p>
              
              <Button
                size="lg"
                onClick={() => setLocation("/app")}
                className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold text-lg px-10 py-6 shadow-lg"
              >
                Acessar Plataforma Gratuita
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              
              <div className="flex items-center justify-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-emerald-600" />
                  <span className="text-slate-700 text-sm font-medium">Dados Criptografados</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-teal-600" />
                  <span className="text-slate-700 text-sm font-medium">Análise Instantânea</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-cyan-600" />
                  <span className="text-slate-700 text-sm font-medium">Banco Seguro</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer Profissional */}
      <footer className="bg-white border-t border-slate-200 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full blur-lg opacity-30"></div>
                <img 
                  src="/idalia-logo.png" 
                  alt="Idalia Calc" 
                  className="relative h-12 w-12 drop-shadow-md"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Idalia Calc
                </h3>
                <p className="text-slate-600 text-sm">Tecnologia em Saúde Reprodutiva</p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-slate-700 font-medium">© 2025 Idalia Calc</p>
              <p className="text-slate-600 text-sm mt-1">
                Plataforma Científica de Análise Reprodutiva
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}