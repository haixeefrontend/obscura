import { describe, expect, test } from 'vitest'

import * as uniFeats from '../src/uni'
import * as vueFeats from '../src/vue'

describe('Features: Async', () => {
  const asyncFn = async () => {
    return await new Promise<number>((resolve) => {
      setTimeout(() => {
        resolve(42)
      }, 0)
    })
  }
  describe('Vue', () => {
    test('useAsyncData', async () => {
      const { data, loading, error, fetch } = vueFeats.useAsyncData(asyncFn, {
        immediate: false,
      })

      expect(loading.value).toBe(false)
      expect(data.value).toBeUndefined()
      expect(error.value).toBeNull()

      const fetchPromise = fetch()
      expect(loading.value).toBe(true)

      await fetchPromise

      expect(loading.value).toBe(false)
      expect(data.value).toBe(42)
      expect(error.value).toBeNull()
    })
    test('useAsyncList', async () => {
      const list = vueFeats.useAsyncList(() =>
        Promise.resolve({
          list: [1, 2, 3],
          pagination: { current_page: 1, page_count: 1, page_size: 3 },
        }),
      )

      await list.getAllPages()

      expect(list.result).toEqual([1, 2, 3])
    })
  })

  describe('UniApp', () => {
    test('useAsyncData', async () => {
      const { data, loading, error, fetch } = uniFeats.useAsyncData(asyncFn, {
        immediate: false,
      })

      expect(loading.value).toBe(false)
      expect(data.value).toBeUndefined()
      expect(error.value).toBeNull()

      const fetchPromise = fetch()
      expect(loading.value).toBe(true)

      await fetchPromise

      expect(loading.value).toBe(false)
      expect(data.value).toBe(42)
      expect(error.value).toBeNull()
    })
    test('useAsyncList', async () => {
      const list = uniFeats.useAsyncList(() =>
        Promise.resolve({
          list: [1, 2, 3],
          pagination: { current_page: 1, page_count: 1, page_size: 3 },
        }),
      )

      await list.getAllPages()

      expect(list.result).toEqual([1, 2, 3])
    })
  })
})
