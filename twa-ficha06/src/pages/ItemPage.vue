
<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import ItemDetail from '../components/ItemDetail.vue'
import {
  items,
  status,
  error,
  load,
  ensureLoaded
} from '../store.js'

const route = useRoute()

onMounted(ensureLoaded)

const id = computed(() => Number(route.params.id))

const item = computed(() =>
  (items.value ?? []).find(i => i.id === id.value)
)
</script>

<template>
  <section>
    <RouterLink to="/">← Voltar ao catálogo</RouterLink>

    <p v-if="status === 'idle' || status === 'loading'">
      A carregar...
    </p>

    <div v-else-if="status === 'error'">
      <p>Erro: {{ error }}</p>
      <button @click="load">Tentar novamente</button>
    </div>

    <p v-else-if="!item">
      Jogo {{ route.params.id }} não encontrado.
    </p>

    <ItemDetail v-else :item="item" />
  </section>
</template>
