#!/bin/bash

# 💬 Nom du commit par défaut (modifiable en ligne de commande)
MESSAGE=${1:-"🚀 Mise à jour : callback OAuth2, cron, et config Vercel"}

echo "🔍 Ajout des modifications..."
git add .

echo "💾 Commit en cours..."
git commit -m "$MESSAGE"

echo "📤 Push vers GitHub..."
git push origin main

echo "✅ Tout est en ligne, maître du dépôt."


chmod +x commit-and-push.sh


./commit-and-push.sh "🛠️ Ajout de /callback OAuth2, cron Vercel et server.js"

git checkout -b push-ready

./commit-and-push.sh "✨ Préparation pour déploiement sur push-ready"

#!/bin/bash

cd "$(dirname "$0")"

# --- Commit Git si modification ---
if git diff --quiet && git diff --cached --quiet; then
  echo "😴 Rien à commit. À bientôt..."
  exit 0
fi

# Message par défaut
MESSAGE=${1:-"🚀 Auto-commit depuis script automatique"}
git add .
git commit -m "$MESSAGE"
git push origin main

echo "✅ Poussé avec succès !"

# --- Notification Webhook (Discord / Slack / etc) ---
WEBHOOK_URL="https://discord.com/api/webhooks/TON_WEBHOOK_ICI"
REPO_NAME=$(basename `git rev-parse --show-toplevel`)
BRANCH=$(git rev-parse --abbrev-ref HEAD)
LAST_COMMIT=$(git log -1 --pretty=format:"%s")

# Envoie notification
curl -H "Content-Type: application/json" -X POST -d "{
  \"username\": \"🛰 GitBot\",
  \"content\": \"📦 *$REPO_NAME* : nouveau commit sur \`$BRANCH\` → $LAST_COMMIT\"
}" "$WEBHOOK_URL"
