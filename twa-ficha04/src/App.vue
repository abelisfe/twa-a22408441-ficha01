
<script setup>
import { ref, computed } from 'vue'
import {
  search,
  byCategory,
  categories,
  sortByPrice
} from './catalog.js'

// Estado da aplicação
const status = ref('loading')
const error = ref(null)
const items = ref([])
const query = ref('')
const category = ref('')
const sortDir = ref('desc')
const selectedId = ref(null)

// Carregar os jogos do ficheiro JSON
async function load() {
  status.value = 'loading'
  error.value = null

  try {
    const res = await fetch('/items.json')

    if (!res.ok) {
      throw new Error(`Erro HTTP: ${res.status}`)
    }

    items.value = await res.json()
    status.value = 'ready'
  } catch (err) {
    status.value = 'error'
    error.value = err.message
  }
}

// Jogos visíveis: pesquisa, categoria e ordenação
const visible = computed(() => {
  let result = search(items.value, query.value)

  if (category.value !== '') {
    result = byCategory(result, category.value)
  }

  return sortByPrice(result, sortDir.value)
})

// Categorias disponíveis
const cats = computed(() => categories(items.value))

// Jogo selecionado
const selected = computed(() =>
  items.value.find(game => game.id === selectedId.value)
)

// Alternar a ordenação
function toggleSort() {
  sortDir.value = sortDir.value === 'desc' ? 'asc' : 'desc'
}

// Iniciar o carregamento
load()
</script>

<template>
  <main class="container">
    <h1>Catálogo de Jogos</h1>
    <p>Ficha 04 — Tecnologias Web Avançadas</p>

    <div class="controls">
      <input
        v-model="query"
        type="search"
        placeholder="Pesquisar jogos..."
        aria-label="Pesquisar jogos"
      />

      <select v-model="category" aria-label="Categoria">
        <option value="">Todas as categorias</option>
        <option
          v-for="cat in cats"
          :key="cat"
          :value="cat"
        >
          {{ cat }}
        </option>
      </select>

      <button @click="toggleSort">
        Preço {{ sortDir === 'desc' ? '↓' : '↑' }}
      </button>
    </div>

    <!-- Estado de carregamento -->
    <p v-if="status === 'loading'">
      A carregar jogos...
    </p>

    <!-- Estado de erro -->
    <div v-else-if="status === 'error'">
      <p>Erro ao carregar jogos: {{ error }}</p>
      <button @click="load">Tentar novamente</button>
    </div>

    <!-- Estado pronto -->
    <div v-else>
      <h2>Jogos disponíveis</h2>

      <p>{{ visible.length }} de {{ items.length }} jogos</p>

      <p v-if="visible.length === 0">
        Nenhum jogo encontrado.
      </p>

      <ul v-else class="game-list">
        <li
          v-for="game in visible"
          :key="game.id"
          :class="{ selected: game.id === selectedId }"
          @click="selectedId = game.id"
        >
          {{ game.name }} — {{ game.price.toFixed(2) }} €
        </li>
      </ul>

      <section v-if="selected" class="details">
        <h2>Detalhes do jogo</h2>
        <h3>{{ selected.name }}</h3>
        <p>Preço: {{ selected.price.toFixed(2) }} €</p>
        <p>Categoria: {{ selected.category }}</p>
        <p>Tags: {{ selected.tags.join(', ') }}</p>
        <p>
          Produtor: {{ selected.developer.name }}
          ({{ selected.developer.country }})
        </p>
      </section>
    </div>
  </main>
</template>

<style scoped>
.container {
  max-width: 850px;
  margin: 40px auto;
  padding: 25px;
  font-family: Arial, sans-serif;
  text-align: left;
}

h1 {
  color: #333;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 25px 0;
}

input, select, button {
  padding: 10px;
  font-size: 15px;
}

button {
  cursor: pointer;
}

.game-list {
  list-style: none;
  padding: 0;
}

.game-list li {
  padding: 12px;
  margin-bottom: 6px;
  background: #f1f1f1;
  border-radius: 5px;
  cursor: pointer;
  color: #222;
}

.game-list li:hover {
  background: #dddddd;
}

.game-list li.selected {
  background: #c8e1ff;
  border: 2px solid #367bd6;
}

.details {
  margin-top: 25px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  color: #222;
}
</style>

