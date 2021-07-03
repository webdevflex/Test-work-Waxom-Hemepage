const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const fonter = require('gulp-fonter');
const svgSpritess = require('gulp-svg-sprite');
const tinyPng = require('gulp-tinypng-compress');


//js
const jsFiles = [
    'src/js/*.js',
];

//js
function scripts(){
    return gulp.src(jsFiles)
        .pipe(concat('script.min.js'))
        .pipe(uglify({
            toplevel:true, 
        }))
        .pipe(gulp.dest('build/js/'))
        .pipe(browserSync.stream());
}
//scss-css
const cssFiles = [
    'node_modules/normalize.css/normalize.css',
    'src/scss/**/*.scss'
];
function sasscss(){
    return gulp.src(cssFiles)
    .pipe(
        sass({
        outputStyle: "expanded"
    }))
    .pipe(autoprefixer({overrideBrowserslist:['last 10 versions'], grid:true}))
    // .pipe(cleanCSS({
    //     level: 2
    //  }))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('build/css/'))
    .pipe(browserSync.stream());

}

//svgSprite
// let fileSvg = [
//     'src/images/svg/*.svg'
// ];
let fileSvg = [
    'src/images/svg/*.svg'
];
function svgSprite(){
    return gulp
        .src(fileSvg)
        .pipe(svgSpritess({
            mode:{
                stack:{
                    sprite:'../sprite.svg'
                }
            },
        }
        ))
        .pipe(gulp.dest('build/images/'));
};

//html
function html(){
    return gulp.src('src/*.html')
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.stream());
}

//fonts - ttf/woff,woff2
function otf2ttf(){
    return gulp.src('src/fonts/**/*.otf')
    .pipe(fonter({
        formats:['ttf']
    }))
    .pipe(gulp.dest('src/fonts/'));
}

function fonts(){
    gulp.src('src/fonts/**/*.{ttf,woff,woff2}')
    .pipe(ttf2woff())
    .pipe(gulp.dest('build/fonts/'));
    return gulp.src('src/fonts/**/*.{ttf,woff,woff2}')
    .pipe(ttf2woff2())
    .pipe(gulp.dest('build/fonts/'));
}

//new image
let fileImages = [
    'src/images/*.{png,jpg,jpeg,mp4}'
];
function imagesCopy(){
    return gulp 
    .src(fileImages)
    // .pipe(tinyPng({
    //     key: 'RWNrsmcDz2jCP0fybskdFsS9G2Q04Zll',
    //     sigFile: 'images/.tinypng-sigs',
    //     log: true
    // }))
    .pipe(gulp.dest('build/images/'))
}

//images
// let filesImages = [
//     'src/images/*',
//   ];
// function images() {
//     return gulp
//       .src(filesImages)
//       .pipe(tingpng('RWNrsmcDz2jCP0fybskdFsS9G2Q04Zll'))
//       .pipe(gulp.dest('build/images/'))  
// }

//video
let fileVideo = [
    'scr/video/**/*.mp4'
];
function videoCopy(){
    return gulp.src (fileVideo)
    .pipe(gulp.dest('build/video/'))
}
// function html(){
//     return gulp.src('src/*.html')
//     .pipe(gulp.dest('build/'))
//     .pipe(browserSync.stream());
// }



//clean
function clean(){
   return del(['build/*']);
}

function watch(){
    browserSync.init({
        server: {
            baseDir: "./build",
        }
    });
    gulp.watch('./src/scss/**/*.scss', sasscss);
    gulp.watch('./src/js/**/*.js', scripts);
    gulp.watch('./src/*.html', html).on('change', browserSync.reload);
    gulp.watch('./src/images/**/**/*', imagesCopy).on('change', browserSync.reload);
    // gulp.watch('./src/images/svg/*', copySvg);
    gulp.watch('./src/images/svg/*.svg', svgSprite);
    // gulp.watch('./src/video/**/', videoCopy).on('change', browserSync.reload);

}
// gulp.task('videoCopy', videoCopy);
gulp.task('svgSprite', svgSprite);
gulp.task('sasscss', sasscss);
gulp.task('otf2ttf', otf2ttf);
gulp.task('html',html);
gulp.task('watch', watch);
gulp.task('scripts',scripts);
gulp.task('clean' , clean);
gulp.task('imagesCopy', imagesCopy);
gulp.task('fonts', fonts);
gulp.task('default', gulp.series('clean', gulp.parallel( 'sasscss','scripts', 'html' ,'imagesCopy','svgSprite','otf2ttf','fonts'), 'watch'));         

