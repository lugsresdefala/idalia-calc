import { useState } from "react";
import { 
  Baby, 
  Heart, 
  Activity,
  Ruler,
  Scale,
  Calendar,
  AlertCircle,
  CheckCircle,
  Stethoscope
} from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface GestationalVisualizationProps {
  currentWeek?: number;
  dueDate?: Date;
}

const GestationalVisualization = ({ 
  currentWeek = 20, 
  dueDate = new Date(Date.now() + 20 * 7 * 24 * 60 * 60 * 1000)
}: GestationalVisualizationProps) => {
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);

  // Dados de desenvolvimento fetal por semana
  const fetalDevelopment = {
    4: { size: "Semente de papoula", weight: "< 1g", length: "2mm", milestone: "Formação do tubo neural" },
    8: { size: "Framboesa", weight: "1g", length: "1.6cm", milestone: "Batimentos cardíacos detectáveis" },
    12: { size: "Limão", weight: "14g", length: "5.4cm", milestone: "Reflexos começam a se desenvolver" },
    16: { size: "Abacate", weight: "100g", length: "11.6cm", milestone: "Pode ouvir sua voz" },
    20: { size: "Banana", weight: "300g", length: "16.4cm", milestone: "Ultrassom morfológico" },
    24: { size: "Espiga de milho", weight: "600g", length: "30cm", milestone: "Viabilidade fetal" },
    28: { size: "Berinjela", weight: "1kg", length: "37.6cm", milestone: "Abre e fecha os olhos" },
    32: { size: "Abóbora", weight: "1.7kg", length: "42.4cm", milestone: "Ossos endurecendo" },
    36: { size: "Melão", weight: "2.6kg", length: "47.4cm", milestone: "Considerado a termo" },
    40: { size: "Melancia", weight: "3.5kg", length: "51.2cm", milestone: "Nascimento esperado" }
  };

  // Obter desenvolvimento da semana mais próxima
  const getWeekData = (week: number) => {
    const weeks = Object.keys(fetalDevelopment).map(Number).sort((a, b) => a - b);
    const closestWeek = weeks.reduce((prev, curr) => 
      Math.abs(curr - week) < Math.abs(prev - week) ? curr : prev
    );
    return fetalDevelopment[closestWeek as keyof typeof fetalDevelopment];
  };

  const currentData = getWeekData(selectedWeek);

  // Dados para gráfico de crescimento
  const growthData = [
    { week: 8, weight: 1, length: 1.6 },
    { week: 12, weight: 14, length: 5.4 },
    { week: 16, weight: 100, length: 11.6 },
    { week: 20, weight: 300, length: 16.4 },
    { week: 24, weight: 600, length: 30 },
    { week: 28, weight: 1000, length: 37.6 },
    { week: 32, weight: 1700, length: 42.4 },
    { week: 36, weight: 2600, length: 47.4 },
    { week: 40, weight: 3500, length: 51.2 }
  ];

  // Trimestres
  const getTrimester = (week: number) => {
    if (week <= 13) return { number: 1, color: "from-blue-500 to-blue-400", label: "Primeiro Trimestre" };
    if (week <= 27) return { number: 2, color: "from-green-500 to-green-400", label: "Segundo Trimestre" };
    return { number: 3, color: "from-purple-500 to-purple-400", label: "Terceiro Trimestre" };
  };

  const trimester = getTrimester(selectedWeek);

  // Exames recomendados por período
  const getExams = (week: number) => {
    const exams = [];
    if (week >= 11 && week <= 14) exams.push({ name: "Translucência Nucal", urgent: true });
    if (week >= 20 && week <= 24) exams.push({ name: "Ultrassom Morfológico", urgent: true });
    if (week >= 24 && week <= 28) exams.push({ name: "Teste de Tolerância à Glicose", urgent: true });
    if (week >= 35 && week <= 37) exams.push({ name: "Cultura para Estreptococo B", urgent: false });
    return exams;
  };

  const currentExams = getExams(selectedWeek);

  // Criar array de semanas
  const weeks = Array.from({ length: 40 }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      {/* Visualização Principal */}
      <div className="glass-card p-6 border-pink-500/20">
        <h3 className="text-lg font-semibold text-pink-300 mb-4 flex items-center gap-2">
          <Baby className="h-5 w-5" />
          Desenvolvimento Gestacional
        </h3>
        
        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className={`p-4 rounded-xl bg-gradient-to-br ${trimester.color} bg-opacity-20`}>
            <div className="text-sm text-white/70 mb-1">{trimester.label}</div>
            <div className="text-2xl font-bold text-white">Semana {selectedWeek}</div>
            <div className="text-sm text-white/70 mt-1">{40 - selectedWeek} semanas restantes</div>
          </div>
          
          <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Ruler className="h-4 w-4 text-cyan-300" />
              <span className="text-sm text-cyan-300">Tamanho</span>
            </div>
            <div className="text-xl font-bold text-white">{currentData.length}</div>
            <div className="text-sm text-gray-400">{currentData.size}</div>
          </div>
          
          <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Scale className="h-4 w-4 text-orange-300" />
              <span className="text-sm text-orange-300">Peso</span>
            </div>
            <div className="text-xl font-bold text-white">{currentData.weight}</div>
            <div className="text-sm text-gray-400">Aproximado</div>
          </div>
        </div>

        {/* Marco do Desenvolvimento */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-5 w-5 text-indigo-400" />
            <span className="text-sm font-medium text-indigo-300">Marco da Semana {selectedWeek}</span>
          </div>
          <p className="text-white">{currentData.milestone}</p>
        </div>

        {/* Timeline de Semanas */}
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-1 min-w-max">
            {weeks.map((week) => {
              const weekTrimester = getTrimester(week);
              const isSelected = week === selectedWeek;
              const isCurrent = week === currentWeek;
              const isPast = week < currentWeek;
              
              return (
                <div
                  key={week}
                  onClick={() => setSelectedWeek(week)}
                  className={`
                    flex-shrink-0 w-6 h-16 rounded cursor-pointer transition-all duration-200
                    ${isSelected ? 'ring-2 ring-yellow-400 scale-110' : 'hover:scale-105'}
                    ${isCurrent ? 'ring-2 ring-cyan-400' : ''}
                  `}
                >
                  <div 
                    className={`
                      w-full h-full rounded bg-gradient-to-b ${weekTrimester.color} 
                      ${isPast ? 'opacity-40' : 'opacity-70'}
                      flex items-end justify-center pb-1
                    `}
                  >
                    {week % 4 === 0 && (
                      <span className="text-xs font-medium text-white rotate-90">{week}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Gráfico de Crescimento */}
      <div className="glass-card p-6 border-green-500/20">
        <h4 className="text-lg font-semibold text-green-300 mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Curva de Crescimento Fetal
        </h4>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="week" 
                stroke="#9CA3AF"
                label={{ value: 'Semanas', position: 'insideBottom', offset: -5, style: { fill: '#9CA3AF' } }}
              />
              <YAxis 
                yAxisId="weight"
                stroke="#9CA3AF"
                label={{ value: 'Peso (g)', angle: -90, position: 'insideLeft', style: { fill: '#9CA3AF' } }}
              />
              <YAxis 
                yAxisId="length"
                orientation="right"
                stroke="#9CA3AF"
                label={{ value: 'Comprimento (cm)', angle: 90, position: 'insideRight', style: { fill: '#9CA3AF' } }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(17, 24, 39, 0.9)', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
                labelStyle={{ color: '#D1D5DB' }}
              />
              <Line 
                yAxisId="weight"
                type="monotone" 
                dataKey="weight" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981', r: 4 }}
                name="Peso"
              />
              <Line 
                yAxisId="length"
                type="monotone" 
                dataKey="length" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
                name="Comprimento"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Exames e Recomendações */}
      {currentExams.length > 0 && (
        <div className="glass-card p-6 border-yellow-500/20">
          <h4 className="text-lg font-semibold text-yellow-300 mb-4 flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            Exames Recomendados para Semana {selectedWeek}
          </h4>
          
          <div className="space-y-3">
            {currentExams.map((exam, index) => (
              <div 
                key={index}
                className={`
                  p-4 rounded-lg flex items-center gap-3
                  ${exam.urgent 
                    ? 'bg-yellow-500/10 border border-yellow-500/30' 
                    : 'bg-blue-500/10 border border-blue-500/30'
                  }
                `}
              >
                {exam.urgent ? (
                  <AlertCircle className="h-5 w-5 text-yellow-400" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-blue-400" />
                )}
                <div>
                  <div className="font-medium text-white">{exam.name}</div>
                  {exam.urgent && (
                    <div className="text-sm text-yellow-300 mt-1">Importante neste período</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Data Prevista do Parto */}
      <div className="glass-card p-4 border-purple-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">Data Prevista do Parto</span>
          </div>
          <div className="text-xl font-bold text-white">
            {dueDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestationalVisualization;