import adapter from "@sveltejs/adapter-netlify";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      "@components": "src/components",
      "@layouts": "src/layouts",
      "@": "src",
    },
  },
};

export default config;
