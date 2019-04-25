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
            <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
            <h1 class="title">
                USERS
            </h1>
            <ul class="users">
                <li v-for="(user, index) in users" :key="index" class="user">
                    <nuxt-link :to="{ name: 'id', params: { id: index }}">
                        {{ user.name }}
                    </nuxt-link>
                </li>
            </ul>
        </section>
    </v-app>
</template>

<script>
    import CreateTodo from '@/components/CreateTodo.vue'
    import { APIService } from '../api/APIService'
    import axios from '~/plugins/axios'

    const apiService = new APIService();

    export default {
        async asyncData () {
            let { data } = await axios.get('/api/users')
            return { users: data }
        },
        head () {
            return {
                title: 'Users'
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
            this.getTodos()
        },
        methods: {
            getTodos () {
                apiService.getTodos().then((data) => {
                    this.todos = data;
                });
            },
            handleCreateTodo (todo) {
                this.isTodoRefreshed = false;

                apiService.createTodo(todo).then((result) => {
                    if(result.status === 201) {
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
            // ListTodo,
        }
    }
</script>

<style scoped>
    .title
    {
        margin: 30px 0;
    }
    .users
    {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .user
    {
        margin: 10px 0;
    }
</style>
