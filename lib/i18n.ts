export const locales = ["fr", "en"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const defaultLocale: Locale = "fr";

export type Dictionary = {
  nav: {
    live: string;
    about: string;
    ministries: string;
    resources: string;
    contact: string;
    donate: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  events: {
    title: string;
    mainTitle: string;
    mainDescription: string;
    sunday: string;
    welcome: string;
    speaker: string;
    study: string;
    youth: string;
  };
  ministries: {
    title: string;
  };
  program: {
    title: string;
    items: string[];
  };
  identity: {
    visionTitle: string;
    visionText: string;
    missionTitle: string;
    missionText: string;
    valuesTitle: string;
    values: string[];
  };
  giving: {
    title: string;
    subtitle: string;
    cardTitle: string;
    cardDescription: string;
    mobileTitle: string;
    mobileDescription: string;
    cta: string;
  };
  footer: {
    quickLinks: string;
    findUs: string;
    churchTagline: string;
    mapText: string;
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    message: string;
    submit: string;
    success: string;
    error: string;
  };
  donationPage: {
    badge: string;
    title: string;
    subtitle: string;
    cardTitle: string;
    cardDescription: string;
    mobileTitle: string;
    mobileDescription: string;
    back: string;
  };
};

export const dictionary: Record<Locale, Dictionary> = {
  fr: {
    nav: {
      live: "Direct",
      about: "À Propos",
      ministries: "Ministères",
      resources: "Ressources",
      contact: "Contact",
      donate: "Faire un Don",
    },
    hero: {
      badge: "Église Canaan - Culte en direct",
      title: "Bienvenue à Canaan. Connectez-vous à votre Destinée.",
      subtitle: "Une communauté vibrante pour expérimenter la présence de Dieu.",
      primaryCta: "Nous Rejoindre ce Dimanche",
      secondaryCta: "Regarder le Dernier Culte",
    },
    events: {
      title: "Prochain Grand Rendez-vous",
      mainTitle: "Culte de Célébration",
      mainDescription: "Un moment puissant de louange, parole et communion.",
      sunday: "Dimanche 10h00",
      welcome: "Accueil dès 09h15",
      speaker: "Orateur: Pasteur invité",
      study: "Étude Biblique - Mercredi 19h00",
      youth: "Soirée Jeunesse - Vendredi 18h30",
    },
    ministries: {
      title: "Vivre la Communauté",
    },
    program: {
      title: "Programme d'activités",
      items: [
        "Mardi 19h : Classe d'équipement et de transformation des ouvriers",
        "Jeudi 19h : Culte d'enseignement et de prière",
        "Vendredi 22h à l'aube : Veillée de prière",
        "Dimanche 8h : Classe des leaders",
        "Dimanche 9h : Culte de louange et d'adoration",
      ],
    },
    identity: {
      visionTitle: "Notre Vision",
      visionText:
        "Un ministère qui bâtit et déploie dans les nations du monde des leaders qui manifestent la suprématie du royaume de Dieu, dans les sphères charismatique, économique et politique.",
      missionTitle: "Notre Mission",
      missionText:
        "Apporter le salut et la délivrance aux âmes, et faire des disciples, par la prédication de l'évangile du royaume, la démonstration de sa puissance et la promotion d'une musique gospel excellente.",
      valuesTitle: "Nos Valeurs Fondamentales",
      values: [
        "Manifester l'Amour comme Jésus",
        "Etre une personne de foi",
        "Etre continuellement conduit par le Saint-Esprit",
        "Avoir un coeur de serviteur",
      ],
    },
    giving: {
      title: "Soutenir la Vision",
      subtitle:
        "Votre générosité nous aide à impacter les vies, former des disciples et servir la ville.",
      cardTitle: "Cartes Bancaires",
      cardDescription: "Visa, MasterCard, paiement sécurisé en ligne.",
      mobileTitle: "Mobile Money",
      mobileDescription: "MTN Mobile Money et Moov Money.",
      cta: "Accéder à la page de don",
    },
    footer: {
      quickLinks: "Liens Rapides",
      findUs: "Nous trouver",
      churchTagline: "Église locale - Foi, Famille, Impact.",
      mapText: "123 Avenue de la Grâce, Cotonou (Google Maps simulé)",
    },
    contact: {
      title: "Nous Contacter",
      subtitle: "Une question, un besoin de prière, ou envie de nous rejoindre ?",
      name: "Nom complet",
      email: "Email",
      message: "Message",
      submit: "Envoyer le message",
      success: "Message envoyé avec succès.",
      error: "Une erreur est survenue. Réessayez.",
    },
    donationPage: {
      badge: "Dons & Libéralités",
      title: "Soutenir la Vision",
      subtitle:
        "Chaque don contribue à l'avancement de l'Evangile, au soutien des familles et aux actions sociales de Canaan.",
      cardTitle: "Paiement par Carte",
      cardDescription: "Visa, MasterCard et cartes internationales.",
      mobileTitle: "Mobile Money Local",
      mobileDescription: "Compatible avec MTN Mobile Money et Moov Money.",
      back: "Retour à l'accueil",
    },
  },
  en: {
    nav: {
      live: "Live",
      about: "About",
      ministries: "Ministries",
      resources: "Resources",
      contact: "Contact",
      donate: "Give",
    },
    hero: {
      badge: "Canaan Church - Live worship",
      title: "Welcome to Canaan. Connect with your destiny.",
      subtitle: "A vibrant community to experience God's presence.",
      primaryCta: "Join Us This Sunday",
      secondaryCta: "Watch Latest Service",
    },
    events: {
      title: "Next Major Gathering",
      mainTitle: "Celebration Service",
      mainDescription: "A powerful time of worship, word, and fellowship.",
      sunday: "Sunday 10:00 AM",
      welcome: "Welcome starts at 09:15 AM",
      speaker: "Speaker: Guest Pastor",
      study: "Bible Study - Wednesday 07:00 PM",
      youth: "Youth Night - Friday 06:30 PM",
    },
    ministries: {
      title: "Live in Community",
    },
    program: {
      title: "Activities Schedule",
      items: [
        "Tuesday 7:00 PM: Workers equipment and transformation class",
        "Thursday 7:00 PM: Teaching and prayer service",
        "Friday 10:00 PM to dawn: Prayer vigil",
        "Sunday 8:00 AM: Leaders class",
        "Sunday 9:00 AM: Praise and worship service",
      ],
    },
    identity: {
      visionTitle: "Our Vision",
      visionText:
        "A ministry that builds and deploys, across the nations of the world, leaders who manifest the supremacy of God's kingdom in charismatic, economic, and political spheres.",
      missionTitle: "Our Mission",
      missionText:
        "Bring salvation and deliverance to souls, and make disciples through the preaching of the Gospel of the Kingdom, the demonstration of its power, and the promotion of excellent gospel music.",
      valuesTitle: "Our Core Values",
      values: [
        "Manifest Love like Jesus",
        "Be a person of faith",
        "Be continually led by the Holy Spirit",
        "Have a servant's heart",
      ],
    },
    giving: {
      title: "Support the Vision",
      subtitle:
        "Your generosity helps us impact lives, equip disciples, and serve our city.",
      cardTitle: "Bank Cards",
      cardDescription: "Visa, MasterCard, secure online payments.",
      mobileTitle: "Mobile Money",
      mobileDescription: "MTN Mobile Money and Moov Money.",
      cta: "Go to donation page",
    },
    footer: {
      quickLinks: "Quick Links",
      findUs: "Find us",
      churchTagline: "Local church - Faith, Family, Impact.",
      mapText: "123 Grace Avenue, Cotonou (Google Maps simulated)",
    },
    contact: {
      title: "Contact Us",
      subtitle: "A question, prayer request, or want to join us?",
      name: "Full name",
      email: "Email",
      message: "Message",
      submit: "Send message",
      success: "Message sent successfully.",
      error: "Something went wrong. Please retry.",
    },
    donationPage: {
      badge: "Giving & Generosity",
      title: "Support the Vision",
      subtitle:
        "Every gift helps advance the Gospel, support families, and fuel social outreach.",
      cardTitle: "Card Payment",
      cardDescription: "Visa, MasterCard and international cards.",
      mobileTitle: "Local Mobile Money",
      mobileDescription: "Works with MTN Mobile Money and Moov Money.",
      back: "Back to home",
    },
  },
};
