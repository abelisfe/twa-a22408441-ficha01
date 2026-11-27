
import assert from 'node:assert/strict'

const BASE = process.env.BASE ?? 'http://localhost:3000/api'
const headers = { 'Content-Type': 'application/json' }

// GET - lista de jogos
let res = await fetch(`${BASE}/items`)
assert.equal(res.status, 200)

const all = await res.json()
assert.ok(all.length >= 8)

// GET - pesquisa
res = await fetch(`${BASE}/items?q=minecraft`)
assert.equal(res.status, 200)
assert.ok(
  (await res.json()).some(i => i.name === 'Minecraft')
)

// GET - jogo inexistente
res = await fetch(`${BASE}/items/999`)
assert.equal(res.status, 404)
assert.ok((await res.json()).error)

// POST - dados invalidos
res = await fetch(`${BASE}/items`, {
  method: 'POST',
  headers,
  body: JSON.stringify({ name: 'ab', price: -1 })
})

assert.equal(res.status, 400)
assert.deepEqual(
  Object.keys((await res.json()).errors).sort(),
  ['name', 'price']
)

// POST - criar jogo
res = await fetch(`${BASE}/items`, {
  method: 'POST',
  headers,
  body: JSON.stringify({
    name: 'Chess',
    price: 19.9,
    category: 'game'
  })
})

assert.equal(res.status, 201)
const created = await res.json()
assert.equal(created.name, 'Chess')
assert.ok(created.id > 8)

// GET - consultar jogo criado
res = await fetch(`${BASE}/items/${created.id}`)
assert.equal(res.status, 200)
assert.equal((await res.json()).name, 'Chess')

// GET - pesquisar jogo criado
res = await fetch(`${BASE}/items?q=chess`)
assert.equal(res.status, 200)
assert.ok(
  (await res.json()).some(i => i.id === created.id)
)

// PUT - atualizar jogo
res = await fetch(`${BASE}/items/${created.id}`, {
  method: 'PUT',
  headers,
  body: JSON.stringify({
    name: 'Chess Deluxe',
    price: 24.9,
    category: 'game',
    tags: []
  })
})

assert.equal(res.status, 200)
assert.equal((await res.json()).name, 'Chess Deluxe')

// DELETE - eliminar jogo
res = await fetch(`${BASE}/items/${created.id}`, {
  method: 'DELETE'
})
assert.equal(res.status, 204)

// GET - confirmar eliminacao
res = await fetch(`${BASE}/items/${created.id}`)
assert.equal(res.status, 404)

// Rota inexistente
res = await fetch(`${BASE}/nao-existe`)
assert.equal(res.status, 404)
assert.ok((await res.json()).error)
