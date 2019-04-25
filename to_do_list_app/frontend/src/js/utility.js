const Utility = {
    install (Vue, options) {
        Vue.prototype.$routerExceptionHandler = (to, from, next) => {
            return error => {
                switch (error.response.status) {
                    case 401:
                        return next({ name: 'login', replace: true });
                    case 404:
                        return next({ name: '404', params: [to.path], replace: true });
                    default:
                        return next(error);
                }
            }
        }
    }
}

export default Utility;