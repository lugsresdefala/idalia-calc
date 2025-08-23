import { useState } from "react";
import { ArrowRight, CheckCircle, Star, Lock, Shield, Heart, Activity, Clock, Target, BarChart, Sparkles, Baby, Moon, Sun } from "lucide-react";
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
      description: "Experimente nossas ferramentas",
      credits: "5 cálculos/mês",
      features: [
        "5 cálculos mensais",
        "Calculadora de período fértil",
        "Calculadora gestacional",
        "Resultados básicos",
        "Acesso às ferramentas educacionais"
      ],
      cta: "Começar Grátis",
      popular: false,
      gradient: "from-pink-100 to-purple-100"
    },
    {
      id: "professional",
      name: "Essencial",
      price: "R$ 19",
      period: "/mês",
      description: "Para acompanhamento completo",
      credits: "100 cálculos/mês",
      features: [
        "100 cálculos mensais",
        "Análise avançada de fertilidade",
        "Histórico completo de ciclos",
        "Dashboard personalizado",
        "Gráficos de temperatura basal",
        "Análise de muco cervical",
        "Notificações e lembretes",
        "Relatórios em PDF",
        "Suporte por email"
      ],
      cta: "Teste Grátis 7 Dias",
      popular: true,
      gradient: "from-purple-200 to-pink-200"
    },
    {
      id: "premium",
      name: "Premium",
      price: "R$ 39",
      period: "/mês",
      description: "Recursos ilimitados",
      credits: "Ilimitado",
      features: [
        "Cálculos ilimitados",
        "Tudo do plano Essencial",
        "Previsões com IA",
        "Análise de padrões hormonais",
        "Integração com wearables",
        "Consulta virtual mensal",
        "Acesso prioritário a novidades",
        "Suporte prioritário 24/7",
        "Compartilhamento com médico"
      ],
      cta: "Teste Grátis 14 Dias",
      popular: false,
      gradient: "from-indigo-100 to-purple-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header Acolhedor */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-purple-200/30 shadow-sm">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo com efeito suave */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <img 
                src="/idalia-logo.png" 
                alt="Idalia Calc" 
                className="relative h-14 w-14 drop-shadow-md group-hover:scale-110 transition-transform"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Idalia Calc
              </h1>
              <p className="text-xs text-purple-600 font-medium">
                Cuidando da sua saúde íntima
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-purple-600 hover:text-purple-700 hover:bg-purple-100/50 font-medium"
              onClick={() => setLocation("/app")}
            >
              Entrar
            </Button>
            <Button
              onClick={() => setLocation("/app")}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium shadow-md"
            >
              Começar Agora
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section Acolhedora */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Elementos decorativos suaves */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center">
            {/* Badge delicado */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 border border-purple-200/50 mb-8">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span className="text-purple-700 font-medium text-sm">
                Tecnologia e cuidado para sua saúde feminina
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Acompanhe Seu Ciclo
              </span>
              <span className="block text-4xl md:text-5xl text-purple-800 mt-2">
                com Carinho e Precisão
              </span>
            </h1>
            
            <p className="text-xl text-purple-700 mb-10 max-w-3xl mx-auto leading-relaxed">
              Ferramentas gentis e precisas para entender seu corpo, planejar sua fertilidade 
              e acompanhar cada momento especial da sua jornada reprodutiva
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Button
                size="lg"
                onClick={() => setLocation("/app")}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-lg px-8 py-6 shadow-lg"
              >
                Comece Gratuitamente
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 font-semibold text-lg px-8 py-6"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Conhecer Recursos
              </Button>
            </div>

            {/* Trust indicators com cores suaves */}
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-green-700 font-medium text-sm">100% Privado</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
                <Heart className="h-4 w-4 text-purple-600" />
                <span className="text-purple-700 font-medium text-sm">Feito com Amor</span>
              </div>
              <div className="flex items-center gap-2 bg-pink-100 px-4 py-2 rounded-full">
                <Star className="h-4 w-4 text-pink-600" />
                <span className="text-pink-700 font-medium text-sm">4.9/5 Avaliação</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section com Cores Suaves */}
      <section id="features" className="py-20 px-6 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Recursos Pensados Para Você
            </h2>
            <p className="text-lg text-purple-700">
              Ferramentas delicadas e poderosas para cuidar da sua saúde
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card Período Fértil */}
            <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200 hover:shadow-xl transition-all hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <Moon className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl text-purple-800">Período Fértil</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-700 mb-4">
                  Acompanhe seu ciclo com delicadeza e precisão
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-purple-600 text-sm">Previsão gentil da ovulação</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-purple-600 text-sm">Calendário visual intuitivo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-purple-600 text-sm">Análise de sinais do corpo</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Card Gestação */}
            <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 hover:shadow-xl transition-all hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <Baby className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl text-purple-800">Acompanhamento Gestacional</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-700 mb-4">
                  Cada semana é especial na sua jornada
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-purple-600 text-sm">Desenvolvimento semana a semana</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-purple-600 text-sm">Lembretes de exames carinhosos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-purple-600 text-sm">Dicas de bem-estar</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Card Dashboard */}
            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 hover:shadow-xl transition-all hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <Activity className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl text-purple-800">Seu Espaço Pessoal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-700 mb-4">
                  Informações organizadas com carinho
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-purple-600 text-sm">Dashboard personalizado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-purple-600 text-sm">Histórico completo e privado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-purple-600 text-sm">Insights amorosos diários</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Como Funciona - Visual Suave */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Simples Como Um Abraço
            </h2>
            <p className="text-lg text-purple-700">
              Três passos para cuidar melhor de você
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-purple-800 mb-3">Compartilhe seus Dados</h3>
              <p className="text-purple-600">
                Insira suas informações em um ambiente seguro e acolhedor
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-purple-800 mb-3">Receba Análises Gentis</h3>
              <p className="text-purple-600">
                Nossa tecnologia cuida de você com precisão e delicadeza
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-200 to-pink-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-purple-800 mb-3">Acompanhe com Amor</h3>
              <p className="text-purple-600">
                Visualize sua jornada com gráficos bonitos e insights carinhosos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section Acolhedor */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Escolha Com Tranquilidade
            </h2>
            <p className="text-lg text-purple-700">
              Planos pensados para cada momento da sua vida
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`relative bg-white border-2 transition-all transform hover:scale-105 cursor-pointer ${
                  plan.popular 
                    ? 'border-purple-400 shadow-2xl scale-105 md:scale-110' 
                    : 'border-purple-200 hover:border-purple-300'
                } ${selectedPlan === plan.id ? 'ring-4 ring-purple-300 ring-opacity-50' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                      💜 Mais Escolhido
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pb-6">
                  <div className={`h-1 w-20 bg-gradient-to-r ${plan.gradient} rounded-full mx-auto mb-4`}></div>
                  <CardTitle className="text-2xl font-semibold text-purple-800">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center gap-1 mt-2">
                    <span className="text-4xl font-bold text-purple-700">
                      {plan.price}
                    </span>
                    <span className="text-purple-600">{plan.period}</span>
                  </div>
                  <p className="text-purple-600 mt-2 text-sm">{plan.description}</p>
                  <div className="mt-3 inline-flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
                    <Target className="h-4 w-4 text-purple-600" />
                    <span className="text-purple-700 font-medium text-sm">{plan.credits}</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-purple-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full font-medium ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md' 
                        : 'bg-purple-100 hover:bg-purple-200 text-purple-700'
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
            <p className="text-purple-600">
              <Lock className="inline h-4 w-4 mr-1" />
              Pagamento seguro • Cancele quando quiser • Sem pegadinhas
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Acolhedores */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Palavras de Carinho
            </h2>
            <p className="text-lg text-purple-700">
              O que nossas queridas usuárias dizem
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
              <CardContent className="p-6">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-purple-700 mb-4 italic">
                  "Me sinto acolhida e compreendida. As ferramentas são precisas e o visual é lindo e relaxante."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full"></div>
                  <div>
                    <p className="text-purple-800 font-semibold">Ana Carolina</p>
                    <p className="text-purple-600 text-sm">Tentante há 6 meses</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
              <CardContent className="p-6">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-purple-700 mb-4 italic">
                  "Finalmente um app que entende as mulheres! Interface delicada e informações confiáveis."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-300 to-indigo-300 rounded-full"></div>
                  <div>
                    <p className="text-purple-800 font-semibold">Juliana Silva</p>
                    <p className="text-purple-600 text-sm">Gestante de 12 semanas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-pink-50 border-indigo-200">
              <CardContent className="p-6">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-purple-700 mb-4 italic">
                  "O dashboard é maravilhoso! Consigo acompanhar tudo com calma e sem stress."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-300 to-pink-300 rounded-full"></div>
                  <div>
                    <p className="text-purple-800 font-semibold">Mariana Costa</p>
                    <p className="text-purple-600 text-sm">Usuária há 1 ano</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final Acolhedor */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-100 to-pink-100">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-white/80 backdrop-blur border-purple-200 shadow-xl">
            <CardContent className="p-12 text-center">
              <Heart className="h-16 w-16 text-pink-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                Comece Sua Jornada de Autocuidado
              </h2>
              <p className="text-lg text-purple-700 mb-8 max-w-2xl mx-auto">
                Você merece ferramentas que cuidam de você com o mesmo carinho que você cuida dos outros
              </p>
              
              <Button
                size="lg"
                onClick={() => setLocation("/app")}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-lg px-10 py-6 shadow-lg"
              >
                Começar Gratuitamente Agora
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              
              <div className="flex items-center justify-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="text-green-700 text-sm font-medium">100% Seguro</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-600" />
                  <span className="text-purple-700 text-sm font-medium">Acesso Imediato</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-pink-600" />
                  <span className="text-pink-700 text-sm font-medium">Feito com Amor</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer Delicado */}
      <footer className="bg-white border-t border-purple-200 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full blur-lg opacity-40"></div>
                <img 
                  src="/idalia-logo.png" 
                  alt="Idalia Calc" 
                  className="relative h-12 w-12 drop-shadow-md"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Idalia Calc
                </h3>
                <p className="text-purple-600 text-sm">Cuidando de você com tecnologia e amor</p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-purple-700 font-medium">© 2025 Idalia Calc</p>
              <p className="text-purple-600 text-sm mt-1">
                Feito com 💜 para mulheres incríveis
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}