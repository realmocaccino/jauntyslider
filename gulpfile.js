var babel = require('gulp-babel')
var concat = require('gulp-concat')
var gulp = require('gulp')
var minifyCss = require('gulp-minify-css')
var sass = require('gulp-sass')
var uglify = require('gulp-uglify')
var webpack = require('webpack-stream')

var srcStyles = 'src/sass/**/*.scss'
var srcScripts = 'src/js/**/*.js'

var distStyles = 'dist/css'
var distScripts = 'dist/js'

gulp.task('styles', function(){
	return gulp.src(srcStyles)
	.pipe(concat('jauntyslider.min.css'))
	.pipe(sass())
	.pipe(minifyCss())
	.pipe(gulp.dest(distStyles))
})

gulp.task('scripts', function(){
	return gulp.src(srcScripts)
	.pipe(webpack())
	.pipe(concat('jauntyslider.min.js'))
	.pipe(babel())
	.pipe(uglify())
	.pipe(gulp.dest(distScripts))
})

gulp.task('default', ['styles', 'scripts'])

gulp.task('watch', ['default'], function(){
	gulp.watch([srcStyles, srcScripts], ['default'])
})
