/**
 * This entry file is for Farm plugin.
 *
 * @module
 */

import { unplugin } from './index'

/**
 * Farm plugin
 *
 * @example
 * ```ts
 * // farm.config.js
 * import Obscura from 'obscura/farm'
 *
 * export default {
 *   plugins: [Obscura()],
 * }
 * ```
 */
const farm = unplugin.farm as typeof unplugin.farm
export default farm
export { farm as 'module.exports' }
