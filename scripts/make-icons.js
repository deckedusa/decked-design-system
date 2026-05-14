//
// This script copies Lucide icons and generates icon metadata.
//
import commandLineArgs from 'command-line-args';
import copy from 'recursive-copy';
import { deleteAsync } from 'del';
import fs from 'fs/promises';
import { globby } from 'globby';
import path from 'path';

const { outdir } = commandLineArgs({ name: 'outdir', type: String });
const iconDir = path.join(outdir, '/assets/icons');
const lucideDir = './node_modules/lucide-static';

// Copy icons
await deleteAsync([iconDir]);
await fs.mkdir(iconDir, { recursive: true });
await Promise.all([
  copy(`${lucideDir}/icons`, iconDir),
  copy(`${lucideDir}/LICENSE`, path.join(iconDir, 'LICENSE')),
  copy(`${lucideDir}/sprite.svg`, './docs/assets/images/sprite.svg', { overwrite: true })
]);

// Generate metadata from Lucide's tags.json
const tags = JSON.parse(await fs.readFile(`${lucideDir}/tags.json`, 'utf8'));
const svgFiles = await globby(`${iconDir}/*.svg`);
const metadata = svgFiles.map(file => {
  const name = path.basename(file, '.svg');
  return {
    name,
    title: name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    categories: [],
    tags: tags[name] ?? []
  };
});

await fs.writeFile(path.join(iconDir, 'icons.json'), JSON.stringify(metadata, null, 2), 'utf8');
