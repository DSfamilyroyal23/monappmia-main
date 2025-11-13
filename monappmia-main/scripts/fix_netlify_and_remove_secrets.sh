#!/usr/bin/env bash
set -euo pipefail

# fix_netlify_and_remove_secrets.sh
# Usage: run this script at the root of your git repository (zsh/bash)
# It will:
#  - backup .gitmodules (if present)
#  - remove the submodule section for .config/nvm from .gitmodules (if present)
#  - remove any files named github_pat_* (from git index and disk)
#  - commit the changes and produce a patch file fix-netlify.patch

echo "== Fix .gitmodules and remove exposed tokens =="

if ! git rev-parse --show-toplevel >/dev/null 2>&1; then
  echo "This is not a git repository. Aborting." >&2
  exit 1
fi

REPO_ROOT=$(git rev-parse --show-toplevel)
cd "$REPO_ROOT"

echo "Repo root: $REPO_ROOT"

# Backup .gitmodules if it exists
if [ -f .gitmodules ]; then
  cp .gitmodules .gitmodules.bak
  echo "Backed up .gitmodules -> .gitmodules.bak"

  # Remove the submodule section named .config/nvm (if present).
  # This keeps other submodule entries intact.
  awk 'BEGIN{del=0} /^\[submodule ".config\/nvm"\]/{del=1; next} del && /^\[/{del=0} !del{print}' .gitmodules > .gitmodules.tmp || true

  # If tmp file is identical to original, no change; otherwise replace
  if ! cmp -s .gitmodules .gitmodules.tmp; then
    mv .gitmodules.tmp .gitmodules
    echo "Removed .config/nvm section from .gitmodules"
    # If .gitmodules is now empty (no non-empty lines), remove it
    if [ ! -s .gitmodules ]; then
      rm -f .gitmodules
      echo ".gitmodules became empty and was removed"
    fi
  else
    rm -f .gitmodules.tmp
    echo "No .config/nvm section found in .gitmodules"
  fi
else
  echo "No .gitmodules file found. Skipping .gitmodules edits."
fi

echo "Searching for files named 'github_pat_*' to remove from repo and disk..."

# Find and remove exposed PAT files (both tracked and untracked)
FOUND=0
while IFS= read -r -d '' f; do
  FOUND=1
  echo "Processing $f"
  # Remove from git index if present
  git rm --cached --ignore-unmatch "$f" || true
  # Remove file from disk
  rm -f "$f"
  echo "Removed $f (from index if present, and disk)"
done < <(find . -maxdepth 3 -type f -name 'github_pat_*' -print0)

if [ $FOUND -eq 0 ]; then
  echo "No github_pat_* files found (in maxdepth 3). You may want to broaden the search if needed."
fi

# Stage changes if any
git add -A

# Commit if there are changes
if git diff --cached --quiet; then
  echo "No changes to commit. Nothing to do."
else
  git commit -m "fix(repo): remove broken .config/nvm submodule entry and delete exposed github_pat_* files"
  echo "Committed changes. Generating patch file fix-netlify.patch"
  # Create a patch for the last commit
  git format-patch -1 --stdout > fix-netlify.patch
  echo "Patch saved to fix-netlify.patch"
fi

echo "Done. Review the commit, then push with: git push origin <branch>"
echo "IMPORTANT: If you exposed a GitHub PAT, revoke it immediately via GitHub settings -> Developer settings -> Personal access tokens."
