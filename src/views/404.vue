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
export default {
  name: "NotFoundPage"
}
</script>