import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { About } from "@/components/landing/about";
import { Services } from "@/components/landing/services";
import { Results } from "@/components/landing/results";
import { Ebook } from "@/components/landing/ebook";
import { Contact } from "@/components/landing/contact";
import { Footer } from "@/components/landing/footer";
import { siteAssets } from "@/lib/site-assets";

const SITE_URL = "https://descomplicavetmt.com.br";
const TITLE = "DescomplicaVetMT — Consultoria para Clínicas Veterinárias";
const DESCRIPTION =
  "Consultoria e assessoria técnica para clínicas, consultórios e hospitais veterinários: conformidade com CRMV e Vigilância Sanitária, documentação e gestão.";
const HERO_IMAGE_URL = `${SITE_URL}${siteAssets.hero}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: HERO_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: HERO_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "DescomplicaVetMT",
          description: DESCRIPTION,
          url: SITE_URL,
          image: HERO_IMAGE_URL,
          telephone: "+55 65 99966-7481",
          email: "descomplicavetmt@gmail.com",
          sameAs: ["https://www.instagram.com/descomplicavetmt/"],
          founder: {
            "@type": "Person",
            name: "Cristiane Campos",
            jobTitle: "Médica Veterinária — CRMV-MT 2165",
          },
          areaServed: {
            "@type": "State",
            name: "Mato Grosso",
            containedInPlace: { "@type": "Country", name: "Brasil" },
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Consultoria e Assessoria Técnica para Clínicas e Hospitais Veterinários",
          serviceType: "Consultoria regulatória veterinária",
          provider: { "@type": "ProfessionalService", name: "DescomplicaVetMT", url: SITE_URL },
          areaServed: { "@type": "Country", name: "Brasil" },
          description:
            "Assessoria técnica e regulatória, organização documental, responsabilidade técnica, treinamentos e adequação às normas do CRMV e da Vigilância Sanitária para clínicas, consultórios e hospitais veterinários.",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Results />
        <Ebook />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
