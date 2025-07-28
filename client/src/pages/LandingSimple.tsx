import { ArrowRight, Calculator, Baby, CheckCircle, Sparkles } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/50 to-cyan-900/30">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-lg border-b-2 border-cyan-500/30 shadow-lg shadow-cyan-500/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="attached_assets/idalialogo_1752806026568.png" 
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
          <section className="text-center py-16 border-b border-cyan-500/10">
            <img 
              src="attached_assets/idalialogo_1752806026568.png" 
              alt="Idalia Calc" 
              className="h-24 w-24 mx-auto mb-8"
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Idalia Calc
            </h1>
            <p className="text-xl text-blue-100 mb-3">
              ✨ A tecnologia que revoluciona o cuidado com sua saúde reprodutiva
            </p>
            <p className="text-lg text-blue-100/70">
              Protocolo Febrasgo + ACOG = Precisão médica garantida
            </p>
          </section>

          {/* Duas Calculadoras */}
          <section className="py-12 border-b border-gray-200">
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">
              Duas Calculadoras Que Mudam Vidas
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Calculadora 1 */}
              <div className="bg-white p-8 rounded-xl border-2 border-cyan-500/30 hover:border-cyan-500/50 transition-all hover:shadow-xl shadow-lg">
                <Calculator className="h-12 w-12 text-cyan-400 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  Calculadora de Fertilidade
                </h3>
                <p className="text-gray-600 mb-4">
                  Descubra o momento perfeito para realizar seu sonho
                </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Análise inteligente do seu ciclo único</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Monitoramento preciso da temperatura basal</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Interpretação científica dos sinais do corpo</span>
                </li>
              </ul>
              </div>

              {/* Calculadora 2 */}
              <div className="bg-white p-8 rounded-xl border-2 border-blue-500/30 hover:border-blue-500/50 transition-all hover:shadow-xl shadow-lg">
                <Baby className="h-12 w-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  Calculadora Gestacional
                </h3>
                <p className="text-gray-600 mb-4">
                  Viva cada momento da sua jornada com segurança
                </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Acompanhamento semana a semana</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Cada conquista do desenvolvimento fetal</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Orientações médicas no tempo certo</span>
                </li>
              </ul>
              </div>
            </div>
          </section>

          {/* Sistema de Acesso */}
          <section className="py-12 border-b border-gray-200">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-xl text-center border-2 border-yellow-400/30">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                💎 Planos de Acesso Flexíveis
              </h2>
            <div className="grid md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
                <div className="p-6 rounded-lg bg-white border-2 border-yellow-400 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    ⭐ Assinatura Premium
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Acesso ilimitado e completo
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    R$ 29,90/mês
                  </p>
                </div>
                <div className="p-6 rounded-lg bg-white border-2 border-cyan-500 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    🎫 Tokens Avulsos
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Pague apenas quando usar
                  </p>
                  <p className="text-lg text-cyan-600">
                    A partir de R$ 5,00
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Final */}
          <section className="text-center py-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Pronta para começar sua jornada?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Mais de 10.000 pessoas já mudaram suas vidas com a Idalia Calc
            </p>
            <button
              onClick={() => window.location.href = '/api/login'}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-xl shadow-cyan-500/25 inline-flex items-center gap-2"
            >
              Começar Agora
              <ArrowRight className="h-5 w-5" />
            </button>
            <p className="mt-4 text-gray-500 text-sm">
              🎯 Teste grátis por 7 dias • 💳 Sem cartão • ✅ Cancele quando quiser
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}