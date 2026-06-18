# Starter Pack Studio UI/UX + Agent Specialization Backlog

> À garder pour après. Ne pas tout implémenter maintenant: ce document capture les idées validées pendant l'échange.

## Objectif

Transformer Starter Pack Studio en outil de décision concret: moins de blabla, plus de verdict clair, fichiers générés, stack, risques, et agents spécialisés capables d'auditer/renforcer chaque starter.

## Backlog agent spécialisé

### Eve / framework agent

- Évaluer Eve comme framework d'organisation d'agents: `agent/`, `agent.ts`, `instructions.md`, `tools/`, `skills/`, `sandbox/`, `schedules/`.
- Utilité probable: formaliser des agents réutilisables par domaine plutôt que lancer des audits ad hoc.
- Agents candidats:
  - `seo-google-agent`: crawlabilité, sitelinks, sitemap, canonical, JSON-LD, noindex.
  - `provider-fit-agent`: Cloudflare/Firebase/Vercel/Netlify/AWS/local, coûts, limites, runtime.
  - `starter-files-agent`: vérifie les fichiers générés et les quality gates.
  - `security-rules-agent`: Firebase rules, RBAC, secrets, uploads.
  - `stripe-sql-agent`: paiements, webhooks, idempotence, audit SQL.
- Ne pas intégrer Eve tant que le besoin n'est pas clair: d'abord définir les contrats de sortie attendus des agents.

## Backlog UI/UX

### Principe

Réduire l'interface à ce qui aide vraiment à choisir et générer:

1. Verdict clair.
2. Stack recommandée.
3. Fichiers générés.
4. Pourquoi ce choix / pourquoi éviter les mauvais choix.
5. Options avancées repliées.
6. Génération et logs.

### À garder visible

- Section `Stack recommandée` avec badges concrets: framework, provider, DB, rendu SEO, coût estimé.
- Section `Fichiers générés` avec arbre/familles: app, docs, SEO, provider config, rules, infra.
- Section `Generation` à droite: nom, destination, package manager, options.
- Une carte verdict courte: `Recommandé`, `Possible`, `À éviter`.

### À replier ou fusionner

- `Decision d'architecture`: garder seulement résumé `À retenir` + `À éviter` en 3 bullets max.
- `Architecture Google`: renommer en `SEO & pages Google`, afficher seulement si starter public.
- `Options d'hebergement et donnees`: fusionner avec `Stack recommandée` et mettre les détails en drawer/accordéon.
- `Provider panel`: garder les alertes utiles, cacher les quotas longs derrière `Détails provider`.
- `Sources officielles`: replié par défaut.

### Nouveau flux proposé

1. Choisir besoin/projet.
2. Voir un `Verdict` compact:
   - meilleur combo,
   - coût estimé,
   - DB ou pas DB,
   - SEO mode,
   - 3 risques.
3. Voir `Ce qui sera généré`:
   - pages/routes,
   - docs,
   - configs,
   - rules/tests.
4. Configurer génération.
5. Générer.
6. Voir logs + checklist de conformité.

## Backlog qualité technique

- Ajouter matrice stricte starter/provider avec `recommended/good/possible/avoid`.
- Ajouter quality gates par starter.
- Générer de vraies routes/pages pour starters publics.
- Ajouter tests snapshots par combinaison starter/provider.
- Corriger docs trop spécifiques à Starter Pack Studio pour landing générique.
- Spécialiser Firebase rules, Stripe SQL, marketplace indexing, dashboard noindex.

## Décision immédiate recommandée

Ne pas ajouter plus de sections. Simplifier d'abord l'UI autour de:

- `Verdict`
- `Stack`
- `Fichiers générés`
- `Generation`

Puis déplacer le reste en accordéons ou en bibliothèque de référence.
