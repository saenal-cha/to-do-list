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
        <create-todo
            @create="handleCreateTodo"
            :refresh-todo="isTodoRefreshed"
        />
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
        beforeRouteEnter (to, from, next) {
            // 이 컴포넌트를 렌더링하는 라우트 앞에 호출됩니다.
            // 이 가드가 호출 될 때 아직 생성되지 않았기 때문에
            // `this` 컴포넌트 인스턴스에 접근 할 수 없습니다!
            console.log('---before route enter---');
            console.log('--to--');
            console.log(to);
            console.log('--from--');
            console.log(from);
            next();

        },
        beforeRouteUpdate (to, from, next) {
            // console.log(to)
        },
        name: 'home',
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
            ListTodo,
        }
    }
</script>
