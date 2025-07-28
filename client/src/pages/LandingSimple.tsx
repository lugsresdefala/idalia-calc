import { ArrowRight, Calculator, Baby, CheckCircle } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/50 to-cyan-900/30">
      {/* Header Simples */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-panel backdrop-blur-lg border-b border-cyan-500/20">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/idalia-logo.png" 
              alt="Idalia Calc" 
              className="h-10 w-10 object-contain"
            />
            <span className="text-xl font-bold text-cyan-300">
              Idalia Calc
            </span>
          </div>
          <button
            onClick={() => window.location.href = '/api/login'}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:from-cyan-600 hover:to-blue-600 transition-all"
          >
            Entrar / Cadastrar
          </button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <div className="pt-24 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Seção Hero */}
          <div className="text-center py-16">
            <img 
              src="/idalia-logo.png" 
              alt="Idalia Calc" 
              className="h-24 w-24 mx-auto mb-8 drop-shadow-2xl"
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Idalia Calc
            </h1>
            <p className="text-xl text-blue-100 mb-2">
              Calculadoras Médicas Especializadas
            </p>
            <p className="text-lg text-blue-100/70">
              Protocolos Febrasgo e ACOG
            </p>
          </div>

          {/* Duas Calculadoras */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Calculadora 1 */}
            <div className="glass-panel p-8 border border-cyan-500/20">
              <Calculator className="h-12 w-12 text-cyan-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">
                Calculadora de Fertilidade
              </h3>
              <p className="text-blue-100 mb-4">
                Determine sua janela fértil com precisão baseada em:
              </p>
              <ul className="space-y-2 text-blue-100/80">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Ciclo menstrual personalizado</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Temperatura basal corporal</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Características do muco cervical</span>
                </li>
              </ul>
            </div>

            {/* Calculadora 2 */}
            <div className="glass-panel p-8 border border-blue-500/20">
              <Baby className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">
                Calculadora Gestacional
              </h3>
              <p className="text-blue-100 mb-4">
                Acompanhe o desenvolvimento fetal com:
              </p>
              <ul className="space-y-2 text-blue-100/80">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Idade gestacional precisa</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Marcos de desenvolvimento</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Recomendações de exames</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sistema de Acesso */}
          <div className="glass-panel p-8 mb-12 text-center border border-yellow-500/20">
            <h2 className="text-2xl font-bold text-yellow-300 mb-4">
              Sistema de Acesso
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Assinatura Mensal
                </h3>
                <p className="text-blue-100/80">
                  Acesso ilimitado a todas as funcionalidades por R$ 29,90/mês
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Sistema de Tokens
                </h3>
                <p className="text-blue-100/80">
                  Compre tokens para uso avulso das calculadoras
                </p>
              </div>
            </div>
          </div>

          {/* CTA Final */}
          <div className="text-center pb-16">
            <button
              onClick={() => window.location.href = '/api/login'}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-xl shadow-cyan-500/25 inline-flex items-center gap-2"
            >
              Começar Agora
              <ArrowRight className="h-5 w-5" />
            </button>
            <p className="mt-4 text-blue-100/60 text-sm">
              Cadastro gratuito • Sem compromisso
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}