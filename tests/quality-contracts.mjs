import assert from 'node:assert/strict';
import { test } from 'node:test';

import { renderFile } from '../dist-electron/generator/renderers.js';
import { getDynamicDocsForCombo, starterPacks } from '../dist-electron/shared/starterRegistry.js';

const publicStarterIds = new Set([
  'landing-page',
  'site-vitrine-simple',
  'vitrine-editable',
  'site-app-local',
  'marketplace-locale',
  'marketplace-stripe'
]);

const baseOptions = {
  starterId: 'site-vitrine-simple',
  projectName: 'quality-contract-smoke',
  destinationPath: '/tmp',
  packageManager: 'npm',
  providerId: 'cloudflare',
  mode: 'official-bootstrap',
  runInstall: false,
  initGit: false,
  openInVSCode: false,
  includeAgentMd: true,
  includeSecurityMd: true
};

function pack(id) {
  const result = starterPacks.find((candidate) => candidate.id === id);
  assert.ok(result, `starter pack ${id} should exist`);
  return result;
}

function optionsFor(starterId, providerId = 'cloudflare') {
  return { ...baseOptions, starterId, providerId };
}

test('every public starter generates strict SEO and page structure docs', () => {
  for (const starterId of publicStarterIds) {
    const docs = getDynamicDocsForCombo(starterId, 'cloudflare').map((doc) => doc.path);
    assert.ok(docs.includes('docs/SEO-STANDARD.md'), `${starterId} should generate docs/SEO-STANDARD.md`);
    assert.ok(docs.includes('docs/PAGE-STRUCTURE.md'), `${starterId} should generate docs/PAGE-STRUCTURE.md`);
    assert.ok(docs.includes('docs/ROUTES-SEO.md'), `${starterId} should generate docs/ROUTES-SEO.md`);
  }
});

test('SEO standard documents index/noindex, crawlability, sitemap, canonical and sitelinks', () => {
  const content = renderFile('docs/SEO-STANDARD.md', pack('site-vitrine-simple'), optionsFor('site-vitrine-simple'));
  for (const required of [
    'Pages indexables',
    'Pages noindex',
    'HTML initial',
    '<a href>',
    'sitemap.xml',
    'robots.txt',
    'canonical',
    'JSON-LD',
    'Google choisit automatiquement les sitelinks'
  ]) {
    assert.match(content, new RegExp(required.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `missing ${required}`);
  }
});

test('page structure document gives concrete vitrine sections recognized by Google', () => {
  const content = renderFile('docs/PAGE-STRUCTURE.md', pack('site-vitrine-simple'), optionsFor('site-vitrine-simple'));
  for (const required of [
    'Header crawlable',
    'Hero',
    'Services',
    'Réalisations',
    'Zone d’intervention',
    'Avis',
    'FAQ',
    'Footer crawlable',
    '/services',
    '/contact',
    'BreadcrumbList',
    'LocalBusiness'
  ]) {
    assert.match(content, new RegExp(required.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `missing ${required}`);
  }
});

test('public SSG provider configs must not force SPA fallback rewrites to index.html', () => {
  const staticPack = pack('site-vitrine-simple');
  const firebaseJson = renderFile('firebase.json', staticPack, optionsFor('site-vitrine-simple', 'firebase'));
  const netlifyToml = renderFile('netlify.toml', staticPack, optionsFor('site-vitrine-simple', 'netlify'));
  const vercelJson = renderFile('vercel.json', staticPack, optionsFor('site-vitrine-simple', 'vercel'));

  assert.doesNotMatch(firebaseJson, /destination"\s*:\s*"\/index\.html"/, 'Firebase Astro SSG config should not rewrite every route to /index.html');
  assert.doesNotMatch(netlifyToml, /to\s*=\s*"\/index\.html"/, 'Netlify Astro SSG config should not rewrite every route to /index.html');
  assert.doesNotMatch(vercelJson, /destination"\s*:\s*"\/index\.html"/, 'Vercel Astro SSG config should not rewrite every route to /index.html');
});

test('dashboard admin SEO standard is private noindex and does not promise sitelinks', () => {
  const content = renderFile('docs/SEO-STANDARD.md', pack('dashboard-admin'), optionsFor('dashboard-admin'));
  assert.match(content, /noindex/i);
  assert.match(content, /pas de sitelinks/i);
  assert.doesNotMatch(content, /Pages candidates aux sitelinks/i);
});
