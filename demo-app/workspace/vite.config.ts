/// <reference types="vitest" />
import tailwindcss from "@tailwindcss/vite";
import tanstackRouter from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackRouter({
      target: "react",
      // Für Schulung auf false, in realer Anwendung
      // sollte man das auf true setzen
      autoCodeSplitting: false,
    }),
    react(),
  ],
  server: {
    port: 3000,
  },
  test: {
    environment: "jsdom",

    setupFiles: ["./vitest-setup.ts"],
    restoreMocks: true,
  },
});
