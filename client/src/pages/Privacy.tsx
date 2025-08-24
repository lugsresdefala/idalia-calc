import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Lock, Database, Eye } from "lucide-react";
import { Link } from "wouter";

export default function Privacy() {
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
              <Shield className="h-8 w-8 text-cyan-400" />
              Política de Privacidade
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <div className="text-blue-100 space-y-6">
              <p className="text-sm text-cyan-300">Última atualização: 24 de Janeiro de 2025</p>

              <div className="bg-cyan-900/20 border border-cyan-400/30 rounded-lg p-4">
                <p className="text-cyan-300 font-semibold">
                  Sua privacidade é fundamental para nós. Esta política explica como coletamos, 
                  usamos e protegemos suas informações pessoais, especialmente dados sensíveis de saúde.
                </p>
              </div>

              <section>
                <h2 className="text-xl font-semibold text-cyan-300 mb-3 flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  1. Informações que Coletamos
                </h2>
                
                <h3 className="text-lg font-medium text-cyan-300/90 mt-4 mb-2">1.1 Dados de Cadastro</h3>
                <ul className="list-disc pl-6 text-blue-200 space-y-2">
                  <li>Nome completo</li>
                  <li>Endereço de email</li>
                  <li>Senha (armazenada de forma criptografada)</li>
                  <li>Data de nascimento (opcional)</li>
                </ul>

                <h3 className="text-lg font-medium text-cyan-300/90 mt-4 mb-2">1.2 Dados de Saúde Reprodutiva</h3>
                <ul className="list-disc pl-6 text-blue-200 space-y-2">
                  <li>Datas de ciclos menstruais</li>
                  <li>Duração e regularidade dos ciclos</li>
                  <li>Dados de temperatura basal</li>
                  <li>Observações sobre muco cervical</li>
                  <li>Informações de gravidez (DUM, ultrassom)</li>
                  <li>Histórico de cálculos realizados</li>
                </ul>

                <h3 className="text-lg font-medium text-cyan-300/90 mt-4 mb-2">1.3 Dados de Uso</h3>
                <ul className="list-disc pl-6 text-blue-200 space-y-2">
                  <li>Páginas visitadas e recursos utilizados</li>
                  <li>Horários de acesso</li>
                  <li>Dispositivo e navegador utilizados</li>
                  <li>Endereço IP (anonimizado)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-cyan-300 mb-3 flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  2. Como Usamos suas Informações
                </h2>
                <p className="text-blue-200 mb-3">Utilizamos suas informações para:</p>
                <ul className="list-disc pl-6 text-blue-200 space-y-2">
                  <li>Fornecer cálculos precisos de fertilidade e idade gestacional</li>
                  <li>Personalizar sua experiência na plataforma</li>
                  <li>Manter histórico de seus dados para análise longitudinal</li>
                  <li>Enviar lembretes e notificações relevantes (com seu consentimento)</li>
                  <li>Processar pagamentos de assinatura</li>
                  <li>Melhorar nossos serviços e desenvolver novos recursos</li>
                  <li>Cumprir obrigações legais</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-cyan-300 mb-3 flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  3. Proteção de Dados
                </h2>
                <p className="text-blue-200 mb-3">
                  Implementamos medidas de segurança rigorosas:
                </p>
                <ul className="list-disc pl-6 text-blue-200 space-y-2">
                  <li>Criptografia SSL/TLS para todas as transmissões</li>
                  <li>Senhas armazenadas com hash seguro (bcrypt)</li>
                  <li>Acesso restrito aos dados apenas para pessoal autorizado</li>
                  <li>Backups regulares e criptografados</li>
                  <li>Monitoramento contínuo de segurança</li>
                  <li>Conformidade com LGPD (Lei Geral de Proteção de Dados)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-cyan-300 mb-3">4. Compartilhamento de Dados</h2>
                <div className="bg-green-900/20 border border-green-400/30 rounded-lg p-4 mb-4">
                  <p className="text-green-200">
                    <strong>Nunca vendemos seus dados pessoais.</strong> Seus dados de saúde são 
                    estritamente confidenciais.
                  </p>
                </div>
                <p className="text-blue-200 mb-3">
                  Compartilhamos informações apenas:
                </p>
                <ul className="list-disc pl-6 text-blue-200 space-y-2">
                  <li>Com processadores de pagamento (Stripe) para transações</li>
                  <li>Quando exigido por lei ou ordem judicial</li>
                  <li>Com seu consentimento explícito</li>
                  <li>De forma anonimizada para pesquisa científica (opcional)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-cyan-300 mb-3">5. Seus Direitos (LGPD)</h2>
                <p className="text-blue-200 mb-3">
                  De acordo com a Lei Geral de Proteção de Dados, você tem direito a:
                </p>
                <ul className="list-disc pl-6 text-blue-200 space-y-2">
                  <li>Acessar todos os seus dados pessoais</li>
                  <li>Corrigir dados incompletos ou desatualizados</li>
                  <li>Solicitar a exclusão de seus dados</li>
                  <li>Revogar consentimento a qualquer momento</li>
                  <li>Portabilidade dos dados para outro serviço</li>
                  <li>Informações sobre compartilhamento de dados</li>
                  <li>Revisão de decisões automatizadas</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-cyan-300 mb-3">6. Cookies e Tecnologias</h2>
                <p className="text-blue-200">
                  Utilizamos cookies essenciais para:
                </p>
                <ul className="list-disc pl-6 text-blue-200 space-y-2 mt-2">
                  <li>Manter você conectado à sua conta</li>
                  <li>Lembrar suas preferências</li>
                  <li>Garantir a segurança da plataforma</li>
                  <li>Análise de uso (Google Analytics - anonimizado)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-cyan-300 mb-3">7. Retenção de Dados</h2>
                <p className="text-blue-200">
                  Mantemos seus dados enquanto sua conta estiver ativa. Após exclusão da conta:
                </p>
                <ul className="list-disc pl-6 text-blue-200 space-y-2 mt-2">
                  <li>Dados pessoais: excluídos em até 30 dias</li>
                  <li>Backups: removidos em até 90 dias</li>
                  <li>Dados anonimizados: podem ser mantidos para análise</li>
                  <li>Registros legais: conforme exigido por lei</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-cyan-300 mb-3">8. Menores de Idade</h2>
                <p className="text-blue-200">
                  Nossa plataforma não é direcionada a menores de 16 anos. Não coletamos 
                  intencionalmente dados de menores sem consentimento dos responsáveis.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-cyan-300 mb-3">9. Alterações na Política</h2>
                <p className="text-blue-200">
                  Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças 
                  significativas por email ou aviso na plataforma com 30 dias de antecedência.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-cyan-300 mb-3">10. Contato e DPO</h2>
                <div className="bg-cyan-900/20 border border-cyan-400/30 rounded-lg p-4">
                  <p className="text-cyan-300 font-semibold mb-2">
                    Encarregado de Proteção de Dados (DPO):
                  </p>
                  <p className="text-blue-200">Email: privacidade@idaliareprodutiva.com</p>
                  <p className="text-blue-200">Tel: 0800-XXX-XXXX</p>
                  <p className="text-blue-200 mt-3">
                    Para exercer seus direitos ou esclarecer dúvidas sobre privacidade, 
                    entre em contato conosco.
                  </p>
                </div>
              </section>

              <div className="mt-8 pt-6 border-t border-cyan-400/30">
                <div className="bg-blue-900/20 border border-blue-400/30 rounded-lg p-4">
                  <p className="text-sm text-blue-300 text-center">
                    Esta política está em conformidade com a Lei Geral de Proteção de Dados (LGPD) 
                    - Lei nº 13.709/2018 e regulamentações aplicáveis.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}