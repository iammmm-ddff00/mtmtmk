// ----------------------------------------
// Variables
// ----------------------------------------

const { src, dest, parallel, watch } = require('gulp');

    // - COMMON
        // - リネーム
        const rename = require('gulp-rename');
        // - ブラウザリロード
        const browserSync = require('browser-sync');
        // - エラーが発生しても強制終了させない
        const plumber = require("gulp-plumber");
        // - エラー発生時のアラート出力
        const notify = require("gulp-notify");

    // - HTML
        // - PugをHTMLに変換
        const pug = require('gulp-pug');

    // - SCSS
        // - SCSSをCSSに変換
        const sass = require('gulp-dart-sass');
        // const sass = require('gulp-sass')(require('sass'));
        // - 古いブラウザーのサポートを追加
        const prefix = require('gulp-autoprefixer');
        // - CSSを縮小
        const minify = require('gulp-clean-css');
        // - DartSassのimportを楽にする
        const glob = require("gulp-sass-glob");
    
    // - JS
        // - Babel
        const babel = require('gulp-babel');
        // - JSを縮小
        const webpackStream = require("webpack-stream");
        // - webpack
        const webpack = require("webpack");
        const webpackConfig = require("./webpack.config");

// ----------------------------------------
// Functions
// ----------------------------------------

    // - HTML
    function html(){
        return src(['src/pug/*.pug', 'src/pug/**/*.pug', '!src/pug/_*/*.pug', '!src/pug/**/_*.pug'])
            .pipe(pug({
                pretty: true
            }))
            .pipe(dest('dist'))
            .pipe(browserSync.reload({
                stream: true,
                once: true
            }));
    }

    // - SCSS
    function css(){
        return src('src/assets/scss/*.scss')
            .pipe(plumber({
                errorHandler: notify.onError('Error:<%= error.message %>')
            }))
            .pipe(glob())
            .pipe(sass({
                outputStyle: 'expanded'
            }))
            .pipe(prefix())
            .pipe(minify())
            .pipe(rename({
                suffix: ".min",
            }))
            .pipe(dest('dist/assets/css'))
            .pipe(browserSync.reload({
                stream: true,
                once: true
            }));
    }

    // - JS
    function js(){
        return src('src/assets/js/*.js')
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(webpackStream(webpackConfig, webpack))
            .pipe(rename({
                suffix: ".min",
            }))
            .pipe(dest('dist/assets/js'))
            .pipe(browserSync.reload({
                stream: true,
                once: true
            }));
    }

    // - IMG
    function img(){
        return src('src/assets/img/**')
            .pipe(dest('dist/assets/img'))
    }

    // - BS
    function bs(){
        browserSync.init({
            server: {
                baseDir: './dist/'
            },
            notify: true,
            xip: false
        });
    }

// ----------------------------------------
// Parallel
// ----------------------------------------

exports.html = html;
exports.css = css;
exports.js = js;
exports.bs = bs;
exports.img = img;

exports.default = parallel([html, css, js, img, bs], () => {
    watch('./src/pug/**', html);
    watch('./src/assets/scss/**', css);
    watch('./src/assets/js/**', js);
    watch('./src/img/**', img);
});