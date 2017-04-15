# terra-pictura

A cross-platform desktop application that maintains your wallpaper as a "live", customisable representation of the Earth.

## Development setup

Make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed.
In order to package the app into an actual executable for your platform, as opposed to a Web project, you'll additionally need to install [electron-packager](https://github.com/electron-userland/electron-packager).

```bash
npm install -g electron-packager polymer-cli
```

## Development server

Run it into as an [Electron](https://github.com/electron/electron) app with `electron .`.
Alternatively, to run it into a Web browser, use `polymer serve`. In that case, all the system-dependent functions will be mocked.

## Production build

```bash
polymer build --js-minify --css-minify --html-minify --bundle
This will create a `build/default` containing an unbundled build run through HTML, CSS, and JS optimizers.
```

```bash
electron-packager build/default terra-pictura --all --asar --out=build/packaged --overwrite

```
