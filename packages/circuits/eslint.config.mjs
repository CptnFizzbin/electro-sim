import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginTypescript from 'typescript-eslint';
import pluginImport from 'eslint-plugin-import';

export default [
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  pluginJs.configs.recommended,
  ...pluginTypescript.configs.recommended,
  {
    plugins: {
      import: pluginImport,
    },
    settings: {
      ...pluginImport.configs.typescript.settings,
    },
    rules: {
      ...pluginImport.configs.recommended.rules,
      ...pluginImport.configs.typescript.rules,
      'import/no-cycle': 'error',
    },
    languageOptions: {
      parserOptions: {
        ...pluginImport.configs.recommended.parserOptions,
      },
    },
  },
];
