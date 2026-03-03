/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  bracketSameLine: true,
  embeddedLanguageFormatting: 'auto',
  plugins: ['prettier-plugin-tailwindcss'],
  printWidth: 99,
  quoteProps: 'as-needed',
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  tailwindStylesheet: './src/global.css',
};

export default config;
