# Déploiement et sécurité

Ce document explique comment déployer l'application en production et sécuriser la clé Gemini (Google GenAI).

## Résumé des changements effectués
- `vite.config.ts` : `base` rendu configurable via `VITE_BASE` (défaut `./`).
- Suppression de l'injection d'une clé API dans `define` pour éviter d'exposer des secrets.
- `services/geminiService.ts` : suppression du `throw` à l'import; initialisation conditionnelle du client AI et retours sûrs lorsque la clé n'est pas fournie.
- `index.tsx` : enregistrement du Service Worker uniquement en production.
- `serve-monappmia.js` : base path configurable via `BASE` env ou argument CLI.

## Étapes recommandées pour la production
1. Révoquez immédiatement toute clé API partagée publiquement et créez une nouvelle clé dans Google Cloud.

2. Ne jamais exposer la clé dans le bundle client. Procédure recommandée :
   - Créez un petit backend (Express / Cloud Function) qui possède la clé dans ses variables d'environnement (`GEMINI_API_KEY`).
   - Le client appelle votre backend (ex: `POST /api/genai/generate`) et le backend appelle l'API Google GenAI.
   - Ainsi, la clé reste côté serveur.

3. Variables d'environnement côté build / serveur
   - Pour Vite (build), utilisez des variables `VITE_` seulement pour des valeurs non sensibles.
   - Pour votre serveur (Node, Cloud Run, Vercel, Netlify functions), définissez `GEMINI_API_KEY` dans les secrets/variables d'environnement du service.

4. Déploiement statique
   - Si vous servez l'app à la racine (ex: https://example.com/), laissez `VITE_BASE` vide ou `./`.
   - Si vous servez sous un sous-chemin (ex: https://example.com/monappmia/), définissez `VITE_BASE='/monappmia/'` au build.
   - Exemple (Linux/Mac):

```bash
# build for a subpath
VITE_BASE='/monappmia/' npm run build
# or for root
VITE_BASE='./' npm run build
```

5. Service worker
   - Le service worker est maintenant enregistré uniquement en production. Lors du déploiement, si vous rencontrez un écran blanc dû à une ancienne version en cache, demandez aux utilisateurs de vider le cache ou configurez votre SW pour invalider correctement les caches (changer le nom `CACHE_NAME`).

6. Test rapide local
```bash
# installer dépendances
npm install
# builder
npm run build
# servir (le serveur fourni attend un base path configurable)
# exemple : servir sur /monappmia
node serve-monappmia.js 5177 /monappmia
# ou servir sur / :
node serve-monappmia.js 5177 /
```

## Sécurité - récapitulatif
- Révoquez toute clé partagée publiquement.
- Stockez la clé côté serveur, jamais dans le bundle client.
- Limitez les permissions de la clé (si possible) et surveillez l'usage.

## Si vous voulez que j'automatise la partie serveur
Je peux ajouter un petit serveur Express (ou une fonction serverless) avec un endpoint qui proxie les appels à Google GenAI. Dites-moi si vous voulez :
- (A) Express local minimal + script `npm run start:server` ; ou
- (B) Exemple Cloud Function (ou Vercel Serverless) prêt à déployer.

Note: j'ai ajouté un serveur proxy minimal dans `server/server.js` et un script `npm run start:server`.
Pour lancer localement :

```bash
# avec la clé (ne partagez pas cette clé publiquement)
GEMINI_API_KEY="YOUR_NEW_KEY" npm run start:server
```

---
Si vous voulez que je relance un build ici et que je corrige d'éventuelles erreurs restantes, dites `relance build` et je l'exécute (je vous renverrai les logs complets).