<template>
    <div class="mx-5 mt-5">
        <v-data-table
            class="table table-striped table-hover elevation-1"
            :items="todos"
        >
            <thead>
                <tr>
                    <th>#</th>
                    <th class="text-left">
                        할 일
                        <span class="text-muted font-weight-normal">(항목을 누르면 수정할 수 있어요)</span>
                    </th>
                    <th class="w-25"></th>
                </tr>
            </thead>
            <template v-slot:items="props">
                <td>{{ props.item.name }}</td>
            </template>
            <tbody>
                <todo-table-row
                    v-for="(todo, index) in todos"
                    :todo="todo"
                    :index="index"
                ></todo-table-row>
            </tbody>
        </v-data-table>
    </div>
</template>

<script>
import { APIService } from '../APIService';
import TodoTableRow from '@/components/TodoTableRow.vue'

const API_URL = 'http://localhost:4000';
const apiService = new APIService();

export default {
    name: 'ListTodo',
    components: {
        TodoTableRow
    },
    data() {
        return {
            todos: [],
            numberOfTodos: 0,
            newName: ''
        };
    },
    methods: {
        onClickTodoName() {

        },
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
        updateTodo(todo, newName) {
            apiService.updateTodo(todo, newName).then((response) => {
                if (response.status === 200) {
                    alert("할 일을 수정했습니다");
                    location.reload();
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