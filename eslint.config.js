import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import typescriptParser from '@typescript-eslint/parser';
import globals from 'globals';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: typescriptParser,
            parserOptions: {
                sourceType: 'module',
            },
            globals: {
                ...globals.node,
                ...globals.browser,
                Locale: true,
            },
        },
        rules: {
            '@typescript-eslint/no-unused-vars': 'warn',
        },
    },
);