import Link from "next/link";
import { CreditCard, Landmark, ShieldCheck, ArrowLeft, Heart } from "lucide-react";
import { notFound } from "next/navigation";

import { NavBar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import { dictionary, isLocale } from "@/lib/i18n";

export default async function DonationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = dictionary[locale];

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="fixed inset-x-0 top-0 z-50">
        <NavBar locale={locale} dict={dict} />
      </div>

      <PageHeader
        title={dict.donationPage.title}
        subtitle={dict.donationPage.subtitle}
        image="/images/adoration1.jpg"
        badge={dict.donationPage.badge}
      />

      <div className="px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-5xl">

          {/* Impact stats */}
          <div className="grid grid-cols-3 gap-6 mb-16">
            {[
              { n: "500+", label: "Familles aidées" },
              { n: "10+", label: "Projets sociaux" },
              { n: "5", label: "Villes impactées" },
            ].map(({ n, label }) => (
              <div key={label} className="rounded-2xl bg-blue-50 border border-blue-100 p-6 text-center">
                <div className="font-[var(--font-heading)] text-3xl font-extrabold text-blue-600">{n}</div>
                <div className="text-sm text-slate-600 mt-1">{label}</div>
              </div>
            ))}
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="mb-5 h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-[var(--font-heading)] text-xl font-bold text-slate-900 mb-1">{dict.donationPage.cardTitle}</h3>
              <p className="text-slate-500 text-sm mb-6">{dict.donationPage.cardDescription}</p>
              <div className="space-y-3">
                <input placeholder="Numéro de carte" className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" />
                <div className="flex gap-3">
                  <input placeholder="MM / AA" className="h-12 w-1/2 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" />
                  <input placeholder="CVC" className="h-12 w-1/2 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" />
                </div>
                {/* Amount presets */}
                <div className="flex gap-2 flex-wrap pt-1">
                  {["10€", "25€", "50€", "100€"].map((a) => (
                    <button key={a} className="rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold text-blue-700 hover:bg-blue-600 hover:text-white transition-colors">{a}</button>
                  ))}
                </div>
                <button className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white hover:bg-blue-700 transition-all hover:scale-[1.02] shadow-md mt-2 flex items-center justify-center gap-2">
                  <Heart className="h-4 w-4" /> {dict.nav.donate}
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="mb-5 h-12 w-12 rounded-2xl bg-amber-100 flex items-center justify-center">
                <Landmark className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="font-[var(--font-heading)] text-xl font-bold text-slate-900 mb-1">{dict.donationPage.mobileTitle}</h3>
              <p className="text-slate-500 text-sm mb-6">{dict.donationPage.mobileDescription}</p>

              {/* Mobile money steps */}
              <div className="space-y-3">
                {[
                  "Composez *144# sur votre téléphone",
                  "Sélectionnez \"Paiement marchand\"",
                  "Entrez le code Canaan : 12345",
                  "Confirmez avec votre code PIN",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-amber-100 flex items-center justify-center text-xs font-bold text-amber-700">{i + 1}</span>
                    <p className="text-sm text-slate-600">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Security badge */}
          <div className="flex items-center justify-center gap-3 rounded-2xl bg-emerald-50 border border-emerald-100 px-6 py-4 text-sm font-medium text-emerald-700 max-w-sm mx-auto mb-12">
            <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
            Paiement 100% sécurisé et chiffré
          </div>

          <div className="text-center">
            <Link href={`/${locale}`} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
              <ArrowLeft className="h-4 w-4" /> {dict.donationPage.back}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
