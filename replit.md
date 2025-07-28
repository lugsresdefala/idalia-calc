# IdaliaCalc - Plataforma de Saúde Reprodutiva

## Visão Geral
IdaliaCalc é uma plataforma médica especializada em saúde reprodutiva, oferecendo calculadoras avançadas e análise de dados para acompanhamento da fertilidade e gestação.

### Tecnologias Core
- Frontend: React + TypeScript + Vite
- Backend: Express.js + Node.js
- Banco de Dados: PostgreSQL com Drizzle ORM
- UI: Tailwind CSS + shadcn/ui
- Estilo: Gradientes azul-verde com efeitos tecnológicos

## Funcionalidades Principais

### 1. Calculadora de Fertilidade (Foco Principal)
- Cálculo de janela fértil baseado em ciclo menstrual
- Análise detalhada das características biológicas diárias:
  - Muco cervical (consistência, quantidade)
  - Temperatura basal corporal
  - Status hormonal
- Calendário visual interativo
- Persistência de dados históricos

### 2. Calculadora Gestacional
- Cálculo por DUM, ultrassom ou transferência embrionária
- Informações detalhadas de embriogênese
- Recomendações de exames pré-natais
- Orientações de vacinas por semana gestacional
- Marcos de desenvolvimento fetal

### 3. Sistema de Banco de Dados
- Armazenamento de ciclos menstruais
- Registro de temperaturas basais
- Análise de muco cervical
- Histórico de cálculos
- Dados de desenvolvimento fetal

## Arquitetura Atual

### Backend
- `server/db.ts` - Configuração PostgreSQL com Neon
- `server/storage.ts` - Interface de dados com DatabaseStorage
- `server/routes.ts` - APIs REST completas para CRUD
- `shared/schema.ts` - Modelos Drizzle e validação Zod

### Frontend
- `client/src/pages/Home.tsx` - Página principal com calculadoras
- `client/src/pages/Algorithms.tsx` - Explicação dos algoritmos
- Navegação: www.idaliareprodutiva.com e /algoritmos

## Preferências do Usuário
- Nome da aplicação: "Idalia Calc"
- Cores: Gradientes azul-verde, sem elementos rosa
- Estética: Calculadora tecnológica/científica com efeitos de vidro
- Idioma: Português
- Base médica: Recomendações Febrasgo e ACOG

## Mudanças Recentes
- **Janeiro 2025**: Implementação completa do banco de dados PostgreSQL
- **Janeiro 2025**: Criação de APIs REST para todas as funcionalidades
- **Janeiro 2025**: Migração de MemStorage para DatabaseStorage
- **Janeiro 2025**: Adição do logo oficial (beija-flor dourado)
- **Janeiro 2025**: Criação do Dashboard avançado com status do ciclo atual
- **Janeiro 2025**: Sistema completo de notificações e lembretes
- **Janeiro 2025**: Interface de entrada de dados para temperatura basal e muco cervical
- **Janeiro 2025**: Ações rápidas e insights personalizados
- **Janeiro 2025**: Header redesenhado com logo SVG do beija-flor
- **Janeiro 2025**: Logo atualizado com imagem profissional do beija-flor azul e dourado

## Funcionalidades Implementadas
### Dashboard Principal
- Status do ciclo atual com progresso visual
- Cards de resumo (ciclos registrados, temperatura média, tendências)
- Lembretes de hoje com ações pendentes
- Sistema de abas para diferentes visualizações

### Sistema de Entrada de Dados
- Formulários para temperatura basal com validação
- Entrada de observações de muco cervical com categorias
- Registro de ciclos menstruais completos
- Validação em tempo real e feedback ao usuário

### Central de Notificações
- Notificações categorizadas por tipo e urgência
- Sistema de leitura e dismissal de notificações
- Configurações personalizáveis de notificações
- Lembretes automáticos baseados em dados

### Navegação e UX
- Header unificado com logo do beija-flor
- Navegação entre páginas otimizada
- Design responsivo para mobile e desktop
- Animações e transições suaves

## Próximos Passos Sugeridos
1. Gráficos interativos para visualização de dados
2. Relatórios em PDF personalizados
3. Previsões avançadas com IA
4. Sincronização com wearables
5. Compartilhamento com profissionais de saúde

## Notas Importantes
- **Design**: NÃO MUDAR O DESIGN ORIGINAL DA PLATAFORMA
- **Autenticação**: Implementar sistema de login/cadastro mantendo o design original
- **Funcionalidades pedidas**: 
  1. Sistema de login/cadastro (backend pronto)
  2. Histórico de utilização (salvar cálculos no banco)
  3. Sistema de pagamento (assinatura + tokens)