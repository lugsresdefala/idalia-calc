import { motion } from "framer-motion";
import { ArrowRight, Activity, Baby, Calendar, Shield, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Landing() {
  const features = [
    {
      icon: Calendar,
      title: "Calculadora de Fertilidade",
      description: "Acompanhe sua janela fértil com precisão científica e análise detalhada do ciclo menstrual"
    },
    {
      icon: Baby,
      title: "Calculadora Gestacional",
      description: "Calcule a idade gestacional e acompanhe o desenvolvimento fetal semana a semana"
    },
    {
      icon: Activity,
      title: "Monitoramento Biológico",  
      description: "Registre temperatura basal, características do muco cervical e sintomas diários"
    },
    {
      icon: Calendar,
      title: "Histórico Completo",
      description: "Mantenha um registro detalhado de todos os seus ciclos e padrões reprodutivos"
    },
    {
      icon: BarChart3,
      title: "Análise Avançada",
      description: "Visualize tendências e padrões com gráficos intuitivos e relatórios personalizados"
    },
    {
      icon: Shield,
      title: "Dados Seguros",
      description: "Suas informações médicas são protegidas com criptografia e privacidade total"
    }
  ];

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Efeitos de fundo parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-header backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/idalia-logo.png" 
              alt="Idalia" 
              className="h-10 w-10 drop-shadow-lg"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Idalia Calc
            </span>
          </div>
          <Button
            onClick={() => window.location.href = '/api/login'}
            className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white shadow-lg"
          >
            Entrar
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Idalia Calc
            </h1>
            <p className="text-xl md:text-2xl text-slate-700 mb-8 max-w-3xl mx-auto">
              Plataforma médica especializada em saúde reprodutiva com calculadoras avançadas e análise de dados baseada em evidências científicas
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => window.location.href = '/api/login'}
                className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all"
              >
                Começar Agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-blue-300 hover:border-blue-400 text-blue-600 hover:bg-blue-50"
              >
                Conhecer Recursos
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
              Recursos Completos para Saúde Reprodutiva
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Ferramentas profissionais baseadas nas recomendações da Febrasgo e ACOG
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full glass-card hover:shadow-xl transition-all">
                  <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-slate-800">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
              Comece a Monitorar Sua Saúde Reprodutiva
            </h2>
            <p className="text-lg mb-8 text-slate-600">
              Acesso completo a todas as ferramentas e recursos profissionais
            </p>
            <Button
              size="lg"
              onClick={() => window.location.href = '/api/login'}
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all"
            >
              Criar Conta Gratuita
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-4 glass-footer backdrop-blur-sm border-t border-blue-100/20">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="mb-2 text-slate-700">© 2025 Idalia Calc. Todos os direitos reservados.</p>
          <p className="text-sm text-slate-600">
            Dra. Idalia Aline de Souza • CRM: 220558
          </p>
        </div>
      </footer>
    </div>
  );
}