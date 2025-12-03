# 📦 Logistics Manager

> **Simulador de Gerenciamento de Armazém e Centro de Distribuição**

Um jogo de estratégia e gerenciamento em tempo real inspirado na logística real da **Henry Schein**, empresa líder em produtos médicos e odontológicos. Gerencie seu centro de distribuição, otimize processos de picking, controle inventário e domine a cadeia de suprimentos!

![Made with React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=flat-square&logo=typescript)
![PixiJS](https://img.shields.io/badge/PixiJS-8+-FF3C7E?style=flat-square&logo=pixi.js)
![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=flat-square&logo=vite)

---

## 🎮 Sobre o Jogo

**Logistics Manager** é um simulador de gestão logística onde você gerencia todas as operações de um centro de distribuição de produtos médicos e odontológicos. O jogo simula os desafios reais da cadeia de suprimentos:

- 📥 **Recebimento de mercadorias** de caminhões
- 📦 **Armazenagem estratégica** baseada na Curva ABC
- 🔍 **Picking e separação** de pedidos
- 📊 **Gestão de inventário** e acuracidade
- 👷 **Gerenciamento de recursos humanos**
- ❄️ **Cadeia fria** (produtos refrigerados)
- 🔒 **Produtos controlados** (requerem segurança especial)
- ⏱️ **Sistema FEFO** (First Expired, First Out - produtos com validade)

---

## 🎯 Conceito e Mecânicas

### 🏗️ O Armazém

O jogo apresenta uma **visualização top-down** (vista de cima) do seu centro de distribuição, dividido em diferentes áreas:

| Área | Cor | Função |
|------|-----|--------|
| 📥 **Docas de Recebimento** | 🟢 Verde | Onde os caminhões chegam com mercadorias |
| 📤 **Docas de Expedição** | 🔴 Vermelho | Onde os pedidos são despachados |
| 📦 **Racks Padrão** | 🔵 Azul | Armazenamento geral de produtos |
| ❄️ **Racks Refrigerados** | 🩵 Ciano | Para produtos de cadeia fria (vacinas, insulina) |
| 🔒 **Gaiola de Controlados** | 🟡 Laranja | Para anestésicos e produtos controlados |
| 📦 **Área de Embalagem** | 🟣 Roxo | Preparação final dos pedidos |

### 📋 Catálogo de Produtos

O jogo inclui **13 produtos médicos/odontológicos** reais, cada um com características únicas:

**Curva A (Alta Rotação):**
- Luvas de Látex
- Máscaras Cirúrgicas
- Seringas Descartáveis

**Curva B (Média Rotação):**
- Anestésicos (Lidocaína, Articaína) - **Controlados** 🔒
- Insulina - **Cadeia Fria** ❄️
- Gazes, Algodão, Brocas

**Curva C (Baixa Rotação):**
- Vacinas - **Cadeia Fria** ❄️
- Equipamentos (Bisturi Elétrico, Cadeira Odontológica)

### ⚙️ Sistema de Tarefas

O jogo automaticamente gera e processa diferentes tipos de tarefas:

1. **📥 Recebimento**: Descarregar caminhões nas docas
2. **📦 Armazenagem (Putaway)**: Guardar produtos nas prateleiras corretas
3. **🔍 Picking**: Separar itens do estoque para atender pedidos
4. **📦 Embalagem**: Preparar pedidos para expedição
5. **🚚 Expedição**: Carregar pedidos nos caminhões de entrega
6. **📊 Inventário**: Conferir acuracidade do estoque
7. **♻️ Reabastecimento**: Mover produtos da reserva para área de picking

### 👷 Recursos Humanos

- Você começa com **5 funcionários**
- Cada funcionário tem:
  - **Skill** (habilidade): Afeta velocidade das tarefas
  - **Fatigue** (fadiga): Aumenta ao longo do dia
- Funcionários são **alocados automaticamente** para tarefas pendentes
- Quando ocupados, ficam indisponíveis para novas tarefas

### 🕐 Sistema de Tempo

- **1 segundo real = 1 minuto no jogo**
- Dia completo = 24 horas do jogo
- **Horário Comercial**:
  - Pedidos: 08:00 - 18:00
  - Recebimento de caminhões: 06:00 - 14:00
- Controle de velocidade: **1x, 2x ou 3x**

### 📊 Eventos Automáticos

#### 🚚 Chegada de Caminhões
- Chegam aleatoriamente durante o horário de recebimento
- Trazem 2-6 tipos diferentes de produtos
- Quantidades baseadas na Curva ABC
- Cada lote tem número e data de validade

#### 📋 Pedidos de Clientes
- Gerados durante horário comercial
- **4 níveis de prioridade**:
  - 🔴 **Urgente**: 1 hora para atender
  - 🟡 **Alta**: 3 horas
  - 🟢 **Média**: 6 horas
  - 🔵 **Baixa**: 8 horas
- Contêm 1-5 itens diferentes
- Clientes identificados por código

---

## 🎮 Como Jogar

### 🚀 Instalação e Execução

```bash
# 1. Clone ou navegue até o diretório do projeto
cd "Game Logistica2"

# 2. Instale as dependências (se ainda não instalou)
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev

# 4. Abra no navegador
# Acesse: http://localhost:5173
```

### 🎯 Interface do Jogo

A tela é dividida em **3 painéis principais**:

#### 1️⃣ **Painel Esquerdo - Status**
- 💰 Dinheiro disponível
- 📅 Dia atual
- 🕐 Hora do jogo
- 👷 Funcionários disponíveis/total
- 📦 Operações ativas
- 📈 Estatísticas de desempenho
- ⏸️ Controles de pausa/velocidade

#### 2️⃣ **Painel Central - Armazém**
- 🏭 Visualização do CD em grid
- Células coloridas por tipo
- Indicação de ocupação
- Clique em células para ver detalhes (console)

#### 3️⃣ **Painel Direito - Tarefas**
- 📋 Lista de pedidos pendentes
- ⚙️ Tarefas em andamento
- Barras de progresso
- Prazos e prioridades

### 🎮 Jogabilidade Atual

Na versão atual, o jogo opera em **modo automático**:

1. **Observe** o sistema funcionando
2. **Analise** os pedidos que entram e suas prioridades
3. **Monitore** a alocação de funcionários
4. **Acompanhe** as barras de progresso das tarefas
5. **Controle** a velocidade e pause quando necessário
6. **Estude** as estatísticas para otimizar

> 💡 **Dica**: Use a velocidade 3x para ver muita ação, e pause para analisar situações complexas!

---

## 🏆 Desafios Logísticos

### ⚠️ Gargalos de Pessoal
- **Problema**: Chegam 3 caminhões + 10 pedidos ao mesmo tempo
- **Dilema**: Priorizar recebimento ou expedição?
- **Consequência**: Pedidos atrasados ou caminhões parados (multa)

### 📍 Slotting Inadequado
- **Problema**: Produto Curva A guardado longe da expedição
- **Consequência**: Picking lento, baixa produtividade

### ❄️ Cadeia Fria Crítica
- **Problema**: Vacina na doca por muito tempo
- **Consequência**: Produto estraga, prejuízo grande

### ⏰ Gerenciamento de Prazos
- **Problema**: Múltiplos pedidos urgentes simultâneos
- **Consequência**: Taxa de acerto cai, clientes insatisfeitos

---

## 🛠️ Tecnologias Utilizadas

### Core
- **[React 18+](https://react.dev/)**: Framework UI
- **[TypeScript 5+](https://www.typescriptlang.org/)**: Type safety
- **[Vite 5+](https://vitejs.dev/)**: Build tool ultrarrápido

### Renderização
- **[PixiJS 8+](https://pixijs.com/)**: Renderização 2D de alta performance
- Usa WebGL para gráficos acelerados
- Grid interativo com 240 células (12x20)

### Arquitetura
- **Custom React Hook** (`useGameLoop`) para lógica do jogo
- **Estado centralizado** com TypeScript interfaces
- **Sistema de eventos** desacoplado
- **Tempo real** com `setInterval` e delta time

---

## 📁 Estrutura do Projeto

```
d:\estudos\Game Logistica2/
├── src/
│   ├── components/              # Componentes React
│   │   ├── WarehouseRenderer.tsx   # Grid PixiJS do armazém
│   │   ├── WarehouseRenderer.css
│   │   ├── StatusPanel.tsx         # Painel de status/controles
│   │   ├── StatusPanel.css
│   │   ├── TasksPanel.tsx          # Lista de pedidos/tarefas
│   │   └── TasksPanel.css
│   │
│   ├── data/                    # Dados do jogo
│   │   └── items.ts                # Catálogo de produtos
│   │
│   ├── hooks/                   # React Hooks
│   │   └── useGameLoop.ts          # Loop principal do jogo
│   │
│   ├── utils/                   # Utilitários
│   │   ├── gameInit.ts             # Inicialização do estado
│   │   └── eventGenerator.ts       # Geração de eventos aleatórios
│   │
│   ├── types.ts                 # Definições TypeScript
│   ├── App.tsx                  # Componente raiz
│   ├── App.css                  # Estilos principais
│   ├── main.tsx                 # Entry point
│   └── index.css                # Reset CSS
│
├── index.html                   # HTML template
├── package.json                 # Dependências
├── tsconfig.json                # Config TypeScript
├── vite.config.ts               # Config Vite
└── README.md                    # Este arquivo
```

---

## 🎨 Design

### Paleta de Cores
- **Background**: Gradiente escuro (#0f172a → #1e293b)
- **Primária**: Azul (#3b82f6)
- **Secundária**: Roxo (#8b5cf6)
- **Sucesso**: Verde (#10b981)
- **Alerta**: Amarelo (#f59e0b)
- **Erro**: Vermelho (#ef4444)

### Elementos Visuais
- ✨ **Gradientes animados** no header
- 🔮 **Glassmorphism** nos painéis
- 🎯 **Micro-animações** hover
- 📊 **Barras de progresso** animadas
- 🎨 **Esquema de cores consistente**

---

## 🚀 Roadmap Futuro

### Versão 2.0 - Interatividade
- [ ] Clique para construir/modificar layout
- [ ] Drag & drop para mover produtos
- [ ] Atribuição manual de tarefas
- [ ] Contratar/demitir funcionários
- [ ] Comprar equipamentos

### Versão 3.0 - Complexidade
- [ ] Sistema de upgrades (empilhadeiras, WMS, automação)
- [ ] Eventos aleatórios (quebras, inspeções, greves)
- [ ] Sistema de validade FEFO funcionando
- [ ] Produtos estragando (perda $$$)
- [ ] Inventários rotativos obrigatórios
- [ ] Multas por atrasos

### Versão 4.0 - Progressão
- [ ] Sistema de níveis/campanha
- [ ] Múltiplos armazéns
- [ ] Achievements/conquistas
- [ ] Leaderboard
- [ ] Save/Load game
- [ ] Tutorial interativo

---

## 🤝 Contribuindo

Este projeto foi criado como um **aprendizado prático** de desenvolvimento de jogos web. Sugestões e melhorias são bem-vindas!

### Como contribuir:
1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Add: Nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

---

## 📚 Aprendizados

Este projeto foi desenvolvido para aprender:
- ✅ Gerenciamento de estado complexo em React
- ✅ Integração de PixiJS com React
- ✅ Desenvolvimento de game loops
- ✅ TypeScript avançado
- ✅ Arquitetura de jogos web
- ✅ Sistema de eventos e tarefas
- ✅ Design de UI/UX para jogos

---

## 🙏 Inspiração

Este jogo foi inspirado em:
- **Experiência real** de trabalho na **Henry Schein**
- Conceitos de **Supply Chain Management**
- Jogos como: *Factorio*, *Big Pharma*, *Game Dev Tycoon*
- Conversas sobre **game design** e logística

---

## 📝 Licença

Este projeto é de código aberto e está disponível sob a licença **ISC**.

---

## 🎮 Divirta-se!

Desenvolvido com ❤️ para aprender sobre **logística**, **gestão** e **desenvolvimento de jogos**.

**Bom jogo! 🚀📦**

---

## 📞 Contato

Tem dúvidas ou sugestões? Abra uma issue no repositório!

---

*Última atualização: Dezembro 2025*
