import type { StarterPack } from "./types.js";

const commonDocs = [
  { path: "README.md", purpose: "Setup, scripts, objectif et commandes", required: true },
  { path: "@agent.md", purpose: "Consignes Codex/agents pour maintenir le projet", required: true },
  { path: "docs/ARCHITECTURE.md", purpose: "Choix stack, alternatives, limites", required: true },
  { path: "docs/DECISION-MATRIX.md", purpose: "Quand choisir ou refuser ce starter", required: true },
  { path: "docs/SKILLS.md", purpose: "Skills IA design installes dans le projet", required: true },
  { path: "docs/SEO.md", purpose: "Stratégie SEO adaptée au domaine", required: true },
  { path: "docs/DELIVERY-CHECKLIST.md", purpose: "Checklist livraison client", required: true },
  { path: "SECURITY.md", purpose: "Secrets, permissions, rules, webhooks, uploads", required: true },
  { path: ".env.example", purpose: "Variables attendues sans secrets réels", required: true }
];

const starterPackStudioSitelinkMap = {
  summary:
    "Préparer plusieurs vraies pages HTML pour aider Google à choisir des raccourcis sous le résultat principal. Google décide l'affichage final, mais cette structure donne les bons signaux.",
  primaryNavigation: ["Accueil", "Starter packs", "Combos d'infra", "Guides", "Tarifs", "Contact"],
  homepageSections: [
    "Hero avec promesse claire et lien vers Starter packs",
    "Aperçu des combos d'infra avec lien vers Combos d'infra",
    "Preuves/captures produit avec lien vers Guides",
    "CTA final vers Contact ou téléchargement"
  ],
  footerNavigation: ["Starter packs", "Combos d'infra", "Guides", "Tarifs", "À propos", "Contact"],
  candidatePages: [
    {
      route: "/starter-packs",
      label: "Starter packs",
      role: "Page catalogue des types de projets générables.",
      title: "Starter packs pour sites, apps et marketplaces | Starter Pack Studio",
      h1: "Starter packs prêts pour lancer un projet client",
      metaDescription: "Compare les starters landing, vitrine, app métier, marketplace et dashboard pour choisir la bonne architecture dès le départ.",
      schema: ["CollectionPage", "ItemList", "BreadcrumbList"],
      internalLinks: ["Header", "Hero", "Section catalogue", "Footer"]
    },
    {
      route: "/combos-infra",
      label: "Combos d'infra",
      role: "Page éducative qui clarifie Astro, Cloudflare, Firebase, Next et SEO.",
      title: "Combos d'infra web expliqués | Starter Pack Studio",
      h1: "Choisir le bon combo d'infra pour son projet",
      metaDescription: "Comprends quand choisir Astro, Cloudflare Pages, Firebase, Next, SQL ou Firestore selon SEO, coût, backoffice et données.",
      schema: ["Article", "BreadcrumbList"],
      internalLinks: ["Header", "Bloc combos", "Guides", "Footer"]
    },
    {
      route: "/guides",
      label: "Guides",
      role: "Hub de contenus longs pour renforcer l'autorité SEO.",
      title: "Guides architecture web et SEO | Starter Pack Studio",
      h1: "Guides pour choisir une architecture web propre",
      metaDescription: "Guides pratiques pour structurer un site, préparer le SEO, comparer les providers et éviter les mauvais choix techniques.",
      schema: ["CollectionPage", "Article", "BreadcrumbList"],
      internalLinks: ["Header", "Homepage preuves", "Footer"]
    },
    {
      route: "/tarifs",
      label: "Tarifs",
      role: "Page offre/pricing si le produit a une proposition commerciale claire.",
      title: "Tarifs Starter Pack Studio",
      h1: "Tarifs et accès à Starter Pack Studio",
      metaDescription: "Découvre les options d'accès à Starter Pack Studio pour générer des starters professionnels et documentés.",
      schema: ["WebPage", "Product si offre réelle", "BreadcrumbList"],
      internalLinks: ["Header", "CTA homepage", "Footer"]
    },
    {
      route: "/contact",
      label: "Contact",
      role: "Page conversion pour demandes, démos ou support.",
      title: "Contact | Starter Pack Studio",
      h1: "Contacter Starter Pack Studio",
      metaDescription: "Pose une question, demande une démo ou partage ton besoin de starter pack pour un projet web.",
      schema: ["ContactPage", "Organization", "BreadcrumbList"],
      internalLinks: ["Header", "CTA final", "Footer"]
    },
    {
      route: "/a-propos",
      label: "À propos",
      role: "Page marque pour aider Google à comprendre l'entité derrière le produit.",
      title: "À propos | Starter Pack Studio",
      h1: "Pourquoi Starter Pack Studio existe",
      metaDescription: "Starter Pack Studio aide à choisir une architecture web claire et à générer des bases projet prêtes pour les agents IA.",
      schema: ["AboutPage", "Organization", "BreadcrumbList"],
      internalLinks: ["Footer", "Page contact", "Homepage"]
    }
  ],
  avoid: [
    "Une landing one-page sans routes profondes si l'objectif est d'obtenir des sitelinks.",
    "Des liens de navigation déclenchés seulement par JavaScript.",
    "Des pages candidates sans title/H1/meta propres.",
    "Des libellés vagues comme Découvrir, Plus ou Page 1 dans le menu principal."
  ]
};

const simpleShowcaseSitelinkMap = {
  summary:
    "Créer des pages principales crawlables qui reflètent les recherches réelles: services, réalisations, zone, contact et à propos. Google peut les choisir comme raccourcis si elles sont utiles et bien liées.",
  primaryNavigation: ["Accueil", "Services", "Réalisations", "Zone d'intervention", "Avis", "Contact"],
  homepageSections: [
    "Hero local/service avec lien vers Services",
    "Services principaux avec liens vers pages détaillées",
    "Réalisations ou preuves avec lien vers Réalisations",
    "Bloc zone/adresse avec lien vers Contact"
  ],
  footerNavigation: ["Services", "Réalisations", "Zone d'intervention", "Avis", "À propos", "Contact"],
  candidatePages: [
    {
      route: "/services",
      label: "Services",
      role: "Page pilier qui liste les prestations principales.",
      title: "Services et prestations | Nom de l'activité",
      h1: "Services et prestations",
      metaDescription: "Découvre les services proposés, les cas d'usage, les délais et les informations utiles pour demander un devis.",
      schema: ["Service", "ItemList", "BreadcrumbList"],
      internalLinks: ["Header", "Section services homepage", "Footer"]
    },
    {
      route: "/realisations",
      label: "Réalisations",
      role: "Page preuve qui montre projets, photos, résultats ou cas clients.",
      title: "Réalisations et projets | Nom de l'activité",
      h1: "Réalisations",
      metaDescription: "Parcours les réalisations, exemples de projets et résultats obtenus pour des clients.",
      schema: ["CollectionPage", "ImageObject si galerie", "BreadcrumbList"],
      internalLinks: ["Header", "Section preuves homepage", "Footer"]
    },
    {
      route: "/zone-intervention",
      label: "Zone d'intervention",
      role: "Page locale pour clarifier les villes, zones et modalités de déplacement.",
      title: "Zone d'intervention | Nom de l'activité",
      h1: "Zone d'intervention",
      metaDescription: "Vérifie les villes et zones couvertes, les délais et les conditions d'intervention.",
      schema: ["LocalBusiness", "Place", "BreadcrumbList"],
      internalLinks: ["Header", "Footer", "Contact"]
    },
    {
      route: "/avis",
      label: "Avis",
      role: "Page réassurance avec témoignages réels et preuves.",
      title: "Avis clients | Nom de l'activité",
      h1: "Avis clients",
      metaDescription: "Lis les retours clients, témoignages et éléments de confiance avant de prendre contact.",
      schema: ["Review si avis réels", "LocalBusiness", "BreadcrumbList"],
      internalLinks: ["Header", "Homepage preuves", "Footer"]
    },
    {
      route: "/contact",
      label: "Contact",
      role: "Page conversion avec coordonnées, formulaire et horaires.",
      title: "Contact et devis | Nom de l'activité",
      h1: "Contact et demande de devis",
      metaDescription: "Contacte l'activité pour une question, un rendez-vous ou une demande de devis.",
      schema: ["ContactPage", "LocalBusiness", "BreadcrumbList"],
      internalLinks: ["Header", "CTA homepage", "Footer"]
    }
  ],
  avoid: [
    "Tout mettre sur une seule page si le client veut être visible sur plusieurs intentions de recherche.",
    "Cacher les pages services derrière des filtres ou onglets sans vrais liens HTML.",
    "Créer des pages locales vides ou dupliquées.",
    "Inventer des avis, notes ou données structurées qui ne sont pas visibles sur la page."
  ]
};

export const starterPacks: StarterPack[] = [
  {
    id: "landing-page",
    label: "Landing page",
    shortLabel: "Landing",
    intent: "Convertir vers une action precise: appel, devis, inscription, achat simple.",
    example: "Une page pour vendre une offre ou capter des leads.",
    defaultMode: "official-bootstrap",
    recommendedStack: ["Astro", "Content files", "Cloudflare Pages", "HTML SEO pré-rendu"],
    stackTechIds: ["astro", "cloudflare", "seo"],
    database: {
      primary: "none",
      label: "Pas de DB",
      summary: "Une landing n'a pas besoin de base de donnees. Un formulaire peut partir vers email, CRM, Forms ou une petite collection leads.",
      whenFirestoreFits: ["Leads simples", "Messages de formulaire", "Anti-perte si email indisponible"],
      whenSqlFits: ["Tunnel d'achat", "Reporting commercial", "CRM relationnel"],
      warning: "Ne pas ajouter un backoffice ou une DB juste pour trois textes qui changent rarement."
    },
    sitelinkMap: starterPackStudioSitelinkMap,
    architectureCombos: [
      {
        id: "astro-cloudflare-static",
        label: "Site vitrine sans backend",
        fit: "recommended",
        stack: ["Astro", "Cloudflare Pages", "SEO prerendu"],
        estimatedCost: "0 EUR/mois au demarrage",
        firebaseRole: "not-needed",
        bestFor: "Page marketing rapide avec textes/images dans le code, formulaire externe ou simple lien contact.",
        tradeoffs: ["Pas d'admin client integre", "Le formulaire doit etre externe ou ajoute via Function"],
        details: [
          "SEO prerendu veut dire que Google recoit deja le HTML complet: titres, textes, liens, meta, sitemap et schema sont presents avant JavaScript.",
          "Cloudflare Pages veut dire hebergement statique: il sert les fichiers generes par Astro sur un CDN, sans serveur applicatif a maintenir.",
          "Firebase n'apporte rien tant qu'il n'y a pas Auth, Storage, Firestore ou backoffice."
        ]
      },
      {
        id: "astro-cloudflare-forms",
        label: "Site vitrine avec formulaire serveur",
        fit: "lean",
        stack: ["Astro", "Cloudflare Pages", "Function formulaire", "Email/CRM"],
        estimatedCost: "0 EUR puis Workers Paid si trafic/API",
        firebaseRole: "optional",
        bestFor: "Landing qui doit recevoir des demandes sans exposer directement email, webhook CRM ou logique anti-spam dans le front.",
        tradeoffs: ["Un endpoint a maintenir", "Le stockage des leads doit etre choisi"],
        details: [
          "Pages Function veut dire une petite fonction serveur Cloudflare appelee quand le visiteur envoie le formulaire.",
          "Elle peut verifier le spam, envoyer un email, appeler un CRM ou enregistrer dans D1/KV sans ajouter Firebase.",
          "Firebase devient utile seulement si tu veux centraliser les leads dans Firestore avec rules, Auth admin ou Storage."
        ]
      },
      {
        id: "astro-firebase-leads",
        label: "Astro + Firebase Hosting/Firestore",
        fit: "specialized",
        stack: ["Astro", "Firebase Hosting", "Firestore", "Auth admin"],
        estimatedCost: "0 EUR possible, Blaze si quotas/services avances",
        firebaseRole: "recommended",
        bestFor: "Leads consultables dans un mini backoffice, login admin, historique et exports simples.",
        tradeoffs: ["Plus de configuration", "Rules et quotas a surveiller"],
        details: [
          "Ce n'est pas le choix de base pour une landing statique.",
          "Il devient coherent si la landing est deja le debut d'un outil commercial avec donnees, comptes ou backoffice."
        ]
      }
    ],
    alternatives: ["HTML/CSS simple", "Next static export si equipe React only", "Netlify/Vercel static"],
    providers: [
      { id: "cloudflare", label: "Cloudflare Pages", fit: "primary", reason: "Très bon pour statique, CDN, previews, coût bas." },
      { id: "firebase", label: "Firebase Hosting", fit: "good", reason: "Tres bon pour statique dans un environnement Firebase." },
      { id: "netlify", label: "Netlify", fit: "good", reason: "DX simple, previews et formulaires." },
      { id: "vercel", label: "Vercel", fit: "possible", reason: "Correct, mais souvent plus logique pour Next." }
    ],
    badChoices: [
      "Next.js SSR/App Hosting pour trois sections statiques.",
      "Backoffice/CMS maison si le contenu change rarement.",
      "SPA React avec contenu principal rendu uniquement côté client."
    ],
    docs: commonDocs,
    requiredTools: ["node", "git"],
    optionalTools: ["pnpm", "wrangler", "firebase", "code"],
    bootstrapCommands: [
      { label: "Astro latest", command: "pnpm", args: ["create", "astro@latest", "{{projectName}}", "--", "--template", "minimal", "--typescript", "strict", "--install", "false"], appliesToManagers: ["pnpm"] },
      { label: "Astro latest", command: "npm", args: ["create", "astro@latest", "{{projectName}}", "--", "--template", "minimal", "--typescript", "strict", "--install", "false"], appliesToManagers: ["npm"] }
    ],
    notes: ["Astro reste le défaut pour une landing: rapide, peu de JavaScript, bon SEO."]
  },
  {
    id: "site-vitrine-simple",
    label: "Site vitrine simple",
    shortLabel: "Vitrine simple",
    intent: "Présenter une activité complète: accueil, services, réalisations, à propos, contact.",
    example: "Artisan, paysagiste, restaurant, association, agence locale.",
    defaultMode: "official-bootstrap",
    recommendedStack: ["Astro", "Markdown/MDX", "Cloudflare Pages", "HTML SEO pré-rendu", "Schema.org LocalBusiness"],
    stackTechIds: ["astro", "cloudflare", "netlify", "seo"],
    database: {
      primary: "none",
      label: "Fichiers d'abord",
      summary: "Une vitrine simple se vend mieux avec contenu en fichiers et SEO propre. DB seulement si le client modifie souvent.",
      whenFirestoreFits: ["Actualites legeres", "Realisations modifiables", "Demandes de contact centralisees"],
      whenSqlFits: ["Catalogue filtre", "Reservations", "Historique client exploitable"],
      warning: "CMS/DB inutile si le client modifie deux fois par an."
    },
    sitelinkMap: simpleShowcaseSitelinkMap,
    architectureCombos: [
      {
        id: "astro-cloudflare-vitrine",
        label: "Vitrine fichier, rapide et SEO",
        fit: "recommended",
        stack: ["Astro", "Markdown/MDX", "Cloudflare Pages", "SEO prerendu"],
        estimatedCost: "0 EUR/mois au demarrage",
        firebaseRole: "not-needed",
        bestFor: "Site vitrine SEO avec pages services, realisations, contact et contenu rarement modifie.",
        tradeoffs: ["Pas d'edition client native", "Rebuild necessaire quand le contenu change"],
        details: [
          "Le meilleur choix quand le contenu vit dans le repo et que tu veux garder l'hebergement simple.",
          "SEO prerendu veut dire que chaque page existe deja en HTML lisible: Google n'attend pas une app React pour voir le contenu.",
          "Cloudflare Pages couvre le site statique, SSL, CDN, previews et domaines sans ajouter Firebase."
        ]
      },
      {
        id: "astro-netlify-forms",
        label: "Vitrine avec formulaires integres",
        fit: "lean",
        stack: ["Astro", "Netlify", "Forms", "Previews"],
        estimatedCost: "0 EUR possible, plans payants si equipe/usage",
        firebaseRole: "not-needed",
        bestFor: "Vitrine avec formulaires natifs, workflow de preview simple et peu de backend.",
        tradeoffs: ["Moins naturel si tu veux Workers/D1/R2", "Changer de provider plus tard si app metier"],
        details: [
          "Netlify est tres pratique quand les formulaires sont la seule partie dynamique.",
          "Firebase reste inutile tant qu'il n'y a pas comptes, uploads ou donnees applicatives."
        ]
      },
      {
        id: "astro-firebase-content",
        label: "Astro + Firebase pour contenu editable",
        fit: "specialized",
        stack: ["Astro", "Firebase Hosting", "Firestore", "Storage"],
        estimatedCost: "0 EUR possible, Blaze requis pour Storage moderne",
        firebaseRole: "recommended",
        bestFor: "Client qui modifie realisations, articles, images ou demandes depuis un espace admin.",
        tradeoffs: ["Backoffice et securite a construire", "Storage requiert Blaze pour les nouveaux buckets"],
        details: [
          "Choisis ce combo si la vitrine devient editable et stocke de vraies donnees client.",
          "Sinon, garde fichiers/MDX ou un CMS headless: c'est plus simple et plus SEO-friendly."
        ]
      }
    ],
    alternatives: ["Astro + Firebase Hosting", "Astro + Netlify", "Next static export"],
    providers: [
      { id: "cloudflare", label: "Cloudflare Pages", fit: "primary", reason: "Très adapté aux vitrines statiques et au coût bas." },
      { id: "firebase", label: "Firebase Hosting", fit: "good", reason: "Bien si le projet client est deja dans Firebase." },
      { id: "netlify", label: "Netlify", fit: "good", reason: "Simple pour formulaires et previews." },
      { id: "vercel", label: "Vercel", fit: "possible", reason: "Possible mais pas nécessaire si pas de Next." }
    ],
    badChoices: [
      "Confondre vitrine simple et app métier.",
      "Mettre un calendrier, un compte client ou panier dans ce starter.",
      "CMS externe payant si le client modifie deux fois par an."
    ],
    docs: [...commonDocs, { path: "docs/CONTENT-MODEL.md", purpose: "Pages, sections, champs, images", required: true }],
    requiredTools: ["node", "git"],
    optionalTools: ["pnpm", "wrangler", "firebase", "code"],
    bootstrapCommands: [
      { label: "Astro latest", command: "pnpm", args: ["create", "astro@latest", "{{projectName}}", "--", "--template", "minimal", "--typescript", "strict", "--install", "false"], appliesToManagers: ["pnpm"] },
      { label: "Astro latest", command: "npm", args: ["create", "astro@latest", "{{projectName}}", "--", "--template", "minimal", "--typescript", "strict", "--install", "false"], appliesToManagers: ["npm"] }
    ],
    notes: ["Separer vitrine simple et site-app local evite de sous-estimer les besoins metier."]
  },
  {
    id: "vitrine-editable",
    label: "Vitrine éditable",
    shortLabel: "Vitrine CMS",
    intent: "Site de contenu où le client modifie textes, images, articles ou catalogue léger.",
    example: "Site services + blog + FAQ + réalisations modifiables.",
    defaultMode: "official-bootstrap",
    recommendedStack: ["Astro + CMS headless", "ou Next + Firebase CMS maison", "Cloudflare Pages/Workers ou Firebase App Hosting"],
    stackTechIds: ["astro", "next", "firebase", "cloudflare", "firestore"],
    database: {
      primary: "hybrid",
      label: "Source contenu",
      summary: "Source de contenu d'abord: CMS headless, fichiers ou Firestore si admin maison simple.",
      whenFirestoreFits: ["Contenu editable", "Catalogue leger", "Preview/admin simple"],
      whenSqlFits: ["Relations editoriales complexes", "Workflow publication avance", "Reporting contenu"],
      warning: "Le risque n'est pas le SEO si rendu serveur; le risque est securite, preview et validation admin."
    },
    alternatives: ["Sanity/Directus/Strapi", "Astro Content Collections", "Next Draft Mode"],
    providers: [
      { id: "cloudflare", label: "Cloudflare Pages + Workers", fit: "good", reason: "Très bon pour Astro + contenu, Workers si endpoints légers." },
      { id: "firebase", label: "Firebase App Hosting", fit: "good", reason: "Pertinent si CMS maison, Auth admin, Firestore/Storage." },
      { id: "vercel", label: "Vercel", fit: "good", reason: "Très naturel pour Next + preview éditoriale." },
      { id: "netlify", label: "Netlify", fit: "possible", reason: "Très correct pour Astro + CMS + webhooks." }
    ],
    badChoices: [
      "CMS maison sans rôles, preview, logs ni validation serveur.",
      "Charger le contenu SEO uniquement après hydration React.",
      "Utiliser Firestore comme CMS public avec rules trop ouvertes."
    ],
    docs: [...commonDocs, { path: "docs/CMS.md", purpose: "CMS maison ou headless, preview, publication", required: true }, { path: "docs/FIREBASE.md", purpose: "Auth, App Check, Firestore/Storage si Firebase", required: false }, { path: "docs/CLOUDFLARE.md", purpose: "Pages, Workers, env vars si Cloudflare", required: false }],
    requiredTools: ["node", "git"],
    optionalTools: ["pnpm", "wrangler", "firebase", "code"],
    bootstrapCommands: [
      { label: "Next latest", command: "pnpm", args: ["create", "next-app@latest", "{{projectName}}", "--yes"], appliesToManagers: ["pnpm"] },
      { label: "Next latest", command: "npm", args: ["create", "next-app@latest", "{{projectName}}", "--", "--yes"], appliesToManagers: ["npm"] }
    ],
    notes: ["Choisir Astro si le CMS nourrit surtout du contenu; choisir Next si preview/auth/workflows dominent."]
  },
  {
    id: "site-app-local",
    label: "Site-app métier local",
    shortLabel: "Site-app local",
    intent: "Site public + module métier local: panier, calendrier, compte, devis, backoffice.",
    example: "Commerce ou service local avec catalogue, retrait, devis, compte client et backoffice.",
    defaultMode: "official-bootstrap",
    recommendedStack: ["Next.js App Router", "Firebase App Hosting", "Firebase Auth", "Firestore", "Storage", "Cloud Functions"],
    stackTechIds: ["next", "firebase", "auth", "firestore", "storage"],
    database: {
      primary: "firestore",
      label: "Firestore recommande",
      summary: "Firestore convient si les donnees restent documentaires: produits, panier, compte, devis, creneaux simples, backoffice.",
      whenFirestoreFits: ["Catalogue/panier", "Creneaux simples", "Backoffice leger"],
      whenSqlFits: ["Capacite conflictuelle", "Stock strict", "Planning/reporting lourd"],
      warning: "Modeliser les statuts panier/commande/creneau des le debut."
    },
    alternatives: ["Astro + React islands + adapter", "Cloudflare Workers + D1 pour version edge", "Next + PostgreSQL si données relationnelles"],
    providers: [
      { id: "firebase", label: "Firebase App Hosting", fit: "primary", reason: "Tres coherent avec Auth, Firestore, Storage et workflows Next." },
      { id: "cloudflare", label: "Cloudflare Pages/Workers/D1", fit: "good", reason: "Alternative forte pour edge, cout bas et D1/R2/KV." },
      { id: "vercel", label: "Vercel", fit: "good", reason: "Tres bon pour Next, avec DB ou services externes a choisir." },
      { id: "netlify", label: "Netlify", fit: "possible", reason: "Possible pour une version plus legere ou statique." }
    ],
    badChoices: [
      "Le classer comme simple vitrine.",
      "Pas de modèle d'états pour panier/créneau/commande.",
      "Rôles admin seulement côté interface.",
      "Pas d'audit sur annulation/retrait/modification."
    ],
    docs: [...commonDocs, { path: "docs/FIREBASE.md", purpose: "Auth, Firestore, Storage, Functions, App Check", required: true }, { path: "docs/ORDER-WORKFLOW.md", purpose: "Panier, créneaux, routines, statuts", required: true }, { path: "docs/RBAC.md", purpose: "Client, admin, staff, owner", required: true }],
    requiredTools: ["node", "git"],
    optionalTools: ["pnpm", "firebase", "wrangler", "code"],
    bootstrapCommands: [
      { label: "Next latest", command: "pnpm", args: ["create", "next-app@latest", "{{projectName}}", "--yes"], appliesToManagers: ["pnpm"] },
      { label: "Next latest", command: "npm", args: ["create", "next-app@latest", "{{projectName}}", "--", "--yes"], appliesToManagers: ["npm"] }
    ],
    notes: ["Astro peut le faire, mais Next est plus confortable dès que workflows/auth/backoffice se multiplient."]
  },
  {
    id: "marketplace-locale",
    label: "Marketplace locale sans paiement",
    shortLabel: "Market local",
    intent: "Catalogue, demandes, annonces, commandes manuelles, retrait ou organisation sans paiement en ligne.",
    example: "Petite marketplace d'annonces, catalogue local, retrait, demandes ou commandes reglees hors ligne.",
    defaultMode: "official-bootstrap",
    recommendedStack: ["Next.js", "Firebase App Hosting", "Auth", "Firestore", "Functions", "Email provider"],
    stackTechIds: ["next", "firebase", "auth", "firestore", "cloudflare"],
    database: {
      primary: "firestore",
      label: "Firestore suffit souvent",
      summary: "Firestore est coherent pour un MVP marketplace: annonces, photos, profils, favoris, messages, moderation.",
      whenFirestoreFits: ["Annonces/profils/photos", "Favoris/messages", "Moderation et commandes simples"],
      whenSqlFits: ["Recherche multi-facettes centrale", "Reservation/stock strict", "Reporting vendeur ou matching avance"],
      warning: "Prevoir un moteur de recherche dedie si les facettes deviennent le coeur du produit."
    },
    alternatives: ["Next + PostgreSQL", "Cloudflare Workers + D1/R2", "Astro hybride si peu de workflows"],
    providers: [
      { id: "firebase", label: "Firebase", fit: "primary", reason: "Rapide et pertinent pour commandes simples, realtime et backoffice local." },
      { id: "cloudflare", label: "Cloudflare Workers + D1", fit: "good", reason: "Tres bon pour infra edge et SQL leger." },
      { id: "vercel", label: "Vercel", fit: "possible", reason: "Très bien avec Next, DB externe à choisir." },
      { id: "netlify", label: "Netlify", fit: "possible", reason: "Possible pour un petit niveau de fonctions." }
    ],
    badChoices: [
      "Aucun modèle de statuts de commande.",
      "Réservations modifiables directement client sans rules.",
      "Pas de sauvegarde/export si c'est de l'opérationnel."
    ],
    docs: [...commonDocs, { path: "docs/ORDER-WORKFLOW.md", purpose: "Statuts, retrait, annulation, routines", required: true }, { path: "docs/RBAC.md", purpose: "Permissions client/admin/staff", required: true }, { path: "docs/FIRESTORE-RULES.md", purpose: "Rules testables", required: true }],
    requiredTools: ["node", "git"],
    optionalTools: ["pnpm", "firebase", "wrangler", "code"],
    bootstrapCommands: [
      { label: "Next latest", command: "pnpm", args: ["create", "next-app@latest", "{{projectName}}", "--yes"], appliesToManagers: ["pnpm"] },
      { label: "Next latest", command: "npm", args: ["create", "next-app@latest", "{{projectName}}", "--", "--yes"], appliesToManagers: ["npm"] }
    ],
    notes: ["Firestore est acceptable ici tant que l'argent, le reporting lourd et l'audit financier ne sont pas au cœur."]
  },
  {
    id: "marketplace-stripe",
    label: "Marketplace Stripe",
    shortLabel: "Stripe market",
    intent: "Marketplace avec paiements, vendeurs, commissions, remboursements et webhooks.",
    example: "Plateforme vendeurs/prestataires avec Stripe Connect.",
    defaultMode: "official-bootstrap",
    recommendedStack: ["Next.js", "PostgreSQL ou Firebase SQL Connect", "Stripe Connect", "Auth", "Search", "Backoffice"],
    stackTechIds: ["next", "stripe", "postgres", "firebase-sql", "auth"],
    database: {
      primary: "sql",
      label: "SQL pour l'argent",
      summary: "SQL doit porter l'argent: commandes, paiements, commissions, remboursements, webhooks et audit.",
      whenFirestoreFits: ["Catalogue public", "Chat/notifications", "Profil vendeur simple"],
      whenSqlFits: ["Stripe webhooks", "Commissions/payouts", "Audit financier et inventaire"],
      warning: "Ne jamais valider une commande Stripe uniquement avec le retour navigateur."
    },
    alternatives: ["Vercel + Neon", "Firebase Auth + Cloud SQL", "Cloudflare Workers + D1 si modèle plus léger"],
    providers: [
      { id: "vercel", label: "Vercel + Postgres", fit: "primary", reason: "Tres naturel pour Next, SSR, webhooks Stripe et Postgres manage." },
      { id: "firebase", label: "Firebase App Hosting + SQL Connect", fit: "good", reason: "Bon choix si Auth Firebase et Postgres SQL Connect structurent le backend." },
      { id: "cloudflare", label: "Cloudflare Workers/D1/R2", fit: "possible", reason: "Possible pour modele plus leger; verifier limites D1 et Stripe." },
      { id: "netlify", label: "Netlify", fit: "possible", reason: "Moins prioritaire pour marketplace avancée." }
    ],
    badChoices: [
      "Valider un paiement avec success_url.",
      "Stocker les paiements comme champs Firestore modifiables client.",
      "Pas de table stripe_events ni idempotence webhook.",
      "Pas de modèle de remboursement/litige."
    ],
    docs: [...commonDocs, { path: "docs/STRIPE.md", purpose: "Connect, Checkout, webhooks, commissions", required: true }, { path: "docs/PAYMENT-STATE-MACHINE.md", purpose: "États paiement/commande", required: true }, { path: "docs/DATA-MODEL.md", purpose: "Orders, payments, events, payouts", required: true }],
    requiredTools: ["node", "git"],
    optionalTools: ["pnpm", "stripe", "firebase", "wrangler", "code"],
    bootstrapCommands: [
      { label: "Next latest", command: "pnpm", args: ["create", "next-app@latest", "{{projectName}}", "--yes"], appliesToManagers: ["pnpm"] },
      { label: "Next latest", command: "npm", args: ["create", "next-app@latest", "{{projectName}}", "--", "--yes"], appliesToManagers: ["npm"] }
    ],
    notes: ["PostgreSQL devient la source de vérité dès que paiement, remboursements et audit arrivent."]
  },
  {
    id: "app-metier-sql",
    label: "App métier SQL",
    shortLabel: "App SQL",
    intent: "CRM, workflow, commandes, rôles, audit, reporting et données relationnelles.",
    example: "App entreprise, backoffice metier, process multi-roles, reporting et audit.",
    defaultMode: "official-bootstrap",
    recommendedStack: ["Next.js BFF ou Vite SPA + API", "PostgreSQL", "Firebase SQL Connect possible", "RBAC", "Audit logs"],
    stackTechIds: ["next", "vite", "postgres", "firebase-sql", "auth"],
    database: {
      primary: "sql",
      label: "SQL recommande",
      summary: "Les apps metier gagnent avec schema, contraintes, transactions, audit, exports et reporting.",
      whenFirestoreFits: ["Workflow simple", "Realtime leger", "Peu de relations"],
      whenSqlFits: ["Multi-roles", "Contraintes metier", "Reporting, exports et audit"],
      warning: "Firestore devient couteux mentalement quand les jointures vivent dans le code."
    },
    alternatives: ["Cloudflare Workers + D1 pour app edge légère", "Cloud Run API + Vite", "Next + Prisma/Drizzle"],
    providers: [
      { id: "firebase", label: "Firebase SQL Connect", fit: "good", reason: "Bon compromis avec Auth Firebase et PostgreSQL manage." },
      { id: "cloudflare", label: "Cloudflare D1/Workers", fit: "possible", reason: "Très intéressant pour app edge plus légère, moins pour gros reporting." },
      { id: "vercel", label: "Vercel + Postgres", fit: "primary", reason: "Tres bon pour Next et une DB relationnelle managee." },
      { id: "local", label: "Cloud Run / API dediee", fit: "good", reason: "Pertinent si le domaine merite une API durable et separee." }
    ],
    badChoices: [
      "Firestore pour jointures lourdes et reporting relationnel.",
      "Pas de transactions sur transitions critiques.",
      "Filtrer tenant uniquement côté front.",
      "Pas d'audit log."
    ],
    docs: [...commonDocs, { path: "docs/DATA-MODEL.md", purpose: "Tables, contraintes, indexes", required: true }, { path: "docs/RBAC.md", purpose: "Roles, permissions, tenant isolation", required: true }, { path: "docs/RUNBOOK.md", purpose: "Backups, migrations, incidents", required: true }, { path: "docs/API-CONTRACT.md", purpose: "BFF, REST, GraphQL ou tRPC", required: true }],
    requiredTools: ["node", "git"],
    optionalTools: ["pnpm", "firebase", "wrangler", "code"],
    bootstrapCommands: [
      { label: "Next latest", command: "pnpm", args: ["create", "next-app@latest", "{{projectName}}", "--yes"], appliesToManagers: ["pnpm"] },
      { label: "Vite React latest", command: "pnpm", args: ["create", "vite@latest", "{{projectName}}", "--", "--template", "react-ts"], appliesToManagers: ["pnpm"] }
    ],
    notes: ["Le choix Next vs Vite+API dépend surtout de la durée de vie du domaine et du besoin API partagé."]
  },
  {
    id: "dashboard-admin",
    label: "Dashboard admin",
    shortLabel: "Dashboard",
    intent: "Interface privée dense: opérations, modération, analytics, gestion interne.",
    example: "Backoffice admin ou outil interne sans SEO public.",
    defaultMode: "official-bootstrap",
    recommendedStack: ["Vite React", "API/BFF", "Firebase Hosting ou Cloudflare Pages", "RBAC serveur"],
    stackTechIds: ["vite", "firebase", "cloudflare", "auth"],
    database: {
      primary: "hybrid",
      label: "Selon API",
      summary: "Le dashboard n'impose pas la DB. Il doit consommer proprement l'API ou la DB choisie par le domaine principal.",
      whenFirestoreFits: ["Admin de contenu", "Moderation simple", "Realtime operationnel"],
      whenSqlFits: ["Tables denses", "Filtres avances", "Exports/reporting"],
      warning: "Ne jamais mettre secrets ou roles admin uniquement dans le front."
    },
    alternatives: ["Dashboard dans Next", "Cloudflare Pages + Workers", "Firebase Auth + Firestore"],
    providers: [
      { id: "cloudflare", label: "Cloudflare Pages", fit: "primary", reason: "Très bon pour SPA privée + API Workers." },
      { id: "firebase", label: "Firebase Hosting", fit: "good", reason: "Très bon pour SPA + Auth/Firestore." },
      { id: "vercel", label: "Vercel", fit: "possible", reason: "Possible, surtout si déjà Next." },
      { id: "netlify", label: "Netlify", fit: "possible", reason: "Correct pour SPA et functions légères." }
    ],
    badChoices: [
      "Mettre des secrets ou clés admin dans le front.",
      "Rôles uniquement dans la navigation.",
      "Requêtes non paginées sur gros volumes.",
      "Dashboard public en SPA si SEO requis."
    ],
    docs: [...commonDocs, { path: "docs/ADMIN-SCOPE.md", purpose: "Actions admin, droits, limites", required: true }, { path: "docs/API-CONTRACT.md", purpose: "Endpoints admin et erreurs", required: true }, { path: "docs/RBAC.md", purpose: "Permissions par route/action", required: true }],
    requiredTools: ["node", "git"],
    optionalTools: ["pnpm", "firebase", "wrangler", "code"],
    bootstrapCommands: [
      { label: "Vite React latest", command: "pnpm", args: ["create", "vite@latest", "{{projectName}}", "--", "--template", "react-ts"], appliesToManagers: ["pnpm"] },
      { label: "Vite React latest", command: "npm", args: ["create", "vite@latest", "{{projectName}}", "--", "--template", "react-ts"], appliesToManagers: ["npm"] }
    ],
    notes: ["Vite SPA est très pertinent quand l'interface est privée et que le SEO n'existe pas."]
  }
];

export function getStarterPack(id: string): StarterPack | undefined {
  return starterPacks.find((pack) => pack.id === id);
}
