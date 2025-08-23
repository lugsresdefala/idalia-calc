import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Shield, Clock, CreditCard } from "lucide-react";
import { useLocation } from "wouter";

// Carregar Stripe com a chave pública
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ planId, planName, planPrice }: { planId: string; planName: string; planPrice: string }) => {
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
          return_url: `${window.location.origin}/payment-success`,
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
      <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
        <CardHeader>
          <CardTitle className="text-lg">Resumo do Pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-600">Plano:</span>
              <span className="font-semibold text-slate-800">{planName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Valor:</span>
              <span className="font-semibold text-slate-800">{planPrice}/mês</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-teal-200">
              <span className="font-semibold text-slate-700">Total:</span>
              <span className="font-bold text-lg text-teal-700">{planPrice}/mês</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-teal-600" />
            Informações de Pagamento
          </CardTitle>
          <CardDescription>
            Seus dados são protegidos com criptografia de ponta a ponta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PaymentElement 
            options={{
              layout: "tabs",
              paymentMethodOrder: ['card']
            }}
          />
        </CardContent>
      </Card>

      <div className="flex items-center justify-center gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-1">
          <Shield className="h-3 w-3 text-emerald-600" />
          <span>Pagamento Seguro</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3 text-teal-600" />
          <span>Cancele quando quiser</span>
        </div>
      </div>

      <Button 
        type="submit"
        disabled={!stripe || !elements || isProcessing}
        className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold py-6"
      >
        {isProcessing ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            Processando...
          </div>
        ) : (
          <>
            Confirmar Assinatura de {planPrice}/mês
            <CheckCircle className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>
    </form>
  );
};

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Obter plano da URL ou usar padrão
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const planId = params.get('plan') || 'professional';
    
    // Definir plano baseado no ID
    const plans: Record<string, any> = {
      professional: {
        id: 'professional',
        name: 'Essencial',
        price: 'R$ 19',
        stripePriceId: 'price_essential' // Você precisa criar este price ID no Stripe
      },
      premium: {
        id: 'premium', 
        name: 'Premium',
        price: 'R$ 39',
        stripePriceId: 'price_premium' // Você precisa criar este price ID no Stripe
      }
    };

    const plan = plans[planId];
    if (!plan) {
      toast({
        title: "Plano inválido",
        description: "Redirecionando para a página inicial",
        variant: "destructive",
      });
      setLocation("/");
      return;
    }

    setSelectedPlan(plan);

    // Criar sessão de checkout
    apiRequest("POST", "/api/create-subscription", { 
      priceId: plan.stripePriceId,
      planId: plan.id 
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          throw new Error("Client secret não recebido");
        }
      })
      .catch((error) => {
        console.error("Erro ao criar sessão:", error);
        toast({
          title: "Erro",
          description: "Não foi possível iniciar o checkout",
          variant: "destructive",
        });
      })
      .finally(() => setLoading(false));
  }, [toast, setLocation]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-cyan-50/20 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!clientSecret || !selectedPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-cyan-50/20 p-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="mt-20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Erro ao Carregar Checkout
              </h2>
              <p className="text-slate-600 mb-6">
                Não foi possível carregar a página de pagamento.
              </p>
              <Button
                onClick={() => setLocation("/")}
                variant="outline"
                className="border-teal-400 text-teal-700"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Início
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-cyan-50/20">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-teal-200/30 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setLocation("/")}
                className="p-2 hover:bg-teal-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-teal-700" />
              </button>
              <div className="flex items-center gap-3">
                <img 
                  src="/idalia-logo.png" 
                  alt="Idalia Calc" 
                  className="h-10 w-10 drop-shadow-md"
                />
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                    Checkout Seguro
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm 
            planId={selectedPlan.id}
            planName={selectedPlan.name}
            planPrice={selectedPlan.price}
          />
        </Elements>
      </div>
    </div>
  );
}