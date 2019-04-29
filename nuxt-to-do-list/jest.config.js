console.log('----jest config-----')

module.exports = {
    'rootDir': './',
    'verbose': true,
    'collectCoverage': true,
    'collectCoverageFrom': ['./**/*.js'],
    'coverageDirectory': '<rootDir>/coverage',
    'moduleFileExtensions': [
        'js'
    ],
    'transform': {
        ".*\\.vue$": "<rootDir>/node_modules/jest-vue-preprocessor",
        "^.+\\.(js|jsx)?$": "<rootDir>/node_modules/babel-jest",
        ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
    },
    'testResultsProcessor': './node_modules/jest-junit'
}