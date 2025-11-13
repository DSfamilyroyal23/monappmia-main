# Fix Netlify clone error and remove exposed tokens

Ce petit répertoire contient un script utile pour corriger deux problèmes courants qui bloquent les déploiements CI (ex : Netlify) :

- un sous-module cassé référencé dans `.gitmodules` (par exemple `.config/nvm` sans URL),
- des tokens exposés (fichiers nommés `github_pat_*`).

Fichiers ajoutés :
- `fix_netlify_and_remove_secrets.sh` : script exécutable qui effectue les corrections et crée un patch `fix-netlify.patch` pour le commit.

Comment l'utiliser
1. Placez-vous à la racine du dépôt git (où se trouve `.git`).
2. Exécutez (zsh/bash) :

```bash
chmod +x scripts/fix_netlify_and_remove_secrets.sh
./scripts/fix_netlify_and_remove_secrets.sh
```

3. Le script :
- sauvegarde `.gitmodules` en `.gitmodules.bak` si présent,
- enlève la section du sous-module `.config/nvm` si elle existe,
- supprime les fichiers `github_pat_*` trouvés (maxdepth 3) du repo et du disque,
- fait un `git commit` et génère `fix-netlify.patch` (format-patch pour le dernier commit).

4. Vérifiez le commit, inspectez `fix-netlify.patch`. Si tout est correct, poussez la branche :

```bash
git push origin <votre-branche>
```

Important
- Révoquez immédiatement tout token GitHub exposé depuis l'interface GitHub (Settings → Developer settings → Personal access tokens).
- Si le token a été poussé dans l'historique, utilisez `bfg` ou `git filter-repo` pour purger l'historique puis force-push (coordonnez avec votre équipe).

Si vous voulez, je peux aussi générer un patch `.patch` prêt à appliquer plutôt que d'exécuter le script. Dites-moi si vous préférez ce workflow.
