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
  - [X] Receita total
  - [X] Despesas totais
  - [ ] Transações pendentes
  - [X] Saldo total
- [X] Criar **gráficos**:
  - [X] Gráfico de barras empilhadas (ex.: receitas x despesas por período)
  - [X] Gráfico de linhas (ex.: evolução do saldo ao longo do tempo)

---

## 🔍 Filtros Globais e Dinâmicos
- [X] Criar componente de **filtros globais**
  - [X] Filtro por **datas**
  - [X] Filtro por **contas**
  - [X] Filtro por **indústrias**
  - [X] Filtro por **estado**
- [X] Garantir que todos os componentes (cards, gráficos, lista) **atualizem conforme os filtros aplicados**
- [ ] Persistir **valores dos filtros** em `localStorage` ou `sessionStorage`

---

## 💾 Dados
- [X] Ler dados do arquivo `transactions.json`
- [X] Criar parser para:
  - [X] Converter `date` de **epoch ms → Date**
  - [X] Converter `amount` de string para número com decimais
- [X] Garantir que os dados originais **não sejam alterados**
- [X] Criar camada de utilitários para manipulação (ex.: cálculo de totais, agrupamentos por período, etc.)

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