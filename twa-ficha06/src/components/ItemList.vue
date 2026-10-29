
<script setup>
defineProps({
  items: { type: Array, required: true },
  selectedId: { type: Number, default: null }
})

const emit = defineEmits(['select'])
</script>

<template>
  <ul class="game-list">
    <li
      v-for="item in items"
      :key="item.id"
      :class="{ selected: item.id === selectedId }"
      @click="emit('select', item.id)"
    >
      {{ item.name }} — {{ item.price.toFixed(2) }} €
    </li>
  </ul>
</template>

<style scoped>
.game-list {
  list-style: none;
  padding: 0;
}

.game-list li {
  padding: 12px;
  margin-bottom: 6px;
  background: #f1f1f1;
  color: #222;
  border-radius: 5px;
  cursor: pointer;
}

.game-list li:hover {
  background: #ddd;
}

.game-list li.selected {
  background: #c8e1ff;
  border: 2px solid #367bd6;
}
</style>
