# ToDo - Projeto Dashboard Financeiro (Next.js + Typescript + styled-components)

## 🔑 Autenticação
- [ ] Criar **página de login** (`/login`)
- [ ] Implementar autenticação simples (mock/sessão em memória ou localStorage)
- [ ] Proteger rotas (ex: `/dashboard` só acessível logado)
- [ ] Implementar **logout** no menu lateral

---

## 📊 Dashboard
- [ ] Criar **página da Dashboard** protegida pelo login
- [X] Implementar **sidebar exclusiva** com opções de **Home** e **Logout**
- [ ] Criar **cards de resumo**:
  - [ ] Receita total
  - [ ] Despesas totais
  - [ ] Transações pendentes
  - [ ] Saldo total
- [ ] Criar **gráficos**:
  - [ ] Gráfico de barras empilhadas (ex.: receitas x despesas por período)
  - [ ] Gráfico de linhas (ex.: evolução do saldo ao longo do tempo)

---

## 🔍 Filtros Globais e Dinâmicos
- [ ] Criar componente de **filtros globais**
  - [ ] Filtro por **datas**
  - [ ] Filtro por **contas**
  - [ ] Filtro por **indústrias**
  - [ ] Filtro por **estado**
- [ ] Garantir que todos os componentes (cards, gráficos, lista) **atualizem conforme os filtros aplicados**
- [ ] Persistir **valores dos filtros** em `localStorage` ou `sessionStorage`

---

## 💾 Dados
- [ ] Ler dados do arquivo `transactions.json`
- [ ] Criar parser para:
  - [ ] Converter `date` de **epoch ms → Date**
  - [ ] Converter `amount` de string para número com decimais
- [ ] Garantir que os dados originais **não sejam alterados**
- [ ] Criar camada de utilitários para manipulação (ex.: cálculo de totais, agrupamentos por período, etc.)

---

## 🎨 Estilização e UI
- [ ] Implementar design **responsivo e interativo**
- [ ] Usar **styled-components** para estilização
- [ ] (Opcional) Integrar biblioteca de UI (MUI, Chakra, etc.)
- [ ] Usar biblioteca de gráficos (Chart.js, Highcharts, Recharts, etc.)

---

## 🚀 Extras (Opcionais / Recomendados)
- [ ] Deploy na **Vercel**
- [ ] Configurar **Cache do Next.js**
- [ ] Criar **testes unitários** para componentes principais
- [ ] Adicionar **README.md** com:
  - [ ] Instruções de instalação
  - [ ] Como rodar o projeto
  - [ ] Observações relevantes

---

## ✅ Entregáveis
- [ ] Repositório com o projeto completo
- [ ] Arquivo `README.md` com instruções
- [ ] Link do deploy (se realizado)