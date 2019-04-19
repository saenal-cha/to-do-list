<template>
    <div id="container" class="container pb-5">
        <div class="row">
            <div class="col-sm-8 offset-md-2">
                <div
                    class="alert alert-warning"
                    v-show="showError"
                >
                    <button
                        type="button"
                        class="close"
                        @click="hideMessage()"
                    >
                        X
                    </button>
                    <strong>Error!</strong>
                </div>
                <h1>할 일 목록 만들기</h1>
                <div class="info-form">
                    <form
                        v-on:submit.prevent
                    >
                        <div class="form-group">
                            <label for="name">할 일</label>
                            <input
                                type="text"
                                v-model="todo.name"
                                @keyup.enter="createTodo"
                                class="form-control"
                                id="name"
                                aria-describedby="nameHelp"
                                placeholder="무슨 일을 하실 거예요?"
                            >
                            <small
                                id="nameHelp"
                                class="form-text text-muted"
                            >
                                할 일을 적고 [엔터] 키를 누르거나 [추가하기] 버튼을 누르세요
                            </small>
                        </div>
                    </form>
                    <button
                        class="btn btn-primary mx-3"
                        v-if="!this.todo.id"
                        @click="createTodo()"
                    >
                        추가하기
                    </button>
                    <button
                        class="btn btn-secondary"
                        v-if="this.todo.id"
                        @click="updateTodo()"
                    >
                        Update
                    </button>
                    <button
                        class="btn btn-secondary"
                        @click="newTodo()"
                    >
                        새로운 할 일 추가하기
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { APIService } from '../APIService'

const apiService = new APIService();

export default {
    name: 'CreateTodo',
    components: {
    },
    data() {
        return {
            showError: false,
            todo: {}
        };
    },
    methods: {
        createTodo() {
            apiService.createTodo(this.todo).then((result) => {
                console.log(result);
                if(result.status === 201) {
                    this.todo = result.data;
                    location.reload();
                }
            }, (error) => {
                this.showError = true;
            });
        },
        updateTodo() {
            apiService.updateTodo(this.todo).then((result) => {
                console.log(result);
            }, (error) => {
                this.showError = true;
            });
        },
        newTodo() {
            this.todo = {};
        }
    },
    mounted() {
        if(this.$route.params.pk) {
            apiService.getTodo(this.$route.params.pk).then((todo) => {
                this.todo = todo;
            })
        }
    }
}
</script>

<style scoped>
    .aform {
        margin-left: auto;
        width: 60%;
    }
</style>











