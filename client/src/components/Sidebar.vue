<template>
  <aside class="sidebar">
    <ul>
      <li><RouterLink to="/">Dashboard</RouterLink></li>
      <li><RouterLink to="/production-tracking">Production Tracking</RouterLink></li>
      <li><RouterLink to="/quality-control">Quality Control</RouterLink></li>
    </ul>
  </aside>
</template>

<script setup>
// No script needed for static sidebar
</script>

<style scoped>
.sidebar {
  width: 200px;
  background: #f4f4f4;
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin: 1rem 0;
}

.sidebar a {
  text-decoration: none;
  color: #333;
}

.sidebar a.router-link-exact-active {
  font-weight: bold;
}
</style>
