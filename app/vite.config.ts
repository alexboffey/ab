import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3333,
    open: true,
    proxy: {
      // with options
      "/api": {
        target: "http://localhost:4444",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        // secure: false,
      },
    },
  },
});
