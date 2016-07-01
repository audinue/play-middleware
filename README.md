# Play Middleware

PUG, LESS, Rollup and Express' static middleware.

## Usage

```javascript
app.use(playMiddleware(directory))
```

When `foo.html` is requested, Play Middleware will respond with the compilation result of `foo.pug` in the given directory. No physical files are generated.

The default directory is the current working directory (`'.'`).

Compile time errors are logged in the console (`STDERR`) while CSS and JavaScript runtime errors are displayed in DevTools.

## Mapping

```
foo.html -> foo.pug
foo.css  -> foo.less
foo.js   -> foo.es
```

## Example

```javascript
var express = require('express')
var app = require('app')
var playMiddleware = require('play-middleware')

app.use(playMiddleware())
  .listen(80, function () {
    console.log('Server is ready.')
  })
```