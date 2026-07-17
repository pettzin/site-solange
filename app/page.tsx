"use client"

import { useState, useEffect, useCallback } from "react"
import { Check, Lock, AlertCircle, MessageCircle, Sparkles, Star, Scissors } from "lucide-react"

/* ─── CONFIG ─────────────────────────────────────────────────────────────────── */
const WHATSAPP_NUMBER = "5511999999999" 

function buildWhatsAppURL(nome: string) {
  const msg = `Oi, meu nome é ${nome} e quero saber mais sobre o Método MSM`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}

/* ─── HELPERS ────────────────────────────────────────────────────────────────── */
function formatPhone(value: string): string {
  const n = value.replace(/\D/g, "").slice(0, 11)
  if (n.length <= 2) return n
  if (n.length <= 7) return `(${n.slice(0, 2)}) ${n.slice(2)}`
  return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`
}

/* ─── COMPONENTE: TELA DE SUCESSO ────────────────────────────────────────────── */
function SuccessScreen({ nome, whatsappUrl }: { nome: string; whatsappUrl: string }) {
  const firstName = nome.split(" ")[0]
  const [redirect, setRedirect] = useState(5)

  useEffect(() => {
    const interval = setInterval(() => {
      setRedirect((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          window.open(whatsappUrl, "_blank")
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [whatsappUrl])

  return (
    <main className="min-h-[100svh] flex items-center justify-center px-5 py-12 relative overflow-hidden" 
      style={{ background: "#4A3628", color: "white" }}>
      
      {/* DETALHES DE FUNDO (Igual ao formulário) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(var(--gold-light) 0.5px, transparent 0.5px)`, backgroundSize: '30px 30px' }} 
      />

      <div className="absolute top-20 -left-12 opacity-[0.07] rotate-12 pointer-events-none">
        <Scissors size={260} style={{ color: "var(--gold-light)" }} />
      </div>
      
      <div className="absolute bottom-10 -right-10 opacity-[0.1] -rotate-12 pointer-events-none">
        <Sparkles size={220} style={{ color: "var(--gold-shine)" }} />
      </div>

      <div className="relative z-10 max-w-md w-full text-center">
        {/* Check animado com Glow Dourado */}
        <div className="w-24 h-24 mx-auto mb-10 rounded-full flex items-center justify-center animate-pulse-gold shadow-[0_0_30px_rgba(201,168,76,0.3)]"
          style={{ 
            background: "linear-gradient(135deg, var(--gold-warm), var(--gold-shine))",
            border: "2px solid rgba(255,255,255,0.2)"
          }}>
          <Check size={44} style={{ color: "white", strokeWidth: 3 }} />
        </div>

        <p style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: "clamp(3rem, 10vw, 4.5rem)", color: "var(--gold-light)", lineHeight: 1 }}>
          Incrível,
        </p>
        <p style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: "clamp(3rem, 10vw, 4.5rem)", color: "var(--gold-light)", lineHeight: 1.15, marginBottom: "1.5rem" }}>
          {firstName}!
        </p>

        <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "1.3rem", color: "white", marginBottom: "0.75rem", letterSpacing: "0.02em" }}>
          Sua mensagem está <span className="gold-text-dark">pronta para enviar</span>
        </h2>
        
        <p style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "2.5rem" }}>
          Você será redirecionada para o WhatsApp em <br />
          <strong className="text-white bg-white/10 px-2 py-0.5 rounded" style={{ color: "var(--gold-light)" }}>{redirect} segundos</strong>.
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold animate-glow w-full shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
          style={{ fontSize: "0.95rem", padding: "1.2rem 2rem", borderRadius: "1rem" }}
        >
          <MessageCircle size={20} />
          Ir para o WhatsApp Agora
        </a>
      </div>
    </main>
  )
}

/* ─── CAMPO COM LABEL FLUTUANTE ──────────────────────────────────────────────── */
function FloatingField({
  id, label, type = "text", value, onChange, error, disabled, placeholder,
}: {
  id: string; label: string; type?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string; disabled?: boolean; placeholder?: string;
}) {
  const [focused, setFocused] = useState(false)
  const hasValue = value.length > 0
  const isActive = focused || hasValue

  return (
    <div className="relative">
      <label
        htmlFor={id}
        style={{
          position: "absolute", left: "1.1rem", top: isActive ? "0.45rem" : "50%",
          transform: isActive ? "translateY(0) scale(0.78)" : "translateY(-50%) scale(1)",
          transformOrigin: "left", fontFamily: "var(--font-sans)",
          fontSize: isActive ? "0.72rem" : "0.95rem", fontWeight: isActive ? 700 : 400,
          color: error ? "#dc2626" : focused ? "var(--gold)" : "var(--tan)",
          transition: "all 0.25s cubic-bezier(0.22,1,0.36,1)", pointerEvents: "none", zIndex: 1,
          background: isActive ? "white" : "transparent", padding: isActive ? "0 0.25rem" : "0",
          letterSpacing: isActive ? "0.05em" : "normal", textTransform: isActive ? "uppercase" : "none",
        }}
      >
        {label}
      </label>
      <input
        id={id} type={type} value={value} disabled={disabled}
        placeholder={isActive ? placeholder : ""}
        onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        className={`input-luxury${error ? " error" : ""}`}
        style={{
          paddingTop: isActive ? "1.5rem" : "1rem", paddingBottom: isActive ? "0.5rem" : "1rem",
          borderColor: error ? "#dc2626" : focused ? "var(--gold)" : "rgba(191,161,136,0.3)",
          boxShadow: focused && !error ? "0 0 0 3px rgba(201,168,76,0.1)" : "none",
          background: "white"
        }}
      />
      {error && <p className="flex items-center gap-1 mt-1.5" style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "#dc2626" }}><AlertCircle size={11} /> {error}</p>}
    </div>
  )
}

/* ─── PÁGINA PRINCIPAL ───────────────────────────────────────────────────────── */
export default function FormularioPage() {
  const [mounted, setMounted]         = useState(false)
  const [nome, setNome]               = useState("")
  const [phone, setPhone]             = useState("")
  const [email, setEmail]             = useState("")
  const [errors, setErrors]           = useState<{ nome?: string; phone?: string; email?: string }>({})
  const [submitting, setSubmitting]   = useState(false)
  const [submitted, setSubmitted]     = useState(false)
  const [whatsappUrl, setWhatsappUrl] = useState("")

  useEffect(() => { setMounted(true) }, [])

  const validate = useCallback((): boolean => {
    const e: typeof errors = {}
    if (!nome.trim() || nome.trim().length < 2) e.nome = "Digite seu nome completo"
    const digits = phone.replace(/\D/g, "")
    if (digits.length < 10) e.phone = "Número de WhatsApp inválido"
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Digite um e-mail válido"
    setErrors(e)
    return Object.keys(e).length === 0
  }, [nome, phone, email])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    const url = buildWhatsAppURL(nome.trim())
    setWhatsappUrl(url)
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) return <SuccessScreen nome={nome.trim()} whatsappUrl={whatsappUrl} />

  return (
    <main className="min-h-[100svh] relative overflow-hidden" style={{ background: "#4A3628", color: "white" }}>
      
      {/* DETALHES MOBILE/PC: Partículas de Brilho no Fundo */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(var(--gold-light) 0.5px, transparent 0.5px)`, backgroundSize: '30px 30px' }} 
      />

      {/* Ícones Decorativos */}
      <div className="absolute top-20 -left-12 opacity-[0.07] rotate-12 pointer-events-none">
        <Scissors size={260} style={{ color: "var(--gold-light)" }} />
      </div>
      <div className="absolute bottom-10 -right-10 opacity-[0.1] -rotate-12 pointer-events-none">
        <Sparkles size={220} style={{ color: "var(--gold-shine)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10">
        <div className="flex flex-col lg:flex-row gap-0 min-h-[100svh] items-center">

          {/* ─── ESQUERDA: Copy ─── */}
          <div className="flex-1 py-12 lg:py-20 lg:pr-16 flex flex-col justify-center">
            <div className={`flex items-center gap-3 mb-10 transition-all duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                style={{ background: "linear-gradient(135deg, var(--tan), var(--gold))", border: "1px solid rgba(255,255,255,0.2)" }}>
                <span style={{ fontFamily: "var(--font-great-vibes), cursive", color: "white", fontSize: "1.5rem" }}>S</span>
              </div>
              <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", color: "rgba(255,255,255,0.9)", letterSpacing: "0.05em" }}>Solange Jesus Academy</span>
            </div>

            <p className={`transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--gold-light)", lineHeight: 1 }}>
              Tire suas dúvidas
            </p>
            <h1 className={`transition-all duration-700 delay-150 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.9rem, 4.5vw, 3rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: "1.5rem" }}>
              e descubra como o Método MSM vai <span className="gold-text-dark">eliminar sua insegurança nas mechas</span>
            </h1>

            <div className={`space-y-4 transition-all duration-700 delay-300 ${mounted ? "opacity-100" : "opacity-0"}`}>
              {["Resposta rápida em horário comercial", "Suporte personalizado para sua carreira", "Tire dúvidas sobre módulos, bônus e acesso"].map((p, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(201,168,76,0.25)", border: "1px solid rgba(201,168,76,0.3)" }}>
                    <Check size={12} style={{ color: "var(--gold-light)" }} />
                  </div>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", color: "rgba(255,255,255,0.9)" }}>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ─── DIREITA: Formulário (Card com Contraste e Borda Dourada Viva) ─── */}
          <div className="lg:w-[460px] xl:w-[500px] flex-shrink-0 pb-12 lg:py-20 flex items-center relative z-20">
            <div className={`w-full rounded-3xl transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ 
                background: "#FFFFFF", 
                color: "#1A1008", 
                boxShadow: "0 30px 70px rgba(0,0,0,0.5)", 
                border: "2px solid #C9A84C" // ← Borda dourada principal mais espessa e viva
              }}
            >
              
              <div className="rounded-t-3xl px-8 pt-10 pb-8" 
                style={{ 
                  background: "linear-gradient(135deg, #6B4F3A 0%, #4A3628 100%)",
                  borderBottom: "1px solid rgba(201,168,76,0.3)" 
                }}>
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle size={16} style={{ color: "var(--gold-light)" }} />
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", fontWeight: 700, color: "var(--gold-light)", textTransform: "uppercase", letterSpacing: "0.15em" }}>Fale conosco</span>
                </div>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", fontWeight: 700, color: "white", lineHeight: 1.2 }}>
                  Preencha e fale direto<br />
                  <span className="gold-text-dark">pelo WhatsApp</span>
                </h2>
              </div>
              <div className="px-8 py-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <FloatingField id="nome" label="Seu nome completo" value={nome} placeholder="Ex: Maria Silva" error={errors.nome} disabled={submitting} onChange={(e) => { setNome(e.target.value); if (errors.nome) setErrors((prev) => ({ ...prev, nome: undefined })) }} />
                  <FloatingField id="phone" label="Seu WhatsApp" type="tel" value={phone} placeholder="(11) 99999-9999" error={errors.phone} disabled={submitting} onChange={(e) => { setPhone(formatPhone(e.target.value)); if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined })) }} />
                  <FloatingField id="email" label="Seu melhor e-mail" type="email" value={email} placeholder="exemplo@email.com" error={errors.email} disabled={submitting} onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((prev) => ({ ...prev, email: undefined })) }} />

                  <button type="submit" disabled={submitting} className="btn-gold w-full animate-glow" style={{ fontSize: "0.9rem", padding: "1.3rem", borderRadius: "1rem" }}>
                    {submitting ? "Preparando conversa..." : "Falar com a Equipe MSM"}
                  </button>
                </form>
                <p className="flex items-center justify-center gap-2 mt-6" style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "#8B7361" }}><Lock size={12} /> Seus dados estão 100% seguros.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}