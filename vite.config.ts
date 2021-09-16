import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import pluginEnv from "vite-plugin-vue-env";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [
      vue({
        template: {
          transformAssetUrls: {
            audio: ["src", "srcset"],
            img: ["src", "srcset"],
          },
        },
      }),
      pluginEnv(process.env, {
        getEnvFullName: (name) => `ENV.${name}`,
      }),
    ],
    resolve: {
      alias: {
        "@/": `${path.resolve(__dirname, "src")}/`,
        "@scss/": `${path.resolve(__dirname, "src", "assets", "scss")}/`,
        "@img/": `${path.resolve(__dirname, "src", "assets", "img")}/`,
        "@voices/": `${path.resolve(__dirname, "src", "assets", "voices")}/`,
        "~/": `${path.resolve(__dirname, "src")}/`,
      },
    },
  });
};
