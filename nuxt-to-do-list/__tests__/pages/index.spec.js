import Vue from "vue";
import { createLocalVue, shallowMount, mount } from "@vue/test-utils";
import Vuex from 'vuex';
import { mapGetters } from 'vuex';
import flushPromises from 'flush-promises';
import index from '../../pages/index.vue';
import VeeValidate from "vee-validate";
import Vuetify from "vuetify";
import sinon from 'sinon'
jest.mock('axios');

const localVue = createLocalVue();
localVue.use(VeeValidate);
localVue.use(Vuetify);
localVue.use(Vuex);
localVue.config.ignoredElements = [
    'v-form',
    'v-text-field',
    'v-btn',
    'v-data-table',
    'v-app',
    'v-alert'
];

let wrapper = null;

describe('index', () => {
    const mutations = {
        finishChangeTodo: jest.fn(),
        changeTodo: jest.fn()
    };

    let state;
    let getters;
    let store;

    beforeEach(() => {
        state = {
            isTodoChanging: false
        };

        getters = {
            stateOfTodoChanging: () => false
        };

        store = new Vuex.Store({
            state,
            getters,
            mutations
        });

        wrapper = shallowMount(index, {
            localVue,
            store,
            propsData: {
            }
        })
    });

    it('should get to do list items when call getTodo method', async () => {
        console.log('---------------index.spec.js-------start---------');
        console.log('---before calling getTodos()---');
        wrapper.vm.getTodos();
        console.log('---called getTodos()---');
        await flushPromises();

        console.log('wrapper.vm.todos: ', wrapper.vm.todos);

        // const listItem = wrapper.find('.subheading');
        //
        // expect(listItem.text()).toBe('to study TDD');
    });

    // it('should emit click delete todo event', () => {
    //     wrapper.vm.onClickDeleteTodo();
    //     expect(wrapper.emitted('click-delete-todo')).toBeTruthy();
    // });
    //
    // it('should emit click update to do event', () => {
    //     wrapper.vm.onClickUpdateTodo();
    //     expect(wrapper.emitted('click-update-todo')).toBeTruthy();
    // });
    //
    // it('should erase to do list item name when td is clicked to input for changing text', async () => {
    //     const tdTodoName = wrapper.find('.todo-table-row-datum-name');
    //
    //     tdTodoName.trigger('click');
    //     await flushPromises();
    //
    //     expect(wrapper.find('.subheading').exists()).toBe(false);
    // });
    //
    // it('should show same name when td is clicked and text field is shown', async () => {
    //     const tdTodoName = wrapper.find('.todo-table-row-datum-name');
    //
    //     tdTodoName.trigger('click');
    //     await flushPromises();
    //
    //     expect(wrapper.find('input').element.value).toBe(wrapper.vm.todo.name);
    // })
    //
    // it('should commit finishChangeTodo event to the store when click cancel update to do', async () => {
    //     const tdTodoName = wrapper.find('.todo-table-row-datum-name');
    //     console.log('---state:   ', store.state.isTodoChanging);
    //     tdTodoName.trigger('click');
    //     await flushPromises();
    //     console.log('---state:   ', store.state.isTodoChanging);
    //
    //     const buttonCancelUpdateTodo = wrapper.find('.button-cancel-update-todo');
    //     buttonCancelUpdateTodo.trigger('click');
    //     await flushPromises();
    //
    //     // wrapper.vm.onClickCancelUpdateTodo();
    //     console.log('----state:    ', store.state.isTodoChanging);
    //     expect(store.state.isTodoChanging).toBe(false);
    //
    //     // expect(wrapper.emitted('finishChangeTodo')).toBeTruthy();
    // })


    //
    // it('should emit update todo event', () => {
    //     wrapper.vm.updateTodo();
    //     expect(wrapper.emitted('update-todo')).toBeTruthy();
    // });
});