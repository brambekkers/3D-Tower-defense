import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { templateCompilerOptions } from '@tresjs/core';

// import Unimport from 'unimport/unplugin';

// const unImportSettings = {
//   dts: './src/auto-imports.d.ts',
//   presets: ['vue', 'pinia'],
//   dirs: ['./src/composables/*', './src/stores/*', './src/types/*'],
// };
const root = fileURLToPath(new URL('./src', import.meta.url));
export default defineConfig({
  plugins: [
    vue({
      // Other config
      ...templateCompilerOptions,
    }),
    // Unimport.vite(unImportSettings),
  ],
  assetsInclude: ['**/*.fbx'],
  resolve: {
    alias: {
      '@': root,
    },
  },
});
