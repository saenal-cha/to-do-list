<template>
    <div id="container" class="container pb-5">
        <div class="row">
            <div class="col-sm-8 offset-md-2">
                <h1>할 일 목록 만들기</h1>
                <div class="info-form">
                    <v-form
                        v-on:submit.prevent
                    >
                        <v-text-field
                            v-model="todo.name"
                            label="할 일"
                            name="todo_name"
                            @keyup.enter="createTodo"
                            v-validate="'required'"
                            :error-messages="errors ? errors.collect('todo_name') : ''"
                            required
                        >
                        </v-text-field>
                        <small
                            class=""
                        >
                            할 일을 적고 [엔터] 키를 누르거나 [추가하기] 버튼을 누르세요
                        </small>
                    </v-form>
                    <v-btn
                        color="primary"
                        class="btn btn-primary mx-3 mt-3"
                        v-if="!this.todo.id"
                        @click="createTodo"
                    >
                        추가하기
                    </v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { APIService } from '../libraries/APIService'

const apiService = new APIService();

export default {
    name: 'CreateTodo',
    components: {
    },
    props: [
        'refreshTodo'
    ],
    watch: {
        refreshTodo: function(newValue, oldValue) {
            if(newValue !== oldValue && newValue === true) {
                this.newTodo();
            }
        }
    },
    data() {
        return {
            showError: false,
            todo: {}
        };
    },
    methods: {
        async createTodo() {
            //http

            if (await this.$validator.validate()) {
                this.$emit('create', this.todo)
            }
        },
        newTodo() {
            this.todo = {};
        }
    }
}
</script>

<style scoped>
</style>











