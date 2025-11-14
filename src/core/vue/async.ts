import {
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  type Reactive,
  type Ref,
} from 'vue'

import { List, type Pagination } from '../shared'

export function useAsyncList<T>(
  asyncFn: (args: {
    page?: number
    pagesize?: number
  }) => Promise<Pagination<T>>,
  options: {
    immediate?: boolean
    triggerOn?: 'onBeforeMount' | 'onMounted'
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

  if (triggerOn === 'onBeforeMount') {
    onBeforeMount(() => {
      list.getFirstPage()
    })
  } else if (triggerOn === 'onMounted') {
    onMounted(() => {
      list.getFirstPage()
    })
  }

  return list
}

export function useAsyncData<T>(
  asyncFn: () => Promise<T>,
  options: {
    immediate?: boolean
    triggerOn?: 'onBeforeMount' | 'onMounted'
  } = {},
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

  if (triggerOn === 'onBeforeMount') {
    onBeforeMount(() => {
      fetch()
    })
  } else if (triggerOn === 'onMounted') {
    onMounted(() => {
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
