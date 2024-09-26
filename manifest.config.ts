import packageJson from './package.json';
import { defineManifest } from "@crxjs/vite-plugin";
import { PATH_ENTRANCE_DASHBOARD, PATH_ENTRANCE_POPUP } from "./src/constant";

const {name, version} = packageJson;

const [major, minor, patch] = version
  .replace(/[^\d.-]+/g, '')
  .split(/[.-]/);

export default defineManifest(async (env) => ({
  manifest_version: 3,
  name: env.mode === 'staging' ? `[INTERNAL]${name}` : name,
  version: `${major}.${minor}.${patch}`,
  icons: {
    16: 'src/assert/images/bma16.png',
    24: 'src/assert/images/bma24.png',
    32: 'src/assert/images/bma32.png',
    64: 'src/assert/images/bma64.png',
  },
  action: {
    default_icon: 'src/assert/images/bm64.png',
    default_popup: PATH_ENTRANCE_POPUP,
    default_title: '加入书签',
  },
  side_panel: {
    default_path: PATH_ENTRANCE_POPUP,
  },
  options_page: PATH_ENTRANCE_DASHBOARD,
  background: {
    service_worker: 'src/module/worker/index.ts',
  },
  permissions: ['tabs', 'sidePanel'],
  web_accessible_resources: [{
    resources: [
      PATH_ENTRANCE_POPUP,
      PATH_ENTRANCE_DASHBOARD,
    ],
    matches: ['http://*/*', 'https://*/*'],
  }],
}));
