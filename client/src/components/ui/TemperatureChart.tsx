import { useState } from "react";
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Dot,
  ReferenceArea
} from "recharts";
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

function generateSampleData(): TemperatureData[] {
  const data: TemperatureData[] = [];
  const baseTemp = 36.3;

  for (let day = 1; day <= 28; day++) {
    let temperature = baseTemp;
    let phase = "folicular";
    let note = "";

    if (day <= 5) {
      temperature = baseTemp - 0.1 + (Math.random() * 0.2 - 0.1);
      phase = "menstrual";
    } else if (day <= 13) {
      temperature = baseTemp + (Math.random() * 0.15 - 0.05);
      phase = "folicular";
    } else if (day === 14) {
      temperature = baseTemp - 0.15;
      phase = "ovulatória";
      note = "Provável ovulação";
    } else {
      temperature = baseTemp + 0.4 + (Math.random() * 0.2 - 0.1);
      phase = "lútea";
    }

    data.push({ day, temperature: parseFloat(temperature.toFixed(2)), phase, note });
  }
  return data;
}

const PHASE_LABEL: Record<string, string> = {
  menstrual:  "Menstrual",
  folicular:  "Folicular",
  ovulatória: "Ovulatória",
  lútea:      "Lútea",
};

const PHASE_COLOR: Record<string, string> = {
  menstrual:  "#ef4444",
  folicular:  "#3b82f6",
  ovulatória: "#eab308",
  lútea:      "#14b8a6",
};

const CustomDot = (props: any) => {
  const { cx, cy, payload, ovulationDay } = props;
  if (!cx || !cy) return null;
  if (payload.day === ovulationDay) {
    return (
      <g>
        <circle cx={cx} cy={cy} r={7} fill="#fbbf24" stroke="#f59e0b" strokeWidth={2} />
        <circle cx={cx} cy={cy} r={12} fill="none" stroke="#fbbf24" strokeWidth={1} opacity={0.4} />
      </g>
    );
  }
  return <circle cx={cx} cy={cy} r={3} fill={PHASE_COLOR[payload.phase] || "#3b82f6"} opacity={0.8} />;
};

const TemperatureChart = ({
  cycleData = generateSampleData(),
  ovulationDay = 14
}: TemperatureChartProps) => {
  const [selectedPoint, setSelectedPoint] = useState<TemperatureData | null>(null);

  const follicularData = cycleData.filter(d => d.day < ovulationDay);
  const lutealData     = cycleData.filter(d => d.day >= ovulationDay);
  const follAvg = follicularData.length
    ? follicularData.reduce((s, d) => s + d.temperature, 0) / follicularData.length
    : 36.3;
  const lutealAvg = lutealData.length
    ? lutealData.reduce((s, d) => s + d.temperature, 0) / lutealData.length
    : 36.7;
  const shift = lutealAvg - follAvg;

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const data = payload[0].payload as TemperatureData;
    return (
      <div className="glass-panel border border-blue-500/20 rounded-lg p-3 text-xs">
        <p className="font-semibold text-blue-200 mb-1">Dia {data.day}</p>
        <p className="text-base font-bold text-red-300">{data.temperature.toFixed(2)}°C</p>
        <p className="text-blue-400/70 capitalize mt-0.5">{PHASE_LABEL[data.phase] || data.phase}</p>
        {data.note && <p className="text-yellow-300 mt-1">{data.note}</p>}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Main Chart */}
      <div className="glass-card rounded-2xl p-5 border border-red-500/20">
        <h3 className="text-base font-semibold text-red-300 mb-4 flex items-center gap-2">
          <Thermometer className="h-5 w-5" />
          Gráfico de Temperatura Basal
        </h3>

        <div className="h-64 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={cycleData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>

              {/* Phase background zones */}
              <ReferenceArea x1={1} x2={5}            fill="#ef4444" fillOpacity={0.05} />
              <ReferenceArea x1={6} x2={ovulationDay - 2} fill="#3b82f6" fillOpacity={0.05} />
              <ReferenceArea x1={ovulationDay - 1} x2={ovulationDay + 1} fill="#eab308" fillOpacity={0.08} />
              <ReferenceArea x1={ovulationDay + 2} x2={cycleData.length} fill="#14b8a6" fillOpacity={0.05} />

              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="day"
                stroke="#60a5fa"
                tick={{ fontSize: 10 }}
                label={{ value: "Dia do Ciclo", position: "insideBottom", offset: -10, style: { fill: "#60a5fa", fontSize: 10 } }}
              />
              <YAxis
                stroke="#60a5fa"
                domain={[35.9, 37.3]}
                ticks={[36.0, 36.2, 36.4, 36.6, 36.8, 37.0, 37.2]}
                tick={{ fontSize: 10 }}
                label={{ value: "°C", angle: -90, position: "insideLeft", style: { fill: "#60a5fa", fontSize: 10 } }}
              />
              <Tooltip content={<CustomTooltip />} />

              {/* Ovulation vertical line */}
              <ReferenceLine
                x={ovulationDay}
                stroke="#fbbf24"
                strokeDasharray="5 5"
                strokeOpacity={0.8}
                label={{ value: "Ovulação", position: "top", fill: "#fbbf24", fontSize: 9 }}
              />

              {/* Phase average lines */}
              <ReferenceLine y={follAvg}  stroke="#3b82f6" strokeDasharray="4 4" strokeOpacity={0.5} />
              <ReferenceLine y={lutealAvg} stroke="#14b8a6" strokeDasharray="4 4" strokeOpacity={0.5} />

              <Area
                type="monotone"
                dataKey="temperature"
                stroke="#ef4444"
                strokeWidth={2}
                fill="url(#tempGradient)"
                dot={(props: any) => <CustomDot {...props} ovulationDay={ovulationDay} />}
                activeDot={{ r: 7, fill: "#ef4444", onClick: (_: any, payload: any) => setSelectedPoint(payload?.payload || null) }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl p-3 bg-blue-500/10 border border-blue-500/20">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-xs text-blue-300 font-medium">Fase Folicular</span>
            </div>
            <div className="text-lg font-bold text-white">{follAvg.toFixed(2)}°C</div>
            <div className="text-xs text-blue-400/60">Média pré-ovulatória</div>
          </div>

          <div className="rounded-xl p-3 bg-teal-500/10 border border-teal-500/20">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-2 h-2 rounded-full bg-teal-500" />
              <span className="text-xs text-teal-300 font-medium">Fase Lútea</span>
            </div>
            <div className="text-lg font-bold text-white">{lutealAvg.toFixed(2)}°C</div>
            <div className="text-xs text-blue-400/60">Média pós-ovulatória</div>
          </div>

          <div className="rounded-xl p-3 bg-green-500/10 border border-green-500/20">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingUp className="h-3.5 w-3.5 text-green-400" />
              <span className="text-xs text-green-300 font-medium">Shift Térmico</span>
            </div>
            <div className="text-lg font-bold text-white">+{shift.toFixed(2)}°C</div>
            <div className="text-xs text-blue-400/60">Confirmação ovulação</div>
          </div>
        </div>

        {/* Phase zone legend */}
        <div className="flex flex-wrap gap-3 mt-4">
          {[
            { label: "Menstrual", color: "#ef4444" },
            { label: "Folicular", color: "#3b82f6" },
            { label: "Ovulatória", color: "#eab308" },
            { label: "Lútea", color: "#14b8a6" },
          ].map(p => (
            <div key={p.label} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full opacity-70" style={{ backgroundColor: p.color }} />
              <span className="text-xs text-blue-400/60">{p.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interpretation */}
      <div className="glass-card rounded-2xl p-4 border border-cyan-500/20">
        <div className="flex items-start gap-3">
          <Info className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-cyan-300 mb-2">Interpretação do Gráfico</h4>
            <ul className="space-y-1.5 text-xs text-blue-300/70">
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-0.5">•</span>Aumento sustentado de 0.2–0.5°C após a ovulação indica início da fase lútea</li>
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-0.5">•</span>Temperaturas elevadas por 18+ dias consecutivos podem indicar gravidez</li>
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-0.5">•</span>Padrões sem bifase clara podem sugerir ciclos anovulatórios</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Selected Point Details */}
      {selectedPoint && (
        <div className="glass-card rounded-2xl p-4 border border-yellow-500/20">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-semibold text-yellow-300">Detalhes — Dia {selectedPoint.day}</span>
            <button onClick={() => setSelectedPoint(null)} className="ml-auto text-xs text-blue-400 hover:text-blue-200">✕</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-blue-400/60 mb-0.5">Temperatura</div>
              <div className="text-xl font-bold text-white">{selectedPoint.temperature.toFixed(2)}°C</div>
            </div>
            <div>
              <div className="text-xs text-blue-400/60 mb-0.5">Fase</div>
              <div className="text-xl font-bold text-white capitalize">{PHASE_LABEL[selectedPoint.phase] || selectedPoint.phase}</div>
            </div>
          </div>
          {selectedPoint.note && (
            <div className="mt-3 p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <p className="text-xs text-yellow-200">{selectedPoint.note}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TemperatureChart;
