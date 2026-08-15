#!/usr/bin/env node
/**
 * Turn a fresh clone of the boilerplate into YOUR app:
 *
 *   node scripts/bootstrap.mjs --name "My App" --slug my-app --scheme myapp [--extras]
 *
 * --extras offers optional, battle-tested add-on libraries (interactive).
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import readline from 'node:readline/promises';

const args = process.argv.slice(2);
const getFlag = (flag) => {
  const i = args.indexOf(flag);
  return i !== -1 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : undefined;
};

const name = getFlag('--name');
const slug = getFlag('--slug');
const scheme = getFlag('--scheme') ?? slug?.replace(/-/g, '');
const withExtras = args.includes('--extras');

if (!name || !slug) {
  console.error('Usage: node scripts/bootstrap.mjs --name "My App" --slug my-app [--scheme myapp] [--extras]');
  process.exit(1);
}

const EXTRAS = [
  { pkg: 'react-native-bouncy-checkbox', desc: 'Animated checkbox' },
  { pkg: 'react-native-segmented-control-2', desc: 'Segmented control (pure JS)' },
  { pkg: 'react-native-modalkit', desc: 'Reanimated-first modals' },
  { pkg: 'react-native-gradient-background-skia', desc: 'Skia gradient backgrounds' },
];

// app.json
const appJson = JSON.parse(fs.readFileSync('app.json', 'utf8'));
appJson.expo.name = name;
appJson.expo.slug = slug;
appJson.expo.scheme = scheme;
fs.writeFileSync('app.json', JSON.stringify(appJson, null, 2) + '\n');

// package.json
const pkgJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkgJson.name = slug;
pkgJson.version = '1.0.0';
fs.writeFileSync('package.json', JSON.stringify(pkgJson, null, 2) + '\n');

// App name in the locale source of truth
const enPath = 'src/locales/en.json';
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
en.common.appName = name;
fs.writeFileSync(enPath, JSON.stringify(en, null, 2) + '\n');

console.log(`✔ Renamed app to "${name}" (slug: ${slug}, scheme: ${scheme})`);

if (withExtras) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const chosen = [];
  for (const extra of EXTRAS) {
    const answer = await rl.question(`Add ${extra.pkg} — ${extra.desc}? [y/N] `);
    if (answer.trim().toLowerCase().startsWith('y')) chosen.push(extra.pkg);
  }
  rl.close();
  if (chosen.length) {
    console.log(`Installing: ${chosen.join(', ')}`);
    execSync(`npx expo install ${chosen.join(' ')}`, { stdio: 'inherit' });
  }
}

console.log('\nNext steps:');
console.log('  1. node scripts/setup-eas.sh   # link EAS project + credentials');
console.log('  2. Replace assets/images/icon.png and splash assets');
console.log('  3. npm run ios (or android) to verify');
