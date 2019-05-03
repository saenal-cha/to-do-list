<template>
    <v-app>
        <section class="container">
            <v-alert
                :value="true"
                v-show="showError"
                type="error"
                dismissible
            >
                오류가 발생했습니다
            </v-alert>
            <create-todo
                @create="handleCreateTodo"
                :refresh-todo="isTodoRefreshed"
            />
            <list-todo
                :todos="todos"
                @delete="handleDeleteTodo"
                @update-todo="handleUpdateTodo"
            />
        </section>
    </v-app>
</template>

<script>
    import CreateTodo from '../components/CreateTodo.vue'
    import ListTodo from '../components/ListTodo.vue'
    import { APIService } from '../libraries/APIService'

    const apiService = new APIService();

    export default {
        name: 'index',
        async asyncData () {
            let todoList = await apiService.getTodos();

            return { todos: todoList }
        },
        head () {
            return {
                title: '할 일 목록 만들기'
            }
        },
        data () {
            return {
                todos: [],
                showError: false,
                isUpdateSuccess: false,
                isTodoRefreshed: false,
            }
        },
        mounted () {

        },
        methods: {
            getTodos () {
                console.log('--before apiService--');
                console.log(apiService);
                apiService.getTodos().then((data) => {
                    console.log('---then--')
                    this.todos = data;
                });
            },
            handleCreateTodo (todo) {
                this.isTodoRefreshed = false;

                apiService.createTodo(todo).then((result) => {
                    if(result.status === 200) {
                        alert("할 일을 추가했습니다");
                        this.getTodos();
                        this.isTodoRefreshed = true;
                    }
                }, (error) => {
                    this.showError = true;
                });
            },
            handleDeleteTodo (todo) {
                apiService.deleteTodo(todo).then((response) => {
                    if (response.status === 200) {
                        alert("할 일 목록에서 삭제되었습니다");
                        this.getTodos();
                    }
                }, (error) => {
                    this.showError = true;
                });
            },
            handleUpdateTodo(todo, newName) {
                apiService.updateTodo(todo, newName).then((response) => {
                    if (response.status === 200) {
                        alert("할 일을 수정했습니다");

                        this.getTodos();
                        this.$store.commit('finishChangeTodo');
                    }
                }, (error) => {
                    this.showError = true;
                });
            },
        },
        components: {
            CreateTodo,
            ListTodo,
        }
    }
</script>

<style scoped>
</style>
