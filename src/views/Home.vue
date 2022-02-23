<template>
  <div class="container">
    <div class="bloglist">
      <div class="text-center" v-if="loading">
        <div class="spinner">Laster...</div>
      </div>
      <div v-if="error" class="error">
        {{ error }}
      </div>
        <article v-for="(post, index) in posts" class="post-teaser" :key="post._id" @click="goToBlogPost($event, post.slug.current)">
          <router-link :to="`/blog/${post.slug.current}`" class="post-link">
            <h2 class="post-title">{{ post.title }}</h2>
          </router-link>
          <Meta :post="post"/>
          <p class="excerpt">{{post.excerpt}}</p>
          <img v-if="post.image" :src="imageUrlFor(post.image).height(800)" />
        
          <p>
            <router-link :to="`/blog/${post.slug.current}`" class="read-more">
            Les hele {{post.title}} →
            </router-link>
          </p>
          <hr v-if="(index + 1) !== posts.length" aria-hidden="true"/>
        </article>
    </div>
  </div>
</template>

<script>
import sanity from "../client";
import imageUrlBuilder from "@sanity/image-url";
import Meta from '@/components/MetaSection';

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
    Meta
  },
  data() {
    return {
      loading: true,
      posts: [],
    };
  },
  created() {
    this.fetchData();
    document.title = 'Flyblogg - Anders Skifte'
  },
  methods: {
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
          this.error = error;
        }
      );
    },
  },
};
</script>
