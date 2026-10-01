import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  mkdtemp,
  mkdir,
  copyFile,
  readFile,
  writeFile,
  rm,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

test('setup preserves environment and generator refuses overwrites', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'react-template-check-'));
  try {
    await mkdir(path.join(root, 'scripts'));
    await mkdir(path.join(root, 'src/Router'), { recursive: true });
    for (const file of [
      'scripts/setup.mjs',
      'scripts/generate-feature.mjs',
      'package.json',
      'package-lock.json',
      '.env.example',
      'index.html',
      'src/Router/router.ts',
    ]) {
      await copyFile(
        new URL(`../${file}`, import.meta.url),
        path.join(root, file),
      );
    }
    const run = (script, ...args) =>
      execFileSync(
        process.execPath,
        [path.join(root, 'scripts', script), ...args],
        { stdio: 'pipe' },
      );
    run('setup.mjs', 'my-app');
    assert.equal(
      JSON.parse(await readFile(path.join(root, 'package.json'))).name,
      'my-app',
    );
    assert.equal(
      JSON.parse(await readFile(path.join(root, 'package-lock.json'))).packages[
        ''
      ].name,
      'my-app',
    );
    await writeFile(
      path.join(root, '.env'),
      'VITE_API_BASE_URL=https://example.com/api\n',
    );
    run('setup.mjs');
    assert.equal(
      await readFile(path.join(root, '.env'), 'utf8'),
      'VITE_API_BASE_URL=https://example.com/api\n',
    );
    run('generate-feature.mjs', 'orders');
    const router = await readFile(
      path.join(root, 'src/Router/router.ts'),
      'utf8',
    );
    assert.match(router, /path: "\/orders"/);
    assert.match(router, /addChildren\(\[[\s\S]*OrdersRoute,\s*\]\)/);
    assert.doesNotMatch(router, /,\s*,/);
    assert.throws(() => run('generate-feature.mjs', 'orders'));
    assert.equal(
      await readFile(path.join(root, 'src/Router/router.ts'), 'utf8'),
      router,
    );
    assert.throws(() => run('generate-feature.mjs', '../escape'));
  } finally {
    // mkdtemp creates this exact private directory under the OS temp directory.
    await rm(root, { recursive: true, force: true });
  }
});
