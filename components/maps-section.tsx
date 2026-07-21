import type { Locale } from "@/lib/i18n";
import { getPageCopy } from "@/lib/i18n-pages";

export default function MapsSection({ locale }: { locale: Locale }) {
  const t = getPageCopy(locale).maps;
  const embedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.0886105370216!2d2.4929259835773177!3d6.376454199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103caaf4756a6915%3A0x8c7a5592330b3d32!2s%C3%89glise%20CANAAN!5e0!3m2!1sfr!2sbj!5m2!1sfr!2sbj";

  return (
    <section className="mt-16 rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <span className="block h-0.5 w-8 rounded-full bg-amber-400" />
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600">{t.label}</span>
      </div>
      <h2 className="mb-6 text-2xl font-extrabold text-slate-900">{t.title}</h2>
      <p className="mb-6 text-sm text-slate-500">{t.phones}</p>
      <div className="relative w-full overflow-hidden rounded-2xl shadow-lg" style={{ paddingTop: "56.25%" }}>
        <iframe
          src={embedUrl}
          title={t.iframeTitle}
          className="absolute inset-0 h-full w-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
