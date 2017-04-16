# terra-pictura

A cross-platform desktop application that maintains your wallpaper as a "live", customisable representation of the Earth.

## Technologies

This project is essentially a [Polymer](https://github.com/Polymer/polymer) Web app, packaged into a desktop application with [Electron](https://github.com/electron/electron).  
It uses WebGL for the 3D rendering.  
The Earth's texture files (including the clouds layer) were provided by the [NASA](https://www.nasa.gov/).

## Development setup

Simply install the `node` and `bower` dependencies using:
```shell-script
npm install && bower install
```

## Development run

For development, this application can be run as either an [Electron](https://github.com/electron/electron) or a Web app.

### As an Electron app

Run this project as an [Electron](https://github.com/electron/electron) app with `gulp start`.  
To enable live-reload, use `gulp dev start`.


### As a Web app

To run this project as a Web app, you'll need to have the [Polymer CLI](https://github.com/Polymer/polymer-cli) installed globally.

Run it with `polymer serve`. The app will be served over `http` on your local machine on the port `8081`.  
Use `polymer serve --open` to have your default Web browser automatically connect to it when it's ready.

> **Note**: When running as a Web app, all the system-dependent functions will be **mocked**.

## Production build

### Web only

To only build the embedded Web app:
```shell-script
gulp package:web
```
This will create a `build/default` directory containing an bundled [Polymer](https://github.com/Polymer/polymer) app run through HTML, CSS, and JS optimizers.

> **Note**: When running as a Web app, all the system-dependent functions will be **mocked**.

### All platforms

To package the app with [Electron](https://github.com/electron/electron):
```shell-script
gulp package:all

```
This will:
- run the `package:web` task that rebuilds the application from scratch
- package [Electron](https://github.com/electron/electron) apps for **all** _platforms_ and _architectures_ under `build/packaged`.

### Specific platform

To only package for a specific _platform_, additional tasks are provided.  
For example, you can package the app for both _architectures_ (`ia32` and `x64`) of the `win32` _platform_ using:
```shell-script
gulp package:win32
```
