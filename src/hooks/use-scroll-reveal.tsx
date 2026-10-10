import { useEffect, useRef, useState } from "react";

/**
 * Reveals an element with a fade/slide-up once it enters the viewport.
 * Returns a ref to attach and the className to apply.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(delayMs = 0) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return {
    ref,
    className: visible ? "reveal reveal-visible" : "reveal",
    style: { transitionDelay: `${delayMs}ms` },
  };
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const reveal = useScrollReveal<HTMLDivElement>(delay);
  return (
    <Tag
      ref={reveal.ref as never}
      style={reveal.style}
      className={`${reveal.className} ${className}`}
    >
      {children}
    </Tag>
  );
}
