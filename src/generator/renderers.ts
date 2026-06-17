import type { GenerationOptions, ProviderId, StarterPack } from "../shared/types.js";

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

export function renderFile(path: string, pack: StarterPack, options: GenerationOptions): string {
  const stack = list(pack.recommendedStack);
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
- Ne jamais ajouter paiement, Auth, SQL ou CMS maison sans documenter le risque.
- Garder \`SECURITY.md\` à jour pour Auth, rôles, uploads, webhooks et secrets.
- Préférer des changements petits, testés, et alignés avec ce starter.

## Stack actuelle

${stack}

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

${databaseSummary(pack)}

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
    return `# Public
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Cloudflare
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_API_TOKEN=

# Server only
DATABASE_URL=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
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
