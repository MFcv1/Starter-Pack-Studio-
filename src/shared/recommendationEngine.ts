import type { ProviderKnowledge, SeoKnowledge, StarterChoice, StarterDecision, StarterId, ProviderId } from "./types.js";
import { getDynamicStackForCombo } from "./starterRegistry.js";

export const starterChoices: StarterChoice[] = [
  {
    starterId: "landing-page",
    label: "Landing page",
    description: "Une page ou mini-site public pour vendre, capter un lead ou tester une offre."
  },
  {
    starterId: "site-vitrine-simple",
    label: "Site vitrine multi-pages",
    description: "Accueil, services, preuves, a propos, contact et SEO local propre."
  },
  {
    starterId: "vitrine-editable",
    label: "Vitrine editable",
    description: "Site public dont textes, images, articles ou catalogue leger changent souvent."
  },
  {
    starterId: "site-app-local",
    label: "App metier locale",
    description: "Comptes, devis, panier, calendrier, backoffice ou workflow operationnel."
  },
  {
    starterId: "marketplace-locale",
    label: "Marketplace sans paiement",
    description: "Annonces, vendeurs, demandes, moderation et organisation sans checkout."
  },
  {
    starterId: "marketplace-stripe",
    label: "Marketplace Stripe",
    description: "Paiements, vendeurs, commissions, remboursements, webhooks et audit."
  },
  {
    starterId: "app-metier-sql",
    label: "App metier SQL",
    description: "CRM, reporting, roles, audit et donnees relationnelles structurantes."
  },
  {
    starterId: "dashboard-admin",
    label: "Dashboard admin",
    description: "Interface privee dense: operations, analytics, moderation et gestion interne."
  }
];

export const providerKnowledgeBase: ProviderKnowledge[] = [
  {
    id: "cloudflare",
    label: "Cloudflare",
    summary: "Excellent defaut pour Astro, sites publics prerendus, CDN bas cout, Workers legers et gros fichiers via R2.",
    bestFor: ["Astro SSG sur Pages", "CDN mondial", "Pages Functions/Workers", "R2 pour downloads", "D1/KV pour MVP edge"],
    avoidFor: ["Backend Node long-running", "DB relationnelle lourde", "Transactions fortes", "Jobs CPU longs", "CMS complet cle en main"],
    pricing: "Pages demarre a 0 USD. Workers Paid commence a 5 USD/mois si usage serveur serieux. R2 facture stockage/operations mais pas l'egress Internet.",
    services: [
      {
        label: "Pages",
        freeTier: "Static requests et bandwidth tres genereux, 500 builds/mois, limite 25 MiB par asset.",
        paidFrom: "Pro a partir d'environ 20-25 USD/mois selon facturation.",
        bestFor: "Landing, vitrine, docs, Astro prerendu.",
        watch: "Sortir les gros fichiers du build vers R2."
      },
      {
        label: "Workers / Pages Functions",
        freeTier: "100k requetes/jour sur Free.",
        paidFrom: "Workers Paid 5 USD/mois, puis usage au-dela des quotas inclus.",
        bestFor: "Formulaire, webhook, anti-spam, API edge courte.",
        watch: "Les Pages Functions consomment les quotas Workers."
      },
      {
        label: "R2",
        freeTier: "10 GB-month, 1M operations Class A, 10M Class B en Standard.",
        paidFrom: "Stockage Standard 0.015 USD/GB-month, operations facturees.",
        bestFor: "Fichiers .dmg, .exe, PDF, images lourdes, archives.",
        watch: "Egress gratuit, mais stockage et operations ne le sont pas."
      },
      {
        label: "D1 / KV",
        freeTier: "D1 et KV suffisants pour prototypes et petites donnees.",
        paidFrom: "D1 facture lignes lues/ecrites, KV facture operations et stockage.",
        bestFor: "MVP SQL leger, cache, flags, preferences.",
        watch: "D1 n'est pas PostgreSQL; KV est eventually consistent."
      }
    ],
    tags: ["astro-cloudflare", "static-first", "edge-runtime", "r2-downloads", "low-cost", "pricing-trap-d1-rows"],
    watch: ["Asset Pages max 25 MiB", "Workers Paid si logique serveur frequente", "D1 facture les lignes scannees", "KV pas adapte aux transactions"],
    sources: [
      "https://developers.cloudflare.com/pages/platform/limits/",
      "https://developers.cloudflare.com/pages/functions/pricing/",
      "https://developers.cloudflare.com/workers/platform/pricing/",
      "https://developers.cloudflare.com/r2/pricing/",
      "https://developers.cloudflare.com/d1/platform/pricing/"
    ]
  },
  {
    id: "firebase",
    label: "Firebase",
    summary: "Pertinent quand le starter a Auth, Firestore, Storage, Functions, backoffice ou Next/App Hosting. Inutile pour une landing SEO statique.",
    bestFor: ["Auth utilisateur/admin", "Backoffice rapide", "Firestore realtime", "Uploads", "Triggers", "Next dynamique via App Hosting"],
    avoidFor: ["Landing/vitrine sans donnees", "SEO public uniquement", "Paiement/audit comme source de verite principale", "SQL/reporting complexe"],
    pricing: "Hosting a un free tier. App Hosting, Functions, Storage moderne et services avances demandent Blaze; SQL Connect ajoute aussi le cout Cloud SQL.",
    services: [
      {
        label: "Hosting",
        freeTier: "Stockage et transfert inclus sur quota gratuit.",
        paidFrom: "Blaze facture depassements.",
        bestFor: "SPA, statique, domaine SSL, projets deja Firebase.",
        watch: "Pas besoin d'App Hosting pour quelques pages statiques."
      },
      {
        label: "Auth / Firestore",
        freeTier: "Firestore inclut reads/writes/storage quotidiens gratuits.",
        paidFrom: "Facturation par operations, stockage et egress au-dela.",
        bestFor: "Comptes, profils, contenus editables, backoffice leger.",
        watch: "Read amplification et Security Rules a tester."
      },
      {
        label: "Storage / Functions",
        freeTier: "Quotas gratuits possibles sur Blaze selon service/region.",
        paidFrom: "Blaze requis pour Storage moderne et Functions.",
        bestFor: "Uploads, emails, webhooks, triggers courts.",
        watch: "Budget alerts ne coupent pas automatiquement les couts."
      },
      {
        label: "SQL Connect",
        freeTier: "Operations gratuites limitees, essai Cloud SQL.",
        paidFrom: "Cloud SQL a un cout fixe mensuel apres essai.",
        bestFor: "PostgreSQL typé avec ecosysteme Firebase.",
        watch: "Ne pas choisir pour une landing; reserver aux donnees relationnelles."
      }
    ],
    tags: ["auth", "backoffice", "firestore", "storage-blaze", "functions-blaze", "sql-connect", "not-for-seo-only"],
    watch: ["Inutile pour landing/vitrine SEO statique", "Blaze requis pour plusieurs services", "Firestore peut couter cher si reads multiplies", "SQL Connect ajoute Cloud SQL"],
    sources: [
      "https://firebase.google.com/pricing",
      "https://firebase.google.com/docs/hosting/usage-quotas-pricing",
      "https://firebase.google.com/docs/app-hosting/costs",
      "https://firebase.google.com/docs/firestore/pricing",
      "https://firebase.google.com/docs/sql-connect/pricing"
    ]
  },
  {
    id: "vercel",
    label: "Vercel",
    summary: "Excellent quand le starter est Next.js, avec SSR/ISR/previews et produit dynamique. Moins necessaire pour Astro statique simple.",
    bestFor: ["Next.js", "SSR", "ISR", "Previews", "Apps produit", "Catalogues dynamiques"],
    avoidFor: ["Landing Astro purement statique", "Gros fichiers a distribuer directement", "Projet qui veut eviter compute/bandwidth variables"],
    pricing: "Hobby gratuit pour tests. Pro demarre a 20 USD/utilisateur/mois, avec facturation usage compute/bandwidth selon ressources.",
    services: [
      {
        label: "Next.js Hosting",
        freeTier: "Hobby utile pour prototypes personnels.",
        paidFrom: "Pro a partir de 20 USD/utilisateur/mois.",
        bestFor: "SSR/ISR, routes dynamiques, previews produit.",
        watch: "Surveiller bandwidth, compute, images et nombre de membres."
      },
      {
        label: "Serverless / Edge",
        freeTier: "Inclus selon plan et quotas.",
        paidFrom: "Usage-based au-dela des quotas.",
        bestFor: "API courte, rendu dynamique, middleware.",
        watch: "Externaliser les gros binaires vers R2/S3."
      }
    ],
    tags: ["next", "ssr", "isr", "previews", "paid-risk"],
    watch: ["Pas obligatoire pour Astro statique", "Compute/bandwidth a surveiller", "Gros downloads hors Vercel"],
    sources: ["https://vercel.com/pricing", "https://vercel.com/docs/pricing", "https://nextjs.org/docs/app/guides/incremental-static-regeneration"]
  },
  {
    id: "netlify",
    label: "Netlify",
    summary: "Tres pratique pour sites statiques, previews et formulaires simples. Bon choix quand le formulaire est la seule partie dynamique.",
    bestFor: ["Static hosting", "Forms", "Previews", "DX simple", "Functions legeres"],
    avoidFor: ["Gros downloads", "App dynamique complexe", "Ecosysteme Firebase/Google deja central"],
    pricing: "Free utilisable pour tests et petits sites; plans payants/credits selon usage, bande passante, compute et requetes.",
    services: [
      {
        label: "Hosting / Previews",
        freeTier: "Free plan pour petits projets et previews.",
        paidFrom: "Plans payants selon credits et equipe.",
        bestFor: "Vitrine, landing, validation client.",
        watch: "Suivre bandwidth et credits si trafic."
      },
      {
        label: "Forms / Functions",
        freeTier: "Formulaires et fonctions inclus selon quotas/credits.",
        paidFrom: "Credits/plan si usage augmente.",
        bestFor: "Contact, leads, newsletter sans backend maison.",
        watch: "Pas le meilleur point de depart pour app metier lourde."
      }
    ],
    tags: ["static-hosting", "forms", "previews", "low-cost"],
    watch: ["Credits et bandwidth a suivre", "Moins adapte aux gros fichiers", "Changer de provider si l'app devient metier"],
    sources: ["https://www.netlify.com/pricing/", "https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/"]
  },
  {
    id: "aws",
    label: "AWS",
    summary: "Cloud generaliste pour infra durable: S3/CloudFront, Lambda, RDS, ECS, jobs, reseau et besoins entreprise. Puissant, mais plus lourd qu'un provider specialise.",
    bestFor: ["S3/CloudFront", "RDS PostgreSQL/MySQL", "Lambda", "ECS/Fargate", "Backends durables", "Infra entreprise"],
    avoidFor: ["Landing simple", "Petit site vitrine sans backend", "MVP qui doit rester tres lisible", "Equipe sans envie d'infra"],
    pricing: "Free tier utile pour apprendre, puis facturation par service. Les couts dependent fortement de S3, CloudFront, RDS, Lambda, logs et trafic.",
    services: [
      {
        label: "S3 + CloudFront",
        freeTier: "Quotas gratuits limites selon compte/periode.",
        paidFrom: "Stockage, requetes et transfert factures a l'usage.",
        bestFor: "Assets, uploads, downloads, sites statiques, CDN.",
        watch: "Configurer cache, permissions publiques et couts de transfert."
      },
      {
        label: "Lambda",
        freeTier: "Free tier mensuel pour requetes et temps d'execution.",
        paidFrom: "Facturation a l'usage au-dela.",
        bestFor: "Webhooks, API serverless, taches courtes.",
        watch: "Cold starts, timeouts, logs CloudWatch et limites runtime."
      },
      {
        label: "RDS",
        freeTier: "Free tier selon moteur/instance et duree d'eligibilite.",
        paidFrom: "Instance, stockage, backups et I/O.",
        bestFor: "PostgreSQL/MySQL manages, apps metier, audit.",
        watch: "Cout fixe possible meme avec peu de trafic."
      }
    ],
    tags: ["general-cloud", "s3", "cloudfront", "lambda", "rds", "enterprise", "infra-heavy"],
    watch: ["Complexite IAM/reseau", "Couts multi-services", "Logs et egress", "Surdimensionnement pour petits sites"],
    sources: ["https://aws.amazon.com/pricing/", "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html", "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html", "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html"]
  }
];

export const seoKnowledgeBase: SeoKnowledge[] = [
  {
    id: "public-stable",
    label: "SEO public stable",
    defaultRendering: "astro-ssg",
    bestFor: ["Landing", "Site vitrine", "Guides", "Pages services", "Pages marque"],
    avoidFor: ["Dashboard prive", "Catalogue avec donnees vivantes", "Pages qui changent par utilisateur"],
    googleRequirements: ["HTML initial utile", "Routes 200 crawlables", "Liens <a href>", "title/H1/meta uniques", "Sitemap", "Schema visible et réel"],
    requiredArtifacts: ["routes", "sitemap.xml", "metadata", "canonical", "schema JSON-LD", "liens header/home/footer"],
    sitelinkGuidance: ["Google choisit automatiquement", "Créer de vraies pages principales", "Lier les candidates depuis header, home et footer"],
    antiPatterns: ["SPA React client-only", "Navigation onclick sans href", "Landing one-page si objectif sitelinks", "Breadcrumbs vendus comme garantie"],
    sources: [
      "https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics",
      "https://developers.google.com/search/docs/crawling-indexing/links-crawlable",
      "https://developers.google.com/search/docs/appearance/sitelinks"
    ]
  },
  {
    id: "dynamic-seo",
    label: "SEO dynamique",
    defaultRendering: "next-isr",
    bestFor: ["Catalogue", "Prix/stock", "Articles nombreux", "Pages regenerables", "Previews produit"],
    avoidFor: ["Trois pages statiques", "Landing sans donnees", "Dashboard prive"],
    googleRequirements: ["HTML serveur ou prerendu", "Invalidation/revalidation maitrisee", "URLs stables", "Sitemap a jour"],
    requiredArtifacts: ["SSG/ISR/SSR", "cache policy", "sitemap dynamique", "metadata par route"],
    sitelinkGuidance: ["Routes principales stables", "Pages hub clairement nommees", "Ne pas cacher le catalogue derriere recherche JS uniquement"],
    antiPatterns: ["SSR par defaut pour contenu stable", "Contenu critique charge seulement apres JS", "Routes facettes indexees sans controle"],
    sources: [
      "https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation",
      "https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering",
      "https://nextjs.org/docs/app/guides/incremental-static-regeneration"
    ]
  },
  {
    id: "private-spa",
    label: "Interface privee",
    defaultRendering: "csr-private",
    bestFor: ["Dashboard admin", "Backoffice interne", "Analytics", "Moderation"],
    avoidFor: ["Landing SEO", "Vitrine publique", "Pages a indexer"],
    googleRequirements: ["Noindex si prive", "Auth serveur", "Pas de secrets front"],
    requiredArtifacts: ["auth", "roles", "logs", "security checklist"],
    sitelinkGuidance: ["Non pertinent pour interface privee"],
    antiPatterns: ["Utiliser Vite SPA pour contenu public SEO", "Stocker secrets/roles dans le client"],
    sources: ["https://vite.dev/guide/"]
  }
];

export const starterDecisionMatrix: Record<StarterId, StarterDecision> = {
  "landing-page": {
    starterId: "landing-page",
    title: "Astro + Cloudflare Pages",
    recommendedStack: ["Astro", "Cloudflare Pages", "HTML prerendu", "SEO public stable"],
    recommendedProvider: "cloudflare",
    rendering: "SSG / HTML prerendu",
    estimatedCost: "0 USD/EUR au demarrage; R2 ou Workers Paid seulement si fichiers/API grossissent.",
    why: ["Le contenu marketing est stable et doit etre visible dans le HTML initial.", "Cloudflare Pages sert Astro via CDN sans serveur a maintenir.", "Firebase, SQL et Next n'ajoutent rien tant qu'il n'y a pas de donnees applicatives."],
    costLimits: ["Asset Pages max 25 MiB: mettre .dmg/.exe sur R2.", "Pages Functions consomment les quotas Workers.", "Search Console apres mise en ligne pour suivre l'indexation."],
    whenChange: ["Formulaire simple: ajouter Cloudflare Function ou Netlify Forms.", "Gros downloads: ajouter Cloudflare R2.", "Backoffice/leads: Firebase devient coherent.", "Catalogue/prix/stock: Next SSG/ISR devient coherent."],
    avoid: ["Vite React SPA pour page publique SEO.", "Firebase/SQL juste pour trois textes.", "Next SSR pour une landing stable."],
    variants: [
      { id: "form", label: "Formulaire simple", trigger: "Contact, lead, newsletter", impact: "Ajoute une petite surface serveur ou un service de forms.", recommendedAddOn: "Cloudflare Function ou Netlify Forms", costImpact: "0 possible, puis quotas Workers/Netlify." },
      { id: "downloads", label: "Telechargements Mac/Windows", trigger: ".dmg, .exe, zip, checksums", impact: "Le starter reste Astro; les binaires sortent du build.", recommendedAddOn: "Cloudflare R2 + page /download", costImpact: "R2 facture stockage/operations, egress Internet gratuit." },
      { id: "backoffice", label: "Leads/backoffice", trigger: "Admin, historique, exports", impact: "La landing devient le debut d'une app.", recommendedAddOn: "Firebase Auth + Firestore", costImpact: "Blaze/Firestore a surveiller." },
      { id: "catalog", label: "Catalogue dynamique", trigger: "Prix, stock, routes nombreuses", impact: "Besoin de SSG/ISR/SSR plus dynamique.", recommendedAddOn: "Next.js + Vercel ou adapter Cloudflare", costImpact: "Compute/bandwidth a surveiller." }
    ],
    providerNotes: ["Cloudflare est le defaut bas cout.", "Netlify est excellent si le formulaire est central.", "Firebase Hosting possible si l'organisation est deja Firebase, mais pas necessaire."],
    sourceIds: ["cloudflare", "firebase", "public-stable"]
  },
  "site-vitrine-simple": {
    starterId: "site-vitrine-simple",
    title: "Astro + Cloudflare Pages multi-pages",
    recommendedStack: ["Astro", "Markdown/MDX", "Cloudflare Pages", "Schema LocalBusiness si pertinent"],
    recommendedProvider: "cloudflare",
    rendering: "SSG / HTML prerendu",
    estimatedCost: "0 USD/EUR au demarrage pour contenu statique.",
    why: ["Les pages services/contact/preuves doivent etre crawlables.", "Astro donne des routes HTML simples et rapides.", "Cloudflare garde l'hebergement sobre et fiable."],
    costLimits: ["Netlify devient interessant si forms natifs prioritaires.", "Firebase seulement si edition client ou backoffice.", "Eviter pages locales dupliquees/vides."],
    whenChange: ["Contenu modifie souvent: passer a vitrine editable.", "Comptes/devis/panier: passer a app metier.", "Formulaire seul: Netlify Forms ou Cloudflare Function."],
    avoid: ["Tout mettre sur une seule page si SEO local important.", "Cacher les services dans des onglets sans liens HTML.", "CMS payant si le client modifie deux fois par an."],
    variants: [
      { id: "forms", label: "Formulaires", trigger: "Demandes de devis/contact", impact: "Ajoute une reception fiable des leads.", recommendedAddOn: "Netlify Forms ou Cloudflare Function", costImpact: "Souvent gratuit au depart." },
      { id: "editable", label: "Edition client", trigger: "Actualites, realisations, images frequentes", impact: "Le besoin change: le client veut administrer le contenu.", recommendedAddOn: "CMS headless ou Firebase Auth/Firestore/Storage", costImpact: "Complexite + quotas services." }
    ],
    providerNotes: ["Cloudflare pour statique/CDN.", "Netlify si forms/previews sont le vrai critere.", "Vercel possible mais pas necessaire sans Next."],
    sourceIds: ["cloudflare", "netlify", "public-stable"]
  },
  "vitrine-editable": {
    starterId: "vitrine-editable",
    title: "Astro + CMS/headless, Firebase si admin maison",
    recommendedStack: ["Astro", "CMS/headless ou Firestore", "Storage images", "HTML prerendu ou SSR cible"],
    recommendedProvider: "firebase",
    rendering: "SSG avec contenu externe ou SSR cible",
    estimatedCost: "0 possible au prototype; Blaze/CMS payant selon edition, storage et build.",
    why: ["L'edition client est le vrai changement de complexite.", "Astro reste bon pour le SEO public.", "Firebase devient coherent si on cree un mini admin maison."],
    costLimits: ["Storage/Functions modernes demandent Blaze.", "CMS externe peut etre plus simple qu'un backoffice maison.", "Rebuilds et previews doivent etre prevus."],
    whenChange: ["Si contenu rare: revenir vitrine simple.", "Si comptes clients/workflow: passer app metier.", "Si catalogue dynamique lourd: Next/ISR ou SQL."],
    avoid: ["Construire un CMS maison sans besoin fort.", "Rendre le contenu public uniquement cote client.", "Oublier rules/permissions sur admin."],
    variants: [
      { id: "cms", label: "CMS headless", trigger: "Edition simple par client", impact: "Evite de coder un backoffice.", recommendedAddOn: "CMS + webhook rebuild", costImpact: "Plan CMS possible." },
      { id: "firebase-admin", label: "Admin maison", trigger: "Login admin, images, donnees Firestore", impact: "Firebase devient coherent.", recommendedAddOn: "Auth + Firestore + Storage", costImpact: "Blaze/quota reads/storage." }
    ],
    providerNotes: ["Firebase si admin/data maison.", "Cloudflare si contenu prerendu depuis CMS.", "Vercel si Next/preview dynamique devient central."],
    sourceIds: ["firebase", "cloudflare", "public-stable"]
  },
  "site-app-local": {
    starterId: "site-app-local",
    title: "Firebase pour app metier rapide",
    recommendedStack: ["Auth", "Firestore", "Storage", "Functions", "Hosting/App Hosting selon front"],
    recommendedProvider: "firebase",
    rendering: "App avec pages publiques selon besoin",
    estimatedCost: "Free tier possible, Blaze a prevoir des que Functions/Storage/App Hosting entrent en jeu.",
    why: ["Auth, donnees documentaires et backoffice sont le coeur du starter.", "Firebase accelere comptes, rules, storage et triggers.", "SQL arrive si reporting/audit/relations deviennent structurants."],
    costLimits: ["Firestore facture reads/writes.", "Rules ne filtrent pas les requetes a ta place.", "Budget alerts ne plafonnent pas les couts."],
    whenChange: ["Paiement/audit/reporting: SQL prioritaire.", "SEO public fort: isoler une partie Astro/Next prerendue.", "Gros fichiers publics: R2 peut completer."],
    avoid: ["Traiter une app metier comme une simple vitrine.", "Secrets ou roles dans le front.", "Firestore pour contraintes relationnelles fortes."],
    variants: [
      { id: "sql", label: "Reporting/audit", trigger: "Historique, roles, contraintes, exports", impact: "La source de verite doit devenir relationnelle.", recommendedAddOn: "PostgreSQL ou Firebase SQL Connect", costImpact: "Cloud SQL/Postgres ajoute un cout fixe." }
    ],
    providerNotes: ["Firebase est coherent par defaut.", "Cloudflare utile en complement edge/R2.", "SQL selon domaine."],
    sourceIds: ["firebase", "private-spa"]
  },
  "marketplace-locale": {
    starterId: "marketplace-locale",
    title: "Firebase pour annonces et moderation",
    recommendedStack: ["Auth", "Firestore", "Storage", "Functions", "Moderation"],
    recommendedProvider: "firebase",
    rendering: "App dynamique avec pages publiques a prerendre si SEO",
    estimatedCost: "Free tier possible au debut; reads/storage/functions a surveiller.",
    why: ["Firestore convient aux annonces/profils/messages simples.", "Auth et Storage couvrent vendeurs, photos et moderation.", "SQL devient utile si filtres/reporting se durcissent."],
    costLimits: ["Recherche et filtres avances peuvent demander moteur dedie/SQL.", "Photos/uploads augmentent Storage.", "Rules et moderation indispensables."],
    whenChange: ["Paiement: passer marketplace Stripe.", "SEO catalogue: Next/ISR ou pages prerender.", "Reporting/stock: SQL."],
    avoid: ["KV pour stock/transactions.", "Firestore sans modele de requetes clair.", "Paiement manuel sans audit."],
    variants: [
      { id: "payments", label: "Paiement", trigger: "Checkout, commissions, remboursements", impact: "Le starter change vers marketplace Stripe.", recommendedAddOn: "Stripe + SQL/Postgres", costImpact: "Frais Stripe + DB." }
    ],
    providerNotes: ["Firebase coherent pour annonces/moderation.", "SQL si marketplace devient transactionnelle."],
    sourceIds: ["firebase", "dynamic-seo"]
  },
  "marketplace-stripe": {
    starterId: "marketplace-stripe",
    title: "Stripe + SQL comme source de verite",
    recommendedStack: ["Next ou app fullstack", "Stripe", "PostgreSQL", "Webhooks", "Auth"],
    recommendedProvider: "vercel",
    rendering: "SSR/SSG selon pages publiques",
    estimatedCost: "Frais Stripe + hebergement + DB; eviter les architectures gratuites non auditees.",
    why: ["Paiements, commissions et remboursements demandent audit et contraintes.", "SQL est plus sain que Firestore comme source transactionnelle.", "Next devient coherent si SEO catalogue et app se melangent."],
    costLimits: ["Webhooks idempotents obligatoires.", "Logs/audit et reconciliation a prevoir.", "Gros assets hors Vercel si besoin."],
    whenChange: ["Pas de paiement: marketplace locale suffit.", "Auth Firebase possible en complement.", "Cloudflare R2 pour fichiers publics."],
    avoid: ["Paiement sans DB auditable.", "Firestore seul pour transactions complexes.", "Webhook non idempotent."],
    variants: [
      { id: "firebase-auth", label: "Auth Firebase", trigger: "Equipe deja Firebase", impact: "Firebase peut gerer identite sans etre la DB paiement.", recommendedAddOn: "Firebase Auth + Postgres", costImpact: "Auth/usage + DB." }
    ],
    providerNotes: ["Vercel/Next souvent coherent.", "Firebase en auxiliaire Auth.", "SQL prioritaire."],
    sourceIds: ["firebase", "dynamic-seo", "vercel"]
  },
  "app-metier-sql": {
    starterId: "app-metier-sql",
    title: "PostgreSQL / SQL prioritaire",
    recommendedStack: ["PostgreSQL", "Auth", "API/BFF", "Audit", "Reporting"],
    recommendedProvider: "vercel",
    rendering: "App fullstack selon pages publiques",
    estimatedCost: "DB managée payante probable; cout acceptable si la donnée est le produit.",
    why: ["Relations, contraintes, audit et reporting demandent SQL.", "Firebase peut aider pour Auth mais pas remplacer le modele relationnel.", "Le starter doit privilegier integrite et maintenance."],
    costLimits: ["Migrations et backups obligatoires.", "RBAC serveur.", "Observabilite et exports."],
    whenChange: ["Données documentaires simples: Firebase peut suffire.", "Dashboard purement interne: Vite SPA + API existante.", "Pages SEO: Astro/Next en front public."],
    avoid: ["NoSQL par habitude pour domaine relationnel.", "Pas de migrations.", "Permissions seulement cote client."],
    variants: [
      { id: "firebase-sql", label: "SQL Connect", trigger: "Rester dans ecosysteme Firebase", impact: "PostgreSQL typé avec Firebase.", recommendedAddOn: "Firebase SQL Connect + Cloud SQL", costImpact: "Cout Cloud SQL fixe apres essai." }
    ],
    providerNotes: ["Provider selon backend choisi.", "Firebase SQL Connect possible.", "Vercel coherent avec Next fullstack."],
    sourceIds: ["firebase", "vercel"]
  },
  "dashboard-admin": {
    starterId: "dashboard-admin",
    title: "Vite React pour interface privee",
    recommendedStack: ["Vite", "React", "Auth", "API/BFF", "Logs admin"],
    recommendedProvider: "cloudflare",
    rendering: "CSR / SPA privee",
    estimatedCost: "0 possible pour front statique; API/Auth selon backend.",
    why: ["SEO public non prioritaire.", "Vite donne une DX rapide pour UI dense.", "Le vrai choix depend de l'API et de l'auth existantes."],
    costLimits: ["Noindex/privé.", "Secrets jamais dans le front.", "RBAC et logs cote serveur."],
    whenChange: ["Si contenu public a ranker: Astro/Next.", "Si data Firebase: Firebase Hosting/Auth coherent.", "Si API edge simple: Cloudflare Workers."],
    avoid: ["Utiliser ce starter pour une landing SEO.", "Stocker roles/secrets dans React.", "Pas de journalisation admin."],
    variants: [
      { id: "firebase-data", label: "Admin Firebase", trigger: "Données dans Firestore", impact: "Firebase devient provider naturel.", recommendedAddOn: "Firebase Auth + Firestore", costImpact: "Reads/writes a surveiller." }
    ],
    providerNotes: ["Cloudflare suffit pour front statique.", "Firebase si les donnees sont Firebase.", "Provider suit le backend metier."],
    sourceIds: ["private-spa", "firebase", "cloudflare"]
  }
};

export function getStarterDecision(starterId: StarterId, providerId?: ProviderId): StarterDecision {
  const baseDecision = starterDecisionMatrix[starterId];
  if (!baseDecision) return baseDecision;
  if (!providerId) return baseDecision;

  const { stack } = getDynamicStackForCombo(starterId, providerId);
  const decision = { ...baseDecision };
  decision.recommendedStack = stack;
  decision.recommendedProvider = providerId;

  const providerNames: Record<ProviderId, string> = {
    cloudflare: "Cloudflare Pages/Workers",
    firebase: "Firebase Hosting/App Hosting",
    vercel: "Vercel",
    netlify: "Netlify",
    aws: "AWS Infra",
    local: "Docker Local"
  };
  const providerName = providerNames[providerId] || providerId;

  let frameworkName = "Astro";
  if (["site-app-local", "marketplace-locale", "marketplace-stripe", "app-metier-sql"].includes(starterId)) {
    if (providerId === "local" || providerId === "aws") {
      frameworkName = starterId === "app-metier-sql" ? "Vite React SPA / Node API" : "Next.js";
    } else {
      frameworkName = "Next.js";
    }
  } else if (starterId === "dashboard-admin") {
    frameworkName = "Vite React SPA";
  } else if (starterId === "vitrine-editable" && providerId === "firebase") {
    frameworkName = "Next.js";
  }

  decision.title = `${frameworkName} + ${providerName}`;

  if (providerId === "cloudflare") {
    decision.rendering = ["site-app-local", "marketplace-locale", "marketplace-stripe", "app-metier-sql"].includes(starterId) ? "SSR / Edge Runtime" : "SSG / HTML pré-rendu";
    decision.estimatedCost = "0 USD au démarrage; wrangler/workers/D1 payants selon volume.";
  } else if (providerId === "firebase") {
    decision.rendering = ["site-app-local", "marketplace-locale", "marketplace-stripe", "app-metier-sql"].includes(starterId) ? "SSR / App Hosting" : "SSG / Firebase Hosting";
    decision.estimatedCost = "0 USD possible, Blaze requis pour Functions/Storage/SQL Connect.";
  } else if (providerId === "vercel") {
    decision.rendering = "SSR / Next Serverless";
    decision.estimatedCost = "Gratuit pour prototypes Hobby, Pro à 20 USD/utilisateur/mois.";
  } else if (providerId === "netlify") {
    decision.rendering = "SSG / Netlify Functions";
    decision.estimatedCost = "Gratuit au démarrage, puis facturation selon bande passante.";
  } else if (providerId === "aws") {
    decision.rendering = "SSR / AWS Amplify / ECS";
    decision.estimatedCost = "Facturation à l'usage (RDS PostgreSQL payant requis d'office).";
  } else if (providerId === "local") {
    decision.rendering = "Docker Local run";
    decision.estimatedCost = "0 USD (infrastructure locale/serveur privé).";
  }

  decision.why = [...baseDecision.why];
  decision.costLimits = [...baseDecision.costLimits];

  decision.why = decision.why.map(sentence => {
    if (sentence.includes("Cloudflare")) {
      return sentence.replace("Cloudflare Pages", providerName).replace("Cloudflare", providerName);
    }
    if (sentence.includes("Firebase")) {
      return sentence.replace("Firebase", providerName);
    }
    if (sentence.includes("Vercel")) {
      return sentence.replace("Vercel", providerName);
    }
    return sentence;
  });

  decision.costLimits = decision.costLimits.map(sentence => {
    if (sentence.includes("Cloudflare") || sentence.includes("Pages") || sentence.includes("Workers")) {
      return sentence.replace("Cloudflare", providerName).replace("Pages", providerName).replace("Workers", providerName);
    }
    if (sentence.includes("Firebase") || sentence.includes("Blaze")) {
      return sentence.replace("Firebase", providerName).replace("Blaze", providerName);
    }
    if (sentence.includes("Vercel")) {
      return sentence.replace("Vercel", providerName);
    }
    return sentence;
  });

  return decision;
}
