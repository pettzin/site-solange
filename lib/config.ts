/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║  LOIROS IMPECÁVEIS — CONFIGURAÇÃO CENTRAL               ║
 * ║  Altere apenas este arquivo antes de publicar           ║
 * ╚══════════════════════════════════════════════════════════╝
 */

// ─── LINKS ────────────────────────────────────────────────────────────────────
export const HOTMART_URL    = "https://pay.hotmart.com/SEULINK" // ← checkout
export const WHATSAPP_NUMBER = "5511978111150"                   // ← com DDI, sem +

// ─── CONTEÚDO ─────────────────────────────────────────────────────────────────
export const SITE_NAME   = "Loiros Impecáveis"
export const MENTORA     = "Solange Jesus"
export const INSTAGRAM   = "https://instagram.com/loirosimpecaveis"

// ─── OFERTA ───────────────────────────────────────────────────────────────────
export const PRECO_DE   = "R$ 997,00"
export const PRECO_POR  = "R$ 397"
export const PARCELAMENTO = "12x R$ 41,06"

// ─── HELPERS ──────────────────────────────────────────────────────────────────
export function buildWhatsAppURL(mensagem?: string) {
  const texto = mensagem ?? `Olá! Tenho interesse no ${SITE_NAME} e gostaria de mais informações.`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`
}

export function buildFormWhatsAppURL(nome: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Olá, meu nome é ${nome}, tenho interesse no curso de loiros e gostaria de mais informações.`
  )}`
}

// ─── IMAGENS DE PROVA SOCIAL (CARROSSEL) ──────────────────────────────────────
// Coloque os arquivos de imagem dentro da pasta "public" na raiz do projeto.
// Ex: se o arquivo for "public/aluna1.jpg", escreva apenas "/aluna1.jpg"
export const PROVA_SOCIAL_IMAGES = [
  "/prova1.jpg", 
  "/conceicao.jpg",
  "/prova2.jpg",
  "/ingrid_lira.jpg",
  "/prova3.jpg",
  "/milene_araujo.jpg",
  "/prova4.jpg",
  "/monica.jpg",
  "/prova5.jpg",
  "/talita.jpg",
  "/prova6.jpg",
  "/prova7.jpg",
  "/prova8.jpg",
  "/prova9.jpg",
  "/prova10.jpg",
  "/prova11.jpg",
  "/prova12.jpg",
  "/prova13.jpg",
]

// ─── IMAGENS DE RAÍZES (CARROSSEL TÉCNICO) ────────────────────────────────────
export const RAIZES_IMAGES = [
  { src: "/raiz-1.jpg", caption: "Loiro platinado — sem nenhuma marca" },
  { src: "/raiz-2.jpg", caption: "Mechas finas — transição perfeita" },
  { src: "/raiz-3.jpg", caption: "Balayage — raiz integrada com precisão" },
  { src: "/raiz-4.jpg", caption: "Loiro dourado — borda a borda" },
  { src: "/raiz-5.jpg", caption: "Free Hands — sem sobreposição" },
  { src: "/raiz-6.jpg", caption: "Luminous Slice — execução limpa" },
  { src: "/raiz-7.jpg", caption: "Soft Blond — zero marcação" },
  { src: "/raiz-8.jpg", caption: "Blond Diamond — resultado impecável" },
]