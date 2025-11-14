/**
 * This entry file is for esbuild plugin.
 *
 * @module
 */

import { unplugin } from './index'

/**
 * Esbuild plugin
 *
 * @example
 * ```ts
 * import { build } from 'esbuild'
 * import Obscura from 'obscura/esbuild'
 * 
 * build({ plugins: [Obscura()] })
```
 */
const esbuild = unplugin.esbuild as typeof unplugin.esbuild
export default esbuild
export { esbuild as 'module.exports' }
