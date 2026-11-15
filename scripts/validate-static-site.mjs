import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(process.env.STATIC_SITE_DIST ?? path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist'));
const origin = 'https://bilancioapp.com';
const pages = ['/', '/finanzas-personales/', '/gastos-grupales/', '/como-funciona/'];
const errors = [];

function fail(message) { errors.push(message); }

function attr(tag, name) {
  return tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, 'i'))?.[2]?.replaceAll('&amp;', '&') ?? null;
}

function fileFor(urlPath) {
  let decoded;
  try { decoded = decodeURIComponent(urlPath); } catch { return null; }
  if (decoded.split(/[\\/]/).includes('..')) return null;
  const relative = decoded.replace(/^\/+/, '');
  return path.join(root, relative, relative === '' || decoded.endsWith('/') ? 'index.html' : '');
}

async function exists(file) {
  try { return (await stat(file)).isFile(); } catch { return false; }
}

async function readRequired(file, label) {
  try { return await readFile(file, 'utf8'); }
  catch { fail(`${label}: no existe ${path.relative(root, file)}`); return ''; }
}

function meta(html, name) {
  const tag = html.match(new RegExp(`<meta\\b(?=[^>]*\\bname=["']${name}["'])[^>]*>`, 'i'))?.[0];
  return tag ? attr(tag, 'content') : null;
}

const htmlByRoute = new Map();
for (const route of pages) {
  const html = await readRequired(fileFor(route), `Página ${route}`);
  if (html) htmlByRoute.set(route, html);
}

const canonicals = new Set();
for (const [route, html] of htmlByRoute) {
  const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  if (!title) fail(`Página ${route}: falta <title>`);
  if (!meta(html, 'description')) fail(`Página ${route}: falta meta description`);

  const canonicalTag = html.match(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i)?.[0];
  const canonical = canonicalTag ? attr(canonicalTag, 'href') : null;
  const expectedCanonical = `${origin}${route}`;
  if (canonical !== expectedCanonical) fail(`Página ${route}: canonical esperado ${expectedCanonical}, recibido ${canonical ?? 'ninguno'}`);
  if (canonical && canonicals.has(canonical)) fail(`Canonical duplicado: ${canonical}`);
  if (canonical) canonicals.add(canonical);

  for (const match of html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const href = match[1].replaceAll('&amp;', '&').trim();
    const label = match[2].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().toLocaleLowerCase('es');
    let url;
    try { url = new URL(href, `${origin}${route}`); }
    catch { fail(`Página ${route}: enlace inválido "${href}"`); continue; }

    if (['crear cuenta', 'ingresar', 'política de privacidad', 'términos de uso'].some((term) => label.includes(term)) && url.hostname !== 'app.bilancioapp.com') {
      fail(`Página ${route}: CTA "${label}" debe apuntar a app.bilancioapp.com (${href})`);
    }
    if (!['http:', 'https:'].includes(url.protocol) || url.origin !== origin) continue;

    const target = fileFor(url.pathname);
    if (!target || !(await exists(target))) fail(`Página ${route}: enlace interno "${href}" no tiene destino generado`);
    if (url.hash) {
      const decodedPath = url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`;
      const targetRoute = url.pathname === '/' ? '/' : decodedPath;
      const targetHtml = htmlByRoute.get(targetRoute);
      let fragment;
      try { fragment = decodeURIComponent(url.hash.slice(1)); } catch { fragment = url.hash.slice(1); }
      if (targetHtml && ![...targetHtml.matchAll(/\b(?:id|name)=["']([^"']+)["']/gi)].some((item) => item[1] === fragment)) {
        fail(`Página ${route}: fragmento "${href}" no existe`);
      }
    }
  }

  const resources = [...html.matchAll(/<(?:img|source|script|link)\b[^>]*>/gi)].map((match) => match[0]);
  for (const tag of resources) {
    const candidates = ['src', 'href', 'srcset'].flatMap((name) => {
      const value = attr(tag, name);
      return !value ? [] : name === 'srcset' ? value.split(',').map((part) => part.trim().split(/\s+/)[0]) : [value];
    });
    for (const resource of candidates) {
      if (!resource || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(resource)) continue;
      const url = new URL(resource, `${origin}${route}`);
      if (url.origin !== origin) continue;
      const target = fileFor(url.pathname);
      if (!target || !(await exists(target))) fail(`Página ${route}: recurso local "${resource}" no existe en dist`);
    }
  }
}

const sitemap = await readRequired(path.join(root, 'sitemap-0.xml'), 'Sitemap');
const actualRoutes = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/gi)].map((match) => {
  try { return new URL(match[1]).href; } catch { return match[1]; }
}).sort();
const expectedRoutes = pages.map((route) => `${origin}${route}`).sort();
if (JSON.stringify(actualRoutes) !== JSON.stringify(expectedRoutes)) {
  fail(`Sitemap: rutas esperadas ${expectedRoutes.join(', ')}, recibidas ${actualRoutes.join(', ') || 'ninguna'}`);
}

const robots = await readRequired(path.join(root, 'robots.txt'), 'robots.txt');
if (!/^\s*Sitemap:\s*https:\/\/bilancioapp\.com\/sitemap-index\.xml\s*$/im.test(robots)) {
  fail('robots.txt: falta referencia a https://bilancioapp.com/sitemap-index.xml');
}

const notFound = await readRequired(path.join(root, '404.html'), 'Página 404');
if (!meta(notFound, 'robots')?.toLowerCase().includes('noindex')) fail('Página 404: debe incluir meta robots noindex');

if (errors.length) {
  console.error(`Validación estática fallida (${errors.length}):\n- ${errors.join('\n- ')}`);
  process.exitCode = 1;
} else {
  console.log(`Validación estática correcta: ${pages.length} páginas, SEO, sitemap, navegación y recursos.`);
}
