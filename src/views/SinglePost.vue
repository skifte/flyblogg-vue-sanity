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
    </article>
  </div>
</template>

<script>
import { SanityBlocks } from "sanity-blocks-vue-component";
import sanity from "../client";
import imageUrlBuilder from "@sanity/image-url";
import YouTube from '@/components/YouTube.vue';
import Image from '@/components/Image.vue';
import Meta from '@/components/MetaSection';

const imageBuilder = imageUrlBuilder(sanity);
/*

"body": body[]{
    ...,
    asset->{
      _id,
      url,
      metadata
    }
  },
  "image": mainImage{
  asset->{
  _id,
  url,
  metadata
}
},
*/
const query = `*[slug.current == $slug] {
  _id,
  publishedAt,
  title,
  slug,
  body,
"name":author->name,
"authorImage":author->image
}[0]
`;

export default {
  name: "SinglePost",
  components: { 
      SanityBlocks,
      Meta
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
