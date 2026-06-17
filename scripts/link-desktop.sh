#!/bin/bash
set -e

# Find the built app (supports mac-arm64, mac, etc.)
APP=$(find release -maxdepth 2 -name "Starter Pack Studio.app" -type d 2>/dev/null | head -1 || true)

if [ -z "$APP" ]; then
  echo "❌ Aucune app trouvée dans release/."
  echo "   Lance d'abord : npm run dist -- --mac"
  exit 1
fi

DESKTOP_LINK="$HOME/Desktop/Starter Pack Studio.app"

# Remove previous copy OR symlink
rm -rf "$DESKTOP_LINK"

# Create symlink (absolute path recommended)
ln -sfn "$(pwd)/$APP" "$DESKTOP_LINK"

# Clear quarantine on the real bundle (helps first launch after build)
xattr -dr com.apple.quarantine "$(pwd)/$APP" 2>/dev/null || true

echo "✅ Lien Bureau mis à jour"
echo "   $DESKTOP_LINK  →  $APP"
echo ""
echo "   Clique sur l'icône « Starter Pack Studio » sur le Bureau"
echo "   pour toujours ouvrir la dernière version buildée."
echo ""
echo "   (Le lien symbolique pointe vers le dossier du build ;"
echo "    après chaque 'npm run dist -- --mac' le Bureau ouvrira la nouvelle version.)"