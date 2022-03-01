<template>
  <div class="container">
    <div class="bloglist">
      <div class="text-center" v-if="loading">
        <div class="spinner">Laster...</div>
      </div>
      <Error v-if="error" :error="error"/>
      <article v-for="(post, index) in posts" class="post-teaser" :key="post._id" @click="goToBlogPost($event, post.slug.current)">
        <router-link :to="`/flyblogg/${post.slug.current}`" class="post-link">
          <h2 class="post-title">{{ post.title }}</h2>
        </router-link>
        <Meta :post="post"/>
        <p class="excerpt">{{post.excerpt}}</p>
        <img v-if="post.image" :src="imageUrlFor(post.image).height(800)" :alt="post.image.alt" />
      
        <p>
          <router-link :to="`/flyblogg/${post.slug.current}`" class="read-more">
          Les hele {{post.title}} →
          </router-link>
        </p>
        <hr v-if="(index + 1) !== posts.length" aria-hidden="true"/>
      </article>
    </div>
  </div>
</template>

<script>
import sanity from "../client"
import imageUrlBuilder from "@sanity/image-url"
import Meta from '@/components/MetaSection'
import Error from '@/components/Error'

const imageBuilder = imageUrlBuilder(sanity);

// https://www.sanity.io/docs/query-cheat-sheet#conditionals-64a36d80be73
const query = `*[_type == "post"]{
  _id,
  publishedAt,
  categories->{
    _id,
    title
  },
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
  "estimatedReadingTime": round(length(pt::text(body)) / 4.5 / 180 )
}[0...50]`;

export default {
  name: "Home",
  components: { 
    Meta,
    Error
  },
  data() {
    return {
      loading: true,
      posts: [],
      error: null
    };
  },
   /* head: function () {
     // https://github.com/vueuse/head
     return {
      title: {
        inner: 'Flyblogg | Anders Skifte'
      },
      meta: [
          { property: 'og:title', content: 'Flyblogg | Anders Skifte', id: 'og-title' },
          { name: 'description', content: 'En blogg som utelukkende dreier seg om flyging med småfly', id: 'desc' },
          { property: 'og:description', content: 'En blogg som utelukkende dreier seg om flyging med småfly', id: 'og-desc' },
          { property: 'og:type', content: 'website', id: 'og-type' },
          { property: 'og:url', content: 'https://skifte.com' + this.$route.fullPath, id: 'og-url' },
          { property: 'og:image', content: 'https://cdn.sanity.io/images/43mso7au/production/7fc573df07cc81e93db25a328795815830a6109a-7864x5200.jpg?w=1200', id: 'og-img' },
          { property: 'og:image:secure_url', content: 'https://cdn.sanity.io/images/43mso7au/production/7fc573df07cc81e93db25a328795815830a6109a-7864x5200.jpg?w=1200', id: 'og-img-sec' },
          { property: 'og:image:alt', content: 'Cockpit og utsikt fremover i en Cessna 172 over Oslofjorden', id: 'og-img-alt' },
          { property: 'og:image:type', content: 'image/jpg', id: 'og-img-type' },
          { property: 'og:image:width', content: '1200', id: 'og-img-w' },
          { property: 'og:image:height', content: '793', id: 'og-img-h' },
        ]
      }
   }, */
  created() {
    this.fetchData()
    this.updateHeadMeta()
  },
  methods: {
    updateHeadMeta() {
      document.title = 'Flyblogg | Anders Skifte'
      document.querySelector('#og-title').setAttribute('content', 'Flyblogg | Anders Skifte')
      document.querySelectorAll('#og-desc, #desc').forEach( 
        elem => elem.setAttribute('content','En blogg som utelukkende dreier seg om flyging med småfly'))
      document.querySelector('#og-url').setAttribute('content', 'https://skifte.com' + this.$route.fullPath)
      document.querySelector('#og-type').setAttribute('content', 'website')
      document.querySelectorAll('#og-img, #og-img-sec').forEach( 
        elem => elem.setAttribute('content', 'https://cdn.sanity.io/images/43mso7au/production/7fc573df07cc81e93db25a328795815830a6109a-7864x5200.jpg?w=1200'))
      document.querySelector('#og-img-alt').setAttribute('content', 'Cockpit og utsikt fremover i en Cessna 172 over Oslofjorden')
      document.querySelector('#og-img-type').setAttribute('content', 'image/jpg')
      document.querySelector('#og-img-w').setAttribute('content', '1200')
      document.querySelector('#og-img-h').setAttribute('content', '793')
    },
    goToBlogPost(event, slug) {
      const isTextSelected = window.getSelection().toString()
      const isTargetLink = event.target.tagName.toLowerCase() === 'a' // prevent router.push
      if (!isTextSelected && !isTargetLink) {
        this.$router.push({ name: 'SinglePost', params: { slug: slug }})
      }
    },
    imageUrlFor(source) {
      return imageBuilder.image(source);
    },
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      sanity.fetch(query).then(
        (posts) => {
          this.loading = false;
          this.posts = posts;
          console.log(posts)
        },
        (error) => {
          this.error = error
          this.loading = false
        }
      );
    },
  },
};
</script>
