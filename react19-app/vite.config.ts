/// <reference types="vitest" />
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const enableCompiler = true;

const babelConfig = enableCompiler
  ? { babel: { plugins: ["babel-plugin-react-compiler", {}] } }
  : undefined;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react(babelConfig)],
  server: {
    port: 3000,
  },
});
