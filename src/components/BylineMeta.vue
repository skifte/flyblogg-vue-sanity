<template>
  <div class="meta">
    <p class="pubdate">
      <time v-if="post.publishedAt" :datetime="cropDate(post.publishedAt)">
        {{ localeDate(post.publishedAt) }}
      </time>
    </p>
    <div class="dot" aria-hidden="true">·</div>
    <p>{{ post.estimatedReadingTime }} min lesetid</p>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    }
  },
  methods: {
    cropDate(date) {
      return date.split('T')[0]
    },
    localeDate(date) {
      const pubdate = new Date(date)
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return pubdate.toLocaleDateString('no', options)
    }
  }
}
</script>