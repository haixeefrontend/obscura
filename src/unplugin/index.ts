import { createUnplugin, type UnpluginInstance } from 'unplugin'
import { resolveOptions, type Options } from './options'

export const unplugin: UnpluginInstance<Options | undefined, false> =
  createUnplugin((rawOptions = {}) => {
    const options = resolveOptions(rawOptions)

    const name = 'obscura'
    return {
      name,
      enforce: options.enforce,

      resolveId(source) {
        // Example: resolve virtual module
        if (source === 'obscura') {
          return `obscura/${options.platform}`
        }
      },
    }
  })
