import { copyFile, readFile, writeFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const name = process.argv[2];
if (name && !/^[a-z][a-z0-9-]*$/.test(name)) throw new Error('Use a lowercase project name, such as my-app.');
const envPath = path.join(root, '.env');
try { await access(envPath); console.log('Keeping existing .env'); }
catch { await copyFile(path.join(root, '.env.example'), envPath, constants.COPYFILE_EXCL); console.log('Created .env with development mocks enabled'); }
if (name) {
  for (const file of ['package.json', 'package-lock.json']) {
    const target = path.join(root, file);
    const json = JSON.parse(await readFile(target, 'utf8'));
    json.name = name;
    if (json.packages?.['']) json.packages[''].name = name;
    await writeFile(target, JSON.stringify(json, null, 2) + '\n');
  }
  const index = path.join(root, 'index.html');
  await writeFile(index, (await readFile(index, 'utf8')).replace(/<title>.*?<\/title>/s, `<title>${name}</title>`));
}
const env = await readFile(envPath, 'utf8');
if (!/^VITE_API_BASE_URL=\S+/m.test(env) && !/^VITE_ENABLE_MOCKS=true\s*$/m.test(env)) {
  throw new Error('Set VITE_API_BASE_URL or enable development mocks in .env.');
}
console.log('Setup complete. Run npm run dev and open /projects.');
