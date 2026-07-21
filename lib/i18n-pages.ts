import type { Locale } from "@/lib/i18n";

export type PageCopy = {
  brand: { line1: string; line2: string };
  common: {
    discover: string;
    back: string;
    learnMore: string;
    contactUs: string;
    loading: string;
    skipToContent: string;
    secure: string;
    downloadAudio: string;
    edit: string;
    summary: string;
    nowPlaying: string;
    liveNow: string;
    selected: string;
    recentTeachings: string;
  };
  loader: { skip: string; tagline: string };
  whatsapp: {
    title: string;
    subtitle: string;
    secretariat1: string;
    secretariat2: string;
    defaultMessage: string;
    openMenu: string;
    closeMenu: string;
  };
  maps: {
    label: string;
    title: string;
    phones: string;
    iframeTitle: string;
  };
  errors: {
    notFoundTitle: string;
    notFoundDesc: string;
    notFoundCta: string;
    errorTitle: string;
    errorDesc: string;
    errorCta: string;
  };
  eventsPage: {
    headerTitle: string;
    headerSubtitle: string;
    headerBadge: string;
    liveBadge: string;
    liveTitle: string;
    liveCta: string;
    agendaLabel: string;
    upcomingTitle: string;
    eventAlt: string;
    event1Month: string;
    event1Title: string;
    event1Desc: string;
    event1Location: string;
    event2Month: string;
    event2Title: string;
    event2Desc: string;
    event2Location: string;
  };
  ministriesPage: {
    badge: string;
    sectionLabel: string;
    sectionTitle: string;
    sectionSubtitle: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButton: string;
  };
  mediaPage: {
    headerTitle: string;
    headerSubtitle: string;
    headerBadge: string;
    audioSection: string;
    audioTitle: string;
    gallerySection: string;
    galleryTitle: string;
    galleryAlt: string;
  };
  teachingsPage: {
    headerTitle: string;
    headerSubtitle: string;
    headerBadge: string;
    filterAll: string;
    filterPreaching: string;
    filterTeaching: string;
    filterCombat: string;
  };
  aboutPage: {
    headerSubtitle: string;
    headerBadge: string;
    whoTitle: string;
    whoP1: string;
    visionariesTitle: string;
    yearsLabel: string;
    identityBadge: string;
    identityTitle: string;
  };
  prophetPage: {
    headerTitle: string;
    headerSubtitle: string;
    headerBadge: string;
    bioBadge: string;
    bioTitle: string;
    back: string;
    bioP1: string;
    bioP2: string;
    bioP3: string;
    bioP4: string;
  };
  homePage: {
    statsYears: string;
    statsMembers: string;
    statsCities: string;
    discover: string;
    identitySection: string;
    ministriesSection: string;
    mediaSection: string;
    sermonsSection: string;
    joinTitle: string;
    joinContact: string;
    sermonModalSummary: string;
    sermonModalPlayer: string;
    welcomeFamily: string;
    secureDesc: string;
  };
  contactPage: {
    address: string;
    service: string;
    phone: string;
    sideTitle: string;
    scheduleTitle: string;
    sunday: string;
    wednesday: string;
    friday: string;
    formTitle: string;
  };
  donPage: {
    familiesHelped: string;
    socialProjects: string;
    cardNumber: string;
    mobileStep1: string;
    mobileStep2: string;
    mobileStep3: string;
    mobileStep4: string;
    securePayment: string;
  };
};

export const pageCopy: Record<Locale, PageCopy> = {
  fr: {
    brand: {
      line1: "Centre International de Réveil",
      line2: "Cannaan",
    },
    common: {
      discover: "Découvrir",
      back: "Retour",
      learnMore: "En savoir plus",
      contactUs: "Nous Contacter",
      loading: "Chargement",
      skipToContent: "Aller au contenu",
      secure: "100% Sécurisé",
      downloadAudio: "Télécharger l'audio",
      edit: "Modifier",
      summary: "Résumé",
      nowPlaying: "LECTURE EN COURS...",
      liveNow: "En direct",
      selected: "SÉLECTIONNÉ",
      recentTeachings: "Enseignements récents",
    },
    loader: {
      skip: "Passer",
      tagline: "Centre International de Réveil",
    },
    whatsapp: {
      title: "Discuter avec nous",
      subtitle: "Nous répondons généralement en quelques minutes.",
      secretariat1: "Secrétariat 1",
      secretariat2: "Secrétariat 2",
      defaultMessage: "Bonjour Centre Cannaan, je souhaite avoir plus d'informations.",
      openMenu: "Ouvrir le menu WhatsApp",
      closeMenu: "Fermer le menu WhatsApp",
    },
    maps: {
      label: "Localisation",
      title: "Nous trouver – Auditorium CIRC",
      phones: "📍 Derrière la Maternité Agblangandan · 📞 (+229) 01 66 73 47 34 / 01 67 52 22 28",
      iframeTitle: "Localisation CIRC Cannaan",
    },
    errors: {
      notFoundTitle: "Page introuvable",
      notFoundDesc: "La page que vous cherchez n'existe pas ou a été déplacée.",
      notFoundCta: "Retour à l'accueil",
      errorTitle: "Une erreur est survenue",
      errorDesc: "Veuillez réessayer dans quelques instants.",
      errorCta: "Réessayer",
    },
    eventsPage: {
      headerTitle: "Direct & Événements",
      headerSubtitle: "Rejoignez nos cultes en direct et découvrez nos prochains événements pour grandir ensemble dans la foi.",
      headerBadge: "Notre Agenda",
      liveBadge: "Culte en Direct",
      liveTitle: "Suivez-nous en temps réel",
      liveCta: "Suivre le culte sur notre chaîne YouTube",
      agendaLabel: "Agenda",
      upcomingTitle: "Nos prochains événements",
      eventAlt: "Événement CIRC Cannaan",
      event1Month: "Août",
      event1Title: "Conférence de Restauration",
      event1Desc: "Rejoignez-nous pour un moment puissant de restauration spirituelle avec le Prophète Ithiel Dossou.",
      event1Location: "Siège Principal, CIRC",
      event2Month: "Sept",
      event2Title: "Formation des Leaders",
      event2Desc: "Un séminaire intensif pour tous les responsables et ceux appelés au ministère.",
      event2Location: "Auditorium CIRC, Agblangandan",
    },
    ministriesPage: {
      badge: "Communauté",
      sectionLabel: "Nos Ministères",
      sectionTitle: "Une place pour chacun",
      sectionSubtitle: "Quelle que soit votre saison de vie, il y a un ministère fait pour vous à Cannaan.",
      ctaTitle: "Prêt à vous impliquer ?",
      ctaSubtitle: "Rejoignez un ministère, rencontrez notre équipe et commencez votre aventure à Cannaan.",
      ctaButton: "Nous Contacter",
    },
    mediaPage: {
      headerTitle: "Médiathèque & Podcasts",
      headerSubtitle: "Écoutez les enseignements, prédications et revivez la vie de l'église en images.",
      headerBadge: "Médiathèque",
      audioSection: "Enseignements Audio",
      audioTitle: "Podcasts & Prédications",
      gallerySection: "Galerie",
      galleryTitle: "La vie de l'église en images",
      galleryAlt: "Galerie CIRC Cannaan",
    },
    teachingsPage: {
      headerTitle: "Tous les Enseignements",
      headerSubtitle: "Explorez notre bibliothèque audio de messages et prédications.",
      headerBadge: "Bibliothèque Audio",
      filterAll: "Tout",
      filterPreaching: "Prédication",
      filterTeaching: "Enseignement",
      filterCombat: "Combat",
    },
    aboutPage: {
      headerSubtitle: "Découvrez notre histoire, notre vision et les hommes de foi qui portent cette vision.",
      headerBadge: "Église Cannaan",
      whoTitle: "Qui sommes-nous ?",
      whoP1: "Le Centre International de Réveil Cannaan (CIRC) est né en 2003 d'un appel divin pour bâtir des disciples transformés par la puissance de l'Évangile.",
      visionariesTitle: "Nos Visionnaires",
      yearsLabel: "Années de ministère",
      identityBadge: "Notre Identité",
      identityTitle: "Vision, Mission & Valeurs",
    },
    prophetPage: {
      headerTitle: "Prophète Ithiel Dossou",
      headerSubtitle: "Serviteur de Dieu et voix prophétique pour les nations, Fondateur du CIRC.",
      headerBadge: "Le Prophète",
      bioBadge: "Biographie",
      bioTitle: "Une vie consacrée à l'Éternel",
      back: "Retour",
      bioP1: "Le Prophète Ithiel Wayisuhu Zannudé Dossou est le fondateur du Centre International de Réveil Cannaan (CIRC).",
      bioP2: "Par le don prophétique, il exhorte les nations à revenir à une foi authentique et à manifester le règne de Dieu.",
      bioP3: "Son ministère se distingue par la profondeur de l'enseignement, la démonstration de la puissance de Dieu et l'élévation des leaders.",
      bioP4: "Il continue d'impacter des milliers de vies à travers les cultes, conférences et missions internationales.",
    },
    homePage: {
      statsYears: "Ans de ministère",
      statsMembers: "Membres actifs",
      statsCities: "Villes impactées",
      discover: "Découvrir",
      identitySection: "Notre Identité",
      ministriesSection: "Ministères",
      mediaSection: "Médiathèque",
      sermonsSection: "Derniers Messages",
      joinTitle: "Rejoignez-nous",
      joinContact: "Nous Contacter",
      sermonModalSummary: "Résumé du message",
      sermonModalPlayer: "Lecteur Média",
      welcomeFamily: "Bienvenue dans notre famille",
      secureDesc: "Transactions cryptées et protégées",
    },
    contactPage: {
      address: "Adresse",
      service: "Culte",
      phone: "Téléphone",
      sideTitle: "Nous sommes là pour vous",
      scheduleTitle: "Horaires des cultes",
      sunday: "Dimanche",
      wednesday: "Mercredi",
      friday: "Vendredi",
      formTitle: "Envoyez-nous un message",
    },
    donPage: {
      familiesHelped: "Familles aidées",
      socialProjects: "Projets sociaux",
      cardNumber: "Numéro de carte",
      mobileStep1: "Composez *880# sur votre téléphone",
      mobileStep2: "Sélectionnez « Transfert d'argent »",
      mobileStep3: "Entrez le numéro marchand CIRC",
      mobileStep4: "Confirmez avec votre code PIN",
      securePayment: "Paiement 100% sécurisé",
    },
  },
  en: {
    brand: {
      line1: "International Revival Center",
      line2: "Cannaan",
    },
    common: {
      discover: "Discover",
      back: "Back",
      learnMore: "Learn more",
      contactUs: "Contact Us",
      loading: "Loading",
      skipToContent: "Skip to content",
      secure: "100% Secure",
      downloadAudio: "Download audio",
      edit: "Edit",
      summary: "Summary",
      nowPlaying: "NOW PLAYING...",
      liveNow: "Live now",
      selected: "SELECTED",
      recentTeachings: "Recent teachings",
    },
    loader: {
      skip: "Skip",
      tagline: "International Revival Center",
    },
    whatsapp: {
      title: "Chat with us",
      subtitle: "We usually reply within a few minutes.",
      secretariat1: "Office 1",
      secretariat2: "Office 2",
      defaultMessage: "Hello CIRC Cannaan, I would like more information.",
      openMenu: "Open WhatsApp menu",
      closeMenu: "Close WhatsApp menu",
    },
    maps: {
      label: "Location",
      title: "Find us – CIRC Auditorium",
      phones: "📍 Behind Agblangandan Maternity · 📞 (+229) 01 66 73 47 34 / 01 67 52 22 28",
      iframeTitle: "CIRC Cannaan location",
    },
    errors: {
      notFoundTitle: "Page not found",
      notFoundDesc: "The page you are looking for does not exist or has been moved.",
      notFoundCta: "Back to home",
      errorTitle: "Something went wrong",
      errorDesc: "Please try again in a few moments.",
      errorCta: "Try again",
    },
    eventsPage: {
      headerTitle: "Live & Events",
      headerSubtitle: "Join our live services and discover upcoming events to grow together in faith.",
      headerBadge: "Our Calendar",
      liveBadge: "Live Service",
      liveTitle: "Follow us in real time",
      liveCta: "Watch on our YouTube channel",
      agendaLabel: "Calendar",
      upcomingTitle: "Upcoming events",
      eventAlt: "CIRC Cannaan event",
      event1Month: "Aug",
      event1Title: "Restoration Conference",
      event1Desc: "Join us for a powerful time of spiritual restoration with Prophet Ithiel Dossou.",
      event1Location: "CIRC Headquarters",
      event2Month: "Sep",
      event2Title: "Leaders Training",
      event2Desc: "An intensive seminar for all leaders and those called to ministry.",
      event2Location: "CIRC Auditorium, Agblangandan",
    },
    ministriesPage: {
      badge: "Community",
      sectionLabel: "Our Ministries",
      sectionTitle: "A place for everyone",
      sectionSubtitle: "Whatever season of life you are in, there is a ministry for you at Cannaan.",
      ctaTitle: "Ready to get involved?",
      ctaSubtitle: "Join a ministry, meet our team, and start your journey at Cannaan.",
      ctaButton: "Contact Us",
    },
    mediaPage: {
      headerTitle: "Media Library & Podcasts",
      headerSubtitle: "Listen to teachings, sermons, and relive church life in pictures.",
      headerBadge: "Media Library",
      audioSection: "Audio Teachings",
      audioTitle: "Podcasts & Sermons",
      gallerySection: "Gallery",
      galleryTitle: "Church life in pictures",
      galleryAlt: "CIRC Cannaan gallery",
    },
    teachingsPage: {
      headerTitle: "All Teachings",
      headerSubtitle: "Explore our audio library of messages and sermons.",
      headerBadge: "Audio Library",
      filterAll: "All",
      filterPreaching: "Preaching",
      filterTeaching: "Teaching",
      filterCombat: "Spiritual warfare",
    },
    aboutPage: {
      headerSubtitle: "Discover our story, vision, and the men of faith carrying this mission.",
      headerBadge: "Cannaan Church",
      whoTitle: "Who are we?",
      whoP1: "The International Revival Center Cannaan (CIRC) was born in 2003 from a divine call to build disciples transformed by the power of the Gospel.",
      visionariesTitle: "Our Visionaries",
      yearsLabel: "Years of ministry",
      identityBadge: "Our Identity",
      identityTitle: "Vision, Mission & Values",
    },
    prophetPage: {
      headerTitle: "Prophet Ithiel Dossou",
      headerSubtitle: "Servant of God and prophetic voice to the nations, Founder of CIRC.",
      headerBadge: "The Prophet",
      bioBadge: "Biography",
      bioTitle: "A life consecrated to the Lord",
      back: "Back",
      bioP1: "Prophet Ithiel Wayisuhu Zannudé Dossou is the founder of the International Revival Center Cannaan (CIRC).",
      bioP2: "Through the prophetic gift, he calls nations back to authentic faith and to manifest God's kingdom.",
      bioP3: "His ministry is marked by deep teaching, demonstrations of God's power, and raising leaders.",
      bioP4: "He continues to impact thousands of lives through services, conferences, and international missions.",
    },
    homePage: {
      statsYears: "Years of ministry",
      statsMembers: "Active members",
      statsCities: "Cities impacted",
      discover: "Discover",
      identitySection: "Our Identity",
      ministriesSection: "Ministries",
      mediaSection: "Media Library",
      sermonsSection: "Latest Messages",
      joinTitle: "Join us",
      joinContact: "Contact Us",
      sermonModalSummary: "Message summary",
      sermonModalPlayer: "Media Player",
      welcomeFamily: "Welcome to our family",
      secureDesc: "Encrypted and protected transactions",
    },
    contactPage: {
      address: "Address",
      service: "Service",
      phone: "Phone",
      sideTitle: "We are here for you",
      scheduleTitle: "Service schedule",
      sunday: "Sunday",
      wednesday: "Wednesday",
      friday: "Friday",
      formTitle: "Send us a message",
    },
    donPage: {
      familiesHelped: "Families helped",
      socialProjects: "Social projects",
      cardNumber: "Card number",
      mobileStep1: "Dial *880# on your phone",
      mobileStep2: "Select « Money transfer »",
      mobileStep3: "Enter the CIRC merchant number",
      mobileStep4: "Confirm with your PIN code",
      securePayment: "100% secure payment",
    },
  },
};

export function getPageCopy(locale: Locale): PageCopy {
  return pageCopy[locale];
}
