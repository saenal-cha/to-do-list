<template>
    <v-app>
        <section class="container">
            <div class="mt-3 mb-5">
                <h1>페이지를 찾을 수 없습니다</h1>
                <p class="text--disabled">({{ error.statusCode }} {{ error.message }})</p>
            </div>
            <v-btn
                color="primary"
                to="/"
                v-if="error.statusCode === 404"
            >
                홈페이지로 가기
            </v-btn>
        </section>
    </v-app>
</template>
<script>
    export default {
        props: ['error']
    }
</script>

<style scoped>
</style>
