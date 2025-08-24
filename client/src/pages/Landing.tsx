import { ArrowRight, CheckCircle, Lock, Shield, Brain, Activity, Clock, Target, BarChart, Zap, Database, LineChart, Calendar, Thermometer, FileText, Baby, CalendarDays, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import Header from "@/components/ui/Header";

export default function Landing() {
  const [, setLocation] = useLocation();

  const plans = [
    {
      id: "free",
      name: "Gratuito",
      price: "R$ 0",
      period: "",
      description: "Experimente",
      credits: "1 cálculo completo",
      features: [
        "1 cálculo completo grátis",
        "Calculadora de fertilidade",
        "Calculadora gestacional",
        "Resultados instantâneos"
      ],
      cta: "Começar Grátis",
      popular: false
    },
    {
      id: "professional",
      name: "Assinatura",
      price: "R$ 29,90",
      period: "/mês",
      description: "Acesso Total",
      credits: "Ilimitado",
      features: [
        "Cálculos ilimitados",
        "Histórico completo",
        "Dashboard pessoal",
        "Temperatura basal",
        "Muco cervical",
        "Notificações",
        "Exportar dados",
        "Suporte prioritário"
      ],
      cta: "Assinar Agora",
      popular: true
    }
  ];

  return (
    <div className="min-h-screen tech-bg">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Header />
        
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          
          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel tech-border mb-6">
              <Zap className="h-4 w-4 text-cyan-400" />
              <span className="text-cyan-300 font-medium text-sm tech-text-glow">
                Calculadoras Médicas Precisas
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 tech-text-glow">
                Calculadoras de
              </span>
              <span className="block text-4xl md:text-5xl text-cyan-200 mt-2">
                Fertilidade e Gestação
              </span>
            </h1>
            
            <p className="text-xl text-blue-200 mb-10 max-w-3xl mx-auto leading-relaxed">
              Calculadoras baseadas no método de Ogino-Knaus e cálculos obstétricos padrão para acompanhamento reprodutivo
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Button
                size="lg"
                onClick={() => setLocation("/app")}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold text-lg px-8 py-6 shadow-xl tech-border"
              >
                Acessar Calculadoras
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-cyan-500 text-cyan-300 hover:bg-cyan-900/30 font-semibold text-lg px-8 py-6 glass-panel"
                onClick={() => window.location.href = "/api/login"}
              >
                Criar Conta
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-full tech-border">
                <Shield className="h-4 w-4 text-cyan-400" />
                <span className="text-cyan-300 font-medium text-sm">100% Seguro</span>
              </div>
              <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-full tech-border">
                <Database className="h-4 w-4 text-blue-400" />
                <span className="text-blue-300 font-medium text-sm">Dados Salvos</span>
              </div>
              <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-full tech-border">
                <Brain className="h-4 w-4 text-teal-400" />
                <span className="text-teal-300 font-medium text-sm">Cálculos Precisos</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 tech-text-glow mb-4">
              Recursos Avançados
            </h2>
            <p className="text-lg text-blue-200">
              Ferramentas completas para acompanhamento reprodutivo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Fertilidade Card */}
            <Card className="glass-card tech-border hover:scale-105 transition-transform">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                  <CalendarDays className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl text-cyan-200">Calculadora de Fertilidade</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-300 mb-4">
                  Análise completa do ciclo menstrual com previsões precisas
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-200 text-sm">Janela fértil de 6 dias</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-200 text-sm">Previsão de ovulação</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-200 text-sm">Análise de muco cervical</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-200 text-sm">Temperatura basal</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Gestação Card */}
            <Card className="glass-card tech-border hover:scale-105 transition-transform">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                  <Baby className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl text-cyan-200">Calculadora Gestacional</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-300 mb-4">
                  Acompanhamento completo da gestação semana a semana
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-200 text-sm">Cálculo por DUM</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-200 text-sm">Por ultrassom</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-200 text-sm">Desenvolvimento fetal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-200 text-sm">Exames e vacinas</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Dashboard Card */}
            <Card className="glass-card tech-border hover:scale-105 transition-transform">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                  <BarChart className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl text-cyan-200">Dashboard Pessoal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-300 mb-4">
                  Central de controle com todos seus dados organizados
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-200 text-sm">Status do ciclo atual</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-200 text-sm">Gráficos interativos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-200 text-sm">Histórico completo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-200 text-sm">Notificações inteligentes</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Extra Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card className="glass-card tech-border">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                    <Thermometer className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg text-cyan-200">Temperatura Basal</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-blue-300 text-sm">
                  Registro diário com gráficos detalhados e análise de padrões para identificação precisa da ovulação
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card tech-border">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center shadow-lg">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg text-cyan-200">Histórico Completo</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-blue-300 text-sm">
                  Todos seus cálculos salvos e organizados cronologicamente com acesso rápido aos resultados anteriores
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 tech-text-glow mb-4">
              Como Funciona
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-xl tech-border">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-cyan-200 mb-3">Crie sua Conta</h3>
              <p className="text-blue-300">
                Cadastre-se gratuitamente e tenha seu primeiro cálculo completo grátis
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-xl tech-border">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-cyan-200 mb-3">Insira seus Dados</h3>
              <p className="text-blue-300">
                Adicione informações do ciclo menstrual ou dados gestacionais
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-xl tech-border">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-cyan-200 mb-3">Receba Análises</h3>
              <p className="text-blue-300">
                Obtenha resultados precisos com gráficos e recomendações médicas
              </p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 tech-text-glow mb-4">
              Planos de Acesso
            </h2>
            <p className="text-lg text-blue-200">
              Escolha o plano ideal para suas necessidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`glass-card tech-border relative ${
                  plan.popular ? 'scale-105 shadow-2xl' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-1 rounded-full text-sm font-semibold tech-border">
                      RECOMENDADO
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl text-cyan-200 mb-2">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                      {plan.price}
                    </span>
                    <span className="text-blue-300">{plan.period}</span>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-2 glass-panel px-3 py-1 rounded-full tech-border">
                    <Target className="h-4 w-4 text-cyan-400" />
                    <span className="text-cyan-300 font-medium text-sm">{plan.credits}</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span className="text-blue-200 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full font-medium py-6 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg' 
                        : 'glass-panel tech-border text-cyan-300 hover:bg-cyan-900/30'
                    }`}
                    onClick={() => {
                      if (plan.id === 'free') {
                        setLocation("/app");
                      } else {
                        setLocation("/checkout");
                      }
                    }}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-blue-300 flex items-center justify-center gap-2">
              <Lock className="h-4 w-4" />
              Pagamento seguro via Stripe • Cancele quando quiser
            </p>
          </div>
        </section>

        {/* Technology */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 tech-text-glow mb-4">
              Tecnologia Avançada
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card tech-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 glass-panel rounded-lg flex items-center justify-center tech-border">
                    <Shield className="h-5 w-5 text-cyan-400" />
                  </div>
                  <h3 className="font-semibold text-cyan-200">PostgreSQL</h3>
                </div>
                <p className="text-blue-300 text-sm">
                  Banco de dados profissional com backup automático e segurança de nível empresarial
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card tech-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 glass-panel rounded-lg flex items-center justify-center tech-border">
                    <Brain className="h-5 w-5 text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-cyan-200">Algoritmos Médicos</h3>
                </div>
                <p className="text-blue-300 text-sm">
                  Cálculos baseados em métodos obstétricos estabelecidos e validados
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card tech-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 glass-panel rounded-lg flex items-center justify-center tech-border">
                    <Activity className="h-5 w-5 text-teal-400" />
                  </div>
                  <h3 className="font-semibold text-cyan-200">APIs REST</h3>
                </div>
                <p className="text-blue-300 text-sm">
                  Sistema completo com autenticação segura e criptografia de ponta a ponta
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16">
          <Card className="glass-card tech-border overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500"></div>
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 tech-text-glow mb-4">
                Comece Agora Mesmo
              </h2>
              <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
                Comece a utilizar nossas calculadoras para acompanhar sua saúde reprodutiva de forma precisa
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => setLocation("/app")}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold text-lg px-8 py-6 shadow-xl tech-border"
                >
                  Acessar Plataforma
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-cyan-500 text-cyan-300 hover:bg-cyan-900/30 font-semibold text-lg px-8 py-6 glass-panel"
                  onClick={() => window.location.href = "/api/login"}
                >
                  Criar Conta Grátis
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-sm text-blue-200 glass-panel rounded-lg tech-border mt-8">
          <p className="mb-2">
            © 2025 Idalia Calc - Plataforma de Saúde Reprodutiva
          </p>
          <p className="mb-3">
            Calculadoras baseadas em métodos científicos estabelecidos na literatura médica
          </p>
          <div className="flex justify-center items-center gap-4 text-cyan-300">
            <button onClick={() => setLocation("/algoritmos")} className="hover:text-cyan-200 transition-colors">
              Algoritmos
            </button>
            <span>•</span>
            <button onClick={() => setLocation("/app")} className="hover:text-cyan-200 transition-colors">
              Calculadoras
            </button>
            <span>•</span>
            <button onClick={() => setLocation("/dashboard")} className="hover:text-cyan-200 transition-colors">
              Dashboard
            </button>
          </div>
          <div className="text-xs text-blue-300/70 flex justify-center items-center gap-1 mt-4">
            <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 pulse-animation"></span>
            <span>Sistema Online</span>
          </div>
        </footer>
      </div>
    </div>
  );
}