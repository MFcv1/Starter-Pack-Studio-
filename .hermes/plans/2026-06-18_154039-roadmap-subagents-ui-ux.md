# Starter Pack Studio — Roadmap Produit, Agents Spécialisés et Refonte UI/UX

> Roadmap créée après audit multi-agent. Objectif: appliquer progressivement les améliorations nécessaires sans surcharger l'UI ni surengineerer le produit.

## Contexte

L'app actuelle fonctionne et compile. Une première couche qualité a déjà été ajoutée:

- `docs/SEO-STANDARD.md`
- `docs/PAGE-STRUCTURE.md`
- `docs/ROUTES-SEO.md`
- tests `tests/quality-contracts.mjs`
- correction des rewrites SPA pour starters publics SSG.

Le besoin maintenant: transformer Starter Pack Studio en outil plus concret et plus épuré:

1. Moins de blabla UI.
2. Plus de verdict, stack et fichiers générés.
3. Décisions starter/provider strictes.
4. Vrais artefacts générés, pas seulement des docs.
5. Audits spécialisés internes type Eve, mais cachés derrière un résumé qualité simple.
6. Polish UI/UX type workstation: sobre, dense, utile, proche de Hermes Agent.

> Note: le skill `glossy-modern` demandé n'a pas été trouvé dans le repo. Les skills intégrés les plus proches lus et utilisés pour la direction UI sont `technical-ui` et `monochrome-ui`.

---

## Agents spécialisés positionnés

| Agent | Responsabilité principale | Visible dans l'UI ? |
|---|---|---|
| Agent Architecture Décisionnelle | Matrice starter/provider, combos recommandés/interdits, verdict | Non, résumé `Verdict` visible |
| Agent Génération Artefacts | Générer vraies pages, configs, rules, schema, webhooks | Non, résultat via `Fichiers générés` |
| Agent QA Contracts | Tests, snapshots, quality gates | Non, résumé qualité |
| Agent Firebase Sécurité | Firebase Hosting/Auth/Firestore/Storage/Rules | Non, alertes sécurité |
| Agent Payments / SQL | Stripe, webhooks, SQL, audit, idempotence | Non, alertes paiement |
| Agent SEO Structure | routes, sitemap, metadata, sitelinks, index/noindex | Non, statut SEO |
| Agent UX Produit | Refonte UI, réduction du bruit, design workstation | Indirectement, via interface |
| Agent Orchestration IA | Structure type Eve, contrats d'audit, rapport qualité | Non |
| Agent Release Desktop | Electron build, packaging, chemins templates | Non |

Principe: les agents ne deviennent pas un produit visible. L'utilisateur voit seulement:

```txt
Qualité du starter
SEO       OK
Provider  OK
Security  Attention
Files     OK
```

---

# Phase 0 — Stabiliser la base actuelle

**Objectif:** garder ce qui a été fait, vérifier que la base reste saine.

**Agent propriétaire:** Agent QA Contracts

**Fichiers:**

- `package.json`
- `tests/quality-contracts.mjs`
- `src/generator/renderers.ts`
- `src/shared/starterRegistry.ts`

**Tâches:**

1. Garder `npm test` comme commande qualité de base.
2. Vérifier que les docs SEO contractuelles restent générées.
3. Vérifier que les configs SSG publiques n'ont pas de fallback SPA global.
4. Ajouter un rapport court dans le README dev si nécessaire.

**Acceptation:**

- `npm test` passe.
- Les starters publics génèrent les docs SEO strictes.
- `dashboard-admin` reste `noindex`.

---

# Phase 1 — Refonte UI/UX épurée type Hermes Agent

**Objectif:** réduire drastiquement la surcharge cognitive. Mettre en avant le concret: stack, fichiers, génération, logs.

**Agent propriétaire:** Agent UX Produit

**Direction design:** `technical-ui` + `monochrome-ui`.

## IA cible

Vue Generate:

1. Topbar compacte.
2. Starter selector compact.
3. `Stack / Files` comme panneau central prioritaire.
4. `Logs / Validation` sous le panneau central.
5. Inspector à droite:
   - Générer
   - Provider compact
   - Décision repliée
   - Options avancées repliées
   - Sources repliées

## Composants à transformer

| Actuel | Action |
|---|---|
| `ProjectGoalPanel` | compacter en segmented control |
| `HeaderBar` | réduire en topbar dense |
| `RecommendationPanel` | fusionner dans `DecisionSummary` |
| `DecisionPanel` | fusionner dans `DecisionSummary` |
| `GoogleArchitecturePanel` | replier sous `SEO details` |
| `ComboPanel` | replier sous `Options avancées` |
| `KnowledgePanel` | replier ou déplacer vers Library |
| `StackPanel` | devenir panneau central `Stack / Files` |
| `GeneratorPanel` | inspector principal, CTA clair |
| `LogPanel` | style console/workstation |

## Style tokens cibles

- Canvas blanc/gris très clair.
- Sidebar gris léger.
- Panels plats avec border.
- Pas de gradient body.
- Pas de glassmorphism.
- Pas de shadow lourde.
- Accent couleur minimal.
- Mono uniquement pour chemins/logs/versions.
- Copy court et opérationnel.

## Critères d'acceptation

- Premier écran: starter + stack + fichiers + générer visibles.
- Aucun long paragraphe explicatif visible par défaut.
- Détails architecture/google/provider repliés.
- Le bouton générer est évident.
- L'interface ressemble à une workstation, pas à une landing SaaS.

---

# Phase 2 — Matrice stricte starter/provider

**Objectif:** empêcher les mauvais combos plutôt que seulement les expliquer.

**Agent propriétaire:** Agent Architecture Décisionnelle

**Fichiers:**

- `src/shared/types.ts`
- `src/shared/starterRegistry.ts`
- `src/shared/recommendationEngine.ts`
- `src/renderer/components/ProviderPanel.tsx`
- `tests/provider-matrix-contracts.mjs`

## Tâches

1. Ajouter une matrice canonique `starterProviderMatrix`.
2. Pour chaque combo, déclarer:
   - `recommended`
   - `good`
   - `possible`
   - `avoid`
   - `blocked`
3. Bloquer ou désactiver les combos incohérents.
4. Afficher un verdict court:
   - recommandé,
   - possible avec attention,
   - à éviter,
   - bloqué.

## Critères d'acceptation

- Landing/vitrine statique ne recommande pas Firebase/DB.
- Stripe marketplace favorise SQL + webhooks.
- Dashboard admin ne promet pas SEO/sitelinks.
- Aucun fallback silencieux `aws/local -> vercel/netlify`.
- Tests dédiés passent.

---

# Phase 3 — Générer de vrais artefacts

**Objectif:** passer de docs générées à starters réellement exploitables.

**Agent propriétaire:** Agent Génération Artefacts

**Fichiers:**

- `src/generator/core.ts`
- `src/generator/renderers.ts`
- `src/generator/artifacts/*` à créer
- `templates/starters/*` à créer
- `tests/generated-artifacts-contracts.mjs`

## Artefacts par famille

### Public SEO / Astro

- `src/pages/index.astro`
- `src/pages/services.astro`
- `src/pages/contact.astro`
- `src/pages/a-propos.astro`
- `src/layouts/BaseLayout.astro`
- `src/components/Header.astro`
- `src/components/Footer.astro`
- `public/robots.txt`
- sitemap ou route sitemap
- metadata/canonical/JSON-LD exemples sobres.

### App / Dashboard

- routes publiques minimales si nécessaires.
- routes privées noindex.
- login/admin/app skeleton.
- RBAC minimal.

### Stripe / SQL

- schema SQL minimal.
- webhook exemple.
- env Stripe.
- docs reconciliation/idempotence.

## Critères d'acceptation

- Le projet généré build.
- Les fichiers listés dans `Stack / Files` existent vraiment.
- Les routes publiques sont crawlables.
- Les routes privées sont noindex.
- `.env.example` correspond au starter.

---

# Phase 4 — Quality audits internes inspirés d'Eve

**Objectif:** créer des audits spécialisés internes sans exposer une UI agentique complexe.

**Agent propriétaire:** Agent Orchestration IA

**Structure V1 recommandée:**

```txt
src/quality/
  auditTypes.ts
  auditOrchestrator.ts
  audits/
    providerFit.ts
    generatedFiles.ts
    seoGoogle.ts
    securityRules.ts
    stripeSql.ts
    uiPolish.ts
```

**Contrat commun:**

```ts
type AuditStatus = "pass" | "warning" | "fail";

interface AuditFinding {
  severity: "info" | "warning" | "error";
  code: string;
  message: string;
  recommendation?: string;
  filePath?: string;
}

interface AuditResult {
  agentId: string;
  status: AuditStatus;
  summary: string;
  findings: AuditFinding[];
}
```

## UX visible

Dans la modal de génération:

```txt
Qualité du starter
SEO        OK
Provider   OK
Files      OK
Security   Attention
Stripe/SQL Non applicable
```

Et générer:

```txt
docs/QUALITY-REPORT.md
```

## Critères d'acceptation

- Les audits ne modifient pas automatiquement le projet en V1.
- Ils produisent un rapport lisible.
- L'UI affiche un résumé simple.
- Pas de page `Agents` dans l'UI principale.

---

# Phase 5 — Firebase Security Pack

**Objectif:** produire Firebase seulement quand c'est pertinent et avec rules non dangereuses.

**Agent propriétaire:** Agent Firebase Sécurité

**Fichiers:**

- `src/generator/artifacts/firebase.ts`
- `templates/firebase/firestore.rules`
- `templates/firebase/storage.rules`
- `templates/firebase/firestore.indexes.json`
- `tests/firebase-contracts.mjs`

## Tâches

1. Adapter `firebase.json` selon runtime.
2. Générer rules par starter.
3. Ajouter storage rules si uploads.
4. Générer indexes si queries documentées.
5. Mettre `SECURITY.md` en cohérence.

## Critères d'acceptation

- Pas de `allow read, write: if true`.
- Rules présentes dès que Firestore est utilisé.
- Storage rules présentes dès que Storage/uploads sont utilisés.
- Tests détectent rules permissives.

---

# Phase 6 — Stripe + SQL Pack

**Objectif:** rendre les starters transactionnels sérieux.

**Agent propriétaire:** Agent Payments / SQL

**Fichiers:**

- `src/generator/artifacts/stripe.ts`
- `templates/sql/schema.sql`
- `templates/sql/migrations/001_init.sql`
- `templates/stripe/webhook.ts`
- `tests/stripe-sql-contracts.mjs`

## Tâches

1. Générer schema minimal:
   - users
   - sellers
   - orders
   - order_items
   - payments
   - stripe_events
   - refunds
   - disputes
   - payouts
   - audit_logs
2. Générer webhook avec signature + idempotence.
3. Interdire le discours `success_url = paiement validé`.
4. Ajouter docs Connect/reconciliation.

## Critères d'acceptation

- `marketplace-stripe` génère SQL + webhook + docs.
- Tests vérifient idempotence et absence de faux raccourci paiement.

---

# Phase 7 — Snapshots et contrats de génération

**Objectif:** éviter les régressions silencieuses.

**Agent propriétaire:** Agent QA Contracts

**Fichiers:**

- `tests/snapshots/*`
- `tests/render-snapshots.mjs`
- `tests/generated-artifacts-contracts.mjs`

## Combinaisons minimales

- `landing-page + cloudflare`
- `site-vitrine-simple + cloudflare`
- `vitrine-editable + firebase`
- `marketplace-locale + firebase`
- `marketplace-stripe + vercel`
- `app-metier-sql + local`
- `dashboard-admin + cloudflare`

## Critères d'acceptation

- Snapshots stables.
- Pas de dates/chemins locaux dans snapshots.
- Chaque changement de génération est explicite.

---

# Phase 8 — Release desktop propre

**Objectif:** garantir que le build Electron embarque bien templates, skills, artefacts et docs.

**Agent propriétaire:** Agent Release Desktop

**Fichiers:**

- `package.json`
- `electron-builder` config
- `src/main/main.ts`
- `templates/**/*`
- `release/*`

## Critères d'acceptation

- App packagée lance correctement.
- Génération depuis `.app` trouve les templates.
- Smoke test DMG/app réussit.
- Aucun chemin dev-only cassé.

---

## Ordre recommandé d'exécution

1. UI/UX simplification — impact immédiat sur compréhension.
2. Matrice starter/provider stricte.
3. Artefacts réels pour starters publics SEO.
4. Quality audits internes + `QUALITY-REPORT.md`.
5. Firebase Security Pack.
6. Stripe + SQL Pack.
7. Snapshots complets.
8. Release desktop.

---

## Première PR/changement recommandé

Commencer par une refonte UI sans changer la génération:

- Réordonner `App.tsx`.
- Mettre `StackPanel` en premier.
- Compacter `ProjectGoalPanel`.
- Déplacer `GoogleArchitecturePanel`, `ComboPanel`, `KnowledgePanel` dans des accordéons.
- Mettre `GeneratorPanel` en premier dans l'inspector.
- Remplacer le style glossy par une base flat/technical.

Pourquoi: cela répond directement au problème utilisateur sans risquer de casser la génération.

---

## Définition de Done globale

Starter Pack Studio est au bon niveau quand:

- l'UI explique le choix en 10 secondes;
- la stack et les fichiers générés sont au centre;
- les mauvais combos sont impossibles ou clairement marqués;
- les projets générés contiennent de vrais artefacts;
- les audits qualité donnent un rapport simple;
- Firebase/Stripe/SQL sont traités comme des sujets sérieux;
- `npm test` protège les contrats;
- l'app packagée génère exactement ce que l'UI promet.
