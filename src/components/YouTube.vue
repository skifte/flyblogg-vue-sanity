<template>
  <figure class="video">
    <LiteYouTubeEmbed :id="videoId" title="title"></LiteYouTubeEmbed>
    <figcaption v-if="figcaption">
      {{figcaption}}
    </figcaption>
  </figure>
</template>
<script>
import getId from 'get-youtube-id'
import LiteYouTubeEmbed from 'vue-lite-youtube-embed'
import 'vue-lite-youtube-embed/dist/style.css'

export default {
  name: 'YouTubeRender',
  components: {
    LiteYouTubeEmbed
  },
  data() {
    return {
      videoId: getId(this.url)
    };
  },
  props: {
    url: {
      type: String,
      default: () => ''
    },
    caption: {
      type: String
    },
    title: {
      type: String,
      default: 'Youtube-video'
    }
  },
   computed: {
    figcaption: function() {
      return this.caption
    }
   }
};
</script>