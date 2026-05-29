import React from "react";

/**
 * MapsSection – affiche la carte interactive de la localisation du CIRC Canaan.
 * Adresse : Auditorium CIRC derrière la Maternité Agblangandan, Bénin.
 */
export default function MapsSection() {
  // Lien d'intégration exact de l'Église CANAAN à Agblangandan, Bénin
  const embedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.0886105370216!2d2.4929259835773177!3d6.376454199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103caaf4756a6915%3A0x8c7a5592330b3d32!2s%C3%89glise%20CANAAN!5e0!3m2!1sfr!2sbj!5m2!1sfr!2sbj";

  return (
    <section className="mt-16 rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <span className="block h-0.5 w-8 bg-amber-400 rounded-full" />
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
          Localisation
        </span>
      </div>
      <h2 className="mb-6 text-2xl font-extrabold text-slate-900">
        Nous trouver – Auditorium CIRC
      </h2>
      <p className="mb-6 text-slate-500 text-sm">
        📍 Derrière la Maternité Agblangandan &nbsp;·&nbsp;
        📞 (+229) 0166734734 / 0167522228
      </p>
      <div className="relative w-full overflow-hidden rounded-2xl shadow-lg" style={{ paddingTop: "56.25%" }}>
        <iframe
          src={embedUrl}
          title="Localisation CIRC Canaan"
          className="absolute inset-0 h-full w-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}

