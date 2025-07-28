import { motion } from "framer-motion";
import { ArrowRight, Activity, Baby, Calendar, Shield, BarChart3, CheckCircle } from "lucide-react";

export default function Landing() {
  const features = [
    {
      icon: Activity,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/50 to-cyan-900/30">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-panel backdrop-blur-lg border-b border-cyan-500/20">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/idalia-logo.png" 
              alt="Idalia Calc Logo" 
              className="h-12 w-12 object-contain"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-yellow-400 bg-clip-text text-transparent tech-text-glow">
              Idalia Calc
            </span>
          </div>
          <button
            onClick={() => window.location.href = '/api/login'}
            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/25"
          >
            Entrar / Cadastrar
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          {/* Logo Grande Central */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400/20 via-orange-400/20 to-amber-400/20 blur-3xl"></div>
              <img 
                src="/idalia-logo.png" 
                alt="Idalia Calc" 
                className="h-32 w-32 relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-yellow-400 bg-clip-text text-transparent tech-text-glow">
              Idalia Calc
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Calculadora de Fertilidade e Calculadora Gestacional
            </p>
            <p className="text-lg text-blue-100/80 mb-8">
              Baseadas em protocolos Febrasgo e ACOG
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/api/login'}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-xl shadow-cyan-500/25 inline-flex items-center gap-2"
              >
                Começar Agora
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-xl glass-panel border border-cyan-500/20 text-cyan-300 text-lg font-semibold hover:bg-cyan-500/10 transition-all"
              >
                Conhecer Recursos
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              Recursos Principais
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Ferramentas médicas baseadas nas recomendações da Febrasgo e ACOG
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
                <div className="glass-panel p-6 h-full border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                  <feature.icon className="h-12 w-12 text-cyan-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-blue-100/80">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-panel border border-cyan-500/30 rounded-2xl p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              Acesso Profissional
            </h2>
            <p className="text-lg mb-8 text-blue-100">
              Sistema completo com assinatura mensal ou tokens para uso avulso
            </p>
            <button
              onClick={() => window.location.href = '/api/login'}
              className="px-8 py-4 rounded-xl bg-white text-teal-600 text-lg font-semibold hover:bg-gray-100 transition-all inline-flex items-center gap-2"
            >
              Criar Conta Gratuita
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="container mx-auto max-w-6xl text-center text-muted-foreground">
          <p className="mb-2">© 2025 Idalia Calc. Todos os direitos reservados.</p>
          <p className="text-sm">
            Dra. Idalia Aline de Souza • CRM: 220558
          </p>
        </div>
      </footer>
    </div>
  );
}