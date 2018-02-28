let gulp = require('gulp');
let jade = require('gulp-jade');
let sass = require('gulp-sass');

gulp.task('templates', function() {
  gulp.src('app/views/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./app/'))
});

gulp.task('sass', function () {
  return gulp.src('app/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/styles'));
});

// gulp.task('sass:watch', function () {
//   gulp.watch('app/sass/*.scss', ['sass']);
// });

gulp.task('default', ['templates','sass' ]);
// gulp.task('default', ['templates','sass','sass:watch' ]);
