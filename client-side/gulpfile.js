'use strict';
var notify = require('gulp-notify');
var gutil = require('gulp-util');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');

var path = {
  HTML: 'src/index.html',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: 'dist',
  DEST_BUILD: 'dist/build',
  DEST_SRC: 'dist/src',
  ENTRY_POINT: './js/client-main.jsx'
};

gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});


gulp.task('build', function(){
  var b = browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
  });

  return b.bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify(path.MINIFIED_OUT)))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('watch', function() {
  gulp.watch(path.HTML, ['copy']);

  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle().on('error', handleError('Browserify'))
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC));
      console.log('Updated: ' + new Date());
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('production', ['replaceHTML', 'build']);

gulp.task('default', ['watch']);
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////

function handleError (task) {
  return function(err) {
    
      notify.onError({
        message: task + ' failed.',
        sound: true
      })(err);
    
    gutil.log(gutil.colors.bgRed(task + ' error:'), gutil.colors.red(err));
  };
};

// var tasks = {
//   // --------------------------
//   // Browserify
//   // --------------------------
//   browserify: function() {
//     var bundler = browserify('./js/client-main.jsx', {
//     	transform: [reactify],
// 		debug: true,
// 		cache: {}
//     });

//     bundler = watchify(bundler);
//     var rebundle = function() {
//         return bundler.bundle()
// 			.on('error', handleError('Browserify'))
// 			.pipe(source('build.js'))
// 			.pipe(gulp.dest('dist/src/'));
//     };
//     bundler.on('update', rebundle);

//     console.log('Updated.');
//     return rebundle();
//   }
 
// };

// gulp.task('browser-sync', function() {
//     browserSync({
//         server: {
//             baseDir: "./"
//         },
//         port: 3000
//     });
// });

// gulp.task('reload-js', ['browserify'], function(){
// 	browserSync.reload();
// });

// gulp.task('browserify', tasks.browserify);

// gulp.task('watch', ['browserify', 'browser-sync'], function() {
//   gulp.watch('./js/request-form/**', ['reload-js']);
// });
 
// gulp.task('default', ['watch']);
