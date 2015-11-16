import gulp from 'gulp';
import stylus from 'gulp-stylus';
import config from './config';
import rimraf from 'rimraf';
import sourcemaps from 'gulp-sourcemaps';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import eslint from 'gulp-eslint';
import browserSync from 'browser-sync';
import watchify from 'watchify';

const babelifyOpts = {
    entries: ['./src/js/dummy.js'],
    transform: [['babelify', {
        presets: ['es2015']
    }]]
};
const bundler = watchify(browserify(Object.assign({}, watchify.args, babelifyOpts)));

gulp.task('clean', (cb) => {
    rimraf(config.patterns.dist, cb);
});

gulp.task('html', () => {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist));
});

gulp.task('stylus', () => {
    gulp.src(config.patterns.stylus)
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.paths.dist));
});

gulp.task('bundle', ['eslint'], () => {
    return bundler.bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist));
});

gulp.task('js', () => {
    browserify(babelifyOpts)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist));
});

gulp.task('eslint', () => {
    gulp.src(config.patterns.lint)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('refresh', ['clean', 'html', 'stylus', 'bundle'], browserSync.reload);

gulp.task('watch', ['bundle'], () => {
    let watcher = gulp.watch('./src/**/*', ['refresh']);

    watcher.on('change', (event) => {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('browser-sync', ['watch'], () => {
    return browserSync({server: {baseDir: './dist'}});
});

gulp.task('build', ['clean', 'html', 'stylus', 'eslint', 'js']);
gulp.task('serve', ['browser-sync']);
gulp.task('default', ['build']);