/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'tailwindcss/nesting': {}, // Opcional, si usas anidación de CSS nativo
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;