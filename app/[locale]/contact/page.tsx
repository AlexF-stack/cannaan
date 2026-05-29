import { notFound } from "next/navigation";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";
import { dictionary, isLocale } from "@/lib/i18n";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = dictionary[locale];

  const infos = [
    { icon: MapPin,  label: "Adresse",   value: dict.footer.mapText, color: "bg-blue-100 text-blue-600" },
    { icon: Clock,   label: "Culte",     value: dict.events.sunday,  color: "bg-amber-100 text-amber-600" },
    { icon: Mail,    label: "Email",     value: "contact@canaan.church", color: "bg-emerald-100 text-emerald-600" },
    { icon: Phone,   label: "Téléphone", value: "+229 01 66 73 47 34 / +229 01 67 52 22 28",  color: "bg-rose-100 text-rose-600" },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="fixed inset-x-0 top-0 z-50">
        <NavBar locale={locale} dict={dict} />
      </div>

      <PageHeader
        title={dict.contact.title}
        subtitle={dict.contact.subtitle}
        image="/images/peuple.jpg"
        badge="Contact"
      />

      <div className="px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-5 gap-12">

          {/* Info side */}
          <div className="lg:col-span-2 space-y-5">
            <h2 className="font-[var(--font-heading)] text-2xl font-bold text-slate-900 mb-6">
              Nous sommes là pour vous
            </h2>
            {infos.map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="flex items-start gap-4 rounded-2xl bg-slate-50 border border-slate-100 p-5 hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                <div className={`h-10 w-10 shrink-0 rounded-xl ${color} flex items-center justify-center`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-slate-700">{value}</p>
                </div>
              </div>
            ))}

            {/* Quick hours */}
            <div className="rounded-2xl bg-blue-600 p-6 text-white mt-4">
              <h3 className="font-[var(--font-heading)] font-bold text-lg mb-3">Horaires des cultes</h3>
              <div className="space-y-2 text-sm text-blue-100">
                <div className="flex justify-between"><span>Dimanche</span><span className="font-semibold text-white">09h00 – 12h00</span></div>
                <div className="h-px bg-white/10" />
                <div className="flex justify-between"><span>Mercredi</span><span className="font-semibold text-white">19h00</span></div>
                <div className="h-px bg-white/10" />
                <div className="flex justify-between"><span>Vendredi</span><span className="font-semibold text-white">18h30</span></div>
              </div>
            </div>
          </div>

          {/* Form side */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl sm:p-10">
              <h2 className="font-[var(--font-heading)] text-2xl font-bold text-slate-900 mb-2">Envoyez-nous un message</h2>
              <p className="text-sm text-slate-500 mb-8">{dict.contact.subtitle}</p>
              <ContactForm dict={dict} />
            </div>
          </div>

        </div>
      </div>

      <Footer locale={locale} dict={dict} />
    </main>
  );
}
