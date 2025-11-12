import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => ({
  plugins: [react()],
  server: {
    port: 5173,
  },
  define: {
    __MOVIE_API_URL__: JSON.stringify(
      process.env.VITE_MOVIE_API_URL || "http://localhost:8080"
    ),
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
}));
