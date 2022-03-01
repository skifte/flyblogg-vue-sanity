<template>
  <div class="container page-not-found text-center">
    <div class="error-message">
      <h1>404: Siden finnes ikke</h1>
      <p>Siden du leter etter har blitt flyttet eller eksisterer ikke lenger.</p>
      <p> Gå til <router-link :to="{ name: 'Home'}">forsiden</router-link>.</p>
    </div>
  </div>
</template>

<script>
import {useMeta} from '@/helpers/helpers.js'
export default {
  name: "NotFoundPage",
  data() {
    return {
      metaContent: {
        title: '404 | Anders Skifte',
        excerpt: 'Siden du leter etter har blitt flyttet eller eksisterer ikke lenger',
        ogtype: 'website'
      }
    }
  },
  created() {
    useMeta(this.metaContent, this.$route)
  }
}
</script>

