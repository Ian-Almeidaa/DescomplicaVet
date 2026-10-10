import { Instagram, Mail, MessageCircle } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-reveal";
import { SectionHeading } from "./section-heading";

const CHANNELS = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "(65) 99966-7481",
    href: "https://wa.link/910txs",
  },
  { icon: Mail, label: "E-mail", value: "descomplicavetmt@gmail.com" },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@descomplicavetmt",
    href: "https://www.instagram.com/descomplicavetmt/",
  },
];

export function Contact() {
  return (
    <section id="contato" aria-labelledby="contato-title" className="bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading
          id="contato-title"
          eyebrow="Contato"
          title="Sua empresa precisa de assessoria técnica especializada?"
          description="Estamos prontos para orientar você em todas as etapas, desde a regularização documental até a implantação de processos e treinamentos para sua equipe"
        />

        <div className="mt-14 flex justify-center">
          <Reveal className="w-full max-w-xl rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h3 className="font-display text-lg font-semibold text-primary-deep">Canais diretos</h3>
            <ul className="mt-6 space-y-5">
              {CHANNELS.map(
                ({
                  icon: Icon,
                  label,
                  value,
                  href,
                }: (typeof CHANNELS)[number] & { href?: string }) => (
                  <li key={label} className="flex items-start gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-muted text-primary">
                      <Icon size={18} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block truncate text-sm font-medium text-foreground/90 transition-colors hover:text-primary"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="truncate text-sm font-medium text-foreground/90">{value}</p>
                      )}
                    </div>
                  </li>
                ),
              )}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
