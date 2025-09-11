# 💰 Financial Dashboard

Dashboard financeiro moderno construído com Next.js 14, TypeScript, Material-UI e Chart.js para análise de transações e visualização de dados financeiros.

## 🚀 Funcionalidades

- ✅ **Autenticação completa** - Login/logout com proteção de rotas
- ✅ **Dashboard interativo** - Cards de resumo e gráficos dinâmicos
- ✅ **Filtros globais** - Filtragem por estado, conta e indústria
- ✅ **Gráficos responsivos** - Barras, linhas e evolução temporal
- ✅ **Design responsivo** - Sidebar colapsável em dispositivos móveis
- ✅ **Context API** - Gerenciamento de estado global
- ✅ **TypeScript** - Tipagem completa para maior segurança

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Material-UI (MUI)** - Biblioteca de componentes
- **MUI X Charts** - Gráficos interativos
- **Context API** - Gerenciamento de estado
- **LocalStorage** - Persistência de autenticação
- **CSS-in-JS** - Styled components do MUI

## 📦 Pré-requisitos

- **Node.js** 18+ 
- **npm**, **yarn**, **pnpm** ou **bun**

## ⚡ Instalação e Execução

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd financialdashboard
```

### 2. Instale as dependências
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Execute o servidor de desenvolvimento
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

### 4. Acesse a aplicação
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🔐 Credenciais de Teste

Para acessar o sistema, use as seguintes credenciais:

```
Email: admin@test.com
Senha: 123456
```

> **Nota**: Estas são credenciais de demonstração. Em produção, implemente um sistema de autenticação real.

## 📱 Como Usar

### 1. **Login**
- Acesse a página inicial
- Digite as credenciais de teste
- Será redirecionado automaticamente para o dashboard

### 2. **Dashboard**
- **Cards de Resumo**: Visualize totais de depósitos, saques e saldo
- **Gráficos Interativos**: 
  - Barras: Depósitos vs Despesas por mês
  - Linha: Evolução do saldo ao longo dos anos

### 3. **Filtros Globais**
- **Estado**: Filtrar transações por estado (TX, CA, NY, etc.)
- **Conta**: Buscar por conta específica
- **Indústria**: Filtrar por setor/indústria
- **Aplicar**: Clique para aplicar os filtros selecionados
- **Limpar**: Remove todos os filtros ativos

### 4. **Responsividade**
- **Desktop**: Sidebar fixa lateral
- **Mobile**: Menu hamburger colapsável no canto superior esquerdo

### 5. **Logout**
- Clique em "Sair" na sidebar
- Será redirecionado para a página de login
- Dados de autenticação são limpos automaticamente

## 📂 Estrutura do Projeto

```
src/
├── app/
│   ├── (pages)/
│   │   ├── dashboard/           # Página principal do dashboard
│   │   │   ├── _components/     # Componentes específicos do dashboard
│   │   │   │   ├── filters/     # Componente de filtros globais
│   │   │   │   ├── sidebar/     # Sidebar responsiva
│   │   │   │   ├── summaryCards/# Cards de resumo financeiro
│   │   │   │   └── ...
│   │   │   ├── hooks/           # Hooks personalizados
│   │   │   └── layout.tsx       # Layout protegido do dashboard
│   │   └── login/               # Página de login
│   │       └── _components/     # Componentes do login
├── components/                  # Componentes globais reutilizáveis
│   └── ProtectedRoute.tsx       # Proteção de rotas
├── contexts/                    # Context API
│   ├── AuthContext.tsx          # Contexto de autenticação
│   └── FilterContext.tsx        # Contexto de filtros globais
├── services/                    # Serviços e APIs
│   ├── auth.service.ts          # Serviços de autenticação
│   └── transaction.services.ts  # Serviços de transações
├── types/                       # Definições TypeScript
│   ├── auth.types.ts            # Tipos de autenticação
│   └── transaction.types.ts     # Tipos de transações
├── config/                      # Configurações
│   ├── theme.config.ts          # Tema do Material-UI
│   └── navItems.config.ts       # Itens de navegação
└── public/
    └── data/
        └── transactions.json    # Dados de exemplo
```

## 🔄 Fluxo de Autenticação

1. **Login**: Credenciais validadas → Token salvo no localStorage
2. **Proteção**: Middleware e ProtectedRoute verificam autenticação
3. **Acesso**: Dashboard liberado para usuários autenticados
4. **Logout**: Dados limpos + redirecionamento para login

## 🎛️ Filtros e Estado Global

### Context de Filtros
- **FilterContext**: Gerencia estado global dos filtros
- **useFilters**: Hook para acessar e modificar filtros
- **Reatividade**: Todos os componentes reagem automaticamente aos filtros

### Tipos de Filtros Disponíveis
```typescript
interface TransactionFilter {
  state?: string;      // Estado (TX, CA, NY...)
  account?: string;    // Conta específica
  industry?: string;   // Indústria/setor
  date?: string;       // Data (futuro)
}
```

## 🧩 Hooks Personalizados

- **`useAuth()`**: Gerenciamento de autenticação
- **`useFilters()`**: Manipulação de filtros globais
- **`useTransactionInfo()`**: Dados de resumo das transações
- **`useYearlyBalance()`**: Saldo por ano
- **`useMonthlyData()`**: Dados mensais por ano
- **`useDashboardData()`**: Combinação de todos os dados necessários

## 📊 Dados de Exemplo

O sistema utiliza dados mock em `public/data/transactions.json`. Em produção, substitua por uma API real:

```typescript
// Exemplo de integração com API real
const authData = await fetch('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify(credentials)
});
```

## 🔧 Personalização

### Tema
Modifique `src/config/theme.config.ts` para personalizar cores e tipografia.

### Navegação
Edite `src/config/navItems.config.ts` para adicionar/remover itens do menu.

### Filtros
Adicione novos filtros em `src/types/transaction.types.ts` e `src/contexts/FilterContext.tsx`.

## 📱 Responsividade

O sistema é totalmente responsivo com breakpoints:
- **Mobile**: < 768px (sidebar colapsável)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deploy

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Outros provedores
```bash
# Build de produção
npm run build

# Iniciar em produção
npm start
```

## 🐛 Solução de Problemas

### Erro de autenticação
- Verifique se está usando as credenciais corretas
- Limpe o localStorage: `localStorage.clear()`

### Filtros não funcionam
- Verifique se o `FilterProvider` envolve os componentes
- Confirme se os dados estão no formato correto

### Gráficos não carregam
- Verifique se `@mui/x-charts` está instalado
- Confirme se os dados não estão vazios

## 📄 Licença

Este projeto é para fins educacionais e de demonstração.

## 🤝 Contribuições

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
4. Push para a branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

---

**Desenvolvido com ❤️ usando Next.js + TypeScript + Material-UI**
