import type { FilterPattern } from 'unplugin'

export interface Options {
  include?: FilterPattern
  exclude?: FilterPattern
  enforce?: 'pre' | 'post' | undefined
  platform?: 'vue' | 'uni'
}

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U

export type OptionsResolved = Overwrite<
  Required<Options>,
  Pick<Options, 'enforce'>
>

export function resolveOptions(options: Options): OptionsResolved {
  const platform = (() => {
    if (options.platform) return options.platform
    if (!options.platform) {
      if (typeof process !== 'undefined' && process?.env?.UNI_PLATFORM) {
        return 'uni'
      }
    }
    return 'vue'
  })()

  return {
    include: options.include || [/\.[cm]?[jt]sx?$/],
    exclude: options.exclude || [/node_modules/],
    enforce: 'enforce' in options ? options.enforce : 'pre',
    platform,
  }
}
