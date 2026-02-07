const fs = require('fs').promises;
const path = require('path');

const EXCLUDE = new Set(['node_modules', '.git', 'dist', '.github']);

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const e of entries) {
    if (EXCLUDE.has(e.name)) continue;
    const srcPath = path.join(src, e.name);
    const destPath = path.join(dest, e.name);
    if (e.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else if (e.isFile()) {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

(async () => {
  try {
    const cwd = process.cwd();
    const out = path.join(cwd, 'dist');
    await fs.rm(out, { recursive: true, force: true });
    await copyDir(cwd, out);
    console.log('Build complete: dist/ created');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
