<template>
  <div class="app-wrapper">
    <header class="siteheader">
      <div class="container">
        <nav class="sitenav">
        <router-link :to="{ name: 'Home'}" :class="{'router-link-active': $route.name === 'SinglePost'}">Flyblogg</router-link> | 
        <router-link :to="{ name: 'About'}">Om Anders Skifte</router-link>
      </nav>
      </div>
    </header>
    <main>
    <router-view />
    </main>
  </div>
  <footer class="sitefooter">
    <div class="container">
      Footer
    </div>
  </footer>
</template>
