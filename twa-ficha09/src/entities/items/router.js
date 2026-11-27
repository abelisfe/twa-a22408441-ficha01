
import { Router } from 'express'

import { search } from '../../catalog.js'
import { items, nextId, indexOf } from './data.js'
import { itemSchema, itemPatchSchema, listQuerySchema } from './schema.js'
import { validate } from '../../validate.js'
import { notFound } from '../../errors.js'

const router = Router()

// GET /api/items
router.get('/', (req, res) => {
  const { q, page, limit = 20 } =
    listQuerySchema.parse(req.query)

  const result = q ? search(items, q) : items

  // Sem parametros de paginacao, manter a API da Ficha 08
  if (page === undefined && req.query.limit === undefined) {
    return res.json(result)
  }

  const currentPage = page ?? 1
  const pages = Math.max(
    1,
    Math.ceil(result.length / limit)
  )

  if (currentPage > pages) {
    throw notFound(`page ${currentPage} of ${pages}`)
  }

  res.json({
    count: result.length,
    page: currentPage,
    pages,
    results: result.slice(
      (currentPage - 1) * limit,
      currentPage * limit
    )
  })
})

// GET /api/items/:id
router.get('/:id', (req, res) => {
  res.json(items[indexOf(req.params.id)])
})

// POST /api/items
router.post('/', validate(itemSchema), (req, res) => {
  const item = {
    ...req.body,
    id: nextId()
  }

  items.push(item)

  res.status(201)
    .location(`/api/items/${item.id}`)
    .json(item)
})

// PUT /api/items/:id
router.put('/:id', validate(itemSchema), (req, res) => {
  const index = indexOf(req.params.id)

  items[index] = {
    ...req.body,
    id: items[index].id
  }

  res.json(items[index])
})

// PATCH /api/items/:id
router.patch('/:id', validate(itemPatchSchema), (req, res) => {
  const index = indexOf(req.params.id)

  items[index] = {
    ...items[index],
    ...req.body,
    id: items[index].id
  }

  res.json(items[index])
})

// DELETE /api/items/:id
router.delete('/:id', (req, res) => {
  items.splice(indexOf(req.params.id), 1)
  res.status(204).end()
})

export default router
