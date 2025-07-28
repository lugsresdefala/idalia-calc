import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Dot } from 'recharts';
import { Thermometer, TrendingUp, Info, Calendar } from "lucide-react";

interface TemperatureData {
  day: number;
  temperature: number;
  phase: string;
  note?: string;
}

interface TemperatureChartProps {
  cycleData?: TemperatureData[];
  ovulationDay?: number;
}

const TemperatureChart = ({ 
  cycleData = generateSampleData(),
  ovulationDay = 14
}: TemperatureChartProps) => {
  const [selectedPoint, setSelectedPoint] = useState<TemperatureData | null>(null);

  // Calcular temperatura média por fase
  const phaseAverages = {
    follicular: cycleData.filter(d => d.day < ovulationDay).reduce((sum, d) => sum + d.temperature, 0) / ovulationDay || 36.3,
    luteal: cycleData.filter(d => d.day >= ovulationDay).reduce((sum, d) => sum + d.temperature, 0) / (cycleData.length - ovulationDay) || 36.7
  };

  const temperatureShift = phaseAverages.luteal - phaseAverages.follicular;

  // Custom dot para destacar a ovulação
  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (payload.day === ovulationDay) {
      return (
        <g>
          <circle cx={cx} cy={cy} r={6} fill="#fbbf24" stroke="#f59e0b" strokeWidth={2} />
          <circle cx={cx} cy={cy} r={10} fill="none" stroke="#fbbf24" strokeWidth={1} opacity={0.5} />
        </g>
      );
    }
    return <circle cx={cx} cy={cy} r={4} fill="#3b82f6" />;
  };

  // Tooltip customizado
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload[0]) {
      const data = payload[0].payload;
      return (
        <div className="glass-panel p-3 rounded-lg">
          <p className="text-sm font-medium text-white">Dia {data.day}</p>
          <p className="text-lg font-bold text-cyan-300">{data.temperature.toFixed(1)}°C</p>
          <p className="text-xs text-gray-400 capitalize">{data.phase}</p>
          {data.note && <p className="text-xs text-yellow-300 mt-1">{data.note}</p>}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {/* Gráfico Principal */}
      <div className="glass-card p-6 border-red-500/20">
        <h3 className="text-lg font-semibold text-red-300 mb-4 flex items-center gap-2">
          <Thermometer className="h-5 w-5" />
          Gráfico de Temperatura Basal
        </h3>

        <div className="h-64 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cycleData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="day" 
                stroke="#9CA3AF"
                label={{ value: 'Dia do Ciclo', position: 'insideBottom', offset: -5, style: { fill: '#9CA3AF' } }}
              />
              <YAxis 
                stroke="#9CA3AF"
                domain={[36.0, 37.2]}
                ticks={[36.0, 36.2, 36.4, 36.6, 36.8, 37.0, 37.2]}
                label={{ value: 'Temperatura (°C)', angle: -90, position: 'insideLeft', style: { fill: '#9CA3AF' } }}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Linha de referência para ovulação */}
              <ReferenceLine 
                x={ovulationDay} 
                stroke="#fbbf24" 
                strokeDasharray="5 5"
                label={{ value: "Ovulação", position: "top", fill: "#fbbf24" }}
              />
              
              {/* Linhas de referência para médias das fases */}
              <ReferenceLine 
                y={phaseAverages.follicular} 
                stroke="#3b82f6" 
                strokeDasharray="3 3"
                strokeOpacity={0.5}
              />
              <ReferenceLine 
                y={phaseAverages.luteal} 
                stroke="#ef4444" 
                strokeDasharray="3 3"
                strokeOpacity={0.5}
              />
              
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="#ef4444" 
                strokeWidth={2}
                dot={<CustomDot />}
                activeDot={{ r: 8, onClick: (e: any) => setSelectedPoint(e.payload) }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Indicadores */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-xs text-blue-300">Fase Folicular</span>
            </div>
            <div className="text-lg font-bold text-white">{phaseAverages.follicular.toFixed(2)}°C</div>
            <div className="text-xs text-gray-400">Média pré-ovulatória</div>
          </div>

          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-xs text-red-300">Fase Lútea</span>
            </div>
            <div className="text-lg font-bold text-white">{phaseAverages.luteal.toFixed(2)}°C</div>
            <div className="text-xs text-gray-400">Média pós-ovulatória</div>
          </div>

          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-xs text-green-300">Shift Térmico</span>
            </div>
            <div className="text-lg font-bold text-white">+{temperatureShift.toFixed(2)}°C</div>
            <div className="text-xs text-gray-400">Confirmação de ovulação</div>
          </div>
        </div>
      </div>

      {/* Interpretação */}
      <div className="glass-card p-4 border-cyan-500/20">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-cyan-300 mb-2">Interpretação do Gráfico</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>
                • Um aumento sustentado de 0.2-0.5°C após a ovulação indica mudança para fase lútea
              </p>
              <p>
                • Temperaturas consistentemente elevadas por 18+ dias podem indicar gravidez
              </p>
              <p>
                • Padrões irregulares podem sugerir ciclos anovulatórios
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ponto Selecionado */}
      {selectedPoint && (
        <div className="glass-card p-4 border-yellow-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-300">Detalhes do Dia {selectedPoint.day}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-gray-400">Temperatura</span>
              <p className="text-lg font-bold text-white">{selectedPoint.temperature.toFixed(1)}°C</p>
            </div>
            <div>
              <span className="text-xs text-gray-400">Fase</span>
              <p className="text-lg font-bold text-white capitalize">{selectedPoint.phase}</p>
            </div>
          </div>
          {selectedPoint.note && (
            <p className="text-sm text-yellow-200 mt-2">{selectedPoint.note}</p>
          )}
        </div>
      )}
    </div>
  );
};

// Função para gerar dados de exemplo
function generateSampleData(): TemperatureData[] {
  const data: TemperatureData[] = [];
  const baseTemp = 36.3;
  
  for (let day = 1; day <= 28; day++) {
    let temperature = baseTemp;
    let phase = "folicular";
    let note = "";
    
    if (day <= 5) {
      // Menstruação - temperaturas mais baixas
      temperature = baseTemp - 0.1 + (Math.random() * 0.2 - 0.1);
      phase = "menstrual";
    } else if (day <= 13) {
      // Fase folicular - temperaturas baixas estáveis
      temperature = baseTemp + (Math.random() * 0.2 - 0.1);
      phase = "folicular";
    } else if (day === 14) {
      // Dia da ovulação - queda térmica
      temperature = baseTemp - 0.2;
      phase = "ovulatória";
      note = "Provável ovulação";
    } else {
      // Fase lútea - temperaturas elevadas
      temperature = baseTemp + 0.4 + (Math.random() * 0.2 - 0.1);
      phase = "lútea";
    }
    
    data.push({
      day,
      temperature: parseFloat(temperature.toFixed(2)),
      phase,
      note
    });
  }
  
  return data;
}

export default TemperatureChart;