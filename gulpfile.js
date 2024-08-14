const spawn = require("cross-spawn");

const gulp = require("gulp");
const concat = require("gulp-concat");

const sass = require("gulp-sass")(require("sass"));
const combineScss = require("gulp-scss-combine");
const purgecss = require("gulp-purgecss");

const uglify = require("gulp-uglify");

const paths = {
    sass: {
        src: ["core/www/sass/**/*.scss", "resources/sass/**/*.scss"],
        dest: "./public",
        filename: "bundle.css"
    },

    js: {
        src: ["core/www/js/**/*.js", "resources/js/**/*.js"],
        dest: "./public",
        filename: "bundle.js"
    },

    watch: ["resources/**/*", "app/**/*", "views/**/*", "core/**/*"]
};

const sassOptions = {
    outputStyle: "compressed"
};

gulp.task("compile-sass", () => {
    return gulp.src(paths.sass.src)
        .pipe(combineScss())
        .pipe(concat(paths.sass.filename))
        .pipe(sass(sassOptions).on("error", sass.logError))
        .pipe(purgecss({
            content: ["views/**/*.njk"]
        }))
        .pipe(gulp.dest(paths.sass.dest));
});

gulp.task("compile-js", () => {
    return gulp.src(paths.js.src)
        .pipe(concat(paths.js.filename))
        .pipe(uglify())
        .pipe(gulp.dest(paths.js.dest));
});

let serverProcess;

function removeServerProcessIfExists() {
    if (serverProcess) {
        serverProcess.kill();
        delete serverProcess;
    }
}

gulp.task("run-server", (done) => {
    removeServerProcessIfExists();

    serverProcess = spawn("node", ["core"], {
        stdio: "inherit"
    });

    done();
});

gulp.task("watch", (done) => {
    gulp.watch(paths.watch, gulp.series("compile", "run-server"));
    done();
});

gulp.task("compile", gulp.parallel("compile-sass", "compile-js"));
gulp.task("default", gulp.series("compile", gulp.parallel("run-server", "watch")));

process.on("exit", removeServerProcessIfExists);
process.on("SIGINT", removeServerProcessIfExists);