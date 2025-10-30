// 项目配置页面
import { defineConfig, loadEnv, splitVendorChunkPlugin } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";

const CWD = process.cwd();

//配置参考 https://vitejs.dev/config/
export default defineConfig((mode) => {
  const { VITE_BASE_URL } = loadEnv(mode, CWD);
  return {
    base: "./",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [vue(), vueJsx(), svgLoader(), splitVendorChunkPlugin()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ["vue", "vue-router"],
            elementPlus: ["element-plus", "@element-plus/icons-vue"],
            echarts: ["echarts"],
            vod: ["vod-js-sdk-v6"],
            moment: ["moment"],
          },
        },
      },
      chunkSizeWarningLimit: 1500,
    },
    server: {
      port: 18081,
      host: "0.0.0.0",
      proxy: {
        "/img-tx": {
          // target: "http://117.72.198.60",
          target: "http://localhost:10010",
          changeOrigin: true,
          // rewrite: (path) => {
          //   return path.replace(/^\/img-tx/, '')
          // }
        },
      },
    },
  };
});
