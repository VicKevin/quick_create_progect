// 1: LESS 编译 压缩 合并
// 2: js 合并 压缩 混淆
// 3: img 复制
// 4: html 压缩

// 在gulpfile中先载入gulp包，因为这个包提供了一些API
var gulp = require('gulp');

// less文件解析
var less = require('gulp-less');

// css 压缩
var cssnano = require('gulp-cssnano');


// 1: LESS 编译 压缩 合并:合并没有什么必要，一般都在less文件里导包
// 创建一个style任务
gulp.task('style',function() {
	// 这里面的任务在执行style任务时自动执行
	gulp.src(['src/styles/*.less','!src/styles/_*.less'])
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest('dist/styles'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

// js合并
var concat = require('gulp-concat');

// js 压缩混淆
var uglify = require('gulp-uglify');

// 2: js 合并 压缩 混淆
gulp.task('script',function() {
	gulp.src('src/scripts/*.js')
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/scripts'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

// 3: img 复制
gulp.task('images',function() {
	gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/images'))
	.pipe(browserSync.reload({
		stream: true
	}));
});


// html压缩
var htmlmin = require('gulp-htmlmin');


// 4: html 压缩
gulp.task('html',function() {
	gulp.src('src/*.html')
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

// 启动服务
var browserSync = require('browser-sync');
gulp.task('serve',function() {
	browserSync({
		server: {
			baseDir:['dist']
		}
	}, function(err, bs) {
	    console.log(bs.options.getIn(["urls", "local"]));
	});
	// 对文件变动进行监视
	gulp.watch('src/styles/*.less',['style']);
	gulp.watch('src/scripts/*.js',['script']);
	gulp.watch('src/images/*.*',['images']);
	gulp.watch('src/*.html',['html']);
});