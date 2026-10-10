import type { LucideIcon } from "lucide-react";
import { ClipboardCheck, FileSearch, Landmark, ScrollText, Stethoscope, Users } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-reveal";
import { SectionHeading } from "./section-heading";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

const SERVICES: Service[] = [
  {
    icon: ClipboardCheck,
    title: "Assessoria Técnica e Regulatória",
    description:
      "Auxiliamos profissionais e empresas veterinárias na adequação às normas dos órgãos fiscalizadores, oferecendo suporte técnico para manter a conformidade e reduzir riscos operacionais.\n\n\n",
  },
  {
    icon: FileSearch,
    title: "Está abrindo uma clínica veterinária?",
    description:
      "Auxiliamos no planejamento técnico, análise de projetos e organização documental para que seu estabelecimento inicie as atividades em conformidade.",
  },
  {
    icon: Landmark,
    title: "Precisa organizar a documentação obrigatória?",
    description:
      "Elaboramos e revisamos documentos essenciais para atender às exigências dos órgãos reguladores.",
  },
  {
    icon: Stethoscope,
    title: "Busca capacitar sua equipe?",
    description:
      "Capacitamos médicos veterinários e equipes por meio de treinamentos, palestras e encontros técnicos voltados à atualização profissional e ao aprimoramento dos serviços prestados.",
  },
  {
    icon: ScrollText,
    title: "Conteúdo Técnico",
    description:
      "Produzimos materiais educativos que auxiliam profissionais e empresas a compreender e aplicar as principais exigências técnicas e regulatórias do setor.",
  },
  {
    icon: Users,
    title: "Marketing com Responsabilidade Técnica",
    description:
      "Realizamos a análise e aprovação técnica de materiais de divulgação para garantir conformidade com as normas éticas e regulamentares da Medicina Veterinária.",
  },
];

function ServiceCard({ icon: Icon, title, description, index }: Service & { index: number }) {
  return (
    <Reveal
      as="li"
      delay={index * 70}
      className="group h-full rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-lift"
    >
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-muted text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon size={22} />
      </span>
      <h3 className="mt-6 font-display text-lg font-semibold text-primary-deep">{title}</h3>
      <p className="mt-3 text-sm whitespace-pre-line leading-relaxed text-muted-foreground">
        {description}
      </p>
      <span className="mt-6 inline-block h-px w-10 bg-secondary transition-all duration-300 group-hover:w-16" />
    </Reveal>
  );
}

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading
          id="servicos-title"
          eyebrow="Serviços"
          title="Soluções Especializadas para o Setor Veterinário"
          description="Oferecemos consultoria e assessoria técnica para médicos veterinários, clínicas, hospitais e empresas do setor, promovendo conformidade regulatória, organização de processos e segurança na gestão."
        />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} {...service} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
