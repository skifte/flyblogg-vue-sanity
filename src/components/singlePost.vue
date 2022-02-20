<template>
  <div class="container">
    <div class="spinner" v-if="loading"></div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="post" class="content">
      <h1>{{ post.title }}</h1>
      <img v-if="post.image" :src="imageUrlFor(post.image).width(800)" />

      <!-- <h6>By: {{ post.name }}</h6> -->
      <SanityBlocks :blocks="blocks" :serializers="serializers"/>
    </div>
  </div>
</template>

<script>
import { SanityBlocks } from "sanity-blocks-vue-component";
import sanity from "../client";
import imageUrlBuilder from "@sanity/image-url";
import YouTube from './YouTube.vue';
import Image from './Image.vue';

const imageBuilder = imageUrlBuilder(sanity);

const query = `*[slug.current == $slug] {
  _id,
  title,
  slug,
  body, 
 "image": mainImage{
  asset->{
  _id,
  url
}
},
"name":author->name,
"authorImage":author->image
}[0]
`;

export default {
  name: "SinglePost",
  components: { 
      SanityBlocks
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
    this.fetchData();
  },
  methods: {
    imageUrlFor(source) {
      return imageBuilder.image(source);
    },
    fetchData() {
      this.error = this.post = null;
      this.loading = true;

      sanity.fetch(query, { slug: this.$route.params.slug }).then(
        (post) => {
          this.loading = false;
          this.post = post;
          this.blocks = post.body;
          console.log(post)
        },
        (error) => {
          this.error = error;
        }
      );
    },
  },
};
</script>