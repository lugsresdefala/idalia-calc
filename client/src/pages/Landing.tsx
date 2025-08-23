import { useState } from "react";
import { ArrowRight, CheckCircle, Lock, Shield, Brain, Activity, Clock, Target, BarChart, Zap, Database, LineChart, Calendar, Thermometer, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      description: "Experimente a plataforma",
      credits: "5 cálculos/mês",
      features: [
        "5 cálculos mensais",
        "Calculadora de fertilidade",
        "Calculadora gestacional",
        "Acesso básico ao sistema",
        "Resultados instantâneos"
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
      description: "Acompanhamento completo",
      credits: "100 cálculos/mês",
      features: [
        "100 cálculos mensais",
        "Histórico de cálculos salvos",
        "Dashboard personalizado",
        "Registro de ciclos menstruais",
        "Temperatura basal",
        "Análise de muco cervical",
        "Sistema de notificações",
        "Exportação de dados",
        "Suporte por email"
      ],
      cta: "Assinar Agora",
      popular: true,
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      id: "premium",
      name: "Premium",
      price: "R$ 39",
      period: "/mês",
      description: "Acesso ilimitado",
      credits: "Ilimitado",
      features: [
        "Cálculos ilimitados",
        "Todos os recursos do Essencial",
        "Análises avançadas",
        "Histórico completo sem limites",
        "Prioridade no suporte",
        "Novos recursos primeiro",
        "Backup automático de dados"
      ],
      cta: "Assinar Premium",
      popular: false,
      gradient: "from-cyan-500 to-blue-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-cyan-50/20">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-teal-200/30 shadow-sm">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
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
                Plataforma de Saúde Reprodutiva
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-teal-700 hover:text-teal-800 hover:bg-teal-100/50 font-medium"
              onClick={() => setLocation("/app")}
            >
              Entrar
            </Button>
            <Button
              onClick={() => window.location.href = "/api/login"}
              className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-medium shadow-md"
            >
              Criar Conta
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-teal-100 to-cyan-100 border border-teal-300/50 mb-8">
              <Zap className="h-4 w-4 text-teal-600" />
              <span className="text-slate-700 font-medium text-sm">
                Calculadoras Médicas Precisas
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent">
                Calculadoras de Fertilidade
              </span>
              <span className="block text-4xl md:text-5xl text-slate-800 mt-2">
                e Gestação Avançadas
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Ferramentas precisas para calcular período fértil, idade gestacional e acompanhar 
              sua jornada reprodutiva com base em protocolos médicos
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Button
                size="lg"
                onClick={() => setLocation("/app")}
                className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold text-lg px-8 py-6 shadow-lg"
              >
                Usar Calculadoras
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-teal-400 text-teal-700 hover:bg-teal-50 font-semibold text-lg px-8 py-6"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver Recursos
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full">
                <Shield className="h-4 w-4 text-emerald-600" />
                <span className="text-slate-700 font-medium text-sm">Dados Seguros</span>
              </div>
              <div className="flex items-center gap-2 bg-cyan-100 px-4 py-2 rounded-full">
                <Database className="h-4 w-4 text-cyan-600" />
                <span className="text-slate-700 font-medium text-sm">Histórico Salvo</span>
              </div>
              <div className="flex items-center gap-2 bg-teal-100 px-4 py-2 rounded-full">
                <Brain className="h-4 w-4 text-teal-600" />
                <span className="text-slate-700 font-medium text-sm">Cálculos Precisos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Recursos Reais */}
      <section id="features" className="py-20 px-6 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent mb-4">
              Ferramentas Disponíveis
            </h2>
            <p className="text-lg text-slate-600">
              Recursos implementados e funcionais na plataforma
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Calculadora de Fertilidade */}
            <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 hover:shadow-xl transition-all hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <Calendar className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl text-slate-800">Calculadora de Fertilidade</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Calcule seu período fértil e janela de ovulação
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">Cálculo baseado no ciclo menstrual</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">Previsão da janela fértil</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">Informações sobre cada fase</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">Histórico de ciclos salvos</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Calculadora Gestacional */}
            <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200 hover:shadow-xl transition-all hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <Activity className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl text-slate-800">Calculadora Gestacional</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Acompanhe sua gestação semana a semana
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-teal-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">Cálculo por DUM</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-teal-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">Cálculo por ultrassom</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-teal-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">Informações do desenvolvimento</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-teal-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">Recomendações de exames</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Dashboard de Dados */}
            <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200 hover:shadow-xl transition-all hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <BarChart className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl text-slate-800">Dashboard Pessoal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Acompanhe seus dados de saúde
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">Status do ciclo atual</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">Registro de temperatura basal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">Observações de muco cervical</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">Notificações e lembretes</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Recursos Adicionais */}
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <Card className="bg-gradient-to-br from-slate-50 to-teal-50 border-slate-200">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <Thermometer className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl text-slate-800">Registro de Temperatura Basal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Sistema completo para registro e análise de temperatura corporal basal
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">Entrada diária de temperatura</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">Gráfico de evolução</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">Detecção de padrões</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-teal-50 to-slate-50 border-teal-200">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-slate-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <FileText className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl text-slate-800">Histórico de Cálculos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Todos os seus cálculos salvos e organizados
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-teal-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">Histórico completo de fertilidade</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-teal-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">Registros gestacionais</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-teal-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">Exportação de dados</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-teal-50/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent mb-4">
              Como Funciona
            </h2>
            <p className="text-lg text-slate-600">
              Simples e rápido de usar
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Crie sua Conta</h3>
              <p className="text-slate-600">
                Cadastre-se gratuitamente e acesse as ferramentas
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Insira seus Dados</h3>
              <p className="text-slate-600">
                Adicione informações do seu ciclo ou gestação
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Obtenha Resultados</h3>
              <p className="text-slate-600">
                Visualize cálculos precisos e acompanhe sua evolução
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent mb-4">
              Planos e Preços
            </h2>
            <p className="text-lg text-slate-600">
              Escolha o plano ideal para suas necessidades
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
                      Mais Popular
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
                      if (plan.id === 'free') {
                        setLocation("/app");
                      } else {
                        window.location.href = "/api/login";
                      }
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
              Pagamento seguro via Stripe • Cancele quando quiser
            </p>
          </div>
        </div>
      </section>

      {/* Dados da Plataforma */}
      <section className="py-20 px-6 bg-gradient-to-br from-teal-50/30 to-cyan-50/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent mb-4">
              Sobre a Plataforma
            </h2>
            <p className="text-lg text-slate-600">
              Informações técnicas e recursos implementados
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-slate-800">Banco de Dados PostgreSQL</h3>
                </div>
                <p className="text-slate-600">
                  Armazenamento seguro com backup automático de todos os dados de ciclos, temperaturas e cálculos
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                    <Brain className="h-5 w-5 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-slate-800">Algoritmos Médicos</h3>
                </div>
                <p className="text-slate-600">
                  Cálculos baseados em protocolos da Febrasgo e ACOG para precisão médica
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <Activity className="h-5 w-5 text-cyan-600" />
                  </div>
                  <h3 className="font-semibold text-slate-800">APIs REST Completas</h3>
                </div>
                <p className="text-slate-600">
                  Sistema completo de APIs para todas as funcionalidades com autenticação segura
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6 bg-gradient-to-br from-teal-100/50 to-cyan-100/50">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-white/90 backdrop-blur border-teal-200 shadow-xl">
            <CardContent className="p-12 text-center">
              <Brain className="h-16 w-16 text-teal-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent mb-4">
                Comece a Usar Agora
              </h2>
              <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                Acesse gratuitamente as calculadoras de fertilidade e gestação. 
                Crie sua conta para salvar seu histórico e acompanhar sua evolução.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => setLocation("/app")}
                  className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold text-lg px-10 py-6 shadow-lg"
                >
                  Usar Calculadoras Grátis
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.location.href = "/api/login"}
                  className="border-2 border-teal-400 text-teal-700 hover:bg-teal-50 font-semibold text-lg px-10 py-6"
                >
                  Criar Conta Completa
                </Button>
              </div>
              
              <div className="flex items-center justify-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-emerald-600" />
                  <span className="text-slate-700 text-sm font-medium">100% Seguro</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-teal-600" />
                  <span className="text-slate-700 text-sm font-medium">Acesso Imediato</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-cyan-600" />
                  <span className="text-slate-700 text-sm font-medium">Dados Salvos</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
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
                <p className="text-slate-600 text-sm">Plataforma de Saúde Reprodutiva</p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-slate-700 font-medium">© 2025 Idalia Calc</p>
              <p className="text-slate-600 text-sm mt-1">
                Calculadoras Médicas de Fertilidade e Gestação
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}