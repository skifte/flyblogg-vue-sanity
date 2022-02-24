<template>
    <div class="container page-not-found text-center">
        <div class="error-message">
            <h1>Noe tryna</h1>
            <p>{{ error }}</p>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        error: Object
    },
    created() {
        console.log('comp:')
        console.log(this.error)
    }
}
</script>