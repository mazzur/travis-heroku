const config = {
    paths: {
        dist: 'dist',
        distjs: 'dist/dummy.js',
        mainjs: 'src/js/dummy.js',
        html: 'src/index.html'
    },
    patterns: {
        dist: 'dist/**',
        lint: ['**/*.js','!node_modules/**', '!dist/**'],
        stylus: 'src/styl/**.styl'
    }
};

export default config;