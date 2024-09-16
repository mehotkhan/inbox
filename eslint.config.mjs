import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.md,"**/*.vue', '**/*.mjs'],
    rules: {
      'no-console': 'off' // allow console.log in TypeScript files
    }
  }
)
