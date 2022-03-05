<template>
    <abbr :title="title"><slot /></abbr>
</template>
<script>
export default {
    props: {
        title: {
            type: String
        }
    }
}
</script>