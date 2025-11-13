# Déploiement — monappmia

Ce document explique comment générer une build et déployer l'application `monappmia` sur différents hébergeurs. L'application est configurée pour être servie depuis le chemin public `/monappmia/` par défaut.

## Rappels importants
- Le champ `base` de `vite.config.ts` est actuellement forcé à `/monappmia/`. Si vous souhaitez servir l'app à la racine du domaine, modifiez `base: '/'`.
- `index.html` utilise des chemins relatifs pour `manifest.json` et le script d'entrée (`./index.tsx`).
- SPA fallback : votre serveur doit renvoyer `index.html` pour toutes les routes de l'app (p.ex. `/monappmia/*`). Sinon, le rechargement direct d'une route renverra 404.

## Commandes locales
```bash
cd /path/to/monappmia-main/monappmia-main
# build (base est déjà défini dans vite.config.ts)
npm run build

# vérifier la build localement (preview)
npm run preview -- --port 5175
# Ouvrez http://localhost:5175/monappmia/ (notez le sous-chemin)
```

## Netlify
- Déployez le contenu du dossier `dist/` sur Netlify.
- Ajoutez un fichier `_redirects` à la racine de `dist/` (ou dans le repo) pour le fallback SPA :
```
/*    /monappmia/index.html   200
```
- Si vous déployez sur un sous-domaine ou un chemin différent, ajustez `base` ou changez le chemin dans `vite.config.ts`.

## Vercel
- `vercel` détecte automatiquement les builds Vite.
- Si nécessaire, ajoutez un `vercel.json` avec `rewrites` pour rediriger vers `/monappmia/index.html`.

## GitHub Pages
- Construisez la build :
```
npm run build
```
- Déployez le contenu de `dist/` sur la branche `gh-pages`.
- Assurez-vous que `base` est `/REPO_NAME/` si vous servez depuis `https://<user>.github.io/<repo>/`.

## Nginx (exemple)
Ajoutez une location pour servir l'app et garantir le fallback vers `index.html` :

```
location /monappmia/ {
  try_files $uri $uri/ /monappmia/index.html;
}
```

## Express (Node) — exemple minimal
```js
import express from 'express';
import path from 'path';
const app = express();
app.use('/monappmia/', express.static(path.join(__dirname, 'dist')));
app.get('/monappmia/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.listen(3000);
```

## Service Worker et Manifest
- `manifest.json` est référencé via `./manifest.json` donc il sera chargé correctement depuis le sous-chemin.
- Si vous avez un `service-worker.js`, vérifiez le `scope` lors de l'enregistrement pour qu'il corresponde au sous-chemin :
```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js', { scope: '/monappmia/' });
}
```

## Dépannage rapide
- Page blanche : ouvrez la console DevTools → Console pour voir les erreurs.
- 404 sur assets : vous avez probablement un mauvais `base`. Vérifiez `vite.config.ts` et les chemins dans `index.html`.
- Routes 404 au refresh : configurez le fallback SPA côté serveur.

---
Si vous voulez que je paramètre `base` différemment (par ex. `/'` ou `/my-path/`), dites-moi et j'update le fichier et je régénère la build pour vérifier.
