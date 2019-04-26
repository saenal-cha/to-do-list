import Vuex from 'vuex';

const store = () => new Vuex.Store({
    state: {
        isTodoChanging: false
    },
    getters: {
        stateOfTodoChanging(state) {
            return state.isTodoChanging;
        }
    },
    mutations: {
        changeTodo: state => state.isTodoChanging = true,
        finishChangeTodo: state => state.isTodoChanging = false
    }
});

export default store;