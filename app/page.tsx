"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  Check, Star, ChevronDown, MessageCircle, Sparkles,
  TrendingUp, Shield, Award, Clock, Users, Zap, Lock
} from "lucide-react"

/* ─── CONFIG ────────────────────────────────────────────────────────────────── */
const HOTMART_URL = "https://pay.hotmart.com/SEULINK"  // ← altere aqui
const WHATSAPP_NUMBER = "5511999999999"                 // ← altere aqui
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Tenho interesse no Curso Loiros Impecáveis e gostaria de mais informações.")}`

/* ─── CONTEÚDO ──────────────────────────────────────────────────────────────── */
const BENEFITS = [
  { icon: Sparkles, title: "Técnicas Exclusivas", text: "Aprenda os segredos de coloração que cabeleireiras de elite dominam após anos de prática — condensados em aulas diretas." },
  { icon: TrendingUp, title: "Faturamento Multiplicado", text: "Clientes pagam 3x mais por profissionais que dominam técnicas premium. Posicione-se no mercado de alto valor." },
  { icon: Shield, title: "Zero Dano aos Fios", text: "Método que preserva a saúde do cabelo enquanto entrega resultados deslumbrantes. Clientes voltam toda semana." },
  { icon: Users, title: "Agenda Lotada", text: "Aprenda a fidelizar clientes e gerar indicações orgânicas. Sua lista de espera começa aqui." },
  { icon: Award, title: "Certificado Profissional", text: "Certificação reconhecida pelo mercado. Comprove sua expertise e justifique preços premium." },
  { icon: Zap, title: "Resultados Imediatos", text: "As técnicas podem ser aplicadas já no primeiro dia. Veja o retorno do investimento na mesma semana." },
]

const MODULES = [
  { num: "01", title: "Química do Loiro", text: "Entenda a fundo como a melanina reage aos processos de descoloração e evite erros irreversíveis." },
  { num: "02", title: "Descoloração Impecável", text: "Técnicas de pré-diagnóstico, escolha do produto certo e controle de tempo para loiros sem quebra." },
  { num: "03", title: "Matização de Elite", text: "O segredo dos loiros frios, acinzentados e beige que dominam o feed das maiores coloristas do mundo." },
  { num: "04", title: "Mechas & Balayage", text: "Técnicas manuais avançadas para criar efeitos naturais e degradês impecáveis que todo cliente quer." },
  { num: "05", title: "Correção de Cor", text: "Reverta erros de coloração de terceiros e conquiste clientes insatisfeitos com concorrentes." },
  { num: "06", title: "Precificação Premium", text: "Monte sua tabela de preços estratégica, filtre clientes ideais e trabalhe menos ganhando muito mais." },
]

const TESTIMONIALS = [
  { name: "Mariana Costa", role: "Cabeleireira • São Paulo", text: "Em 30 dias depois do curso meu faturamento triplicou. As técnicas são diferenciadas e os clientes notaram na hora a diferença.", stars: 5 },
  { name: "Patricia Oliveira", role: "Proprietária de Salão • Rio de Janeiro", text: "Investi na minha equipe inteira. O retorno foi imediato — lista de espera de 3 semanas em menos de um mês.", stars: 5 },
  { name: "Fernanda Lima", role: "Colorista • Curitiba", text: "Achei que já sabia tudo sobre loiro. Me surpreendi completamente. O módulo de matização sozinho valeu cada centavo.", stars: 5 },
  { name: "Juliana Ramos", role: "Cabeleireira • Belo Horizonte", text: "Consegui aumentar meu ticket médio em 180% logo na primeira semana. O método de precificação é ouro.", stars: 5 },
  { name: "Camila Santos", role: "Freelancer • Brasília", text: "Comecei do zero e em dois meses já tinha a agenda cheia. O suporte é incrível e o conteúdo é direto ao ponto.", stars: 5 },
  { name: "Rafaela Mendes", role: "Colorista Profissional • Salvador", text: "O módulo de correção de cor me salvou de situações que eu não sabia como resolver. Vale muito mais do que o preço.", stars: 5 },
]

const FAQS = [
  { q: "Para quem é o curso?", a: "Para cabeleireiras de todos os níveis — iniciantes que querem começar certo e profissionais experientes que desejam se especializar em técnicas premium de loiro e aumentar o faturamento." },
  { q: "Preciso de experiência prévia com loiro?", a: "Não. O curso foi estruturado para ensinar do diagnóstico básico até as técnicas mais avançadas. Cada módulo constrói sobre o anterior." },
  { q: "Como funciona o acesso?", a: "Acesso imediato e vitalício pela plataforma Hotmart. Estude no seu ritmo, pelo celular, tablet ou computador, sem prazo de expiração." },
  { q: "Tem garantia?", a: "Sim. 7 dias de garantia incondicional. Se não ficar satisfeita por qualquer motivo, basta solicitar o reembolso e devolvemos 100% do valor." },
  { q: "Recebo suporte durante o curso?", a: "Sim. Temos comunidade exclusiva e suporte via WhatsApp para dúvidas técnicas durante sua jornada." },
  { q: "Quando tenho acesso ao certificado?", a: "O certificado é liberado automaticamente ao concluir todos os módulos. Você pode baixar e compartilhar imediatamente." },
]

/* ─── HOOK: SCROLL REVEAL ────────────────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale")
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("active")),
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

/* ─── HOOK: COUNTER ANIMATION ───────────────────────────────────────────────── */
function useCounterAnimation(target: number, suffix: string) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      let start = 0
      const duration = 1800
      const step = (timestamp: number, startTime: number) => {
        const progress = Math.min((timestamp - startTime) / duration, 1)
        const ease = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(ease * target))
        if (progress < 1) requestAnimationFrame((t) => step(t, startTime))
      }
      requestAnimationFrame((t) => step(t, t))
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return { count, ref, display: `${count}${suffix}` }
}

/* ─── COMPONENTE: FAQ ITEM ──────────────────────────────────────────────────── */
function FAQItem({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b last:border-0" style={{ borderColor: "rgba(191,161,136,0.25)" }}>
      <button onClick={onClick} className="w-full py-6 flex items-center justify-between text-left gap-4">
        <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.02rem", fontWeight: 600, color: isOpen ? "var(--brown-deep)" : "var(--fg)", lineHeight: 1.4 }}>
          {question}
        </span>
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
          style={{ background: isOpen ? "linear-gradient(135deg,var(--brown-deep),var(--gold))" : "rgba(191,161,136,0.15)", transform: isOpen ? "rotate(180deg)" : "none" }}
        >
          <ChevronDown size={16} style={{ color: isOpen ? "white" : "var(--brown-warm)" }} />
        </div>
      </button>
      <div className="overflow-hidden transition-all duration-500 ease-out" style={{ maxHeight: isOpen ? "24rem" : 0, paddingBottom: isOpen ? "1.5rem" : 0 }}>
        <p style={{ fontFamily: "var(--font-sans)", color: "var(--muted)", lineHeight: 1.8, fontSize: "0.95rem" }}>{answer}</p>
      </div>
    </div>
  )
}

/* ─── COMPONENTE: STAT CARD ─────────────────────────────────────────────────── */
function StatCard({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { display, ref } = useCounterAnimation(target, suffix)
  return (
    <div ref={ref} className="text-center py-2">
      <p className="gold-text-dark" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, lineHeight: 1 }}>
        {display}
      </p>
      <p style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.55)", fontSize: "0.8rem", marginTop: "0.35rem", letterSpacing: "0.04em" }}>{label}</p>
    </div>
  )
}

/* ─── PÁGINA PRINCIPAL ──────────────────────────────────────────────────────── */
export default function LandingPage() {
  useScrollReveal()
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => { setMounted(true) }, [])

  return (
    <main style={{ background: "var(--bg)", overflowX: "hidden" }}>

      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[100svh] flex items-center gold-texture-bg overflow-hidden">

        {/* Partículas decorativas */}
        {mounted && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${[8,5,10,6,9,4][i]}px`,
                  height: `${[8,5,10,6,9,4][i]}px`,
                  left: `${[15,35,60,75,85,50][i]}%`,
                  top: `${[20,60,25,70,40,80][i]}%`,
                  background: `linear-gradient(135deg, var(--gold), var(--gold-light))`,
                  opacity: 0.35,
                  animation: `particleFloat ${[4,6,5,7,4.5,6.5][i]}s ease-in-out infinite`,
                  animationDelay: `${[0,1,2,0.5,1.5,2.5][i]}s`,
                }}
              />
            ))}
            {/* Blob decorativo direita */}
            <div
              className="absolute -right-32 top-1/4 w-[500px] h-[500px] rounded-full animate-blob opacity-20"
              style={{ background: "radial-gradient(circle, rgba(201,168,76,0.4), rgba(191,161,136,0.15))" }}
            />
            <div
              className="absolute -left-20 bottom-1/4 w-[350px] h-[350px] rounded-full animate-blob opacity-15"
              style={{ background: "radial-gradient(circle, rgba(169,117,98,0.3), rgba(250,235,230,0.2))", animationDelay: "-5s" }}
            />
          </div>
        )}

        {/* Linha de ornamento superior */}
        <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, transparent 0%, var(--gold-warm) 30%, var(--gold-shine) 50%, var(--gold-warm) 70%, transparent 100%)" }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-10 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Lado esquerdo — copy */}
            <div>
              {/* Badge */}
              <div className={`transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <div className="badge-gold mb-7">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "var(--gold)", boxShadow: "0 0 6px var(--gold)" }} />
                  Método Exclusivo de Coloração Premium
                </div>
              </div>

              {/* Título decorativo script */}
              <p
                className={`transition-all duration-700 delay-75 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--brown-warm)", lineHeight: 1.1, marginBottom: "0.25rem" }}
              >
                A técnica que transforma
              </p>

              {/* H1 principal */}
              <h1
                className={`transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.4rem, 5.5vw, 4rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: "1.5rem", color: "var(--fg)" }}
              >
                <span className="gold-text-animated">Loiros Impecáveis</span>
                {" "}que fazem clientes voltarem toda semana
              </h1>

              {/* Subtítulo */}
              <p
                className={`transition-all duration-700 delay-150 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ fontFamily: "var(--font-sans)", fontSize: "1.08rem", lineHeight: 1.8, color: "var(--muted)", maxWidth: "32rem", marginBottom: "2.5rem" }}
              >
                Aprenda o método que já transformou mais de <strong style={{ color: "var(--brown-deep)" }}>3.500 cabeleireiras</strong> em referências de loiro em suas cidades — com técnicas que você pode aplicar amanhã mesmo.
              </p>

              {/* CTAs */}
              <div className={`flex flex-col sm:flex-row gap-3 mb-10 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                <a href={HOTMART_URL} target="_blank" rel="noopener noreferrer" className="btn-gold animate-pulse-gold">
                  <Sparkles size={17} />
                  Quero Acesso Agora
                </a>
                <Link href="/formulario" className="btn-gold" style={{ background: "transparent", color: "var(--brown-deep)", border: "1.5px solid rgba(107,79,58,0.3)", boxShadow: "none" }}>
                  <MessageCircle size={17} />
                  Falar pelo WhatsApp
                </Link>
              </div>

              {/* Prova social */}
              <div className={`transition-all duration-700 delay-300 ${mounted ? "opacity-100" : "opacity-0"}`}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex -space-x-2.5">
                    {["M","P","F","J","C","R"].map((l, i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-white font-bold text-xs" style={{ borderColor: "var(--cream)", background: `linear-gradient(135deg, ${i%2===0?"var(--tan),var(--brown-warm)":"var(--brown-deep),var(--gold)"})`}}>
                        {l}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex gap-0.5 mb-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} style={{ fill: "var(--gold)", color: "var(--gold)" }} />)}
                    </div>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.83rem", color: "var(--muted)" }}>
                      <strong style={{ color: "var(--fg)" }}>+3.500</strong> profissionais transformadas
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lado direito — card flutuante premium */}
            <div className={`hidden lg:flex justify-center items-center transition-all duration-1000 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="relative w-full max-w-sm">
                {/* Anel externo decorativo */}
                <div className="absolute -inset-6 rounded-3xl animate-spin-slow opacity-30" style={{ background: "conic-gradient(from 0deg, var(--gold-warm), var(--gold-shine), var(--gold-light), var(--tan), var(--gold-warm))", filter: "blur(18px)" }} />

                {/* Card principal */}
                <div className="relative rounded-2xl p-8 z-10" style={{ background: "white", boxShadow: "0 24px 64px rgba(107,79,58,0.18), 0 8px 24px rgba(107,79,58,0.1)" }}>
                  {/* Ícone central */}
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--brown-deep), var(--gold))" }}>
                    <span style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: "2.5rem", color: "white" }}>L</span>
                  </div>

                  <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "1.3rem", textAlign: "center", marginBottom: "0.4rem" }}>
                    Curso Loiros <span className="gold-text">Impecáveis</span>
                  </h3>
                  <p style={{ fontFamily: "var(--font-sans)", color: "var(--muted)", fontSize: "0.85rem", textAlign: "center", marginBottom: "1.75rem", lineHeight: 1.6 }}>
                    O método mais completo para cabeleireiras que querem se tornar especialistas em loiro
                  </p>

                  {/* Itens */}
                  {[
                    "6 módulos + materiais bônus",
                    "Acesso vitalício na Hotmart",
                    "Comunidade exclusiva",
                    "Certificado profissional",
                    "7 dias de garantia",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 mb-2.5 last:mb-0">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, var(--gold), var(--gold-shine))" }}>
                        <Check size={11} style={{ color: "white", strokeWidth: 3 }} />
                      </div>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.87rem", color: "var(--fg)" }}>{item}</span>
                    </div>
                  ))}

                  <div className="mt-6 pt-5" style={{ borderTop: "1px solid rgba(191,161,136,0.2)" }}>
                    <a href={HOTMART_URL} target="_blank" rel="noopener noreferrer" className="btn-gold w-full text-center" style={{ display: "flex" }}>
                      Garantir Minha Vaga
                    </a>
                  </div>
                </div>

                {/* Badge flutuante */}
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full flex flex-col items-center justify-center animate-float" style={{ background: "linear-gradient(135deg, var(--brown-deep), var(--gold))", boxShadow: "0 8px 24px rgba(107,79,58,0.35)" }}>
                  <p style={{ fontFamily: "var(--font-serif)", color: "white", fontWeight: 800, fontSize: "0.7rem", textAlign: "center", lineHeight: 1.1 }}>7 dias<br/>grátis</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={26} style={{ color: "rgba(201,168,76,0.5)" }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FAIXA DE CREDIBILIDADE
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="dark-luxury py-14 px-5 md:px-10">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 divide-x divide-white/10">
            <StatCard target={3500} suffix="+" label="Alunas Formadas" />
            <StatCard target={98} suffix="%" label="Satisfação" />
            <StatCard target={6} suffix=" Módulos" label="Conteúdo Prático" />
            <StatCard target={180} suffix="%" label="Aumento Médio de Ticket" />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          PROBLEMA / DOR
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 px-5 md:px-10 gold-texture-bg">
        <div className="relative z-10 max-w-4xl mx-auto text-center reveal">
          <div className="ornament-center mb-8">
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)" }}>
              A Realidade de Muitas Cabeleireiras
            </span>
          </div>

          <p style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "var(--brown-warm)", lineHeight: 1.1, marginBottom: "1rem" }}>
            Você já sentiu isso?
          </p>

          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "2.5rem" }}>
            O medo de errar um loiro te impede de{" "}
            <span className="gold-text-animated">cobrar o que você merece</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-5 mt-12">
            {[
              { emoji: "😰", pain: "Clientes chegam com referências de loiro e você hesita em aceitar porque não tem confiança total no resultado" },
              { emoji: "😤", pain: "Vê colegas cobrando o dobro pelo mesmo serviço e não entende por quê — a diferença está na técnica" },
              { emoji: "😔", pain: "Já viu um loiro dar errado nas suas mãos e desde então tem medo de repetir o processo" },
            ].map(({ emoji, pain }, i) => (
              <div key={i} className="card-gold p-6 reveal" style={{ transitionDelay: `${i*100}ms` }}>
                <p style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{emoji}</p>
                <p style={{ fontFamily: "var(--font-sans)", color: "var(--brown-deep)", lineHeight: 1.7, fontSize: "0.92rem" }}>{pain}</p>
              </div>
            ))}
          </div>

          <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", fontWeight: 600, marginTop: "3rem", color: "var(--brown-deep)" }}>
            Isso tem solução. E está mais próximo do que você imagina.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          BENEFÍCIOS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 px-5 md:px-10" style={{ background: "rgba(250,235,230,0.4)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal">
            <div className="ornament-center mb-6">
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)" }}>
                O que você vai conquistar
              </span>
            </div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2 }}>
              Tudo que muda na sua carreira quando você{" "}
              <span className="gold-text">domina o loiro</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {BENEFITS.map(({ icon: Icon, title, text }, i) => (
              <div key={i} className="card p-7 reveal-scale" style={{ transitionDelay: `${i*80}ms` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.12), rgba(107,79,58,0.08))" }}>
                  <Icon size={22} style={{ color: "var(--gold-warm)" }} />
                </div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.6rem", color: "var(--brown-deep)" }}>{title}</h3>
                <p style={{ fontFamily: "var(--font-sans)", color: "var(--muted)", lineHeight: 1.75, fontSize: "0.9rem" }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          MÓDULOS DO CURSO
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-start">

            {/* Sticky left */}
            <div className="lg:sticky lg:top-24 reveal-left">
              <div className="ornament-center mb-6" style={{ justifyContent: "flex-start" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)" }}>
                  Conteúdo do Curso
                </span>
              </div>
              <p style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--brown-warm)", lineHeight: 1.1, marginBottom: "0.25rem" }}>
                Seis módulos que vão
              </p>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "1.5rem" }}>
                mudar a forma como você vê o <span className="gold-text">loiro</span>
              </h2>
              <p style={{ fontFamily: "var(--font-sans)", color: "var(--muted)", lineHeight: 1.8, fontSize: "0.97rem", marginBottom: "2.5rem" }}>
                Cada módulo foi construído sobre o anterior para criar uma progressão natural de conhecimento — do básico ao avançado, sem lacunas.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href={HOTMART_URL} target="_blank" rel="noopener noreferrer" className="btn-gold">
                  <Sparkles size={17} />
                  Quero Acesso Completo
                </a>
              </div>

              {/* Garantia */}
              <div className="flex items-center gap-3 mt-6">
                <Lock size={16} style={{ color: "var(--gold)", flexShrink: 0 }} />
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--muted)" }}>
                  Garantia de 7 dias. Sem risco nenhum.
                </p>
              </div>
            </div>

            {/* Modules list */}
            <div className="space-y-4 reveal-right">
              {MODULES.map(({ num, title, text }, i) => (
                <div key={i} className="flex gap-5 p-6 rounded-2xl transition-all duration-300 group hover:bg-white hover:shadow-lg"
                  style={{ border: "1px solid rgba(191,161,136,0.18)", transitionDelay: `${i*60}ms` }}>
                  <div className="flex-shrink-0">
                    <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", fontWeight: 800, color: "var(--gold)", opacity: 0.7, letterSpacing: "-0.02em" }}>
                      {num}
                    </span>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "1rem", color: "var(--brown-deep)", marginBottom: "0.35rem" }}>
                      {title}
                    </h3>
                    <p style={{ fontFamily: "var(--font-sans)", color: "var(--muted)", lineHeight: 1.7, fontSize: "0.88rem" }}>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          AUTORIDADE / MENTORA
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="dark-luxury py-20 md:py-32 px-5 md:px-10">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

            {/* Foto placeholder */}
            <div className="reveal-left order-2 lg:order-1">
              <div className="relative max-w-md mx-auto">
                {/* Glow */}
                <div className="absolute -inset-3 rounded-3xl blur-2xl opacity-25" style={{ background: "linear-gradient(135deg, var(--gold), var(--gold-light))" }} />
                <div className="relative rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)", aspectRatio: "4/5" }}>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-28 h-28 rounded-full flex items-center justify-center mb-5" style={{ background: "linear-gradient(135deg, var(--tan), var(--gold))" }}>
                      <span style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: "3rem", color: "white" }}>S</span>
                    </div>
                    <p className="gold-text-dark" style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: "2.2rem", marginBottom: "0.3rem" }}>
                      Solange Jesus
                    </p>
                    <p style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.6)", fontSize: "0.88rem" }}>
                      Especialista em Coloração Premium
                    </p>
                    {/* Estrelas */}
                    <div className="flex gap-1 mt-3">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} style={{ fill: "var(--gold)", color: "var(--gold)" }} />)}
                    </div>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", marginTop: "0.5rem" }}>
                      Avaliação de 3.500+ alunas
                    </p>
                  </div>
                </div>

                {/* Badge flutuante */}
                <div className="absolute -bottom-5 -right-5 rounded-2xl px-5 py-3 animate-float" style={{ background: "white", boxShadow: "0 10px 30px rgba(107,79,58,0.25)" }}>
                  <div className="flex items-center gap-2">
                    <Award size={18} style={{ color: "var(--gold)" }} />
                    <div>
                      <p style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "0.9rem", color: "var(--brown-deep)" }}>15+ anos</p>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--muted)" }}>de experiência</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="reveal-right order-1 lg:order-2">
              <div className="ornament-center mb-6" style={{ justifyContent: "flex-start" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold-light)" }}>
                  Sua Mentora
                </span>
              </div>

              <p style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)", color: "var(--gold-light)", lineHeight: 1, marginBottom: "0.5rem" }}>
                Conheça quem vai guiar você
              </p>

              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", fontWeight: 700, color: "white", marginBottom: "1.5rem" }}>
                15 anos transformando<br /><span className="gold-text-dark">carreiras em arte</span>
              </h2>

              <div style={{ color: "rgba(255,255,255,0.72)", fontFamily: "var(--font-sans)", lineHeight: 1.85, fontSize: "0.97rem" }}>
                {[
                  "Ao longo de mais de 15 anos trabalhando com as melhores marcas de coloração do mercado, desenvolvi um olhar cirúrgico para diagnóstico capilar e uma metodologia única que garante resultados impecáveis em qualquer tipo de fio.",
                  "Já formei mais de 3.500 cabeleireiras que hoje são referência em loiros nas suas cidades, cobram preços premium e têm listas de espera. Minha missão é democratizar o conhecimento de elite.",
                  "Este curso condensa o que levei anos para aprender — sem os erros que custam clientes e reputação.",
                ].map((p, i) => <p key={i} style={{ marginBottom: "1rem" }}>{p}</p>)}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-7" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                {[
                  { v: "15+", l: "Anos de Mercado" },
                  { v: "3.5k+", l: "Alunas Formadas" },
                  { v: "50k+", l: "Seguidoras" },
                ].map(({ v, l }) => (
                  <div key={l} className="text-center">
                    <p className="gold-text-dark" style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", fontWeight: 800 }}>{v}</p>
                    <p style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.45)", fontSize: "0.73rem", marginTop: "0.2rem" }}>{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          DEPOIMENTOS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 px-5 md:px-10 gold-texture-bg">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal">
            <div className="ornament-center mb-6">
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)" }}>
                Resultados Reais
              </span>
            </div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2 }}>
              O que nossas alunas <span className="gold-text">conquistaram</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {TESTIMONIALS.map(({ name, role, text, stars }, i) => (
              <div key={i} className="card p-7 reveal-scale" style={{ transitionDelay: `${i*100}ms` }}>
                {/* Aspas decorativas */}
                <div className="mb-4" style={{ fontFamily: "Georgia, serif", fontSize: "3.5rem", lineHeight: 0.8, color: "var(--gold-light)" }}>&ldquo;</div>

                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.93rem", lineHeight: 1.8, color: "var(--fg)", marginBottom: "1.5rem" }}>
                  {text}
                </p>

                <div className="flex gap-0.5 mb-4">
                  {[...Array(stars)].map((_, j) => <Star key={j} size={14} style={{ fill: "var(--gold)", color: "var(--gold)" }} />)}
                </div>

                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(191,161,136,0.2)" }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ background: "linear-gradient(135deg, var(--tan), var(--brown-deep))" }}>
                    {name.charAt(0)}
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: "0.93rem", color: "var(--brown-deep)" }}>{name}</p>
                    <p style={{ fontFamily: "var(--font-sans)", color: "var(--tan)", fontSize: "0.78rem" }}>{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          OFERTA / CTA MEIO
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-5 md:px-10" style={{ background: "rgba(250,235,230,0.5)" }}>
        <div className="max-w-3xl mx-auto text-center reveal">
          <div className="ornament-center mb-6">
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)" }}>
              Investimento
            </span>
          </div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, marginBottom: "1rem" }}>
            Tudo que você precisa para se tornar<br />referência em <span className="gold-text">loiro</span>
          </h2>

          <div className="card p-8 md:p-12 mt-10 text-left">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>
                  O que está incluído:
                </p>
                {[
                  "6 módulos em vídeo HD",
                  "Materiais e apostilas PDF",
                  "Acesso vitalício",
                  "Comunidade de suporte",
                  "Certificado profissional",
                  "Atualizações gratuitas",
                  "Suporte via WhatsApp",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 mb-2.5">
                    <Check size={16} style={{ color: "var(--gold)", flexShrink: 0 }} />
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.92rem", color: "var(--fg)" }}>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center justify-center text-center py-6 rounded-xl" style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.08), rgba(107,79,58,0.05))", border: "1px solid rgba(201,168,76,0.2)" }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--muted)", textDecoration: "line-through", marginBottom: "0.25rem" }}>
                  De R$ 597,00
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--muted)", marginBottom: "0.5rem" }}>
                  Por apenas
                </p>
                <p className="gold-text" style={{ fontFamily: "var(--font-serif)", fontSize: "3rem", fontWeight: 800, lineHeight: 1 }}>
                  R$ 297
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--muted)", marginTop: "0.25rem" }}>
                  ou 12x R$ 29,70
                </p>
                <div className="mt-4 px-4 py-2 rounded-full" style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.25)" }}>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 700, color: "var(--brown-deep)" }}>
                    🔒 7 dias de garantia
                  </p>
                </div>
              </div>
            </div>

            <a href={HOTMART_URL} target="_blank" rel="noopener noreferrer" className="btn-gold animate-glow w-full" style={{ fontSize: "0.95rem", padding: "1.2rem 2rem" }}>
              <Sparkles size={18} />
              Quero Acesso Imediato — R$ 297
            </a>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.76rem", color: "var(--muted)", textAlign: "center", marginTop: "1rem" }}>
              <Lock size={12} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} />
              Compra 100% segura via Hotmart. Cartão, Pix ou Boleto.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 px-5 md:px-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14 reveal">
            <div className="ornament-center mb-6">
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)" }}>
                Dúvidas Frequentes
              </span>
            </div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700 }}>
              Suas <span className="gold-text">dúvidas</span>, respondidas
            </h2>
          </div>

          <div className="rounded-2xl p-6 md:p-10 shadow-lg reveal" style={{ background: "white" }}>
            {FAQS.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.q}
                answer={faq.a}
                isOpen={openFAQ === i}
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="dark-luxury py-24 md:py-36 px-5 md:px-10">
        <div className="relative z-10 max-w-3xl mx-auto text-center reveal">
          <div className="ornament-center mb-8" style={{ filter: "brightness(1.5)" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)" }}>
              Sua Próxima Etapa
            </span>
          </div>

          <p style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--gold-light)", lineHeight: 1.05, marginBottom: "0.5rem" }}>
            Chegou a sua vez
          </p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 700, color: "white", marginBottom: "1.5rem" }}>
            de ser reconhecida como{" "}
            <span className="gold-text-dark">especialista em loiro</span>
          </h2>

          <p style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.7)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: "28rem", margin: "0 auto 3rem" }}>
            Mais de 3.500 cabeleireiras já transformaram suas carreiras. Você é a próxima. Sem risco — 7 dias de garantia total.
          </p>

          <a href={HOTMART_URL} target="_blank" rel="noopener noreferrer" className="btn-gold animate-glow" style={{ fontSize: "0.95rem", padding: "1.2rem 3rem" }}>
            <Sparkles size={18} />
            Quero Transformar Minha Carreira
          </a>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            {[
              { icon: Shield, text: "7 dias de garantia" },
              { icon: Lock,   text: "Compra 100% segura" },
              { icon: Clock,  text: "Acesso vitalício" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon size={15} style={{ color: "var(--gold)", flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "rgba(255,255,255,0.5)" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════════════════ */}
      <footer className="py-10 px-5 md:px-10" style={{ background: "rgba(0,0,0,0.94)", color: "rgba(255,255,255,0.5)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="gold-divider mb-8 opacity-20" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--tan), var(--gold))" }}>
                <span style={{ fontFamily: "var(--font-great-vibes), cursive", color: "white", fontSize: "1.1rem" }}>L</span>
              </div>
              <span style={{ fontFamily: "var(--font-serif)", color: "rgba(255,255,255,0.7)", fontSize: "1rem" }}>Loiros Impecáveis</span>
            </div>
            <div className="flex items-center gap-5">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white"><MessageCircle size={18} /></a>
              <Link href="/formulario" style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem" }} className="hover:text-white transition-colors">
                Contato
              </Link>
            </div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.76rem" }}>
              © 2025 Loiros Impecáveis. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="whatsapp-fab" aria-label="Falar pelo WhatsApp">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.025.507 3.934 1.399 5.61L0 24l6.61-1.347A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.663-.527-5.168-1.439l-.371-.218-3.843.783.816-3.738-.24-.387C2.016 15.368 1.5 13.738 1.5 12 1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12 17.799 22.5 12 22.5z" fillRule="evenodd"/>
        </svg>
      </a>

    </main>
  )
}
