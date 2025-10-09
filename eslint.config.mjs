// eslint.config.mjs — ESLint 9 (flat) + Next plugin + TS parser
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import tsParser from "@typescript-eslint/parser";
import pluginImport from "eslint-plugin-import";
import globals from "globals";

export default [
  // ignore de pastas de build/cache
  { ignores: ["node_modules/**", ".next/**", "dist/**", "coverage/**"] },

  // base JS recomendada
  js.configs.recommended,

  // bloco principal (JS/TS/JSX/TSX)
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx,jsx}"],
    languageOptions: {
      // para arquivos TS/TSX usaremos o parser abaixo (override)
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true }
      }
    },
    plugins: {
      "@next/next": nextPlugin,
      import: pluginImport
    },
    rules: {
      // regras oficiais do Next (core-web-vitals)
      ...nextPlugin.configs["core-web-vitals"].rules,

      // suas regras
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "warn",

      // organização de imports
      "import/no-unresolved": "off", // TS/Next resolvem paths/aliases
      "import/order": [
        "warn",
        {
          groups: [["builtin", "external"], ["internal"], ["parent", "sibling", "index"]],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true }
        }
      ],

      // vamos migrar para <Image> aos poucos
      "@next/next/no-img-element": "off"
    }
  },

  // overrides ESPECÍFICOS para TS/TSX: usa o parser do TypeScript
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        // se você quiser regras que dependem do tsconfig, depois podemos setar "project"
        // project: ["./tsconfig.json"]
      }
    },
    rules: {
      // adicione regras TS-only aqui se quiser
    }
  }
];
