var gulp = require('gulp');
var babel = require('gulp-babel');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var image = require('gulp-image');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

var srcStyles = 'src/sass/**/*.scss';
var srcScripts = 'src/js/**/*.js';
var srcImages = 'src/img/**/*.*';

gulp.task('styles', function(){
	return gulp.src(srcStyles)
	.pipe(concat('jauntyslider.min.css'))
	.pipe(sass())
	.pipe(minifyCss())
	.pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function(){
	return gulp.src(srcScripts)
	.pipe(concat('jauntyslider.min.js'))
	.pipe(babel())
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});

gulp.task('images', function(){
	return gulp.src(srcImages)
	.pipe(changed('dist/img/'))
	.pipe(image())
	.pipe(gulp.dest('dist/img'));
});

gulp.task('default', ['styles', 'scripts', 'images']);

gulp.task('watch', function(){
	gulp.watch([srcStyles, srcScripts, srcImages], ['default']);
});
