# terra-pictura

A cross-platform desktop application that maintains your wallpaper as a "live", customisable representation of the Earth.

# Technologies

This project is essentially a [Polymer](https://github.com/Polymer/polymer) Web app, packaged with [Electron](https://github.com/electron/electron).
It uses WebGL for the 3D rendering. The Earth's texture files (including the clouds layer) were provided by the [NASA](https://www.nasa.gov/).

## Development setup

Simply install the `node` and `bower` dependencies using:
```shell-script
npm install && bower install
```

## Development server

Run it into as an [Electron](https://github.com/electron/electron) app with `gulp start`. To enable live-reload, use `gulp dev start`.
Alternatively, to run it into a Web browser, use `polymer serve`. In that case, all the system-dependent functions will be mocked.

## Production build

To build the embedded Web app only:
```shell-script
gulp polymer-build
```
This will create a `build/default` containing an bundled [Polymer](https://github.com/Polymer/polymer) app run through HTML, CSS, and JS optimizers.

To package the app as with [Electron](https://github.com/electron/electron):
```shell-script
gulp package:all

```
This will first run the `polymer-build` task that rebuilds the application from scratch, then package Electron apps for **all** `platform`s and `arch`itectures under `build/packaged`.
To only package for a particular `platform`, additional tasks are provided, such as `package:win32` for Windows platforms.
