
import { Router } from 'express'
import { readFile } from 'node:fs/promises'
import { search } from '../catalog.js'

const router = Router()

// Carregar os jogos uma vez, ao arrancar
const items = JSON.parse(
  await readFile(
    new URL('../../data/items.json', import.meta.url),
    'utf8'
  )
)

// Validacao dos dados recebidos
function validate(body) {
  const errors = {}

  if (typeof body.name !== 'string' ||
      body.name.trim().length < 3) {
    errors.name = 'at least 3 characters'
  }

  if (typeof body.price !== 'number' ||
      !Number.isFinite(body.price) ||
      body.price <= 0) {
    errors.price = 'must be > 0'
  }

  return errors
}

// GET /api/items
// Todos os jogos, com pesquisa opcional
router.get('/', (req, res) => {
  const q = req.query.q

  if (typeof q !== 'string' || q === '') {
    return res.json(items)
  }

  res.json(search(items, q))
})

// GET /api/items/:id
// Um jogo pelo identificador
router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const item = items.find(i => i.id === id)

  if (!item) {
    return res.status(404).json({
      error: `item ${req.params.id} not found`
    })
  }

  res.json(item)
})

// POST /api/items
// Criar um jogo
router.post('/', (req, res) => {
  const body = req.body ?? {}
  const errors = validate(body)

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors })
  }

  const id = Math.max(0, ...items.map(i => i.id)) + 1

  const item = {
    ...body,
    id,
    name: body.name.trim(),
    tags: Array.isArray(body.tags) ? body.tags : []
  }

  items.push(item)

  res.status(201).json(item)
})

// PUT /api/items/:id
// Substituir os dados de um jogo
router.put('/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = items.findIndex(i => i.id === id)

  if (index === -1) {
    return res.status(404).json({
      error: 'not found'
    })
  }

  const body = req.body ?? {}
  const errors = validate(body)

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors })
  }

  items[index] = {
    ...body,
    id,
    name: body.name.trim(),
    tags: Array.isArray(body.tags) ? body.tags : []
  }

  res.json(items[index])
})

// DELETE /api/items/:id
// Apagar um jogo
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = items.findIndex(i => i.id === id)

  if (index === -1) {
    return res.status(404).json({
      error: 'not found'
    })
  }

  items.splice(index, 1)

  res.status(204).end()
})

export default router
