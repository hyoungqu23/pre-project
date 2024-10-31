import tailwindcssAspectRatioPlugin from '@tailwindcss/aspect-ratio';
import tailwindcssFormsPlugin from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx,mdx}',
    './src/widgets/**/*.{ts,tsx,mdx}',
    './src/entities/**/*.{ts,tsx,mdx}',
    './src/shared/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    tailwindcssFormsPlugin,
    tailwindcssAspectRatioPlugin,
  ],
};

export default config;
