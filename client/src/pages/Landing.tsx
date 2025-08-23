import { useState } from "react";
import { ArrowRight, CheckCircle, Lock, Shield, Brain, Activity, Clock, Target, BarChart, Zap, Database, LineChart, Calendar, Thermometer, FileText, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";

export default function Landing() {
  const [, setLocation] = useLocation();
  const [selectedPlan, setSelectedPlan] = useState<string>("professional");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const plans = [
    {
      id: "free",
      name: "Gratuito",
      price: "R$ 0",
      period: "",
      description: "Experimente",
      credits: "5 usos/mês",
      features: [
        "5 cálculos mensais",
        "Calculadora de fertilidade",
        "Calculadora gestacional",
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
      description: "Completo",
      credits: "100 usos/mês",
      features: [
        "100 cálculos mensais",
        "Histórico completo",
        "Dashboard pessoal",
        "Temperatura basal",
        "Notificações",
        "Exportar dados",
        "Suporte email"
      ],
      cta: "Assinar",
      popular: true,
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      id: "premium",
      name: "Premium",
      price: "R$ 39",
      period: "/mês",
      description: "Ilimitado",
      credits: "Ilimitado",
      features: [
        "Uso ilimitado",
        "Tudo do Essencial",
        "Análises avançadas",
        "Suporte prioritário",
        "Backup automático"
      ],
      cta: "Premium",
      popular: false,
      gradient: "from-cyan-500 to-blue-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-cyan-50/20">
      {/* Mobile-First Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-teal-200/30 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full blur-md opacity-40"></div>
                <img 
                  src="/idalia-logo.png" 
                  alt="Idalia Calc" 
                  className="relative h-10 w-10 drop-shadow-md"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Idalia Calc
                </h1>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6 text-teal-600" /> : <Menu className="h-6 w-6 text-teal-600" />}
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                className="text-teal-700 hover:text-teal-800"
                onClick={() => setLocation("/app")}
              >
                Entrar
              </Button>
              <Button
                onClick={() => window.location.href = "/api/login"}
                className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white"
              >
                Criar Conta
              </Button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-teal-100">
              <div className="flex flex-col gap-3">
                <Button
                  variant="outline"
                  className="w-full border-teal-300 text-teal-700"
                  onClick={() => {
                    setLocation("/app");
                    setMobileMenuOpen(false);
                  }}
                >
                  Entrar na Plataforma
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white"
                  onClick={() => {
                    window.location.href = "/api/login";
                    setMobileMenuOpen(false);
                  }}
                >
                  Criar Conta Grátis
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile-Optimized Hero */}
      <section className="relative py-12 px-4 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-cyan-200/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center">
            {/* Mobile Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-100 to-cyan-100 border border-teal-300/50 mb-6">
              <Zap className="h-3 w-3 text-teal-600" />
              <span className="text-slate-700 font-medium text-xs">
                Calculadoras Médicas
              </span>
            </div>
            
            {/* Mobile Title */}
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              <span className="block bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent">
                Fertilidade e
              </span>
              <span className="block text-2xl md:text-4xl text-slate-800 mt-1">
                Gestação
              </span>
            </h1>
            
            <p className="text-base md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed px-2">
              Calculadoras precisas para acompanhar sua saúde reprodutiva
            </p>

            {/* Mobile CTAs */}
            <div className="flex flex-col gap-3 px-4 mb-8">
              <Button
                size="lg"
                onClick={() => setLocation("/app")}
                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold text-base py-6 shadow-lg"
              >
                Usar Calculadoras
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full border-2 border-teal-400 text-teal-700 hover:bg-teal-50 font-semibold text-base py-6"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver Recursos
              </Button>
            </div>

            {/* Mobile Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-1 bg-emerald-100 px-3 py-1.5 rounded-full">
                <Shield className="h-3 w-3 text-emerald-600" />
                <span className="text-slate-700 font-medium text-xs">Seguro</span>
              </div>
              <div className="flex items-center gap-1 bg-cyan-100 px-3 py-1.5 rounded-full">
                <Database className="h-3 w-3 text-cyan-600" />
                <span className="text-slate-700 font-medium text-xs">Salvo</span>
              </div>
              <div className="flex items-center gap-1 bg-teal-100 px-3 py-1.5 rounded-full">
                <Brain className="h-3 w-3 text-teal-600" />
                <span className="text-slate-700 font-medium text-xs">Preciso</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Features */}
      <section id="features" className="py-12 px-4 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent mb-3">
              Ferramentas
            </h2>
            <p className="text-sm md:text-lg text-slate-600">
              Recursos disponíveis na plataforma
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Fertilidade Card */}
            <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
              <CardHeader className="pb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mb-3 shadow-md">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg text-slate-800">Fertilidade</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm mb-3">
                  Calcule período fértil e ovulação
                </p>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-xs">Janela fértil precisa</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-xs">Histórico de ciclos</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-xs">Análise de padrões</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Gestação Card */}
            <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
              <CardHeader className="pb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center mb-3 shadow-md">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg text-slate-800">Gestação</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm mb-3">
                  Acompanhe semana a semana
                </p>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-teal-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-xs">Cálculo por DUM</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-teal-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-xs">Por ultrassom</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-teal-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-xs">Desenvolvimento fetal</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Dashboard Card */}
            <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
              <CardHeader className="pb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-3 shadow-md">
                  <BarChart className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg text-slate-800">Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm mb-3">
                  Acompanhe seus dados
                </p>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-xs">Status do ciclo</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-xs">Temperatura basal</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-xs">Notificações</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Mobile Extra Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card className="bg-gradient-to-br from-slate-50 to-teal-50 border-slate-200">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-slate-500 to-teal-600 rounded-lg flex items-center justify-center shadow-md">
                    <Thermometer className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-base text-slate-800">Temperatura Basal</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-xs mb-2">
                  Registro e análise diária com gráficos
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-teal-50 to-slate-50 border-teal-200">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-slate-600 rounded-lg flex items-center justify-center shadow-md">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-base text-slate-800">Histórico Completo</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-xs mb-2">
                  Todos seus cálculos salvos e organizados
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mobile How It Works */}
      <section className="py-12 px-4 bg-gradient-to-br from-slate-50 to-teal-50/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent mb-3">
              Como Funciona
            </h2>
          </div>

          <div className="space-y-6 md:grid md:grid-cols-3 md:gap-8 md:space-y-0">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Crie sua Conta</h3>
              <p className="text-slate-600 text-sm px-4">
                Cadastre-se gratuitamente
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Insira Dados</h3>
              <p className="text-slate-600 text-sm px-4">
                Adicione informações do ciclo
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Veja Resultados</h3>
              <p className="text-slate-600 text-sm px-4">
                Cálculos precisos e gráficos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Pricing */}
      <section className="py-12 px-4 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent mb-3">
              Planos
            </h2>
          </div>

          {/* Mobile Plan Cards - Swipeable on mobile */}
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`min-w-[280px] flex-shrink-0 snap-center bg-white border-2 ${
                  plan.popular 
                    ? 'border-teal-400 shadow-xl scale-105' 
                    : 'border-slate-200'
                }`}
              >
                {plan.popular && (
                  <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-3 py-1 text-xs font-semibold text-center">
                    MAIS POPULAR
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl text-slate-800">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center gap-1 mt-2">
                    <span className="text-3xl font-bold text-slate-700">
                      {plan.price}
                    </span>
                    <span className="text-slate-600 text-sm">{plan.period}</span>
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-full">
                    <Target className="h-3 w-3 text-teal-600" />
                    <span className="text-slate-700 font-medium text-xs">{plan.credits}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="pb-4">
                  <ul className="space-y-2 mb-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600 text-xs">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full font-medium text-sm py-5 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-md' 
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                    onClick={() => {
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

          <div className="text-center mt-6">
            <p className="text-slate-600 text-xs flex items-center justify-center gap-1">
              <Lock className="h-3 w-3" />
              Pagamento seguro • Cancele quando quiser
            </p>
          </div>
        </div>
      </section>

      {/* Mobile Platform Info */}
      <section className="py-12 px-4 bg-gradient-to-br from-teal-50/30 to-cyan-50/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent mb-3">
              Tecnologia
            </h2>
          </div>

          <div className="space-y-4 md:grid md:grid-cols-3 md:gap-6 md:space-y-0">
            <Card className="bg-white border-slate-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Shield className="h-4 w-4 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-slate-800 text-sm">PostgreSQL</h3>
                </div>
                <p className="text-slate-600 text-xs">
                  Banco de dados seguro com backup automático
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                    <Brain className="h-4 w-4 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-slate-800 text-sm">Algoritmos Médicos</h3>
                </div>
                <p className="text-slate-600 text-xs">
                  Baseados em protocolos Febrasgo e ACOG
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <Activity className="h-4 w-4 text-cyan-600" />
                  </div>
                  <h3 className="font-semibold text-slate-800 text-sm">APIs REST</h3>
                </div>
                <p className="text-slate-600 text-xs">
                  Sistema completo com autenticação segura
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mobile CTA */}
      <section className="py-12 px-4 bg-gradient-to-br from-teal-100/50 to-cyan-100/50">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-white/90 backdrop-blur border-teal-200 shadow-xl">
            <CardContent className="p-8 text-center">
              <Brain className="h-12 w-12 text-teal-600 mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent mb-3">
                Comece Agora
              </h2>
              <p className="text-sm md:text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
                Acesse gratuitamente as calculadoras. Crie sua conta para salvar histórico.
              </p>
              
              <div className="flex flex-col gap-3">
                <Button
                  size="lg"
                  onClick={() => setLocation("/app")}
                  className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold py-6 shadow-lg"
                >
                  Usar Grátis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.location.href = "/api/login"}
                  className="w-full border-2 border-teal-400 text-teal-700 hover:bg-teal-50 font-semibold py-6"
                >
                  Criar Conta
                </Button>
              </div>
              
              <div className="flex items-center justify-center gap-4 mt-6">
                <div className="flex items-center gap-1">
                  <Shield className="h-3 w-3 text-emerald-600" />
                  <span className="text-slate-700 text-xs font-medium">Seguro</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-teal-600" />
                  <span className="text-slate-700 text-xs font-medium">Rápido</span>
                </div>
                <div className="flex items-center gap-1">
                  <Database className="h-3 w-3 text-cyan-600" />
                  <span className="text-slate-700 text-xs font-medium">Salvo</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mobile Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/idalia-logo.png" 
                alt="Idalia Calc" 
                className="h-10 w-10 drop-shadow-md"
              />
              <div>
                <h3 className="text-lg font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Idalia Calc
                </h3>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-slate-700 text-sm font-medium">© 2025 Idalia Calc</p>
              <p className="text-slate-600 text-xs mt-1">
                Calculadoras de Saúde Reprodutiva
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}