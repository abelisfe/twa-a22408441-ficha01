
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

// Elementos da página
const statusElement = document.querySelector('#status')
const list = document.querySelector('#list')
const detail = document.querySelector('#detail')
const searchInput = document.querySelector('#search')
const categorySelect = document.querySelector('#category')
const sortButton = document.querySelector('#sort')

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
    state.status = 'ready'

  } catch (err) {
    state.status = 'error'
    state.error = err.message

  } finally {
    render(state)
  }
}

// Atualizar toda a interface
function render(state) {
  statusElement.replaceChildren()
  list.replaceChildren()
  detail.replaceChildren()

  // Atualizar o texto do botão
  sortButton.textContent =
    state.sortDir === 'desc'
      ? 'Ordenar por preço: decrescente'
      : 'Ordenar por preço: crescente'

  // Atualizar as categorias
  categorySelect.replaceChildren()

  const allOption = document.createElement('option')
  allOption.value = ''
  allOption.textContent = 'Todas as categorias'
  categorySelect.append(allOption)

  categories(state.items).forEach(cat => {
    const option = document.createElement('option')
    option.value = cat
    option.textContent = cat
    categorySelect.append(option)
  })

  categorySelect.value = state.category

  // Estado de carregamento
  if (state.status === 'loading') {
    statusElement.textContent = 'A carregar jogos...'
    return
  }

  // Estado de erro
  if (state.status === 'error') {
    statusElement.textContent =
      `Erro ao carregar jogos: ${state.error}`
    return
  }

  // Filtrar e ordenar os jogos
  const categoryItems = state.category
    ? byCategory(state.items, state.category)
    : state.items

  const filteredItems = search(categoryItems, state.query)
  const sortedItems = sortByPrice(filteredItems, state.sortDir)

  // Mostrar quantidade de resultados
  statusElement.textContent =
    `${sortedItems.length} de ${state.items.length} jogos`

  if (sortedItems.length === 0) {
    statusElement.textContent = 'Nenhum jogo encontrado.'
  }

  // Construir a lista de jogos
  sortedItems.forEach(game => {
    const li = document.createElement('li')

    li.textContent =
      `${game.name} - ${game.price.toFixed(2)} €`

    // Identificador utilizado na delegação de eventos
    li.dataset.id = game.id
    li.style.cursor = 'pointer'

    if (game.id === state.selectedId) {
      li.classList.add('selected')
    }

    list.append(li)
  })

  // Mostrar detalhes do jogo selecionado
  const selectedGame = state.items.find(
    game => game.id === state.selectedId
  )

  if (selectedGame) {
    const title = document.createElement('h3')
    title.textContent = selectedGame.name

    const price = document.createElement('p')
    price.textContent =
      `Preço: ${selectedGame.price.toFixed(2)} €`

    const category = document.createElement('p')
    category.textContent =
      `Categoria: ${selectedGame.category}`

    const tags = document.createElement('p')
    tags.textContent =
      `Tags: ${selectedGame.tags.join(', ')}`

    const developer = document.createElement('p')
    developer.textContent =
      `Produtor: ${selectedGame.developer.name} (${selectedGame.developer.country})`

    detail.append(title, price, category, tags, developer)
  }
}

// Evento único na lista: delegação de eventos
list.addEventListener('click', (event) => {
  const li = event.target.closest('li[data-id]')

  if (!li || !list.contains(li)) {
    return
  }

  const game = state.items.find(
    item => String(item.id) === li.dataset.id
  )

  if (game) {
    state.selectedId = game.id
    render(state)
  }
})

// Alterar a ordenação
sortButton.addEventListener('click', () => {
  state.sortDir = state.sortDir === 'desc' ? 'asc' : 'desc'
  render(state)
})

// Pesquisar jogos
searchInput.addEventListener('input', (event) => {
  state.query = event.target.value
  render(state)
})

// Filtrar por categoria
categorySelect.addEventListener('change', (event) => {
  state.category = event.target.value
  render(state)
})

// Iniciar a aplicação
load()
