import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Check, 
  X, 
  Sparkles, 
  Shield, 
  Crown, 
  CreditCard,
  AlertCircle,
  Loader2,
  ChevronRight
} from "lucide-react";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Tipos para a resposta da API
interface SubscriptionStatus {
  plan: string;
  subscriptionStatus: string;
  monthlyCredits: number;
  usedCredits: number;
  subscriptionEndDate?: string;
}

// Configurar Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

// Componente de formulário de pagamento
function PaymentForm({ planId, priceId, onSuccess }: { 
  planId: string; 
  priceId: string;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/subscription?success=true`,
      },
      redirect: 'if_required'
    });

    if (error) {
      toast({
        title: "Erro no pagamento",
        description: error.message,
        variant: "destructive",
      });
      setIsProcessing(false);
    } else {
      toast({
        title: "Pagamento confirmado!",
        description: "Sua assinatura foi ativada com sucesso.",
      });
      onSuccess();
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <Button 
        type="submit" 
        disabled={!stripe || isProcessing}
        className="w-full"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processando...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-4 w-4" />
            Confirmar Assinatura
          </>
        )}
      </Button>
    </form>
  );
}

export default function Subscription() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Verificar se o pagamento foi bem-sucedido via URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      toast({
        title: "Pagamento confirmado!",
        description: "Sua assinatura foi ativada com sucesso.",
      });
      // Limpar o parâmetro da URL
      window.history.replaceState({}, '', '/subscription');
      // Recarregar dados do usuário
      queryClient.invalidateQueries({ queryKey: ['/api/subscription-status'] });
    }
  }, [toast]);

  // Buscar status da assinatura
  const { data: subscriptionStatus, isLoading: statusLoading } = useQuery<SubscriptionStatus>({
    queryKey: ['/api/subscription-status'],
    enabled: isAuthenticated,
    retry: false
  });

  // Planos disponíveis
  const plans = [
    {
      id: 'free',
      name: 'Básico',
      price: 0,
      priceId: null,
      credits: 0,
      features: [
        'Resultados parciais das calculadoras',
        'Calculadora de Fertilidade (básica)',
        'Calculadora Gestacional (básica)',
        'Visualização limitada'
      ],
      limitations: [
        'Sem resultados completos',
        'Sem histórico',
        'Sem relatórios PDF',
        'Sem análise avançada',
        'Sem suporte prioritário'
      ]
    },
    {
      id: 'professional',
      name: 'Assinatura',
      price: 29.90,
      priceId: 'price_professional', // Substituir com ID real do Stripe
      credits: -1,
      popular: true,
      features: [
        'Cálculos ilimitados',
        'Todas as calculadoras',
        'Histórico completo',
        'Relatórios em PDF',
        'Análise avançada de ciclos',
        'Gráficos interativos',
        'Suporte prioritário'
      ],
      limitations: []
    }
  ];

  // Mutação para criar assinatura
  const createSubscriptionMutation = useMutation({
    mutationFn: async ({ priceId, planId }: { priceId: string; planId: string }) => {
      return await apiRequest('POST', '/api/create-subscription', {
        priceId,
        planId
      });
    },
    onSuccess: (data: any) => {
      setClientSecret(data.clientSecret);
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao criar assinatura",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Mutação para cancelar assinatura
  const cancelSubscriptionMutation = useMutation<any, Error>({
    mutationFn: async () => {
      return await apiRequest('POST', '/api/cancel-subscription');
    },
    onSuccess: () => {
      toast({
        title: "Assinatura cancelada",
        description: "Sua assinatura foi cancelada com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/subscription-status'] });
      setSelectedPlan(null);
      setClientSecret(null);
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao cancelar assinatura",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handlePlanSelection = (planId: string, priceId: string | null) => {
    if (!priceId || planId === 'free') {
      toast({
        title: "Plano gratuito",
        description: "Você já está usando o plano gratuito.",
      });
      return;
    }

    if (subscriptionStatus && planId === subscriptionStatus.plan) {
      toast({
        title: "Plano atual",
        description: "Você já está usando este plano.",
      });
      return;
    }

    setSelectedPlan(planId);
    createSubscriptionMutation.mutate({ priceId, planId });
  };

  const handlePaymentSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['/api/subscription-status'] });
    setSelectedPlan(null);
    setClientSecret(null);
  };

  // Redirecionar para login se não autenticado
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Não autorizado",
        description: "Você precisa fazer login para acessar esta página.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [isAuthenticated, authLoading, toast]);

  if (authLoading || statusLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
      </div>
    );
  }

  const currentPlan = plans.find(p => p.id === (subscriptionStatus?.plan || 'free')) || plans[0];
  const creditsPercentage = subscriptionStatus?.monthlyCredits === -1 
    ? 100 
    : ((subscriptionStatus?.monthlyCredits || 0) - (subscriptionStatus?.usedCredits || 0)) / (subscriptionStatus?.monthlyCredits || 1) * 100;

  return (
    <div className="min-h-screen tech-bg">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel tech-border mb-6">
            <CreditCard className="h-4 w-4 text-cyan-400" />
            <span className="text-cyan-300 font-medium text-sm tech-text-glow">
              Planos e Assinaturas
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 tech-text-glow">
            Gerenciar Assinatura
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
            Escolha o plano ideal para suas necessidades de saúde reprodutiva
          </p>
        </div>

        {/* Status atual */}
        <Card className="mb-8 glass-card tech-border hover:shadow-xl transition-all">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Status da Assinatura</span>
              <Badge 
                variant={subscriptionStatus?.subscriptionStatus === 'active' ? 'default' : 'secondary'}
                className="bg-cyan-600 text-white"
              >
                {subscriptionStatus?.subscriptionStatus === 'active' ? 'Ativa' : 
                 subscriptionStatus?.subscriptionStatus === 'past_due' ? 'Pagamento Pendente' :
                 subscriptionStatus?.subscriptionStatus === 'cancelled' ? 'Cancelada' : 'Inativa'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-blue-300">Plano atual:</span>
              <span className="font-semibold flex items-center">
                {currentPlan.id === 'free' && <Shield className="h-4 w-4 mr-2 text-blue-400" />}
                {currentPlan.id === 'professional' && <Sparkles className="h-4 w-4 mr-2 text-cyan-500" />}
                {currentPlan.id === 'premium' && <Crown className="h-4 w-4 mr-2 text-yellow-500" />}
                {currentPlan.name}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-blue-300">Créditos disponíveis:</span>
                <span className="font-semibold">
                  {subscriptionStatus?.monthlyCredits === -1 ? 
                    'Ilimitados' : 
                    `${(subscriptionStatus?.monthlyCredits || 0) - (subscriptionStatus?.usedCredits || 0)} / ${subscriptionStatus?.monthlyCredits || 0}`
                  }
                </span>
              </div>
              {subscriptionStatus?.monthlyCredits !== -1 && (
                <Progress value={creditsPercentage} className="h-2" />
              )}
            </div>

            {subscriptionStatus?.subscriptionEndDate && (
              <div className="flex items-center justify-between">
                <span className="text-blue-300">Próxima renovação:</span>
                <span className="font-semibold">
                  {new Date(subscriptionStatus.subscriptionEndDate).toLocaleDateString('pt-BR')}
                </span>
              </div>
            )}

            {subscriptionStatus?.plan !== 'free' && (
              <Button
                variant="outline"
                className="w-full border-red-200 text-red-600 hover:bg-red-50"
                onClick={() => cancelSubscriptionMutation.mutate()}
                disabled={cancelSubscriptionMutation.isPending}
              >
                {cancelSubscriptionMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Cancelando...
                  </>
                ) : (
                  <>
                    <X className="mr-2 h-4 w-4" />
                    Cancelar Assinatura
                  </>
                )}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Modal de pagamento */}
        {clientSecret && selectedPlan && (
          <Card className="mb-8 border-cyan-200 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Finalizar Assinatura</CardTitle>
              <CardDescription>
                Complete o pagamento para ativar o plano {plans.find(p => p.id === selectedPlan)?.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <PaymentForm 
                  planId={selectedPlan}
                  priceId={plans.find(p => p.id === selectedPlan)?.priceId || ''}
                  onSuccess={handlePaymentSuccess}
                />
              </Elements>
            </CardContent>
          </Card>
        )}

        {/* Planos disponíveis */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative border-2 transition-all hover:shadow-xl ${
                plan.popular ? 'border-cyan-400 shadow-lg' : 'border-gray-200'
              } ${currentPlan.id === plan.id ? 'ring-2 ring-cyan-500' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-cyan-600 text-white">
                    Mais Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center">
                <div className="mb-4">
                  {plan.id === 'free' && <Shield className="h-12 w-12 mx-auto text-gray-500" />}
                  {plan.id === 'professional' && <Sparkles className="h-12 w-12 mx-auto text-cyan-500" />}
                  {plan.id === 'premium' && <Crown className="h-12 w-12 mx-auto text-yellow-500" />}
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    {plan.price === 0 ? 'Grátis' : `R$ ${plan.price.toFixed(2)}`}
                  </span>
                  {plan.price > 0 && <span className="text-gray-600">/mês</span>}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {plan.credits === -1 ? 'Cálculos ilimitados' : `${plan.credits} cálculos/mês`}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, index) => (
                    <div key={index} className="flex items-start">
                      <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-500">{limitation}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full ${
                    currentPlan.id === plan.id 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : plan.popular 
                        ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                        : ''
                  }`}
                  disabled={currentPlan.id === plan.id || createSubscriptionMutation.isPending}
                  onClick={() => handlePlanSelection(plan.id, plan.priceId)}
                >
                  {currentPlan.id === plan.id ? (
                    'Plano Atual'
                  ) : createSubscriptionMutation.isPending && selectedPlan === plan.id ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      Escolher Plano
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Informação adicional */}
        <Card className="mt-8 border-yellow-200 bg-yellow-50/50">
          <CardContent className="pt-6">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="text-sm text-gray-700">
                  <strong>Informações importantes:</strong>
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li>Você pode cancelar sua assinatura a qualquer momento</li>
                  <li>Ao cancelar, você mantém o acesso até o final do período pago</li>
                  <li>Os créditos não utilizados expiram ao final de cada mês</li>
                  <li>Todos os pagamentos são processados de forma segura pelo Stripe</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}