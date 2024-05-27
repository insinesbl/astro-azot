import { defineConfig } from 'astro/config';

/** @type {import('astro').AstroUserConfig} */
import playformCompress from "@playform/compress";

// https://astro.build/config
export default defineConfig({
  integrations: [playformCompress()]
});
