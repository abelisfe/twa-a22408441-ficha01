
<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useLoad } from '../composables/useLoad.js'
import { list, PAGE } from '../api/pokeapi.js'

const route = useRoute()
const router = useRouter()

// A pagina atual vem do URL
const page = computed(() => {
  const value = Number(route.query.page ?? 1)
  return Number.isSafeInteger(value) && value > 0 ? value : 1
})

// Carregamento dos dados
const { status, error, data, load } =
  useLoad(() => list(page.value))

// Recarregar quando a pagina muda
watch(page, load)

// Numero total de paginas
const pages = computed(() =>
  Math.ceil((data.value?.count ?? 0) / PAGE)
)

// Navegar entre paginas
function go(p) {
  if (p < 1 || (pages.value > 0 && p > pages.value)) return

  router.push({
    name: 'pokemon',
    query: { page: p }
  })
}
</script>

<template>
  <section>
    <h1>Lista de Pokémon</h1>

    <div class="pagination">
      <button
        :disabled="page <= 1 || status === 'loading'"
        @click="go(page - 1)"
      >
        Anterior
      </button>

      <span>
        Página {{ page }} de {{ pages || '...' }}
      </span>

      <button
        :disabled="status !== 'ready' || page >= pages"
        @click="go(page + 1)"
      >
        Seguinte
      </button>
    </div>

    <p v-if="status === 'loading'">
      A carregar Pokémon...
    </p>

    <div v-else-if="status === 'error'">
      <p>Erro ao carregar: {{ error }}</p>
      <button @click="load">Tentar novamente</button>
    </div>

    <ul v-else>
      <li
        v-for="pokemon in data.results"
        :key="pokemon.name"
      >
        {{ pokemon.name }}
      </li>
    </ul>
  </section>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 20px 0;
}

button {
  padding: 10px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

li {
  padding: 5px;
}
</style>
