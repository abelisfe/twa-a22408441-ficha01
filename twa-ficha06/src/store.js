
import { ref } from 'vue'
import { getJSON } from './api/getJSON.js'

export const items = ref(null)
export const status = ref('idle')
export const error = ref(null)

let pending = null

export async function load() {
  if (pending) return pending

  status.value = 'loading'
  error.value = null

  pending = (async () => {
    try {
      items.value = await getJSON('/items.json')
      status.value = 'ready'
    } catch (err) {
      status.value = 'error'
      error.value = err.message
    } finally {
      pending = null
    }
  })()

  return pending
}

export function ensureLoaded() {
  if (items.value === null && status.value !== 'loading') {
    return load()
  }
}

export function addItem(item) {
  if (!items.value) {
    throw new Error('Os jogos ainda nao foram carregados')
  }

  const id = Math.max(0, ...items.value.map(i => i.id)) + 1

  items.value.push({
    id,
    ...item
  })

  return id
}
