# ============================================================
#  GAG2 Wiki — One-shot GitHub Pages deploy
#  Run this AFTER `gh auth login` (browser flow, one time)
# ============================================================
#  Default repo name is gag2-wiki — change $REPO if you want
#  a different one. If a repo with that name already exists on
#  your account, this script aborts instead of clobbering it.
# ============================================================

$REPO  = "gag2-wiki"
$VIS   = "public"            # public | private
$DIR   = "D:\Liebe\Coding\GAG2"
$USER  = "haritsnaufalich"   # GitHub username (lowercase) — `gh auth status` shows this
$EMAIL = "haritsnaufalichs11@gmail.com"

Set-Location $DIR

# 1. Confirm auth
$auth = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Not logged in. Run:  gh auth login" -ForegroundColor Yellow
    exit 1
}

# 2. Create the repo (or skip if it already exists)
$exists = gh repo view "$USER/$REPO" 2>$null
if (-not $exists) {
    Write-Host "Creating $USER/$REPO ..."
    gh repo create "$REPO" --$VIS --source . --remote origin --description "Grow A Garden 2 fan wiki — dark, emerald, shadcn." 2>&1
} else {
    Write-Host "Repo $USER/$REPO already exists — adding remote only."
    git remote remove origin 2>$null
    git remote add origin "https://github.com/$USER/$REPO.git"
}

# 3. Push to main (use -c so we never touch global git config)
git -c user.name="$USER" -c user.email="$EMAIL" push -u origin main
if ($LASTEXITCODE -ne 0) { Write-Host "Push failed." -ForegroundColor Red; exit 1 }

# 4. Enable GitHub Pages with the GitHub Actions source
#    (idempotent — safe to re-run)
gh api -X PUT "/repos/$USER/$REPO/pages" -f build_type=workflow 2>$null
gh api -X POST "/repos/$USER/$REPO/pages/builds" 2>$null

Write-Host ""
Write-Host "✓ Pushed. Workflow is running." -ForegroundColor Green
Write-Host "  Watch it:  gh run watch" -ForegroundColor Cyan
Write-Host "  Site URL:  https://$USER.github.io/$REPO/" -ForegroundColor Cyan
Write-Host "  Settings:  https://github.com/$USER/$REPO/settings/pages" -ForegroundColor Cyan
