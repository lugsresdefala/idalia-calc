import { useState } from "react";
import { ArrowRight, CheckCircle, Star, Lock, Shield, Brain, Heart, Activity, TrendingUp, Users, Award, Zap, ChevronRight, Clock, Target, BarChart } from "lucide-react";
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
      popular: false,
      gradient: "from-slate-600 to-slate-700"
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
      popular: true,
      gradient: "from-cyan-600 to-teal-600"
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
      popular: false,
      gradient: "from-purple-600 to-indigo-600"
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

  const metrics = [
    { number: "10.000+", label: "Usuárias Ativas" },
    { number: "95%", label: "Taxa de Precisão" },
    { number: "4.9/5", label: "Avaliação Média" },
    { number: "24/7", label: "Suporte Disponível" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header Fixo com Contraste Alto */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/90 border-b border-cyan-500/30 shadow-2xl">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo Oficial com Efeito Glow */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
              <img 
                src="/idalia-logo.png" 
                alt="Idalia Calc" 
                className="relative h-14 w-14 drop-shadow-2xl group-hover:scale-110 transition-transform"
              />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                Idalia Calc
              </h1>
              <p className="text-xs text-cyan-400 font-medium tracking-wider uppercase">
                Plataforma de Saúde Reprodutiva
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-cyan-300 hover:text-white hover:bg-cyan-600/20 font-semibold px-6"
              onClick={() => setLocation("/app")}
            >
              Acessar App
            </Button>
            <Button
              onClick={handleStartTrial}
              className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white font-bold px-6 py-2 shadow-lg shadow-cyan-500/30"
            >
              Teste Grátis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section com Gradiente Vibrante */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Background animado */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500 rounded-full blur-[120px] opacity-20 animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center">
            {/* Badge Premium */}
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 mb-8">
              <Zap className="h-5 w-5 text-yellow-400" />
              <span className="text-yellow-300 font-bold text-sm">
                TECNOLOGIA MÉDICA AVANÇADA • 95% DE PRECISÃO
              </span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
                Controle Total da Sua
              </span>
              <span className="block text-5xl md:text-6xl bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mt-2">
                Saúde Reprodutiva
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-cyan-100 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Algoritmos científicos validados por <span className="font-bold text-white">+10.000 mulheres</span> para 
              análise precisa de fertilidade e acompanhamento gestacional completo
            </p>

            {/* CTAs Principais */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                onClick={handleStartTrial}
                className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white font-bold text-lg px-10 py-6 shadow-2xl shadow-cyan-500/40 transform hover:scale-105 transition-all"
              >
                Começar Teste Grátis
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400/10 hover:text-white font-bold text-lg px-10 py-6"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver Demonstração
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/30">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="text-green-300 font-semibold">100% Seguro</span>
              </div>
              <div className="flex items-center gap-2 bg-yellow-500/10 px-4 py-2 rounded-full border border-yellow-500/30">
                <Award className="h-5 w-5 text-yellow-400" />
                <span className="text-yellow-300 font-semibold">Certificado ANVISA</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/30">
                <Users className="h-5 w-5 text-purple-400" />
                <span className="text-purple-300 font-semibold">+10.000 Usuárias</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Métricas de Impacto */}
      <section className="py-20 px-6 bg-slate-900/50 backdrop-blur-xl border-y border-cyan-500/20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent mb-2">
                  {metric.number}
                </div>
                <div className="text-cyan-300 font-medium">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section com Cards Vibrantes */}
      <section id="features" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Funcionalidades Poderosas
            </h2>
            <p className="text-xl text-cyan-300">
              Tecnologia de ponta para cuidar da sua saúde
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 - IA Preditiva */}
            <Card className="relative bg-gradient-to-br from-slate-800 to-slate-900 border-cyan-500/30 hover:border-cyan-400 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-transparent rounded-lg"></div>
              <CardHeader className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/50">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">IA Preditiva</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-cyan-100 mb-6 text-lg">
                  Machine Learning analisa seus padrões únicos com precisão cirúrgica
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-cyan-200">Análise de múltiplos biomarcadores em tempo real</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-cyan-200">Aprendizado contínuo com seus dados</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-cyan-200">95% de precisão comprovada</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Card 2 - Análise Completa */}
            <Card className="relative bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/30 hover:border-purple-400 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent rounded-lg"></div>
              <CardHeader className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/50">
                  <Activity className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">Análise 360°</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-purple-100 mb-6 text-lg">
                  Monitoramento completo do seu ciclo reprodutivo
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-purple-200">Temperatura basal com gráficos inteligentes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-purple-200">Análise detalhada do muco cervical</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-purple-200">Padrões hormonais personalizados</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Card 3 - Dashboard */}
            <Card className="relative bg-gradient-to-br from-slate-800 to-slate-900 border-green-500/30 hover:border-green-400 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-green-500/30">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-transparent rounded-lg"></div>
              <CardHeader className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-green-500/50">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">Dashboard Pro</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-green-100 mb-6 text-lg">
                  Visualização clara para decisões informadas
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-green-200">Gráficos interativos e intuitivos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-green-200">Relatórios médicos em PDF</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-green-200">Insights e recomendações diárias</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials com Visual Impactante */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-900 via-blue-900/50 to-slate-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Histórias de Sucesso
            </h2>
            <p className="text-xl text-cyan-300">
              Veja o que nossas usuárias dizem
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-cyan-500/30 backdrop-blur-xl">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-cyan-100 mb-6 text-lg italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t border-cyan-500/20 pt-4">
                    <p className="text-white font-bold text-lg">{testimonial.author}</p>
                    <p className="text-cyan-400">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section com Destaque Visual */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Escolha Seu Plano
            </h2>
            <p className="text-xl text-cyan-300">
              Comece grátis e evolua conforme precisar
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`relative bg-gradient-to-br from-slate-800 to-slate-900 border transition-all transform hover:scale-105 cursor-pointer ${
                  plan.popular 
                    ? 'border-cyan-400 shadow-2xl shadow-cyan-500/40 scale-105 md:scale-110' 
                    : 'border-slate-700 hover:border-slate-600'
                } ${selectedPlan === plan.id ? 'ring-4 ring-cyan-500/50' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-black shadow-lg">
                      🔥 MAIS POPULAR
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-3xl font-bold text-white mb-2">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <span className="text-cyan-400 text-lg">{plan.period}</span>
                  </div>
                  <p className="text-cyan-300 mt-2">{plan.description}</p>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-cyan-100">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full font-bold text-lg py-6 ${
                      plan.popular 
                        ? `bg-gradient-to-r ${plan.gradient} hover:opacity-90 text-white shadow-lg` 
                        : 'bg-slate-700 hover:bg-slate-600 text-cyan-300'
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

      {/* CTA Final Impactante */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-teal-600/20 to-cyan-600/20"></div>
        <div className="container mx-auto max-w-4xl relative">
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Transforme Sua Saúde Hoje
            </h2>
            <p className="text-2xl text-cyan-200 mb-12 max-w-3xl mx-auto">
              Junte-se a milhares de mulheres que conquistaram seus objetivos reprodutivos
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <Button
                size="lg"
                onClick={handleStartTrial}
                className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white font-black text-xl px-12 py-8 shadow-2xl shadow-cyan-500/50 transform hover:scale-105 transition-all"
              >
                Começar Teste Grátis Agora
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-green-400" />
                <span className="text-green-300 font-semibold">Pagamento 100% Seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="text-green-300 font-semibold">Garantia de 30 Dias</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-400" />
                <span className="text-green-300 font-semibold">Cancele Quando Quiser</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Premium */}
      <footer className="bg-slate-900 border-t border-cyan-500/30 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full blur-xl opacity-50"></div>
                <img 
                  src="/idalia-logo.png" 
                  alt="Idalia Calc" 
                  className="relative h-12 w-12 drop-shadow-2xl"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                  Idalia Calc
                </h3>
                <p className="text-cyan-400 text-sm">Tecnologia Avançada em Saúde Reprodutiva</p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-cyan-300 font-semibold">© 2025 Idalia Calc. Todos os direitos reservados.</p>
              <p className="text-cyan-500 text-sm mt-1">
                Desenvolvido com IA e validação científica rigorosa
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}