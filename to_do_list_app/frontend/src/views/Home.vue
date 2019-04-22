<template>
    <div class="home">
        <v-alert
            :value="true"
            v-show="showError"
            type="error"
            dismissible
        >
            오류가 발생했습니다
        </v-alert>
        <create-todo @create="handleCreateTodo"/>
        <list-todo
            :todos="todos"
            @delete="handleDeleteTodo"
            @update-todo="handleUpdateTodo"
        />
    </div>
</template>

<script>
import CreateTodo from '@/components/CreateTodo.vue'
import ListTodo from '@/components/ListTodo.vue'
import { APIService } from '../APIService'

const apiService = new APIService();

export default {
    name: 'home',
    data () {
        return {
            todos: [],
            showError: false,
            isUpdateSuccess: false,
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
            apiService.createTodo(todo).then((result) => {
                if(result.status === 201) {
                    this.getTodos();
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

                    this.refreshTextField();
                }
            }, (error) => {
                this.showError = true;
            });
        },
        refreshTextField() {
            this.isUpdateSuccess = false;
        }
    },
    components: {
        CreateTodo,
        ListTodo,
    }
}
</script>
