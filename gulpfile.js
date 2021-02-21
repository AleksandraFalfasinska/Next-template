var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('uglify', function() {
    gulp.src('src/js/**/*.js')
        .pipe(uglify())
        .pipe(concat('apps.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('compileSass', function() {
    gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
});

function styleScss() {
    //1.where is my scss
    return gulp.src('src/scss/**/*.scss') //gets all files ending with .scss in src/scss
        //2. pass that file through sass compiler
        .pipe(sass().on('error', sass.logError))
        //3. where do I save the compiled css file
        .pipe(gulp.dest('src/css'))
        //4. stream change to all browsers
        .pipe(browserSync.stream());
}

function compileJS() {
    gulp.src('src/js/**/*.js')
        .pipe(uglify())
        .pipe(concat('apps.js'))
        .pipe(gulp.dest('build'))
        .pipe(browserSync.stream());
}

gulp.task('watch', function() {
    browserSync.init({
        server: {
            baseDir: "./",
            index: "src/index.html"
        }
    });
    gulp.watch('src/scss/**/*.scss', styleScss);
    gulp.watch('src/js/**/*.js', compileJS);

    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('src/js/**/*.js').on('change', browserSync.reload);

});