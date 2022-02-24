<template>
    <div class="container page-not-found text-center">
        <div class="error-message">
            <h1>Noe tryna</h1>
            <p v-if="isNetworkError">
                Nettverksfeil
            </p>
            <p v-else>{{ error }}</p>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        error: Object
    },
    created() {
        console.log(this.error)
        console.log(this.error.response)
    },
    computed: {
        isNetworkError: function () {
            return this.error.isNetworkError
        }
    }
}
</script>