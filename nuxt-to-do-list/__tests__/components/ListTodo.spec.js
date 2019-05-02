import Vue from "vue";
import { createLocalVue, shallowMount, mount } from "@vue/test-utils";
import flushPromises from 'flush-promises';
import ListTodo from '../../components/ListTodo.vue';
import VeeValidate from "vee-validate";
import Vuetify from "vuetify";
import sinon from 'sinon'

const localVue = createLocalVue();
localVue.use(VeeValidate);
localVue.use(Vuetify);

Vue.use(VeeValidate);
Vue.use(Vuetify);
Vue.config.ignoredElements = [
    'v-form',
    'v-text-field',
    'v-btn',
    'v-data-table',
    'v-app'
];

let wrapper = null;

describe('CreateTodo', () => {
    beforeEach(() => {
        wrapper = mount(ListTodo, {
            sync: false
        })
    });

    it('has a TABLE tag', () => {
        expect(wrapper.contains('#todoListTable')).toBe(true);
    });

    it('should emit delete todo event', () => {
        wrapper.vm.deleteTodo();
        expect(wrapper.emitted().delete).toBeTruthy();
    });

    it('should emit update todo event', () => {
        wrapper.vm.updateTodo();
        expect(wrapper.emitted('update-todo')).toBeTruthy();
    });
});