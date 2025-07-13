#!/bin/bash
git submodule update --init --recursive
# commande de build statique ou autre
#!/bin/bash
echo "🔮 Initialisation des sous-modules..."
git submodule update --init --recursive

echo "✨ Construction du site statique..."
# Ici tu peux mettre ta commande de build si tu en as une, par exemple:
# npm run build
# ou simplement un echo si statique

echo "🚀 Build terminée."
