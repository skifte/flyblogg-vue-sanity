<template>
  <div class="container">
    <div class="text-center" v-if="loading">
      <div class="spinner">Laster...</div>
    </div>

    <Error v-if="error" :error="error"/>

    <article v-if="post" class="blogpost">
      <h1 class="post-title">{{ post.title }}</h1>
      <Meta :post="post"/>
      <SanityBlocks :blocks="blocks" :serializers="serializers"/>
      <Map v-if="post.gpstrack" :gpstrack="post.gpstrack"/>
    </article>
  </div>
</template>

<script>
import { SanityBlocks } from "sanity-blocks-vue-component"
import sanity from "../client"
import {useMeta} from '@/helpers/helpers.js'
import YouTube from '@/components/YouTube.vue'
import Image from '@/components/Image.vue'
import Map from '@/components/GPSTrack.vue'
import Meta from '@/components/MetaSection'
import Error from '@/components/Error'

const query = `*[slug.current == $slug] {
  _id,
  publishedAt,
  title,
  slug,
  excerpt,
  "image": teaserImage{
    alt,
    asset->{
      _id,
      url,
      metadata
    },
  },
  body,
  "gpstrack": gpstrack->{
    _id,
    title,
    src,
    caption,
  },
"estimatedReadingTime": round(length(pt::text(body)) / 4.5 / 180 )
}[0]`

export default {
  name: "SinglePost",
  components: { 
      SanityBlocks,
      Meta,
      Map,
      Error
      },
  data() {
    return {
      loading: true,
      post: null,
      error: null,
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
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      sanity.fetch(query, { slug: this.$route.params.slug }).then(
        (post) => {
          this.loading = false
          if (post !== null) {
            this.post = post
            this.blocks = post.body
            useMeta(this.post, this.$route)
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
          this.loading = false
        }
      )
    }
  }  
}
</script>
