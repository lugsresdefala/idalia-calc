import { useState } from "react";
import { Link } from "wouter";
import { 
  Calculator, 
  Calendar, 
  Heart, 
  TrendingUp,
  Thermometer,
  Droplets,
  Baby,
  ChevronRight,
  Sparkles
} from "lucide-react";

const MobileHome = () => {
  const [activeCalculator, setActiveCalculator] = useState<'fertility' | 'gestational' | null>(null);

  const calculators = [
    {
      id: 'fertility',
      title: 'Calculadora de Fertilidade',
      subtitle: 'Janela fértil e ovulação',
      icon: Calendar,
      color: 'from-pink-500 to-rose-400',
      borderColor: 'border-pink-500/30',
      bgColor: 'bg-pink-500/10',
      description: 'Calcule sua janela fértil baseada no ciclo menstrual e características biológicas',
      features: ['Período fértil', 'Data da ovulação', 'Análise do muco cervical', 'Temperatura basal']
    },
    {
      id: 'gestational',
      title: 'Calculadora Gestacional',
      subtitle: 'Idade gestacional e marcos',
      icon: Baby,
      color: 'from-blue-500 to-cyan-400',
      borderColor: 'border-blue-500/30',
      bgColor: 'bg-blue-500/10',
      description: 'Acompanhe o desenvolvimento fetal e marcos importantes da gestação',
      features: ['Idade gestacional', 'Desenvolvimento fetal', 'Exames recomendados', 'Vacinas pré-natais']
    }
  ];

  const quickActions = [
    {
      title: 'Dashboard',
      subtitle: 'Visão geral dos seus dados',
      icon: TrendingUp,
      href: '/dashboard',
      color: 'text-cyan-300',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30'
    },
    {
      title: 'Temperatura Basal',
      subtitle: 'Registrar medição',
      icon: Thermometer,
      href: '/dashboard',
      color: 'text-red-300',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30'
    },
    {
      title: 'Muco Cervical',
      subtitle: 'Anotar observações',
      icon: Droplets,
      href: '/dashboard',
      color: 'text-teal-300',
      bgColor: 'bg-teal-500/10',
      borderColor: 'border-teal-500/30'
    },
    {
      title: 'Ciclo Menstrual',
      subtitle: 'Registrar período',
      icon: Calendar,
      href: '/dashboard',
      color: 'text-purple-300',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30'
    }
  ];

  return (
    <div className="min-h-screen tech-bg">
      
      <div className="mobile-container pb-20">
        {/* Hero Section */}
        <div className="mobile-section">
        <div className="text-center mb-6">
          <div className="mb-4">
            <Sparkles className="h-12 w-12 mx-auto text-yellow-400 mb-2" />
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-yellow-400">
              Boas-vindas à Idalia Calc
            </h1>
            <p className="mobile-caption mt-2">
              Sua plataforma de saúde reprodutiva
            </p>
          </div>
        </div>
      </div>

      {/* Calculadoras Principais */}
      <div className="mobile-section">
        <h2 className="mobile-subtitle text-white mb-4">Calculadoras Médicas</h2>
        <div className="space-y-4">
          {calculators.map((calc) => (
            <div
              key={calc.id}
              className={`
                mobile-card ${calc.bgColor} border ${calc.borderColor}
                ${activeCalculator === calc.id ? 'ring-2 ring-white/20' : ''}
              `}
              onClick={() => setActiveCalculator(activeCalculator === calc.id ? null : calc.id as any)}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${calc.color}`}>
                  <calc.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="mobile-subtitle text-white">{calc.title}</h3>
                  <p className="mobile-caption mb-2">{calc.subtitle}</p>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {calc.description}
                  </p>
                </div>
                <ChevronRight 
                  className={`h-5 w-5 text-white/40 transition-transform duration-200 ${
                    activeCalculator === calc.id ? 'rotate-90' : ''
                  }`} 
                />
              </div>

              {/* Expandable Features */}
              {activeCalculator === calc.id && (
                <div className="mt-4 pt-4 border-t border-white/10 animate-in slide-in-from-top duration-200">
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {calc.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-yellow-400"></div>
                        <span className="text-xs text-white/70">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mobile-button bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 py-3 border border-cyan-500/30">
                    <Calculator className="h-4 w-4 inline mr-2" />
                    Abrir Calculadora
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="mobile-section">
        <h2 className="mobile-subtitle text-white mb-4">Ações Rápidas</h2>
        <div className="mobile-grid-2">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className={`
                mobile-card ${action.bgColor} border ${action.borderColor}
                block text-center
              `}
            >
              <action.icon className={`h-8 w-8 mx-auto mb-2 ${action.color}`} />
              <h3 className="font-semibold text-white text-sm mb-1">{action.title}</h3>
              <p className="text-xs text-white/60">{action.subtitle}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Info Card */}
      <div className="mobile-section">
        <div className="mobile-card bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
          <div className="text-center">
            <Heart className="h-8 w-8 mx-auto mb-3 text-indigo-400" />
            <h3 className="mobile-subtitle text-white">Baseado em Evidências</h3>
            <p className="mobile-caption">
              Algoritmos desenvolvidos seguindo recomendações da Febrasgo e ACOG
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MobileHome;