
module.exports = function lessMiddleware (directory) {
  return function (req, res, next) {
    if (/\.css$/.test(req.url)) {
      var file = (directory || '.') + req.url.replace(/\.css$/, '.less')
      require('fs').readFile(file, 'utf8', function (err, data) {
        if (err) {
          next()
          return
        }
        require('less').render(data, {
          filename: file,
          paths: [ directory ],
          rootpath: '/',
          sourceMap: {
            sourceMapFileInline: true,
            outputSourceFiles: true,
            sourceMapRootpath: '/',
            sourceMapBasepath: directory + '/'
          }
        }, function (err, output) {
          if (err) {
            console.error('[less-middleware]', err.message, '\n' + err.filename + '(' + err.line + ')')
            res.type('css')
              .end()
            return
          }
          res.type('css')
            .send(output.css)
        })
      })
    } else {
      next()
    }
  }
}
