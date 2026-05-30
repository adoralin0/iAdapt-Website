iAdapt Research Center website

Static site files live at the repository root (`index.html`, `about/`, `assets/`, etc.).

GitHub Pages: Settings → Pages → Deploy from branch → **/ (root)**. The homepage loads at your repo URL with no redirect.

Local preview:

```powershell
npm start
```

Fetch LinkedIn posts for the News & Events page
------------------------------------------------

Set environment variables (PowerShell), then run from the repo root:

```powershell
$env:LINKEDIN_ACCESS_TOKEN = 'your_token_here'
$env:LINKEDIN_ORG_ID = '123456'
npm run build:data
```

This writes `data/linkedin.json`. Do not share your access token publicly.

See `README_LINKEDIN.md` for more detail.
