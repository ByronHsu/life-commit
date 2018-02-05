const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const pugLint = require('gulp-pug-lint');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');
const ghPages = require('gulp-gh-pages');
const path = require('path');

const getCommitPath = () => {
  const home = process.env.HOME || process.env.USERPROFILE;
  const commitPath = path.join(home, '.life-commit', 'commits.json');
  return commitPath;
};

var lifes = () => {
  var load = require(getCommitPath());
  for (let i = 0; i < load.length; i++) {
    load[i].date = /\d+-\d+-\d+/.exec(load[i].date);
  }
  load.sort((c1, c2) => {
    if (new Date(c1.date).getTime() < new Date(c2.date).getTime()) return -1;
    else return 1;
  });
  return load;
};

const baseDirs = {
  src: 'src/',
  dist: 'dist/',
};

const routes = {
  templates: {
    pug: `${baseDirs.src}templates/*.pug`,
    _pug: `${baseDirs.src}templates/_includes/*.pug`,
  },
  styles: {
    scss: `${baseDirs.src}styles/*.scss`,
    _scss: `${baseDirs.src}styles/_includes/*.scss`,
  },
  scripts: {
    js: `${baseDirs.src}scripts/*.js`,
  },
  files: {
    html: `${baseDirs.dist}`,
    css: `${baseDirs.dist}css/`,
    deploy: `${baseDirs.dist}**/*`,
    staticSrc: `${baseDirs.src}static/**/*`,
    staticDist: `${baseDirs.dist}static/`,
  },
};

gulp.task('templates', ['styles'], () => {
  return gulp
    .src([routes.templates.pug, '!' + routes.templates._pug])
    .pipe(pugLint())
    .pipe(plumber({}))
    .pipe(
      pug({
        locals: { emojis: lifes() },
      })
    )
    .pipe(gulp.dest(routes.files.html))
    .pipe(browserSync.stream());
});

gulp.task('styles', () => {
  return gulp
    .src(routes.styles.scss)
    .pipe(plumber({}))
    .pipe(sass())
    .pipe(gulp.dest(routes.files.css))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['styles', 'templates'], () => {
  browserSync.init({
    server: `${baseDirs.dist}`,
  });

  gulp.watch(
    [routes.templates.pug, routes.templates._pug, routes.scripts.js],
    ['templates']
  );
  gulp.watch([routes.styles.scss, routes.styles._scss], ['styles']);
});

gulp.task('build', ['templates', 'styles'], () => {
  gulp.src([routes.files.staticSrc]).pipe(gulp.dest(routes.files.staticDist));
});

gulp.task('deploy', () => {
  return gulp
    .src(routes.files.deploy)
    .pipe(ghPages({ message: ':rocket: life website' }));
});

gulp.task('dev', ['serve']);

gulp.task('default', () => {
  gulp.start('dev');
});
