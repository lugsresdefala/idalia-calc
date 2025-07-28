import { useState, useEffect } from "react";
import { 
  Calendar, 
  Heart, 
  Droplets, 
  Thermometer,
  CircleDot,
  Activity,
  TrendingUp
} from "lucide-react";

interface CycleVisualizationProps {
  cycleLength?: number;
  currentDay?: number;
  periodLength?: number;
  ovulationDay?: number;
}

const CycleVisualization = ({ 
  cycleLength = 28, 
  currentDay = 14, 
  periodLength = 5,
  ovulationDay = 14 
}: CycleVisualizationProps) => {
  const [selectedDay, setSelectedDay] = useState(currentDay);

  // Calcular fases do ciclo
  const phases = {
    menstrual: { start: 1, end: periodLength, color: "from-red-500 to-red-400", label: "Menstrual" },
    follicular: { start: periodLength + 1, end: ovulationDay - 2, color: "from-blue-500 to-blue-400", label: "Folicular" },
    ovulatory: { start: ovulationDay - 1, end: ovulationDay + 1, color: "from-yellow-500 to-amber-400", label: "Ovulatório" },
    luteal: { start: ovulationDay + 2, end: cycleLength, color: "from-purple-500 to-purple-400", label: "Lútea" }
  };

  // Determinar fase atual
  const getCurrentPhase = (day: number) => {
    if (day <= phases.menstrual.end) return phases.menstrual;
    if (day <= phases.follicular.end) return phases.follicular;
    if (day <= phases.ovulatory.end) return phases.ovulatory;
    return phases.luteal;
  };

  const currentPhase = getCurrentPhase(selectedDay);

  // Calcular fertilidade
  const getFertilityLevel = (day: number) => {
    const distanceFromOvulation = Math.abs(day - ovulationDay);
    if (distanceFromOvulation === 0) return { level: 100, label: "Pico de Fertilidade", color: "from-green-500 to-emerald-400" };
    if (distanceFromOvulation <= 1) return { level: 90, label: "Muito Alta", color: "from-green-400 to-emerald-300" };
    if (distanceFromOvulation <= 3) return { level: 70, label: "Alta", color: "from-yellow-400 to-amber-300" };
    if (distanceFromOvulation <= 5) return { level: 40, label: "Moderada", color: "from-orange-400 to-orange-300" };
    return { level: 10, label: "Baixa", color: "from-gray-400 to-gray-300" };
  };

  const fertility = getFertilityLevel(selectedDay);

  // Características biológicas por dia
  const getDayCharacteristics = (day: number) => {
    const phase = getCurrentPhase(day);
    
    if (phase.label === "Menstrual") {
      return {
        mucus: { type: "Ausente", icon: Droplets, color: "text-gray-400" },
        temperature: { trend: "Baixa", icon: Thermometer, color: "text-blue-400" },
        hormones: { dominant: "Baixo estrogênio", icon: Activity, color: "text-red-400" }
      };
    }
    
    if (phase.label === "Folicular") {
      return {
        mucus: { type: "Cremoso", icon: Droplets, color: "text-blue-300" },
        temperature: { trend: "Estável baixa", icon: Thermometer, color: "text-blue-400" },
        hormones: { dominant: "Estrogênio crescente", icon: Activity, color: "text-blue-400" }
      };
    }
    
    if (phase.label === "Ovulatório") {
      return {
        mucus: { type: "Clara de ovo", icon: Droplets, color: "text-cyan-400" },
        temperature: { trend: "Pico baixo", icon: Thermometer, color: "text-yellow-400" },
        hormones: { dominant: "Pico de LH", icon: Activity, color: "text-yellow-400" }
      };
    }
    
    return {
      mucus: { type: "Espesso", icon: Droplets, color: "text-purple-300" },
      temperature: { trend: "Elevada", icon: Thermometer, color: "text-red-400" },
      hormones: { dominant: "Progesterona alta", icon: Activity, color: "text-purple-400" }
    };
  };

  const characteristics = getDayCharacteristics(selectedDay);

  // Criar array de dias do ciclo
  const cycleDays = Array.from({ length: cycleLength }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      {/* Visualização Circular do Ciclo */}
      <div className="glass-card p-6 border-cyan-500/20">
        <h3 className="text-lg font-semibold text-cyan-300 mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Visualização do Ciclo Menstrual
        </h3>
        
        {/* Círculo do Ciclo */}
        <div className="relative mx-auto" style={{ width: '300px', height: '300px' }}>
          <svg className="w-full h-full" viewBox="0 0 300 300">
            {/* Fases do ciclo em arcos */}
            {Object.entries(phases).map(([key, phase]) => {
              const startAngle = ((phase.start - 1) / cycleLength) * 360 - 90;
              const endAngle = (phase.end / cycleLength) * 360 - 90;
              const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
              
              const startX = 150 + 120 * Math.cos((startAngle * Math.PI) / 180);
              const startY = 150 + 120 * Math.sin((startAngle * Math.PI) / 180);
              const endX = 150 + 120 * Math.cos((endAngle * Math.PI) / 180);
              const endY = 150 + 120 * Math.sin((endAngle * Math.PI) / 180);
              
              return (
                <g key={key}>
                  <defs>
                    <linearGradient id={`gradient-${key}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" className={`${phase.color.split(' ')[1]}`} stopColor="currentColor" />
                      <stop offset="100%" className={`${phase.color.split(' ')[2]}`} stopColor="currentColor" />
                    </linearGradient>
                  </defs>
                  <path
                    d={`M ${startX} ${startY} A 120 120 0 ${largeArcFlag} 1 ${endX} ${endY}`}
                    fill="none"
                    stroke={`url(#gradient-${key})`}
                    strokeWidth="30"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                </g>
              );
            })}
            
            {/* Dias do ciclo */}
            {cycleDays.map((day) => {
              const angle = ((day - 1) / cycleLength) * 360 - 90;
              const x = 150 + 120 * Math.cos((angle * Math.PI) / 180);
              const y = 150 + 120 * Math.sin((angle * Math.PI) / 180);
              const isSelected = day === selectedDay;
              const isCurrent = day === currentDay;
              
              return (
                <g key={day}>
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? "12" : "8"}
                    fill={isCurrent ? "#0ea5e9" : isSelected ? "#fbbf24" : "#374151"}
                    stroke={isSelected ? "#fbbf24" : "none"}
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-200 hover:scale-125"
                    onClick={() => setSelectedDay(day)}
                  />
                  {(day === 1 || day % 5 === 0 || day === ovulationDay) && (
                    <text
                      x={x}
                      y={y - 15}
                      textAnchor="middle"
                      className="text-xs fill-white font-medium"
                    >
                      {day}
                    </text>
                  )}
                </g>
              );
            })}
            
            {/* Centro com informações */}
            <g>
              <circle cx="150" cy="150" r="60" fill="rgba(0,0,0,0.5)" />
              <text x="150" y="140" textAnchor="middle" className="text-3xl font-bold fill-white">
                Dia {selectedDay}
              </text>
              <text x="150" y="160" textAnchor="middle" className="text-sm fill-gray-300">
                {currentPhase.label}
              </text>
              <text x="150" y="175" textAnchor="middle" className="text-xs fill-gray-400">
                de {cycleLength} dias
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* Cards de Informações */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Fertilidade */}
        <div className="glass-card p-4 border-green-500/20">
          <h4 className="text-sm font-medium text-green-300 mb-3 flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Fertilidade do Dia {selectedDay}
          </h4>
          <div className="space-y-3">
            <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`absolute left-0 top-0 h-full bg-gradient-to-r ${fertility.color} transition-all duration-500`}
                style={{ width: `${fertility.level}%` }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">{fertility.label}</span>
              <span className="text-lg font-bold text-white">{fertility.level}%</span>
            </div>
          </div>
        </div>

        {/* Características do Dia */}
        <div className="glass-card p-4 border-purple-500/20">
          <h4 className="text-sm font-medium text-purple-300 mb-3 flex items-center gap-2">
            <CircleDot className="h-4 w-4" />
            Características Biológicas
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <characteristics.mucus.icon className={`h-4 w-4 ${characteristics.mucus.color}`} />
                <span className="text-sm text-gray-300">Muco:</span>
              </div>
              <span className="text-sm font-medium text-white">{characteristics.mucus.type}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <characteristics.temperature.icon className={`h-4 w-4 ${characteristics.temperature.color}`} />
                <span className="text-sm text-gray-300">Temperatura:</span>
              </div>
              <span className="text-sm font-medium text-white">{characteristics.temperature.trend}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <characteristics.hormones.icon className={`h-4 w-4 ${characteristics.hormones.color}`} />
                <span className="text-sm text-gray-300">Hormônios:</span>
              </div>
              <span className="text-sm font-medium text-white">{characteristics.hormones.dominant}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Linear */}
      <div className="glass-card p-4 border-blue-500/20">
        <h4 className="text-sm font-medium text-blue-300 mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Timeline do Ciclo
        </h4>
        <div className="overflow-x-auto">
          <div className="flex gap-1 min-w-max pb-2">
            {cycleDays.map((day) => {
              const phase = getCurrentPhase(day);
              const isSelected = day === selectedDay;
              const isCurrent = day === currentDay;
              
              return (
                <div
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`
                    flex-shrink-0 w-8 h-20 rounded-lg cursor-pointer transition-all duration-200
                    ${isSelected ? 'ring-2 ring-yellow-400 scale-110' : 'hover:scale-105'}
                    ${isCurrent ? 'ring-2 ring-cyan-400' : ''}
                  `}
                >
                  <div 
                    className={`w-full h-full rounded-lg bg-gradient-to-b ${phase.color} opacity-60 flex items-end justify-center pb-1`}
                  >
                    <span className="text-xs font-medium text-white">{day}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CycleVisualization;