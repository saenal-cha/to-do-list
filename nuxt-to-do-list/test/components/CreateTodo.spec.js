import { mount } from '@vue/test-utils'
import CreateTodo from '../../components/CreateTodo.vue'

const vm = wrapper.vm;

console.log(wrapper);

describe('CreateTodo', () => {
    const wrapper = mount(CreateTodo);

    it('renders the correct markup', () => {
        expect(wrapper.html()).toContain('<div class="info-form"></div>')
    });

    it('has a button', () => {
        expect(wrapper.contains('button')).toBe(true);
    });
});