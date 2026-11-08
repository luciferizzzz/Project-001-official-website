import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');
const indexPath = path.join(distDir, 'index.html');
const serverEntry = path.join(ssrDir, 'entry-server.js');

if (!fs.existsSync(indexPath)) {
  throw new Error(`Missing client build: ${indexPath}`);
}

if (!fs.existsSync(serverEntry)) {
  throw new Error(`Missing server build: ${serverEntry}`);
}

const template = fs.readFileSync(indexPath, 'utf8');
const { render } = await import(pathToFileURL(serverEntry).href);
const appHtml = render();

const marker = '<!--app-html-->';
const emptyRoot = '<div id="root"></div>';

let output;

if (template.includes(marker)) {
  output = template.replace(marker, () => appHtml);
} else if (template.includes(emptyRoot)) {
  output = template.replace(
    emptyRoot,
    () => `<div id="root">${appHtml}</div>`,
  );
} else {
  throw new Error(
    'Could not find the prerender marker in dist/index.html. ' +
      'Expected <!--app-html--> or an empty #root element.',
  );
}

fs.writeFileSync(indexPath, output, 'utf8');
fs.rmSync(ssrDir, { recursive: true, force: true });

const size = (Buffer.byteLength(output) / 1024).toFixed(1);
console.log(`Prerendered dist/index.html (${size} kB of HTML).`);
