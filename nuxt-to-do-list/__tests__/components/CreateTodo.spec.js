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

    it('has correct text in H1 tag: 할 일 목록 만들기', () => {
        const h1 = wrapper.find('h1');
        expect(h1.text()).toBe('할 일 목록 만들기');
    });

    it('has correct text in SMALL tag: 할 일을 적고 [엔터] 키를 누르거나 [추가하기] 버튼을 누르세요', () => {
        const small = wrapper.find('small');
        expect(small.text()).toBe('할 일을 적고 [엔터] 키를 누르거나 [추가하기] 버튼을 누르세요');
    });

    it('has a button', () => {
        expect(wrapper.contains('#button-create-todo')).toBe(true);
    });

    it('has correct text in BUTTON tag: 추가하기', () => {
        const button = wrapper.find('.btn');
        expect(button.text()).toBe('추가하기');
    });

    it('shows validation message when text-field has no text', async () => {
        const validation = await wrapper.vm.$validator.validate();
        const validationMessage = await wrapper.vm.errors.first('todo_name');

        expect(validationMessage).toBe('The todo_name field is required.');
    });

    it('success to emit to create this todo object when text-filed is validated by not empty text', async () => {
        const textField = wrapper.find('#input-create-todo');
        const vButton = wrapper.find('#button-create-todo');

        textField.element.value = 'tom';

        console.log('---emitting test---');
        vButton.trigger('click');
        console.log('----button is clicked!!');

        await flushPromises();

        console.log('event emitted:   ', wrapper.emitted());

        expect(wrapper.emitted().create).toBeTruthy();
    });
});