var basePaths = {
  src: 'dev/',
  dest: 'prod/',
};
var paths = {
  images: {
    src: basePaths.src + 'assets/img/',
    dest: basePaths.dest + 'assets/img/'
  },
  templates: {
    src: basePaths.src + 'tpl/'
  },
  twig: {
    src: basePaths.src,
    dest: basePaths.dest
  },
  scripts: {
    src: basePaths.src + 'scripts/',
    dest: basePaths.dest + 'scripts/'
  },
  css: {
    src: basePaths.src + 'scss/',
    dest: basePaths.dest + 'css/'
  },
  html: {
    src: basePaths.src,
    dest: basePaths.dest
  }
};
var globs = {
  "scripts": ['dev/scripts/**/*.js'],
  "json": ['dev/scripts/**/*.json'],
  "styles": ['dev/scss/**/*.scss'],
  "pages": ['dev/**/*.twig'],
  "images": ['dev/assets/**/*'],
  "vendor": ['dev/vendor/**/*'],
  "html": ['dev/**/*.html']
}


// Load Gulp
var gulp = require('gulp');

// BroswerSync
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// Twig stuff
var twig = require('gulp-twig');
var data = require('gulp-data');
var fs = require('fs');
var path = require('path');


// SASS compiling
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./prod"
    }
  });
});
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });
});


// Compiles the Twig templates
gulp.task('twig', function () {
    'use strict';
    return gulp.src('dev/templates/*.twig')
        .pipe(twig())
        .pipe(gulp.dest('./prod'));
});


//PostCSS process and SASS compilation
gulp.task('css', function() {
  var postcss = require('gulp-postcss');
  var autoprefixer = require('autoprefixer');
  return gulp.src(['dev/scss/**/*.scss'])
    .pipe(sass())
    // PostCSS tasks after Sass compilation
    .pipe(sourcemaps.init())
    .pipe(postcss([
      autoprefixer({
        browsers: ['> 5%', 'last 2 versions', 'ie > 9']
      }) // Autoprefixes CSS properties for various browsers
      // any other PostCSS plugins to be run can be added in here
    ]))
    .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(paths.css.dest));
});


//Copy scripts to appropriate folder
gulp.task('scripts', function() {
  gulp.src('./dev/scripts/*.js')
    .pipe(gulp.dest('./prod/scripts/'));
});


//Copy vendor packages to appropriate folder
gulp.task('vendor', function() {
  gulp.src('./dev/vendor/**/*.*')
    .pipe(gulp.dest('./prod/vendor/'));
});


//Copy html files to appropriate folder
gulp.task('html', function() {
  gulp.src('./dev/**/*.html')
    .pipe(gulp.dest('./prod/'));
});

//Copy json files to appropriate folder
gulp.task('json', function() {
  gulp.src('./dev/scripts/**/*.json')
    .pipe(gulp.dest('./prod/scripts/'));
});



// Watch task

gulp.task('watch', ['browser-sync'], function() {
  gulp.watch(globs.scripts, ['scripts']);
  gulp.watch(globs.json, ['json']);
  gulp.watch(globs.styles, ['css']);
  gulp.watch(globs.pages, ['twig']);
  gulp.watch(globs.vendor, ['vendor']);
  gulp.watch(globs.html, ['html']);

  gulp.watch('./prod/**/*.*').on('change', browserSync.reload);
});



gulp.task('default', ['build', 'watch']);
gulp.task('build', ['html', 'css', 'scripts', 'vendor', 'twig']);
// gulp.task('build', ['twig', 'css', 'vendor', 'sprite', 'scripts']);
