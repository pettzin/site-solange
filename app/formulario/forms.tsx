"use client"

import { useState, useEffect, useCallback } from "react"
import { Check, Lock, AlertCircle, Calendar, Clock, ArrowUp, ShieldCheck, Sparkles } from "lucide-react"
import Image from 'next/image'

/* ─── CONFIG ─────────────────────────────────────────────────────────────────── */
// Link direto para o Grupo do WhatsApp
const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/Hq2ej5e7RD11lZDqlbTITW" 

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
      
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(var(--gold-light) 0.5px, transparent 0.5px)`, backgroundSize: '30px 30px' }} 
      />

      <div className="relative z-10 max-w-md w-full text-center">
        <div className="w-24 h-24 mx-auto mb-10 rounded-full flex items-center justify-center animate-pulse-gold shadow-[0_0_30px_rgba(201,168,76,0.3)]"
          style={{ 
            background: "linear-gradient(135deg, var(--gold-warm), var(--gold-shine))",
            border: "2px solid rgba(255,255,255,0.2)"
          }}>
          <Check size={44} style={{ color: "white", strokeWidth: 3 }} />
        </div>

        <p className="font-title text-5xl md:text-6xl text-[var(--gold-light)] leading-none">
          Parabéns,
        </p>
        <p className="font-title text-5xl md:text-6xl text-[var(--gold-light)] leading-tight mb-6">
          {firstName}!
        </p>

        <h2 className="font-title text-3xl md:text-4xl text-white mb-3">
          Sua vaga está <span className="gold-text-dark">quase garantida!</span>
        </h2>
        
        <p className="font-sans text-white/70 leading-relaxed text-sm md:text-base mb-10">
          Entrando no grupo do WhatsApp em <br />
          <strong className="text-white bg-white/10 px-2 py-0.5 rounded text-[var(--gold-light)]">{redirect} segundos</strong>...
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold animate-glow w-full shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
          style={{ fontSize: "0.95rem", padding: "1.2rem 2rem", borderRadius: "1rem" }}
        >
          Entrar no Grupo VIP do WhatsApp
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

  const scrollToForm = () => {
    const el = document.getElementById("formulario-ancora")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

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

    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq('track', 'Lead')
    }

    // Agora enviamos o usuário direto para o grupo
    setWhatsappUrl(WHATSAPP_GROUP_URL)
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) return <SuccessScreen nome={nome.trim()} whatsappUrl={whatsappUrl} />

  return (
    <main className="min-h-[100svh] relative overflow-hidden" style={{ background: "#4A3628", color: "white" }}>
      
      {/* BACKGROUND PARTICLES */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(var(--gold-light) 0.5px, transparent 0.5px)`, backgroundSize: '30px 30px' }} 
      />

      {/* BRILHOS DE FUNDO */}
      <div className="absolute bottom-10 -right-10 opacity-[0.1] -rotate-12 pointer-events-none">
        <Sparkles size={220} style={{ color: "var(--gold-shine)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 py-8 md:py-12">
        
        {/* LOGO BEM MAIOR */}
        <div className="mb-10 flex justify-center">
          <Image
            src="/icone.webp"
            alt="Solange Jesus Academy"
            title="Solange Jesus Academy"
            className="h-20 md:h-28 w-auto object-contain mx-auto"
            width={600}
            height={225}
            priority={true}
          />
        </div>

        {/* HERO SECTION REORGANIZADA */}
        <div className="flex flex-col gap-10 items-center max-w-4xl mx-auto">

          {/* PARTE SUPERIOR */}
          <div className="w-full flex flex-col items-center text-center">
            
            <div className="inline-block px-4 py-1.5 rounded-full mb-6 w-max" style={{ background: "rgba(201,168,76,0.2)", border: "1px solid rgba(201,168,76,0.4)" }}>
              <span className="font-sans text-xs md:text-sm font-bold text-[var(--gold-light)] tracking-widest">
                WORKSHOP GRATUITO E AO VIVO
              </span>
            </div>

            <h1 className="font-title font-bold text-2xl md:text-4xl text-center leading-tight text-balance">
              Aprenda uma técnica de mechas <br className="hidden md:block" />
              sem usar pó descolorante e <br className="hidden md:block" />
              elimine de uma vez o{' '}
              <span className="font-title text-4xl md:text-5xl text-[#C5A265] block md:inline mt-1 md:mt-0">
                medo de fazer mechas!
              </span>
            </h1>

            <p className="max-w-2xl font-sans text-base md:text-lg text-white/85 leading-relaxed my-6">
              Aula que você realmente vai aprender na PRÁTICA, AO VIVO, COM MODELO REAL, SEM ENROLAÇÃO e você vai poder tirar todas as suas dúvidas da técnica.
            </p>

            {/* DATA E HORÁRIO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 w-full max-w-lg mx-auto">
              <div className="flex items-center justify-center text-center gap-3 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)" }}>
                <Calendar size={24} style={{ color: "var(--gold-light)" }} />
                <div className="text-center">
                  <span className="block text-xs uppercase opacity-60 font-sans">Data</span>
                  <strong className="font-sans font-bold text-lg">10 de agosto</strong>
                </div>
              </div>
              <div className="flex items-center justify-center text-center gap-3 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)" }}>
                <Clock size={24} style={{ color: "var(--gold-light)" }} />
                <div className="text-center">
                  <span className="block text-xs uppercase opacity-60 font-sans">Horário</span>
                  <strong className="font-sans font-bold text-lg">Às 18h</strong>
                </div>
              </div>
            </div>

            {/* FORMULÁRIO POSICIONADO ACIMA DOS 4 BENEFÍCIOS */}
            <div id="formulario-ancora" className="w-full max-w-lg relative z-20 mb-10">
              <div className={`w-full rounded-3xl transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ 
                  background: "#FFFFFF", 
                  color: "#1A1008", 
                  boxShadow: "0 30px 70px rgba(0,0,0,0.5)", 
                  border: "2px solid #C9A84C"
                }}
              >
                <div className="rounded-t-3xl px-6 pt-8 pb-6 text-center" 
                  style={{ 
                    background: "linear-gradient(135deg, #6B4F3A 0%, #4A3628 100%)",
                    borderBottom: "1px solid rgba(201,168,76,0.3)" 
                  }}>
                  <h2 className="font-title text-3xl md:text-4xl text-white">
                    Garanta sua vaga gratuita
                  </h2>
                  <p className="mt-1 font-sans text-xs md:text-sm text-[var(--gold-light)]">
                    Preencha o formulário abaixo:
                  </p>
                </div>

                <div className="px-6 py-8 text-left">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <FloatingField id="nome" label="Nome Completo" value={nome} placeholder="Ex: Maria Silva" error={errors.nome} disabled={submitting} onChange={(e) => { setNome(e.target.value); if (errors.nome) setErrors((prev) => ({ ...prev, nome: undefined })) }} />
                    <FloatingField id="phone" label="WhatsApp" type="tel" value={phone} placeholder="(11) 99999-9999" error={errors.phone} disabled={submitting} onChange={(e) => { setPhone(formatPhone(e.target.value)); if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined })) }} />
                    <FloatingField id="email" label="E-mail" type="email" value={email} placeholder="exemplo@email.com" error={errors.email} disabled={submitting} onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((prev) => ({ ...prev, email: undefined })) }} />

                    <button type="submit" disabled={submitting} className="btn-gold w-full animate-glow" style={{ fontSize: "0.9rem", padding: "1.2rem", borderRadius: "1rem" }}>
                      {submitting ? "Garantindo vaga..." : "QUERO GARANTIR MINHA VAGA GRATUITA"}
                    </button>
                  </form>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col items-center gap-1.5 text-center">
                    <p className="flex items-center gap-1.5 font-sans text-xs text-[#6B4F3A] font-semibold">
                      <Lock size={12} /> Seus dados estão seguros.
                    </p>
                    <p className="flex items-center gap-1.5 font-sans text-xs text-[#8B7361]">
                      <ShieldCheck size={12} /> Evento 100% gratuito.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 BENEFÍCIOS EM DESTAQUE (AGORA ABAIXO DO FORMULÁRIO) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 w-full max-w-2xl text-left">
              {[
                "100% Online e Gratuito",
                "Sem risco de manchas ou corte químico",
                "Resultado prático com modelo real ao vivo",
                "Colorimetria simplificada e sem segredos"
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.15)" }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(201,168,76,0.25)" }}>
                    <Check size={14} style={{ color: "var(--gold-light)" }} />
                  </div>
                  <span className="font-sans text-sm md:text-base text-white/90 font-medium">{b}</span>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* CONTEÚDO DETALHADO */}
        <div className="mt-20 space-y-20 border-t border-white/10 pt-16">

          {/* O QUE VAI APRENDER */}
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-title text-4xl md:text-5xl text-[var(--gold-light)] mb-4">
              Nesta aula você vai aprender:
            </h2>
            <p className="mb-10 opacity-80 font-sans text-sm md:text-base">Descubra uma técnica prática que vai te ajudar a conquistar resultados incríveis, sem manchas, sem corte químico e vai deixar suas clientes apaixonadas.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {[
                "Como fazer mechas utilizando coloração, sem depender do pó descolorante.",
                "As divisões que facilitam todo o procedimento.",
                "Como fazer o eriçado corretamente para um resultado impecável.",
                "Colorimetria explicada de forma simples.",
                "Como evitar manchas, marcações e corte químico.",
                "Os maiores segredos das mechas que normalmente ninguém ensina."
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl flex items-start gap-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)" }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "var(--gold)", color: "white" }}>
                    <Check size={12} />
                  </div>
                  <span className="font-sans text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* PARA QUEM É */}
          <div className="max-w-3xl mx-auto rounded-3xl p-8 md:p-12 text-center" style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(201,168,76,0.2)" }}>
            <h2 className="font-title text-4xl md:text-5xl text-white mb-6">
              Essa aula é para você que...
            </h2>
            <div className="space-y-4 text-left max-w-xl mx-auto">
              {[
                "Tem medo de fazer mechas.",
                "Já perdeu clientes por insegurança.",
                "Quer aumentar seu faturamento oferecendo um dos serviços mais lucrativos do salão.",
                "Deseja aprender um método simples, prático e sem truques."
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "var(--gold-light)" }} />
                  <span className="font-sans text-base text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SOBRE SOLANGE JESUS */}
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10 items-center">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-64 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl" 
                style={{ border: "2px solid var(--gold)" }}>
                <Image
                  src="/sol.webp"
                  alt="Solange Jesus"
                  title="Solange Jesus - Especialista em Mechas"
                  className="w-full h-full object-cover"
                  width={320}
                  height={480}
                />
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <span className="font-title text-4xl md:text-5xl text-[var(--gold-light)] block mb-1">
                Quem é Solange Jesus?
              </span>
              <h3 className="font-sans font-bold text-lg md:text-xl text-white mb-4">
                Sua mentora nessa jornada
              </h3>
              <p className="font-sans text-sm opacity-90 leading-relaxed space-y-3">
                <span className="block">Sou conhecida como Sol e atuo há mais de 19 anos como cabeleireira.</span>
                <span className="block">Comecei atendendo em um quartinho nos fundos da minha casa e transformei as mechas no serviço que me deu liberdade financeira e qualidade de vida.</span>
                <span className="block">Hoje sou fundadora da Solange Jesus Academy, Colorista Master, Terapeuta Capilar e Especialista em Mechas.</span>
                <span className="block mt-2 font-semibold text-[var(--gold-pale)]">Minha missão é ajudar cabeleireiras a vencerem o medo de fazer mechas, ensinando exatamente o que faço na prática, da cadeira ao lavatório, sem esconder nenhuma etapa.</span>
              </p>
            </div>
          </div>

          {/* O QUE ACONTECE DEPOIS DA INSCRIÇÃO & ATENÇÃO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)" }}>
              <h4 className="font-title text-3xl text-[var(--gold-light)] mb-2">O que acontece depois da inscrição?</h4>
              <p className="font-sans text-xs opacity-75 mb-4">Assim que você concluir sua inscrição:</p>
              <ul className="font-sans space-y-2 text-sm">
                <li>• Entrará para o grupo exclusivo do WhatsApp.</li>
                <li>• Receberá todas as orientações do evento.</li>
                <li>• No dia 10 de agosto, às 18h, enviaremos o link para você participar da aula ao vivo.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl" style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)" }}>
              <h4 className="font-title text-3xl text-red-300 mb-2">Atenção</h4>
              <p className="font-sans text-sm leading-relaxed opacity-90">
                As vagas são limitadas. Para garantir uma experiência de qualidade, a aula será realizada em uma sala online exclusiva para as profissionais inscritas. Assim que o limite de participantes for atingido, as inscrições serão encerradas.
              </p>
            </div>
          </div>

          {/* BOTÃO PARA SUBIR A PÁGINA */}
          <div className="text-center pt-8 max-w-xl mx-auto">
            <p className="font-title text-3xl md:text-4xl text-[var(--gold-pale)] mb-2">
              O medo não desaparece sozinho.
            </p>
            <p className="font-sans text-sm opacity-80 mb-6">
              Ele desaparece quando você aprende o caminho certo. Preencha o formulário e reserve gratuitamente a sua vaga.
            </p>
            
            <button 
              onClick={scrollToForm} 
              className="btn-gold animate-glow"
              style={{ padding: "1rem 2rem", borderRadius: "9999px" }}
            >
              <ArrowUp size={18} /> QUERO ME INSCREVER AGORA
            </button>
          </div>

        </div>

      </div>
    </main>
  )
}