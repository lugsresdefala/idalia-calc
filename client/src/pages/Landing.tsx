
import { ArrowRight, Calculator, Calendar, Activity, Stethoscope, Shield, Award, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">
      {/* Header */}
      <header className="relative z-10 border-b border-blue-500/20 backdrop-blur-lg bg-black/20">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src="/idalia-logo.png" 
                alt="Idalia Calc" 
                className="h-12 w-12 drop-shadow-2xl"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/20 via-blue-400/20 to-yellow-400/20 blur-sm"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-yellow-300">
                Idalia Calc
              </h1>
              <p className="text-xs text-blue-200/80">Medicina Reprodutiva Avançada</p>
            </div>
          </div>
          <Button
            onClick={() => window.location.href = '/api/login'}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            Acessar Plataforma
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/50 to-transparent"></div>
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm mb-6">
              <Award className="h-4 w-4" />
              Plataforma Médica Certificada CRM: 220558
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-cyan-200 to-yellow-200">
                Medicina Reprodutiva
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300">
                de Excelência
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100/90 mb-8 max-w-4xl mx-auto leading-relaxed">
              Plataforma médica especializada em análise de fertilidade, cálculo gestacional e acompanhamento reprodutivo com precisão científica.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              onClick={() => window.location.href = '/api/login'}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 px-8 py-4 text-lg"
            >
              Iniciar Análise Médica
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-blue-400/30 text-blue-200 hover:bg-blue-500/10 hover:border-blue-400/50 transition-all duration-300 px-8 py-4 text-lg"
            >
              Conhecer Recursos
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-300 mb-2">99.8%</div>
              <div className="text-blue-200 text-sm">Precisão nos Cálculos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300 mb-2">5000+</div>
              <div className="text-blue-200 text-sm">Análises Realizadas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300 mb-2">24/7</div>
              <div className="text-blue-200 text-sm">Disponibilidade</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/30 to-slate-950/30"></div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-cyan-200 to-purple-200">
              Recursos Médicos Avançados
            </h2>
            <p className="text-xl text-blue-100/80 max-w-3xl mx-auto">
              Ferramentas especializadas baseadas em evidências científicas e protocolos médicos internacionais
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-blue-950/40 to-slate-950/40 border-blue-500/20 backdrop-blur-lg hover:border-blue-400/40 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all duration-300">
                    <Calendar className="h-8 w-8 text-blue-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-100">Análise de Fertilidade</h3>
                </div>
                <p className="text-blue-200/80 mb-6 leading-relaxed">
                  Determinação precisa da janela fértil baseada em múltiplos parâmetros biológicos, temperatura basal e análise do muco cervical.
                </p>
                <ul className="space-y-2 text-sm text-blue-300">
                  <li>• Cálculo de ovulação com IA</li>
                  <li>• Monitoramento de temperatura basal</li>
                  <li>• Análise de padrões hormonais</li>
                  <li>• Previsões personalizadas</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-950/40 to-blue-950/40 border-cyan-500/20 backdrop-blur-lg hover:border-cyan-400/40 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-teal-500/20 group-hover:from-cyan-500/30 group-hover:to-teal-500/30 transition-all duration-300">
                    <Calculator className="h-8 w-8 text-cyan-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-100">Idade Gestacional</h3>
                </div>
                <p className="text-blue-200/80 mb-6 leading-relaxed">
                  Cálculo gestacional preciso com múltiplos métodos: DUM, ultrassonografia e transferência embrionária para reprodução assistida.
                </p>
                <ul className="space-y-2 text-sm text-cyan-300">
                  <li>• Regra de Naegele otimizada</li>
                  <li>• Compatibilidade com FIV</li>
                  <li>• Marcos do desenvolvimento fetal</li>
                  <li>• Protocolos de pré-natal</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-950/40 to-blue-950/40 border-purple-500/20 backdrop-blur-lg hover:border-purple-400/40 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                    <Activity className="h-8 w-8 text-purple-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-100">Monitoramento Avançado</h3>
                </div>
                <p className="text-blue-200/80 mb-6 leading-relaxed">
                  Dashboard médico completo com visualização de dados, tendências reprodutivas e relatórios detalhados para acompanhamento clínico.
                </p>
                <ul className="space-y-2 text-sm text-purple-300">
                  <li>• Gráficos interativos de ciclos</li>
                  <li>• Histórico médico completo</li>
                  <li>• Alertas e notificações</li>
                  <li>• Relatórios para consultas</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Medical Credentials */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-950/50 to-slate-950/50">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Stethoscope className="h-8 w-8 text-blue-300" />
            <h2 className="text-3xl font-bold text-blue-100">Certificação Médica</h2>
          </div>
          <div className="bg-gradient-to-r from-blue-950/60 to-slate-950/60 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/20">
            <p className="text-xl text-blue-100 mb-4">
              <strong>Dra. Idalia Aline de Souza</strong>
            </p>
            <p className="text-blue-200 mb-2">CRM: 220558 • Especialista em Medicina Reprodutiva</p>
            <p className="text-blue-300/80 text-sm">
              Plataforma desenvolvida seguindo protocolos do Ministério da Saúde, FEBRASGO e ACOG
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-200">
            Pronta para Revolucionar seu Acompanhamento?
          </h2>
          <p className="text-xl text-blue-100/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Acesse ferramentas médicas profissionais para saúde reprodutiva com a precisão que você merece.
          </p>
          <Button
            size="lg"
            onClick={() => window.location.href = '/api/login'}
            className="bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-700 hover:via-cyan-700 hover:to-purple-700 text-white border-0 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 px-12 py-6 text-xl rounded-full"
          >
            Começar Análise Gratuita
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-500/20 bg-gradient-to-r from-slate-950/80 to-blue-950/80 backdrop-blur-lg py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img src="/idalia-logo.png" alt="Idalia Calc" className="h-10 w-10" />
              <div>
                <h3 className="text-xl font-bold text-blue-100">Idalia Calc</h3>
                <p className="text-blue-300/80 text-sm">Medicina Reprodutiva de Excelência</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-blue-200 mb-1">© 2025 Idalia Calc. Todos os direitos reservados.</p>
              <p className="text-blue-300/70 text-sm">
                Dra. Idalia Aline de Souza • CRM: 220558
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-blue-500/10 text-center">
            <div className="flex items-center justify-center gap-2 text-blue-300/80 text-sm">
              <Shield className="h-4 w-4" />
              Plataforma médica certificada e em conformidade com LGPD
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
