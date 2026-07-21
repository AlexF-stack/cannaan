import { Star } from "lucide-react";

type QuoteStripProps = {
  quote: string;
  attribution?: string;
};

export function QuoteStrip({ quote, attribution }: QuoteStripProps) {
  return (
    <section className="quote-strip page-section">
      <div className="page-container relative z-10 px-0 text-center">
        <Star className="mx-auto mb-6 h-8 w-8 text-circ-gold" aria-hidden="true" />
        <blockquote className="font-heading mx-auto max-w-4xl text-2xl font-bold leading-snug text-white sm:text-3xl lg:text-4xl">
          &ldquo;{quote}&rdquo;
        </blockquote>
        {attribution ? (
          <>
            <div className="mx-auto my-8 h-px w-24 bg-white/15" />
            <p className="mx-auto max-w-2xl text-base font-medium italic text-blue-100/90 sm:text-lg">
              {attribution}
            </p>
          </>
        ) : null}
      </div>
    </section>
  );
}
