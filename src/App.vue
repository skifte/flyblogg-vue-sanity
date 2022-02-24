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
      Laget med <a href="https://vuejs.org/">Vue.js</a> og <a href="https://www.sanity.io/">Sanity.io</a>. Kjører hos <a href="https://www.netlify.com/">Netlify</a>. Koden er på <a href="https://github.com/skifte/vue-sanity-blog">Github</a>.
    </div>
  </footer>
</template>
