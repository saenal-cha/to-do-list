export default {
    changeTodo: state => state.isTodoChanging = true,
    finishChangeTodo: state => state.isTodoChanging = false
}