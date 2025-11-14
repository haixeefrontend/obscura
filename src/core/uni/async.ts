import { onLoad, onShow } from '@dcloudio/uni-app'
import { reactive, ref, type Reactive, type Ref } from 'vue'

import { List, type Pagination } from '../shared'

export function useAsyncList<T>(
  asyncFn: (args: {
    page?: number
    pagesize?: number
  }) => Promise<Pagination<T>>,
  options: {
    immediate?: boolean
    triggerOn?: 'onShow' | 'onLoad'
    pageSize?: number
  } = {},
): Reactive<List<T>> {
  const { immediate = true, triggerOn, pageSize } = options
  const list = reactive(
    new List<T>(async (args) => {
      return await asyncFn({
        ...args,
        pagesize: pageSize ?? ('' as unknown as number),
      })
    }),
  )

  if (immediate !== false) {
    list.getFirstPage()
  }

  if (triggerOn === 'onShow') {
    onShow(() => {
      list.getFirstPage()
    })
  } else if (triggerOn === 'onLoad') {
    onLoad(() => {
      list.getFirstPage()
    })
  }

  return list
}

export function useAsyncData<T>(
  asyncFn: () => Promise<T>,
  options: { immediate?: boolean; triggerOn?: 'onShow' | 'onLoad' } = {},
): {
  data: Ref<T | undefined>
  loading: Ref<boolean>
  error: Ref<Error | null>
  fetch: () => Promise<void>
} {
  const { immediate = true, triggerOn } = options
  const data = ref<T>()
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const fetch: () => Promise<void> = async () => {
    if (loading.value) return
    loading.value = true
    error.value = null
    try {
      data.value = await asyncFn()
    } catch (error_) {
      error.value = error_ as Error
    } finally {
      loading.value = false
    }
  }

  if (immediate !== false) {
    fetch()
  }

  if (triggerOn === 'onShow') {
    onShow(() => {
      fetch()
    })
  } else if (triggerOn === 'onLoad') {
    onLoad(() => {
      fetch()
    })
  }

  return {
    data,
    loading,
    error,
    fetch,
  }
}
