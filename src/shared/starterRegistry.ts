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

export const starterPacks: StarterPack[] = [
  {
    id: "landing-page",
    label: "Landing page",
    shortLabel: "Landing",
    intent: "Convertir vers une action precise: appel, devis, inscription, achat simple.",
    example: "Une page pour vendre une offre ou capter des leads.",
    defaultMode: "official-bootstrap",
    recommendedStack: ["Astro", "Content files", "Cloudflare Pages ou Firebase Hosting", "SEO statique"],
    stackTechIds: ["astro", "cloudflare", "firebase", "seo"],
    database: {
      primary: "none",
      label: "Pas de DB",
      summary: "Une landing n'a pas besoin de base de donnees. Un formulaire peut partir vers email, CRM, Forms ou une petite collection leads.",
      whenFirestoreFits: ["Leads simples", "Messages de formulaire", "Anti-perte si email indisponible"],
      whenSqlFits: ["Tunnel d'achat", "Reporting commercial", "CRM relationnel"],
      warning: "Ne pas ajouter un backoffice ou une DB juste pour trois textes qui changent rarement."
    },
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
    recommendedStack: ["Astro", "Markdown/MDX", "Cloudflare Pages", "Sitemap", "Schema.org LocalBusiness"],
    stackTechIds: ["astro", "cloudflare", "netlify", "seo"],
    database: {
      primary: "none",
      label: "Fichiers d'abord",
      summary: "Une vitrine simple se vend mieux avec contenu en fichiers et SEO propre. DB seulement si le client modifie souvent.",
      whenFirestoreFits: ["Actualites legeres", "Realisations modifiables", "Demandes de contact centralisees"],
      whenSqlFits: ["Catalogue filtre", "Reservations", "Historique client exploitable"],
      warning: "CMS/DB inutile si le client modifie deux fois par an."
    },
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
