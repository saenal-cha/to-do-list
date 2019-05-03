<template>
    <v-app>
        <div class="mx-5 mt-5">
            <v-data-table
                class="table table-striped table-hover elevation-1"
                :headers="[
                    { text: '#' },
                    {
                        text: '할 일 (항목을 누르면 수정할 수 있어요)',
                        align: 'left'
                     },
                    { text: '' },
                ]"
                :items="todos"
                :hide-actions=true
            >
                <template v-slot:items="props">
                    <todo-table-row
                        :todo="props.item"
                        :index="props.Index"
                        @click-delete-todo="deleteTodo"
                        @click-update-todo="updateTodo"
                    />
                </template>
            </v-data-table>
        </div>
    </v-app>
</template>

<script>
import TodoTableRow from '@/components/TodoTableRow.vue'

export default {
    name: 'ListTodo',
    components: {
        TodoTableRow
    },
    data() {
        return {
            numberOfTodos: this.todos.length,
            newName: '',
        };
    },
    props: {
      todos: {
          type: Array,
          required: true,
      }
    },
    methods: {
        deleteTodo(todo) {
            this.$emit('delete', todo);
        },
        updateTodo(todo, newName) {
            this.$emit('update-todo', todo, newName);
        },
    },
    mounted() {
    },
}
</script>

<style scoped>
</style>