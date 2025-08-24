import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Shield, Lock, CreditCard, Sparkles, Baby, Calculator } from "lucide-react";
import { Link, useLocation } from "wouter";

// Carregar Stripe com a chave pública
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-complete`,
        },
      });

      if (error) {
        toast({
          title: "Erro no Pagamento",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (err: any) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao processar o pagamento",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="glass-card border-blue-400/30">
        <CardHeader className="glass-header">
          <CardTitle className="text-lg text-cyan-300">Resumo do Pedido</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-blue-200">Plano:</span>
              <span className="font-semibold text-cyan-300">Premium</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-200">Período:</span>
              <span className="font-semibold text-cyan-300">Mensal</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-blue-500/30">
              <span className="font-semibold text-blue-100">Total:</span>
              <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">R$ 29,90/mês</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-blue-400/30">
        <CardHeader className="glass-header">
          <CardTitle className="text-lg flex items-center gap-2 text-cyan-300">
            <CreditCard className="h-5 w-5 text-cyan-400 tech-glow" />
            Informações de Pagamento
          </CardTitle>
          <CardDescription className="text-blue-200">
            Seus dados são protegidos com criptografia de ponta a ponta
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="glass-panel p-4 rounded-lg tech-border">
            <PaymentElement 
              options={{
                layout: "tabs",
                paymentMethodOrder: ['card']
              }}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center gap-6 text-sm text-blue-300">
        <div className="flex items-center gap-1">
          <Shield className="h-4 w-4 text-cyan-400 tech-glow" />
          <span>Pagamento Seguro</span>
        </div>
        <div className="flex items-center gap-1">
          <Lock className="h-4 w-4 text-cyan-400 tech-glow" />
          <span>SSL Criptografado</span>
        </div>
      </div>

      <Button 
        type="submit"
        disabled={!stripe || !elements || isProcessing}
        className="w-full tech-button py-6 text-lg font-semibold"
      >
        {isProcessing ? (
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            Processando...
          </div>
        ) : (
          <>
            Confirmar Assinatura de R$ 29,90/mês
            <CheckCircle className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>
    </form>
  );
};

export default function Checkout() {
  const { isAuthenticated, user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Verificar autenticação
    if (!isAuthenticated) {
      toast({
        title: "Login Necessário",
        description: "Você precisa fazer login para assinar o plano.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 2000);
      return;
    }

    // Criar ou recuperar assinatura
    const initializePayment = async () => {
      try {
        const response = await apiRequest("POST", "/api/get-or-create-subscription");
        const data = await response.json();
        
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else if (data.subscriptionId) {
          // Usuário já tem assinatura ativa
          toast({
            title: "Assinatura Ativa",
            description: "Você já possui uma assinatura ativa!",
          });
          setLocation("/");
        } else {
          throw new Error("Resposta inválida do servidor");
        }
      } catch (error) {
        console.error("Erro ao inicializar pagamento:", error);
        toast({
          title: "Erro",
          description: "Não foi possível iniciar o checkout. Tente novamente.",
          variant: "destructive",
        });
        setLocation("/subscription");
      } finally {
        setLoading(false);
      }
    };

    initializePayment();
  }, [isAuthenticated, toast, setLocation]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 p-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="glass-card border-blue-400/30 mt-20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-cyan-300 mb-4">
                Preparando Checkout...
              </h2>
              <p className="text-blue-200 mb-6">
                Aguarde enquanto preparamos sua sessão de pagamento.
              </p>
              <Button
                onClick={() => setLocation("/subscription")}
                variant="outline"
                className="border-cyan-400 text-cyan-300"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-header border-b border-blue-500/30">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setLocation("/subscription")}
                className="p-2 hover:bg-blue-800/30 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-cyan-400" />
              </button>
              <div className="flex items-center gap-3">
                <img 
                  src="/idalia-logo.png" 
                  alt="Idalia Calc" 
                  className="h-10 w-10 drop-shadow-md"
                />
                <div>
                  <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-200 tech-text-glow">
                    Checkout Seguro
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto max-w-2xl px-4 py-12">
        <Card className="glass-card border-blue-400/30 mb-8">
          <CardHeader className="glass-header text-center">
            <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-200 tech-text-glow mb-2">
              Complete sua Assinatura
            </CardTitle>
            <CardDescription className="text-blue-200">
              Acesso completo às calculadoras e funcionalidades premium
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Benefícios */}
        <Card className="glass-card border-blue-400/30 mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-cyan-300 mb-4">O que você recebe:</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-blue-200">Análise completa de fertilidade e ciclo menstrual</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-blue-200">Cálculos gestacionais detalhados com desenvolvimento fetal</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-blue-200">Gráficos e visualizações avançadas</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-blue-200">Histórico completo de cálculos</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-blue-200">Recomendações personalizadas</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Elements 
          stripe={stripePromise} 
          options={{ 
            clientSecret,
            appearance: {
              theme: 'night',
              variables: {
                colorPrimary: '#06b6d4',
                colorBackground: '#0f172a',
                colorText: '#e2e8f0',
                colorDanger: '#ef4444',
                borderRadius: '8px',
              },
            },
          }}
        >
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
}