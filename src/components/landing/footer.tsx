import { Instagram, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { NAV_LINKS } from "./nav-links";
import { siteAssets } from "@/lib/site-assets";

export function Footer() {
  return (
    <footer className="bg-primary-deep text-primary-foreground">
      <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={siteAssets.logo}
                alt="DescomplicaVet"
                width={64}
                height={64}
                className="h-16 w-16 shrink-0 object-contain"
              />
              <span className="font-display text-lg font-semibold">DescomplicaVetMT</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-primary-foreground/65">
              {"\n"}
            </p>
            <div className="mt-6 flex gap-3">
              {[
                {
                  Icon: Instagram,
                  href: "https://www.instagram.com/descomplicavetmt/",
                  label: "Instagram",
                },
                { Icon: MessageCircle, href: "https://wa.link/910txs", label: "WhatsApp" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-primary-foreground/15 transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary hover:text-secondary"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Navegação do rodapé">
            <h2 className="text-xs font-semibold tracking-[0.18em] text-secondary uppercase">
              Navegação
            </h2>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-secondary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold tracking-[0.18em] text-secondary uppercase">
              Contato
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-primary-foreground/70">
              <li>
                <a
                  href="https://wa.link/910txs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-secondary"
                >
                  (65) 99966-7481
                </a>
              </li>
              <li>descomplicavetmt@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-primary-foreground/12 pt-7 text-xs text-primary-foreground/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} DescomplicaVetMT. Todos os direitos reservados.</p>
          <Link to="/politica-de-privacidade" className="transition-colors hover:text-secondary">
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
