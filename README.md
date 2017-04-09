# terra-pictura

A cross-platform desktop application that maintains your wallpaper as a "live", customisable representation of the Earth.

## Development setup

Make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Run `polymer serve` to serve the application locally.

## Development server

```
$ polymer serve
```

## Production build

```
$ polymer build --js-minify --css-minify --html-minify --bundle
```

This will create a `build/default` containing an unbundled build run through HTML,
CSS, and JS optimizers.