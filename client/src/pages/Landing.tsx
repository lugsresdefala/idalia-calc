import { useState } from "react";
import { ArrowRight, CheckCircle, Lock, Shield, Brain, Heart, Activity, TrendingUp, ChevronRight, Clock, Calculator, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";

export default function Landing() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header com Logo */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/90 border-b border-cyan-500/30">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo Oficial */}
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
              onClick={() => setLocation("/app")}
              className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white font-bold px-6 py-2 shadow-lg shadow-cyan-500/30"
            >
              Acessar Plataforma
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section - Sem sensacionalismo */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full blur-[100px] opacity-20"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500 rounded-full blur-[120px] opacity-20"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
                Calculadoras de
              </span>
              <span className="block text-4xl md:text-5xl bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mt-2">
                Fertilidade e Gestação
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-cyan-100 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Ferramentas precisas baseadas em algoritmos médicos para acompanhamento 
              do período fértil e idade gestacional
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                onClick={() => setLocation("/app")}
                className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white font-bold text-lg px-10 py-6 shadow-2xl shadow-cyan-500/40"
              >
                Começar a Usar
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400/10 hover:text-white font-bold text-lg px-10 py-6"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Conhecer Funcionalidades
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Apenas funcionalidades reais */}
      <section id="features" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Funcionalidades Disponíveis
            </h2>
            <p className="text-xl text-cyan-300">
              Ferramentas desenvolvidas com base em protocolos médicos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Calculadora de Fertilidade */}
            <Card className="relative bg-gradient-to-br from-slate-800 to-slate-900 border-cyan-500/30 hover:border-cyan-400 transition-all hover:shadow-2xl hover:shadow-cyan-500/30">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-transparent rounded-lg"></div>
              <CardHeader className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/50">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">Período Fértil</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-cyan-100 mb-6 text-lg">
                  Cálculo do período fértil baseado no ciclo menstrual
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-cyan-200">Previsão da ovulação</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-cyan-200">Calendário visual interativo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-cyan-200">Análise de temperatura basal</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-cyan-200">Avaliação do muco cervical</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Calculadora Gestacional */}
            <Card className="relative bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/30 hover:border-purple-400 transition-all hover:shadow-2xl hover:shadow-purple-500/30">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent rounded-lg"></div>
              <CardHeader className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/50">
                  <Calculator className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">Idade Gestacional</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-purple-100 mb-6 text-lg">
                  Cálculo preciso da idade gestacional
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-purple-200">Cálculo por DUM (Data da Última Menstruação)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-purple-200">Cálculo por ultrassonografia</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-purple-200">Compatível com FIV</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-purple-200">Marcos do desenvolvimento fetal</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Dashboard */}
            <Card className="relative bg-gradient-to-br from-slate-800 to-slate-900 border-green-500/30 hover:border-green-400 transition-all hover:shadow-2xl hover:shadow-green-500/30">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-transparent rounded-lg"></div>
              <CardHeader className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-green-500/50">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-green-100 mb-6 text-lg">
                  Acompanhamento completo dos seus dados
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-green-200">Histórico de ciclos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-green-200">Gráficos de temperatura</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-green-200">Notificações e lembretes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-green-200">Entrada de dados diários</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-24 px-6 bg-slate-900/50 backdrop-blur-xl border-y border-cyan-500/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-cyan-300">
              Simples e intuitivo para uso diário
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/50">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Insira seus Dados</h3>
              <p className="text-cyan-200">
                Adicione informações sobre seu ciclo menstrual, temperatura basal ou dados gestacionais
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/50">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Análise Automática</h3>
              <p className="text-purple-200">
                Nossos algoritmos processam seus dados baseados em protocolos médicos estabelecidos
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/50">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Acompanhe Resultados</h3>
              <p className="text-green-200">
                Visualize suas informações em gráficos claros e receba orientações personalizadas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Informações Médicas */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-cyan-500/30">
            <CardContent className="p-12">
              <div className="flex items-center justify-center mb-6">
                <Heart className="h-12 w-12 text-cyan-400" />
              </div>
              <h2 className="text-3xl font-bold text-white text-center mb-6">
                Base Científica
              </h2>
              <p className="text-cyan-100 text-lg text-center mb-8">
                As calculadoras utilizam métodos estabelecidos pela literatura médica, 
                incluindo a Regra de Naegele para cálculo gestacional e análise de 
                biomarcadores para fertilidade.
              </p>
              <div className="bg-slate-800/50 border border-cyan-500/20 rounded-lg p-6">
                <p className="text-amber-400 text-center font-semibold mb-2">
                  ⚠️ Importante
                </p>
                <p className="text-cyan-200 text-center">
                  Esta ferramenta é informativa e não substitui o acompanhamento médico profissional. 
                  Sempre consulte um profissional de saúde para orientações específicas.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-teal-600/20 to-cyan-600/20"></div>
        <div className="container mx-auto max-w-4xl relative">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Comece a Usar Agora
            </h2>
            <p className="text-xl text-cyan-200 mb-12 max-w-3xl mx-auto">
              Acesse as calculadoras e ferramentas de acompanhamento gratuitamente
            </p>
            
            <Button
              size="lg"
              onClick={() => setLocation("/app")}
              className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white font-black text-xl px-12 py-8 shadow-2xl shadow-cyan-500/50"
            >
              Acessar Plataforma
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            
            <div className="flex items-center justify-center gap-6 flex-wrap mt-8">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="text-green-300 font-semibold">Dados Protegidos</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-400" />
                <span className="text-green-300 font-semibold">Acesso Imediato</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                <p className="text-cyan-400 text-sm">Plataforma de Saúde Reprodutiva</p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-cyan-300 font-semibold">© 2025 Idalia Calc</p>
              <p className="text-cyan-500 text-sm mt-1">
                Ferramenta educacional e informativa
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}