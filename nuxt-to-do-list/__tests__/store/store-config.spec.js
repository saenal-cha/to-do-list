import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import storeConfig from '../../store/store-config'
import { cloneDeep } from 'lodash'

test('change "isTodoChanging" value when "changeTodo" is commited', () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    const store = new Vuex.Store(cloneDeep(storeConfig));

    expect(store.state.isTodoChanging).toBe(false);

    store.commit('changeTodo');
    expect(store.state.isTodoChanging).toBe(true);
});

test('change "isTodoChanging" value when "finishChangeTodo" is commited', () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    const store = new Vuex.Store(cloneDeep(storeConfig));

    store.commit('changeTodo');
    expect(store.state.isTodoChanging).toBe(true);

    store.commit('finishChangeTodo');
    expect(store.state.isTodoChanging).toBe(false)
});
