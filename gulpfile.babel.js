'use strict';

import gulp from 'gulp';
import Browserify from 'browserify';
import babelify from 'babelify';
import stream from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('static', () =>
    gulp.src([
        'src/*.html', 'src/video/*', 'src/img/**/*', 'src/fonts/*'
    ], {
        base: './src/'
    }).pipe(gulp.dest('./dist'))
);

gulp.task('js', () =>
    Browserify('src/js/game/app.js')
        .transform(babelify.configure({
                presets: ["es2015"]
        }))
        .bundle()
        .on('error', e =>
            $.util.log(e)
        )
        .pipe(stream('app.js'))
        .pipe(buffer())
        .pipe($.uglify())
        .pipe(gulp.dest('dist/js/game'))
);

gulp.task('less', () => {
    const AUTOPREFIXER_BROWSERS = [
        'ie >= 10',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.4',
        'bb >= 10'
    ];

    gulp.src("src/less/game.less")
        .pipe($.less())
        .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('serve', ['js', 'less', 'static'], () => {
    browserSync({
        notify: false,
        logPrefix: 'WSK',
        server: ['dist'],
        port: 3000
    });
});

gulp.task('serve-reload', ['js', 'less', 'static'], () => {
    browserSync({
        notify: false,
        logPrefix: 'WSK',
        server: ['dist'],
        port: 3000
    });

    gulp.watch(['src/index.html'], ['static', reload]);
    gulp.watch(['src/less/**/*.less'], ['less', reload]);
    gulp.watch(['src/js/**/*.js'], ['js', reload]);
    gulp.watch(['src/img/**/*'], ['static', reload]);
});

gulp.task('default', ['static', 'js']);
