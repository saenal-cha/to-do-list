module.exports = {
    /*
    ** Headers of the page
    */
    head: {
        title: '할 일 목록 만들기',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Nuxt.js project' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
    ** Global CSS
    */
    css: ['~/assets/css/main.css'],
    /*
    ** Add axios globally
    */
    build: {
        vendor: ['axios'],
        /*
        ** Run ESLINT on save
        */
        extend (config, { isDev }) {
            if (isDev && process.client) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    },
    serverMiddleware: [
        // API middleware
        '~/api/index.js'
    ],
    modules: [
        ['@nuxtjs/vuetify'],
        ['nuxt-validate', {
            lang: 'ko'
        }]
    ],
    vuetify: {
        // theme: { }
        materialIcons: true,
        css: true
    }
}
