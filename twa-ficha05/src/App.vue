
<script setup>
import { ref, computed, watch } from 'vue'

import {
  search,
  byCategory,
  categories,
  sortByPrice
} from './catalog.js'

import ItemList from './components/ItemList.vue'
import ItemDetail from './components/ItemDetail.vue'
import ItemForm from './components/ItemForm.vue'

import { getJSON } from './api/getJSON.js'
import { useLoad } from './composables/useLoad.js'

// Carregamento dos dados
const {
  status,
  error,
  data: items,
  load
} = useLoad(() => getJSON('/items.json'))

// Estado da interface
const query = ref('')
const category = ref('')
const sortDir = ref('desc')
const selectedId = ref(null)

// Jogos visiveis
const visible = computed(() => {
  let result = search(items.value ?? [], query.value)

  if (category.value !== '') {
    result = byCategory(result, category.value)
  }

  return sortByPrice(result, sortDir.value)
})

// Categorias
const cats = computed(() =>
  categories(items.value ?? [])
)

// Jogo selecionado
const selected = computed(() =>
  (items.value ?? []).find(
    game => game.id === selectedId.value
  )
)

// Proximo identificador
const nextId = computed(() =>
  Math.max(0, ...(items.value ?? []).map(i => i.id)) + 1
)

// Adicionar um novo jogo
function addItem(item) {
  if (!items.value) return

  items.value.push({
    id: nextId.value,
    ...item
  })
}

// Alterar ordenacao
function toggleSort() {
  sortDir.value = sortDir.value === 'desc'
    ? 'asc'
    : 'desc'
}

// Limpar selecao quando a pesquisa muda
watch(query, () => {
  selectedId.value = null
})
</script>

<template>
  <main class="container">
    <h1>Catálogo de Jogos</h1>
    <p>Ficha 05 — Componentes e Formulários</p>

    <div class="controls">
      <input
        v-model="query"
        type="search"
        placeholder="Pesquisar jogos..."
      />

      <select v-model="category">
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

    <p v-if="status === 'loading'">
      A carregar jogos...
    </p>

    <div v-else-if="status === 'error'">
      <p>Erro ao carregar jogos: {{ error }}</p>
      <button @click="load">Tentar novamente</button>
    </div>

    <div v-else>
      <h2>Jogos disponíveis</h2>

      <p>
        {{ visible.length }} de {{ items.length }} jogos
      </p>

      <p v-if="visible.length === 0">
        Nenhum jogo encontrado.
      </p>

      <ItemList
        v-else
        :items="visible"
        :selected-id="selectedId"
        @select="selectedId = $event"
      />

      <ItemDetail
        v-if="selected"
        :item="selected"
      />

      <ItemForm
        :cats="cats"
        @save="addItem"
      />
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

.controls input,
.controls select,
.controls button {
  padding: 10px;
  font-size: 15px;
}

button {
  cursor: pointer;
}
</style>
