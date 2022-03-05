<template>
  <div class="container">
    <div class="text-center" v-if="loading">
      <div class="spinner">Laster...</div>
    </div>

    <Error v-if="error" :error="error"/>

    <article v-if="post" class="blogpost">
      <h1 class="post-title">{{ post.title }}</h1>
      <BylineMeta :post="post"/>
      <SanityBlocks :blocks="blocks" :serializers="serializers"/>
      <Map v-if="post.gpstrack" :gpstrack="post.gpstrack"/>
      <hr/>
      <footer class="card post-footer">
        <nav>
          <h2 class="text-center">Sjekk også ut</h2>
          <div class="post-prev-next">
            <router-link v-if="post.prevPost" class="prev" :to="'/flyblogg/' + post.prevPost.slug.current">
              &#8592; {{ post.prevPost.title }}
            </router-link>
            <router-link v-if="post.nextPost" class="next" :to="'/flyblogg/' + post.nextPost.slug.current">
              {{ post.nextPost.title }} &#8594;
            </router-link>
          </div>
        </nav>
      </footer>
    </article>
  </div>
</template>

<script>
import { SanityBlocks } from "sanity-blocks-vue-component"
import sanity from "../client"
import {useMeta} from '@/helpers/helpers.js'
import YouTube from '@/components/sanitySerializers/YouTube.vue'
import Image from '@/components/sanitySerializers/Image.vue'
import InternalLink from '@/components/sanitySerializers/InternalLink.vue'
import Map from '@/components/GPSTrack.vue'
import BylineMeta from '@/components/BylineMeta'
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
  body[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => {
        "slug": @.reference->slug
      }
    }
  },
  "gpstrack": gpstrack->{
    _id,
    title,
    src,
    caption,
  },
"estimatedReadingTime": round(length(pt::text(body)) / 4.5 / 180 ),
"prevPost": *[_type == 'post' && publishedAt < ^.publishedAt] | order(publishedAt desc)[0]{title,slug},
"nextPost": *[_type == 'post' && publishedAt > ^.publishedAt] | order(publishedAt asc)[0]{title,slug}
}[0]`

export default {
  name: "SinglePost",
  components: { 
      SanityBlocks,
      BylineMeta,
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
        },
        marks: {
          internalLink: InternalLink
        }
      }
    }
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
