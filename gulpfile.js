const gulp = require("gulp");
const sass = require("gulp-sass");
const PurgeCSS = require("gulp-purgecss");
const browserSync = require("browser-sync").create();
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const minify = require("gulp-minify");
const clean = require("gulp-clean");
const cleanCSS = require("gulp-clean-css");

const purgecss = new PurgeCSS({
  content: ["src/**/*.html", "src/**/*.css"],
});

gulp.task("sass", () => {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

gulp.task("js", function () {
  return gulp
    .src([
      "./node_modules/bootstrap/dist/js/bootstrap.min.js",
      "./node_modules/jquery/dist/jquery.min.js",
      "./node_modules/@popperjs/core/dist/umd/popper.min.js",
    ])
    .pipe(gulp.dest("src/js/libs"))
    .pipe(browserSync.stream());
});

gulp.task("purgecss", () => {
  return (
    gulp
      .src("src/css/**/*.css")
      .pipe(purgecss)
      //.pipe(cleanCSS({ compatibility: "ie8" }))
      .pipe(gulp.dest("build/css"))
  );
});

gulp.task("minify-js", function () {
  return gulp
    .src("src/js/*.js")
    .pipe(
      minify({
        noSource: true,
        ext: {
          min: ".js",
        },
        exclude: ["libs"],
      })
    )
    .pipe(gulp.dest("build/js"));
});

gulp.task("build-js-lib", function () {
  return gulp.src("src/js/libs/*.js").pipe(gulp.dest("build/js/libs"));
});

gulp.task("minify-html", () => {
  return gulp
    .src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
});

gulp.task("minify-img", () => {
  return gulp
    .src("src/images/**/*.{svg,jpg,png}")
    .pipe(
      imagemin({
        progressive: true,
      })
    )
    .pipe(gulp.dest("build/images"));
});

gulp.task("clean-build", () => {
  return gulp.src("build", { read: false, allowEmpty: true }).pipe(clean());
});

gulp.task("cname", () => {
  return gulp.src("CNAME").pipe(gulp.dest("build"));
});

gulp.task(
  "watch",
  gulp.series("sass", () => {
    browserSync.init({
      server: {
        baseDir: "./src",
        index: "/index.html",
      },
    });
    gulp.watch("src/scss/**/*.scss", gulp.series("sass"));
    gulp.watch(["src/**/*.html", "src/js/**/*.js"], browserSync.reload);
  })
);

gulp.task(
  "build",
  gulp.series([
    "clean-build",
    "sass",
    "purgecss",
    "minify-js",
    "js",
    "build-js-lib",
    "minify-html",
    "minify-img",
    "cname",
  ])
);

gulp.task("develop", gulp.series("js", "watch"));
