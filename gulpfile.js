const gulp = require("gulp");
const less = require("gulp-less");
const browsersync = require("browser-sync").create();
const plumber = require("gulp-plumber");
const postcss = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const sourcemaps = require("gulp-sourcemaps");

const styles = () => {
    return gulp.src("./src/less/styles.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
        autoprefixer()
    ]))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./src/css/"))
    .pipe(browsersync.stream());
}
exports.styles = styles;

const server = (done) => {
    browsersync.init({
        server: {
            baseDir: "src"
        },
        cors: true,
        notify: false,
        ui: false
    });
    done();
}
exports.server = server;

const watcher = () => {
    gulp.watch("./src/less/**/*.less", gulp.series("styles"));
    gulp.watch("./src/*.html").on("change", browsersync.reload);
}

exports.default = gulp.series(
    styles, server, watcher
)