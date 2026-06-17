# Starter Pack Studio

App desktop Electron + React + TypeScript pour choisir une architecture de site/app et générer des starter packs professionnels sur Windows et macOS.

## Objectif

Starter Pack Studio aide à démarrer un projet client avec une base cohérente dès la première ligne de code :

- choix d'architecture selon le type de projet ;
- comparaison Firebase, Cloudflare, Vercel, Netlify et infra custom ;
- génération via les CLI officiels `@latest` quand c'est pertinent ;
- documentation projet prête pour les agents IA ;
- structure de dossiers, sécurité, SEO et checklists de livraison ;
- suivi des projets générés dans l'onglet **Mes projets**.

## Fonctionnalités

- Catalogue de starters :
  - Landing page
  - Site vitrine simple
  - Vitrine éditable
  - Site-app métier local
  - Marketplace locale sans paiement
  - Marketplace Stripe
  - App métier SQL
  - Dashboard admin
- Recommandations de stack et de provider par cas d'usage.
- Aide à décider entre Firestore, SQL, D1/Postgres ou approche hybride.
- Génération de projets sur le Bureau ou dans un dossier choisi.
- Installation automatique des dépendances.
- Initialisation Git.
- Ouverture automatique dans VS Code.
- Copie des skills UI/UX embarqués dans chaque starter.
- Onglet **Mes projets** avec actions :
  - ouvrir le dossier ;
  - ouvrir dans VS Code ;
  - migrer vers un autre disque ;
  - supprimer le projet du disque et de l'app.

## Commandes

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm run dist -- --win
```

Sur macOS, la cible `dmg` est déclarée dans `electron-builder`, mais la génération du `.dmg` doit normalement être faite depuis macOS :

```bash
npm run dist -- --mac
```

## Architecture

```txt
src/main/              Process Electron principal
src/preload/           API IPC sécurisée
src/renderer/          UI React
src/renderer/components
src/renderer/assets    Logos providers/frameworks
src/renderer/styles    Design tokens CSS
src/shared             Types + registry des starters
src/generator          Génération projet + renderers Markdown
templates/             Skills et ressources embarquées
```

## Sécurité Electron

- `nodeIntegration: false`
- `contextIsolation: true`
- API exposée via preload uniquement
- commandes système allowlistées
- génération côté main process
- pas de shell libre depuis l'UI

## Git

Le dépôt versionne le code source et les templates nécessaires.

Ne sont pas versionnés :

- `node_modules/`
- `dist/`
- `dist-electron/`
- `release/`
- captures `e2e-*.png`
- fichiers `.env`
- caches locaux

## Notes

- Cloudflare est traité comme provider de premier rang, pas comme option secondaire.
- Firebase reste supporté comme environnement privilégié pour les projets qui utilisent Auth, Firestore, Storage, App Hosting ou SQL Connect.
- Les starters `official-bootstrap` utilisent les générateurs officiels `@latest` pour éviter les templates figés.
