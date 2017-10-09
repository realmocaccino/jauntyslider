var gulp = require('gulp');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var image = require('gulp-image');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

gulp.task('styles', function(){
	return gulp.src('src/sass/**/*.sass')
	.pipe(concat('jauntyslider.min.css'))
	.pipe(sass())
	.pipe(minifyCss())
	.pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function(){
	return gulp.src('src/js/**/*.js')
	.pipe(concat('jauntyslider.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});

gulp.task('images', function(){
	return gulp.src('src/img/**/*.*')
	.pipe(changed('dist/img/'))
	.pipe(image())
	.pipe(gulp.dest('dist/img'));
});

gulp.task('default', ['styles', 'scripts', 'images']);

gulp.task('watch', function(){
	gulp.watch(['src/sass/**/*.sass', 'src/js/**/*.js', 'src/img/**/*.*'], ['default']);
});
