/// <binding Clean='clean' />

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    project = require("./project.json"),
    less = require('gulp-less');

var paths = {
    webroot: "./" + project.webroot + "/"
};

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";
paths.views = paths.webroot + "views/";
paths.images = paths.webroot + "images/";
paths.concatNgAppJsDest = paths.webroot + "/app.js";
paths.styles = paths.webroot + "css/",

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean:ng-html", function (cb) {
    gulp.src('ng-apps/views/*.html')
        .pipe(gulp.dest(paths.views));
});

gulp.task("clean:ng-images", function (cb) {
    gulp.src('ng-apps/content/images/*.*')
        .pipe(gulp.dest(paths.images));
});

gulp.task('less', function () {
    return gulp.src('ng-apps/content/styles/*.less')
      .pipe(less())
      .pipe(gulp.dest(paths.styles));
});

gulp.task("clean", ["clean:js", "clean:css", "clean:ng-html", "clean:ng-images"]);

gulp.task("min:js", function () {
    gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task('min:ng-apps-js', function () {
    return gulp.src('ng-apps/**/*.js')
      .pipe(concat(paths.concatNgAppJsDest))
      .pipe(uglify({
                mangle: false,
                output: {
                    beautify: true
                }
            }))
      .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css", "min:ng-apps-js"]);
