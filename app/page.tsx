"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Check,
  Star,
  ChevronDown,
  MessageCircle,
  Sparkles,
  Scissors,
  TrendingUp,
  Shield,
  Award,
  Clock,
  Users,
  Zap,
  Lock,
  AlertCircle,
  DollarSign,
  AlertTriangle,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight, 
} from "lucide-react";
import { PROVA_SOCIAL_IMAGES, RAIZES_IMAGES } from "../lib/config";

/* ─── CONFIG ────────────────────────────────────────────────────────────────── */
const HOTMART_URL = "https://pay.hotmart.com/SEULINK"; // ← altere aqui
const WHATSAPP_NUMBER = "5511999999999"; // ← altere aqui
const WHATSAPP_MSG = encodeURIComponent(
  "Oi, quero saber mais sobre o Método MSM",
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

/* ─── CONTEÚDO ──────────────────────────────────────────────────────────────── */
const BENEFITS = [
  {
    icon: Shield,
    title: "Sem medo de manchas",
    text: "Aprenda exatamente como evitar manchas na raiz e corte químico. Execute cada técnica com segurança total.",
  },
  {
    icon: TrendingUp,
    title: "Cobre o que você merece",
    text: "Profissionais que dominam mechas com segurança cobram mais — e os clientes pagam sem questionar.",
  },
  {
    icon: Scissors,
    title: "Diagnóstico preciso",
    text: "Anamnese profissional, teste de mecha e análise do fio: nunca mais comece um serviço sem saber exatamente o que vai acontecer.",
  },
  {
    icon: Users,
    title: "Agenda cheia de valor",
    text: "Clientes que buscam especialistas em mechas voltam toda semana e indicam. Construa sua reputação de referência.",
  },
  {
    icon: Award,
    title: "Técnicas que o mercado pede",
    text: "Free Hands, Balayage, Luminous Slice, Soft Blond, Beach Waves — o portfólio completo para qualquer cliente.",
  },
  {
    icon: Zap,
    title: "Método direto e aplicável",
    text: "Sem enrolação. Conteúdo claro, estruturado e pronto para ser aplicado no dia a dia do salão.",
  },
];

const ICP_BULLETS = [
  "Você que já atende no salão, mas sente medo de manchar o cabelo da cliente ou causar corte químico",
  "Quem já fez outros cursos, mas ainda trava na hora de executar e sente que sempre falta alguma coisa",
  "Você que trabalha o dia inteiro, fica em pé, se dedica... mas no fim sente que ganha menos do que merece",
  "Quem quer aprender mechas com segurança para cobrar mais caro e ser reconhecida como especialista",
  "Você que sonha em ter agenda cheia, clientes de valor e mais liberdade para viver sua vida",
  "Quem quer parar de trabalhar com insegurança e começar a atender com confiança de verdade",
  "Você que precisa de um método claro, direto e aplicável no dia a dia do salão — sem enrolação",
];

const MODULES = [
  {
    num: "00",
    title: "Boas-vindas e direcionamento profissional",
    text: "Comece com clareza: como funciona o método, como aproveitar melhor as aulas, suporte, mentalidade e como a Solange construiu sua autoridade.",
    tags: [],
  },
  {
    num: "01",
    title: "Destravando seus medos nas mechas",
    text: "Entenda a base da técnica para nunca mais trabalhar insegura: estrutura do fio, pH, ação do descolorante e OX, fundo de clareamento correto.",
    tags: [],
  },
  {
    num: "02",
    title: "Diagnóstico seguro e preparação do fio",
    text: "Anamnese profissional, teste de mecha, preparação para descoloração, técnica de eriçado e costura sem marcações e tipos de papéis.",
    tags: [],
  },
  {
    num: "03",
    title: "Técnicas sem manchas e sem corte químico",
    text: "Blond Diamond, Free Hands, Velvet Bond Blast, Luminous Slice (com e sem coloração), Soft Blond, Intense Blond — o portfólio completo.",
    tags: ["Free Hands", "Balayage", "Blond Diamond"],
  },
  {
    num: "04",
    title: "Dicas essenciais para resultados profissionais",
    text: "Ajustes que evitam erros comuns, dicas coringa para mechas mais seguras e bonitas e como garantir resultado uniforme valorizado pela cliente.",
    tags: [],
  },
  {
    num: "🎁",
    title: "Bônus — Finalizações que encantam",
    text: "Beach Waves, Beach Waves Soft, Cachos com prancha, Hollywood Waves e Soft Waves. Finalização que aumenta o valor percebido do serviço.",
    tags: ["Bônus exclusivo"],
  },
];

const TESTIMONIALS = [
  {
    name: "Mariana Costa",
    role: "Cabeleireira • São Paulo",
    text: "Fiz outros cursos e ainda travava na execução. Com o Método MSM finalmente entendi o porquê de cada passo. Nunca mais tive medo de manchar.",
    stars: 5,
  },
  {
    name: "Patricia Oliveira",
    role: "Proprietária de Salão • Rio",
    text: "Aumentei meu ticket em 40% nas mechas logo no primeiro mês. Minha cliente percebeu a diferença na segurança com que eu executei.",
    stars: 5,
  },
  {
    name: "Fernanda Lima",
    role: "Colorista • Curitiba",
    text: "O módulo de diagnóstico mudou tudo. Agora faço a anamnese certa, o teste de mecha e nunca mais pego o cabelo sem saber o que vai acontecer.",
    stars: 5,
  },
  {
    name: "Juliana Ramos",
    role: "Cabeleireira • Belo Horizonte",
    text: "Era exatamente o que eu precisava: um método claro, sem enrolação, que dá pra aplicar no salão no mesmo dia. Recomendo pra toda cabeleireira.",
    stars: 5,
  },
  {
    name: "Camila Santos",
    role: "Freelancer • Brasília",
    text: "Fiz o curso com medo de corte químico. Depois de concluir o Módulo 2 já me senti segura para atender. O suporte também é incrível.",
    stars: 5,
  },
  {
    name: "Rafaela Mendes",
    role: "Colorista Profissional • Salvador",
    text: "As técnicas do Módulo 3 me salvaram. Hoje executo Free Hands e Luminous Slice com total confiança e cobro o que meu trabalho merece.",
    stars: 5,
  },
];

const FAQS = [
  {
    q: "O Mechas Sem Medo é para iniciantes?",
    a: "Sim. O método foi criado para cabeleireiras que ainda se sentem inseguras nas mechas, mesmo que já tenham feito outros cursos. Você vai aprender desde a base até as técnicas avançadas, com explicações claras e aplicáveis no dia a dia do salão.",
  },
  {
    q: "Vou aprender mesmo se ainda tiver medo de fazer mechas?",
    a: "Sim. O curso foi estruturado justamente para ajudar profissionais que sentem medo de manchar o cabelo da cliente ou causar corte químico. O Método MSM apresenta um passo a passo que traz mais segurança e clareza na execução.",
  },
  {
    q: "Como vou acessar o curso?",
    a: "Após a confirmação da compra, você receberá no seu e-mail os dados de acesso à plataforma da Hotmart, onde todas as aulas ficam disponíveis 24h por dia, no seu ritmo.",
  },
  {
    q: "Por quanto tempo terei acesso?",
    a: "O acesso ao curso é por 1 ano a partir da data da compra.",
  },
  {
    q: "O curso tem suporte?",
    a: "Sim. Você terá suporte para esclarecer dúvidas sobre o conteúdo das aulas e te ajudar durante todo o processo de aprendizado.",
  },
  {
    q: "E se eu achar que o curso não é para mim?",
    a: "Você tem 7 dias de garantia. Caso entenda que o curso não é adequado para você, pode solicitar o reembolso dentro desse prazo — sem burocracia.",
  },
  {
    q: "Posso parcelar o pagamento?",
    a: "Sim. O pagamento pode ser parcelado no cartão de crédito, conforme as condições disponíveis na plataforma no momento da compra. Também aceita Pix e boleto.",
  },
];

/* ─── HOOK: SCROLL REVEAL ────────────────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale",
    );
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("active"),
        ),
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─── HOOK: COUNTER ANIMATION ───────────────────────────────────────────────── */
function useCounterAnimation(target: number, suffix: string) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const duration = 1800;
        const step = (timestamp: number, startTime: number) => {
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(ease * target));
          if (progress < 1) requestAnimationFrame((t) => step(t, startTime));
        };
        requestAnimationFrame((t) => step(t, t));
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);
  return { count, ref, display: `${count}${suffix}` };
}

/* ─── COMPONENTE: FAQ ITEM ──────────────────────────────────────────────────── */
function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className="border-b last:border-0"
      style={{ borderColor: "rgba(191,161,136,0.25)" }}
    >
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left gap-4"
      >
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.02rem",
            fontWeight: 600,
            color: isOpen ? "var(--brown-deep)" : "var(--fg)",
            lineHeight: 1.4,
          }}
        >
          {question}
        </span>
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: isOpen
              ? "linear-gradient(135deg,var(--brown-deep),var(--gold))"
              : "rgba(191,161,136,0.15)",
            transform: isOpen ? "rotate(180deg)" : "none",
          }}
        >
          <ChevronDown
            size={16}
            style={{ color: isOpen ? "white" : "var(--brown-warm)" }}
          />
        </div>
      </button>
      <div
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{
          maxHeight: isOpen ? "28rem" : 0,
          paddingBottom: isOpen ? "1.5rem" : 0,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-sans)",
            color: "var(--muted)",
            lineHeight: 1.8,
            fontSize: "0.95rem",
          }}
        >
          {answer}
        </p>
      </div>
    </div>
  );
}

/* ─── COMPONENTE: STAT CARD ─────────────────────────────────────────────────── */
function StatCard({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) {
  const { display, ref } = useCounterAnimation(target, suffix);
  return (
    <div ref={ref} className="text-center py-2">
      <p
        className="gold-text-dark"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(2rem, 4vw, 2.8rem)",
          fontWeight: 800,
          lineHeight: 1,
        }}
      >
        {display}
      </p>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          color: "rgba(255,255,255,0.55)",
          fontSize: "0.8rem",
          marginTop: "0.35rem",
          letterSpacing: "0.04em",
        }}
      >
        {label}
      </p>
    </div>
  );
}

/* ─── PÁGINA PRINCIPAL ──────────────────────────────────────────────────────── */
export default function LandingPage() {
  useScrollReveal();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth > 640 ? 320 : 250; // Pulo de 1 card
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main style={{ background: "var(--bg)", overflowX: "hidden" }}>
      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] flex items-center gold-texture-bg overflow-hidden"
      >
        {/* Partículas decorativas */}
        {mounted && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${[8, 5, 10, 6, 9, 4][i]}px`,
                  height: `${[8, 5, 10, 6, 9, 4][i]}px`,
                  left: `${[15, 35, 60, 75, 85, 50][i]}%`,
                  top: `${[20, 60, 25, 70, 40, 80][i]}%`,
                  background:
                    "linear-gradient(135deg, var(--gold), var(--gold-light))",
                  opacity: 0.35,
                  animation: `particleFloat ${[4, 6, 5, 7, 4.5, 6.5][i]}s ease-in-out infinite`,
                  animationDelay: `${[0, 1, 2, 0.5, 1.5, 2.5][i]}s`,
                }}
              />
            ))}
            <div
              className="absolute -right-32 top-1/4 w-[500px] h-[500px] rounded-full animate-blob opacity-20"
              style={{
                background:
                  "radial-gradient(circle, rgba(201,168,76,0.4), rgba(191,161,136,0.15))",
              }}
            />
            <div
              className="absolute -left-20 bottom-1/4 w-[350px] h-[350px] rounded-full animate-blob opacity-15"
              style={{
                background:
                  "radial-gradient(circle, rgba(169,117,98,0.3), rgba(250,235,230,0.2))",
                animationDelay: "-5s",
              }}
            />
          </div>
        )}

        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, var(--gold-warm) 30%, var(--gold-shine) 50%, var(--gold-warm) 70%, transparent 100%)",
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-10 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Lado esquerdo — copy */}
            <div>
              <div
                className={`transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              >
                <div className="badge-gold mb-7">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{
                      background: "var(--gold)",
                      boxShadow: "0 0 6px var(--gold)",
                    }}
                  />
                  Solange Jesus Academy
                </div>
              </div>

              <p
                className={`transition-all duration-700 delay-75 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                style={{
                  fontFamily: "var(--font-great-vibes), cursive",
                  fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                  color: "var(--brown-warm)",
                  lineHeight: 1.1,
                  marginBottom: "0.25rem",
                }}
              >
                Mechas com segurança
              </p>

              <h1
                className={`transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2rem, 5vw, 3.6rem)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  marginBottom: "1.5rem",
                  color: "var(--fg)",
                }}
              >
                Domine a técnica e{" "}
                <span className="gold-text-animated">
                  nunca mais tenha medo de manchar
                </span>{" "}
                ou causar corte químico
              </h1>

              <p
                className={`transition-all duration-700 delay-150 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  color: "var(--muted)",
                  maxWidth: "32rem",
                  marginBottom: "0.75rem",
                }}
              >
                Aprenda o Método MSM (Mechas Sem Medo) para executar mechas com confiança, cobrar
                o que seu trabalho merece e ser reconhecida como especialista —{" "}
                <strong style={{ color: "var(--brown-deep)" }}>
                  mesmo que você ainda se sinta insegura hoje.
                </strong>
              </p>

              <p
                className={`transition-all duration-700 delay-175 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.9rem",
                  color: "var(--muted)",
                  marginBottom: "2.5rem",
                }}
              >
                Com mais de{" "}
                <strong style={{ color: "var(--brown-deep)" }}>
                  19 anos de experiência
                </strong>{" "}
                na área da beleza e mechas.
              </p>

              <div
                className={`flex flex-col sm:flex-row gap-3 mb-10 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              >
                <a
                  href={HOTMART_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold animate-pulse-gold"
                >
                  <Sparkles size={17} />
                  Quero aprender mechas sem medo
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                  style={{
                    background: "transparent",
                    color: "var(--brown-deep)",
                    border: "1.5px solid rgba(107,79,58,0.3)",
                    boxShadow: "none",
                  }}
                >
                  <MessageCircle size={17} />
                  Falar pelo WhatsApp
                </a>
              </div>

              {/* Trust bar */}
              <div
                className={`transition-all duration-700 delay-300 ${mounted ? "opacity-100" : "opacity-0"}`}
              >
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  {[
                    { icon: Lock, text: "Compra 100% segura" },
                    { icon: Clock, text: "Acesso imediato" },
                    { icon: Shield, text: "7 dias de garantia" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-1.5">
                      <Icon
                        size={13}
                        style={{ color: "var(--gold)", flexShrink: 0 }}
                      />
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.8rem",
                          color: "var(--muted)",
                        }}
                      >
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Lado direito — card flutuante */}
            <div
              className={`hidden lg:flex justify-center items-center transition-all duration-1000 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="relative w-full max-w-sm">
                <div
                  className="absolute -inset-6 rounded-3xl animate-spin-slow opacity-30"
                  style={{
                    background:
                      "conic-gradient(from 0deg, var(--gold-warm), var(--gold-shine), var(--gold-light), var(--tan), var(--gold-warm))",
                    filter: "blur(18px)",
                  }}
                />

                <div
                  className="relative rounded-2xl p-8 z-10"
                  style={{
                    background: "white",
                    boxShadow:
                      "0 24px 64px rgba(107,79,58,0.18), 0 8px 24px rgba(107,79,58,0.1)",
                  }}
                >
                  <div className="text-center mb-5">
                    <div
                      className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--gold), var(--brown-deep))",
                      }}
                    >
                      <Scissors size={24} style={{ color: "white" }} />
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontWeight: 700,
                        fontSize: "1.2rem",
                        color: "var(--fg)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Mechas <span className="gold-text">Sem Medo</span>
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        color: "var(--muted)",
                        fontSize: "0.85rem",
                        lineHeight: 1.6,
                      }}
                    >
                      O método completo para executar mechas com segurança e
                      confiança — do diagnóstico à finalização
                    </p>
                  </div>

                  {[
                    "30+ Aulas em 5 módulos",
                    "Diagnóstico e anamnese profissional",
                    "Técnicas Free Hands e Balayage",
                    "Suporte durante o aprendizado",
                    "7 dias de garantia",
                    "Bônus exclusivo de finalização",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 mb-2.5 last:mb-0"
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--gold), var(--gold-shine))",
                        }}
                      >
                        <Check
                          size={11}
                          style={{ color: "white", strokeWidth: 3 }}
                        />
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.87rem",
                          color: "var(--fg)",
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}

                  <div
                    className="mt-6 pt-5"
                    style={{ borderTop: "1px solid rgba(191,161,136,0.2)" }}
                  >
                    <a
                      href={HOTMART_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold w-full"
                      style={{ display: "flex" }}
                    >
                      Garantir Minha Vaga
                    </a>
                  </div>
                </div>

                <div
                  className="absolute -top-4 -right-4 w-20 h-20 rounded-full flex flex-col items-center justify-center animate-float"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--brown-deep), var(--gold))",
                    boxShadow: "0 8px 24px rgba(107,79,58,0.35)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-serif)",
                      color: "white",
                      fontWeight: 800,
                      fontSize: "0.7rem",
                      textAlign: "center",
                      lineHeight: 1.1,
                    }}
                  >
                    7 dias
                    <br />
                    garantia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

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
            <StatCard target={19} suffix=" anos" label="de Experiência" />
            <StatCard target={99} suffix="%" label="de Satisfação" />
            <StatCard target={30} suffix="+ aulas" label="em Vídeo HD" />
            <StatCard target={7} suffix=" dias" label="de Garantia" />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          PROBLEMA / DOR
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 px-5 md:px-10 gold-texture-bg">
        {/* MICRO-GRAFISMOS (Elementos flutuantes perfeitamente visíveis no celular) */}
        <div className="absolute top-16 right-6 md:right-24 animate-float opacity-50">
          <Sparkles size={28} style={{ color: "var(--gold)" }} />
        </div>
        <div className="absolute bottom-24 left-4 md:left-20 animate-float-slow opacity-40">
          <Star
            size={16}
            style={{ fill: "var(--gold)", color: "var(--gold)" }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center reveal">
          <div className="ornament-center mb-8">
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--gold)",
              }}
            >
              A realidade de muitas cabeleireiras
            </span>
          </div>

          <p
            style={{
              fontFamily: "var(--font-great-vibes), cursive",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              color: "var(--brown-warm)",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            Você já sentiu isso?
          </p>

          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: "2.5rem",
            }}
          >
            O medo de errar nas mechas te impede de{" "}
            <span className="gold-text-animated">cobrar o que você merece</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              {
                icon: AlertCircle,
                pain: "Clientes chegam pedindo mechas e você hesita em aceitar — não tem confiança de que vai ficar sem manchas na raiz",
              },
              {
                icon: DollarSign,
                pain: "Vê colegas cobrando o dobro pelo mesmo serviço e não entende por quê — a diferença está na segurança da técnica",
              },
              {
                icon: AlertTriangle,
                pain: "Já teve medo de corte químico ou já viu uma mecha dar errado, e desde então o medo aumentou ainda mais",
              },
            ].map(({ icon: Icon, pain }, i) => (
              <div
                key={i}
                className="card p-8 reveal text-left"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div
                  className="w-12 h-12 rounded-full mb-5 flex items-center justify-center"
                  style={{ background: "rgba(169,117,98,0.12)" }}
                >
                  <Icon size={24} style={{ color: "var(--brown-warm)" }} />
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--brown-deep)",
                    lineHeight: 1.7,
                    fontSize: "0.95rem",
                  }}
                >
                  {pain}
                </p>
              </div>
            ))}
          </div>

          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.15rem",
              fontWeight: 600,
              marginTop: "3rem",
              color: "var(--brown-deep)",
            }}
          >
            Isso tem solução. E o Método Mechas Sem Medo foi criado exatamente para isso.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          PARA QUEM É — ICP (AJUSTADO PARA MOBILE)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 px-5 md:px-10 gold-texture-bg relative overflow-hidden">
        {/* ELEMENTOS DECORATIVOS COM POSICIONAMENTO SEGURO */}
        <div className="absolute top-10 -left-12 opacity-[0.04] rotate-12 pointer-events-none">
          <Scissors size={180} style={{ color: "var(--brown-deep)" }} />
        </div>

        {/* Estrela movida para a extrema direita e com z-index baixo para não cobrir texto */}
        <div className="absolute bottom-10 -right-8 opacity-[0.06] -rotate-12 pointer-events-none z-0">
          <Sparkles size={130} style={{ color: "var(--gold)" }} />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-14 reveal">
            <div className="ornament-center mb-6">
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                }}
              >
                Para quem é o Mechas Sem Medo
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Esse método é pra você que trabalha com cabelo,
              <br />
              mas ainda se sente{" "}
              <span className="gold-text">
                insegura na hora de fazer mechas
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 reveal">
            {ICP_BULLETS.map((bullet, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-6 rounded-2xl transition-all duration-300 sm:hover:-translate-y-1"
                style={{
                  background: "white",
                  border: "1px solid rgba(201,168,76,0.15)",
                  boxShadow: "0 4px 12px rgba(107,79,58,0.03)",
                }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--gold-warm), var(--gold-shine))",
                  }}
                >
                  <Check size={12} style={{ color: "white", strokeWidth: 4 }} />
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                    color: "var(--brown-deep)",
                    fontWeight: 500,
                  }}
                >
                  {bullet}
                </p>
              </div>
            ))}
          </div>

          {/* Badge final ajustada */}
          <div className="flex justify-center mt-12 reveal">
            <div
              className="py-4 px-6 sm:px-10 rounded-2xl sm:rounded-full w-full sm:w-auto"
              style={{
                background: "rgba(255,255,255,0.5)",
                border: "1px dashed rgba(201,168,76,0.3)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--brown-deep)",
                  textAlign: "center",
                  lineHeight: 1.4,
                }}
              >
                Se você se identificou com pelo menos um desses pontos...{" "}
                <br className="sm:hidden" />
                <span style={{ color: "var(--gold-warm)" }}>
                  este método é para você!
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          BENEFÍCIOS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal">
            <div className="ornament-center mb-6">
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                }}
              >
                O que você vai conquistar
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Tudo que muda quando você{" "}
              <span className="gold-text">domina mechas com segurança</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {BENEFITS.map(({ icon: Icon, title, text }, i) => (
              <div
                key={i}
                className="card p-7 reveal-scale"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(201,168,76,0.12), rgba(107,79,58,0.08))",
                  }}
                >
                  <Icon size={22} style={{ color: "var(--gold-warm)" }} />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    marginBottom: "0.6rem",
                    color: "var(--brown-deep)",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--muted)",
                    lineHeight: 1.75,
                    fontSize: "0.9rem",
                  }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SEÇÃO: AUTORIDADE — RAÍZES IMPECÁVEIS
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 md:py-36 px-5 md:px-10 overflow-hidden"
        style={{ background: "var(--cream)" }}
      >
        {/* Fundo dourado sutil */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 80% 20%, rgba(201,168,76,0.08) 0%, transparent 65%), radial-gradient(ellipse 50% 70% at 10% 80%, rgba(191,161,136,0.07) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* ── Header em duas colunas ── */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Texto de autoridade */}
            <div className="reveal-left">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                
              >
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.9rem, 4vw, 3rem)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  marginBottom: "1.5rem",
                  color: "var(--fg)",
                }}
              >
                Mancha na raiz não é azar.{" "}
                <span className="gold-text-animated">É falta de método.</span>
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1rem",
                  lineHeight: 1.85,
                  color: "var(--muted)",
                  marginBottom: "1.75rem",
                }}
              >
                A Solange ensina com precisão onde cada profissional erra:
                divisão incorreta, OX errado, tempo de processamento impreciso.
                Com o Método MSM, você aprende a eliminar cada variável que
                causa mancha — e executa com a segurança de quem sabe exatamente
                o que está fazendo.
              </p>

              {/* Pilares técnicos */}
              <div className="space-y-3 mb-8">
                {[
                  {
                    label: "Divisão de mecha precisa",
                    desc: "sem sobrepor produto na raiz já processada",
                  },
                  {
                    label: "OX e descolorante corretos",
                    desc: "calculados para cada tipo de fio e histórico",
                  },
                  {
                    label: "Controle de tempo e calor",
                    desc: "sem queima, sem corte químico, sem surpresa",
                  },
                  {
                    label: "Técnica de aplicação borda a borda",
                    desc: "resultado uniforme do couro ao fio",
                  },
                ].map(({ label, desc }, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3.5 rounded-xl transition-all duration-200 hover:bg-white"
                    style={{ border: "1px solid transparent" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(201,168,76,0.2)";
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 4px 16px rgba(107,79,58,0.06)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "transparent";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--gold-warm), var(--gold-shine))",
                      }}
                    >
                      <Check
                        size={10}
                        style={{ color: "white", strokeWidth: 3.5 }}
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontWeight: 600,
                          fontSize: "0.9rem",
                          color: "var(--brown-deep)",
                        }}
                      >
                        {label}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.82rem",
                          color: "var(--muted)",
                          marginTop: "1px",
                        }}
                      >
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={HOTMART_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
                style={{ display: "inline-flex" }}
              >
                <Shield size={16} />
                Quero aprender sem medo de manchar
              </a>
            </div>

            {/* Stat cards de autoridade */}
            <div className="reveal-right">
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    num: "0",
                    unit: "manchas",
                    desc: "quando o método é seguido corretamente",
                  },
                  {
                    num: "19",
                    unit: "anos",
                    desc: "formando profissionais mais seguras",
                  },
                  {
                    num: "30+",
                    unit: "aulas",
                    desc: "cobrindo cada detalhe técnico do início ao fim",
                  },
                  {
                    num: "100%",
                    unit: "prático",
                    desc: "aplicável no salão no mesmo dia",
                  },
                ].map(({ num, unit, desc }, i) => (
                  <div
                    key={i}
                    className="card p-6 text-center"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "2rem",
                        fontWeight: 800,
                        lineHeight: 1,
                        marginBottom: "2px",
                      }}
                      className="gold-text"
                    >
                      {num}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--brown-warm)",
                        marginBottom: "8px",
                      }}
                    >
                      {unit}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.8rem",
                        color: "var(--muted)",
                        lineHeight: 1.5,
                      }}
                    >
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Carrossel de imagens — raízes impecáveis ── */}
          <div className="reveal">
            <div 
              className="flex gap-4 overflow-x-auto pb-4 scroll-smooth [&::-webkit-scrollbar]:hidden" 
              id="raizes-carousel"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {RAIZES_IMAGES.map(({ src, caption }, i) => (
                <div key={i} className="flex-shrink-0 group" style={{ width: "260px" }}>
                  <div className="relative overflow-hidden rounded-2xl mb-3"
                    style={{ height: "340px", border: "1px solid rgba(201,168,76,0.3)", boxShadow: "0 4px 20px rgba(107,79,58,0.1)" }}>
                    <img 
                      src={src} 
                      alt={caption} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  </div>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--brown-deep)", fontWeight: 500, textAlign: "center" }}>
                    {caption}
                  </p>
                </div>
              ))}
            </div>

            {/* MOBILE: Texto Informativo (Aparece apenas em telas pequenas) */}
            <div className="flex sm:hidden items-center justify-center mt-2 py-2">
              <span 
                style={{ 
                  fontFamily: "var(--font-sans)", 
                  fontSize: "0.75rem", 
                  fontWeight: 500, 
                  letterSpacing: "0.05em",
                  color: "#9ca3af" 
                }}
              >
                ← Deslize para os lados →
              </span>
            </div>

            {/* Botões de navegação desktop (Aparece apenas em telas maiores) */}
            <div className="hidden sm:flex justify-center gap-3 mt-6">
              <button
                onClick={() => {
                  const el = document.getElementById("raizes-carousel");
                  if (el) el.scrollBy({ left: -580, behavior: "smooth" });
                }}
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                style={{
                  background: "white",
                  border: "1px solid rgba(201,168,76,0.3)",
                  boxShadow: "0 2px 12px rgba(107,79,58,0.08)",
                }}
                aria-label="Anterior"
              >
                <ChevronLeft size={20} style={{ color: "var(--brown-deep)" }} />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("raizes-carousel");
                  if (el) el.scrollBy({ left: 580, behavior: "smooth" });
                }}
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                style={{
                  background: "white",
                  border: "1px solid rgba(201,168,76,0.3)",
                  boxShadow: "0 2px 12px rgba(107,79,58,0.08)",
                }}
                aria-label="Próximo"
              >
                <ChevronRight
                  size={20}
                  style={{ color: "var(--brown-deep)" }}
                />
              </button>
            </div>
          </div>
          </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          MÓDULOS DO CURSO
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-32 px-5 md:px-10"
        style={{ background: "rgba(250,235,230,0.4)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-start">
            {/* Sticky left */}
            <div className="lg:sticky lg:top-24 reveal-left">
              <div
                className="ornament-center mb-6"
                style={{ justifyContent: "flex-start" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                  }}
                >
                  Conteúdo completo do Mechas Sem Medo
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-great-vibes), cursive",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: "var(--brown-warm)",
                  lineHeight: 1.1,
                  marginBottom: "0.25rem",
                }}
              >
                Um passo a passo claro
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  marginBottom: "1.5rem",
                }}
              >
                para dominar mechas com{" "}
                <span className="gold-text">segurança e confiança</span>
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "var(--muted)",
                  lineHeight: 1.8,
                  fontSize: "0.97rem",
                  marginBottom: "2.5rem",
                }}
              >
                Do diagnóstico à finalização — cada módulo foi construído para
                eliminar a insegurança e tornar a execução clara, segura e
                profissional.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={HOTMART_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                >
                  <Sparkles size={17} />
                  Quero aprender com segurança
                </a>
              </div>

              {/* +30 aulas badge */}
              <div
                className="flex items-center gap-4 mt-6 py-4 px-5 rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(201,168,76,0.1), rgba(107,79,58,0.05))",
                  border: "1px solid rgba(201,168,76,0.25)",
                }}
              >
                <div className="text-center flex-shrink-0">
                  <p
                    className="gold-text"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.9rem",
                      fontWeight: 800,
                      lineHeight: 1,
                    }}
                  >
                    30+
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--brown-warm)",
                      marginTop: "2px",
                    }}
                  >
                    aulas
                  </p>
                </div>
                <div
                  className="w-px self-stretch"
                  style={{ background: "rgba(201,168,76,0.2)" }}
                />
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.84rem",
                    color: "var(--brown-deep)",
                    lineHeight: 1.55,
                  }}
                >
                  Mais de <strong>30 aulas em vídeo HD</strong>, em 5 módulos +
                  bônus de finalizações.
                </p>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <Lock
                  size={16}
                  style={{ color: "var(--gold)", flexShrink: 0 }}
                />
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.8rem",
                    color: "var(--muted)",
                  }}
                >
                  Garantia de 7 dias. Sem risco nenhum.
                </p>
              </div>
            </div>

            {/* Lista de módulos com efeito Timeline (Versão Tailwind Puro) */}
            <div className="relative reveal-right">
              {/* Linha vertical pontilhada (Desenhada direto no Tailwind) */}
              <div
                className="absolute border-l-2 border-dashed z-0"
                style={{
                  left: "23px" /* Alinhado exato no centro do círculo de 48px */,
                  top: "24px",
                  bottom: "24px",
                  borderColor: "rgba(201,168,76,0.4)",
                }}
              />

              <div className="space-y-12 relative z-10">
                {MODULES.map(({ num, title, text, tags }, i) => (
                  <div key={i} className="flex gap-6 md:gap-10 relative group">
                    {/* Indicador Numérico (Fica por cima da linha) */}
                    <div className="flex-shrink-0 relative z-10">
                      <div
                        className="w-12 h-12 rounded-full bg-white flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-sm relative z-20"
                        style={{
                          border: "1.5px solid rgba(201,168,76,0.5)",
                          boxShadow: "0 4px 15px rgba(107,79,58,0.06)",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "1rem",
                            fontWeight: 800,
                            color: "var(--gold-warm)",
                          }}
                        >
                          {num}
                        </span>
                      </div>
                    </div>

                    {/* Conteúdo do Card */}
                    <div className="flex-grow pt-1">
                      <h3
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontWeight: 700,
                          fontSize: "1.1rem",
                          color: "var(--brown-deep)",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "var(--font-sans)",
                          color: "var(--muted)",
                          lineHeight: 1.7,
                          fontSize: "0.92rem",
                          marginBottom: tags.length ? "0.8rem" : 0,
                        }}
                      >
                        {text}
                      </p>

                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <span
                              key={tag}
                              className="badge-gold"
                              style={{
                                fontSize: "0.65rem",
                                padding: "0.3rem 0.8rem",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CTA MEIO
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="dark-luxury py-20 md:py-28 px-5 md:px-10">
        <div className="relative z-10 max-w-3xl mx-auto text-center reveal">
          <p
            style={{
              fontFamily: "var(--font-great-vibes), cursive",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              color: "var(--gold-light)",
              lineHeight: 1.05,
              marginBottom: "0.5rem",
            }}
          >
            Pronta para mudar?
          </p>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              color: "white",
              marginBottom: "1rem",
            }}
          >
            Pronta para atender com mais{" "}
            <span className="gold-text-dark">
              segurança e confiança nas mechas?
            </span>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              color: "rgba(255,255,255,0.7)",
              fontSize: "1.02rem",
              lineHeight: 1.8,
              maxWidth: "28rem",
              margin: "0 auto 2.5rem",
            }}
          >
            O Método Mechas Sem Medo já ajudou diversas profissionais a
            destravarem a insegurança e evoluírem na técnica — agora pode ser a
            sua vez.
          </p>
          <a
            href={HOTMART_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold animate-glow"
            style={{ fontSize: "0.95rem", padding: "1.2rem 3rem" }}
          >
            <Sparkles size={18} />
            Quero aprender mechas com segurança
          </a>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.78rem",
              color: "rgba(255,255,255,0.4)",
              marginTop: "1rem",
            }}
          >
            Pagamento seguro · 7 dias de garantia · Acesso imediato
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          MENTORA
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 px-5 md:px-10 gold-texture-bg">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">
            {/* Foto placeholder */}
            <div className="reveal-left order-2 lg:order-1">
              <div className="relative max-w-md mx-auto">
                <div
                  className="absolute -inset-3 rounded-3xl blur-2xl opacity-25"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--gold), var(--gold-light))",
                  }}
                />
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(107,79,58,0.06)",
                    border: "1px solid rgba(201,168,76,0.2)",
                    aspectRatio: "4/5",
                  }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <div
                      className="w-28 h-28 rounded-full flex items-center justify-center mb-5"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--tan), var(--gold))",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-great-vibes), cursive",
                          fontSize: "3rem",
                          color: "white",
                        }}
                      >
                        S
                      </span>
                    </div>
                    <p
                      className="gold-text"
                      style={{
                        fontFamily: "var(--font-great-vibes), cursive",
                        fontSize: "2.2rem",
                        marginBottom: "0.3rem",
                      }}
                    >
                      Solange Jesus
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        color: "var(--muted)",
                        fontSize: "0.88rem",
                      }}
                    >
                      Especialista em Mechas · 19 anos de experiência
                    </p>
                    <div className="flex gap-1 mt-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          style={{ fill: "var(--gold)", color: "var(--gold)" }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  className="absolute -bottom-5 -right-5 rounded-2xl px-5 py-3 animate-float"
                  style={{
                    background: "white",
                    boxShadow: "0 10px 30px rgba(107,79,58,0.2)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Award size={18} style={{ color: "var(--gold)" }} />
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                          color: "var(--brown-deep)",
                        }}
                      >
                        19+ anos
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.72rem",
                          color: "var(--muted)",
                        }}
                      >
                        de experiência
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="reveal-right order-1 lg:order-2">
              <div
                className="ornament-center mb-6"
                style={{ justifyContent: "flex-start" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                  }}
                >
                  Sua mentora
                </span>
              </div>

              <p
                style={{
                  fontFamily: "var(--font-great-vibes), cursive",
                  fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
                  color: "var(--brown-warm)",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                Conheça a história da Solange Jesus
              </p>

              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
                  fontWeight: 700,
                  color: "var(--fg)",
                  marginBottom: "1.5rem",
                }}
              >
                19 anos formando profissionais{" "}
                <span className="gold-text">mais seguras e confiantes</span>
              </h2>

              <div
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-sans)",
                  lineHeight: 1.85,
                  fontSize: "0.97rem",
                }}
              >
                {[
                  "Solange Jesus é especialista em mechas e fundadora da Solange Jesus Academy, com mais de 19 anos de experiência na área da beleza.",
                  "Sua trajetória começou muito cedo, aos 13 anos, passando por diferentes trabalhos até encontrar na profissão de cabeleireira sua verdadeira vocação.",
                  "Ao longo da carreira, enfrentou desafios, inseguranças e momentos decisivos que a levaram a buscar conhecimento de forma intensa — estudando e aperfeiçoando técnicas para entregar resultados cada vez mais seguros e profissionais.",
                  "Hoje, Solange ajuda outras cabeleireiras a dominarem mechas com segurança, evitando erros como manchas e corte químico, através de um método claro, direto e aplicável no dia a dia do salão.",
                ].map((p, i) => (
                  <p key={i} style={{ marginBottom: "1rem" }}>
                    {p}
                  </p>
                ))}
              </div>

              <div
                className="grid grid-cols-3 gap-4 mt-8 pt-7"
                style={{ borderTop: "1px solid rgba(191,161,136,0.25)" }}
              >
                {[
                  { v: "19+", l: "Anos de mercado" },
                  { v: "13", l: "Anos quando começou" },
                  { v: "MSM", l: "Método exclusivo" },
                ].map(({ v, l }) => (
                  <div key={l} className="text-center">
                    <p
                      className="gold-text"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.8rem",
                        fontWeight: 800,
                      }}
                    >
                      {v}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        color: "var(--muted)",
                        fontSize: "0.73rem",
                        marginTop: "0.2rem",
                      }}
                    >
                      {l}
                    </p>
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
      <section
        className="py-20 md:py-32 px-5 md:px-10"
        style={{ background: "rgba(250,235,230,0.4)" }}
      >
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal">
            <div className="ornament-center mb-6">
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                }}
              >
                Veja o que as alunas estão dizendo
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Profissionais que já se sentiam inseguras hoje{" "}
              <span className="gold-text">executam mechas com confiança</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {TESTIMONIALS.map(({ name, role, text, stars }, i) => (
              <div
                key={i}
                className="card p-7 reveal-scale"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div
                  className="mb-4"
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "3.5rem",
                    lineHeight: 0.8,
                    color: "var(--gold-light)",
                  }}
                >
                  &ldquo;
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.93rem",
                    lineHeight: 1.8,
                    color: "var(--fg)",
                    marginBottom: "1.5rem",
                  }}
                >
                  {text}
                </p>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(stars)].map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      style={{ fill: "var(--gold)", color: "var(--gold)" }}
                    />
                  ))}
                </div>
                <div
                  className="flex items-center gap-3 pt-4"
                  style={{ borderTop: "1px solid rgba(191,161,136,0.2)" }}
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--tan), var(--brown-deep))",
                    }}
                  >
                    {name.charAt(0)}
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontWeight: 600,
                        fontSize: "0.93rem",
                        color: "var(--brown-deep)",
                      }}
                    >
                      {name}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        color: "var(--tan)",
                        fontSize: "0.78rem",
                      }}
                    >
                      {role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CARROSSEL DE IMAGENS (PROVA SOCIAL) ── */}
        <div className="mt-20 max-w-6xl mx-auto reveal px-4 sm:px-0">
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 scroll-smooth [&::-webkit-scrollbar]:hidden" 
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {PROVA_SOCIAL_IMAGES.map((imgSrc, index) => (
              <div key={index} className="flex-none w-[280px] snap-center">
                <div className="rounded-2xl overflow-hidden relative shadow-md" 
                    style={{ background: "white", border: "1px solid rgba(201,168,76,0.2)", aspectRatio: "4/5" }}>
                  <img src={imgSrc} alt="Depoimento" className="w-full h-full object-cover" />
                </div>
              </div>
            ))}
          </div>

          {/* MOBILE: Texto Informativo (Aparece apenas em telas pequenas) */}
         <div className="flex sm:hidden items-center justify-center mt-2 py-2">
            <span 
              style={{ 
                fontFamily: "var(--font-sans)", 
                fontSize: "0.75rem", 
                fontWeight: 500, 
                letterSpacing: "0.05em",
                color: "#9ca3af" // Cinza bem clarinho e discreto
              }}
            >
              ← Deslize para os lados →
            </span>
          </div>

          {/* DESKTOP: Botões de Navegação (Aparece apenas em telas maiores) */}
          <div className="hidden sm:flex justify-center gap-4 mt-6">
            <button 
              onClick={() => scrollCarousel("left")}
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-md bg-white border border-gold/30 hover:scale-110 active:scale-95 transition-all"
            >
              <ChevronLeft size={24} className="text-brown-deep" />
            </button>

            <button 
              onClick={() => scrollCarousel("right")}
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-md bg-white border border-gold/30 hover:scale-110 active:scale-95 transition-all"
            >
              <ChevronRight size={24} className="text-brown-deep" />
            </button>
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
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                }}
              >
                Perguntas frequentes
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 700,
              }}
            >
              Suas <span className="gold-text">dúvidas</span>, respondidas
            </h2>
          </div>

          <div
            className="rounded-2xl p-6 md:p-10 shadow-lg reveal"
            style={{ background: "white" }}
          >
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

          {/* Link WhatsApp abaixo do FAQ */}
          <div className="text-center mt-10 reveal">
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.9rem",
                color: "var(--muted)",
                marginBottom: "1rem",
              }}
            >
              Ainda tem dúvidas? Fale com a nossa equipe.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
              style={{
                width: "auto",
                display: "inline-flex",
                padding: "0.85rem 2rem",
                fontSize: "0.82rem",
              }}
            >
              <MessageCircle size={16} />
              Falar pelo WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="dark-luxury py-24 md:py-36 px-5 md:px-10">
        <div className="relative z-10 max-w-3xl mx-auto text-center reveal">
          <div
            className="ornament-center mb-8"
            style={{ filter: "brightness(1.5)" }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--gold)",
              }}
            >
              Sua próxima etapa
            </span>
          </div>

          <p
            style={{
              fontFamily: "var(--font-great-vibes), cursive",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              color: "var(--gold-light)",
              lineHeight: 1.05,
              marginBottom: "0.5rem",
            }}
          >
            Chegou a sua vez
          </p>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
              fontWeight: 700,
              color: "white",
              marginBottom: "1.5rem",
            }}
          >
            de ser reconhecida como{" "}
            <span className="gold-text-dark">especialista em mechas</span>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-sans)",
              color: "rgba(255,255,255,0.7)",
              fontSize: "1.05rem",
              lineHeight: 1.8,
              maxWidth: "28rem",
              margin: "0 auto 3rem",
            }}
          >
            Você não precisa mais trabalhar com medo de errar nas mechas. Com um
            método claro e aplicável, você pode desenvolver segurança, atender
            melhor e aumentar o valor do seu trabalho. Sem risco — 7 dias de
            garantia total.
          </p>

          <a
            href={HOTMART_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold animate-glow"
            style={{ fontSize: "0.95rem", padding: "1.2rem 3rem" }}
          >
            <Sparkles size={18} />
            Quero aprender mechas com segurança
          </a>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10 pt-8"
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
          >
            {[
              { icon: Shield, text: "7 dias de garantia" },
              { icon: Lock, text: "Compra 100% segura" },
              { icon: Clock, text: "Acesso imediato" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon
                  size={15}
                  style={{ color: "var(--gold)", flexShrink: 0 }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.82rem",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════════════════ */}
      <footer
        className="py-10 px-5 md:px-10"
        style={{
          background: "rgba(0,0,0,0.94)",
          color: "rgba(255,255,255,0.5)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="gold-divider mb-8 opacity-20" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, var(--tan), var(--gold))",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-great-vibes), cursive",
                    color: "white",
                    fontSize: "1.1rem",
                  }}
                >
                  S
                </span>
              </div>
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "1rem",
                    display: "block",
                  }}
                >
                  Solange Jesus Academy
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "rgba(255,255,255,0.35)",
                    fontSize: "0.72rem",
                  }}
                >
                  Formando profissionais mais seguras e confiantes nas mechas
                </span>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                <MessageCircle size={18} />
              </a>
            </div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.76rem" }}>
              © {new Date().getFullYear()} Solange Jesus Academy. Todos os
              direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        aria-label="Falar pelo WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path
            d="M12 0C5.373 0 0 5.373 0 12c0 2.025.507 3.934 1.399 5.61L0 24l6.61-1.347A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.663-.527-5.168-1.439l-.371-.218-3.843.783.816-3.738-.24-.387C2.016 15.368 1.5 13.738 1.5 12 1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12 17.799 22.5 12 22.5z"
            fillRule="evenodd"
          />
        </svg>
      </a>
    </main>
  );
}
