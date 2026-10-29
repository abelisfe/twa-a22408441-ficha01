
<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import ItemForm from '../components/ItemForm.vue'
import { categories } from '../catalog.js'
import {
  items,
  status,
  error,
  load,
  ensureLoaded,
  addItem
} from '../store.js'

const router = useRouter()

onMounted(ensureLoaded)

const cats = computed(() => categories(items.value ?? []))

function onSave(item) {
  const id = addItem(item)
  router.push({ name: 'item', params: { id } })
}
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

    <ItemForm v-else :cats="cats" @save="onSave" />
  </section>
</template>
