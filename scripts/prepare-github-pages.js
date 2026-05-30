/**
 * Copies the built static site from iadapt-redesign/dist for GitHub Pages.
 *
 *   node scripts/prepare-github-pages.js        → ./_site (for Actions)
 *   node scripts/prepare-github-pages.js --root → repo root (for branch/root Pages)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'iadapt-redesign', 'dist');
const OUT = process.argv.includes('--root')
  ? ROOT
  : path.join(ROOT, '_site');

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const name of fs.readdirSync(src)) {
      copyRecursive(path.join(src, name), path.join(dest, name));
    }
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function emptyDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) emptyDir(full);
    else fs.unlinkSync(full);
  }
}

if (!fs.existsSync(DIST)) {
  console.error(`Missing build output: ${DIST}`);
  process.exit(1);
}

if (OUT !== ROOT) {
  fs.mkdirSync(OUT, { recursive: true });
  emptyDir(OUT);
}

for (const name of fs.readdirSync(DIST)) {
  copyRecursive(path.join(DIST, name), path.join(OUT, name));
}

fs.writeFileSync(path.join(OUT, '.nojekyll'), '');

const target = OUT === ROOT ? 'repo root' : '_site';
console.log(`GitHub Pages: copied iadapt-redesign/dist to ${target}.`);
