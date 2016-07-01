
module.exports = function pugMiddleware (directory) {
  return function (req, res, next) {
    if (/\.html$/.test(req.url)) {
      var file = (directory || '.') + req.url.replace(/\.html$/, '.pug')
      require('fs').stat(file, function (err) {
        if (err) {
          next()
          return
        }
        try {
          var fn = require('pug').compileFile(file, {
            pretty: '  ',
            debug: false,
            compileDebug: false
          })
          res.type('html')
            .send(fn())
        } catch (e) {
          console.error('[pug-middleware]', e.message, '\n' + e.filename + '(' + e.line + ')')
          res.type('html')
            .end()
        }
      })
    } else {
      next()
    }
  }
}
