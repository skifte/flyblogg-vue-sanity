<template>
  <header class="siteheader">
    <div class="container">
      <nav class="sitenav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    </div>
  </header>
  <main>
  <router-view />
  </main>
  <footer class="sitefooter">
    <div class="container">
      Footer
    </div>
  </footer>
</template>
