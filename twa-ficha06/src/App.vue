
<template>
  <main class="container">
    <nav>
      <RouterLink to="/">Catálogo</RouterLink>
      <RouterLink to="/items/new">Adicionar jogo</RouterLink>
      <RouterLink to="/pokemon">Pokémon</RouterLink>
    </nav>

    <RouterView />
  </main>
</template>

<style scoped>
.container {
  max-width: 900px;
  margin: 40px auto;
  padding: 25px;
  font-family: Arial, sans-serif;
  text-align: left;
}

nav {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid #ddd;
}

nav a {
  color: #367bd6;
  text-decoration: none;
  font-weight: bold;
}

nav a:hover {
  text-decoration: underline;
}

nav a.router-link-exact-active {
  color: #14803c;
}
</style>
