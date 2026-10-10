import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/landing/footer";
import { Reveal } from "@/hooks/use-scroll-reveal";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — DescomplicaVetMT" },
      {
        name: "description",
        content:
          "Como a DescomplicaVetMT coleta, usa e protege seus dados pessoais em conformidade com a LGPD.",
      },
      { name: "robots", content: "index, follow" },
      {
        property: "og:title",
        content: "Política de Privacidade — DescomplicaVetMT",
      },
      {
        property: "og:description",
        content:
          "Como a DescomplicaVetMT coleta, usa e protege seus dados pessoais em conformidade com a LGPD.",
      },
      { property: "og:type", content: "article" },
      {
        property: "og:url",
        content: "https://descomplicavetmt.com.br/politica-de-privacidade",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://descomplicavetmt.com.br/politica-de-privacidade",
      },
    ],
  }),
  component: PrivacyPage,
});

const COMMITMENTS = [
  "Não se envolver em atividades que sejam ilegais ou contrárias à boa fé à ordem pública;",
  "Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, jogos de sorte ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;",
  "Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do DescomplicaVetMT, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.",
];

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16 pb-24 lg:pt-20">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70 transition-colors hover:text-primary-deep"
          >
            <ArrowLeft size={16} />
            Voltar ao início
          </Link>

          <Reveal className="mt-8">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] text-sage uppercase">
              <span className="h-px w-6 bg-sage/50" aria-hidden="true" />
              Privacidade
            </span>
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-primary-deep sm:text-4xl">
              Política de Privacidade
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">Última atualização: 14/08/2026</p>
          </Reveal>

          <Reveal className="mt-10">
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                A sua privacidade é importante para nós. É política do DescomplicaVetMT respeitar a
                sua privacidade em relação a qualquer informação sua que possamos coletar no site{" "}
                <a
                  href="https://descomplicavetmt.com.br"
                  className="font-medium text-primary-deep underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
                >
                  DescomplicaVetMT
                </a>
                , e outros sites que possuímos e operamos.
              </p>
              <p>
                Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe
                fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e
                consentimento. Também informamos por que estamos coletando e como será usado.
              </p>
              <p>
                Apenas retemos as informações coletadas pelo tempo necessário para fornecer o
                serviço solicitado. Quando armazenamos dados, protegemos dentro de meios
                comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação,
                cópia, uso ou modificação não autorizados.
              </p>
              <p>
                Não compartilhamos informações de identificação pessoal publicamente ou com
                terceiros, exceto quando exigido por lei.
              </p>
              <p>
                O nosso site pode ter links para sites externos que não são operados por nós. Esteja
                ciente de que não temos controle sobre o conteúdo e práticas desses sites e não
                podemos aceitar responsabilidade por suas respectivas{" "}
                <a
                  href="https://politicaprivacidade.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary-deep underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
                >
                  políticas de privacidade
                </a>
                .
              </p>
              <p>
                Você é livre para recusar a nossa solicitação de informações pessoais, entendendo
                que talvez não possamos fornecer alguns dos serviços desejados.
              </p>
              <p>
                O uso continuado de nosso site será considerado como aceitação de nossas práticas em
                torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como
                lidamos com dados do usuário e informações pessoais, entre em contacto connosco.
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-12">
            <section id="compromisso" aria-labelledby="compromisso-title">
              <h2
                id="compromisso-title"
                className="text-xl font-semibold text-primary-deep sm:text-2xl"
              >
                Compromisso do Usuário
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o
                DescomplicaVetMT oferece no site e com caráter enunciativo, mas não limitativo:
              </p>
              <ul className="mt-4 space-y-3">
                {COMMITMENTS.map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-base leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary-deep">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal className="mt-12">
            <section id="mais-informacoes" aria-labelledby="mais-informacoes-title">
              <h2
                id="mais-informacoes-title"
                className="text-xl font-semibold text-primary-deep sm:text-2xl"
              >
                Mais informações
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo
                  que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os
                  cookies ativados, caso interaja com um dos recursos que você usa em nosso site.
                </p>
                <p>Esta política é efetiva a partir de 14 de agosto de 2026.</p>
              </div>
            </section>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
