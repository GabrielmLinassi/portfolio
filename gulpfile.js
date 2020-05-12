const gulp = require("gulp");
const sass = require("gulp-sass");
const purgecss = require("gulp-purgecss");
const browserSync = require("browser-sync").create();

gulp.task("sass", () => {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

gulp.task("purgecss", () => {
  return gulp
    .src("src/css/**/*.css")
    .pipe(
      purgecss({
        content: ["src/**/*.html"],
      })
    )
    .pipe(gulp.dest("src/css"));
});

gulp.task("js", function () {
  return gulp
    .src([
      "./node_modules/bootstrap/dist/js/bootstrap.min.js",
      "./node_modules/jquery/dist/jquery.min.js",
      "./node_modules/@popperjs/core/dist/umd/popper.min.js",
    ])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
});

gulp.task("watch", () => {
  browserSync.init({
    server: {
      baseDir: "./src",
      index: "/index.html",
    },
  });
  gulp.watch("src/scss/**/*.scss", gulp.series("sass", "purgecss"));
  gulp.watch("src/**/*.html").on("change", browserSync.reload);
  gulp.watch("src/js/**/*.js").on("change", browserSync.reload);
});

gulp.task("develop", gulp.series("js", "watch"));
