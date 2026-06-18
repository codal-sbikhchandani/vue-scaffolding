import { ref, isRef, watchEffect, type Ref } from 'vue'

export function useFetch<T>(url: string | Ref<string>) {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const isLoading = ref<boolean>(false)

  async function doFetch() {
    isLoading.value = true
    data.value = null
    error.value = null

    const actualUrl = isRef(url) ? url.value : url

    try {
      const response = await fetch(actualUrl)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const json = await response.json()
      data.value = json as T
    } catch (err) {
      // Catch and store the error safely
      error.value = err instanceof Error ? err : new Error(String(err))
    } finally {
      isLoading.value = false
    }
  }

  watchEffect(() => {
    doFetch()
  })

  return {
    data,
    error,
    isLoading,
    retry: doFetch,
  }
}
