module.exports = (config) => {
    config.set({
        frameworks: ['jasmine-ajax', 'jasmine'],
        basePath: __dirname,
        files: ['src/*.js', 'test/*.spec.js'],
        autoWatch: true,
        browsers: ['ChromeHeadless']
    });
}
