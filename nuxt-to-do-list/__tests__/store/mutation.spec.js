import mutations from '../../store/mutations';

test('"changeTodo" change "state.isTodoChange" by true', () => {
    const state = {
        isTodoChanging: false
    };

    mutations.changeTodo(state);

    expect(state.isTodoChanging).toBe(true);
});