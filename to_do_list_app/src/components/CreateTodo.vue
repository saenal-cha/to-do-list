<template>
    <div>
        <h2>
            Create a todo list
        </h2>
        <form @submit.prevent>
            <input
                type="text"
                class="form-control"
                @keypress="typing=true"
                placeholder="What do you want to do?"
                v-model="todo"
                @keyup.enter="addTodo($event)"
            >
            <span
                class="help-block small text-center"
                v-show="typing"
            >
                Hit enter to save
            </span>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import bus from './../bus.js';

export default {
    data() {
        return {
            todo: '',
            typing: false,
        }
    },
    method: {
        addTodo(event) {
            if (event) event.preventDefault();
            let url = 'http://localhost.4000/api/add';
            let param = {
                name: this.todo,
                done: 0
            };

            axios.post(url, param).then((response) => {
                console.log(response);
                this.clearTodo();
                this.refreshTodo();
                this.typing = false;
            }).catch((error) => {
                console.log(error);
            })
        },
        clearTodo() {
            this.todo = '';
        },
        refreshTodo() {
            bus.$emit('refreshTodo')
        }
    }
}
</script>