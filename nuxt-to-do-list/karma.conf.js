// karma.conf.js

var webpackConfig = require('./webpack.config.js')

module.exports = function(config) {
    config.set({
        basePath: './.',
        frameworks: ['mocha'],

        files: ['__tests__/**/*.spec.js'],

        preprocessors: {
            '**/*.spec.js': ['webpack', 'sourcemap']
        },

        webpack: webpackConfig,

        reporters: ['spec', 'coverage'],

        browsers: ['Chrome'],

        coverageReporter: {
            dir: './coverage',
            reporters: [{ type: 'lcov', subdir: '.' }, { type: 'text-summary' }]
        },
        failOnEmptyTestSuite: true
    })
}
