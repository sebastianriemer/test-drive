import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [  
  {
    files: ["**/*.js"],	
    languageOptions: {
      sourceType: "commonjs", // Specifies CommonJS as the module system.
    },	
  },
  {
    ignores: [
	  "target/*",
	  "src/main/resources/static/js/require.js"
    ]
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,  // Inherit browser globals like `window`, `document`, etc.
        define: "readonly",   // Add `define` as a global variable (for RequireJS).
        require: "readonly",  // Add `require` as a global variable (for RequireJS).
      },
    },
  },
  pluginJs.configs.recommended, // Apply the recommended ESLint configuration.
  { rules: {
      // Set 'no-unused-vars' rule to 'warn' globally
      'no-unused-vars': 'warn',  // This turns the 'no-unused-vars' rule into a warning
    },
  }
];