<template>
    <div class="mx-5 mt-5">
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>할 일</th>
                    <th></th>
                    <th class="w-25"></th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(todo, index) in todos"
                >
                    <th v-html="index + 1"></th>
                    <td v-html="todo.name">
                    </td>
                    <td>
                        <input
                            class="form-control"
                            type="text"
                            v-model="newName"
                        />
                    </td>
                    <td>
                        <button
                            class="btn btn-danger mx-3"
                            @click="deleteTodo(todo)"
                        >
                            삭제하기
                        </button>
                        <button
                            class="btn btn-primary"
                            @click="updateTodo(todo)"
                        >
                            &#9998;
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { APIService } from '../APIService';

const API_URL = 'http://localhost:4000';
const apiService = new APIService();

export default {
    name: 'ListTodo',
    components: {},
    data() {
        return {
            todos: [],
            numberOfTodos: 0,
            newName: ''
        };
    },
    methods: {
        getTodos() {
            apiService.getTodos().then((data) => {
                console.log(data)
                this.todos = data;
                this.numberOfTodos = data.count;
            });
        },
        deleteTodo(todo) {
            apiService.deleteTodo(todo).then((response) => {
                if(response.status === 200) {
                    alert("할 일 목록에서 삭제되었습니다");

                    this.$router.go();
                }
            });
        },
        updateTodo(todo) {
            console.log(this.newName);
            apiService.updateTodo(todo, this.newName).then((response) => {
                if (response.status === 200) {
                    alert("할 일을 수정했습니다");
                }
            });
        }
    },
    mounted() {
        this.getTodos();
    },
}
</script>

<style scoped>
    .list-horizontal li {
        display: inline-block;
    }
    .list-horizontal li:before {
        content: '\00a0\2202\00a0\00a0';
        color: #999;
        color: rgba(0,0,0,0.5);
        font-size: 11px;
    }
    .list-horizontal li:first-child:before {
        content: '';
    }
</style>