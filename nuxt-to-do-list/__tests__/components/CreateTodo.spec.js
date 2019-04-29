// import { expect } from 'chai'

import { createLocalVue, shallowMount } from "@vue/test-utils";
// import { mount } from '@vue/test-utils';
// import flushPromises from 'flush-promises'
import CreateTodo from '../../components/CreateTodo.vue';
import VeeValidate from "vee-validate";
import Vuetify from "vuetify";
import sinon from 'sinon'

const localVue = createLocalVue();
const validateStub = sinon.stub();

localVue.use(VeeValidate);
localVue.use(Vuetify);

let wrapper = null;

describe('CreateTodo', () => {
    beforeEach(() => {
        wrapper = shallowMount(CreateTodo, {
            localVue
        });
    });
    it('has a h1', () => {
        expect(wrapper.contains('h1')).toBe(true);
    });

    it('has a input', async () => {
        await wrapper.vm.$validator.validateAll();
        console.log('==============', wrapper.vm.$validator.validateAll);
        console.log(wrapper.vm.todo.name)
        console.log(wrapper.vm.errors.first('todo_name'))
    });

    it('has a button', () => {
        expect(wrapper.contains('button')).toBe(true);
    });

    it('validate empty string in the input', () => {
        wrapper.find('button').trigger('click');
        expect(wrapper.contains('.v-messages__message')).toBe(true);
    })
});