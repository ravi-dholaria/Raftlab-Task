import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config({
  ignores: ['**/node_modules/**', '**/dist/**', 'codegen.ts', 'src/schema/types.ts'],
  files: ['**/*.ts'],
  plugins: {
    '@typescript-eslint': tseslint.plugin,
  },
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  extends: [
    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    eslintConfigPrettier,
  ],
  rules: {
    '@typescript-eslint/no-unused-expressions': [
      'error',
      { allowShortCircuit: true, allowTernary: true },
    ],
  },
});
