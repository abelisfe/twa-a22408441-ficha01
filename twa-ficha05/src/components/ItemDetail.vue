
<script setup>
defineProps({
  item: { type: Object, required: true }
})
</script>

<template>
  <section class="details">
    <h2>Detalhes do jogo</h2>
    <h3>{{ item.name }}</h3>
    <p>Preço: {{ item.price.toFixed(2) }} €</p>
    <p>Categoria: {{ item.category }}</p>
    <p>Tags: {{ item.tags.join(', ') }}</p>
    <p v-if="item.developer">
      Produtor: {{ item.developer.name }}
      ({{ item.developer.country }})
    </p>
  </section>
</template>

<style scoped>
.details {
  margin-top: 25px;
  padding: 20px;
  background: #f5f5f5;
  color: #222;
  border-radius: 8px;
}
</style>
