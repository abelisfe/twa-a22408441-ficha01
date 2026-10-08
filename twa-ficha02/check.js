
import assert from 'node:assert/strict'
import { items } from './data.js'
import {
  byCategory,
  search,
  total,
  top,
  categories,
  withDiscount
} from './catalog.js'

// Teste 1 - Filtrar por categoria
assert.equal(byCategory(items, 'acao').length, 3)

// Teste 2 - Pesquisar jogos
assert.equal(search(items, 'minecraft').length, 1)

// Teste 3 - Somar os precos
assert.equal(Number(total(items).toFixed(2)), 303.93)

// Teste 4 - Obter os jogos mais caros
assert.equal(top(items, 3).length, 3)
assert.equal(top(items, 3)[0].name, 'EA Sports FC 26')

// Teste 5 - Obter categorias sem repeticoes
assert.deepEqual(categories(items), [
  'acao',
  'desporto',
  'rpg',
  'sandbox',
  'simulacao'
])

// Teste 6 - Aplicar desconto sem alterar o original
const discounted = withDiscount(items, 20)

assert.equal(Number(discounted[0].price.toFixed(2)), 23.99)
assert.equal(items[0].price, 29.99)
