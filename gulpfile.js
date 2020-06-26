const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');
const babel = require('gulp-babel');
const uglifycss = require('gulp-uglifycss');
const pug = require('gulp-pug');
const stylus = require('gulp-stylus');

gulp.task('dev', function dev (cb) {

    gulp.src('./src/fonts/*')
        .pipe(gulp.dest('./dev/fonts/'));

    gulp.src('./src/styl/*.css')
        .pipe(gulp.dest('./dev/css'));

    gulp.src('./src/pug/*.pug')
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('./dev'));

    gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./dev/img'));
    
    gulp.src('./src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env'],
            plugins: ["@babel/plugin-transform-modules-commonjs"],
        }))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./dev/js'));

    gulp.src('./src/styl/index.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./dev/css'));

    cb();
});



gulp.task('dist', function dist (cb) {

    gulp.src('./src/pug/*.pug')
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('./dist'));

    gulp.src('./src/fonts/*')
        .pipe(gulp.dest('./dist/fonts/'));

    gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist/'));

    gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./dist/img/'));
    
    gulp.src('./src/js/*.js')
        .pipe(concat('bundle.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));

    gulp.src('./src/styl/index.styl')
        .pipe(stylus({
            'include css': true
        }))
        .pipe(uglifycss())
        .pipe(gulp.dest('./dist/css'));

    gulp.src('./src/styl/*.css')
        .pipe(uglifycss())
        .pipe(gulp.dest('./dist/css'));

    cb();
});

 


gulp.task('watch', function (cb) {
    gulp.task('dev');
    gulp.watch('./src/**/**/*', gulp.task('dev'));
}); 