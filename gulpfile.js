const gulp = require('gulp');
const gutil = require('gulp-util');
const shell = require('gulp-shell');
const packager = require('electron-packager');
const package = require('./package.json');
const _ = require('lodash');

let packagerOpts;
let platform = 'all';
let arch = 'all';

// TODO: use a non-global polymer-cli
gulp.task('polymer-package', shell.task([
  'polymer build --js-minify --css-minify --html-minify --bundle',
  'npm install --prefix build/default --production ' + _(package.dependencies).omit('electron').keys().value().join(' ')
]));

gulp.task('platform:win32', () => platform = 'win32');

gulp.task('package:opts', () =>
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
