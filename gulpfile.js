var gulp = require('gulp');
var pug = require('gulp-pug');
var fs = require('fs');
var data = require('gulp-data');
var path = require('path');
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");
var browserSync = require('browser-sync');
// var sass = require('node-sass');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');

/**
 * 開発用のディレクトリを指定します。
 */
var src = {
  // 出力対象は`_`で始まっていない`.pug`ファイル。
  'html': ['src/**/*.pug', '!' + 'src/**/_*.pug'],
  // JSONファイルのディレクトリを変数化。
  'json': 'src/_data/',
  'css': 'src/**/*.css',
  'sass': ['src/**/*.scss', '!src/**/_*.scss'],
  'js': 'src/**/*.js',
};

/**
 * 出力するディレクトリを指定します。
 */
var dest = {
  'root': 'dest/recruit/shinsotsu/',
  'html': 'dest/'
};

/**
 * `.pug`をコンパイルしてから、destディレクトリに出力します。
 * JSONの読み込み、ルート相対パス、Pugの整形に対応しています。
 */
gulp.task('html', function() {
  return gulp.src(src.html)
  // コンパイルエラーを通知します。
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  .pipe(pug({
    // Pugファイルのルートディレクトリを指定します。
    // `/_includes/_layout`のようにルート相対パスで指定することができます。
    basedir: 'src',
    // Pugファイルの整形。
    pretty: true
  }))
  .pipe(gulp.dest(dest.root))
  .pipe(browserSync.reload({stream: true}));
});

var browsers = [
  'last 2 versions',
  '> 5%',
  'not ie <= 8'
];

/**
 * cssファイルをdestディレクトリに出力（コピー）します。
 */
gulp.task('css', function() {
  return gulp.src(src.css, {base: src.root})
  .pipe(gulp.dest(dest.root))
  .pipe(browserSync.reload({stream: true}));
});

/**
 * gulp sass で実行するタスク
 */
gulp.task('sass', function () {
  gulp.src('src/assets/scss/*.scss')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass({
        style : 'expanded'
    }))
    .pipe(postcss([cssnext(browsers)]))
    .pipe(gulp.dest(dest.root + 'assets/css/'));
});

/**
 * jsファイルをdestディレクトリに出力（コピー）します。
 */
gulp.task('js', function() {
  return gulp.src(src.js, {base: src.root})
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  .pipe(gulp.dest(dest.root))
  .pipe(browserSync.reload({stream: true}));
});

/**
 * ローカルサーバーを起動します。
 */
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'dest/recruit/shinsotsu/',
      index: "/index.html"
    }
  });
});

/**
 * PugのコンパイルやCSSとjsの出力、browser-syncのリアルタイムプレビューを実行します。
 */
gulp.task('watch',['html', 'sass', 'js', 'browser-sync'], function() {
  gulp.watch(src.html[0], ['html']);
  gulp.watch(src.css, ['css']);
  gulp.watch(src.js, ['js']);
  gulp.watch(src.sass, ['sass']);
});

/**
 * 開発に使うタスクです。
 * package.jsonに設定をして、`npm run default`で実行できるようにしています。
 */
gulp.task('default', ['watch']);

gulp.task('build', ['html', 'sass', 'js']);
