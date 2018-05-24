var gulp = require('gulp'),
    gutil = require('gulp-util' ),
  	stylus = require('gulp-stylus'),
  	browserSync = require('browser-sync'),
  	sourcemaps = require('gulp-sourcemaps'),
  	concat  = require('gulp-concat'),
  	uglify  = require('gulp-uglifyjs'),
  	cleanCSS = require('gulp-clean-css'),
  	rename = require('gulp-rename'),
  	del = require('del'),
  	cache = require('gulp-cache'),
  	autoprefixer = require('gulp-autoprefixer'),
  	runSequence = require('run-sequence'),
  	ftp = require('vinyl-ftp'),
  	notify = require("gulp-notify"),
  	gcmq = require('gulp-group-css-media-queries'),
  	smartgrid = require('smart-grid');

gulp.task('common-js', function() {
	return gulp.src([ // Берем все необходимые файлы
		'app/js/common.js',
		])
		.pipe(concat('common.min.js'))
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});

gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	})
});

gulp.task('js', ['common-js'], function() {
	return gulp.src([ // Берем все необходимые библиотеки
		'app/libs/jquery/jquery.min.js', // Берем jQuery
        //'app/libs/animate/wow.min.js',
		'app/js/common.min.js', // Всегда в конце
		])
		.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('app/js')) // Выгружаем в папку app/js
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('stylus', function() {
	return gulp.src(['app/stylus/**/*.styl',
		'!app/stylus/**/_*.styl'])
    .pipe(sourcemaps.init())
    .pipe(stylus({outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(stylus({
		'include css': true
	}))
    .pipe(autoprefixer(['last 15 versions'], { cascade: true }))
	.pipe(gcmq())
	.pipe(cleanCSS()) // Сжимаем
	.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
    .pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['stylus', 'browserSync', 'js'], function() {
	gulp.watch('app/stylus/**/*.styl', ['stylus']);
	// Обновляем браузер при любых изменениях в HTML или JS
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*') // Берем все изображения из app
		.pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('clean', function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('build', ['clean', 'img', 'stylus', 'js'], function() {

	var buildCss = gulp.src([ // Переносим CSS стили в продакшен
		'app/css/styles.min.css',
		])
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
	.pipe(gulp.dest('dist/js'))

	var buildFiles = gulp.src([
        'app/*.html',
        'app/.htaccess',
        'app/mail.php'
    ]).pipe(gulp.dest('dist'));

    /*var buildVideo = gulp.src('app/video/*.mp4')
    .pipe(gulp.dest('dist/video'))*/

});

gulp.task('deploy', function() {

    var conn = ftp.create({
        host:      'files.000webhost.com',
        user:      'topdronestk',
        password:  'LFC1234lfc',
        parallel:  10
    });

    var globs = [
    'dist/**',
    'dist/.htaccess',
    ];
    return gulp.src(globs, {buffer: false})
    .pipe(conn.dest('/public_html'));

});

gulp.task('default', function (callback) {
	runSequence(['stylus', 'browserSync', 'watch'],
		callback
	)
})

gulp.task('clear', function () {
	return cache.clearAll();
})


/* It's principal settings in smart grid project */
var settings = {
	outputStyle: 'styl', /* less || scss || sass || styl */
	columns: 12, /* number of grid columns */
	offset: "30px", /* gutter width px || % */
	filename: "_smart-grid",
    mobileFirst: false,
	container: {
		maxWidth: '1500px', /* max-width оn very large screen */
		fields: '30px' /* side fields */
	},
	breakPoints: {
		lg: {
			'width': '1350px', /* -> @media (max-width: 1100px) */
			'fields': '30px' /* side fields */
		},
		md: {
			'width': '1175px',
			'fields': '20px'
		},
		sm: {
			'width': '900px',
			'fields': '15px'
		},
		xs: {
			'width': '560px',
			'fields': '15px'
		}
		/*
		We can create any quantity of break points.

		some_name: {
			some_width: 'Npx',
			some_offset: 'N(px|%)'
		}
		*/
	}
};

gulp.task('smartgrid', function() {
	smartgrid('app/stylus', settings);
});
