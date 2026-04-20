/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║  LOIROS IMPECÁVEIS — CONFIGURAÇÃO CENTRAL               ║
 * ║  Altere apenas este arquivo antes de publicar           ║
 * ╚══════════════════════════════════════════════════════════╝
 */

// ─── LINKS ────────────────────────────────────────────────────────────────────
export const HOTMART_URL    = "https://pay.hotmart.com/SEULINK" // ← checkout
export const WHATSAPP_NUMBER = "5511999999999"                   // ← com DDI, sem +

// ─── CONTEÚDO ─────────────────────────────────────────────────────────────────
export const SITE_NAME   = "Loiros Impecáveis"
export const MENTORA     = "Solange Jesus"
export const INSTAGRAM   = "https://instagram.com/loirosimpecaveis"

// ─── OFERTA ───────────────────────────────────────────────────────────────────
export const PRECO_DE   = "R$ 597,00"
export const PRECO_POR  = "R$ 297"
export const PARCELAMENTO = "12x R$ 29,70"

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
