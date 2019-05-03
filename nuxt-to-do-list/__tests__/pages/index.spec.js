import Vue from "vue";
import { createLocalVue, shallowMount, mount } from "@vue/test-utils";
import Vuex from 'vuex';
import { mapGetters } from 'vuex';
import flushPromises from 'flush-promises';
import index from '../../pages/index.vue';
import VeeValidate from "vee-validate";
import Vuetify from "vuetify";
import sinon from 'sinon'
import axios from 'axios';
import moxios from 'moxios';
import APIService from '../../libraries/APIService';
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

    let state, getters, store;

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

    afterEach(() => {
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

    it('should have v-alert-component', async () => {
        expect(wrapper.find('#v-alert-component').exists()).toBe(true);
    })
});