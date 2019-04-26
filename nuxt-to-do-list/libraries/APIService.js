import axios from 'axios';
import conf from '@/conf/application.conf.json'

const API_URL = conf.api.url;

const customAxios = axios.create({
    timeout: 1000
});
axios.defaults.timeout = 1000;

export class APIService {
    getTodos() {
        const url = `${API_URL}/api/todos`;
        return customAxios.get(url).then(response => response.data);
    }
    getTodo(pk) {
        const url = `${API_URL}/api/todos/${pk}`;
        return customAxios.get(url).then(response => response.data);
    }
    deleteTodo(todo) {
        const url = `${API_URL}/api/todos/${todo._id}`;
        return customAxios.delete(url);
    }
    createTodo(todo) {
        const url = `${API_URL}/api/create/`;
        return customAxios.post(url, todo);
    }
    updateTodo(todo, newName) {
        const url = `${API_URL}/api/todos/${todo._id}`;
        todo.newName = newName;

        return customAxios.put(url, todo);
    }
}