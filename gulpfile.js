var gulp = require('gulp');
var babel = require('gulp-babel');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var image = require('gulp-image');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var webpack = require('webpack-stream');

var srcStyles = 'src/sass/**/*.scss';
var srcScripts = 'src/js/**/*.js';
var srcImages = 'src/img/**/*.*';

var distStyles = 'dist/css';
var distScripts = 'dist/js';
var distImages = 'dist/img';

gulp.task('styles', function(){
	return gulp.src(srcStyles)
	.pipe(concat('jauntyslider.min.css'))
	.pipe(sass())
	.pipe(minifyCss())
	.pipe(gulp.dest(distStyles));
});

gulp.task('scripts', function(){
	return gulp.src(srcScripts)
	.pipe(webpack())
	.pipe(concat('jauntyslider.min.js'))
	.pipe(babel())
	.pipe(uglify())
	.pipe(gulp.dest(distScripts));
});

gulp.task('images', function(){
	return gulp.src(srcImages)
	.pipe(changed(distImages))
	.pipe(image())
	.pipe(gulp.dest(distImages));
});

gulp.task('default', ['styles', 'scripts', 'images']);

gulp.task('watch', function(){
	gulp.watch([srcStyles, srcScripts, srcImages], ['default']);
});
