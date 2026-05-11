# DEEPFLOW — Orientações de Projeto

> Documento mestre para continuar o desenvolvimento do e-commerce Deepflow Jiu Jitsu.
> Use este arquivo como contexto inicial em qualquer nova conversa com Claude.

---

## 1. RESUMO EXECUTIVO

**Marca:** Deepflow — Vestuário e equipamento de jiu jitsu.
**Posicionamento:** "Fluir é profundo." Marca premium, sóbria, com estética clássico-esportiva refinada (referências: Hayabusa, Tatami, mas com toque editorial mais moderno).
**Público:** Praticantes de jiu jitsu adultos (25–45 anos), com renda média/média-alta, que valorizam produto bem feito e identidade.
**Mercado inicial:** Brasil (BRL).

---

## 2. IDENTIDADE VISUAL

### 2.1 Logo
- **Logo principal:** `Asset_9.svg` (DEEPFLOW wordmark)
- **Ícone:** `ICONE.svg` (círculo + forma fluida — símbolo da marca)
- **Versões brancas:** `ICONE_BRANCO.svg`, `ICONE_E_LOGO_BRANCO.svg`
- **Versão sobre preto:** `fundo_preto.svg`

### 2.2 Paleta

| Token | Hex | Uso |
|---|---|---|
| `--ink` | `#0A0A0A` | Texto principal, fundos escuros, header |
| `--ink-soft` | `#1A1A1A` | Variação para gradientes |
| `--ink-muted` | `#4A4A4A` | Texto secundário, legendas |
| `--paper` | `#F5F4F0` | Fundo principal (off-white levemente quente) |
| `--paper-warm` | `#ECEAE3` | Fundo de seções alternadas |
| `--paper-deep` | `#DDD9CF` | Placeholders, divisores |
| `--line-soft` | `#E0DCD2` | Bordas finas |
| `--accent` | `#B91C1C` | Acento marcial (vermelho-sangue) |
| `--accent-deep` | `#7F1414` | Variação do acento |

> **Importante:** o acento `#B91C1C` deve ser usado com restrição (5–10% da composição). Ele é o "selo" da marca, não um elemento dominante.

### 2.3 Tipografia

- **Display:** Fraunces (Google Fonts) — para títulos, manchetes, números, citações. Use os pesos 300 (regular) e 400 (italic) para criar contraste editorial.
- **Body:** Manrope (Google Fonts) — para texto corrido, labels, botões, navegação. Pesos: 400, 500, 600, 700.
- **Eyebrows** (sobre-títulos): 11px, weight 600, letter-spacing 0.18em, uppercase, color `--ink-muted`.

### 2.4 Princípios visuais

1. **Hierarquia clara:** títulos serif grandes, body sans pequeno e funcional.
2. **Densidade controlada:** generoso em ar mas com momentos de informação densa (footer, hero meta).
3. **Detalhes:** itálicos do Fraunces, traços finos, numeração editorial (01/02/03), tickers em movimento contínuo.
4. **Placeholders:** sempre que falta uma imagem real, manter o container com hachura diagonal sutil + label `[ FOTO X ]`.

---

## 3. STACK TÉCNICO DEFINIDO

**Decisão:** Next.js 14 (App Router) + TypeScript + Tailwind + Stripe + Supabase

### 3.1 Por quê esta stack

- **Next.js App Router:** Server Components reduzem JS no cliente, ótimo SEO, rotas dinâmicas (`/produto/[slug]`, `/conta/[secao]`).
- **Stripe:** checkout, assinaturas futuras, suporte a Pix nativo no Brasil (via Stripe Brasil) ou alternativa Mercado Pago/Pagar.me se preferir.
- **Supabase:** Auth + Postgres + Storage (imagens de produto) em uma plataforma só, com row-level security.
- **Tailwind:** combina bem com os tokens já definidos no CSS atual; migração direta.

### 3.2 Estrutura de pastas recomendada

```
deepflow/
├── app/
│   ├── (shop)/
│   │   ├── page.tsx                 # Home
│   │   ├── [categoria]/page.tsx     # Listagem (kimono, rashguard, etc)
│   │   └── produto/[slug]/page.tsx  # PDP
│   ├── (account)/
│   │   ├── conta/page.tsx           # Dashboard
│   │   ├── conta/pedidos/page.tsx
│   │   ├── conta/enderecos/page.tsx
│   │   └── conta/dados/page.tsx
│   ├── (auth)/
│   │   ├── entrar/page.tsx
│   │   ├── cadastrar/page.tsx
│   │   └── recuperar/page.tsx
│   ├── carrinho/page.tsx
│   ├── checkout/page.tsx
│   ├── checkout/sucesso/page.tsx
│   ├── api/
│   │   ├── checkout/route.ts        # Stripe session
│   │   └── webhook/stripe/route.ts
│   └── layout.tsx
├── components/
│   ├── shop/                        # ProductCard, CategoryCard, PriceTag
│   ├── layout/                      # Header, Footer, MegaMenu, CartDrawer
│   ├── account/                     # OrderRow, AddressCard
│   └── ui/                          # Button, Input, etc (design system)
├── lib/
│   ├── supabase/                    # client, server, middleware
│   ├── stripe/
│   └── cart/                        # cart store (Zustand)
└── public/
    └── brand/                       # logos SVG
```

### 3.3 Migração do protótipo atual

O HTML/CSS/JS entregue é **fonte de referência visual e comportamental**, não código de produção. Para portar:

1. Converter o `index.html` em `app/page.tsx` (componentes em pedaços).
2. Migrar `styles.css` → `tailwind.config.ts` + `globals.css` (manter os CSS variables).
3. Substituir o JS inline por:
   - Zustand para estado do carrinho (com persist localStorage)
   - Server Components para listas de produtos
   - Client Components para interação (drawer, mega menu)

---

## 4. PÁGINAS A CONSTRUIR (BACKLOG)

### 4.1 ✅ Home (entregue)

- Hero com vídeo/imagem grande
- Categorias
- Lançamentos (4 produtos)
- Editorial Raiz (storytelling de coleção)
- Destaques (4 produtos)
- Pilares (4 diferenciais)
- Newsletter
- Footer denso

### 4.2 Listagem (PLP — Product Listing Page)

**Rota:** `/[categoria]` (ex: `/kimono`, `/rashguard`)

**Componentes:**
- Breadcrumb (Home / Kimono)
- Hero da categoria (banner editorial curto)
- Filtros laterais (cor, tamanho, gramatura, preço, faixa etária)
- Sort dropdown (mais vendidos, novidades, preço crescente/decrescente)
- Grid de produtos (4 colunas desktop, 2 mobile)
- Paginação ou infinite scroll
- Contador de resultados

**Filtros sugeridos para jiu jitsu:**
- Modalidade: Kimono | No-Gi
- Tamanho: A0, A1, A2, A2L, A3, A4 (adulto) / M00, M0, M1, M2, M3 (infantil)
- Cor: Branco, Preto, Azul, Cinza
- Gramatura: 350gsm, 450gsm, 550gsm
- Tecido: Pearl weave, Trançado, Ripstop

### 4.3 PDP (Product Detail Page)

**Rota:** `/produto/[slug]`

**Estrutura visual:**
- Galeria de imagens (esquerda, 60% largura desktop) — 4-6 fotos com zoom on hover
- Painel de compra (direita, 40%) sticky:
  - Eyebrow categoria
  - Nome do produto (Fraunces, grande)
  - Preço
  - Seletor de cor (swatches)
  - Seletor de tamanho (botões grandes; link para "guia de tamanhos" modal)
  - Botão "Adicionar ao carrinho" (largura total)
  - Botão "Comprar agora" (estilo ghost)
  - Trust badges (frete grátis, troca em 30 dias, parcelamento)
  - Accordion: Descrição | Composição | Cuidados | Envio
- Abaixo da galeria:
  - Tabela de medidas (para kimonos)
  - Fotos lifestyle (estilo editorial)
  - Avaliações (estrelas + comentários)
- Seção "Você também pode gostar" (carousel)
- Recently viewed (no rodapé)

### 4.4 Carrinho (página)

**Rota:** `/carrinho`

Versão expandida do drawer. Tem:
- Lista de itens com imagens grandes, controles de quantidade, remover
- Sidebar com resumo: Subtotal | Frete (calculadora por CEP) | Cupom | Total
- Botão "Finalizar compra"
- Sugestão "Faltam R$ X para frete grátis" com progress bar
- "Produtos que combinam" abaixo

### 4.5 Checkout

**Rota:** `/checkout`

Layout em uma coluna no centro (max-width 720px), com 3 etapas:

1. **Identificação:** email (se não logado, opção de criar conta ou seguir como visitante)
2. **Entrega:** CEP → preenchimento automático → escolha de método de envio (PAC, SEDEX, Motoboy)
3. **Pagamento:** Cartão (form Stripe Elements) | Pix (QR code) | Boleto

Lado direito: resumo do pedido sticky.

### 4.6 Checkout sucesso

**Rota:** `/checkout/sucesso?order=XXX`

Confirmação visual forte. Detalhes do pedido. CTA "Acompanhe seu pedido na sua conta".

### 4.7 Área do usuário (logada)

**Rota base:** `/conta`

Sidebar com:
- Resumo (dashboard)
- Meus pedidos (lista, com filtro por status)
- Endereços (cadastrar/editar/remover)
- Dados pessoais (nome, email, telefone, senha)
- Cartões salvos (Stripe)
- Lista de desejos
- Sair

**Detalhe de pedido** (`/conta/pedidos/[id]`):
- Status com timeline (Pedido recebido → Pagamento aprovado → Em separação → Enviado → Entregue)
- Rastreio (link Correios)
- Itens, valores, nota fiscal (PDF download)
- Botão "Solicitar troca"

### 4.8 Autenticação

**Rotas:** `/entrar`, `/cadastrar`, `/recuperar`

Páginas minimalistas, formulário em coluna única, branding sutil. Suporte a:
- Email + senha
- Google OAuth
- Apple OAuth

### 4.9 Páginas institucionais

- `/sobre` — Manifesto, história, fundadores, valores
- `/raiz` — Landing da coleção (storytelling rico)
- `/atletas` — Lista de atletas patrocinados
- `/lojas` — Onde encontrar fisicamente (se houver revenda)
- `/contato` — Form + WhatsApp
- `/trocas`, `/envio`, `/pagamento`, `/privacidade`, `/termos`

---

## 5. MODELO DE DADOS (Supabase)

### 5.1 Tabelas essenciais

```sql
-- Produtos
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category_id UUID REFERENCES categories(id),
  base_price NUMERIC(10,2) NOT NULL,
  status TEXT DEFAULT 'active', -- active | draft | archived
  created_at TIMESTAMPTZ DEFAULT now(),
  metadata JSONB -- gramatura, tecido, etc
);

-- Variantes (combinação cor × tamanho)
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  sku TEXT UNIQUE NOT NULL,
  color TEXT,
  size TEXT,
  price NUMERIC(10,2),
  stock INTEGER DEFAULT 0,
  weight_g INTEGER -- para cálculo de frete
);

-- Imagens
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT,
  position INTEGER DEFAULT 0
);

-- Categorias
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  parent_id UUID REFERENCES categories(id),
  position INTEGER DEFAULT 0
);

-- Endereços
CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  label TEXT, -- "Casa", "Trabalho"
  recipient TEXT,
  zip TEXT,
  street TEXT,
  number TEXT,
  complement TEXT,
  district TEXT,
  city TEXT,
  state TEXT,
  is_default BOOLEAN DEFAULT false
);

-- Pedidos
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  order_number TEXT UNIQUE NOT NULL, -- DF-2026-00001
  status TEXT DEFAULT 'pending',
  -- pending | paid | preparing | shipped | delivered | cancelled | refunded
  subtotal NUMERIC(10,2),
  shipping_cost NUMERIC(10,2),
  discount NUMERIC(10,2) DEFAULT 0,
  total NUMERIC(10,2),
  shipping_address JSONB,
  payment_method TEXT,
  stripe_payment_intent TEXT,
  tracking_code TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES product_variants(id),
  quantity INTEGER,
  unit_price NUMERIC(10,2),
  snapshot JSONB -- nome, imagem etc no momento da compra
);

-- Wishlist
CREATE TABLE wishlist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Cupons
CREATE TABLE coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT, -- percent | fixed | free_shipping
  discount_value NUMERIC(10,2),
  min_order NUMERIC(10,2),
  expires_at TIMESTAMPTZ,
  uses_left INTEGER
);
```

### 5.2 Políticas de Row-Level Security

- `auth.users` controla acesso.
- `orders` e `addresses`: usuário só vê os próprios (`user_id = auth.uid()`).
- `products`, `categories`, `product_images`: leitura pública, escrita só admin.
- Wishlist: leitura/escrita só do dono.

---

## 6. INTEGRAÇÕES NECESSÁRIAS

### 6.1 Pagamento

**Opção A — Stripe Brasil**
- Pix, Cartão, Boleto
- Excelente DX, taxas competitivas
- Stripe Elements para checkout custom

**Opção B — Mercado Pago / Pagar.me**
- Mais arraigado no Brasil
- Melhor suporte a Pix
- Recomendado se priorizar conversão BR

> Sugestão: começar com **Stripe** pela DX e migrar se taxas/cobertura for problema.

### 6.2 Frete

- **Melhor Envio** (API agregadora — Correios + transportadoras privadas)
- Cálculo por CEP em tempo real
- Geração de etiquetas após confirmação de pagamento

### 6.3 Email transacional

- **Resend** ou **Postmark**
- Templates: confirmação de pedido, pagamento aprovado, enviado, entregue, troca solicitada
- Newsletter: integrar com **Mailchimp** ou **Brevo** (ex-Sendinblue)

### 6.4 Analytics

- **Plausible** (privacy-friendly) ou GA4
- Meta Pixel (eventos: ViewContent, AddToCart, InitiateCheckout, Purchase)
- TikTok Pixel se vier público mais jovem
- Hotjar/Microsoft Clarity para session replay

### 6.5 Painel administrativo

Para o cliente final gerenciar produtos, pedidos e estoque sem dependência do dev:

- **Opção A:** Painel custom no `/admin` (mais trabalho, controle total)
- **Opção B:** **Supabase Studio** + algumas views customizadas
- **Opção C:** **Retool** ou **Tooljet** (rápido, mas dependência externa)
- **Opção D:** Migrar produtos para **Shopify (headless)** e usar painel Shopify, mantendo Next no front

> Sugestão: começar com **Supabase Studio** para o MVP e migrar para painel custom quando o volume justificar.

---

## 7. DECISÃO ALTERNATIVA: WORDPRESS / SHOPIFY?

Você levantou a dúvida. Análise honesta:

| Critério | Next.js custom | WordPress + Woo | Shopify |
|---|---|---|---|
| **Tempo até lançar** | Alto (6-8 semanas) | Baixo (1-2 semanas) | Baixo (1-2 semanas) |
| **Custo recorrente** | Hospedagem Vercel (~R$100/mês) + Supabase free → ~R$200/mês | Hospedagem (~R$50/mês) + plugins pagos | R$200-1000/mês (planos) + apps |
| **Performance/SEO** | Excelente | Médio (depende de plugins/cache) | Bom |
| **Identidade visual fiel** | 100% controle | Limitado por temas/builders | Limitado por temas (Liquid) |
| **Manutenção** | Você gerencia | Atualizações constantes de plugins | Quase zero |
| **Cliente edita sozinho** | Precisa painel custom | Sim, painel WP | Sim, painel Shopify |
| **Escalabilidade** | Excelente | Difícil em alto volume | Excelente |

**Recomendação para Deepflow:**

Se a marca é nova e o objetivo é validar mercado rapidamente → **Shopify** com tema custom desenvolvido a partir do design entregue. Pode usar o front Next.js apenas para a landing/manifesto da marca e Shopify Buy Button para o checkout, ou ir totalmente headless (Shopify + Next.js Hydrogen).

Se o objetivo é diferenciação radical no front e construir um asset de longo prazo → **Next.js custom**.

Se o cliente é mais técnico/orçamento apertado → **WordPress + WooCommerce** com tema baseado no design (mas a fidelidade visual ficará 70-80%, não 100%).

> **Sugestão prática:** se você é o desenvolvedor e quer mostrar o seu trabalho, **Next.js custom é a escolha que valoriza o portfólio**. Se a Deepflow é cliente terceiro com pressa, **Shopify Headless** é o caminho mais defensável.

---

## 8. ROADMAP DE DESENVOLVIMENTO

### Fase 1 — Fundação (1-2 semanas)
- [ ] Setup Next.js + Supabase + Stripe
- [ ] Portar home do protótipo
- [ ] Criar componentes base do design system (Button, Input, Eyebrow, ProductCard)
- [ ] Configurar fonts e tokens em Tailwind config

### Fase 2 — Catálogo (1-2 semanas)
- [ ] Schema do banco (produtos, categorias, variantes)
- [ ] Página de categoria (listagem)
- [ ] PDP completa
- [ ] Cadastrar primeiros 20-30 produtos

### Fase 3 — Carrinho e Checkout (2 semanas)
- [ ] Zustand store + persist
- [ ] Drawer e página de carrinho
- [ ] Checkout em 3 etapas
- [ ] Integração Stripe (cartão + Pix + boleto)
- [ ] Webhook Stripe → criar order no Supabase
- [ ] Página de sucesso + email transacional

### Fase 4 — Área do usuário (1 semana)
- [ ] Auth Supabase (email/senha + Google)
- [ ] Dashboard, pedidos, endereços, dados
- [ ] Wishlist

### Fase 5 — Frete e operações (1 semana)
- [ ] Integração Melhor Envio
- [ ] Cálculo de frete na PDP e checkout
- [ ] Geração de etiquetas pós-venda

### Fase 6 — Admin e polish (1-2 semanas)
- [ ] Painel admin custom OU configuração Supabase Studio
- [ ] SEO técnico (sitemap, robots, Open Graph dinâmico)
- [ ] Performance audit (Lighthouse > 95)
- [ ] Acessibilidade (axe DevTools)
- [ ] Testes E2E críticos (Playwright)

### Fase 7 — Marketing e lançamento
- [ ] Páginas institucionais (Sobre, Manifesto Raiz)
- [ ] Blog (se aplicável)
- [ ] Integração com Meta Pixel/GA4
- [ ] Programa de afiliados/embaixadores

---

## 9. REGRAS DE OURO PARA CLAUDE EM SESSÕES FUTURAS

1. **Nunca quebrar a identidade visual** — sempre usar Fraunces + Manrope, paleta definida, e o acento `#B91C1C` com parcimônia.
2. **Placeholders consistentes** — todo container de imagem sem foto deve ter hachura diagonal + label `[ FOTO X ]` no estilo já implementado.
3. **Sem AI slop** — evitar gradientes roxos, Inter, Space Grotesk, sombras excessivas, "purple-to-pink".
4. **Detalhes editoriais** — numeração 01/02, italicos serif, eyebrows uppercase, tickers em movimento.
5. **Performance > tudo** — Server Components por padrão, imagens otimizadas (next/image), sem JS desnecessário.
6. **Mobile first** — todos os layouts devem ter versão mobile pensada, não improvisada.
7. **Português BR** — toda copy em português brasileiro, com tom sóbrio (não publicitário berrante).

---

## 10. ARQUIVOS ENTREGUES NESTA FASE

- `index.html` — home conceito navegável
- `styles.css` — design system completo em CSS puro
- `script.js` — interações (carrinho mock, mega menu, mobile menu)
- `assets/logo.svg`, `assets/icone.svg`, `assets/icone_branco.svg`
- `ORIENTACOES.md` — este documento

**Como rodar localmente:** abrir `index.html` em qualquer navegador moderno. Não há build step neste protótipo — é HTML/CSS/JS vanilla intencionalmente, para o cliente conseguir abrir o arquivo direto.
