import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const expectedTitle = '<title>AcessoJá — Mobilidade acessível</title>';

if (!html.includes(expectedTitle)) {
  throw new Error(`Expected exported homepage to contain ${expectedTitle}`);
}

console.log('Homepage metadata check passed.');
