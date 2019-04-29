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



describe('CreateTodo', () => {
    const wrapper = shallowMount(CreateTodo, {
        localVue
    });

    it('renders the correct markup', () => {
        expect(wrapper.html()).toContain('<div class="info-form"></div>')
    });

    it('has a button', () => {
        expect(wrapper.contains('button')).toBe(true);
    });
});