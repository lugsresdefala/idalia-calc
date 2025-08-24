import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, FileText, Info } from "lucide-react";
import { Link } from "wouter";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="text-cyan-300 hover:text-cyan-200">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Início
            </Button>
          </Link>
        </div>

        <Card className="glass-card border-cyan-400/30">
          <CardHeader className="glass-header">
            <CardTitle className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300 flex items-center gap-3">
              <FileText className="h-8 w-8 text-cyan-400" />
              Termos de Uso
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <div className="text-blue-100 space-y-6">
              <p className="text-sm text-cyan-300">Última atualização: 24 de Janeiro de 2025</p>

              <section>
                <h2 className="text-xl font-semibold text-cyan-300 mb-3">1. Aceitação dos Termos</h2>
                <p className="text-blue-200">
                  Ao acessar e usar a plataforma IdaliaCalc, você concorda com estes Termos de Uso. 
                  Se você não concordar com qualquer parte destes termos, não deve usar nossos serviços.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-cyan-300 mb-3">2. Descrição do Serviço</h2>
                <p className="text-blue-200">
                  IdaliaCalc é uma plataforma de saúde reprodutiva que oferece:
                </p>
                <ul className="list-disc pl-6 text-blue-200 space-y-2 mt-2">
                  <li>Calculadoras de fertilidade e período fértil</li>
                  <li>Calculadoras de idade gestacional</li>
                  <li>Informações educacionais sobre saúde reprodutiva</li>
                  <li>Acompanhamento de ciclos menstruais</li>
                  <li>Análise de dados de fertilidade</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-cyan-300 mb-3">3. Uso Apropriado</h2>
                <div className="bg-red-900/20 border border-red-400/30 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                    <p className="text-red-200">
                      <strong>AVISO IMPORTANTE:</strong> Esta plataforma fornece informações educacionais e não substitui 
                      consulta médica profissional. Sempre consulte um médico ou profissional de saúde qualificado 
                      para decisões sobre sua saúde reprodutiva.
                    </p>
                  </div>
                </div>
                <p className="text-blue-200">
                  Você concorda em usar a plataforma apenas para fins legais e de acordo com estes termos.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-cyan-300 mb-3">4. Conta de Usuário</h2>
                <p className="text-blue-200">
                  Para acessar recursos completos, você deve criar uma conta fornecendo informações precisas e atualizadas.
                  Você é responsável por:
                </p>
                <ul className="list-disc pl-6 text-blue-200 space-y-2 mt-2">
                  <li>Manter a confidencialidade de sua senha</li>
                  <li>Todas as atividades que ocorrem em sua conta</li>
                  <li>Notificar-nos imediatamente sobre uso não autorizado</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-cyan-300 mb-3">5. Assinatura e Pagamento</h2>
                <p className="text-blue-200">
                  Alguns recursos requerem assinatura paga. Ao assinar:
                </p>
                <ul className="list-disc pl-6 text-blue-200 space-y-2 mt-2">
                  <li>Você autoriza cobranças recorrentes mensais de R$ 29,90</li>
                  <li>Os pagamentos são processados através do Stripe</li>
                  <li>Você pode cancelar a qualquer momento</li>
                  <li>Não há reembolso para períodos parciais</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-cyan-300 mb-3">6. Propriedade Intelectual</h2>
                <p className="text-blue-200">
                  Todo o conteúdo da plataforma, incluindo textos, gráficos, logos, ícones e software, 
                  é propriedade da IdaliaCalc ou de seus licenciadores e está protegido por leis de 
                  direitos autorais.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-cyan-300 mb-3">7. Privacidade e Dados Pessoais</h2>
                <p className="text-blue-200">
                  O uso de seus dados pessoais é regido por nossa{" "}
                  <Link href="/privacy">
                    <span className="text-cyan-400 hover:text-cyan-300 underline cursor-pointer">
                      Política de Privacidade
                    </span>
                  </Link>
                  . Ao usar nossos serviços, você consente com a coleta e uso de informações conforme 
                  descrito naquela política.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-cyan-300 mb-3">8. Limitação de Responsabilidade</h2>
                <p className="text-blue-200">
                  A IdaliaCalc não será responsável por quaisquer danos indiretos, incidentais, especiais, 
                  consequenciais ou punitivos resultantes do uso ou incapacidade de usar o serviço.
                </p>
                <p className="text-blue-200 mt-2">
                  As informações fornecidas são apenas para fins educacionais e não devem ser consideradas 
                  como aconselhamento médico profissional.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-cyan-300 mb-3">9. Modificações dos Termos</h2>
                <p className="text-blue-200">
                  Reservamo-nos o direito de modificar estes termos a qualquer momento. Mudanças significativas 
                  serão notificadas através do email cadastrado ou aviso na plataforma.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-cyan-300 mb-3">10. Lei Aplicável</h2>
                <p className="text-blue-200">
                  Estes termos são regidos pelas leis da República Federativa do Brasil. Qualquer disputa 
                  será resolvida no foro da comarca onde a empresa está sediada.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-cyan-300 mb-3">11. Contato</h2>
                <p className="text-blue-200">
                  Para dúvidas sobre estes Termos de Uso, entre em contato:
                </p>
                <div className="bg-cyan-900/20 border border-cyan-400/30 rounded-lg p-4 mt-3">
                  <p className="text-cyan-300">Email: contato@idaliareprodutiva.com</p>
                  <p className="text-cyan-300">Site: www.idaliareprodutiva.com</p>
                </div>
              </section>

              <div className="mt-8 pt-6 border-t border-cyan-400/30">
                <p className="text-sm text-cyan-300/70 text-center">
                  Ao usar a plataforma IdaliaCalc, você reconhece que leu, entendeu e concorda 
                  em estar vinculado a estes Termos de Uso.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}