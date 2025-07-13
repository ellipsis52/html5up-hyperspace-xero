#!/bin/bash
git submodule update --init --recursive
npm run build # ou ta commande de build spécifique
#!/bin/bash
echo "✨ Initialisation des sous-modules Git…"
git submodule update --init --recursive

echo "🚀 Lancement du build principal…"
npm run build
