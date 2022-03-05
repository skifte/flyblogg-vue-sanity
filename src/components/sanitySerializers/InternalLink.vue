<template>
    <a :href="slug.current"><slot /></a>
</template>
<script>
export default {
    props: {
        slug: {
            type: Object
        }
    }
}
</script>