<template>
  <div class="container">
    <div class="text-center" v-if="loading">
      <div class="spinner">Laster...</div>
    </div>

    <Error v-if="error" :error="error"/>

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
import Error from '@/components/Error'

const imageBuilder = imageUrlBuilder(sanity)
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
"name":author->name,
"authorImage":author->image,
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
    updateHeadMeta(content) {
      document.title = content.title
      document.querySelector('#og-title').setAttribute('content', content.title)
      document.querySelectorAll('#og-desc, #desc').forEach( 
        elem => elem.setAttribute('content',content.excerpt))
      document.querySelector('#og-url').setAttribute('content', 'https://skifte.com' + this.$route.fullPath)
      document.querySelector('#og-type').setAttribute('content', 'article')
      document.querySelectorAll('#og-img, #og-img-sec').forEach( 
        elem => elem.setAttribute('content', this.imageUrlFor(content.image).width(1200).url()))
      document.querySelector('#og-img-alt').setAttribute('content', content.image.alt)
      document.querySelector('#og-img-type').setAttribute('content', 'image/jpg')
      document.querySelector('#og-img-w').setAttribute('content', '1200')
      document.querySelector('#og-img-h').setAttribute('content', Math.round(1200 / content.image.asset.metadata.dimensions.aspectRatio))
    },
    imageUrlFor(source) {
      return imageBuilder.image(source)
    },
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      sanity.fetch(query, { slug: this.$route.params.slug }).then(
        (post) => {
          this.loading = false
          if (post !== null) {
            this.post = post
            this.blocks = post.body
            /* document.title = post.title
            document.querySelector('meta[property="og:title"]').setAttribute('content', post.title)
            document.querySelectorAll('meta[name="description"], meta[property="og:description"]')
            .forEach( x=> x.setAttribute("content",post.excerpt)) */
            this.updateHeadMeta(this.post)
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
