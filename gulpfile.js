'use strict';

var gulp         = require('gulp'),
    uglify       = require('gulp-uglify'),
    watch        = require('gulp-watch'),
    minCss       = require('gulp-minify-css'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

var path = {
    public: {
        css: 'public/css/',
        js: 'public/js/'
    },
    src: {
        sass: 'src/scss/main.scss',
        js: 'src/js/main.js'
    },
    watch: {
        sass: 'src/scss/*/.scss',
        js: 'src/js/main.js'
    }
};

gulp.task('sass', function() {
    gulp.src(path.src.sass)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(path.public.css));
});

gulp.task('js', function() {
   gulp.src(path.src.js)
       .pipe(uglify())
       .pipe(gulp.dest(path.public.js));
});

gulp.task('watch', function() {
    gulp.start('sass');
    gulp.start('js');
    watch([path.watch.sass], function(event, cb) {
        gulp.start('sass');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js');
    });
});

gulp.task('default', ['sass', 'js']);