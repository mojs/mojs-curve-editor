var gulp         = require('gulp'),
    postcss = require('gulp-postcss'),
    csswring     = require('csswring'),
    browserSync  = require('browser-sync'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglifyjs'),
    cssnano      = require('gulp-cssnano'),
    rename       = require('gulp-rename'),
    del          = require('del'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    cache        = require('gulp-cache'),
    autoprefixer = require('autoprefixer');

gulp.task('style', function () {
    var processors = [
        autoprefixer({browsers: ['last 1 version']}),
        cssnano(),
        csswring
    ];
    return gulp.src('./src/blocks/*.css')
        .pipe(postcss(processors))
        .pipe(rename('mainout.css'))
        .pipe(gulp.dest('./blocks'));
});


gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('scripts', function() {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/modernizr/bin/modernizr.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});


gulp.task('watch', ['browser-sync', 'style', 'scripts'], function() {
    gulp.watch('./src/blocks/*.css', ['style']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['clean', 'img', 'style', 'scripts'], function() {

    var buildFonts = gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*')
        .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));

});

gulp.task('clear', function (callback) {
    return cache.clearAll();
})

gulp.task('default', ['watch']);