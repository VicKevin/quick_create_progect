// gulp主模块
var gulp = require('gulp');
// 此后的应用已$代替()实例化
var $ = require('gulp-load-plugins')();
// 定义已完成
var open = require('open');

var app = {
	srcPath: 'src/', // 源地址
	devPath: 'build/', // 开发目录
	prdPath: 'dist/' // 上线目录
}

gulp.task('libs',function() {
	gulp.src('bower_components/**/*.js')
	.pipe(gulp.dest(app.devPath + 'libs'))
	.pipe(gulp.dest(app.prdPath + 'libs'))
	.pipe($.connect.reload());
});

gulp.task('html',function() {
	gulp.src(app.srcPath + '**/*.html')
	.pipe(gulp.dest(app.devPath))
	.pipe(gulp.dest(app.prdPath))
	.pipe($.connect.reload());
});

gulp.task('less',function() {
	gulp.src(app.srcPath + 'styles/index.less')
	.pipe($.less())
	.pipe(gulp.dest(app.devPath + 'css'))
	.pipe($.cssmin())
	.pipe(gulp.dest(app.prdPath + 'css'))
	.pipe($.connect.reload());
});

gulp.task('script',function() {
	gulp.src(app.srcPath + 'scripts/**/*.js')
	.pipe($.concat('index.js'))
	.pipe(gulp.dest(app.devPath + 'js'))
	.pipe($.uglify())
	.pipe(gulp.dest(app.prdPath + 'js'))
	.pipe($.connect.reload());
});

gulp.task('images',function() {
	gulp.src(app.srcPath + 'images/**/*')
	.pipe(gulp.dest(app.devPath + 'images'))
	.pipe($.imagemin())
	.pipe(gulp.dest(app.prdPath + 'images'))
	.pipe($.connect.reload());
});

gulp.task('build',['libs','html','less','script','images']);

gulp.task('clean',function() {
	gulp.src([app.devPath,app.prdPath])
	.pipe($.clean())
});

gulp.task('serve',['build'],function() {
	$.connect.server({
		root: [app.devPath],
		livereload: true,
		port: 2000
	});

	open('http://localhost:2000');

	gulp.watch('bower_components/**/*',['libs']);
	gulp.watch(app.srcPath + '**/*.html',['html']);
	gulp.watch(app.srcPath + 'styles/**/*',['less']);
	gulp.watch(app.srcPath + 'scripts/**/*.js',['script']);
	gulp.watch(app.srcPath + 'images/**/*',['images']);

});

gulp.task('default',['serve']);
