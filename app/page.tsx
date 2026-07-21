import type { Metadata } from 'next'
import FormularioPage from "./formulario/forms"
import LandingPage from "./formulario/venda"

/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║  TROCA DE PÁGINA — antes de lançar o curso               ║
 * ║  Altere só a linha abaixo (true/false) e faça o deploy   ║
 * ╚══════════════════════════════════════════════════════════╝
 */
const CURSO_LANCADO = false // false = mostra Formulário | true = mostra Vendas

// ── Metadata Dinâmico baseado no status do curso ─────────────────────────────
export const metadata: Metadata = CURSO_LANCADO
  ? {
      title: 'Curso Completo de Mechas Sem Medo | Solange Jesus Academy',
      description: 'Matricule-se no curso completo Mechas Sem Medo da Solange Jesus. Domine a técnica de loiros impecáveis e transforme a sua carreira.',
      openGraph: {
        title: 'Curso Completo de Mechas Sem Medo | Solange Jesus Academy',
        description: 'Matricule-se no curso completo Mechas Sem Medo da Solange Jesus. Domine a técnica de loiros impecáveis e transforme a sua carreira.',
        images: [{ url: '/og-vendas.jpg', width: 1200, height: 630 }],
      },
    }
  : {
      title: 'Mechas Sem Medo | Solange Jesus Academy',
      description: 'Descubra o método MSM Mechas Sem Medo com Solange Jesus. A Sol vai pegar na sua mão e ajudar a eliminar sua insegurança em fazer mechas, sem segredos escondidos e sem truques!',
      openGraph: {
        title: 'Mechas Sem Medo | Solange Jesus Academy',
        description: 'Descubra o método MSM Mechas Sem Medo com Solange Jesus. A Sol vai pegar na sua mão e ajudar a eliminar sua insegurança em fazer mechas, sem segredos escondidos e sem truques!',
        images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
      },
    }

export default function Page() {
  return CURSO_LANCADO ? <LandingPage /> : <FormularioPage />
}