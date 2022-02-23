<template>
  <header class="siteheader">
    <div class="container">
      <nav class="sitenav">
      <router-link to="/flyblogg" :class="{'router-link-active': $route.name === 'SinglePost'}">Flyblogg</router-link> | 
      <router-link to="/about">Om Anders Skifte</router-link>
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
