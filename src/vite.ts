/**
 * This entry file is for Vite plugin.
 *
 * @module
 */

import { unplugin } from './index'

/**
 * Vite plugin
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import Obscura from 'obscura/vite'
 *
 * export default defineConfig({
 *   plugins: [Obscura()],
 * })
 * ```
 */
const vite = unplugin.vite as typeof unplugin.vite
export default vite
export { vite as 'module.exports' }
