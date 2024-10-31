import tailwindcssAspectRatioPlugin from '@tailwindcss/aspect-ratio';
import tailwindcssFormsPlugin from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const generateValues = (fontWeights: string[]) => {
  const fontSizes = [
    8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72,
    80, 96,
  ];

  return Object.fromEntries(
    fontSizes.flatMap((fontSize) =>
      fontWeights.map((fontWeight) => [
        `${fontSize}-${fontWeight}`,
        `${fontSize}-${fontWeight}`,
      ]),
    ),
  );
};

const typographyPlugin = plugin(({ matchUtilities, theme }) => {
  const createTypographyStyles = (value: string) => {
    const [fontSizeStr, fontWeightStr] = value.split('-').map((v) => v.trim());
    const fontSize = parseInt(fontSizeStr, 10);
    const fontWeight = theme(`fontWeight.${fontWeightStr}`) || 'normal';

    const viewportFontSize = (fontSize / 1920) * 100;
    const responsiveFontSize = `min(${fontSize}px, ${viewportFontSize}vw)`;

    return {
      fontSize: responsiveFontSize,
      lineHeight: theme('lineHeight.normal') || '150%',
      fontWeight,
    };
  };

  matchUtilities(
    {
      'typo-display': createTypographyStyles,
      'typo-title': createTypographyStyles,
      'typo-body': createTypographyStyles,
      'typo-caption': createTypographyStyles,
    },
    {
      values: {
        ...generateValues(['bold', 'extrabold']),
        ...generateValues(['medium', 'semibold', 'bold']),
        ...generateValues(['normal', 'medium', 'semibold', 'bold']),
        ...generateValues(['light', 'normal', 'medium']),
      },
    },
  );
});

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx,mdx}',
    './src/widgets/**/*.{ts,tsx,mdx}',
    './src/entities/**/*.{ts,tsx,mdx}',
    './src/shared/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        tablet: '576px',
        laptop: '940px',
        desktop: '1280px',
        desktop_max: '1920px',
      },
      borderRadius: {
        10: '0.625rem',
        20: '1.25rem',
        40: '2.5rem',
        80: '5rem',
      },
    },
  },
  plugins: [
    tailwindcssFormsPlugin,
    tailwindcssAspectRatioPlugin,
    typographyPlugin,
  ],
};

export default config;
