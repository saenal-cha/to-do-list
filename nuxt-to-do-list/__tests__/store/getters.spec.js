import getters from '../../store/getters'

test('"stateOfTodoChanging" returns if "state.isTodoChanging" is false', () => {
    const state = {
        isTodoChanging: false
    };
    expect(getters.stateOfTodoChanging(state)).toBe(false)
});

test('"stateOfTodoChanging" returns if "state.isTodoChanging" is true', () => {
    const state = {
        isTodoChanging: true
    };
    expect(getters.stateOfTodoChanging(state)).toBe(true)
});