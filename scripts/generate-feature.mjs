import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const name = process.argv[2];
if (!name || !/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(name)) throw new Error('Usage: npm run generate:feature -- order-items');
const root = fileURLToPath(new URL('../', import.meta.url));
const title = name.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join('');
const routerPath = path.join(root, 'src/Router/router.ts');
let router = await readFile(routerPath, 'utf8');
const tree = /rootRoute\.addChildren\(\[([^\]]*)\]\)/;
if (!tree.test(router)) throw new Error('Router format changed. No files were written.');
const files = {
  [`src/features/${name}/api.ts`]: `import { queryOptions } from "@tanstack/react-query";\nimport { z } from "zod";\nimport { apiClient } from "../../api/apiClient";\n\n// Adapt this schema to your backend contract.\nexport const itemSchema = z.object({ id: z.string(), name: z.string() });\nexport const ${title}Keys = { all: ["${name}"] as const };\nexport const ${title}Query = queryOptions({\n  queryKey: ${title}Keys.all,\n  queryFn: async ({ signal }) => z.array(itemSchema).parse(await apiClient.get("${name}", { signal }).json()),\n});\n`,
  [`src/pages/${title}Page.tsx`]: `import { Alert, Button, CircularProgress, Stack, Typography } from "@mui/material";\nimport { useQuery } from "@tanstack/react-query";\nimport { ${title}Query } from "../features/${name}/api";\nimport { errorMessage } from "../api/errors";\n\nexport default function ${title}Page() {\n  const query = useQuery(${title}Query);\n  return <Stack spacing={2}>\n    <Typography variant="h4" component="h1">${title}</Typography>\n    {query.isPending && <CircularProgress aria-label="Loading" />}\n    {query.isError && <Alert severity="error" action={<Button onClick={() => void query.refetch()}>Retry</Button>}>{errorMessage(query.error)}</Alert>}\n    {query.data?.length === 0 && <Typography>No items yet.</Typography>}\n    {query.data?.map(item => <Typography key={item.id}>{item.name}</Typography>)}\n  </Stack>;\n}\n`,
};
for (const relative of Object.keys(files)) {
  try { await access(path.join(root, relative)); throw new Error(`Already exists: ${relative}`); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
}
if (router.includes(`path: "/${name}"`)) throw new Error('Route already exists.');
router = `import ${title}Page from "../pages/${title}Page";\n` + router;
router = router.replace('export const router = createRouter({', `const ${title}Route = createRoute({ getParentRoute: () => rootRoute, path: "/${name}", component: ${title}Page });\n\nexport const router = createRouter({`);
router = router.replace(tree, (_, children) => `rootRoute.addChildren([${children}, ${title}Route])`);
for (const [relative, content] of Object.entries(files)) {
  const target = path.join(root, relative); await mkdir(path.dirname(target), { recursive: true }); await writeFile(target, content, { flag: 'wx' });
}
await writeFile(routerPath, router);
console.log(`Created /${name}. Add its navigation Link and implement the backend endpoint or mock handler.`);
