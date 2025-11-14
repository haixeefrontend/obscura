/**
 * This entry file is for Rollup plugin.
 *
 * @module
 */

import { unplugin } from './index'

/**
 * Rollup plugin
 *
 * @example
 * ```ts
 * // rollup.config.js
 * import Obscura from 'obscura/rollup'
 *
 * export default {
 *   plugins: [Obscura()],
 * }
 * ```
 */
const rollup = unplugin.rollup as typeof unplugin.rollup
export default rollup
export { rollup as 'module.exports' }
