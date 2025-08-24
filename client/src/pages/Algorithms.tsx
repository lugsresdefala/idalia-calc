import { Link } from "wouter";

const Algorithms = () => {
  return (
    <div className="min-h-screen tech-bg">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 tech-text-glow">
            Idalia Calc - Algoritmos
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">
            Descrição detalhada dos algoritmos e metodologias científicas utilizadas
          </p>
        </header>

        <nav className="glass-card rounded-lg mb-8 p-4 text-center">
          <Link href="/" className="tech-button px-6 py-2 tech-glow inline-block">
            Voltar para Calculadoras
          </Link>
        </nav>

        <div className="glass-card rounded-lg shadow-md p-4 sm:p-6 mb-6 text-blue-100 max-w-full overflow-hidden">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-300 tech-text-glow">
            Cálculo do Período Fértil
          </h2>
          
          <div className="mb-6 glass-panel p-3 sm:p-4 rounded-lg tech-border">
            <h3 className="text-lg font-semibold mb-3 text-cyan-300">Metodologia</h3>
            <p className="text-sm mb-4 text-blue-200">
              O algoritmo para determinação do período fértil considera múltiplos fatores biológicos:
            </p>
            <ul className="list-disc pl-6 text-sm text-blue-200 space-y-2">
              <li>Duração do ciclo menstrual (variabilidade calculada com base no histórico)</li>
              <li>Viabilidade do espermatozoide no trato reprodutivo feminino (até 5 dias)</li>
              <li>Viabilidade do óvulo após ovulação (12-24 horas)</li>
              <li>Fase lútea (geralmente 14 dias antes da próxima menstruação)</li>
            </ul>
            
            <h3 className="text-lg font-semibold mt-6 mb-3 text-cyan-300">Fórmulas Utilizadas</h3>
            <div className="p-4 glass-panel tech-border">
              <p className="text-sm mb-2 text-blue-200"><span className="font-medium">Período Fértil:</span> [Dia da ovulação - 5 dias até Dia da ovulação + 1 dia]</p>
              <p className="text-sm mb-2 text-blue-200"><span className="font-medium">Dia da Ovulação:</span> [Primeiro dia do próximo ciclo - 14 dias]</p>
              <p className="text-sm text-blue-200"><span className="font-medium">Cálculo adaptativo:</span> Ajuste baseado na variabilidade dos ciclos anteriores</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-lg shadow-md p-4 sm:p-6 mb-6 text-blue-100 max-w-full overflow-hidden">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-300 tech-text-glow">
            Cálculo da Idade Gestacional
          </h2>
          
          <div className="mb-6 glass-panel p-3 sm:p-4 rounded-lg tech-border">
            <h3 className="text-lg font-semibold mb-3 text-cyan-300">Métodos Implementados</h3>
            <p className="text-sm mb-4 text-blue-200">
              A calculadora oferece três métodos de cálculo gestacional, cada um com sua própria precisão e aplicação:
            </p>
            
            <div className="space-y-4">
              <div className="p-3 glass-panel tech-border">
                <h4 className="font-medium text-blue-100 mb-2">1. Data da Última Menstruação (DUM)</h4>
                <p className="text-xs sm:text-sm text-blue-200">
                  Utiliza a regra Naegele: [Data do parto = DUM + 280 dias (40 semanas)]<br />
                  Método padrão obstétrico, com precisão de ±2 semanas.
                </p>
              </div>
              
              <div className="p-3 glass-panel tech-border">
                <h4 className="font-medium text-blue-100 mb-2">2. Ultrassonografia</h4>
                <p className="text-xs sm:text-sm text-blue-200">
                  Recalcula a idade gestacional com base na biometria fetal.<br />
                  Algoritmo ajusta a data provável do parto com precisão de ±7 dias no primeiro trimestre.
                </p>
              </div>
              
              <div className="p-3 glass-panel tech-border">
                <h4 className="font-medium text-blue-100 mb-2">3. Transferência Embrionária</h4>
                <p className="text-xs sm:text-sm text-blue-200">
                  Método mais preciso para gestações por FIV:<br />
                  - Embrião de 3 dias: [Idade gestacional = 17 dias + dias desde a transferência]<br />
                  - Blastocisto (5 dias): [Idade gestacional = 19 dias + dias desde a transferência]
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-lg shadow-md p-4 sm:p-6 mb-6 text-blue-100 max-w-full overflow-hidden">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-300 tech-text-glow">
            Referências Científicas
          </h2>
          
          <div className="glass-panel p-3 sm:p-4 rounded-lg tech-border">
            <ul className="list-disc pl-6 text-sm text-blue-200 space-y-3">
              <li>
                <span className="font-medium text-cyan-300">Cálculo do Período Fértil</span> - 
                Baseado na regularidade do ciclo menstrual e período de ovulação
              </li>
              <li>
                <span className="font-medium text-cyan-300">Cálculo da Data do Parto</span> - 
                Método padrão usado por médicos: adiciona 280 dias à data da última menstruação
              </li>
              <li>
                <span className="font-medium text-cyan-300">Cálculo de Idade Gestacional</span> - 
                Métodos padrão utilizados em obstetrícia: DUM, ultrassonografia e FIV
              </li>
              <li>
                <span className="font-medium text-cyan-300">Baird DD, et al.</span> Using the ratio of urinary oestrogen and progesterone metabolites to estimate day of ovulation. Statistics in Medicine, 1991.
              </li>
              <li>
                <span className="font-medium text-cyan-300">Wilcox AJ, et al.</span> The timing of the "fertile window" in the menstrual cycle: day specific estimates from a prospective study. BMJ, 2000.
              </li>
            </ul>
          </div>
        </div>

        <footer className="mt-8 text-center text-sm text-blue-200 glass-panel p-4 rounded-lg shadow-md">
          <p className="mb-2">
            Os algoritmos descritos são baseados em métodos estabelecidos na prática obstétrica.
          </p>
          <p>
            Consulte sempre um profissional de saúde para interpretação dos resultados e orientações específicas.
          </p>
          <div className="mt-4 text-xs text-blue-300/70 flex justify-center items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-blue-400 pulse-animation"></span>
            <span>Idalia Calc v1.2.1</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Algorithms;