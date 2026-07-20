/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║  TROCA DE PÁGINA — antes de lançar o curso                ║
 * ║  Altere só a linha abaixo (true/false) e faça o deploy    ║
 * ╚══════════════════════════════════════════════════════════╝
 */
const CURSO_LANCADO = false // false = mostra Formulário | true = mostra Vendas

import FormularioPage from "./formulario/forms"
import LandingPage from "./formulario/venda"

export default function Page() {
  return CURSO_LANCADO ? <LandingPage /> : <FormularioPage />
}
