<template>
<section>
  <h2>{{title}}</h2>
  <figure class="figure map">
    <div class="map-container">
      <iframe :title="title" :src="src" width="900" height="600"/>
    </div>
    <figcaption v-if="figcaption">
      {{figcaption}}
    </figcaption>
  </figure>
  </section>
</template>
<script>


export default {
  name: 'GPS-track',
  props: {
    gpstrack: {
      type: Object
    },
  },
  computed: {
    src: function() {
      return this.gpstrack.src
    },
    title: function() {
      return this.gpstrack.title
    },
    figcaption: function() {
      return this.gpstrack.caption
    }
  }
}
</script>