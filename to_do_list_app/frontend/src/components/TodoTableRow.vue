<template>
    <tr>
        <th v-html="this.index + 1"></th>
        <td
            @click="onClickTodoName"
            style="cursor: pointer;"
            class="text-left"
        >
            <input
                class="form-control"
                type="text"
                v-model="newName"
                v-if="isChangingName === true"
            />
            <span
                v-html="this.todo.name"
                v-else
            ></span>
        </td>
        <td
            class="text-right"
        >
            <button
                    class="btn btn-primary"
                    @click="onClickUpdateTodo"
                    v-if="isChangingName === true"
            >
                수정하기
            </button>
            <button
                class="btn btn-danger mx-3"
                @click="onClickDeleteTodo"
            >
                삭제하기
            </button>
        </td>
    </tr>
</template>

<script>
    export default {
        name: 'TodoTableRow',
        components: {},
        props: [
            'todo',
            'index',
        ],
        data() {
            return {
                newName: this.todo.name,
                isChangingName: false,

            };
        },
        methods: {
            onClickDeleteTodo() {
                this.$parent.deleteTodo(this.todo);
            },
            onClickUpdateTodo() {
                this.$parent.updateTodo(this.todo, this.newName);
            },
            onClickTodoName() {
                this.isChangingName = true;
            }
        },
    }
</script>

<style scoped>

</style>