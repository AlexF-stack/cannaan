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
    libraryTitle: string;
    librarySubtitle: string;
    filterAll: string;
    filterPreaching: string;
    filterTeaching: string;
    filterCombat: string;
  };
  aboutPage: {
    headerSubtitle: string;
    headerBadge: string;
    whoTitle: string;
    whoHeading: string;
    whoP1: string;
    visionariesTitle: string;
    visionariesNames: string;
    visionaryP1: string;
    visionaryP2: string;
    learnMoreProphet: string;
    yearsLabel: string;
    prophetsAlt: string;
    identityBadge: string;
    identityTitle: string;
    programLabel: string;
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
    testimonyCaption: string;
    quoteTitle: string;
    quoteText: string;
    predicationAlt: string;
    testimonyAlt: string;
    prophetAlt: string;
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
    citiesImpacted: string;
    cardNumber: string;
    cardExpiry: string;
    cardCvc: string;
    mobileStep1: string;
    mobileStep2: string;
    mobileStep3: string;
    mobileStep4: string;
    securePayment: string;
    securePaymentFull: string;
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
      headerSubtitle: "Explorez notre bibliothèque complète de prédications et de moments de révélation.",
      headerBadge: "Archives",
      libraryTitle: "Bibliothèque Audio",
      librarySubtitle: "Retrouvez tous les messages inspirés pour votre édification.",
      filterAll: "Tout",
      filterPreaching: "Prédication",
      filterTeaching: "Enseignement",
      filterCombat: "Combat",
    },
    aboutPage: {
      headerSubtitle: "Découvrez notre histoire, notre vision et notre équipe pastorale.",
      headerBadge: "Église Canaan",
      whoTitle: "Qui sommes-nous ?",
      whoHeading:
        "Le Centre International de Réveil - CANAAN est un ministère d'évangélisation et de formation des leaders pour la conquête des nations, créé en 2003 sous l'inspiration divine par Ithiel DOSSOU.",
      whoP1: "Le Centre International de Réveil Cannaan (CIRC) est né en 2003 d'un appel divin pour bâtir des disciples transformés par la puissance de l'Évangile.",
      visionariesTitle: "Nos Visionnaires",
      visionariesNames: "Prophète Ithiel & Mykem Dossou",
      visionaryP1:
        "Père fondateur des églises Canaan, le Saint-Esprit l'utilise pour transformer une multitude d'hommes et de femmes en de véritables disciples de Christ.",
      visionaryP2:
        "Avec une vision claire et un dévouement total, le couple pastoral guide notre communauté vers une relation authentique avec Dieu — impactant nations, familles et sphères d'influence.",
      learnMoreProphet: "En savoir plus sur le Prophète",
      yearsLabel: "Années de ministère",
      prophetsAlt: "Prophète Ithiel & Mykem Dossou",
      identityBadge: "Notre Identité",
      identityTitle: "Vision, Mission & Valeurs",
      programLabel: "Programme",
    },
    prophetPage: {
      headerTitle: "Prophète Ithiel Dossou",
      headerSubtitle:
        "Serviteur de Dieu et voix prophétique pour les nations, Fondateur du Centre International de Réveil Cannaan (CIRC).",
      headerBadge: "Le Visionnaire",
      bioBadge: "Biographie",
      bioTitle: "Une vie consacrée à l'Éternel",
      back: "Retour",
      bioP1:
        "Le Prophète Ithiel Wayisuhu Zannudé Dossou, serviteur de Dieu et voix prophétique pour les nations, est le Fondateur du Centre International de Réveil Cannaan (CIRC).",
      bioP2:
        "Issu d'une lignée de serviteurs de Dieu, fils du feu Pasteur Pierre Dossou et de la prédicatrice Dorcas Bodjrenou, son parcours est marqué par un témoignage puissant : après plusieurs années de maladie, paralysé et proche de la mort, le Seigneur lui apparaît, le guérit et l'appelle au ministère, le consacrant comme prophète pour les nations.",
      bioP3:
        "Depuis lors, il porte un ministère international de restauration et de transformation, dédié à la formation de leaders appelés à manifester la suprématie du Royaume de Dieu dans les sphères charismatique, économique et politique.",
      bioP4:
        "Reconnu pour sa profondeur prophétique, il annonce l'Évangile du Royaume avec autorité à travers les nations, conduisant des campagnes d'évangélisation et des conférences de réveil où Dieu agit puissamment par des signes, des miracles et des prodiges, conduisant des multitudes à Christ.",
      testimonyCaption: "Un témoignage puissant de guérison divine.",
      quoteTitle: "Son cri de cœur : le Réveil des Derniers Temps.",
      quoteText:
        "Mesdames, Mesdemoiselles et Messieurs, veuillez recevoir avec une ovation à l'Eternel notre Dieu, son serviteur, le prophète ITHIEL DOSSOU !!!!!",
      predicationAlt: "Prédication du prophète",
      testimonyAlt: "Témoignage du prophète",
      prophetAlt: "Le Prophète Ithiel Dossou",
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
      citiesImpacted: "Villes impactées",
      cardNumber: "Numéro de carte",
      cardExpiry: "MM / AA",
      cardCvc: "CVC",
      mobileStep1: "Composez *144# sur votre téléphone",
      mobileStep2: "Sélectionnez « Paiement marchand »",
      mobileStep3: "Entrez le code Canaan : 12345",
      mobileStep4: "Confirmez avec votre code PIN",
      securePayment: "Paiement 100% sécurisé",
      securePaymentFull: "Paiement 100% sécurisé et chiffré",
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
      headerSubtitle: "Explore our complete library of sermons and moments of revelation.",
      headerBadge: "Archives",
      libraryTitle: "Audio Library",
      librarySubtitle: "Find all inspired messages for your edification.",
      filterAll: "All",
      filterPreaching: "Preaching",
      filterTeaching: "Teaching",
      filterCombat: "Spiritual warfare",
    },
    aboutPage: {
      headerSubtitle: "Discover our story, vision, and pastoral team.",
      headerBadge: "Cannaan Church",
      whoTitle: "Who are we?",
      whoHeading:
        "The International Revival Center - CANAAN is an evangelism and leadership training ministry for the conquest of nations, founded in 2003 under divine inspiration by Ithiel DOSSOU.",
      whoP1: "The International Revival Center Cannaan (CIRC) was born in 2003 from a divine call to build disciples transformed by the power of the Gospel.",
      visionariesTitle: "Our Visionaries",
      visionariesNames: "Prophet Ithiel & Mykem Dossou",
      visionaryP1:
        "Founding father of the Canaan churches, the Holy Spirit uses him to transform many men and women into true disciples of Christ.",
      visionaryP2:
        "With a clear vision and total dedication, the pastoral couple guides our community toward an authentic relationship with God — impacting nations, families, and spheres of influence.",
      learnMoreProphet: "Learn more about the Prophet",
      yearsLabel: "Years of ministry",
      prophetsAlt: "Prophet Ithiel & Mykem Dossou",
      identityBadge: "Our Identity",
      identityTitle: "Vision, Mission & Values",
      programLabel: "Program",
    },
    prophetPage: {
      headerTitle: "Prophet Ithiel Dossou",
      headerSubtitle:
        "Servant of God and prophetic voice to the nations, Founder of the International Revival Center Cannaan (CIRC).",
      headerBadge: "The Visionary",
      bioBadge: "Biography",
      bioTitle: "A life consecrated to the Lord",
      back: "Back",
      bioP1:
        "Prophet Ithiel Wayisuhu Zannudé Dossou, servant of God and prophetic voice to the nations, is the Founder of the International Revival Center Cannaan (CIRC).",
      bioP2:
        "From a lineage of servants of God, son of the late Pastor Pierre Dossou and preacher Dorcas Bodjrenou, his journey is marked by a powerful testimony: after years of illness, paralyzed and near death, the Lord appeared to him, healed him, and called him to ministry, consecrating him as a prophet to the nations.",
      bioP3:
        "Since then, he carries an international ministry of restoration and transformation, dedicated to training leaders called to manifest the supremacy of God's Kingdom in charismatic, economic, and political spheres.",
      bioP4:
        "Known for his prophetic depth, he proclaims the Gospel of the Kingdom with authority across nations, leading evangelism campaigns and revival conferences where God moves powerfully through signs, wonders, and miracles, leading multitudes to Christ.",
      testimonyCaption: "A powerful testimony of divine healing.",
      quoteTitle: "His heart cry: the End-Times Revival.",
      quoteText:
        "Ladies and gentlemen, please receive with an ovation to the Lord our God, His servant, Prophet ITHIEL DOSSOU!",
      predicationAlt: "Prophet preaching",
      testimonyAlt: "Prophet testimony",
      prophetAlt: "Prophet Ithiel Dossou",
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
      citiesImpacted: "Cities impacted",
      cardNumber: "Card number",
      cardExpiry: "MM / YY",
      cardCvc: "CVC",
      mobileStep1: "Dial *144# on your phone",
      mobileStep2: "Select « Merchant payment »",
      mobileStep3: "Enter the Canaan code: 12345",
      mobileStep4: "Confirm with your PIN code",
      securePayment: "100% secure payment",
      securePaymentFull: "100% secure and encrypted payment",
    },
  },
};

export function getPageCopy(locale: Locale): PageCopy {
  return pageCopy[locale];
}
