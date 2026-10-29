
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import {
  search,
  byCategory,
  categories,
  sortByPrice
} from '../catalog.js'

import {
  items,
  status,
  error,
  load,
  ensureLoaded
} from '../store.js'

import ItemList from '../components/ItemList.vue'

const router = useRouter()

const query = ref('')
const category = ref('')
const sortDir = ref('desc')

onMounted(ensureLoaded)

const visible = computed(() => {
  let result = search(items.value ?? [], query.value)

  if (category.value) {
    result = byCategory(result, category.value)
  }

  return sortByPrice(result, sortDir.value)
})

const cats = computed(() => categories(items.value ?? []))

function toggleSort() {
  sortDir.value = sortDir.value === 'desc' ? 'asc' : 'desc'
}

function selectItem(id) {
  router.push({ name: 'item', params: { id } })
}
</script>

<template>
  <section>
    <h1>Catálogo de Jogos</h1>

    <div class="controls">
      <input v-model="query" placeholder="Pesquisar jogos..." />

      <select v-model="category">
        <option value="">Todas as categorias</option>
        <option v-for="cat in cats" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>

      <button @click="toggleSort">
        Preço {{ sortDir === 'desc' ? '↓' : '↑' }}
      </button>
    </div>

    <p v-if="status === 'loading' || status === 'idle'">
      A carregar jogos...
    </p>

    <div v-else-if="status === 'error'">
      <p>Erro: {{ error }}</p>
      <button @click="load">Tentar novamente</button>
    </div>

    <div v-else>
      <p>{{ visible.length }} de {{ items.length }} jogos</p>

      <p v-if="visible.length === 0">Nenhum jogo encontrado.</p>

      <ItemList
        v-else
        :items="visible"
        @select="selectItem"
      />
    </div>
  </section>
</template>

<style scoped>
.controls {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 20px 0;
}

input, select, button {
  padding: 10px;
}
</style>
