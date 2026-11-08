import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

for (const directory of ['dist', 'dist-ssr']) {
  fs.rmSync(path.join(root, directory), { recursive: true, force: true });
}

console.log('Removed dist/ and dist-ssr/.');
