import Vuex from 'vuex';
// import mutations from './mutations';
// import getters from './getters';
import storeConfig from './store-config'

const store = () => new Vuex.Store({
    state: {
        ...storeConfig.state
    },
    getters: {
        ...storeConfig.getters
    },
    mutations: {
        ...storeConfig.mutations
    }
});

export default store;