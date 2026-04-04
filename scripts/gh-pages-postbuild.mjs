import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const browserDir = path.join(root, 'dist', 'portfolio-admin', 'browser');
const indexHtml = path.join(browserDir, 'index.html');

fs.copyFileSync(indexHtml, path.join(browserDir, '404.html'));
fs.writeFileSync(path.join(browserDir, '.nojekyll'), '');
