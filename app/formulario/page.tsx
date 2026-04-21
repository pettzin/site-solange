"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Check, Lock, AlertCircle, MessageCircle, Sparkles, ArrowLeft, Star } from "lucide-react"

/* ─── CONFIG ─────────────────────────────────────────────────────────────────── */
const WHATSAPP_NUMBER = "5511999999999"  // ← altere aqui

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
    <main className="min-h-[100svh] flex items-center justify-center px-5 py-12 dark-luxury">
      <div className="relative z-10 max-w-md w-full text-center">
        {/* Check animado */}
        <div className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center animate-pulse-gold"
          style={{ background: "linear-gradient(135deg, var(--gold-warm), var(--gold-shine))" }}>
          <Check size={44} style={{ color: "white", strokeWidth: 2.5 }} />
        </div>

        <p style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: "clamp(2.5rem, 8vw, 4rem)", color: "var(--gold-light)", lineHeight: 1 }}>
          Incrível,
        </p>
        <p style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: "clamp(2.5rem, 8vw, 4rem)", color: "var(--gold-light)", lineHeight: 1.15, marginBottom: "1rem" }}>
          {firstName}!
        </p>

        <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "1.2rem", color: "white", marginBottom: "0.75rem" }}>
          Sua mensagem está <span className="gold-text-dark">pronta para enviar</span>
        </h2>
        <p style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, fontSize: "0.92rem", marginBottom: "2.5rem" }}>
          Você será redirecionada para o WhatsApp em{" "}
          <strong style={{ color: "var(--gold-light)" }}>{redirect}</strong> segundos.
          Nossa equipe vai te atender e tirar todas as suas dúvidas sobre o Método MSM.
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold animate-glow w-full"
          style={{ fontSize: "0.95rem", padding: "1.1rem 2rem", display: "flex", marginBottom: "1rem" }}
        >
          <MessageCircle size={20} />
          Ir para o WhatsApp Agora
        </a>

        <Link
          href="/"
          className="flex items-center justify-center gap-2"
          style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}
        >
          <ArrowLeft size={14} />
          Voltar para a página principal
        </Link>

        {/* Próximos passos */}
        <div className="rounded-2xl p-6 mt-8 text-left" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)" }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.68rem", fontWeight: 700, color: "var(--gold-light)", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            O que acontece agora:
          </p>
          {[
            "Nossa equipe recebe sua mensagem no WhatsApp",
            "Você recebe todas as informações sobre o Método MSM",
            "Garanta sua vaga com segurança — 7 dias de garantia",
          ].map((text, i) => (
            <div key={i} className="flex gap-3 mb-3 last:mb-0">
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: "rgba(201,168,76,0.2)" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.68rem", fontWeight: 700, color: "var(--gold)" }}>{i + 1}</span>
              </div>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.87rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.65 }}>{text}</span>
            </div>
          ))}
        </div>
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
          position: "absolute", left: "1.1rem",
          top: isActive ? "0.45rem" : "50%",
          transform: isActive ? "translateY(0) scale(0.78)" : "translateY(-50%) scale(1)",
          transformOrigin: "left",
          fontFamily: "var(--font-sans)",
          fontSize: isActive ? "0.72rem" : "0.95rem",
          fontWeight: isActive ? 700 : 400,
          color: error ? "#dc2626" : focused ? "var(--gold)" : "var(--tan)",
          transition: "all 0.25s cubic-bezier(0.22,1,0.36,1)",
          pointerEvents: "none", zIndex: 1,
          background: isActive ? "white" : "transparent",
          padding: isActive ? "0 0.25rem" : "0",
          letterSpacing: isActive ? "0.05em" : "normal",
          textTransform: isActive ? "uppercase" : "none",
        }}
      >
        {label}
      </label>

      <input
        id={id} type={type} value={value} disabled={disabled}
        placeholder={isActive ? placeholder : ""}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`input-luxury${error ? " error" : ""}`}
        style={{
          paddingTop: isActive ? "1.5rem" : "1rem",
          paddingBottom: isActive ? "0.5rem" : "1rem",
          borderColor: error ? "#dc2626" : focused ? "var(--gold)" : undefined,
          boxShadow: focused && !error ? "0 0 0 3px rgba(201,168,76,0.12)" : undefined,
        }}
      />

      {error && (
        <p className="flex items-center gap-1 mt-1.5" style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "#dc2626" }}>
          <AlertCircle size={11} /> {error}
        </p>
      )}
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
    <main className="dark-luxury min-h-[100svh]" style={{ color: "white" }}>

      {/* Linha decorativa superior */}
      <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg, transparent, var(--gold-warm), var(--gold-shine), var(--gold-warm), transparent)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10">
        <div className="flex flex-col lg:flex-row gap-0 min-h-[calc(100svh-3px)]">

          {/* ─── ESQUERDA: copy e contexto ──────────────────────────────────────── */}
          <div className="flex-1 py-12 lg:py-20 lg:pr-16 flex flex-col justify-center">

            {/* Voltar */}
            <div className={`mb-10 transition-all duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}>
              <Link
                href="/"
                className="inline-flex items-center gap-2 transition-colors"
                style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--gold-light)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
              >
                <ArrowLeft size={15} />
                Voltar ao site
              </Link>
            </div>

            {/* Logo */}
            <div className={`flex items-center gap-3 mb-10 transition-all duration-700 delay-75 ${mounted ? "opacity-100" : "opacity-0"}`}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, var(--tan), var(--gold))" }}>
                <span style={{ fontFamily: "var(--font-great-vibes), cursive", color: "white", fontSize: "1.3rem" }}>S</span>
              </div>
              <span style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", color: "rgba(255,255,255,0.65)" }}>
                Solange Jesus Academy
              </span>
            </div>

            {/* Headline */}
            <p
              className={`transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--gold-light)", lineHeight: 1 }}
            >
              Tire suas dúvidas
            </p>
            <h1
              className={`transition-all duration-700 delay-150 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.9rem, 4.5vw, 3rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: "1.25rem" }}
            >
              e descubra como o Método MSM vai{" "}
              <span className="gold-text-dark">eliminar sua insegurança nas mechas</span>
            </h1>

            <p
              className={`transition-all duration-700 delay-200 ${mounted ? "opacity-100" : "opacity-0"}`}
              style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.65)", lineHeight: 1.8, fontSize: "0.97rem", maxWidth: "30rem", marginBottom: "2.5rem" }}
            >
              Preencha o formulário ao lado. Ao concluir, você será redirecionada para o WhatsApp com uma mensagem já preparada para nossa equipe.
            </p>

            {/* Promessas */}
            <div className={`space-y-3 mb-10 transition-all duration-700 delay-300 ${mounted ? "opacity-100" : "opacity-0"}`}>
              {[
                "Resposta em até 5 minutos no horário comercial",
                "Tire todas as dúvidas sobre o Método MSM antes de decidir",
                "Sem pressão — sem spam — sem enrolação",
              ].map((p, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(201,168,76,0.18)" }}>
                    <Check size={11} style={{ color: "var(--gold)" }} />
                  </div>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.92rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.6 }}>{p}</span>
                </div>
              ))}
            </div>

            {/* Avaliações */}
            <div
              className={`flex items-center gap-3 pt-7 transition-all duration-700 delay-400 ${mounted ? "opacity-100" : "opacity-0"}`}
              style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div className="flex -space-x-2">
                {["M","P","F","J"].map((l, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-white text-xs font-bold"
                    style={{ borderColor: "rgba(107,79,58,0.5)", background: "linear-gradient(135deg, var(--tan), var(--brown-deep))" }}>
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} style={{ fill: "var(--gold)", color: "var(--gold)" }} />)}
                </div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "rgba(255,255,255,0.45)" }}>
                  <strong style={{ color: "rgba(255,255,255,0.7)" }}>19 anos</strong> de experiência · Solange Jesus Academy
                </p>
              </div>
            </div>
          </div>

          {/* ─── DIREITA: formulário ─────────────────────────────────────────────── */}
          <div className="lg:w-[440px] xl:w-[480px] flex-shrink-0 pb-12 lg:py-20 flex items-center">
            <div
              className={`w-full rounded-2xl transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ background: "var(--cream)", color: "var(--fg)", boxShadow: "0 24px 64px rgba(0,0,0,0.35)" }}
            >
              {/* Header do card */}
              <div className="rounded-t-2xl px-8 pt-8 pb-6"
                style={{ background: "linear-gradient(135deg, var(--brown-deep) 0%, rgba(107,79,58,0.85) 100%)", borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle size={16} style={{ color: "var(--gold-light)" }} />
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", fontWeight: 700, color: "var(--gold-light)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Fale conosco
                  </span>
                </div>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", fontWeight: 700, color: "white", lineHeight: 1.25 }}>
                  Preencha e fale direto<br />
                  <span className="gold-text-dark">pelo WhatsApp</span>
                </h2>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", marginTop: "0.5rem", lineHeight: 1.6 }}>
                  Leva menos de 1 minuto. Sua mensagem já vem pronta.
                </p>
              </div>

              {/* Corpo do formulário */}
              <div className="px-8 py-7">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <FloatingField
                    id="nome" label="Seu nome completo" value={nome}
                    placeholder="Ex: Maria Silva" error={errors.nome} disabled={submitting}
                    onChange={(e) => { setNome(e.target.value); if (errors.nome) setErrors((prev) => ({ ...prev, nome: undefined })) }}
                  />

                  <FloatingField
                    id="phone" label="Seu WhatsApp" type="tel" value={phone}
                    placeholder="(11) 99999-9999" error={errors.phone} disabled={submitting}
                    onChange={(e) => { setPhone(formatPhone(e.target.value)); if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined })) }}
                  />

                  <FloatingField
                    id="email" label="Seu melhor e-mail" type="email" value={email}
                    placeholder="exemplo@email.com" error={errors.email} disabled={submitting}
                    onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((prev) => ({ ...prev, email: undefined })) }}
                  />

                  {/* Preview da mensagem */}
                  {nome.trim().length > 1 && (
                    <div className="rounded-xl p-4" style={{ background: "rgba(37,211,102,0.07)", border: "1px solid rgba(37,211,102,0.2)" }}>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 700, color: "#1a7a3c", marginBottom: "0.35rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                        Preview da mensagem:
                      </p>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.83rem", color: "#2d6a4f", lineHeight: 1.6, fontStyle: "italic" }}>
                        &quot;Oi, meu nome é <strong>{nome.trim().split(" ")[0]}</strong> e quero saber mais sobre o Método MSM&quot;
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-gold w-full"
                    style={{ fontSize: "0.88rem", padding: "1.1rem", opacity: submitting ? 0.8 : 1, marginTop: "0.5rem" }}
                  >
                    {submitting ? (
                      <>
                        <div className="rounded-full animate-spin" style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white" }} />
                        Preparando mensagem...
                      </>
                    ) : (
                      <>
                        <MessageCircle size={18} />
                        Falar sobre o Método MSM
                      </>
                    )}
                  </button>
                </form>

                <p className="flex items-center justify-center gap-1.5 mt-4"
                  style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", color: "var(--muted)", textAlign: "center" }}>
                  <Lock size={10} /> Seus dados estão seguros. Não enviamos spam.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* WhatsApp FAB */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        aria-label="WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.025.507 3.934 1.399 5.61L0 24l6.61-1.347A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.663-.527-5.168-1.439l-.371-.218-3.843.783.816-3.738-.24-.387C2.016 15.368 1.5 13.738 1.5 12 1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12 17.799 22.5 12 22.5z" fillRule="evenodd"/>
        </svg>
      </a>
    </main>
  )
}