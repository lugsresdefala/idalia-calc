import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

// Carregar Stripe
const stripePromise = import.meta.env.VITE_STRIPE_PUBLIC_KEY 
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  : null;

const SubscribeForm = () => {
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
        return_url: window.location.origin,
      },
    });

    if (error) {
      toast({
        title: "Erro no Pagamento",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Pagamento Processado",
        description: "Sua assinatura está ativa!",
      });
    }
    
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button 
        type="submit" 
        disabled={!stripe || isProcessing}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
      >
        {isProcessing ? "Processando..." : "Assinar Agora"}
      </Button>
    </form>
  );
};

export default function Subscribe() {
  const [clientSecret, setClientSecret] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
      toast({
        title: "Configuração Pendente",
        description: "Sistema de pagamento em configuração. Entre em contato com o suporte.",
        variant: "destructive",
      });
      return;
    }
    
    // Criar ou recuperar assinatura
    apiRequest("POST", "/api/get-or-create-subscription")
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((err) => {
        toast({
          title: "Erro",
          description: "Erro ao carregar opções de pagamento.",
          variant: "destructive",
        });
      });
  }, []);

  const benefits = [
    "Acesso ilimitado a todas as calculadoras",
    "Histórico completo de cálculos salvos",
    "Análise avançada de dados",
    "Gráficos e relatórios personalizados",
    "Exportação de dados em PDF",
    "Suporte prioritário"
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Informações do Plano */}
        <Card className="glass-card border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-2xl text-cyan-300">Plano Premium</CardTitle>
            <CardDescription className="text-gray-400">
              Acesso completo a todas as funcionalidades
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-3xl font-bold text-white">
              R$ 29,90<span className="text-lg font-normal text-gray-400">/mês</span>
            </div>
            
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-400">
                Cancele a qualquer momento. Sem taxas ocultas.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Formulário de Pagamento */}
        <Card className="glass-card border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-xl text-blue-300">Pagamento Seguro</CardTitle>
            <CardDescription className="text-gray-400">
              Processado com segurança pelo Stripe
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!stripePromise ? (
              <div className="text-center p-8 text-gray-400">
                <p className="mb-4">Sistema de pagamento em configuração</p>
                <p className="text-sm">Entre em contato com o suporte para mais informações</p>
              </div>
            ) : clientSecret ? (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <SubscribeForm />
              </Elements>
            ) : (
              <div className="flex justify-center p-8">
                <div className="animate-spin w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}