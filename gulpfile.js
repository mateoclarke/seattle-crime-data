var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect'),
	concat = require('gulp-concat');

var coffeeSources = ['components/coffee/*.coffee'];
var jsSources = ['components/scripts/script.js', 'components/scripts/tagline.js'];
var sassSources = ['components/sass/style.scss'];

gulp.task('coffee', function() {
  	gulp.src(coffeeSources)
	  	.pipe(coffee({ bare: true })
	  		.on('error', gutil.log))
	  	.pipe(gulp.dest('components/scripts'))
});

gulp.task('js', function(){
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(browserify())
		.pipe(gulp.dest('components/scripts'))
		.pipe(connect.reload())
});

gulp.task('compass', function(){
	gulp.src(sassSources)
		.pipe(compass({
			sass: 'components/sass',
			image: 'builds/development/images',
			style: 'expanded'
		}))
		.on('error', gutil.log)
		.pipe(gulp.dest('builds/development/css'))
		.pipe(connect.reload())
});

gulp.task('watch', function(){
	gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(jsSources, ['js']);
	gulp.watch('components/sass/*.scss', ['compass']);
});

gulp.task('connect', function(){
	connect.server({
		root: '/builds/development/',
		livereload: true
	});
});


gulp.task('default', ['coffee','js','compass', 'connect', 'watch']);
