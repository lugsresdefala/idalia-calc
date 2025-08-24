import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, Home, Calculator } from "lucide-react";
import { Link, useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error("Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY");
}

const stripe = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function PaymentComplete() {
  const [status, setStatus] = useState<"loading" | "success" | "processing" | "error">("loading");
  const [message, setMessage] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const checkPaymentStatus = async () => {
      const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );

      if (!clientSecret) {
        setStatus("error");
        setMessage("Informações de pagamento não encontradas.");
        return;
      }

      try {
        const stripeInstance = await stripe;
        if (!stripeInstance) {
          throw new Error("Stripe não inicializado");
        }

        const { paymentIntent } = await stripeInstance.retrievePaymentIntent(clientSecret);

        if (!paymentIntent) {
          setStatus("error");
          setMessage("Não foi possível verificar o status do pagamento.");
          return;
        }

        switch (paymentIntent.status) {
          case "succeeded":
            setStatus("success");
            setMessage("Pagamento confirmado! Sua assinatura está ativa.");
            
            // Atualizar status da assinatura no backend
            try {
              await apiRequest("POST", "/api/confirm-subscription", {
                paymentIntentId: paymentIntent.id,
              });
            } catch (error) {
              // Error handled silently
            }
            
            toast({
              title: "Assinatura Ativada!",
              description: "Agora você tem acesso completo a todas as funcionalidades.",
            });
            break;
            
          case "processing":
            setStatus("processing");
            setMessage("Seu pagamento está sendo processado. Você receberá uma confirmação em breve.");
            break;
            
          case "requires_payment_method":
            setStatus("error");
            setMessage("O pagamento não foi concluído. Por favor, tente novamente.");
            break;
            
          default:
            setStatus("error");
            setMessage("Algo deu errado. Por favor, entre em contato com o suporte.");
            break;
        }
      } catch (error) {
        console.error("Erro ao verificar pagamento:", error);
        setStatus("error");
        setMessage("Erro ao verificar o status do pagamento.");
      }
    };

    checkPaymentStatus();
  }, [toast]);

  const getIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-16 w-16 text-green-400 drop-shadow-lg" />;
      case "processing":
        return <Clock className="h-16 w-16 text-yellow-400 animate-pulse drop-shadow-lg" />;
      case "error":
        return <XCircle className="h-16 w-16 text-red-400 drop-shadow-lg" />;
      default:
        return <div className="animate-spin w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "from-green-400 to-emerald-300";
      case "processing":
        return "from-yellow-400 to-amber-300";
      case "error":
        return "from-red-400 to-rose-300";
      default:
        return "from-cyan-400 to-teal-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="glass-card border-blue-400/30 max-w-lg w-full">
        <CardHeader className="glass-header text-center">
          <div className="flex justify-center mb-4">
            {getIcon()}
          </div>
          <CardTitle className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${getStatusColor()} tech-text-glow`}>
            {status === "loading" && "Verificando Pagamento..."}
            {status === "success" && "Pagamento Confirmado!"}
            {status === "processing" && "Processando Pagamento"}
            {status === "error" && "Erro no Pagamento"}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-6 text-center">
          <p className="text-blue-200 mb-8">{message}</p>
          
          {status === "success" && (
            <div className="space-y-4">
              <div className="glass-panel p-4 rounded-lg tech-border">
                <h3 className="text-cyan-300 font-semibold mb-2">Próximos Passos:</h3>
                <ul className="text-blue-200 text-sm space-y-1 text-left">
                  <li>• Acesse todas as funcionalidades premium</li>
                  <li>• Visualize análises completas de fertilidade</li>
                  <li>• Acompanhe seu desenvolvimento gestacional</li>
                  <li>• Salve e acesse seu histórico de cálculos</li>
                </ul>
              </div>
              
              <div className="flex gap-3">
                <Link href="/" className="flex-1">
                  <Button className="w-full tech-button">
                    <Home className="mr-2 h-4 w-4" />
                    Ir para Início
                  </Button>
                </Link>
                <Link href="/dashboard" className="flex-1">
                  <Button className="w-full" variant="outline">
                    <Calculator className="mr-2 h-4 w-4" />
                    Usar Calculadoras
                  </Button>
                </Link>
              </div>
            </div>
          )}
          
          {status === "processing" && (
            <div className="space-y-4">
              <p className="text-sm text-blue-300">
                Isso pode levar alguns minutos. Você receberá um email de confirmação quando o processo for concluído.
              </p>
              <Link href="/">
                <Button className="w-full" variant="outline">
                  <Home className="mr-2 h-4 w-4" />
                  Voltar ao Início
                </Button>
              </Link>
            </div>
          )}
          
          {status === "error" && (
            <div className="space-y-4">
              <div className="flex gap-3">
                <Link href="/checkout" className="flex-1">
                  <Button className="w-full tech-button">
                    Tentar Novamente
                  </Button>
                </Link>
                <Link href="/" className="flex-1">
                  <Button className="w-full" variant="outline">
                    <Home className="mr-2 h-4 w-4" />
                    Voltar ao Início
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}