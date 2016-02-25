module.exports = function(config) {
    config.set({
        frameworks: ['jasmine', 'browserify'],

        files: [
            'dist/tests/**/*.js'
        ],
        preprocessors: {
            'dist/tests/**/*.js': [ 'browserify' ]
        },
        browserify: {
            debug: true
        },
        browsers: ['Chrome']
    });
};