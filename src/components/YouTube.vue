<template>
  <LiteYouTubeEmbed :id="videoId" title="YouTube-video"></LiteYouTubeEmbed>
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
    }
  }
};
</script>