const gulp = require('gulp');
const gutil = require('gulp-util');
const replace = require('gulp-json-modify');
const shell = require('gulp-shell');
const spawner = require('child_process').spawn;

const electron = spawner.bind(spawner, require('electron'));
const packager = require('electron-packager');

const package = require('./package.json');

const _ = require('lodash');

let startDir = '.';
let devDir = 'dev';

let packagerOpts;
let platform = 'all';
let arch = 'all';

gulp.task('dev', () => {
  startDir = devDir;
  gulp
    .src('package.json')
    .pipe(replace({ key: 'main', value: '../main.dev.js' }))
    .pipe(gulp.dest(devDir));
});

gulp.task('start', () => {
  electron([startDir]);
});

// TODO: use a non-global polymer-cli
gulp.task('polymer-build', shell.task([
  'polymer build --js-minify --css-minify --html-minify --bundle',
  'npm install --prefix build/default --production ' + _(package.dependencies).omit('electron').keys().value().join(' ')
]));

gulp.task('platform:win32', () => platform = 'win32');

gulp.task('package:opts', () => {
  packagerOpts = {
    dir: 'build/default',
    out: 'build/packaged',
    asar: true,
    overwrite: true,
    platform: platform,
    arch: arch,
    win32metadata: {
      CompanyName: (function (author) {
        if (typeof package.author === 'String') {
          return package.author;
        }

        return author.name + (author.url ? ' (' + author.url + ')' : '') + (author.email ? ' <' + author.email + '>' : '');
      })(package.author),
      FileDescription: 'Terra Pictura',
      InternalName: package.name,
      OriginalFilename: 'terra-pictura.exe',
      ProductName: 'Terra Pictura'
    }
  }
});

gulp.task('package:win32', ['platform:win32', 'package:opts', 'polymer-package'], done => {
  packager(packagerOpts, (err, path) => {
    if (err) {
      throw new gutil.PluginError('electron-packager', err);
    }

    gutil.log('[package:win32] Electron app successfully built in: ' + path);
    done();
  })
});

gulp.task('package:all', ['package:opts', 'polymer-package'], done => {
  packager(packagerOpts, (err, path) => {
    if (err) {
      throw new gutil.PluginError('electron-packager', err);
    }

    gutil.log('[package:all] Electron app successfully built in: ' + path);
    done();
  })
});
