import { Reveal } from "@/hooks/use-scroll-reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
  align?: "left" | "center";
  tone?: "default" | "inverted";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  align = "center",
  tone = "default",
}: SectionHeadingProps) {
  const inverted = tone === "inverted";
  return (
    <Reveal className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}>
      <span
        className={`inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] uppercase ${
          inverted ? "text-secondary" : "text-sage"
        }`}
      >
        <span
          className={`h-px w-6 ${inverted ? "bg-secondary/60" : "bg-sage/50"}`}
          aria-hidden="true"
        />
        {eyebrow}
      </span>
      <h2
        id={id}
        className={`mt-4 text-3xl leading-tight font-semibold text-balance sm:text-4xl lg:text-[2.75rem] ${
          inverted ? "text-primary-foreground" : "text-primary-deep"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 text-base leading-relaxed ${
            inverted ? "text-primary-foreground/75" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
