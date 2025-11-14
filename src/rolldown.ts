/**
 * This entry file is for Rolldown plugin.
 *
 * @module
 */

import { unplugin } from './index'

/**
 * Rolldown plugin
 *
 * @example
 * ```ts
 * // rolldown.config.js
 * import Obscura from 'obscura/rolldown'
 *
 * export default {
 *   plugins: [Obscura()],
 * }
 * ```
 */
const rolldown = unplugin.rolldown as typeof unplugin.rolldown
export default rolldown
export { rolldown as 'module.exports' }
