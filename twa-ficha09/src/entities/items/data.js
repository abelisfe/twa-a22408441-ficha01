
import { readFile } from 'node:fs/promises'
import { notFound } from '../../errors.js'

// Carregar o catalogo apenas uma vez
export const items = JSON.parse(
  await readFile(
    new URL('../../../data/items.json', import.meta.url),
    'utf8'
  )
)

// Calcular o proximo identificador
export const nextId = () =>
  Math.max(0, ...items.map(i => i.id)) + 1

// Procurar um item pelo ID ou lancar 404
export function indexOf(id) {
  const index = items.findIndex(
    item => item.id === Number(id)
  )

  if (index === -1) {
    throw notFound(`item ${id} not found`)
  }

  return index
}
