# 🌟 Loiros Impecáveis — Landing Page Premium

Projeto Next.js de alta conversão para curso profissional de beleza.

## 🚀 Como rodar

```bash
npm install
npm run dev
```

## ⚙️ Configuração

Antes de publicar, altere as variáveis nas páginas:

### `app/page.tsx` (Landing Page)
```ts
const HOTMART_URL = "https://pay.hotmart.com/SEULINK"   // ← Link do checkout Hotmart
const WHATSAPP_NUMBER = "5511999999999"                   // ← Seu número com DDI
```

### `app/formulario/page.tsx` (/formulario)
```ts
const WHATSAPP_NUMBER = "5511999999999"  // ← Seu número com DDI
```

## 📄 Estrutura

```
app/
├── globals.css         # Design system completo (tokens, animações, classes)
├── layout.tsx          # Layout raiz com fontes (Great Vibes + Playfair Display)
├── page.tsx            # Landing page principal → botões vão para Hotmart
└── formulario/
    └── page.tsx        # Formulário → redireciona para WhatsApp
```

## 🎨 Paleta de Cores

| Token | Cor | Uso |
|-------|-----|-----|
| `--brown-deep` | `#6B4F3A` | Base, backgrounds escuros |
| `--brown-warm` | `#A97562` | Textos secundários |
| `--tan` | `#BFA188` | Bordas, placeholders |
| `--cream` | `#F5EDE6` | Fundo principal |
| `--blush` | `#FAEBE6` | Variação clara |
| `--gold` | gradiente | Sempre como gradiente, nunca sólido |

## ✨ Features

- **Landing Page** completa com Hero, Benefícios, Módulos, Autoridade, Depoimentos, FAQ, Oferta e CTA Final
- **Página /formulario** com labels flutuantes, validação em tempo real e redirect para WhatsApp
- **WhatsApp FAB** fixo em todas as páginas
- **Animações** de scroll reveal, counter animation, partículas, text shimmer
- **Totalmente responsivo** — mobile-first
- **TypeScript** sem erros
- **Zero dependências extras** — só Next.js + Tailwind CSS + Lucide

## 🔗 Links externos

- Botões "Quero Acesso" → Hotmart (nova aba)
- Botão WhatsApp → `wa.me/NUMERO?text=mensagem_codificada`
- Redirect automático 5s após formulário enviado
