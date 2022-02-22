<template>
  <div class="container">
    <div class="posts">
      <div class="loading" v-if="loading">Loading...</div>
      <div v-if="error" class="error">
        {{ error }}
      </div>
        <article v-for="post in posts" class="post-item" :key="post._id">
          <router-link :to="`/blog/${post.slug.current}`">
            <h2>{{ post.title }}</h2>
          </router-link>

            <p>{{post.excerpt}}</p>
            <img v-if="post.image" :src="imageUrlFor(post.image).height(800)" />
        
          <div>
            <router-link :to="`/blog/${post.slug.current}`" class="read-story">
            Les hele {{post.title}} →
            </router-link>
          </div>
          <footer class="card">
            {{post.estimatedReadingTime}} min lesetid
          </footer>
          <hr />
        </article>
    </div>
  </div>
</template>

<script>
import sanity from "../client";
import imageUrlBuilder from "@sanity/image-url";

const imageBuilder = imageUrlBuilder(sanity);

// https://www.sanity.io/docs/query-cheat-sheet#conditionals-64a36d80be73
const query = `*[_type == "post"]{
  _id,
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
  data() {
    return {
      loading: true,
      posts: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
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
