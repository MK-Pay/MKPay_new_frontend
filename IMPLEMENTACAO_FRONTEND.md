# IMPLEMENTAÇÃO - Frontend dos Clientes MKPay

> Documento unificado de planejamento e acompanhamento da implementação

## Stack Tecnológica

- **Framework**: Vue 3 (Composition API)
- **Estilização**: TailwindCSS v4
- **Roteamento**: Vue Router
- **State Management**: Pinia
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **TypeScript**: Sim

---

## FASE 1: Setup Inicial ✅ CONCLUÍDO

### 1.1 Configuração do Projeto ✅

- [x] Criar projeto Vue 3 com Vite
- [x] Instalar dependências base (vue-router, pinia, axios)
- [x] Configurar TailwindCSS v4
- [x] Configurar TypeScript (tsconfig.json)
- [x] Criar arquivo de variáveis de ambiente (.env.example)
  - `VITE_API_BASE_URL`

### 1.2 Estrutura de Pastas ✅

- [x] Criar estrutura completa de pastas:
  - `src/assets/` (styles, images)
  - `src/components/` (auth, apps, dashboard, layout, perfil, shared, tokens, vendas)
  - `src/composables/`
  - `src/layouts/`
  - `src/router/`
  - `src/services/`
  - `src/stores/`
  - `src/types/`
  - `src/utils/`
  - `src/views/`

### 1.3 Configuração do Axios ✅

- [x] Criar `src/services/api.ts` com instância do Axios
- [x] Configurar interceptors para:
  - Adicionar token de autenticação
  - Tratar erros globalmente
  - Refresh token automático

---

## FASE 2: Autenticação ✅ CONCLUÍDO

### 2.1 Types e Interfaces ✅

- [x] Criar `src/types/api.types.ts` com tipos base de API
- [x] Criar `src/types/auth.types.ts` com interfaces de autenticação

### 2.2 Store de Autenticação ✅

- [x] Criar `src/stores/auth.store.ts` com Pinia
  - State: user, token, isAuthenticated
  - Actions: login, logout, register, loadUser

### 2.3 Service de Autenticação ✅

- [x] Criar `src/services/auth.service.ts`
  - `login(email, password)`
  - `register(userData)`
  - `logout()`
  - `me()`

### 2.4 Composables de Autenticação ✅

- [x] Criar `src/composables/useAuth.ts`
  - Expor métodos do store
  - Lógica de verificação de autenticação

### 2.5 Componentes de Autenticação ✅

- [x] Criar `src/components/auth/LoginForm.vue`
  - Formulário com email e senha
  - Validação de inputs
  - Tratamento de erros

- [x] Criar `src/components/auth/RegisterForm.vue`
  - Formulário de cadastro
  - Validação de campos

### 2.6 Views de Autenticação ✅

- [x] Criar `src/views/auth/LoginView.vue`
- [x] Criar `src/views/auth/RegisterView.vue`

### 2.7 Router e Guards ✅

- [x] Criar `src/router/index.ts` com rotas básicas
- [x] Criar `src/router/guards.ts` com AuthGuard
  - Redirecionar para login se não autenticado
  - Redirecionar para dashboard se já autenticado (login/register)

### 2.8 Layout Base ✅

- [x] Criar `src/components/layout/Navbar.vue`
  - Logo
  - Menu de navegação
  - Dropdown de usuário
  - Logout

- [x] Criar `src/components/layout/Sidebar.vue` (mobile)
- [x] Criar `src/components/layout/MainLayout.vue` (layout principal)

---

## FASE 3: Dashboard ✅ CONCLUÍDO

### 3.1 Types e Services ✅

- [x] Criar `src/types/dashboard.types.ts` com tipos de estatísticas
- [x] Criar `src/services/dashboard.service.ts`
  - `getStats()`
  - `getRecentSales()`

### 3.2 Componentes do Dashboard ✅

- [x] Criar `src/components/shared/Card.vue` (componente genérico)
- [x] Criar `src/components/shared/LoadingSpinner.vue`
- [x] Criar `src/components/shared/EmptyState.vue`

- [x] Criar `src/components/dashboard/DashboardStats.vue`
  - Cards de métricas: Total apps, Vendas do mês, Revenue, Taxa de sucesso

- [x] Criar `src/components/dashboard/RecentSales.vue`
  - Lista de vendas recentes

- [x] Criar `src/components/dashboard/QuickActions.vue`
  - Botões de ações rápidas (criar app, criar token)

### 3.3 View do Dashboard ✅

- [x] Criar `src/views/dashboard/DashboardView.vue`
  - Integrar todos os componentes
  - Carregar dados via service

### 3.4 Utils ✅

- [x] Criar `src/utils/formatters.ts`
  - Formatação de moeda
  - Formatação de datas
  - Formatação de números

- [x] Criar `src/utils/constants.ts`
  - Constantes do sistema

- [x] Criar `src/utils/data-helpers.ts`
  - Helpers para manipulação de dados

---

## FASE 4: Gestão de Apps ✅ CONCLUÍDO

### 4.1 Types e Interfaces ✅

- [x] Criar `src/types/app.types.ts`
  - Interface App
  - Interface AppStats
  - Interface CreateAppDTO

### 4.2 Store de Apps ✅

- [x] Criar `src/stores/apps.store.ts`
  - State: apps, currentApp, loading
  - Actions: fetchApps, createApp, updateApp, deleteApp

### 4.3 Service de Apps ✅

- [x] Criar `src/services/apps.service.ts`
  - `getApps()`
  - `getApp(id)`
  - `createApp(data)`
  - `updateApp(id, data)`
  - `deleteApp(id)`
  - `activateApp(id)`
  - `deactivateApp(id)`

### 4.4 Composables ✅

- [x] Criar `src/composables/useApps.ts`

### 4.5 Componentes Compartilhados ✅

- [x] Criar `src/components/shared/StatusBadge.vue`
  - Badge de status configurável

- [x] Criar `src/components/shared/Modal.vue`
  - Modal genérico reutilizável

- [x] Criar `src/components/shared/ConfirmDialog.vue`
  - Diálogo de confirmação

### 4.6 Componentes de Apps ✅

- [x] Criar `src/components/apps/AppCard.vue`
  - Card de app para listagem
  - Nome, status, último uso

- [x] Criar `src/components/apps/AppsList.vue`
  - Grid de apps
  - Busca por nome
  - Botão criar novo

- [x] Criar `src/components/apps/AppCreateModal.vue`
  - Formulário de criação de app

### 4.7 Views de Apps ✅

- [x] Criar `src/views/apps/AppsView.vue`
  - Lista de aplicações

- [x] Criar `src/views/apps/AppDetailView.vue`
  - Detalhes do app com abas
  - Roteamento aninhado

- [x] Criar `src/views/apps/AppOverviewView.vue`
  - Visão geral do app

- [x] Criar `src/views/apps/AppTokensView.vue`
  - Gestão de tokens (estrutura básica)

- [x] Criar `src/views/apps/AppVendasView.vue`
  - Lista de vendas do app (estrutura básica)

- [x] Criar `src/views/apps/AppConfiguracoesView.vue`
  - Configurações do app

### 4.8 Rotas de Apps ✅

- [x] Adicionar rotas no router:
  - `/apps`
  - `/apps/:id`
  - `/apps/:id/overview`
  - `/apps/:id/tokens`
  - `/apps/:id/vendas`
  - `/apps/:id/configuracoes`

---

## SISTEMAS EXTRAS IMPLEMENTADOS ✅

### Sistema de Contas (Multi-Account) ✅

- [x] Criar `src/services/accounts.service.ts`
- [x] Criar `src/stores/accounts.store.ts`
  - Gestão de contas do usuário
  - Seleção de conta ativa
  - Persistência em localStorage

- [x] Criar `src/components/shared/AccountSelector.vue`
  - Seletor de conta no topo das páginas

- [x] Criar `src/layouts/AuthLayout.vue`
  - Wrapper que gerencia estado de conta selecionada
  - Empty state quando nenhuma conta selecionada

### Sistema de Permissões ✅

- [x] Criar `src/services/permissions.service.ts`
- [x] Criar `src/stores/permissions.store.ts`
  - Gestão de permissões e roles
  - Métodos: hasPermission, hasRole, etc

- [x] Criar `src/composables/usePermissions.ts`
  - Wrapper para uso fácil em componentes

---

## FASE 5: Gestão de Tokens 🔄 EM ANDAMENTO

### 5.1 Types e Interfaces

- [x] Criar `src/types/token.types.ts`
  - Interface Token
  - Interface TokenPermissions
  - Interface CreateTokenDTO

### 5.2 Store de Tokens

- [ ] Criar `src/stores/tokens.store.ts`
  - State: tokens, loading
  - Actions: fetchTokens, createToken, updateToken, deleteToken

### 5.3 Service de Tokens

- [ ] Criar `src/services/tokens.service.ts`
  - `getTokens(appId)`
  - `getToken(appId, tokenId)`
  - `createToken(appId, data)`
  - `updateToken(appId, tokenId, data)`
  - `deleteToken(appId, tokenId)`

### 5.4 Composables

- [ ] Criar `src/composables/useTokens.ts`
- [ ] Criar `src/composables/useClipboard.ts`
  - Copiar para clipboard com feedback

### 5.5 Componentes de Tokens

- [ ] Criar `src/components/shared/CopyButton.vue`
  - Botão genérico de copiar

- [ ] Criar `src/components/tokens/TokenCard.vue`
  - Card de token na listagem
  - Nome, permissões, status, datas
  - Ações (desativar, deletar)

- [ ] Criar `src/components/tokens/TokensList.vue`
  - Lista de tokens do app

- [ ] Criar `src/components/tokens/TokenPermissions.vue`
  - Seletor de permissões (checkboxes)

- [ ] Criar `src/components/tokens/TokenCreateModal.vue`
  - Formulário de criação
  - Seleção de permissões
  - Exibição única do token gerado
  - Aviso de segurança

- [ ] Criar `src/components/tokens/TokenCopyButton.vue`
  - Botão específico para copiar token

### 5.6 Integração com AppTokensView

- [ ] Implementar listagem de tokens em `AppTokensView.vue`
- [ ] Adicionar modal de criação de token
- [ ] Implementar ações de gerenciamento (ativar/desativar/deletar)

### 5.7 Segurança de Tokens

- [ ] Implementar exibição única do token (apenas na criação)
- [ ] Mascarar tokens em listagens
- [ ] Adicionar confirmação antes de deletar

---

## FASE 6: Vendas ⏳ PENDENTE

### 6.1 Types e Interfaces

- [ ] Criar `src/types/venda.types.ts`
  - Interface Venda
  - Interface VendaDetails
  - Interface VendaFilters
  - Interface VendaEvent (timeline)

### 6.2 Store de Vendas

- [ ] Criar `src/stores/vendas.store.ts`
  - State: vendas, currentVenda, filters, pagination
  - Actions: fetchVendas, fetchVenda, cancelVenda, refundVenda

### 6.3 Service de Vendas

- [ ] Criar `src/services/vendas.service.ts`
  - `getVendas(appId, filters, pagination)`
  - `getVenda(appId, vendaId)`
  - `cancelVenda(appId, vendaId)`
  - `refundVenda(appId, vendaId)`

### 6.4 Composables

- [ ] Criar `src/composables/useVendas.ts`
- [ ] Criar `src/composables/useNotifications.ts`
  - Sistema de notificações toast

### 6.5 Componentes Compartilhados

- [ ] Criar `src/components/shared/DataTable.vue`
  - Tabela genérica com paginação
  - Slots para customização

### 6.6 Componentes de Vendas

- [ ] Criar `src/components/vendas/VendaCard.vue`
  - Card de venda na listagem

- [ ] Criar `src/components/vendas/VendaFilters.vue`
  - Filtros: período, status, método de pagamento
  - Busca por ID ou cliente

- [ ] Criar `src/components/vendas/VendasList.vue`
  - Lista/tabela de vendas
  - Integração com filtros
  - Paginação

- [ ] Criar `src/components/vendas/VendaTimeline.vue`
  - Timeline de eventos da venda

- [ ] Criar `src/components/vendas/VendaDetails.vue`
  - Informações completas da venda
  - Timeline
  - Dados técnicos (payloads, logs)
  - Ações (cancelar, reembolsar)

### 6.7 Views de Vendas

- [ ] Criar `src/views/vendas/VendasView.vue`
  - Lista de vendas com filtros

- [ ] Criar `src/views/vendas/VendaDetailView.vue`
  - Detalhes completos da venda

### 6.8 Integração com AppVendasView

- [ ] Implementar listagem de vendas em `AppVendasView.vue`
- [ ] Adicionar filtros e busca
- [ ] Implementar paginação
- [ ] Link para detalhes da venda

### 6.9 Validações

- [ ] Criar `src/utils/validators.ts`
  - Validadores de formulários

---

## FASE 7: Perfil e Documentos 🔄 PARCIALMENTE CONCLUÍDO

### 7.1 Service de Perfil

- [ ] Criar `src/services/perfil.service.ts`
  - `getPerfil()`
  - `updatePerfil(data)`
  - `changePassword(data)`
  - `uploadDocument(file)`
  - `getDocuments()`

### 7.2 Componentes de Perfil

- [ ] Criar `src/components/perfil/PerfilForm.vue`
  - Formulário de dados básicos
  - Dados da empresa

- [ ] Criar `src/components/perfil/SecuritySettings.vue`
  - Alteração de senha

- [ ] Criar `src/components/perfil/DocumentosUpload.vue`
  - Upload de documentos
  - Lista de documentos enviados
  - Status de análise

### 7.3 Views

- [x] Criar `src/views/perfil/PerfilView.vue` (estrutura básica)
  - [ ] Adicionar abas: Informações, Segurança
  - [ ] Integrar componentes

- [x] Criar `src/views/documentos/DocumentosView.vue` (estrutura básica)
  - [ ] Implementar gestão de documentos

---

## FASE 8: Polimento e Testes ⏳ PENDENTE

### 8.1 Otimizações

- [ ] Implementar lazy loading de rotas
- [ ] Otimizar imports de componentes
- [ ] Adicionar loading states em todas as ações
- [ ] Implementar error boundaries
- [ ] Otimizar imagens e assets

### 8.2 UX/UI

- [ ] Revisar responsividade em todos os breakpoints
- [ ] Adicionar animações e transições suaves
- [ ] Implementar skeleton loaders
- [ ] Adicionar tooltips explicativos
- [ ] Criar empty states ilustrados
- [ ] Feedback visual para ações (toast notifications)

### 8.3 Segurança

- [ ] Validar todos os inputs
- [ ] Sanitizar dados exibidos
- [ ] Implementar rate limiting visual
- [ ] Adicionar confirmações para ações destrutivas
- [ ] Revisar exposição de dados sensíveis

### 8.4 Testes

- [ ] Testes unitários de componentes críticos
- [ ] Testes de composables
- [ ] Testes de stores
- [ ] Testes E2E das principais jornadas:
  - Login/Logout
  - Criação de app
  - Criação de token
  - Visualização de vendas

### 8.5 Documentação

- [ ] README.md do projeto
- [ ] Documentação de setup e desenvolvimento
- [ ] Documentação de variáveis de ambiente
- [ ] Comentários em código complexo

### 8.6 Build e Deploy

- [ ] Configurar build de produção
- [ ] Otimizar bundle size
- [ ] Configurar variáveis de ambiente para produção
- [ ] Testar build em ambiente de staging

---

## CHECKLIST FINAL DE QUALIDADE

### Performance
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Bundle size otimizado

### Acessibilidade
- [ ] Navegação por teclado funcionando
- [ ] Labels em todos os inputs
- [ ] Contraste de cores adequado
- [ ] Screen readers compatíveis

### Responsividade
- [ ] Mobile (320px - 768px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (1024px+)

### Segurança
- [ ] Tokens nunca expostos em logs
- [ ] Validação de inputs implementada
- [ ] HTTPS obrigatório
- [ ] XSS prevention
- [ ] CSRF protection

### UX
- [ ] Feedback visual em todas as ações
- [ ] Loading states adequados
- [ ] Mensagens de erro claras
- [ ] Confirmações para ações críticas
- [ ] Empty states úteis

---

## ENDPOINTS DA API (Referência Completa)

### Auth
- POST `/api/v1/auth/register` - Registrar novo usuário
- POST `/api/v1/auth/login` - Login
- POST `/api/v1/auth/logout` - Logout (requer autenticação)
- GET `/api/v1/auth/user` - Obter usuário autenticado

### Account (Perfil)
- GET `/api/v1/account` - Obter detalhes da conta autenticada
- PUT `/api/v1/account` - Atualizar conta
- GET `/api/v1/accounts` - Listar contas do usuário

### Apps
- GET `/api/v1/apps` - Listar apps
- POST `/api/v1/apps` - Criar app
- GET `/api/v1/apps/{appId}` - Obter app por ID
- PUT `/api/v1/apps/{appId}` - Atualizar app
- DELETE `/api/v1/apps/{appId}` - Deletar app
- POST `/api/v1/apps/{appId}/activate` - Ativar app
- POST `/api/v1/apps/{appId}/deactivate` - Desativar app

### Tokens
- GET `/api/v1/apps/{appId}/tokens` - Listar tokens do app
- POST `/api/v1/apps/{appId}/tokens` - Criar token
- PUT `/api/v1/apps/{appId}/tokens/{tokenId}` - Atualizar token
- DELETE `/api/v1/apps/{appId}/tokens/{tokenId}` - Revogar token

### Transactions (Vendas/Transações)
- GET `/api/v1/transactions` - Listar transações
- GET `/api/v1/transactions/{uuid}` - Obter transação por UUID

### Payments (Pagamentos)
- GET `/api/v1/payments` - Listar pagamentos
- POST `/api/v1/payments` - Criar pagamento
- GET `/api/v1/payments/{uuid}` - Obter pagamento
- POST `/api/v1/payments/{uuid}/cancel` - Cancelar pagamento
- POST `/api/v1/payments/{uuid}/refund` - Reembolsar pagamento

### Webhooks
- GET `/api/v1/webhooks` - Listar webhooks
- POST `/api/v1/webhooks` - Criar webhook
- GET `/api/v1/webhooks/{id}` - Obter webhook
- PUT `/api/v1/webhooks/{id}` - Atualizar webhook
- DELETE `/api/v1/webhooks/{id}` - Deletar webhook
- POST `/api/v1/webhooks/{id}/test` - Testar webhook
- GET `/api/v1/webhooks/{id}/logs` - Obter logs do webhook

### Wallets (Carteiras)
- GET `/api/v1/wallets` - Listar carteiras
- GET `/api/v1/wallets/{uuid}` - Obter carteira
- GET `/api/v1/wallets/{uuid}/balance` - Obter saldo
- GET `/api/v1/wallets/{uuid}/statement` - Obter extrato

---

## COMANDOS ÚTEIS

### Desenvolvimento
```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run preview      # Preview do build
npm run lint         # Linting
npm run lint:fix     # Linting com correções automáticas
```

---

## NOTAS IMPORTANTES

1. **TypeScript**: Usar tipos estritos em todo o projeto
2. **Composition API**: Preferir sobre Options API
3. **Nomenclatura**: Sempre em inglês para código
4. **Indentação**: 4 espaços (conforme preferências do usuário)
5. **Commits**: Mensagens claras e descritivas
6. **Code Review**: Revisar cada fase antes de prosseguir
7. **Testes**: Testar funcionalidades antes de marcar como concluídas
8. **Account Context**: Sempre usar `account_uuid` nas chamadas de API

---

## PRÓXIMOS PASSOS

### Prioridade Alta (Sprint Atual)
1. **Completar FASE 5**: Gestão de Tokens
   - Implementar stores e services
   - Criar componentes de tokens
   - Integrar com AppTokensView

### Prioridade Média
2. **FASE 6**: Implementar sistema de vendas completo
3. **FASE 7**: Completar perfil e documentos

### Prioridade Baixa
4. **FASE 8**: Polimento, testes e otimizações

---

## RECURSOS FUTUROS (Pós-MVP)

- Gráficos avançados de vendas
- Export de relatórios (CSV, PDF)
- Notificações em tempo real
- Webhooks configuráveis (parcialmente implementado)
- API playground/sandbox
- Documentação interativa da API
- Testes de integração no próprio painel
- Sistema de alertas customizáveis
- Modo escuro
