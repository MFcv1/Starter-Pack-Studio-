# Fenetre de dev Starter Pack Studio

Ce fichier sert de raccourci de travail dans le chat.

Quand l'utilisateur dit:

- "ouvre une fenetre de dev"
- "lance la fenetre de dev"
- "lance DEV-WINDOW.md"
- "ouvre le mode dev"

Codex doit lancer l'app en mode developpement et garder la fenetre ouverte pour tester les nouveautes en continu.

## Commande macOS locale

```bash
env -u ELECTRON_RUN_AS_NODE npm run dev
```

Pourquoi `env -u ELECTRON_RUN_AS_NODE`:

- cette session macOS peut contenir `ELECTRON_RUN_AS_NODE=1`;
- si cette variable reste active, Electron demarre comme Node au lieu de demarrer l'app;
- la commande ci-dessus retire la variable seulement pour ce lancement.

## Process recommande

1. Lancer la fenetre de dev avec la commande ci-dessus.
2. Garder cette fenetre ouverte pendant les retours UI.
3. Modifier le code normalement.
4. Laisser Vite/Electron recharger pendant l'iteration.
5. Quand une version est validee, seulement ensuite reconstruire l'app installee:

```bash
env -u ELECTRON_RUN_AS_NODE npm run dist -- --mac
rm -rf "$HOME/Desktop/Starter Pack Studio.app"
cp -R "release/mac-arm64/Starter Pack Studio.app" "$HOME/Desktop/Starter Pack Studio.app"
xattr -dr com.apple.quarantine "$HOME/Desktop/Starter Pack Studio.app" 2>/dev/null || true
```

## Regle de collaboration

Pendant les ajustements de wording, pricing, combos d'infra ou UI:

- utiliser la fenetre de dev pour aller vite;
- ne reconstruire l'app du Bureau que quand l'utilisateur demande une version testable stable;
- si l'utilisateur ne comprend pas un mot dans l'interface, clarifier le texte dans l'app, pas seulement dans le chat.
