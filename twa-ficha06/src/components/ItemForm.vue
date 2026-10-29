
<script setup>
import { computed, reactive } from 'vue'

defineProps({
  cats: { type: Array, required: true }
})

const emit = defineEmits(['save'])

const empty = {
  name: '',
  category: '',
  price: null,
  tags: ''
}

const form = reactive({ ...empty })

const errors = computed(() => {
  const e = {}

  if (form.name.length < 3) {
    e.name = 'O nome deve ter pelo menos 3 caracteres'
  }

  if (!form.category) {
    e.category = 'Escolhe uma categoria'
  }

  if (!(form.price > 0)) {
    e.price = 'O preço deve ser superior a 0'
  }

  return e
})

const isValid = computed(() =>
  Object.keys(errors.value).length === 0
)

function submit() {
  if (!isValid.value) return

  emit('save', {
    name: form.name,
    category: form.category,
    price: form.price,
    tags: form.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(Boolean)
  })

  Object.assign(form, empty)
}
</script>

<template>
  <section class="form-section">
    <h2>Adicionar novo jogo</h2>

    <form @submit.prevent="submit">
      <label for="name">Nome</label>
      <input
        id="name"
        v-model.trim="form.name"
        required
        minlength="3"
        placeholder="Nome do jogo"
      />
      <small v-if="errors.name">{{ errors.name }}</small>

      <label for="category-form">Categoria</label>
      <select id="category-form" v-model="form.category" required>
        <option value="" disabled>Escolhe uma categoria</option>
        <option v-for="cat in cats" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>
      <small v-if="errors.category">{{ errors.category }}</small>

      <label for="price">Preço (€)</label>
      <input
        id="price"
        v-model.number="form.price"
        type="number"
        min="0.01"
        step="0.01"
        required
      />
      <small v-if="errors.price">{{ errors.price }}</small>

      <label for="tags">Tags</label>
      <input
        id="tags"
        v-model.trim="form.tags"
        placeholder="aventura, multiplayer, acao"
      />

      <button type="submit" :disabled="!isValid">
        Adicionar jogo
      </button>
    </form>
  </section>
</template>

<style scoped>
.form-section {
  margin-top: 30px;
  padding: 20px;
  background: #f5f5f5;
  color: #222;
  border-radius: 8px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

input, select, button {
  padding: 10px;
  font-size: 15px;
}

small {
  color: #b00020;
}

button {
  margin-top: 10px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
