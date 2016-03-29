"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const server = require('gulp-server-livereload');
const watch = require("gulp-watch");
const browserify = require('gulp-browserify');
const glob = require("multi-glob").glob;
const path = require("path");
const commandLineArgs = require('command-line-args');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const ts = require('gulp-typescript');
const merge = require('merge2');
const tslint = require("gulp-tslint");
const tsfmt = require("gulp-tsfmt");
const changedInPlace = require("gulp-changed-in-place");
const babel = require('gulp-babel');
const rename = require("gulp-rename");
const fs = require("fs");
const jasmine = require('gulp-jasmine');
const reporter = require("jasmine-spec-reporter");
const benchmark = require('gulp-benchmark');

let cli = commandLineArgs([
    {name: 'production', alias: 'p', type: Boolean, defaultOption: false}
]);

let options = cli.parse();

let sassGlob = "./sass/everything.scss";
let tsGlob = "./src/**/*.@(ts|tsx)";

let sassOutputGlob = './css/**/*.css';
let tsOutputGlob = './dist/**/*.js';
let tsWatchedGlob = './dist/bundle/bundle.js';
let htmlGlob = './index.html';

gulp.task("default", ["serve"]);

gulp.task("browserify", ["ts"], function () {
    gulp.src(["./dist/App.js", "!./dist/tests/*"])
        .pipe(browserify({
            insertGlobals: false,
            debug: true,
            outfile: tsWatchedGlob
        }))
        .pipe(rename("bundle.js"))
        .pipe(gulp.dest("dist/bundle"))
});

gulp.task('ts', function () {
    return gulp.src(tsGlob)
        .pipe(ts({
            declaration: false,
            module: "commonjs",
            target: "es6",
            experimentalDecorators: true,
            jsx: "react"
        }))
        .js
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'))

});

gulp.task('sass', function () {
    gulp.src(sassGlob)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpif(options.production, cssnano()))
        .pipe(gulp.dest('./css'));
});

gulp.task('serve', ["watch"], function () {
    gulp.src('./')
        .pipe(server({
            livereload: {
                enable: true,
                filter: function (filePath, cb) {
                    glob([tsWatchedGlob, sassOutputGlob, htmlGlob], function (err, files) {
                        cb(files.map(function (file) {
                                return path.resolve(file);
                            }).indexOf(filePath) > -1);
                    });
                }
            },
            open: true,
            port: 8001
        }));
});

gulp.task('lint', function () {
    return gulp.src('./src/*.ts')
        .pipe(tslint())
        .pipe(tslint.report("verbose", {
            emitError: false
        }))
});

gulp.task("watch", ['sass', 'browserify'], function () {
    gulp.watch("./sass/**/*.scss", ['sass']);
    gulp.watch(tsGlob, ['browserify']);
});


gulp.task("test", ["browserify"], function () {
    gulp.src("")
        .pipe(jasmine({
            config: JSON.parse(fs.readFileSync("./spec/support/jasmine.json", "utf8")),
            reporter: new reporter()
        }));
});

gulp.task("bench", ["ts"], function () {
    return gulp.src("./dist/benchmarks/**/*.js", {read: false})
        .pipe(benchmark({
            reporters: [
                benchmark.reporters.etalon('RegExp#test'),
                benchmark.reporters.json()
            ]
        }))
        .pipe(gulp.dest('.'));
});