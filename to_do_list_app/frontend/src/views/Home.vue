<template>
    <div class="home">
        <create-todo></create-todo>
        <list-todo></list-todo>
    </div>
</template>

<script>
import CreateTodo from '@/components/CreateTodo.vue'
import ListTodo from '@/components/ListTodo.vue'

export default {
    name: 'home',
    components: {
        CreateTodo,
        ListTodo,
    }
}
</script>
