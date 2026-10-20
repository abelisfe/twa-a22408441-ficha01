
import './style.css'

import {
  sortByPrice,
  search,
  byCategory,
  categories
} from './catalog.js'

// Estado da aplicação
const state = {
  status: 'loading',
  error: null,
  items: [],
  query: '',
  category: '',
  sortDir: 'desc',
  selectedId: null
}

// Carregar os jogos do ficheiro JSON
async function load() {
  state.status = 'loading'
  state.error = null
  render(state)

  try {
    const res = await fetch('/items.json')

    if (!res.ok) {
      throw new Error(`Erro HTTP: ${res.status}`)
    }

    state.items = await res.json()

    const select = document.querySelector('#category')
    select.replaceChildren()

    const allOption = document.createElement('option')
    allOption.value = ''
    allOption.textContent = 'Todas as categorias'
    select.append(allOption)

    categories(state.items).forEach(cat => {
      const option = document.createElement('option')
      option.value = cat
      option.textContent = cat
      select.append(option)
    })

    state.status = 'ready'

  } catch (err) {
    state.status = 'error'
    state.error = err.message

  } finally {
    render(state)
  }
}

// Atualizar a página
function render(state) {
  const list = document.querySelector('#list')
  const detail = document.querySelector('#detail')

  list.replaceChildren()
  detail.replaceChildren()

  if (state.status === 'loading') {
    const message = document.createElement('li')
    message.textContent = 'A carregar jogos...'
    list.append(message)
    return
  }

  if (state.status === 'error') {
    const message = document.createElement('li')
    message.textContent = `Erro ao carregar jogos: ${state.error}`
    list.append(message)
    return
  }

  // Filtrar e ordenar os jogos
  const categoryItems = state.category
    ? byCategory(state.items, state.category)
    : state.items

  const filteredItems = search(categoryItems, state.query)
  const sortedItems = sortByPrice(filteredItems, state.sortDir)

  // Mostrar a lista de jogos
  sortedItems.forEach(game => {
    const li = document.createElement('li')
    li.textContent = `${game.name} - ${game.price.toFixed(2)} €`
    li.style.cursor = 'pointer'

    li.addEventListener('click', () => {
      state.selectedId = game.id
      render(state)
    })

    list.append(li)
  })

  // Mostrar os detalhes do jogo selecionado
  const selectedGame = state.items.find(
    game => game.id === state.selectedId
  )

  if (selectedGame) {
    const title = document.createElement('h3')
    title.textContent = selectedGame.name

    const price = document.createElement('p')
    price.textContent = `Preço: ${selectedGame.price.toFixed(2)} €`

    const category = document.createElement('p')
    category.textContent = `Categoria: ${selectedGame.category}`

    const tags = document.createElement('p')
    tags.textContent = `Tags: ${selectedGame.tags.join(', ')}`

    const developer = document.createElement('p')
    developer.textContent =
      `Produtor: ${selectedGame.developer.name} (${selectedGame.developer.country})`

    detail.append(title, price, category, tags, developer)
  }
}

// Botão para alterar a ordenação
document.querySelector('#sort').addEventListener('click', () => {
  state.sortDir = state.sortDir === 'desc' ? 'asc' : 'desc'
  render(state)

  document.querySelector('#sort').textContent =
    state.sortDir === 'desc'
      ? 'Ordenar por preço: decrescente'
      : 'Ordenar por preço: crescente'
})

// Pesquisa de jogos
document.querySelector('#search').addEventListener('input', (e) => {
  state.query = e.target.value
  render(state)
})

// Filtrar por categoria
document.querySelector('#category').addEventListener('change', (e) => {
  state.category = e.target.value
  render(state)
})

// Iniciar a aplicação
load()

