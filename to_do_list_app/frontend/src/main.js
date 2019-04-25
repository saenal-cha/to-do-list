import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VeeValidate from 'vee-validate'
import Vuex from 'vuex'
import 'es6-promise/auto'

Vue.use(Vuex);
Vue.use(VeeValidate);
Vue.use(Vuetify);

Vue.config.productionTip = true;

const store = new Vuex.Store({
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

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
