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

