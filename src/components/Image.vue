<template>
<figure>
  <img :src="imageUrl" alt="" />
  <figcaption v-if="figcaption">
      {{figcaption}}
  </figcaption>
  </figure>
</template>

<script>
/* eslint-disable vue/require-default-prop */
import imageUrlBuilder from '@sanity/image-url'
import sanityClient from '../client'
const builder = imageUrlBuilder(sanityClient)
export default {
  props: {
    asset: {
      type: Object,
      required: true
    },
    caption: {
      type: String
    },
    width: Number,
    height: Number,
    auto: {
      default: 'format',
      type: String
    },
    fit: {
      default: 'max',
      type: String
    }
  },
  computed: {
    figcaption: function() {
      return this.caption
    },
    imageUrl: function() {
      return builder
        .image(this.asset)
        .width(800)
        .auto(this.auto)
        .fit(this.fit)
    }
  }
}
</script>