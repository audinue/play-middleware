
module.exports = function playMiddleware (directory) {
  return [
    require('./pug-middleware')(directory),
    require('./less-middleware')(directory),
    require('./rollup-middleware')(directory),
    require('express').static(directory || '.')
  ]
}
