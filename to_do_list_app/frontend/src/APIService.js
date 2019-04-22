import axios from 'axios';
import conf from '@/conf/application.conf.json'

const API_URL = conf.api.url;

export class APIService {
    getTodos() {
        const url = `${API_URL}/api/todos`;
        return axios.get(url).then(response => response.data);
    }
    getTodo(pk) {
        const url = `${API_URL}/api/todos/${pk}`;
        return axios.get(url).then(response => response.data);
    }
    deleteTodo(todo) {
        const url = `${API_URL}/api/todos/${todo._id}`;
        return axios.delete(url);
    }
    createTodo(todo) {
        const url = `${API_URL}/api/create/`;
        return axios.post(url, todo);
    }
    updateTodo(todo, newName) {
        const url = `${API_URL}/api/todos/${todo._id}`;
        todo.newName = newName;

        return axios.put(url, todo);
    }
}