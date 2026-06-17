import type { GenerationOptions, ProviderId, StarterPack } from "../shared/types.js";
import { getStarterDecision, providerKnowledgeBase, seoKnowledgeBase } from "../shared/recommendationEngine.js";
import { getDynamicStackForCombo } from "../shared/starterRegistry.js";

const designSkillsBundledPath = "Starter Pack Studio/templates/design-skills/skills";
const designSkillsRefreshCommand = "Copier le pack source vers templates/design-skills/skills avant de rebuild l'app";

function heading(title: string): string {
  return `# ${title}\n\n`;
}

function list(items: string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

function providerLabel(providerId: ProviderId): string {
  const labels: Record<ProviderId, string> = {
    cloudflare: "Cloudflare",
    firebase: "Firebase",
    vercel: "Vercel",
    netlify: "Netlify",
    aws: "AWS",
    local: "Local / custom infra"
  };
  return labels[providerId];
}

function bootstrapDocs(pack: StarterPack, options: GenerationOptions): string {
  const commands = pack.bootstrapCommands
    .filter((command) => !command.appliesToManagers || command.appliesToManagers.includes(options.packageManager))
    .map((command) => `- ${command.label}: \`${command.command} ${command.args.join(" ").replaceAll("{{projectName}}", options.projectName)}\``);

  if (commands.length === 0) {
    return "- Aucun bootstrap officiel configuré pour ce package manager.";
  }

  return commands.join("\n");
}

function databaseDocs(pack: StarterPack): string {
  if (!pack.database) {
    return "- Aucun choix DB specifique documente pour ce starter.";
  }

  return `## Choix base de donnees

**${pack.database.label}**  
${pack.database.summary}

### Firestore suffit si

${list(pack.database.whenFirestoreFits)}

### SQL devient utile si

${list(pack.database.whenSqlFits)}

### Attention

${pack.database.warning}`;
}

function databaseSummary(pack: StarterPack): string {
  if (!pack.database) {
    return "- DB: aucun choix specifique pour ce starter.";
  }

  return `- DB: **${pack.database.label}** - ${pack.database.summary}`;
}

function sitelinkMapSummary(pack: StarterPack): string {
  if (!pack.sitelinkMap) {
    return "Aucune map sitelinks specifique pour ce starter. Garder une navigation HTML claire et un sitemap propre.";
  }

  return pack.sitelinkMap.candidatePages
    .map((page) => `- \`${page.route}\` - **${page.label}**: ${page.role}`)
    .join("\n");
}

function sitelinkMapDocs(pack: StarterPack): string {
  if (!pack.sitelinkMap) {
    return `## Sitelinks Google

Google peut afficher des raccourcis sous le resultat principal quand le site a une structure claire. On ne peut pas les forcer, mais on peut aider Google avec des pages importantes, des liens HTML, un sitemap et des titles explicites.`;
  }

  const pages = pack.sitelinkMap.candidatePages
    .map(
      (page) => `### ${page.label}

- Route: \`${page.route}\`
- Role: ${page.role}
- Title: ${page.title}
- H1: ${page.h1}
- Meta description: ${page.metaDescription}
- Schema conseille: ${page.schema.join(", ")}
- Liens internes obligatoires: ${page.internalLinks.join(", ")}`
    )
    .join("\n\n");

  return `## Sitelinks Google

Les sitelinks sont les raccourcis que Google peut afficher sous le resultat principal, comme des pages principales du site. Google les choisit automatiquement: on ne peut pas garantir leur affichage, mais on peut preparer les bons signaux.

${pack.sitelinkMap.summary}

### Navigation principale

${list(pack.sitelinkMap.primaryNavigation)}

### Sections de home qui doivent lier les pages candidates

${list(pack.sitelinkMap.homepageSections)}

### Navigation footer

${list(pack.sitelinkMap.footerNavigation)}

### Pages candidates aux sitelinks

${pages}

### A eviter

${list(pack.sitelinkMap.avoid)}`;
}

function starterDecisionDocs(pack: StarterPack): string {
  const decision = getStarterDecision(pack.id);
  const variants = decision.variants
    .map((variant) => `- **${variant.label}**: ${variant.trigger}. ${variant.impact} Recommandation: ${variant.recommendedAddOn}. Cout/limite: ${variant.costImpact}`)
    .join("\n");

  return `## Verdict stack/provider

**${decision.title}**  
Rendu: ${decision.rendering}  
Cout estime: ${decision.estimatedCost}

### Stack recommandee

${list(decision.recommendedStack)}

### Pourquoi ce choix

${list(decision.why)}

### Cout / limites

${list(decision.costLimits)}

### Variantes qui changent le combo

${variants}

### Quand changer de combo

${list(decision.whenChange)}

### A eviter

${list(decision.avoid)}`;
}

function providerKnowledgeDocs(pack: StarterPack): string {
  const decision = getStarterDecision(pack.id);
  const providers = providerKnowledgeBase.filter((provider) => decision.sourceIds.includes(provider.id));
  if (!providers.length) {
    return "## Providers\n\n- Aucune fiche provider liee a ce starter.";
  }

  return `## Providers et couts a surveiller

${providers
  .map(
    (provider) => `### ${provider.label}

${provider.summary}

- Pricing: ${provider.pricing}
- Bon pour: ${provider.bestFor.join(", ")}
- A eviter pour: ${provider.avoidFor.join(", ")}
- Points de vigilance: ${provider.watch.join(", ")}
- Sources: ${provider.sources.join(", ")}`
  )
  .join("\n\n")}`;
}

function seoKnowledgeDocs(pack: StarterPack): string {
  const decision = getStarterDecision(pack.id);
  const seoRules = seoKnowledgeBase.filter((seo) => decision.sourceIds.includes(seo.id));
  if (!seoRules.length) {
    return "## Rendu et SEO\n\n- Aucune regle SEO specifique liee a ce starter.";
  }

  return `## Rendu et SEO

${seoRules
  .map(
    (seo) => `### ${seo.label}

- Rendu par defaut: ${seo.defaultRendering}
- Bon pour: ${seo.bestFor.join(", ")}
- A eviter pour: ${seo.avoidFor.join(", ")}
- Exigences Google: ${seo.googleRequirements.join(", ")}
- Artifacts requis: ${seo.requiredArtifacts.join(", ")}
- Anti-patterns: ${seo.antiPatterns.join(", ")}
- Sources: ${seo.sources.join(", ")}`
  )
  .join("\n\n")}`;
}

export function renderFile(path: string, pack: StarterPack, options: GenerationOptions): string {
  const { stack: dynamicStack } = getDynamicStackForCombo(pack.id, options.providerId);
  const stack = list(dynamicStack);
  const badChoices = list(pack.badChoices);
  const alternatives = list(pack.alternatives);
  const provider = providerLabel(options.providerId);

  if (path === "README.md") {
    return `${heading(options.projectName)}
Starter généré avec Starter Pack Studio.

## Type de projet

${pack.label}

## Intention

${pack.intent}

## Exemple proche

${pack.example}

## Stack recommandée

${stack}

## Provider choisi

${provider}

${databaseSummary(pack)}

## Commandes

\`\`\`bash
${options.packageManager} install
${options.packageManager} run dev
${options.packageManager} run build
\`\`\`

## Fichiers à lire avant de coder

- docs/ARCHITECTURE.md
- docs/DECISION-MATRIX.md
- docs/SKILLS.md
- docs/SEO.md
- SECURITY.md
- @agent.md
`;
  }

  if (path === "@agent.md") {
    return `${heading("Instructions agent")}
## Mission

Maintenir un projet de type **${pack.label}** sans le transformer par réflexe en stack plus lourde.

## Règles

- Lire \`docs/ARCHITECTURE.md\` avant les gros changements.
- Mettre à jour \`docs/DECISION-MATRIX.md\` si la stack change.
- Ne jamais déplacer une page publique SEO vers du rendu client-only sans justification.
- Si l'objectif SEO inclut des sitelinks Google, ne pas livrer une landing one-page: créer de vraies routes HTML pré-rendues.
- Lier les pages candidates depuis le menu principal, la home et le footer avec des liens HTML descriptifs.
- Éviter les raccourcis de navigation uniquement déclenchés par JavaScript.
- Ne jamais ajouter paiement, Auth, SQL ou CMS maison sans documenter le risque.
- Garder \`SECURITY.md\` à jour pour Auth, rôles, uploads, webhooks et secrets.
- Préférer des changements petits, testés, et alignés avec ce starter.

## Stack actuelle

${stack}

${starterDecisionDocs(pack)}

## Pages candidates aux sitelinks Google

${sitelinkMapSummary(pack)}

## Skills IA design

Les skills UI/UX sont installes dans:

\`\`\`text
.agents/skills
\`\`\`

Source embarquee dans l'app:

\`\`\`text
${designSkillsBundledPath}
\`\`\`
`;
  }

  if (path === "docs/ARCHITECTURE.md") {
    return `${heading("Architecture")}
## Décision

Ce projet utilise le starter **${pack.label}**.

## Pourquoi

${pack.intent}

## Stack recommandée

${stack}

## Provider choisi

${provider}

${starterDecisionDocs(pack)}

${databaseSummary(pack)}

${providerKnowledgeDocs(pack)}

${sitelinkMapDocs(pack)}

## Alternatives valables

${alternatives}

## Mauvais choix à éviter

${badChoices}

## Notes

${list(pack.notes)}
`;
  }

  if (path === "docs/DECISION-MATRIX.md") {
    return `${heading("Decision matrix")}
## Quand choisir ce starter

${pack.intent}

## Alternatives

${alternatives}

${databaseSummary(pack)}

${starterDecisionDocs(pack)}

${providerKnowledgeDocs(pack)}

## Mauvais choix

${badChoices}

## Bootstrap officiel à jour

${bootstrapDocs(pack, options)}

## Règle de bascule

Si le besoin réel dépasse cette catégorie, changer de starter avant d'accumuler de la dette.
`;
  }

  if (path === "docs/SEO.md") {
    return `${heading("SEO")}
## Principe

Le contenu public important doit être rendu dans le HTML initial ou pré-rendu. Éviter les pages vides qui chargent les textes principaux uniquement côté client.

${seoKnowledgeDocs(pack)}

${sitelinkMapDocs(pack)}

## Checklist

- Title unique par page.
- Meta description utile.
- Canonical propre.
- Open Graph.
- Sitemap.
- Robots.
- H1 unique.
- Images optimisées avec dimensions et \`alt\`.
- Données structurées quand pertinent.
- Pages de filtres infinis en \`noindex\` si faible valeur.
- Search Console après mise en ligne.

## Attention

Une SPA privée peut ignorer le SEO. Une page publique qui doit ranker ne doit pas être traitée comme une SPA privée.
`;
  }

  if (path === "docs/SKILLS.md") {
    return `${heading("Skills IA design")}
## Objectif

Ce projet embarque les skills UI/UX locaux pour que les agents puissent polir l'interface avec une direction visuelle claire, precise et reutilisable.

## Installation automatique

Starter Pack Studio copie automatiquement son pack embarque dans chaque projet.

Source embarquee dans l'application:

\`\`\`text
${designSkillsBundledPath}
\`\`\`

Destination dans ce projet:

\`\`\`text
.agents/skills
\`\`\`

## Mise a jour du pack embarque

\`\`\`text
${designSkillsRefreshCommand}
\`\`\`

## Utilisation conseillee

- Lire \`@agent.md\` avant de modifier l'UI.
- Choisir un skill selon le type d'interface: SaaS propre, dashboard technique, landing premium, refonte existante, motion, etc.
- Garder \`_shared\` avec les autres skills: c'est le socle commun.
- Ne pas melanger plusieurs directions visuelles contradictoires dans la meme page.
`;
  }

  if (path === "docs/FIREBASE.md") {
    return `${heading("Firebase")}
## Décision rapide

- Firebase Hosting: statique, SPA, assets, Astro export.
- Firebase App Hosting: Next.js SSR/fullstack.
- Firebase Auth: identité utilisateur.
- App Check: attestation client, ne remplace pas Auth.
- Firestore: documents, realtime, organisation simple.
- Firebase SQL Connect: PostgreSQL managé, opérations typées. Les commandes Firebase utilisent encore souvent \`dataconnect\`.
- Cloud Functions: triggers et jobs courts.
- Cloud Run: API/workers plus contrôlés.

## Garde-fous

- Tester les Security Rules.
- Vérifier les rôles côté serveur ou via rules strictes.
- Ne jamais exposer les secrets Admin SDK.
- Documenter les collections/tables critiques.
- Logger les actions admin importantes.
`;
  }

  if (path === "docs/CLOUDFLARE.md") {
    return `${heading("Cloudflare")}
## Produits utiles

- Pages: sites statiques, SPA, frontends.
- Workers: APIs edge, fonctions, BFF légers.
- D1: SQL serverless léger.
- R2: stockage objet.
- KV: données clé/valeur.
- Turnstile: anti-abus/captcha.

## Commandes actuelles à connaître

\`\`\`bash
npm create cloudflare@latest -- --platform=pages
npm create cloudflare@latest -- my-worker
npx wrangler dev
npx wrangler deploy
\`\`\`

## Quand choisir Cloudflare

- Vitrine ou dashboard statique avec coût bas.
- Besoin edge/Workers.
- Alternative à Firebase pour une infra moins couplée Google.
- D1/R2/KV adaptés au besoin.
`;
  }

  if (path === "docs/STRIPE.md") {
    return `${heading("Stripe")}
## Principe

Stripe Checkout suffit pour un paiement simple. Stripe Connect est nécessaire quand un tiers vendeur/prestataire reçoit l'argent.

## Non négociable

- Le retour \`success_url\` ne prouve pas le paiement.
- Les webhooks signés sont la source de vérité.
- Stocker les événements Stripe avec idempotence.
- Prévoir remboursements, litiges, commissions et onboarding vendeur.

## Tables minimales

- orders
- payments
- stripe_events
- payouts
- refunds
- disputes
`;
  }

  if (path === "docs/DATA-MODEL.md") {
    return `${heading("Data model")}
## Principe

Choisir le stockage selon la forme réelle des données.

- Firestore: documents, realtime, organisation simple, offline.
- PostgreSQL / SQL Connect: relations, contraintes, transactions, reporting, audit.
- D1: SQL edge léger côté Cloudflare.

${databaseDocs(pack)}

## À documenter

- Entités.
- Relations.
- Contraintes.
- Index.
- Données sensibles.
- Stratégie backup/export.
`;
  }

  if (path === "docs/RBAC.md") {
    return `${heading("RBAC")}
## Principe

Auth n'est pas autorisation. Les rôles doivent être vérifiés côté serveur, dans les rules, ou dans les opérations SQL.

## Rôles typiques

- owner
- admin
- editor
- staff
- customer
- viewer

## Checklist

- Aucun rôle critique seulement dans l'UI.
- Tests d'isolation tenant si multi-tenant.
- Audit logs pour actions sensibles.
`;
  }

  if (path === "SECURITY.md") {
    return `${heading("Security")}
## Principes

- Aucun secret réel dans le repository.
- App Check ne remplace pas Auth.
- Auth ne remplace pas les permissions.
- Les uploads doivent limiter type, taille et droits.
- Nettoyer le rich text.
- Vérifier les signatures webhook.
- Ne jamais exécuter de template distant non vérifié.

## Production checklist

- Variables d'environnement documentées.
- Rules Firebase ou policies DB testées.
- Headers sécurité.
- Logs admin/audit.
- Sauvegarde/export.
`;
  }

  if (path === ".env.example") {
    let content = `# Public URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
`;
    if (options.providerId === "firebase") {
      content += `
# Firebase Web Client (Public Keys)
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Firebase Admin SDK (Server Only)
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nxxxxx\\n-----END PRIVATE KEY-----\\n"
`;
    } else if (options.providerId === "cloudflare") {
      content += `
# Cloudflare Credentials (Server Only)
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_API_TOKEN=your-api-token
`;
    }

    if (pack.id === "marketplace-stripe") {
      content += `
# Stripe (Server Only)
STRIPE_SECRET_KEY=sk_test_51xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
`;
    }

    if (["site-app-local", "marketplace-locale", "marketplace-stripe", "app-metier-sql"].includes(pack.id)) {
      content += `
# Database (Server Only)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/appdb
`;
    }

    return content;
  }

  // Firebase Config & Rules Files
  if (path === "apphosting.yaml") {
    return `runConfig:
  minInstances: 0
  maxInstances: 10
  concurrency: 80
  cpu: 1
  memoryMiB: 512
env:
  - variable: NEXT_PUBLIC_SITE_URL
    value: "https://\${options.projectName}.web.app"
`;
  }

  if (path === "firebase.json") {
    return `{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
`;
  }

  if (path === ".firebaserc") {
    return `{
  "projects": {
    "default": "${options.projectName}-prod"
  }
}
`;
  }

  if (path === "firestore.rules") {
    return `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null && request.auth.token.admin == true;
    }
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
`;
  }

  if (path === "storage.rules") {
    return `rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
`;
  }

  // Cloudflare Wrangler Config
  if (path === "wrangler.toml") {
    return `name = "${options.projectName}"
compatibility_date = "2026-06-17"
pages_build_output_dir = "dist"

[vars]
ENVIRONMENT = "production"

# KV namespaces bindings (optional)
# [[kv_namespaces]]
# binding = "KV_DATA"
# id = "xxxxx"

# D1 Serverless SQL databases bindings (optional)
# [[d1_databases]]
# binding = "DB"
# database_name = "${options.projectName}-db"
# database_id = "xxxxx"

# R2 Object storage buckets bindings (optional)
# [[r2_buckets]]
# binding = "ASSETS_BUCKET"
# bucket_name = "${options.projectName}-assets"
`;
  }

  // Netlify Configuration
  if (path === "netlify.toml") {
    return `[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
`;
  }

  // Vercel Configuration
  if (path === "vercel.json") {
    return `{
  "version": 2,
  "cleanUrls": true,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
`;
  }

  // AWS Configuration
  if (path === "sst.config.ts") {
    return `/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "\${options.projectName}",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const site = new sst.aws.Nextjs("MyWeb");
    
    return {
      SiteUrl: site.url,
    };
  },
});
`;
  }

  // Docker files
  if (path === "Dockerfile") {
    return `FROM node:20-alpine AS base
WORKDIR /app
COPY package.json pnpm-lock.yaml* package-lock.json* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile || npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
`;
  }

  if (path === "docker-compose.yml") {
    return `version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/appdb
      - NODE_ENV=production
    depends_on:
      - db
  db:
    image: postgres:15-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=appdb
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
`;
  }

  // Guides & documentation files
  if (path === "docs/VERCEL.md") {
    return `${heading("Deploiement Vercel")}
## Deploiement rapide

Ce projet est configure pour se deployer sur Vercel de maniere fluide.

## Commandes utiles

- Installer la CLI Vercel : \`npm install -g vercel\`
- Lancer un deploiement de test : \`vercel\`
- Deploiement en production : \`vercel --prod\`

## Variables d'environnement

Ajoutez vos variables d'environnement dans le dashboard de votre projet Vercel :
- \`DATABASE_URL\` (si base de donnees Neon PostgreSQL utilisee)
- \`STRIPE_SECRET_KEY\` (si marketplace Stripe utilisee)
`;
  }

  if (path === "docs/NETLIFY.md") {
    return `${heading("Deploiement Netlify")}
## Deploiement rapide

Ce projet utilise Netlify pour le deploiement et la gestion des formulaires.

## Fonctionnalites integrees

- Netlify Previews pour valider vos modifications de branches.
- Netlify Forms pour la reception directe des formulaires sans API externe.
`;
  }

  if (path === "docs/AWS.md") {
    return `${heading("Infrastructure AWS")}
## Deploiement AWS

L'infrastructure peut etre deployee en utilisant SST (Serverless Stack) ou Docker sur ECS Fargate.

## Services configures

- **Hosting/Amplify** pour l'application Web.
- **RDS PostgreSQL** pour le stockage relationnel et l'audit.
- **S3** pour le stockage des fichiers publics et des templates.
- **Cognito** pour la gestion de l'authentification.
`;
  }

  if (path === "docs/DOCKER.md") {
    return `${heading("Docker Local Guide")}
## Execution locale avec Docker

Cette configuration permet d'executer le frontend, le backend et PostgreSQL dans des conteneurs isoles.

## Commandes

- Lancer les services : \`docker-compose up --build -d\`
- Arreter les services : \`docker-compose down\`
- Voir les logs : \`docker-compose logs -f\`
`;
  }

  if (path === "docs/ORDER-WORKFLOW.md") {
    return `${heading("Workflow Commande & Panier")}
## Cycle de vie d'une commande

Voici la machine d'etat qui regit le traitement des paniers et des commandes :

1. **CART_OPEN** : Panier actif en cours de modification par le client.
2. **CHECKOUT_PENDING** : Validation du panier en cours, reservation temporaire des stocks.
3. **PAYMENT_WAITING** : Attente de la confirmation Stripe (webhook).
4. **ORDER_PAID** : Paiement valide, en attente de preparation.
5. **DELIVERED** / **COMPLETED** : Commande reçue par le client.
6. **CANCELLED** / **REFUNDED** : Commande annulee et remboursee.
`;
  }

  if (path === "docs/CONTENT-MODEL.md") {
    return `${heading("Modele de Contenu")}
## Schema editorial

Ce modele de contenu definit comment sont structures les textes et les images du site :

- **Page d'accueil** : Sections marketing, hero, CTA, témoignages.
- **Services** : Nom, description courte, illustration, tarifs indicatifs.
- **Realisations** : Galerie d'images, titre du projet, date, descriptif technique.
- **Contacts** : Adresse locale, horaires d'ouverture, coordonnees GPS.
`;
  }

  if (path === "docs/CMS.md") {
    return `${heading("Configuration CMS Headless")}
## Connexion CMS

Ce projet recupere son contenu depuis un CMS headless externe (ex: Sanity, Strapi, Directus).

## Webhooks

Lorsqu'un redacteur modifie un contenu sur le CMS, un webhook doit appeler l'URL de rebuild du provider (Vercel Build Hook, Netlify Build Hook) pour generer de nouvelles pages HTML statiques.
`;
  }

  if (path === "docs/PAYMENT-STATE-MACHINE.md") {
    return `${heading("Machine d'Etats Paiement")}
## Securite des flux financiers

- **Non-negotiable** : Le retour d'URL Stripe n'est pas une preuve de paiement.
- **Source de verite** : Les webhooks Stripe signes.
- **Idempotence** : Chaque webhook reçu doit etre verifie dans la table \`stripe_events\` pour eviter les doublons.
`;
  }

  if (path === "docs/RUNBOOK.md") {
    return `${heading("Runbook Operations & Base de donnees")}
## Migrations & Backups

Ce document detaille les routines d'exploitation de la base SQL :

- **Migrations** : Executer les scripts de schema via l'ORM (Drizzle/Prisma) lors de chaque deploiement.
- **Backups** : Automatiser la sauvegarde pg_dump toutes les nuits vers un bucket prive (S3/R2).
- **Incident** : Routine de restauration rapide en cas de corruption de donnees.
`;
  }

  if (path === "docs/API-CONTRACT.md") {
    return `${heading("Contrat d'API & Validation")}
## Specifications REST/BFF

- **Format** : Toutes les requetes et reponses utilisent le format JSON.
- **Validation** : Validation des payload en entree avec Zod ou des schemas TypeScript.
- **Erreurs** : Reponses structures avec code d'erreur et message explicite pour l'UI.
`;
  }

  if (path === "docs/ADMIN-SCOPE.md") {
    return `${heading("Scope Administration & RBAC")}
## Rôles Admin

- **Actions Audit** : Toutes les actions d'administration (modification de compte, moderation, suppression, remboursement) doivent être journalisees.
- **Verifications** : Les rôles sont verifies a chaque transaction côté serveur et dans les regles de securite de la base de donnees.
`;
  }

  if (path === "docs/FIRESTORE-RULES.md") {
    return `${heading("Firestore Rules Checklist")}
## Regles de securite Firestore

- **Admin access** : Seuls les comptes avec la revendication (claim) \`admin: true\` peuvent modifier le catalogue.
- **Client access** : Les utilisateurs authentifies peuvent modifier leur profil et leurs favoris.
- **Indexes** : Pensez a deployer les index composites dans \`firestore.indexes.json\`.
`;
  }

  return `${heading(path.replace(/^docs\//, "").replace(/\.md$/, ""))}
## Contexte

Starter: ${pack.label}

## Intention

${pack.intent}

## À compléter

- Responsabilités.
- Données.
- Rôles.
- Risques.
- Tests d'acceptation.
`;
}
