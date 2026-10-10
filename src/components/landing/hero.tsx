import { ShieldCheck } from "lucide-react";
import { siteAssets } from "@/lib/site-assets";
import { Reveal } from "@/hooks/use-scroll-reveal";

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-32 h-[32rem] w-[32rem] rounded-full bg-sage/20 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-1.5 text-xs font-semibold tracking-[0.16em] text-sage uppercase">
            <ShieldCheck size={14} /> SEGURANÇA
          </span>
          <h1
            id="hero-title"
            className="mt-6 text-4xl leading-[1.08] font-semibold text-balance text-primary-deep sm:text-5xl lg:text-6xl"
          >
            Consultoria e Assessoria Técnica Especializada para Clínicas e Hospitais Veterinários
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Auxiliamos clínicas, consultórios e hospitais veterinários na conformidade com CRMV e
            Vigilância Sanitária, organização documental, responsabilidade técnica e melhoria dos
            processos internos.
          </p>
          <div className="mt-9 flex justify-center sm:justify-start">
            <a
              href="#servicos"
              className="inline-flex items-center justify-center rounded-full border border-primary/25 bg-surface/60 px-7 py-3.5 text-sm font-semibold text-primary-deep transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-surface"
            >
              Conhecer Serviços
            </a>
          </div>
        </Reveal>

        <Reveal delay={120} className="relative">
          <div className="relative mx-auto aspect-square w-full max-w-md rounded-full border border-border/70 bg-surface/60 p-2 shadow-lift ring-1 ring-primary/10">
            <div className="h-full w-full overflow-hidden rounded-full border border-primary/15 bg-surface shadow-soft">
              <img
                src={siteAssets.hero}
                alt="Profissional veterinária responsável pela DescomplicaVet"
                width={1254}
                height={1254}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="relative mx-auto mt-6 max-w-[15rem] rounded-2xl border border-border bg-surface/95 p-5 text-center shadow-soft backdrop-blur sm:absolute sm:-bottom-6 sm:-left-4 sm:mt-0 sm:text-left">
            <p className="font-display text-sm font-semibold text-primary-deep">Cristiane Campos</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Med. Veterinária - CRMV-MT 2165
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
