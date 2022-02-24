<template>
  <div class="container">
    <div class="text-center" v-if="loading">
      <div class="spinner">Laster...</div>
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <article v-if="post" class="blogpost">
      <h1 class="post-title">{{ post.title }}</h1>
      <Meta :post="post"/>
      <!-- <img v-if="post.image" :src="imageUrlFor(post.image).width(800)" /> -->
      <SanityBlocks :blocks="blocks" :serializers="serializers"/>
      <Map v-if="post.gpstrack" :gpstrack="post.gpstrack"/>
    </article>
  </div>
</template>

<script>
import { SanityBlocks } from "sanity-blocks-vue-component"
import sanity from "../client"
import imageUrlBuilder from "@sanity/image-url"
import YouTube from '@/components/YouTube.vue'
import Image from '@/components/Image.vue'
import Map from '@/components/GPSTrack.vue'
import Meta from '@/components/MetaSection'

const imageBuilder = imageUrlBuilder(sanity)
const query = `*[slug.current == $slug] {
  _id,
  publishedAt,
  title,
  slug,
  body,
  "gpstrack": gpstrack->{
    _id,
    title,
    src,
    caption,
  },
"name":author->name,
"authorImage":author->image,
"estimatedReadingTime": round(length(pt::text(body)) / 4.5 / 180 )
}[0]`

export default {
  name: "SinglePost",
  components: { 
      SanityBlocks,
      Meta,
      Map
      },
  data() {
    return {
      loading: true,
      post: [],
      blocks: [],
      serializers: {
        types: {
          youtube: YouTube,
          image: Image
        }
      }
    };
  },
  created() {
    this.fetchData()
  },
  methods: {
    imageUrlFor(source) {
      return imageBuilder.image(source)
    },
    fetchData() {
      this.error = this.post = null;
      this.loading = true;

      sanity.fetch(query, { slug: this.$route.params.slug }).then(
        (post) => {
          console.log(post)
          this.loading = false
          if (post !== null) {
            this.post = post
            this.blocks = post.body
            document.title = post.title
          } else {
            // Fant ikke data som matchet slug
            // vis 404-siden uten å endre url
            this.$router.push({
              name: '404',
              // preserve current path and remove the first char to avoid the target URL starting with `//`
              params: { 
                pathMatch: this.$route.path.substring(1).split('/'),
                trigger: 'no-data'
                },
              // preserve existing query and hash if any
              query: this.$route.query,
              hash: this.$route.hash
            })
          } // else 
        },
        (error) => {
          this.error = error
        }
      )
    }
  }
}
</script>
