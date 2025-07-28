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
            <svg className="h-10 w-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 5C25 5 28 8 28 12C28 16 25 18 22 20C20 22 18 24 18 27V35" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="20" cy="20" r="15" stroke="url(#gradient)" strokeWidth="1.5" opacity="0.3"/>
              <path d="M12 18C12 18 14 16 16 16C18 16 20 17 22 15C24 13 26 12 28 14" stroke="url(#gradient)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700"/>
                  <stop offset="50%" stopColor="#FFA500"/>
                  <stop offset="100%" stopColor="#FF8C00"/>
                </linearGradient>
              </defs>
            </svg>
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
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/20 via-blue-400/20 to-yellow-400/20 blur-3xl"></div>
              <svg className="h-32 w-32 relative z-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 5C25 5 28 8 28 12C28 16 25 18 22 20C20 22 18 24 18 27V35" stroke="url(#hero-gradient)" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="20" cy="20" r="15" stroke="url(#hero-gradient)" strokeWidth="1.5" opacity="0.3"/>
                <path d="M12 18C12 18 14 16 16 16C18 16 20 17 22 15C24 13 26 12 28 14" stroke="url(#hero-gradient)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
                <defs>
                  <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD700"/>
                    <stop offset="50%" stopColor="#FFA500"/>
                    <stop offset="100%" stopColor="#FF8C00"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-yellow-400 bg-clip-text text-transparent tech-text-glow">
              Idalia Calc
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Calculadoras médicas especializadas com base em evidências científicas
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
      <section id="features" className="py-20 px-4 bg-secondary/5">
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
            className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-12 text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comece a Monitorar Sua Saúde Reprodutiva
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Acesso completo a todas as ferramentas e recursos profissionais
            </p>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => window.location.href = '/api/login'}
              className="bg-white text-teal-600 hover:bg-gray-100"
            >
              Criar Conta Gratuita
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
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