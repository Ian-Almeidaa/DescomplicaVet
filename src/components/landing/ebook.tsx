import { BookOpen } from "lucide-react";
import { siteAssets } from "@/lib/site-assets";
import { Reveal } from "@/hooks/use-scroll-reveal";

export function Ebook() {
  return (
    <section id="ebook" aria-labelledby="ebook-title" className="py-8 lg:py-12">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="overflow-hidden rounded-[2.5rem] bg-primary shadow-lift">
          <div className="grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[1fr_0.8fr] lg:p-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-secondary uppercase">
                <BookOpen size={14} /> E-book
              </span>
              <h2
                id="ebook-title"
                className="mt-5 font-display text-3xl leading-tight font-semibold text-balance text-primary-foreground sm:text-4xl"
              >
                Descomplicando a clínica veterinária&nbsp;
              </h2>
              <p className="mt-4 max-w-lg leading-relaxed text-primary-foreground/75">
                O que é obrigatoriedade na clínica veterinária setor para setor
              </p>

              <div className="mt-8">
                <a
                  href="https://pay.kiwify.com.br/f76tPy9?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAb21jcATXP7hleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAadlCh2BirQd9Cv9qUCEMe3xvjBhTiWJ7HJRpXV8r4sNCp7E97LcuolehmlDPw_aem_lJik7YaiTYeXqSRNQT0ASQ&utm_id=97760_v0_s00_e0_tv3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-8 py-4 text-sm font-semibold text-primary-deep transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105"
                >
                  Compre o seu E-BOOK
                </a>
              </div>
              <p className="mt-3 text-xs text-primary-foreground/55">{"\n"}</p>
            </div>

            <div className="mx-auto w-full max-w-xs">
              <img
                src={siteAssets.ebook}
                alt="Capa do e-book Descomplicando a Clínica Veterinária"
                width={1024}
                height={1536}
                loading="lazy"
                className="w-full rounded-2xl shadow-lift transition-transform duration-500 hover:-translate-y-2"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
