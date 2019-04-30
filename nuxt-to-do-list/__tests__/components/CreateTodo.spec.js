import Vue from "vue";
import { createLocalVue, shallowMount, mount } from "@vue/test-utils";
import flushPromises from 'flush-promises';
import CreateTodo from '../../components/CreateTodo.vue';
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
];

let wrapper = null;

describe('CreateTodo', () => {
    beforeEach(() => {
        wrapper = mount(CreateTodo, {
            sync: false
        })
    });
    it('has a h1', () => {
        expect(wrapper.contains('h1')).toBe(true);
    });

    it('shows validation message when text-field has no text', async () => {
        const validation = await wrapper.vm.$validator.validate();
        const validationMessage = await wrapper.vm.errors.first('todo_name');

        expect(validationMessage).toBe('The todo_name field is required.');
    });

    it('success to create to do list item', async () => {
        console.log(wrapper.vm.createTodo.callCount);
        console.log(wrapper.vm.$validator.validate.callCount);
        sinon.spy(wrapper.vm, 'createTodo');
        sinon.spy(wrapper.vm.$validator, 'validate');
        const vButton = wrapper.find('#button-create-todo');
        console.log('------button: ');

        vButton.trigger('click');
        console.log(wrapper.vm.createTodo.callCount);
        console.log('----1-----')
        console.log(wrapper.vm.$validator.validate.callCount);
        console.log('+_+_+_+_+_')
        console.log(wrapper.vm.createTodo);

        // expect(wrapper.vm.createTodo).toBeCalled();
        // expect(wrapper.vm.$validator.validate).toBeCalled();

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
        expect(wrapper.contains('#button-create-todo')).toBe(true);
    });

    it('validate empty string in the input', () => {
        wrapper.find('#button-create-todo').trigger('click');
        const message = wrapper.find('.v-messages__message');
        expect(message).toBe(true);
    })
});