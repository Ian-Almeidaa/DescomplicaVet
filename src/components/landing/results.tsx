import { Quote } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-reveal";
import { SectionHeading } from "./section-heading";

// Conteúdo neutro enquanto a seção está oculta — substituir por métricas e
// depoimentos reais quando a seção for reativada.
const STATS = [
  { value: "—", label: "Em breve" },
  { value: "—", label: "Em breve" },
  { value: "—", label: "Em breve" },
  { value: "—", label: "Em breve" },
];

const TESTIMONIALS = [
  {
    name: "DescomplicaVetMT",
    role: "Clínicas · Hospitais",
    text: "Esta seção reunirá números e experiências de clientes atendidos pela DescomplicaVetMT.",
  },
  {
    name: "DescomplicaVetMT",
    role: "Consultórios · Equipes",
    text: "Esta seção reunirá números e experiências de clientes atendidos pela DescomplicaVetMT.",
  },
  {
    name: "DescomplicaVetMT",
    role: "Profissionais da saúde animal",
    text: "Esta seção reunirá números e experiências de clientes atendidos pela DescomplicaVetMT.",
  },
];

export function Results() {
  return (
    // Seção temporariamente oculta — remover a classe "hidden" para reativar
    <section id="resultados" aria-labelledby="resultados-title" className="hidden py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading
          id="resultados-title"
          eyebrow="Resultados"
          title="Resultados e Reconhecimento"
          description="Números e experiências de quem confia na assessoria técnica da DescomplicaVetMT."
        />

        <Reveal className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label + stat.value} className="bg-card px-6 py-9 text-center">
              <p className="font-display text-3xl font-semibold text-primary lg:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs tracking-[0.14em] text-muted-foreground uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </Reveal>

        <ul className="mt-8 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((item, i) => (
            <Reveal
              as="li"
              key={i}
              delay={i * 90}
              className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <Quote size={22} className="text-secondary" />
              <p className="mt-5 text-sm leading-relaxed text-foreground/85">{item.text}</p>
              <div className="mt-7 flex items-center gap-3 border-t border-border pt-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-muted font-display text-sm font-semibold text-primary">
                  NP
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-primary-deep">{item.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{item.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
