<template>
    <div class="error">
        <h1>Noe tryna</h1>
        <p>{{ error }}</p>
    </div>
</template>
<script>
export default {
    props: {
        error: Object
    }
}
</script>