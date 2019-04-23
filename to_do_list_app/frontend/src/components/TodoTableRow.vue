<template>
    <tr>
        <td class="text-sm-left">{{ this.index + 1 }}</td>
        <td
            @click="onClickTodoName"
            class="text-sm-left cursor-pointer"
        >
            <v-text-field
                class=""
                v-model="newName"
                v-if="isChangingName === true"
                required>
            </v-text-field>
            <span
                v-else
                class="subheading"
            >{{ this.todo.name }}</span>
        </td>
        <td
            class="text-sm-right"
        >
            <v-btn
                color="primary"
                class=""
                @click="onClickUpdateTodo"
                v-if="isChangingName === true"
            >
                수정하기
            </v-btn>
            <v-btn
                color="error"
                class="mx-3"
                @click="onClickDeleteTodo"
            >
                삭제하기
            </v-btn>
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
                this.$emit('click-delete-todo', this.todo);
            },
            onClickUpdateTodo() {
                this.$emit('click-update-todo', this.todo, this.newName);
            },
            onClickTodoName() {
                if(this.$store.state.isTodoChanging === true) {
                    return
                }

                this.isChangingName = true;
                this.$store.commit('changeTodo');
            }
        },
    }
</script>

<style scoped>

</style>