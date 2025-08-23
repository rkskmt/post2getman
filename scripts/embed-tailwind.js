// Convert built CSS to a JS module that exports a template string for inlining
// Usage: node scripts/embed-tailwind.js
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const inputPath = resolve('src/styles/bundle.css')
const outputPath = resolve('src/styles/tailwind.css.js')

try {
  const css = readFileSync(inputPath, 'utf8')
  const escaped = css
    .replace(/`/g, '\\`')
  const js = `export const tailwindCss = \`${escaped}\`\n`
  writeFileSync(outputPath, js, 'utf8')
  console.log(`Wrote inline CSS module: ${outputPath}`)
} catch (e) {
  console.error('Failed to generate inline CSS module:', e)
  process.exit(1)
}
