import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),

      // jwt-decode import’unu doğru ESM build’e yönlendiriyoruz:
      "jwt-decode": path.resolve(
        __dirname,
        "node_modules/jwt-decode/build/esm/index.js"
      )
    }
  }
});
