# unplugin-starter

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Unit Test][unit-test-src]][unit-test-href]

Starter template for [unplugin](https://github.com/unjs/unplugin).

## Installation

```bash
npm i -D unplugin-starter
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Obscura from 'obscura/vite'

export default defineConfig({
  plugins: [Obscura()],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Obscura from 'obscura/rollup'

export default {
  plugins: [Obscura()],
}
```

<br></details>

<details>
<summary>Rolldown</summary><br>

```ts
// rolldown.config.js
import Obscura from 'obscura/rolldown'

export default {
  plugins: [Obscura()],
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
import { build } from 'esbuild'
import Obscura from 'obscura/esbuild'

build({
  plugins: [Obscura()],
})
```

<br></details>

<details>
<summary>Webpack</summary><br>

```js
// webpack.config.js
import Obscura from 'obscura/webpack'

export default {
  /* ... */
  plugins: [Obscura()],
}
```

<br></details>

<details>
<summary>Rspack</summary><br>

```ts
// rspack.config.js
import Obscura from 'obscura/rspack'

export default {
  /* ... */
  plugins: [Obscura()],
}
```

<br></details>

## License

[MIT](./LICENSE) License © 2025-PRESENT Haixee Frontend Team

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/obscura.svg
[npm-version-href]: https://npmjs.com/package/obscura
[npm-downloads-src]: https://img.shields.io/npm/dm/obscura
[npm-downloads-href]: https://www.npmcharts.com/compare/obscura?interval=30
[unit-test-src]: https://github.com/sxzz/obscura/actions/workflows/unit-test.yml/badge.svg
[unit-test-href]: https://github.com/sxzz/obscura/actions/workflows/unit-test.yml
