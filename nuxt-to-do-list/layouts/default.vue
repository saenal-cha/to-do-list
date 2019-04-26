<template>
    <div>
        <nuxt/>
        <my-footer/>
    </div>
</template>

<script>
    import MyFooter from '~/components/Footer.vue'

    export default {
        components: {
            MyFooter
        }
    }
</script>

<style>
    h1 {
        font-size: 2rem;
    }
    .container {
        text-align: center;
    }
</style>
