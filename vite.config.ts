import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  envDir: resolve(projectRoot, 'api'),
});
