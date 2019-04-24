module.exports = {
    head: {
        title: 'home',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ],
        link: [
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
        ]
    },
    modules: [
        '@nuxtjs/vuetify'
    ],
    vuetify: {
        // Vuetify Options
        // theme: { }
    },
    serverMiddleware: [
        '../../to_do_list_app/server.js'
    ]
}

