
import assert from 'node:assert/strict'
import { items } from '../twa-ficha02/data.js'
import { sortByPrice } from './src/catalog.js'

// Ordenação crescente
const crescente = sortByPrice(items, 'asc')

assert.equal(crescente[0].name, 'Counter-Strike 2')
assert.equal(crescente.at(-1).name, 'EA Sports FC 26')

// Ordenação decrescente
const decrescente = sortByPrice(items, 'desc')

assert.equal(decrescente[0].name, 'EA Sports FC 26')
assert.equal(decrescente.at(-1).name, 'Counter-Strike 2')

// Confirmar que a lista original não foi alterada
assert.equal(items[0].name, 'Minecraft')

console.log('Todos os testes de sortByPrice passaram!')
