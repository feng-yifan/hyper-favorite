import { crx } from "@crxjs/vite-plugin";
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from "vite-tsconfig-paths";
import manifest from "./manifest.config";
import { PATH_ENTRANCE_DASHBOARD, PATH_ENTRANCE_POPUP } from "./src/constant";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    crx({manifest}),
  ],
  server: {
    port: 3000,
    hmr: {port: 3000},
  },
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, PATH_ENTRANCE_POPUP),
        dashboard: resolve(__dirname, PATH_ENTRANCE_DASHBOARD),
      },
    },
  },
});
