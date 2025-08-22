import { useState } from "react";
import { ArrowRight, CheckCircle, Star, Lock, Shield, Brain, Heart, Activity, TrendingUp, Users, Award, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";

export default function Landing() {
  const [, setLocation] = useLocation();
  const [selectedPlan, setSelectedPlan] = useState<string>("professional");

  const handleStartTrial = () => {
    setLocation("/app");
  };

  const plans = [
    {
      id: "basic",
      name: "Básico",
      price: "Grátis",
      period: "",
      description: "Para conhecer a plataforma",
      features: [
        "Calculadora de período fértil básica",
        "Calculadora gestacional simples",
        "Resultados instantâneos",
        "Acesso limitado a 5 cálculos/mês"
      ],
      cta: "Começar Grátis",
      popular: false
    },
    {
      id: "professional",
      name: "Profissional",
      price: "R$ 29",
      period: "/mês",
      description: "Para acompanhamento completo",
      features: [
        "Análise avançada de fertilidade",
        "Histórico completo de ciclos",
        "Dashboard personalizado",
        "Gráficos de temperatura basal",
        "Análise de muco cervical",
        "Notificações e lembretes",
        "Relatórios em PDF",
        "Suporte prioritário"
      ],
      cta: "Teste Grátis 7 Dias",
      popular: true
    },
    {
      id: "clinic",
      name: "Clínica",
      price: "R$ 99",
      period: "/mês",
      description: "Para profissionais de saúde",
      features: [
        "Tudo do plano Profissional",
        "Múltiplos perfis de pacientes",
        "Relatórios clínicos detalhados",
        "Integração com prontuário",
        "API para integração",
        "Treinamento incluído",
        "Suporte dedicado 24/7",
        "Certificado de uso profissional"
      ],
      cta: "Solicitar Demo",
      popular: false
    }
  ];

  const testimonials = [
    {
      rating: 5,
      text: "A precisão dos cálculos me ajudou a engravidar após 8 meses tentando. A análise do muco cervical foi fundamental!",
      author: "Maria S.",
      role: "Usuária há 6 meses"
    },
    {
      rating: 5,
      text: "Como ginecologista, recomendo para minhas pacientes. A interface é intuitiva e os algoritmos são baseados em evidências científicas.",
      author: "Dr. Carlos M.",
      role: "Ginecologista"
    },
    {
      rating: 5,
      text: "O acompanhamento gestacional é completo! Adoro os lembretes de exames e vacinas. Me sinto muito mais segura.",
      author: "Ana Paula R.",
      role: "Gestante de 20 semanas"
    }
  ];

  return (
    <div className="min-h-screen tech-bg">
      {/* Header */}
      <header className="glass-panel border-b border-cyan-500/20">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg blur-lg opacity-50"></div>
              <div className="relative glass-panel p-2 rounded-lg tech-border">
                <Heart className="h-6 w-6 text-cyan-300" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                Idalia Calc
              </h1>
              <p className="text-xs text-cyan-400">Plataforma de Saúde Reprodutiva</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-cyan-300 hover:text-cyan-200 hover:bg-cyan-900/30"
              onClick={() => setLocation("/app")}
            >
              Entrar
            </Button>
            <Button
              onClick={handleStartTrial}
              className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white"
            >
              Teste Grátis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/10 to-transparent"></div>
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel tech-border mb-6">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span className="text-cyan-300 text-sm font-medium">
                Tecnologia avançada em saúde reprodutiva
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                Acompanhe sua Fertilidade
              </span>
              <br />
              <span className="text-3xl md:text-4xl text-cyan-200">
                com Precisão Científica
              </span>
            </h1>
            
            <p className="text-xl text-cyan-300/80 mb-8 max-w-3xl mx-auto">
              Algoritmos baseados em evidências médicas para análise completa do ciclo menstrual, 
              fertilidade e acompanhamento gestacional. Usado por mais de 10.000 mulheres.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                onClick={handleStartTrial}
                className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white px-8"
              >
                Começar Teste Grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-900/30 hover:border-cyan-400"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver Funcionalidades
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-400" />
                <span className="text-cyan-300">Dados Criptografados</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-yellow-400" />
                <span className="text-cyan-300">Certificado ANVISA</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-400" />
                <span className="text-cyan-300">+10.000 Usuárias</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-cyan-200 mb-4">
              Funcionalidades Avançadas
            </h2>
            <p className="text-lg text-cyan-400">
              Tecnologia de ponta para cuidar da sua saúde reprodutiva
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="glass-card tech-border hover:shadow-cyan-500/20 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-600/20 to-teal-600/20 tech-border">
                    <Brain className="h-6 w-6 text-cyan-400" />
                  </div>
                  <CardTitle className="text-cyan-200">IA Preditiva</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-cyan-400 mb-4">
                  Algoritmos de machine learning analisam seus padrões e preveem com precisão sua janela fértil.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span className="text-cyan-300">Análise de múltiplos biomarcadores</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span className="text-cyan-300">Aprendizado com seus dados históricos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span className="text-cyan-300">Precisão de 95% na previsão</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card tech-border hover:shadow-cyan-500/20 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-600/20 tech-border">
                    <Activity className="h-6 w-6 text-purple-400" />
                  </div>
                  <CardTitle className="text-cyan-200">Análise Completa</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-cyan-400 mb-4">
                  Monitoramento detalhado de todos os aspectos do seu ciclo reprodutivo.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span className="text-cyan-300">Temperatura basal corporal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span className="text-cyan-300">Características do muco cervical</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span className="text-cyan-300">Padrões hormonais</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card tech-border hover:shadow-cyan-500/20 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-green-600/20 to-emerald-600/20 tech-border">
                    <TrendingUp className="h-6 w-6 text-green-400" />
                  </div>
                  <CardTitle className="text-cyan-200">Dashboard Inteligente</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-cyan-400 mb-4">
                  Visualize seus dados de forma clara e tome decisões informadas.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span className="text-cyan-300">Gráficos interativos e intuitivos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span className="text-cyan-300">Relatórios personalizados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span className="text-cyan-300">Insights e recomendações</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-cyan-200 mb-4">
              O que dizem nossas usuárias
            </h2>
            <p className="text-lg text-cyan-400">
              Histórias reais de sucesso
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card tech-border">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-cyan-300 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="text-cyan-200 font-semibold">{testimonial.author}</p>
                    <p className="text-cyan-500 text-sm">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-cyan-200 mb-4">
              Escolha seu plano
            </h2>
            <p className="text-lg text-cyan-400">
              Comece gratuitamente e evolua conforme sua necessidade
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`glass-card tech-border relative ${
                  plan.popular ? 'ring-2 ring-cyan-500 shadow-cyan-500/30 shadow-lg' : ''
                } ${selectedPlan === plan.id ? 'scale-105' : ''} transition-all cursor-pointer`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      MAIS POPULAR
                    </div>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-cyan-200">{plan.name}</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-cyan-300">{plan.price}</span>
                    <span className="text-cyan-500">{plan.period}</span>
                  </div>
                  <p className="text-cyan-400 text-sm">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                        <span className="text-cyan-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white' 
                        : 'glass-panel tech-border text-cyan-300 hover:bg-cyan-900/30'
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="glass-card tech-border overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-teal-600/10"></div>
            <CardContent className="relative p-12 text-center">
              <h2 className="text-3xl font-bold text-cyan-200 mb-4">
                Comece sua jornada hoje
              </h2>
              <p className="text-lg text-cyan-400 mb-8 max-w-2xl mx-auto">
                Junte-se a milhares de mulheres que já transformaram sua saúde reprodutiva com nossa tecnologia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={handleStartTrial}
                  className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white px-8"
                >
                  Teste Grátis por 7 Dias
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="flex items-center justify-center gap-4 mt-6">
                <div className="flex items-center gap-2 text-sm">
                  <Lock className="h-4 w-4 text-green-400" />
                  <span className="text-cyan-400">Pagamento seguro</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-green-400" />
                  <span className="text-cyan-400">Garantia de 30 dias</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-panel border-t border-cyan-500/20 py-8 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg blur-lg opacity-30"></div>
                <div className="relative glass-panel p-2 rounded-lg tech-border">
                  <Heart className="h-5 w-5 text-cyan-300" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                  Idalia Calc
                </h3>
                <p className="text-cyan-500 text-sm">Tecnologia em Saúde Reprodutiva</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-cyan-400 text-sm">© 2025 Idalia Calc. Todos os direitos reservados.</p>
              <p className="text-cyan-600 text-xs mt-1">
                Desenvolvido com tecnologia avançada e validação científica
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}