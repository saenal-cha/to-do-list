import Vue from "vue";
import { createLocalVue, shallowMount, mount } from "@vue/test-utils";
import Vuex from 'vuex';
import { mapGetters } from 'vuex';
import flushPromises from 'flush-promises';
import TodoTableRow from '../../components/TodoTableRow.vue';
import VeeValidate from "vee-validate";
import Vuetify from "vuetify";
import sinon from 'sinon'

const localVue = createLocalVue();
localVue.use(VeeValidate);
localVue.use(Vuetify);
localVue.use(Vuex);
localVue.config.ignoredElements = [
    'v-form',
    'v-text-field',
    'v-btn',
    'v-data-table',
    'v-app'
];

let wrapper = null;

describe('TodoTableRow', () => {
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

        wrapper = mount(TodoTableRow, {
            localVue,
            sync: false,
            store,
            propsData: {
                index: 0,
                todo: {
                    "_id": "5cbd5df4c6267664ce132e39",
                    "name": "to study TDD",
                    "createdAt": "2019-04-22T06:23:48.613Z",
                    "updatedAt": "2019-04-22T06:23:48.613Z",
                    "__v": 0
                }
            }
        })
    });

    it('should show to do list item name', () => {
        const listItem = wrapper.find('.subheading');
        expect(listItem.text()).toBe('to study TDD');
    });

    it('should emit click delete todo event', () => {
        wrapper.vm.onClickDeleteTodo();
        expect(wrapper.emitted('click-delete-todo')).toBeTruthy();
    });

    it('should emit click update to do event', () => {
        wrapper.vm.onClickUpdateTodo();
        expect(wrapper.emitted('click-update-todo')).toBeTruthy();
    });

    it('should erase to do list item name when td is clicked to input for changing text', async () => {
        const tdTodoName = wrapper.find('.todo-table-row-datum-name');

        tdTodoName.trigger('click');
        await flushPromises();

        expect(wrapper.find('.subheading').exists()).toBe(false);
    });

    it('should show same name when td is clicked and text field is shown', async () => {
        const tdTodoName = wrapper.find('.todo-table-row-datum-name');

        tdTodoName.trigger('click');
        await flushPromises();

        expect(wrapper.find('input').element.value).toBe(wrapper.vm.todo.name);
    })

    it('should commit finishChangeTodo event to the store when click cancel update to do', async () => {
        const tdTodoName = wrapper.find('.todo-table-row-datum-name');
        console.log('---state:   ', store.state.isTodoChanging);
        tdTodoName.trigger('click');
        await flushPromises();
        console.log('---state:   ', store.state.isTodoChanging);

        const buttonCancelUpdateTodo = wrapper.find('.button-cancel-update-todo');
        buttonCancelUpdateTodo.trigger('click');
        await flushPromises();

        // wrapper.vm.onClickCancelUpdateTodo();
        console.log('----state:    ', store.state.isTodoChanging);
        expect(store.state.isTodoChanging).toBe(false);

        // expect(wrapper.emitted('finishChangeTodo')).toBeTruthy();
    })


    //
    // it('should emit update todo event', () => {
    //     wrapper.vm.updateTodo();
    //     expect(wrapper.emitted('update-todo')).toBeTruthy();
    // });
});