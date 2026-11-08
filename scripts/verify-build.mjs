import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const htmlPath = path.join(distDir, 'index.html');

const failures = [];
const notes = [];

function fail(message) {
  failures.push(message);
}

function read(relativePath) {
  return fs.readFileSync(path.join(distDir, relativePath), 'utf8');
}

function exists(relativePath) {
  return fs.existsSync(path.join(distDir, relativePath));
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

if (!fs.existsSync(htmlPath)) {
  console.error('dist/index.html is missing. Run `npm run build` first.');
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf8');
const text = stripTags(html);
const htmlBytes = fs.statSync(htmlPath).size;

// ---------------------------------------------------------------------------
// 1. Document shell
// ---------------------------------------------------------------------------

if (!/^<!doctype html>/i.test(html)) fail('missing doctype');
if (!/<html lang="en">/.test(html)) fail('missing lang="en"');
if (!/<meta charset="UTF-8"/i.test(html)) fail('missing charset');
if (!/<meta name="viewport"/.test(html)) fail('missing viewport meta');
if (!/<title>[^<]+<\/title>/.test(html)) fail('missing title');

const requiredContent = [
  'Welcome to Project 001.',
  'Freedom',
  'Through',
  'Technology',
  'An independent technology collective building software guided by sovereignty, composability, and security',
  'Explore Our Work',
  'Sovereignty',
  'Composability',
  'Security',
  'Astra',
  'Nova',
  'Aegis',
  'Under Redesign',
  'On Hold',
  'Developed',
  'Pending publication',
  'Freedom Through Technology.',
];

for (const phrase of requiredContent) {
  if (!text.includes(phrase)) fail(`missing required content: "${phrase}"`);
}

// ---------------------------------------------------------------------------
// 2. Structure
// ---------------------------------------------------------------------------

if (/<!--app-html-->/.test(html)) fail('prerender marker still present');
if (!/<div id="root">[\s\S]*?<\/div>[\s\S]*?<\/body>/.test(html))
  fail('root container not populated');

const h1Count = (html.match(/<h1[\s>]/g) ?? []).length;
if (h1Count !== 1) fail(`expected exactly one <h1>, found ${h1Count}`);
notes.push(`h1: ${h1Count}`);

const h2Count = (html.match(/<h2[\s>]/g) ?? []).length;
if (h2Count < 6) fail(`expected at least six <h2>, found ${h2Count}`);
notes.push(`h2: ${h2Count}`);

// Every img must have alt and explicit dimensions (except decorative ones with alt="").
const imgTags = html.match(/<img\b[^>]*>/g) ?? [];
for (const tag of imgTags) {
  if (!/\balt=/.test(tag)) fail(`img without alt: ${tag.slice(0, 120)}`);
  if (!/\bwidth=/.test(tag) || !/\bheight=/.test(tag))
    fail(`img without width/height: ${tag.slice(0, 120)}`);
}
notes.push(`img elements: ${imgTags.length}`);

// No inline event handlers or javascript: URLs.
if (/\son[a-z]+=/i.test(html)) fail('inline event handler found');
if (/javascript:/i.test(html)) fail('javascript: URL found');

// ---------------------------------------------------------------------------
// 3. Internal anchors resolve to real ids
// ---------------------------------------------------------------------------

const ids = new Set();
for (const match of html.matchAll(/\sid="([^"]+)"/g)) {
  if (ids.has(match[1])) fail(`duplicate id: ${match[1]}`);
  ids.add(match[1]);
}

const anchors = new Set();
for (const match of html.matchAll(/\shref="#([^"]*)"/g)) {
  anchors.add(match[1] || '__empty__');
}

for (const anchor of anchors) {
  if (anchor === '__empty__') {
    fail('empty in-page anchor href="#"');
    continue;
  }
  if (!ids.has(anchor)) fail(`anchor href="#${anchor}" has no matching id`);
}
notes.push(`ids: ${ids.size}, internal anchors: ${anchors.size}`);

// ---------------------------------------------------------------------------
// 4. Asset references (local absolute paths)
// ---------------------------------------------------------------------------

const localRefs = new Set();
for (const match of html.matchAll(/(?:src|href)="(\/[^"#]*)"/g)) {
  if (match[1].startsWith('//')) continue;
  localRefs.add(match[1]);
}

for (const ref of localRefs) {
  const clean = ref.split('?')[0];
  const filePath = path.join(distDir, clean);
  if (!fs.existsSync(filePath)) fail(`referenced asset missing from dist: ${ref}`);
}
notes.push(`local refs checked: ${localRefs.size}`);

for (const ref of localRefs) {
  if (ref.startsWith('/src/')) fail(`source path leaked into build: ${ref}`);
}

// ---------------------------------------------------------------------------
// 5. SEO files and metadata
// ---------------------------------------------------------------------------

const seoFiles = [
  'robots.txt',
  'sitemap.xml',
  'site.webmanifest',
  '404.html',
  'og-image.png',
  'assets/brand/project-001-logo.png',
  'assets/brand/project-001-logo-small.png',
  'assets/projects/astra-logo.png',
  'assets/fonts/newsreader-latin-normal.woff2',
  'assets/fonts/newsreader-latin-italic.woff2',
  'assets/fonts/instrument-sans-latin-normal.woff2',
  'assets/fonts/jetbrains-mono-latin-normal.woff2',
  'icons/favicon.ico',
  'icons/favicon-16.png',
  'icons/favicon-32.png',
  'icons/apple-touch-icon.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
];

for (const relativePath of seoFiles) {
  if (!exists(relativePath)) fail(`missing dist file: ${relativePath}`);
}

const requiredTags = [
  ['canonical', /<link[^>]+rel="canonical"[^>]+href="https?:\/\/[^"]+"/],
  ['og:title', /<meta[^>]+property="og:title"/],
  ['og:description', /<meta[^>]+property="og:description"/],
  ['og:image', /<meta[^>]+property="og:image"/],
  ['twitter:card', /<meta[^>]+name="twitter:card"/],
  ['json-ld', /<script type="application\/ld\+json">/],
];

for (const [name, pattern] of requiredTags) {
  if (!pattern.test(html)) fail(`missing SEO tag: ${name}`);
}

// JSON-LD must be valid JSON.
const ldMatch = html.match(
  /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
);
if (ldMatch) {
  try {
    const data = JSON.parse(ldMatch[1]);
    const graph = data['@graph'] ?? [data];
    const types = graph.map((node) => node['@type']);
    if (!types.includes('Organization')) fail('JSON-LD missing Organization');
    if (!types.includes('WebSite')) fail('JSON-LD missing WebSite');
  } catch (error) {
    fail(`invalid JSON-LD: ${error.message}`);
  }
}

// ---------------------------------------------------------------------------
// 6. No placeholder leftovers / forbidden patterns
// ---------------------------------------------------------------------------

const forbidden = [
  'TODO',
  'FIXME',
  'Lorem ipsum',
  'example.com',
  'astro',
  'Astro',
  'localhost',
];

for (const token of forbidden) {
  if (html.includes(token)) fail(`forbidden token in HTML: "${token}"`);
}

// The placeholder domain is intentional, but must be the documented one.
if (!html.includes('https://project001.example')) {
  fail('documented placeholder domain missing');
}

// ---------------------------------------------------------------------------
// 7. Encoding sanity
// ---------------------------------------------------------------------------

if (/\uFFFD/.test(html)) fail('replacement character (U+FFFD) present — bad encoding');
if (html.includes('\u00e2\u0080\u0094')) fail('mojibake em dash sequence present');

const emDashCount = (html.match(/\u2014/g) ?? []).length;
notes.push(`em dashes: ${emDashCount}`);
if (emDashCount === 0) fail('expected em dashes in copy');

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

console.log('dist/index.html:', `${(htmlBytes / 1024).toFixed(1)} kB`);
for (const note of notes) console.log(`· ${note}`);

if (failures.length > 0) {
  console.error(`\n${failures.length} check(s) failed:`);
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  process.exit(1);
}

console.log('\nAll build checks passed.');
