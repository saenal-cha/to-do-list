// import { expect } from 'chai'

import Vue from "vue";
import { createLocalVue, shallowMount, mount } from "@vue/test-utils";
// import { mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import CreateTodo from '../../components/CreateTodo.vue';
import VeeValidate from "vee-validate";
import Vuetify from "vuetify";
// import sinon from 'sinon'

const localVue = createLocalVue();
localVue.use(VeeValidate);
localVue.use(Vuetify);

Vue.use(VeeValidate);
Vue.use(Vuetify);
Vue.config.ignoredElements = [
    'v-form',
    'v-text-field',
    'v-btn',
];

let wrapper = null;

describe('CreateTodo', () => {
    beforeEach(() => {
        // wrapper = mount(CreateTodo, {
        //     localVue: localVue,
        //     sync: false
        // });
        // wrapper = shallowMount(CreateTodo, {
        //     localVue,
        //     sync: false
        // });
        wrapper = mount(CreateTodo, {
            sync: false
        })
    });
    it('has a h1', () => {
        expect(wrapper.contains('h1')).toBe(true);
    });

    it('test', async () => {
        console.log('-----test async await-----------')
        console.log('-----test async await-----------')

        const validation = await wrapper.vm.$validator.validate();
        const validationAll = await wrapper.vm.$validator.validateAll();
        console.log('--++--validation: ', validation);
        console.log('--++--validate all: ', validationAll);
        console.log(wrapper.vm.$validator)

        // console.log(wrapper.vm.$validator.validate())
        // await wrapper.vm.$validator.validate().then(valid => {
        //     console.log('------errors: ', wrapper.vm.$validator.errors.first('todo_name'));
        //     expect(wrapper.vm.$validator.errors.any()).toBe(true);
        // });
    })

    it('validate empty input', async () => {

        // wrapper.vm.todo.name = 'test-name';
        // await flushPromises();
        wrapper.vm.$nextTick(() => {
            // wrapper.vm.$validator.validate().then(valid => {
            //     console.log('-----******----TEST CODE------******------')
            //     console.log('-----******----TEST CODE------******------')
            //     console.log('param: ', valid);
            //     console.log('todo.name errors first:   ', wrapper.vm.errors.first('todo_name'));
            //     console.log('errors.any():    ', wrapper.vm.errors.any());
            // });
        })
    });

    it('has a button', () => {
        expect(wrapper.contains('button')).toBe(true);
    });

    it('validate empty string in the input', () => {
        wrapper.find('button').trigger('click');
        expect(wrapper.contains('.v-messages__message')).toBe(true);
    })
});