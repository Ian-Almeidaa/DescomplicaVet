import { CheckCircle2 } from "lucide-react";
import { siteAssets } from "@/lib/site-assets";
import { Reveal } from "@/hooks/use-scroll-reveal";

const HIGHLIGHTS = [
  "Segurança e conformidade",
  "Atendimento personalizado",
  "Especialização Técnica",
];

export function About() {
  return (
    <section id="quem-somos" aria-labelledby="quem-somos-title" className="py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <Reveal className="relative order-2 lg:order-1">
          <div className="mx-auto w-full max-w-md overflow-hidden rounded-full shadow-soft">
            <img
              src={siteAssets.about}
              alt="Logo DescomplicaVet"
              width={1000}
              height={1000}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionCopy />
        </div>
      </div>
    </section>
  );
}

function SectionCopy() {
  return (
    <Reveal delay={100}>
      <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] text-sage uppercase">
        <span className="h-px w-6 bg-sage/50" aria-hidden="true" />
        Quem Somos
      </span>
      <h2
        id="quem-somos-title"
        className="mt-4 text-3xl leading-tight font-semibold text-balance text-primary-deep sm:text-4xl"
      >
        Conectando conhecimento técnico, conformidade e excelência na medicina veterinária.
      </h2>
      <p className="mt-5 whitespace-pre-line leading-relaxed text-muted-foreground">
        A DescomplicaVetMT nasceu de um propósito claro: devolver a tranquilidade aos
        médicos-veterinários e gestores do setor.{"\n\n"}
        Ao longo de mais de uma década acompanhando fiscalizações e analisando processos, percebi
        algo fundamental: a grande maioria das irregularidades não acontece por má-fé, mas por
        ausência de suporte ao acesso a uma informação clara e a uma gestão técnica eficiente.
        {"\n\n"}É exatamente para transformar esse cenário que existimos. Descomplicamos as
        exigências regulatórias e a gestão do seu negócio para que você deixe a burocracia conosco e
        foque no que realmente importa: cuidar da saúde animal com total segurança, exercendo sua
        vocação com leveza e proteção.
      </p>
      <ul className="mt-8 space-y-3">
        {HIGHLIGHTS.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-foreground/85">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-sage" />
            {item}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
