<template>
    <tr class="todo-table-row-item">
        <td class="text-sm-left">{{ this.index + 1 }}</td>
        <td
            @click="onClickTodoName"
            class="text-sm-left cursor-pointer todo-table-row-datum-name"
        >
            <v-text-field
                class="todo-name-edit-input"
                v-model="newName"
                :autofocus=true
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
                color="normal"
                class="mx-3 button-cancel-update-todo"
                @click="onClickCancelUpdateTodo"
                v-if="isChangingName === true"
            >
                수정 취소하기
            </v-btn>
            <v-btn
                color="error"
                class="mx-3 delete-button"
                v-if="isChangingName === false"
                @click="onClickDeleteTodo"
            >
                삭제하기
            </v-btn>
        </td>
    </tr>
</template>

<script>
    import { mapGetters } from 'vuex';

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
        mounted() {
        },
        computed: {
            ...mapGetters([
                'stateOfTodoChanging'
            ])
        },
        watch: {
            stateOfTodoChanging(newValue, oldValue) {
                if(newValue !== oldValue && newValue === false) {
                    this.isChangingName = false;
                }
            },
        },
        methods: {
            onClickDeleteTodo() {
                this.$emit('click-delete-todo', this.todo);
            },
            onClickUpdateTodo() {
                this.$emit('click-update-todo', this.todo, this.newName);
            },
            onClickCancelUpdateTodo() {
                this.$store.commit('finishChangeTodo');
                this.newName = this.todo.name;
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
    .cursor-pointer {
        cursor: pointer;
    }
</style>