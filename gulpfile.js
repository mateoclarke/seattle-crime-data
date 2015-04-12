var gulp = require('gulp'),
	gutil = require('gulp-util'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect'),
	bower = require('gulp-bower'),
	concat = require('gulp-concat'),
	deploy = require('gulp-gh-pages');

var jsSources = [
	'components/scripts/crimeDataMap.js',
	'components/scripts/oneMileCircle.js'
];
var sassSources = ['components/sass/style.scss'];
var htmlSources = ['builds/development/*.html'];
var jsonSources = ['builds/development/js/*.json']

gulp.task('js', function(){
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(browserify())
		.pipe(gulp.dest('builds/development/js'))
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
	gulp.watch(jsSources, ['js']);
	gulp.watch('components/sass/*.scss', ['compass']);
	gulp.watch(htmlSources, ['html']);
	gulp.watch(jsonSources, ['json']);
});

gulp.task('connect', function(){
	connect.server({
		root: 'builds/development/',
		livereload: true
	});
});

gulp.task('html', function(){
	gulp.src(htmlSources)
		.pipe(connect.reload())
});

gulp.task('json', function(){
	gulp.src(jsonSources)
		.pipe(connect.reload())
});

gulp.task('deploy', function () {
    return gulp.src('./builds/development/**/*')
        .pipe(deploy());
});


gulp.task('default', ['html', 'json', 'js','compass', 'connect', 'watch']);
