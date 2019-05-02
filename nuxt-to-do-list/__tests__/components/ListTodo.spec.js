import Vue from "vue";
import { createLocalVue, shallowMount, mount } from "@vue/test-utils";
import flushPromises from 'flush-promises';
import CreateTodo from '../../components/ListTodo.vue';
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
        wrapper = mount(CreateTodo, {
            sync: false
        })
    });

    it('has a TABLE tag', () => {
        expect(wrapper.contains('table')).toBe(true);
    });
});