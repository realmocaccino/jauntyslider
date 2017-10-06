var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');

gulp.task('styles', function(){
	return gulp.src([
		'src/css/*.css'
	])
	.pipe(concat('jauntyslider.min.css'))
	.pipe(minifyCss())
	.pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function(){
	return gulp.src([
		'src/js/*.js'
	])
	.pipe(concat('jauntyslider.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['styles', 'scripts']);

gulp.task('watch', function(){
	gulp.watch(['src/css/*.css', 'src/js/*.js'], ['default']);
});
