var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee'),
	concat = require('gulp-concat');

var coffeeSources = ['components/coffee/*.coffee'];
var jsSources = [
	'components/scripts/*'
];

gulp.task('coffee', function() {
  	gulp.src(coffeeSources)
	  	.pipe(coffee({ bare: true })
	  		.on('error', gutil.log))
	  	.pipe(gulp.dest('components/scripts'))
});

gulp.task('js', function(){
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(gulp.dest('components/scripts'))
});


gulp.task('default', function() {
  // place code for your default task here
});